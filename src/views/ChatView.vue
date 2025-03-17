<script setup lang="ts">
import { ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

const baseURL = import.meta.env.VITE_API_URL
const token = sessionStorage.getItem("token")

const chats = ref([])

async function getChats() {
  console.log(token)
  const res = await (await fetch(baseURL + "/chat", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })).json()

  chats.value = res.chats

  console.log(res.chats)
}

getChats()

</script>

<template>
  <div class="container">
    <HeaderComponent />

    <nav>
      <div>
        <RouterLink to="/chats">Chat</RouterLink>
        <RouterLink to="/metrics">Metrics</RouterLink>
      </div>
      <div>config</div>
    </nav>

    <aside>
      <ul>
        <li v-for="chat in chats" :key="index">
          <h3>{{chat.name}}</h3>
        </li>
      </ul>
    </aside>

    <main>main</main>

    <FooterComponent />
  </div>
</template>

<style scoped>
@import "../assets/chat.css";
</style>
