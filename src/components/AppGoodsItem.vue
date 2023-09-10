<template>
    <div class="app-goods-item">
        <div class="app-goods-item__name">
            {{ itemData.name }} ( {{ itemData.count }} )
        </div>
        <div
            :class="priceClasses"
            class="app-goods-item__price"
        >
            {{ convertPrice(itemData.price) }}
        </div>
        <UiButton
            @click="addItemToCart(itemData, cartData)"
            buttonType="add-cart"
            icon="cart"
            class="app-goods-item__add-cart"
        />
    </div>
</template>

<script>

import { computed, unref} from "vue"
import UiButton from "@/components/UiButton";

import { addItemToCart } from "@/components/features/useAppCart";
import {appMarketData} from "@/components/features/appMarketData";

export default {
    name: "AppGoodsItem",

    components: {
        UiButton
    },

    props: {
        itemData: {
            type: Object
            // default() {
            //     return {
            //         id: 0,
            //         category: '',
            //         name: '',
            //         price: 0,
            //         count: 0,
            //     }
            // },
        }
    },

    setup(props){
        const cartData = unref(appMarketData).cartData
        let lastPrice = unref(props.itemData).price

        const isPriceUp = computed(() => {
            let currentPrice = unref(props.itemData).price
            let priceGoUp = currentPrice > unref(lastPrice);
            lastPrice = currentPrice

            return priceGoUp;
        })

        const priceClasses = computed(() => ({
            'app-goods-item__price--incr': unref(isPriceUp),
            'app-goods-item__price--decr': !unref(isPriceUp),
        }))

        const convertPrice = (num) => {
            return num.toLocaleString();
        }

        return {
            cartData,
            addItemToCart,
            priceClasses,
            convertPrice
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../assets/variables";
    @import "../components/styles/appGoodsItem/app-goods-item";
</style>