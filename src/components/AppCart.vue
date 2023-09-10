<template>
    <div class="app-cart">
        <div
            class="app-cart__content"
        >
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
                    ИТОГО: {{ cartOverallSum }} р.
                </div>

                <div class="app-cart__actions">
                    <UiButton
                        @click="makeOrder"
                        buttonType="order"
                    >
                        <template #desc>
                            Оформить заказ
                        </template>
                    </UiButton>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

import {computed, unref} from "vue"
import UiButton from "@/components/UiButton";
import AppCartItem from "@/components/AppCartItem";
import {appMarketData} from "@/components/features/appMarketData";

export default {
    name: "AppCart",

    components: {
        UiButton,
        AppCartItem
    },

    setup(){
        const cartList = unref(appMarketData).cartData.cartList
        const cartEmpty = computed(() => {
            return unref(appMarketData).cartData.cartList.length === 0
        })

        const cartOverallSum = computed(() => {
            if (cartList.length > 0) {
                let itemsSum = 0
                unref(appMarketData).cartData.cartList.forEach(function (item) {
                    itemsSum = itemsSum + unref(item.itemOverallPrice)
                })
                return itemsSum
            } else {
                return 0
            }
        })

        const makeOrder = () => {
            console.log('Оформить заказ')
        };

        return {
            cartOverallSum,
            cartList,
            makeOrder,
            cartEmpty
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../components/styles/appCart/app-cart";
</style>