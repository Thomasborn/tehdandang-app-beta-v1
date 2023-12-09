<template>
    <div class="card">
        <h5>Pengaturan</h5>
        <div class="tone-select">
            <span>Pilih Tone</span>
        </div>
        <div class="tone-select-group">
            <div v-for="option in options" class="tone-select-rad">
                <RadioButton
                    v-model="tone"
                    name="tone"
                    :inputId="`tone-${option}`"
                    :value="`tone-${option}`"
                    :tone="`tone-${option}`"
                />
                <label :for="`tone-${option}`">
                    <span>Tone {{ option }}</span>
                    <div
                        class="sample-tone"
                        :style="{ backgroundColor: `var(--tone-${option})` }"
                    ></div>
                </label>
            </div>
        </div>
        <div class="flex justify-content-end" style="margin-top: 2rem">
            <Button
                label="Save changes"
                @click="layoutStore.onChangeTone(tone)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useLayoutStore } from "../../stores/LayoutStore";

const layoutStore = useLayoutStore();
const tone = ref(layoutStore.layoutConfig.tone);
const options = ref(["green", "blue", "orange", "purple", "red"]);

watch(
    () => layoutStore.layoutConfig.tone || layoutStore.layoutConfig.theme,
    () => {
        localStorage.setItem("layoutTone", layoutStore.layoutConfig.tone);
        localStorage.setItem("layoutTheme", layoutStore.layoutConfig.theme);
    }
);

//
</script>

<style scoped lang="scss">
.tone-select {
    margin-bottom: 1rem;
}
.tone-select-group {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .tone-select-rad {
        display: flex;
        gap: 1rem;

        label {
            display: flex;
            gap: 0.5rem;
            .sample-tone {
                height: 1.5rem;
                width: 1.5rem;
                border-radius: 5px;
            }
        }
    }
}
</style>
