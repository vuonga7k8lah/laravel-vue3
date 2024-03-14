<template>
    <div class="row">
        <div class="col-12">
            <a-card title="Create user" style="width: 100%">
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                    <div class="mb-3">
                        <a-form-item
                            label="Name"
                            name="name"
                            :rules="[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]"
                        >
                            <a-input v-model:value="name" />
                        </a-form-item>
                    </div>

                    <div class="mb-3">
                        <a-form-item
                            label="Email"
                            name="email"
                            :rules="[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your Email!',
                                },
                            ]"
                        >
                            <a-input v-model:value="email" />
                        </a-form-item>
                    </div>

                    <div class="mb-3">
                        <a-form-item
                            label="Password"
                            name="password"
                            :rules="[
                                {
                                    required: true,
                                    min: 6,
                                    message:
                                        'Please input your password and min 6 chart',
                                },
                            ]"
                        >
                            <a-input-password v-model:value="password" />
                        </a-form-item>
                    </div>
                    <!-- Date -->
                    <div class="mb-3">
                        <a-form-item label="Birthday" name="birthday">
                            <a-date-picker
                                v-model:value="birthday"
                                :format="dateFormatList"
                            />
                        </a-form-item>
                    </div>
                    <!-- select -->
                    <div class="mb-3 form-control">
                        <a-form-item label="Roles user" name="roles">
                            <a-select
                                v-model:value="roles"
                                mode="multiple"
                                style="width: 100%"
                                placeholder="Please select"
                                :options="options"
                            />
                        </a-form-item>
                    </div>
                    <!-- upload -->
                    <div class="mb-3">
                        <a-form-item label="Avatar Upload" name="fileList">
                            <div class="clearfix">
                                <a-upload
                                    v-model:file-list="fileList"
                                    action="http://127.0.0.1:8000/api/vuongkma/v1/images"
                                    list-type="picture-card"
                                    :headers="headers"
                                    @preview="handlePreview"
                                    :multiple="true"
                                >
                                    <div v-if="fileList.length < 3">
                                        <i class="fa-solid fa-plus"></i>
                                        <div style="margin-top: 8px">
                                            Upload
                                        </div>
                                    </div>
                                </a-upload>
                                <a-modal
                                    :open="previewVisible"
                                    :title="previewTitle"
                                    :footer="null"
                                    @cancel="handleCancel"
                                >
                                    <img
                                        alt="example"
                                        style="width: 100%"
                                        :src="previewImage"
                                    />
                                </a-modal>
                            </div>
                        </a-form-item>
                    </div>
                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit"
                            >Submit</a-button
                        >
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>

<script>
import { MenuStore } from "../../stores/use-menu";
import { reactive, toRefs } from "vue";
import dayjs from "dayjs";

export default {
    setup() {
        const token = JSON.parse(localStorage.getItem("user")).access_token;
        MenuStore().onSelectedKeys(["admin-users-create"]);

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        //
        const options = [];
        for (let i = 0; i < 10; i++) {
            const value = `${i.toString(36)}${i}`;
            options.push({
                value,
                disabled: i === 10,
            });
        }
        const roles = ["a10", "c12"];
        //upload
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        }
        const previewVisible = false;
        const previewImage = "";
        const previewTitle = "";
        const fileList = [];

        const handleCancel = () => {
            previewVisible.value = false;
            previewTitle.value = "";
        };
        const handlePreview = async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            previewImage.value = file.url || file.preview;
            previewVisible.value = true;
            previewTitle.value =
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
        };

        function timestampToDDMMYYYY(timestamp) {
            // Create a new Date object using the timestamp (in milliseconds)
            const date = new Date(timestamp);

            // Extract day, month, and year from the Date object
            const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
            const year = date.getFullYear();

            // Return the formatted date string in DD/MM/YYYY format
            return `${day}/${month}/${year}`;
        }
        const headers = { Authorization: "Bearer " + token };
        const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
        //get today
        let today = Date.now();
        const birthday = dayjs(timestampToDDMMYYYY(today), dateFormatList[0]);
        const formState = reactive({
            name: "",
            email: "",
            password: "",
            remember: true,
            roles,
            options,
            previewVisible,
            previewImage,
            previewTitle,
            fileList,
            dateFormatList,
            birthday,
            headers,
        });

        const onFinish = (values) => {
            axios
                .post("http://127.0.0.1:8000/api/vuongkma/v1/users", values, {
                    headers,
                })
                .then(function (response) {
                    const result = response.data;

                    if (result.status == "success") {
                        //redirect url
                        router.push({ name: "admin-users" });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        return {
            ...toRefs(formState),
            onFinishFailed,
            handleCancel,
            handlePreview,
            onFinish,
            formState,
        };
    },
};
</script>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
