import { ref } from "vue";
import { randomInteger } from "@/components/features/helpFunctions";
import storageData from "@/components/features/storageData";

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

    // Обновление данных в Json - имитация
    setInterval ( () => {
        storageData.Value.Goods[randomInteger(0, 11)]['C'] = randomInteger(0, 99);
        storageData.Value.Goods[randomInteger(0, 11)]['P'] = randomInteger(0, 10);
    }, 2000)

    return {
        rawCatalog,
        isPageDataLoaded,
        getDataFromFile,
        updateStamp
    }
}