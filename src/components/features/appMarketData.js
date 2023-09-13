import {reactive} from "vue";
import {catalogExports} from "@/components/features/useCatalog";

const {
    clearCatalogData,
    exchangeValue,
    isPageDataLoaded,
} = catalogExports()

export const appMarketData = reactive({
    marketCatalog: clearCatalogData,
    isPageDataLoaded: isPageDataLoaded,
    cartData: {
        cartList: reactive([]),
    },
    settings: {
        exchangeValue: exchangeValue,
    }
})




