<template>
    <div class="layout-bottombar-menu">
        <router-link
            v-for="(model, index) in models"
            :to="model.to"
            class="layout-bottombar-menuitem"
            :class="{
                'bottombar-menuitem-active': checkActiveRoute(model, index),
            }"
        >
            <div class="layout-bottombar-menuitem-icon">
                <span class="material-symbols-outlined">
                    {{ model.icon }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, watch } from "vue";
import { useLayoutStore } from "../stores/LayoutStore";
import { useMenuItemStore } from "../stores/MenuItemStore";

const route = useRoute();
const menuItemStore = useMenuItemStore();
const layoutStore = useLayoutStore();

const props = defineProps({
    models: {
        type: Array,
        default: [],
    },
});

onBeforeMount(() => {
    if (layoutStore.layoutConfig.activeMenuItem === "")
        layoutStore.setActiveMenuItem(route.name);
    if (layoutStore.layoutConfig.activePageName === "")
        layoutStore.setActivePageName(
            layoutStore.getActivePageName(route.name, menuItemStore.menuItem)
        );
    layoutStore.setButtonbarMenuVisible();

    if (
        localStorage.getItem("layoutTone") ||
        localStorage.getItem("layoutTheme")
    ) {
        let tone = localStorage.getItem("layoutTone");
        layoutStore.onChangeTone(tone);
    }
});

watch(
    () => route.name,
    () => {
        layoutStore.setActiveMenuItem(route.name);
        layoutStore.setActivePageName(
            layoutStore.getActivePageName(
                layoutStore.layoutConfig.activeMenuItem,
                menuItemStore.menuItem
            )
        );
        layoutStore.setButtonbarMenuVisible();
    }
);

const checkActiveRoute = (model, index) => {
    if (route.name === model.to.name) {
        return true;
    } else if (route.name.split("-")[0] === model.to.name.split("-")[0]) {
        return true;
    } else {
        return false;
    }
};
//
</script>

<style scoped lang="scss">
.layout-bottombar-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--surface-a);
    padding: 1rem 2rem;
    border-radius: var(--border-radius-2);
    box-shadow: 0 0 1rem var(--box-shadow);
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: var(--box-shadow-a) 0px 7px 29px 0px;
    }

    .layout-bottombar-menuitem {
        user-select: none;

        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        color: var(--text-color-secondary);
        transition: background-color 0.3s ease;

        .layout-bottombar-menuitem-icon span {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }

        &:hover {
            background-color: var(--surface-ground);
            border: 1px solid var(--surface-border);
            .layout-bottombar-menuitem-icon {
                filter: brightness(85%);
            }
        }
        &:active {
            background-color: var(--surface-ground);
            border: 1px solid var(--surface-border);
            .layout-bottombar-menuitem-icon {
                filter: brightness(100%);
            }
        }
        &:focus {
            background-color: var(--surface-ground);
            border: 2px solid var(--surface-border);
        }
    }

    .layout-bottombar-menuitem.bottombar-menuitem-active {
        background: var(--primary);
        color: var(--text-primary);
        border: 2px solid var(--surface-border);

        &:hover {
            filter: brightness(85%);
            border: 1px solid var(--surface-border);
            .layout-bottombar-menuitem-icon {
                color: var(--text-primary);
                filter: none;
            }
        }

        &:active {
            filter: brightness(100%);
        }
    }
}
</style>
