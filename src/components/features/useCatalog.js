import namesData from "@/components/features/names";
import {computed, reactive, ref, unref, watch} from "vue";
import { getData } from "@/components/features/getAppData";
import { dataCode } from "@/components/features/appEnums";

const {
    isPageDataLoaded,
    // rawAppData,
    rawCatalog,
    getDataFromFile,
    updateStamp
} = getData()

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function setPrice(itemPrice, exchange) {
    return unref(itemPrice) * exchange.value
}

const regex = /^[\d.,:]*$/;
export const startExchangeValue = ref(80);
export const manualExchangeValue = ref();
export const manualExchangeValueInput = ref();
const setUpdateTime = computed(() => {
    return unref(updateStamp)
})

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

    updateStamp.value = new Date() / 1000;
    startExchangeValue.value =  randomInteger(60, 80)
}, 5000)

export const transformData = () => {
    const clearCatalogData = reactive([])

    console.log('обновление')

    unref(rawCatalog).forEach(function(item, index) {
        console.log(item)
        console.log(index)

        const itemData = reactive({
            id: computed(()=> {
                return ref(item[dataCode.itemId])
            }),
            category: computed(()=> {
                return ref(namesData[item[dataCode.itemGroup]][dataCode.itemGroup])
            }),
            name: computed(()=> {
                return ref(namesData[item[dataCode.itemGroup]][dataCode.itemTypes][item[dataCode.itemId]][dataCode.itemName])
            }),
            count: computed(()=> {
                return ref(item[dataCode.itemStorageValue])
            }),
            price: computed(() => {
                return +setPrice(ref(item[dataCode.itemPrice]), exchangeValue).toFixed(2)
            }),
            update: computed(() => {
                return setUpdateTime
            }),
        })

        clearCatalogData.push(itemData)
    });

    return {
        clearCatalogData,
        exchangeValue,
        isPageDataLoaded,
    }
}

// const forceUpdateData = () => {
//     console.log('обновление')
//
//
// }

watch(setUpdateTime, transformData);
