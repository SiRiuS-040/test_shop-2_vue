import namesData from "@/components/features/names";
import {computed, reactive, ref, unref, watch} from "vue";
import { dataCode } from "@/components/features/appEnums";
import { getData } from "@/components/features/getAppData";
import { randomInteger } from "@/components/features/helpFunctions";

const {
    isPageDataLoaded,
    rawCatalog,
    getDataFromFile,
    updateStamp
} = getData()

const regex = /^[\d.,:]*$/;

export const startExchangeValue = ref(80);
export const manualExchangeValue = ref();
export const manualExchangeValueInput = ref();

export const exchangeValue = computed(() => {
    if ( unref(manualExchangeValue) && regex.test(unref(manualExchangeValue)) && unref(manualExchangeValue) !== 0) {
        manualExchangeValueInput.value = unref(manualExchangeValue)
        return unref(manualExchangeValue)
    } else if (unref(manualExchangeValue) && !regex.test(unref(manualExchangeValue))) {
        manualExchangeValue.value = manualExchangeValue.value.slice(0, -1)
        if (unref(manualExchangeValue).length === 0 ) {
            return unref(startExchangeValue)
        } else {
            return unref(manualExchangeValue)
        }
    } else {
        return unref(startExchangeValue)
    }
})

setInterval ( () => {
    getDataFromFile()
    startExchangeValue.value =  randomInteger(60, 80)
}, 15000)

export const transformData = () => {
    const clearCatalogData = reactive([])
    function addCatalogItem(rawItem) {
        const itemData = {}
        const itemId = rawItem[dataCode.itemId];
        const itemCount = ref(rawItem[dataCode.itemStorageValue]);
        const itemPrice = ref(rawItem[dataCode.itemPrice]);
        const itemName = ref(namesData[rawItem[dataCode.itemGroup]][dataCode.itemTypes][rawItem[dataCode.itemId]][dataCode.itemName]);
        const itemCategory = ref(namesData[rawItem[dataCode.itemGroup]][dataCode.itemGroup]);
        itemData.id = itemId
        itemData.category = itemCategory
        itemData.name = itemName
        itemData.count = itemCount
        itemData.price = itemPrice
        clearCatalogData.push(itemData)
    }

    unref(rawCatalog).filter(function(rawItem) {
        addCatalogItem(rawItem)
    });

    // TODO обновление модели при изменениях setUpdateTime
    const forceUpdateData = () => {
        unref(clearCatalogData).forEach(function (item) {
            let itemId = item.id
            let indexInJson = unref(rawCatalog).findIndex(rawItem => rawItem['T'] === itemId)
            if (indexInJson !== -1) {
                item.price = unref(rawCatalog)[indexInJson]['C']
                item.count = unref(rawCatalog)[indexInJson]['P']
            }
        })
    }

    const setUpdateTime = computed(() => {
        return unref(updateStamp)
    })

    watch(setUpdateTime, forceUpdateData);

    return {
        clearCatalogData,
        exchangeValue,
        isPageDataLoaded,
    }
}

