<template>
    <li class="app-cart-item">
        <p class="app-cart-item__name">
            {{ 'cartItemData.itemName' }}
        </p>
        <div class="app-cart-item__count-wrapper">
            <UiButton

                icon="minus"
                buttonType="change-count"
                class="app-cart-item__count-change"
            >
            </UiButton>
            <span class="app-cart-item__count">
<!--                                {{ 'cartItemData.itemQuantity' }}-->
                {{ '1000' }}
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
<!--                            {{ 'cartItemData.itemOverallPrice' }} р.-->
            {{ '100' }} р.
        </span>
        <UiButton
            @click="cartItemDelete(cartItemData)"
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
// import {marketData} from "./features/appMarketData";
// import {cartItemDecr, cartItemDelete, cartItemIncr} from "./features/useMarketApp";
// import {ref} from "vue";

export default {
    name: "AppCartItem",

    components: {
        UiButton,
    },
    props: {
        cartItemData : Object,
    },

    setup(){
        const cartItemIncr = (itemData) => {
            console.log(itemData)
            console.log('увеличить кол-во товара')
        };
        const cartItemDecr = (itemData) => {
            console.log(itemData)
            console.log('уменьшить кол-во товара')
        };
        const cartItemDelete = (itemData) => {
            console.log(itemData)
            console.log('удалить товар из корзины')
        };

        return {
            cartItemIncr,
            cartItemDecr,
            cartItemDelete
        }
    },
}
</script>

<style lang="scss">
    @import "./styles/appCartItem/app-cart-item";
</style>