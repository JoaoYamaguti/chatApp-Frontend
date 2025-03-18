<script setup lang="ts">
import { ref } from "vue";

import type { IUser, IChat } from "../lib/interfaces/IChat";

import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

const baseURL = import.meta.env.VITE_API_URL
const token = sessionStorage.getItem("token")
console.log(token)

const contacts = ref<IUser[]>()
const chat = ref<IChat>()

async function getChats() {
  const res = await (await fetch(baseURL + "/chat", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })).json()

  contacts.value = res.chats

  console.log(res.chats)
}

async function getMessages(id: number) {

  const res = await (await fetch(baseURL + `/chat/${id}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  )).json()

  console.log(res)

  chat.value = res
}

getChats()
</script>

<template>
  <div class="container">
    <HeaderComponent />

    <nav>
      <div>
        <RouterLink to="/chats"><v-icon name="io-chatbubble" /></RouterLink>
        <RouterLink to="/metrics"><v-icon name="io-bar-chart-sharp" /></RouterLink>
      </div>
      <div><v-icon name="io-ellipsis-horizontal" class="configIcon" /></div>
    </nav>

    <aside>
      <ul>
        <li v-for="(chat, index) in contacts" :key="index" @click="getMessages(chat.id)">
          <div class="profileImg">{{ chat.name[0] }}</div>
          <h3>{{ chat.name }}</h3>
        </li>
      </ul>
    </aside>

    <main>
      <div class="chat" v-if="chat">
        <div class="profile">
          <div class="profileImg">{{ chat.receiver_user.name[0] }}</div>
          <h3>{{ chat.receiver_user.name }}</h3>
        </div>
        <ul>
          <li v-for="(message, index) in chat.messages" :key="index" >
            <p :class="message.user_receiver_id == chat.receiver_user.id ? 'receiverMessage' : 'senderMessage'">{{ message.content.toString() }}</p>
          </li>
        </ul>
      </div>
      <div class="noChat" v-else>
        <p>No chat active</p>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped>
@import "../assets/chat.css";
</style>
