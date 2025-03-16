import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LoginView from "./views/LoginView.vue";
import ChatView from './views/ChatView.vue'
import MetricsView from './views/MetricsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/chat', component: ChatView },
  { path: '/metrics', component: MetricsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import { FaFlag, RiZhihuFill,IoChatbubblesOutline } from "oh-vue-icons/icons";

// addIcons(FaFlag, RiZhihuFill, IoChatbubblesOutline);

const app = createApp(App)
app.use(router)
// app.component("v-icon", OhVueIcon);

app.mount('#app')
