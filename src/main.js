import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import {
    List,
    Drawer,
    Button,
    Menu,
    Form,
    Card,
    Input,
    DatePicker,
    Select,
    Upload,
    Table,
    Checkbox,
    message,
} from "ant-design-vue";
import router from "./router/index";
import "../assets/fontawesome/css/all.min.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import axios from "axios";
window.axios = axios;

const app = createApp(App);
const pinia = createPinia();
app.use(Button);
app.use(List);
app.use(Menu);
app.use(Form);
app.use(Table);
app.use(Card);
app.use(Input);
app.use(DatePicker);
app.use(Select);
app.use(Checkbox);
app.use(Upload);
app.use(Drawer);
app.use(pinia);
app.use(router);

app.mount("#app");

app.config.globalProperties.$message = message;
