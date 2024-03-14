import { defineStore } from "pinia";

export const MenuStore = defineStore("menuId", {
    state: () => {
        return {
            selectedKeys: [],
            openKeys: [],
        };
    },
    actions: {
        onSelectedKeys(data) {
            this.selectedKeys = data;
        },
        onOpenKeys(data) {
            this.onOpenKeys = data;
        },
    },
});
