import namesData from "@/components/features/names";
import {computed, ref, unref} from "vue";
import { getData } from "@/components/features/getAppData";
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
    startExchangeValue.value =  randomInteger(60, 80)
}, 15000)

export const transformData = () => {
    const clearCatalogData = ref([])

    unref(rawAppData).Value.Goods.map(function(name) {
        const itemData = {}
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
        }, 15000)

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

    return {
        clearCatalogData,
        exchangeValue,
        isPageDataLoaded,
    }
}
