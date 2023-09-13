import namesData from "@/components/jsons/names";
import {reactive, ref, unref, watch} from "vue";
import { dataCode } from "@/components/features/appEnums";
import { getData } from "@/components/features/getAppData";
import { randomInteger } from "@/components/features/helpFunctions";
import { useExchange } from "@/components/features/useExchange";

const {
    codePrice,
    codeGroup,
    codeName,
    codeId,
    codeTypes,
    codeStorageCount,
} = dataCode;

const {
    isPageDataLoaded,
    rawCatalog,
    updateStamp,
    getDataFromFile
} = getData();

const {
    startExchangeValue,
    exchangeValue,
    manualExchangeValue
} = useExchange();

setInterval ( () => {
    getDataFromFile()
    startExchangeValue.value =  randomInteger(60, 80)
}, 15000)

const clearCatalogData = reactive(unref(rawCatalog).map(function(rawItem) {
    const itemData = reactive({})
    itemData.id = rawItem[codeId];
    itemData.count  = ref(rawItem[codeStorageCount]);
    itemData.price = ref(rawItem[codePrice]);
    itemData.name = ref(namesData[rawItem[codeGroup]][codeTypes][rawItem[codeId]][codeName]);
    itemData.category = ref(namesData[rawItem[codeGroup]][codeGroup]);
    return itemData
}));

const forceUpdateData = () => {
    unref(clearCatalogData).forEach(function (item) {
        let itemId = item.id
        let indexInJson = unref(rawCatalog).findIndex(rawItem => rawItem[codeId] === itemId)
        if (indexInJson !== -1) {
            item.price = unref(rawCatalog)[indexInJson][codePrice]
            item.count = unref(rawCatalog)[indexInJson][codeStorageCount]
        }
    })
}

watch(updateStamp, forceUpdateData);

export const catalogExports = () => {
    return {
        isPageDataLoaded,
        clearCatalogData,
        exchangeValue,
        manualExchangeValue
    }
}






