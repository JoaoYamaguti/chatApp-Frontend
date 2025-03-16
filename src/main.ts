import "./assets/base.css"

import { createApp } from 'vue'
import App from './App.vue'

// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import { FaFlag, RiZhihuFill,IoChatbubblesOutline } from "oh-vue-icons/icons";

// addIcons(FaFlag, RiZhihuFill, IoChatbubblesOutline);

const app = createApp(App)

// app.component("v-icon", OhVueIcon);

app.mount('#app')
