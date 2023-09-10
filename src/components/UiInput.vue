<template>
    <input
        :type="type"
        :placeholder="placeholder"
        class="ui-input"
    >
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
    @import "../components/styles/uiInput/ui-input";
</style>