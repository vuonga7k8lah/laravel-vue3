<template>day la admin roles index</template>
<script>
import { MenuStore } from "../../stores/use-menu";
export default {
    setup() {
        MenuStore().onSelectedKeys(["admin-roles"]);
    },
};
</script>
