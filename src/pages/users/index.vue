<template>
    <div class="container">
        <div class="row">
            <a-card title="List user" style="width: 100%">
                <div class="col-12 d-flex justify-content-end mb-3">
                    <a-button type="primary">
                        <router-link :to="{ name: 'admin-users-create' }">
                            <i class="fa-solid fa-plus"></i>
                        </router-link>
                    </a-button>
                </div>
                <a-table
                    :columns="columns"
                    :data-source="users"
                    :scroll="{ x: 576 }"
                >
                    <template #bodyCell="{ column, index }">
                        <template v-if="column.dataIndex === 'index'">
                            {{ index++ }}
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a-button type="primary" danger>Delete</a-button>
                            <a-button type="primary">Edit</a-button>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </div>
    </div>
</template>
<script>
import { MenuStore } from "../../stores/use-menu";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        MenuStore().onSelectedKeys(["admin-users"]);
        const token = JSON.parse(localStorage.getItem("user")).access_token;
        console.log(token);
        const users = ref([]);

        const getUsers = () => {
            axios
                .get("http://127.0.0.1:8000/api/vuongkma/v1/users", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        users.value = response.data.data;
                    }
                })
                .catch((error) => {
                    console.log("error " + error);
                });
        };
        getUsers();
        const columns = [
            {
                title: "Index",
                dataIndex: "index",
                key: "index",
                width: "10%",
            },
            {
                title: "Name",
                dataIndex: "name",
                sorter: true,
                key: "name",
                width: "20%",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                sorter: true,
                width: "30%",
            },
            {
                title: "Created at",
                dataIndex: "created_at",
                key: "created_at",
                sorter: true,
                width: "20%",
            },
            {
                title: "Action",
                dataIndex: "action",
                fixed: "right",
                filters: [
                    {
                        text: "Male",
                        value: "male",
                    },
                    {
                        text: "Female",
                        value: "female",
                    },
                ],
                width: "20%",
            },
        ];
        return {
            users,
            columns,
        };
    },
});
</script>
