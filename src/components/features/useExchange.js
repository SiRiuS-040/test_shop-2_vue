import {computed, ref, unref} from "vue";

export const useExchange = () => {
    const regex = /^[\d.,:]*$/;
    const startExchangeValue = ref(80);
    const manualExchangeValue = ref();
    const manualExchangeValueInput = ref();

    const exchangeValue = computed(() => {
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

    return {
        startExchangeValue,
        manualExchangeValue,
        exchangeValue,
    }
}
