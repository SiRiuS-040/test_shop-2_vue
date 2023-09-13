<template>
    <div
        v-if="isPageDataLoaded"
        class="app-page-home"
    >
        <div class="app-catalog">
            <div class="app-catalog__section">
                <div class="app-catalog__exchange-wrapper">
                    <p class="app-catalog__title">
                        Курс валюты: {{ exchangeValue }} руб.
                    </p>
                    <label>
                        <span class="app-catalog__title">
                            {{ 'Фиксация курса: ' }}
                        </span>
                        <input
                            v-model="manualExchangeValue"
                            type="tel"
                            placeholder="Свой курс не задан"
                            maxlength="10"
                            class="app-catalog__title app-catalog__manual-value"
                        />
                    </label>
                </div>
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
import {computed} from "vue";
import {appMarketData} from "@/components/features/appMarketData";
import AppGoodsItem from "../components/AppGoodsItem";
import AppCart from "../components/AppCart";
import {catalogExports} from "@/components/features/useCatalog";

export default {
    name: "PageHome",
    components: {
        AppGoodsItem,
        AppCart
    },
    setup(){
        const {
            manualExchangeValue,
            exchangeValue,
            isPageDataLoaded
        } = catalogExports()

        const catalogData = appMarketData.marketCatalog;
        const categoryList = computed(() => {
            let catList = []
            appMarketData.marketCatalog.forEach(function (data) {
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
            exchangeValue,
            categoryList,
            manualExchangeValue,
            sortCatalog,
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "../assets/variables";
    @import "../components/styles/pageHome/app-page-home";
</style>