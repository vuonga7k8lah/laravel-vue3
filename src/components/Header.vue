<template>
    <div class="container-fluid">
        <div
            class="row align-items-center text-center"
            style="background-color: aqua; padding: 1rem"
        >
            <div
                class="col-1 d-flex d-sm-none align-items-center justify-content-center"
            >
                <span v-on:click="showDrawer"
                    ><i class="fa-solid fa-bars"></i
                ></span>
            </div>

            <div
                class="col-10 col-sm-3 d-flex align-items-center justify-content-center justify-content-sm-start"
            >
                <img
                    src="../assets/logo.svg"
                    alt="Logo"
                    width="34"
                    height="32"
                    class="ms-3 me-3"
                />
                <span class="d-none d-sm-flex">Quan Tri</span>
            </div>

            <div
                class="col-sm-9 d-none justify-content-end d-sm-flex align-items-center"
            >
                <span>Admin</span>
            </div>

            <div
                class="col-1 d-flex d-sm-none align-items-center justify-content-center"
            >
                <span v-on:click="showDrawerUser"
                    ><i class="fa-solid fa-user-plus"></i
                ></span>
            </div>
        </div>
    </div>
    <a-drawer
        v-model:open="state.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        title="Menu"
        placement="left"
    >
        <TheMenu />
    </a-drawer>
    <a-drawer
        v-model:open="state.visibleUser"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        title="User"
        placement="right"
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import TheMenu from "../components/TheMenu.vue";

export default {
    components: {
        TheMenu,
    },
    setup() {
        const state = ref({
            open: false,
            visibleUser: false,
        });

        const showDrawer = () => {
            state.value = {
                open: true,
                visibleUser: false,
            };
        };
        const showDrawerUser = () => {
            state.value = {
                open: false,
                visibleUser: true,
            };
        };

        return { state, showDrawer, showDrawerUser };
    },
};
</script>
