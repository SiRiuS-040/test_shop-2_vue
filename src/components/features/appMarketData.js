import {computed, ref, unref} from "vue";
import {transformData} from "@/components/features/useCatalog";

const {
    clearCatalogData,
    exchangeValue,
    isPageDataLoaded,
} = transformData()

export const appMarketData = ref({
    marketCatalog: computed(() => {
        return clearCatalogData
    }),
    isPageDataLoaded: computed(() => {
        return isPageDataLoaded
    }),
    cartData: {
        cartList: ref([]),
    },
    settings: {
        exchangeValue: computed(() => {
            return unref(exchangeValue)
        }),
    }
})




