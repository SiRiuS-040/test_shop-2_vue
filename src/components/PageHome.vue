<template>
    <div
        v-if="isPageDataLoaded"
        class="app-page-home"
    >
        <p>
            Курс валюты: {{ currencyExchangeValue }} руб.
        </p>
        <div class="app-catalog">
            <div class="app-catalog__section">
                <h2 class="app-catalog__title">Каталог товаров</h2>
                <div class="app-catalog__categories">
                    <div class="app-catalog__category app-catalog-category"
                        v-for="category in categoryList"
                         :key="category.id"
                    >
                        <h2 class="app-catalog-category__title"> {{ category }}</h2>
                        <ul class="app-catalog-category__list">

                            <AppGoodsItem
                                v-for="itemData in sortCatalog(catalogData, category)"
                                :key="itemData.id"
                                :itemData="itemData"
                                class="app-catalog-category__item"
                            />
                        </ul>
                    </div>
                </div>
            </div>
            <AppCart
                class="app-catalog__section"
            />
        </div>
    </div>
</template>

<script>
import {computed, unref} from "vue";
import {appMarketData} from "@/components/features/appMarketData";
import AppGoodsItem from "../components/AppGoodsItem";
import AppCart from "../components/AppCart";

export default {
    name: "PageHome",
    components: {
        AppGoodsItem,
        AppCart
    },

    setup( ){
        const catalogData = unref(appMarketData).marketCatalog
        const isPageDataLoaded = unref(appMarketData).isPageDataLoaded
        const currencyExchangeValue = unref(appMarketData).settings.exchangeValue
        const categoryList = computed(() => {
            let catList = []
            unref(catalogData).forEach(function (data) {
                catList.push(data.category)
            })
            return [...new Set(catList)]
        })

        const sortCatalog = (catalogItems, category) => {
            return catalogItems.filter(function (item) {
                return item.category === category;
            })
        }

        return {
            catalogData,
            isPageDataLoaded,
            currencyExchangeValue,
            categoryList,
            sortCatalog
        }
    },

}
</script>

<style lang="scss" scoped>
    @import "../components/styles/pageHome/app-page-home";
</style>