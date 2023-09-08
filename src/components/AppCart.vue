<template>
    <div class="app-cart">
        <div
            class="app-cart__content"
        >
            <h3
                v-if="true"
                class="app-cart__sub-title"
            >
                Товары в корзине отсутствуют.
            </h3>
            <h3
                v-if="true"
                class="app-cart__sub-title">
                Список добавленных товаров:
            </h3>
            <ol start="1" class="app-cart__order-list">
                <AppCartItem
                    v-for="item in cartItems"
                    :key="item.id"
                    :cartItemData="item"
                />
            </ol>
            <div class="app-cart__sum">
<!--                ИТОГО: {{ marketData.cartData.cartOverallSum }} р.-->
                ИТОГО: {{ '600' }} р.
            </div>
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

</template>

<script>

import { ref } from "vue"
import UiButton from "@/components/UiButton";
import AppCartItem from "@/components/AppCartItem";

export default {
    name: "AppCart",

    components: {
        UiButton,
        AppCartItem
    },

    setup(){

        const cartItems = ref([]);

        cartItems.value = [
            {}, {}, {}
        ];

        const makeOrder = () => {
            console.log('Оформить заказ')
        };

        return {
            cartItems,
            makeOrder
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../components/styles/appCart/app-cart";
</style>