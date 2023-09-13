<template>
    <div class="app-goods-item">
        <div class="app-goods-item__name">
            {{ itemData.name }} ( {{ itemData.count }} )
        </div>
        <div
            :class="priceClasses"
            class="app-goods-item__price"
        >
            {{ convertPrice(itemExchangedPrice) }}
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
import {appMarketData} from "@/components/features/appMarketData";
import { setPrice, convertPrice } from "@/components/features/helpFunctions";
import {exchangeValue} from "@/components/features/useCatalog";
import { addItemToCart } from "@/components/features/useAppCart";

export default {
    name: "AppGoodsItem",
    components: {
        UiButton
    },
    props: {
        itemData: {
            type: Object
        }
    },

    setup(props){
        const itemExchangedPrice = computed(() => {
            return +setPrice(unref(props.itemData.price), exchangeValue).toFixed(2)
        })

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

        return {
            cartData,
            priceClasses,
            itemExchangedPrice,
            convertPrice,
            addItemToCart
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../assets/variables";
    @import "../components/styles/appGoodsItem/app-goods-item";
</style>