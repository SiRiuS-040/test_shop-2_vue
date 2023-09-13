<template>
    <li
        :class="cartItemClasses"
        class="app-cart-item"
    >
        <p class="app-cart-item__name">
            ({{ cartItemData.itemCategory }})  {{ cartItemData.itemName }}
        </p>
        <div class="app-cart-item__params">
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
            {{ convertPrice(cartItemData.itemOverallPrice) }} р.
        </span>
            <UiButton
                @click="cartItemDelete(cartItemData, cartList)"
                class="app-cart-item__delete"
            >
                <template #desc>
                    Удалить
                </template>
            </UiButton>
        </div>
    </li>
</template>

<script>

import UiButton from "./UiButton.vue";
import {computed, unref} from "vue";
import {appMarketData} from "@/components/features/appMarketData";
import { convertPrice, getItemIndex } from "@/components/features/helpFunctions";

export default {
    name: "AppCartItem",
    components: {
        UiButton,
    },
    props: {
        cartItemData : Object,
    },

    setup(props){
        const cartList = unref(appMarketData).cartData.cartList;

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
        const marketCatalog = unref(appMarketData).marketCatalog;
        const isCountError = computed(() => {
            const itemCartQ = unref(props.cartItemData).itemQuantity;
            const indexInCatalog = getItemIndex(unref(props.cartItemData), unref(marketCatalog));
            const countInCatalog = unref(marketCatalog)[indexInCatalog].count;

            return itemCartQ > countInCatalog
        })

        const cartItemClasses = computed(() => ({
            'app-cart-item--error': unref(isCountError)
        }))

        return {
            cartItemIncr,
            cartItemDecr,
            cartItemDelete,
            convertPrice,
            cartList,
            cartItemClasses,
            isCountError,
        }
    },
}
</script>

<style lang="scss">
    @import "../assets/variables";
    @import "./styles/appCartItem/app-cart-item";
</style>