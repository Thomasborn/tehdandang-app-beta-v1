import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layoutStore", {
    state: () => ({
        layoutConfig: {
            theme: "light-theme",
            tone: "tone-green",
            activeMenuItem: "",
            activePageName: "",
        },
        layoutState: {
            backWindowButton: false,
            buttonbarMenuVisible: false,
            isModalOpen: false
        },
    }),
    getters: {},
    actions: {
        onChangeTone(tone) {
            const elementId = "tone-css";
            const linkElement = document.getElementById(elementId);
            const cloneLinkElement = linkElement.cloneNode(true);
            const newToneUrl = linkElement
                .getAttribute("href")
                .replace(this.layoutConfig.tone, tone);
            cloneLinkElement.setAttribute("id", elementId + "-clone");
            cloneLinkElement.setAttribute("href", newToneUrl);
            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", elementId);
                this.layoutConfig.tone = tone;
            });
            linkElement.parentNode.insertBefore(
                cloneLinkElement,
                linkElement.nextSibling
            );
        },
        setActiveMenuItem(item) {
            this.layoutConfig.activeMenuItem = item;
        },
        setActivePageName(name) {
            this.layoutConfig.activePageName = name;
        },
        setBackWindowButton() {
            if (this.layoutConfig.activeMenuItem === "home")
                this.layoutState.backWindowButton = false;
            else this.layoutState.backWindowButton = true;
        },
        setButtonbarMenuVisible() {
            if (this.layoutConfig.activeMenuItem === "transaction-add")
                this.layoutState.buttonbarMenuVisible = false;
            else this.layoutState.buttonbarMenuVisible = true;
        },
        getActivePageName(routeName, menuItem) {
            for (let i in menuItem) {
                if (routeName === menuItem[i].to.name) {
                    return menuItem[i].label;
                }
                if (menuItem[i].children) {
                    for (let j in menuItem[i].children) {
                        if (routeName === menuItem[i].children[j].to.name) {
                            return menuItem[i].children[j].label;
                        }
                    }
                }
            }
        },
    },
});
