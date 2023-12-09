import { defineStore } from "pinia";
import { menuItem } from "./MenuItemData";

export const useMenuItemStore = defineStore("menuItemStore", {
    state: () => ({
        // homeChildren: homeChildren,
        menuItem: menuItem,
    }),
    getters: {
        getHomeChildren() {
            return this.menuItem[0].children;
        },
    },
    actions: {
        getItemKey(routeName) {
            let itemKey = "";
            let menuItem = this.menuItem;
            for (const index in menuItem) {
                if (menuItem[index].to.name === routeName) {
                    return (itemKey += index);
                }
                if (menuItem[index].children) {
                    for (const index2 in menuItem[index].children) {
                        if (
                            menuItem[index].children[index2].to.name ===
                            routeName
                        ) {
                            return (itemKey += index + "-" + index2);
                        }
                    }
                }
            }
        },
    },
});
