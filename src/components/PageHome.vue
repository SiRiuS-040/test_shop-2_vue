<template>
    <div
        v-if="isPageDataLoaded"
        class="app-page-home"
    >
        Курс валюты: {{ currencyExchangeValue }} руб.
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

import {unref} from "vue";
// import { getData } from "@/components/features/getAppData";

import {transformData} from "@/components/features/useCatalog";

import AppGoodsItem from "../components/AppGoodsItem";
import AppCart from "../components/AppCart";

export default {
    name: "PageHome",

    components: {
        AppGoodsItem,
        AppCart
    },

    setup( ){
        const {
            appClearData,
            isPageDataLoaded,
        } = transformData()

        const catalogData = unref(appClearData).catalogData
        const currencyExchangeValue = unref(appClearData).settings.exchangeValue

        console.log(catalogData)

        const getCategoryList = () => {
            let catList = []
            catalogData.value.forEach(function (data) {
                catList.push(data.category)
            })
            return [...new Set(catList)]
        }
        const categoryList = getCategoryList();

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
    @import "../assets/variables";
    @import "../components/styles/pageHome/app-page-home";
</style>