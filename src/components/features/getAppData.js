import { ref } from "vue";
import { randomInteger } from "@/components/features/helpFunctions";
import storageData from "@/components/jsons/storageData";
import {dataCode} from "@/components/features/appEnums";

const {
    codePrice,
    codeStorageCount,
} = dataCode

export const getData = () => {
    const isPageDataLoaded = ref(false);
    const rawCatalog = ref([]);
    const updateStamp = ref(0)

    // TODO или прямое получение данных из файла
    const getDataFromFile = () => {
        const newJson = storageData.Value.Goods
        updateStamp.value = new Date() / 1000;
        rawCatalog.value = newJson
        isPageDataLoaded.value = true;
    };
    getDataFromFile();

    setInterval ( () => {
        storageData.Value.Goods[randomInteger(0, 11)][codePrice] = randomInteger(0, 99);
        storageData.Value.Goods[randomInteger(0, 11)][codeStorageCount] = randomInteger(0, 10);
    }, 2000)

    return {
        rawCatalog,
        isPageDataLoaded,
        getDataFromFile,
        updateStamp
    }
}