import { ref } from "vue";

import storageData from "@/components/features/storageData";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getData = () => {
    const isPageDataLoaded = ref(false);
    const rawCatalog = ref([]);
    const updateStamp = ref(0)

    // TODO или прямое получение данных из файла
    const getDataFromFile = () => {
        const newJson = storageData.Value.Goods
        rawCatalog.value = newJson
        isPageDataLoaded.value = true;
    };

    getDataFromFile();

    setInterval ( () => {
        storageData.Value.Goods[0]['C'] = randomInteger(0, 10)
        storageData.Value.Goods[0]['P'] = randomInteger(0, 10)

    }, 1000)

    return {
        rawCatalog,
        isPageDataLoaded,
        getDataFromFile,
        updateStamp
    }
}