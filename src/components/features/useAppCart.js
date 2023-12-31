import {computed, unref, ref, reactive} from "vue";
import { setPrice } from "@/components/features/helpFunctions";
import {catalogExports} from "@/components/features/useCatalog";

const {
    exchangeValue,
} = catalogExports()

export const addItemToCart = (itemData, cartData) => {
    let itemDataId = itemData.id;
    const cartItemTemplate = reactive({
        id: itemData.id,
        itemQuantity: ref(1),
        itemCategory: ref(itemData.category),
        itemName: ref(itemData.name),
        itemPrice: computed(() => {
            return +setPrice(unref(itemData.price), exchangeValue).toFixed(2)
        }),
        itemOverallPrice: computed(() => {
            return unref(cartItemTemplate.itemQuantity) * unref(cartItemTemplate.itemPrice)
        }),
        itemData: itemData,
    })

    if (cartData.cartList.length > 0) {
        let itemIndex = cartData.cartList.findIndex(cartItem => cartItem.id === itemDataId)
        if (itemIndex !== -1) {
            cartData.cartList[itemIndex].itemQuantity++
        } else {
            cartData.cartList.push(cartItemTemplate)
        }
    } else {
        cartData.cartList.push(cartItemTemplate)
    }
}
