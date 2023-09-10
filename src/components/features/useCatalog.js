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
}, 15000)

export const transformData = () => {
    const clearCatalogData = ref([])

    unref(rawAppData).Value.Goods.map(function(name) {
        const itemData = {}

        const itemCount = ref(name[dataCode.itemStorageValue]);
        const itemPrice = ref(name[dataCode.itemPrice]);
        const itemName = ref(namesData[name[dataCode.itemGroup]][dataCode.itemTypes][name[dataCode.itemId]][dataCode.itemName]);
        const itemCategory = ref(namesData[name[dataCode.itemGroup]][dataCode.itemGroup]);

        setInterval ( () => {
            // exchangeValue.value =  randomInteger(20, 80)
            itemCount.value =  randomInteger(0, 99)
            itemPrice.value =  randomInteger(0, 99)
            // itemCategory.value =  randomInteger(0, 99)
        }, 10000)

        itemData.id = name[dataCode.itemId];
        itemData.category = computed(() => {
            return unref(itemCategory)
        })
        itemData.name = computed(() => {
            return unref(itemName)
        })
        itemData.count = computed(() => {
            return unref(itemCount)
        })
        itemData.price = computed(() => {
            return +setPrice(unref(itemPrice), exchangeValue).toFixed(2)
        })

        clearCatalogData.value.push(itemData)
    });

    const appMarketData = computed(() => {
        return {
            marketCatalog: clearCatalogData,
            cartData: {
                cartOverallSum: 0,
                cartOverallItems: 0,
                cartEmpty: true,
                cartList: [],
            },
            settings: {
                exchangeValue: exchangeValue
            }
        }
    })

    console.log(appMarketData)

    return {
        appMarketData,
        isPageDataLoaded,
    }
}
