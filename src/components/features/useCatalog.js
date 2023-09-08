import namesData from "@/components/features/names";
import {computed, ref, unref} from "vue";
import { getData } from "@/components/features/getAppData";
// import storageData from "@/components/features/storageData.json";

import { dataCode } from "@/components/features/appEnums";

const {
    isPageDataLoaded,
    rawAppData,
} = getData()

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function setPrice(itemPrice, exchange) {
    return itemPrice * exchange.value
}

const exchangeValue = ref(80);

setInterval ( () => {
    exchangeValue.value =  randomInteger(20, 80)
}, 1000)

export const transformData = () => {
    const clearCatalogData = ref([])

    unref(rawAppData).Value.Goods.map(function(name) {
        const itemData = {}

        itemData.id = name[dataCode.itemId];
        itemData.category = namesData[name[dataCode.itemGroup]][dataCode.itemGroup]
        itemData.name = namesData[name[dataCode.itemGroup]][dataCode.itemTypes][name[dataCode.itemId]][dataCode.itemName]
        itemData.count = computed(()=> {
            return name[dataCode.itemStorageValue]
        })
        itemData.price = computed(() => {
            return +setPrice(name[dataCode.itemPrice], exchangeValue).toFixed(2)
        })
        clearCatalogData.value.push(itemData)
    });

    const appClearData = computed(() => {
        return {
            catalogData: clearCatalogData,
            cartData: [],
            settings: {
                exchangeValue: exchangeValue
            }
        }
    })

    console.log(appClearData)

    return {
        appClearData,
        isPageDataLoaded,
    }
}
