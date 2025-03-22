import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import ChatView from './views/ChatView.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import MetricsView from './views/MetricsView.vue'
import ProfileView from './views/ProfileView.vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { iconsList } from './icons'

import './assets/base.css'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/chat', component: ChatView },
  { path: '/chat/:id', component: ChatView },
  { path: '/profile', component: ProfileView },
  { path: '/metrics', component: MetricsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

addIcons(...iconsList)

const app = createApp(App)

app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
