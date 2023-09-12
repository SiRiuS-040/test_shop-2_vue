import namesData from "@/components/features/names";
import {computed, ref, unref, watch} from "vue";
import { getData } from "@/components/features/getAppData";
import { dataCode } from "@/components/features/appEnums";

const {
    isPageDataLoaded,
    rawCatalog,
    getDataFromFile,
    updateStamp
} = getData()

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function setPrice(itemPrice, exchange) {
    return itemPrice * exchange.value
}

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

const setUpdateTime = computed(() => {
    return unref(updateStamp)
})

setInterval ( () => {
    getDataFromFile()
    updateStamp.value = new Date() / 1000;
    startExchangeValue.value =  randomInteger(60, 80)
}, 2000)

export const transformData = () => {
    const clearCatalogData = ref([])

    unref(rawCatalog).filter(function(name) {
        const itemData = {}
        const itemId = name[dataCode.itemId];
        const itemCount = ref(name[dataCode.itemStorageValue]);
        const itemPrice = ref(name[dataCode.itemPrice]);
        const itemName = ref(namesData[name[dataCode.itemGroup]][dataCode.itemTypes][name[dataCode.itemId]][dataCode.itemName]);
        const itemCategory = ref(namesData[name[dataCode.itemGroup]][dataCode.itemGroup]);

        // TODO для проверки смены значений - для применения случайных значений
        setInterval ( () => {
            // exchangeValue.value =  randomInteger(50, 80)
            // itemCount.value =  randomInteger(0, 5)
            // itemPrice.value =  randomInteger(1, 50)
            // itemCategory.value =  randomInteger(0, 99)
        }, 5000)

        itemData.id = itemId
        itemData.category = itemCategory
        itemData.name = itemName
        itemData.count = itemCount
        itemData.price = itemPrice
        itemData.fullPrice = computed(() => {
            return +setPrice(unref(itemData.price), exchangeValue).toFixed(2)
        })

        clearCatalogData.value.push(itemData)
    });

    // TODO обновление модели при изменениях setUpdateTime
    const forceUpdateData = () => {
        unref(clearCatalogData).forEach(function (item) {
            let itemId = item.id
            let indexInJson = unref(rawCatalog).findIndex(rawItem => rawItem['T'] === itemId)
            item.price = unref(rawCatalog)[indexInJson]['C']
            item.count = unref(rawCatalog)[indexInJson]['P']
        })
    }

    watch(setUpdateTime, forceUpdateData);

    return {
        clearCatalogData,
        exchangeValue,
        isPageDataLoaded,
    }
}

