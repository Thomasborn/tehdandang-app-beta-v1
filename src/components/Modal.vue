<template>
    <div v-if="visible" class="d-modal-mask" :style="maskStyle">
        <div class="d-modal" :style="modalStyle">
            <div class="d-modal-header" :style="headerStyle">
                <div class="d-modal-header-left">
                    <div
                        class="d-modal-nav-button nav-back-button"
                        role="button"
                        tabindex="0"
                        @click="emit('update:visible', false)"
                    >
                        <span
                            v-if="navType === 'back'"
                            class="material-symbols-outlined"
                        >
                            arrow_back
                        </span>
                    </div>
                    <div class="d-modal-header-title" name="header">
                        <h5>
                            <slot name="header">
                                {{ header ? header : "" }}
                            </slot>
                        </h5>
                    </div>
                </div>
                <div class="d-modal-header-right">
                    <div
                        v-if="navType === 'close'"
                        class="d-modal-nav-button nav-close-button"
                        role="button"
                        tabindex="0"
                        @click="emit('update:visible', false)"
                    >
                        <span class="material-symbols-outlined"> close </span>
                    </div>
                </div>
            </div>
            <div class="d-modal-content">
                <slot></slot>
            </div>
            <div class="d-modal-footer" :style="footerStyle">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps({
    header: {
        type: String,
        default: "",
    },
    navType: {
        type: String,
        default: "close",
    },
    visible: {
        type: Boolean,
        default: false,
    },
    modalStyle: {
        type: Object,
        default: () => {},
    },
    headerStyle: {
        type: Object,
        default: () => {},
    },
    footerStyle: {
        type: Object,
        default: () => {},
    },
    maskStyle: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(["update:visible"]);

watch(
    () => props.visible,
    () => {
        props.visible
            ? document.body.classList.add("d-modal-open")
            : document.body.classList.remove("d-modal-open");
    }
);

//
</script>

<style scoped lang="scss">
.d-modal-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .d-modal {
        background-color: var(--surface-ground);
        width: 20rem;
        height: 30rem;
        padding: 0;
        border-radius: var(--border-radius);
        position: relative;
        overflow-y: scroll !important;

        .d-modal-content {
            padding: 0 1.5rem;
        }

        .d-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            position: sticky;
            top: 0;
            background: var(--surface-ground);
            padding: 1.5rem;

            .d-modal-header-left {
                display: flex;
                align-items: center;
                gap: 0.75rem;

                .d-modal-header-title {
                    text-transform: capitalize;
                    h5 {
                        margin: 0;
                    }
                }
            }

            .d-modal-nav-button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.25rem;
                border-radius: 50%;
                transition: all 0.2s ease;

                &:hover {
                    background-color: var(--primary-a1);
                }

                &:active {
                    filter: brightness(95%);
                }

                &:focus {
                    box-shadow: 0 0 0 3px var(--primary-a);
                    outline: 1px solid var(--primary);
                }
            }
        }

        .d-modal-footer {
            margin-top: 1.5rem;
            padding: 0 1.5rem;
            position: sticky;
            bottom: 0;
        }
    }
}
</style>
