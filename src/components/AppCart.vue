<template>
    <div class="app-cart">
        <div class="app-cart__content">
            <h3
                v-if="cartEmpty"
                class="app-cart__sub-title"
            >
                Товары в корзине отсутствуют.
            </h3>
            <div
                v-if="!cartEmpty"
            >
                <h3 class="app-cart__sub-title">
                    Список добавленных товаров:
                </h3>
                <ol start="1" class="app-cart__order-list">
                    <AppCartItem
                        v-for="item in cartList"
                        :key="item.id"
                        :cartItemData="item"
                    />
                </ol>
                <div class="app-cart__sum">
                    ИТОГО: {{ convertPrice(cartOverallSum) }} р.
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {computed, unref} from "vue"
import AppCartItem from "@/components/AppCartItem";
import {appMarketData} from "@/components/features/appMarketData";
import { convertPrice } from "@/components/features/helpFunctions";

export default {
    name: "AppCart",
    components: {
        AppCartItem
    },

    setup(){
        const cartList = appMarketData.cartData.cartList
        const cartEmpty = computed(() => {
            return appMarketData.cartData.cartList.length === 0
        })

        const cartOverallSum = computed(() => {
            if (cartList.length > 0) {
                let itemsSum = 0
                appMarketData.cartData.cartList.forEach(function (item) {
                    itemsSum = itemsSum + unref(item.itemOverallPrice)
                })
                return itemsSum
            } else {
                return 0
            }
        })

        return {
            cartOverallSum,
            cartList,
            cartEmpty,
            convertPrice
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "../assets/variables";
    @import "../components/styles/appCart/app-cart";
</style>