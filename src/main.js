import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/styles.scss";

import Button from "./components/Button.vue";
import RadioButton from "./components/RadioButton.vue";
import Modal from "./components/Modal.vue";
import Tag from "./components/Tag.vue";
import InputText from './components/InputText.vue';
import InputNumber from "./components/InputNumber.vue";
import InputDate from './components/InputDate.vue'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("Button", Button);
app.component("RadioButton", RadioButton);
app.component("Modal", Modal);
app.component("Tag", Tag);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component('InputDate', InputDate);

app.mount("#app");
