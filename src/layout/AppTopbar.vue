<template>
    <div class="left-icon">
        <router-link :to="{ name: 'home' }">
            <span
                class="material-symbols-outlined"
                :class="{
                    hidden: layoutStore.layoutState.backWindowButton,
                }"
                >view_cozy</span
            >
            <span
                class="material-symbols-outlined"
                :class="{
                    hidden: !layoutStore.layoutState.backWindowButton,
                }"
                >arrow_back_ios_new</span
            >
        </router-link>
    </div>
    <div class="middle-content">
        <span class="page-title">{{
            layoutStore.layoutConfig.activePageName
        }}</span>
    </div>
    <div class="right-icon">
        <router-link to="#">
            <span class="material-symbols-outlined">person</span>
            <!-- <img src="../assets/icon/user.png" alt="user"/> -->
        </router-link>
    </div>
</template>

<script setup>
import { watch, onBeforeMount } from "vue";
import { useLayoutStore } from "../stores/LayoutStore";

const layoutStore = useLayoutStore();

watch(
    () => layoutStore.layoutConfig.activeMenuItem,
    () => {
        layoutStore.setBackWindowButton();
    }
);
onBeforeMount(() => {
    layoutStore.setBackWindowButton;
});

//
</script>
