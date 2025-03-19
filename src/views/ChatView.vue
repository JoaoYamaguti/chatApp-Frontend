<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { IChat, IUser } from "../lib/interfaces/IChat";

import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

const baseURL = import.meta.env.VITE_API_URL
const token = sessionStorage.getItem("token")

const router = useRouter()
const route = useRoute()

const contacts = ref<IUser[]>()
const chat = ref<IChat>()
const messageList = ref(null)
const messageForm = ref(null)

async function getChats() {
  const res = await fetch(baseURL + "/chat", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })

  if (res.status === 401) {
    router.replace('/login')
    return
  }

  const dataRes = await res.json()

  contacts.value = dataRes.chats
}

function changeChat(id: number) {
  router.replace(`/chat/${id}`)
}

async function getMessages() {
  const res = await (await fetch(baseURL + `/chat/${route.params.id}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  )).json()

  chat.value = res
}

async function sendMessage() {
  const data = new FormData(messageForm.value!)

  const res = await (await fetch(baseURL + "/messages/create", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: data
  })).json()

  if (res.error) {
    return
  }

  location.reload()
  // router.replace(route.path)
}

getChats()

onMounted(getMessages)
onUpdated(() => {
  const messageList = document.querySelector("#messageList")

  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight
  }

  console.log(messageList)

})

watch(() => route.params.id, getMessages)

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
        <li v-for="(chat, index) in contacts" :key="index" @click="changeChat(chat.id)">
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
        <ul ref="messageList" id="messageList">
          <li v-for="(message, index) in chat.messages" :key="index">
            <div class="message"
              :class="message.user_receiver_id === chat.receiver_user.id ? 'senderMessage' : 'receiverMessage'">
              <p>{{
                message.content.toString() }}</p>
              <span>{{ message.created_at.split("T")[1].slice(0, 5) }}</span>
            </div>
          </li>
        </ul>
        <form ref="messageForm" @submit.prevent="sendMessage">
          <input type="number" name="user_receiver_id" id="user_receiver_id" :value="chat.receiver_user.id">
          <input type="text" name="content" id="content" value="Bom dia!">
          <button type="submit">
            <v-icon name="io-paper-plane-sharp" />
          </button>
        </form>
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
