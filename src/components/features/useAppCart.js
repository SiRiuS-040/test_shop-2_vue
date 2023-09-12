import {computed, unref, ref} from "vue";

export function addItemToCart(itemData, cartData) {
    let itemDataId = itemData.id;
    const cartItemTemplate = {
        id: itemData.id,
        itemQuantity: ref(1),
        itemCategory: computed(() => {
            return itemData.category
        }),
        itemName: ref(itemData.name),
        itemPrice: computed(() => {
            return unref(itemData.fullPrice)
        }),
        itemOverallPrice: computed(() => {
            return unref(cartItemTemplate.itemQuantity) * unref(cartItemTemplate.itemPrice)
        }),
        itemData: itemData,
    }

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
