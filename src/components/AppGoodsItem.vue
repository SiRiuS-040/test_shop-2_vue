<template>
    <div class="app-goods-item">
        <div class="app-goods-item__name">
            {{ itemData.category }}. {{ itemData.name }} ( {{ itemData.count }} )
        </div>
        <div
            :class="priceClasses"
            class="app-goods-item__price"
        >
            {{ itemData.price }}
        </div>
        <UiButton
            @click="addItemToCart(itemData)"
            buttonType="add-cart"
            icon="cart"
            class="app-goods-item__add-cart"
        />
    </div>
</template>

<script>

import { computed, unref} from "vue"
import UiButton from "@/components/UiButton";

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
        const addItemToCart = (item) => {
            console.log('добавление товара в корзину')
            console.log(item)
        }

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
            addItemToCart,
            priceClasses,
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../components/styles/appGoodsItem/app-goods-item";
</style>