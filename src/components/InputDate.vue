<template>
    <input
        class="d-inputdate"
        :class="{ 'd-inputdate-null': modelValue === null }"
        type="date"
        :name="inputId"
        :id="inputId"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue')"
    />
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: null,
    inputId: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
});
</script>

<style scoped lang="scss">
.d-inputdate {
    font-family: var(--font-family);
    border: 2px solid var(--surface-input-border);
    border-radius: 10px;
    padding: 0.5rem;
    font-size: 1rem;

    &:hover {
        border: 2px solid var(--primary);
    }
    &:focus {
        outline: none;
        border: 2px solid var(--primary);
        box-shadow: 0 0 0 3px var(--primary-a);
    }
}
.d-inputdate-null {
    color: var(--text-color-secondary);
}
</style>
