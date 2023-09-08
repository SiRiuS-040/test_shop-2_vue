import {
        // computed,
        ref
} from "vue";
// import namesData from "@/components/features/names";
// import apiMethods from "@/components/api/resources/apiMethods";

import storageData from "@/components/features/storageData";

export const getData = () => {
    const isPageDataLoaded = ref(false);
    const rawAppData = ref({});

    // подключение через запрос
    // const loadApiMethods = async() => {
    //     appPageData.value = await apiMethods.index();
    //
    //     if (appPageData.value.dataEmpty === true) {
    //         isPageDataLoaded.value = false;
    //     } else {
    //         isPageDataLoaded.value = true;
    //     }
    // };
    // loadApiMethods().then();

    // или прямое получение данных из файла
    const getDataFromFile = () => {
        rawAppData.value = storageData
        isPageDataLoaded.value = true;
    };
    getDataFromFile();

    return {
        rawAppData,
        isPageDataLoaded,
    }
}