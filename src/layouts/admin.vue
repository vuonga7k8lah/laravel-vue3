<template>
    <Header />
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-sm-3 d-none d-sm-flex">
                <a-list bordered style="width: 100%">
                    <template #header>
                        <div>Bảng điều khiển</div>
                    </template>
                    <TheMenu />
                </a-list>
            </div>
            <div class="col-12 col-sm-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../components/Header.vue";
import TheMenu from "../components/TheMenu.vue";
export default {
    components: {
        Header,
        TheMenu,
    },
};
</script>
