<template>day la admin setting index</template>
<script>
import { MenuStore } from "../../stores/use-menu";
export default {
    setup() {
        MenuStore().onSelectedKeys(["admin-settings"]);
    },
};
</script>
