<template>

</template>

<script>

export default {
    name: "UiInput",
    props: {
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/variables";
    @import "../components/styles/uiInput/ui-input";
</style>