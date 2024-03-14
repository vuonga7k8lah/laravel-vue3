<template>
    <div class="container">
        <h4 class="card-header text-center">Login</h4>
        <div class="card m-3">
            <div class="card-body">
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                    <a-form-item
                        label="Email"
                        name="email"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]"
                    >
                        <a-input v-model:value="formState.email" />
                    </a-form-item>

                    <a-form-item
                        label="Password"
                        name="password"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item
                        name="remember"
                        :wrapper-col="{ offset: 8, span: 16 }"
                    >
                        <a-checkbox v-model:checked="formState.remember"
                            >Remember me</a-checkbox
                        >
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit"
                            >Submit</a-button
                        >
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const formState = reactive({
    email: "",
    password: "",
    remember: true,
});
const router = useRouter();
const onFinish = (values) => {
    axios
        .post("http://127.0.0.1:8000/api/vuongkma/v1/login", values)
        .then(function (response) {
            const result = response.data;

            if (result.status == "success") {
                localStorage.setItem("user", JSON.stringify(result.data));
                //redirect url
                router.push({ name: "admin-users" });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>
