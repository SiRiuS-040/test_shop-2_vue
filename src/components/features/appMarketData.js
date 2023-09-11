import {computed, ref, unref, reactive} from "vue";
import {transformData} from "@/components/features/useCatalog";

const {
    clearCatalogData,
    exchangeValue,
    isPageDataLoaded,
} = transformData()

export const appMarketData = reactive({
    marketCatalog: clearCatalogData,
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




