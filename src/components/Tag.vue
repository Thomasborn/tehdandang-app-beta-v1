<template>
    <div class="d-tag" :class="`d-tag-${severity}`">
        {{ label }}
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    severity: {
        type: String,
        default: "primary",
    },
});
</script>

<style scoped lang="scss">
.d-tag {
    display: inline-block;
    padding: 4px 6px;
    border-radius: 0.5rem;
    font-size: 10px;
    font-weight: 600;
}

.d-tag-primary {
    color: var(--primary-500);
    background: var(--primary-a3);
    border: 1px solid var(--primary-a8);
}
.d-tag-success {
    color: var(--color-success-500);
    background: var(--color-success-a3);
    border: 1px solid var(--color-success-a8);
}
.d-tag-warning {
    color: var(--color-warning-500);
    background: var(--color-warning-a3);
    border: 1px solid var(--color-warning-a8);
}
.d-tag-danger {
    color: var(--color-danger-500);
    background: var(--color-danger-a3);
    border: 1px solid var(--color-danger-a8);
}
.d-tag-info {
    color: var(--color-info-500);
    background: var(--color-info-a3);
    border: 1px solid var(--color-info-a8);
}
</style>
