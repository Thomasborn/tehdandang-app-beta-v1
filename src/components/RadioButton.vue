<template>
    <input
        class="d-inputradio"
        type="radio"
        ref="dRadio"
        :id="inputId"
        :name="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target._value)"
        v-bind="$attrs"
    />
    <span
        class="d-radiobutton"
        :class="'d-radiobutton-' + tone"
        role="button"
        tabindex="-1"
        @click="$refs.dRadio.click()"
    ></span>
</template>

<script setup>
const props = defineProps({
    inputId: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    modelValue: {
        type: [String, Number, Object],
        default: () => ({}),
    },
    tone: {
        type: String,
        default: "primary",
    },
});

//
</script>

<style scoped lang="scss">
.d-radiobutton {
    display: block;
    height: 1.3rem;
    width: 1.3rem;
    border-radius: 50%;
    border: 2px solid var(--surface-input-border);
    transition: all 0.2s ease;
}
.d-radiobutton-primary:hover {
    border: 2px solid var(--primary);
}
.d-radiobutton-primary:focus {
    box-shadow: 0 0 0 3px var(--primary-a);
    // outline: 2px solid var(--primary);
}
input[type="radio"]:checked + span.d-radiobutton-primary {
    border: 6px solid var(--primary);
}
.d-inputradio {
    display: none;
}

// tone green
.d-radiobutton-tone-green:hover {
    border: 2px solid var(--tone-green);
}
.d-radiobutton-tone-green:focus {
    box-shadow: 0 0 0 3px var(--tone-green-a);
    // outline: 2px solid var(--tone-green);
    // border: 2px solid var(--tone-green);
}
input[type="radio"]:checked + span.d-radiobutton-tone-green {
    border: 6px solid var(--tone-green);
}
// tone blue
.d-radiobutton-tone-blue:hover {
    border: 2px solid var(--tone-blue);
}
.d-radiobutton-tone-blue:focus {
    box-shadow: 0 0 0 3px var(--tone-blue-a);
    // outline: 2px solid var(--tone-blue);
    // border: 2px solid var(--tone-blue);
}
input[type="radio"]:checked + span.d-radiobutton-tone-blue {
    border: 6px solid var(--tone-blue);
}
// tone orange
.d-radiobutton-tone-orange:hover {
    border: 2px solid var(--tone-orange);
}
.d-radiobutton-tone-orange:focus {
    box-shadow: 0 0 0 3px var(--tone-orange-a);
    // outline: 2px solid var(--tone-orange);
    // border: 2px solid var(--tone-orange);
}
input[type="radio"]:checked + span.d-radiobutton-tone-orange {
    border: 6px solid var(--tone-orange);
}
// tone purple
.d-radiobutton-tone-purple:hover {
    border: 2px solid var(--tone-purple);
}
.d-radiobutton-tone-purple:focus {
    box-shadow: 0 0 0 3px var(--tone-purple-a);
    // outline: 2px solid var(--tone-purple);
    // border: 2px solid var(--tone-purple);
}
input[type="radio"]:checked + span.d-radiobutton-tone-purple {
    border: 6px solid var(--tone-purple);
}
// tone red
.d-radiobutton-tone-red:hover {
    border: 2px solid var(--tone-red);
}
.d-radiobutton-tone-red:focus {
    box-shadow: 0 0 0 3px var(--tone-red-a);
    // outline: 2px solid var(--tone-red);
    // border: 2px solid var(--tone-red);
}
input[type="radio"]:checked + span.d-radiobutton-tone-red {
    border: 6px solid var(--tone-red);
}
</style>
