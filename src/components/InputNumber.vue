<script setup>
const props = defineProps({
    inputId: {
        type: String,
        default: "",
    },
    modelValue: {
        type: Number,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    prefix: {
        type: String,
        default: "",
    },
    suffix: {
        type: String,
        default: "",
    },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <input
        :value="modelValue"
        @keypress="
            ($event) => {
                if ($event.which < 48 || $event.which > 57)
                    $event.preventDefault();
            }
        "
        @input="
            $emit(
                'update:modelValue',
                parseInt($event.target.value)
                    ? parseInt($event.target.value)
                    : 0
            )
        "
        class="d-inputnumber"
        :class="{ 'd-inputnumber-hover': !disabled }"
        :id="inputId"
        type="number"
        :disabled="disabled"
    />
</template>

<style scoped lang="scss">
input[type="number"].d-inputnumber::-webkit-outer-spin-button,
input[type="number"].d-inputnumber::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"].d-inputnumber {
    -moz-appearance: textfield;
}
.d-inputnumber {
    font-family: var(--font-family);
    border: 2px solid var(--surface-input-border);
    border-radius: 10px;
    padding: 0.5rem;
    font-size: 1rem;

    &:focus {
        outline: none;
        border: 2px solid var(--primary);
        box-shadow: 0 0 0 3px var(--primary-a);
    }
}
.d-inputnumber-hover:hover {
    border: 2px solid var(--primary);
}
</style>
