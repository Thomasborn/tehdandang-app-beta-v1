<template>
    <!-- <div> -->
    <button class="d-button" :class="btnClass">
        <div
            class="d-button-ins"
            :class="{ 'd-button-gap': icon && label }"
            :style="insStyle"
        >
            <span class="d-button-icon material-symbols-outlined">
                {{ icon }}
            </span>
            <span class="d-button-label">
                {{ label }}
            </span>
        </div>
    </button>
    <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    severity: {
        type: String,
        default: "primary",
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    outline: {
        type: Boolean,
        default: false,
    },
    insStyle: {
        type: String,
        default: "",
    },
});
const btnClass = ref({
    "d-button-rounded": props.rounded && props.label,
    "d-button-rounded-icon": props.rounded && !props.label && props.icon,
    "d-button-outline": props.outline,
    "d-button-primary": props.severity === "primary",
    "d-button-danger": props.severity === "danger",
    "d-button-warning": props.severity === "warning",
    "d-button-info": props.severity === "info",
    "d-button-success": props.severity === "success",
    "d-button-unknown": props.severity === "unknown",
});
</script>

<style lang="scss">
.d-button {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 10px;
    color: var(--text-primary);
    font-weight: 700;
    user-select: none;
    transition: filter, box-shadow 0.2s ease;

    .d-button-ins {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    span.d-button-icon {
        font-size: 1rem;
    }

    span.d-button-label {
        user-select: none;
        line-height: 1rem;
    }
}

.d-button-rounded,
.d-button-rounded-icon {
    border-radius: 2rem;
}

.d-button-rounded-icon {
    padding: 0.75rem;
}

.d-button-outline {
    background: transparent !important;
    color: var(--primary);
    border: 2px solid var(--primary);
}

.d-button-gap {
    gap: 0.5rem;
}
.d-button:hover {
    filter: brightness(85%);
}
.d-button:active {
    filter: brightness(75%);
}
.d-button-primary {
    background: var(--primary);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--primary-a);
        outline: 1px solid var(--primary);
    }
}
.d-button-success {
    background: var(--color-success);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--color-success-a);
        outline: 1px solid var(--color-success);
    }
}
.d-button-danger {
    background: var(--color-danger);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--color-danger-a);
        outline: 1px solid var(--color-danger);
    }
}
.d-button-warning {
    background: var(--color-warning);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--color-warning-a);
        outline: 1px solid var(--color-warning);
    }
}
.d-button-info {
    background: var(--color-info);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--color-info-a);
        outline: 1px solid var(--color-info);
    }
}
.d-button-unknown {
    background: var(--color-unknown);

    &.d-button:focus {
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1),
            0 0 0 3px var(--color-unknown-a);
        outline: 1px solid var(--color-unknown);
    }
}
</style>
