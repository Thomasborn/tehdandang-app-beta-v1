<template>
    <div class="layout-wrapper">
        <div class="layout-topbar">
            <app-topbar />
        </div>
        <div class="layout-main-container">
            <router-view />
        </div>
        <div
            class="layout-bottombar"
            :style="{
                display: layoutStore.layoutState.buttonbarMenuVisible
                    ? ''
                    : 'none',
            }"
        >
            <app-bottombar :models="menuItemStore.menuItem" />
        </div>
        <div class="layout-footer">
            <app-footer></app-footer>
        </div>
    </div>
</template>

<script setup>
import AppTopbar from "./AppTopbar.vue";
import AppBottombar from "./AppBottombar.vue";
import AppFooter from "./AppFooter.vue";
import { useMenuItemStore } from "../stores/MenuItemStore";
import { useLayoutStore } from "../stores/LayoutStore";

const menuItemStore = useMenuItemStore();
const layoutStore = useLayoutStore();
//
</script>

<style scoped>
.layout-footer {
    padding: 0 1.25rem 7rem 1.25rem;
}
</style>
