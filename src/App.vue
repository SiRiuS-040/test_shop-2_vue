<template>
        <RouterView
            v-slot="{ Component }"
            :key="route.path"
        >
            <Transition>
                <component
                    :is="Component"
                />
            </Transition>
        </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import {useRoute} from "vue-router";
const route = useRoute();

</script>

<style lang="scss">
    //@import "../src/assets/variables";
</style>
