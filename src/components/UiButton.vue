<template>
    <button
        class="ui-button"
        :class="uiButtonClasses"
    >
        <img
            v-if="icon"
            :src="require(`../assets/img/icons/icon-${icon}.svg`)"
            class="ui-button__icon"
        >
        <span class="ui-button__desc">
            <slot name="desc"></slot>
        </span>
    </button>
</template>

<script>

export default {
    name: "UiButton",
    props: {
        noDesc: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: '',
        },
        buttonType: {
            type: String,
            default: '',
        },
    },

    setup(props) {
        const uiButtonClasses = [
            props.buttonType ? `ui-button--${props.buttonType}` : '',
        ]

        return {
            uiButtonClasses
        };
    },
}
</script>

<style lang="scss">
    @import "./styles/uiButton/ui-button.scss";
</style>