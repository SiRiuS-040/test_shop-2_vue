export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function setPrice(itemPrice, exchange) {
    return itemPrice * exchange.value
}

export function convertPrice(num) {
    return num.toLocaleString()
}

export function getItemIndex(item, list) {
    let itemDataId = item.id;
    return list.findIndex(cartItem => cartItem.id === itemDataId);
}