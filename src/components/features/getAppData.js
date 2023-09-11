import {ref} from "vue";
import storageData from "@/components/features/storageData";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getData = () => {
    const isPageDataLoaded = ref(false);
    const rawAppData = ref({});
    const updateStamp = ref(0)

    const rawCatalog = ref([]);

    // TODO прямое получение данных из файла
    const getDataFromFile = () => {
        rawAppData.value = storageData
        rawCatalog.value = storageData.Value.Goods
        isPageDataLoaded.value = true;
    };

    getDataFromFile();

    setInterval ( () => {
        storageData.Value.Goods[0]['C'] = randomInteger(0, 10)
        storageData.Value.Goods[0]['G'] = randomInteger(1, 3)
    }, 1000)

    return {
        rawAppData,
        rawCatalog,
        isPageDataLoaded,
        getDataFromFile,
        updateStamp
    }
}