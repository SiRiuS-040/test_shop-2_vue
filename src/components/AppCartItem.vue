<template>
    <li class="app-cart-item">
        <p class="app-cart-item__name">
            ({{ cartItemData.itemCategory }})  {{ cartItemData.itemName }}
        </p>
        <div class="app-cart-item__count-wrapper">
            <UiButton
                @click="cartItemDecr(cartItemData)"
                icon="minus"
                buttonType="change-count"
                class="app-cart-item__count-change"
            >
            </UiButton>
            <span class="app-cart-item__count">
                {{ cartItemData.itemQuantity }}
            </span>
            <UiButton
                @click="cartItemIncr(cartItemData)"
                icon="plus"
                buttonType="change-count"
                class="app-cart-item__count-change"
            >
            </UiButton>
        </div>
        <span class="app-cart-item__price-overall">
<!--            {{ overallSum }} р.-->

            {{ cartItemData.itemOverallPrice }} р.
        </span>
        <UiButton
            @click="cartItemDelete(cartItemData, cartList)"
            class="app-cart-item__delete"
        >
            <template #desc>
                Удалить
            </template>
        </UiButton>
    </li>
</template>

<script>

import UiButton from "./UiButton.vue";
import {unref} from "vue";
import {appMarketData} from "@/components/features/appMarketData";

export default {
    name: "AppCartItem",
    components: {
        UiButton,
    },
    props: {
        cartItemData : Object,
    },

    setup(){
        const cartList = unref(appMarketData).cartData.cartList;

        const getItemIndex = (item, list) => {
            let itemDataId = item.id;
            return list.findIndex(cartItem => cartItem.id === itemDataId);
        }
        const cartItemIncr = (itemData) => {
            itemData.itemQuantity++
        };
        const cartItemDecr = (itemData) => {
            if (itemData.itemQuantity > 1) {
                itemData.itemQuantity--
            } else {
                return
            }
        };
        const cartItemDelete = (item, list) => {
            let itemIndex = getItemIndex(item, list)
            list.splice(itemIndex, 1)
        };

        return {
            cartItemIncr,
            cartItemDecr,
            cartItemDelete,
            cartList,
        }
    },
}
</script>

<style lang="scss">
    @import "./styles/appCartItem/app-cart-item";
</style>