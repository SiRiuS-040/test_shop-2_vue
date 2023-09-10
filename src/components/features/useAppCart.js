export function addItemToCart(itemData, appData) {
    let itemDataId = itemData.id;

    const cartItemTemplate = {
        id: itemData.id,
        itemQuantity: 1,
        itemName: itemData.name,
        itemPrice: itemData.price,
        itemOverallPrice: itemData.price,
        itemData: itemData,
    }

    if (appData.cartData.cartList.length > 0) {
        let itemIndex = appData.cartData.cartList.findIndex(cartItem => cartItem.id === itemDataId)
        if (itemIndex != -1) {
            appData.cartData.cartList[itemIndex].itemQuantity++
        } else {
            appData.cartData.cartList.push(cartItemTemplate)
        }
    } else {
        appData.cartData.cartList.push(cartItemTemplate)
    }


    // checkCartSums(appData)
}



function checkCartSums(appData) {
    let cartList = appData.cartData.cartList
    let overallSum = 0
    let overallItems = 0
    cartList.forEach(cartItem => {
        cartItem.itemOverallPrice = cartItem.itemQuantity * cartItem.itemPrice
        overallSum = overallSum + cartItem.itemOverallPrice;
        overallItems = overallItems + cartItem.itemQuantity
    })

    appData.cartData.cartOverallSum = overallSum;
    appData.cartData.cartOverallItems = overallItems;
    overallItems === 0 ? appData.cartData.cartEmpty = true : appData.cartData.cartEmpty = false
}

function getItemIndex(itemData, appData) {
    let itemDataId = itemData.id;
    return appData.cartData.cartList.findIndex(cartItem => cartItem.id === itemDataId);
}

export function cartItemDecr (itemData, appData) {
    let itemIndex = getItemIndex(itemData, appData)
    if (appData.cartData.cartList[itemIndex].itemQuantity > 1) {
        appData.cartData.cartList[itemIndex].itemQuantity--
    }
    checkCartSums(appData)
}

export function cartItemIncr (itemData, appData) {
    let itemIndex = getItemIndex(itemData, appData)
    appData.cartData.cartList[itemIndex].itemQuantity++
    checkCartSums(appData)
}

export function cartItemDelete (itemData, appData) {
    let itemIndex = getItemIndex(itemData, appData)
    appData.cartData.cartList.splice(itemIndex, 1)
    checkCartSums(appData)
}



