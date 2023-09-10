import { ref } from "vue";

export const marketData = ref({
    cartData: {
        cartOverallSum: 0,
        cartOverallItems: 0,
        cartEmpty: true,
        cartList: [],
    },
    marketCatalog: [],
    settings: {
        exchangeValue: 80
    }
})


