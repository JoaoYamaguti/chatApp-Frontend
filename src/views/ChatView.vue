<script setup lang="ts">
import { nextTick, onMounted, onUpdated, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { IChat, IUser } from "../lib/interfaces/IChat";

import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import NotifyComponent from "../components/NotifyComponent.vue";

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL
const token = sessionStorage.getItem("token")
const userId = sessionStorage.getItem("id")

const router = useRouter()
const route = useRoute()

const contacts = ref<IUser[]>()
const chat = ref<IChat>()
const page = ref(1)
const newContactId = ref<number>()
const contentText = ref<string>()
const showNewContactModal = ref(false)
const messageList = ref(null)
const messageForm = ref(null)
const notify = reactive({
  show: false,
  msg: "",
  class: "",
  timerID: setTimeout(() => { }, 0),
  start: () => {
    notify.show = true
    notify.timerID = setTimeout(() => {
      notify.show = false
    }, 5000)
  },
  cancel: () => {
    clearTimeout(notify.timerID)
    notify.show = false
  }
})

async function getChats() {
  try {
    const res = await axios.get(baseURL + "/chat", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    contacts.value = res.data.chats

  } catch {
    router.replace('/login')
    return
  }

}

function changeChat(id: number) {
  page.value = 1
  router.replace(`/chat/${id}`)
}

async function getMessages() {
  if (route.params.id == undefined || route.params.id == null) {
    return
  }


  const res = await axios.get(baseURL + `/chat/${route.params.id}?page=${page.value}`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })

  chat.value = res.data

  getChats()
}

function increasePage() {
  page.value = page.value + 1
  console.log(page.value)
  getMessages()
}

async function sendMessage() {
  const data = new FormData(messageForm.value!)

  axios.post(baseURL + `/messages/create`, data, {
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/Form-data"
    }
  })

  contentText.value = ""

  getMessages()
}

async function sendFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  const file = files[0]

  let b64 = ''

  if (file) {
    const reader = new FileReader();

    reader.onloadend = async function () {
      const base64String = reader.result;

      b64 = base64String?.toString() ?? "";

      await axios.post(baseURL + "/messages/create", {
        content: file.name + "|" + b64,
        user_receiver_id: chat.value?.receiver_user.id
      }, {
        headers: {
          "Authorization": "Bearer " + token
        },

      })
      getMessages()
    };

    reader.readAsDataURL(file);
  }
}

async function handleNewContactModal() {
  showNewContactModal.value = !showNewContactModal.value
  await nextTick()
}

async function addChat() {
  if (newContactId.value == userId?.toString()) {
    notify.msg = "Você está louco? quer conversar com você mesmo?"
    notify.class = "error"
    notify.start()
    return
  }
  try {
    const res = await axios.get(baseURL + `/users/show/${newContactId.value}`)

    const user = res.data as IUser

    if (Number(userId) === user.id) {
      notify.msg = "Usuário não encontrado."
      notify.class = "error"
      notify.start()
      return
    }

    router.push(`/chat/${user.id}`)
    handleNewContactModal()

  } catch {
    notify.msg = "Usuário não encontrado."
    notify.class = "error"
    notify.start()
    return
  }
}

getChats()

onMounted(getMessages)

onUpdated(() => {
  const messageList = document.querySelector("#messageList")

  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight
  }
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
      <div>
        <RouterLink to="/profile"><v-icon name="io-person" class="configIcon" /></RouterLink>
      </div>
    </nav>

    <aside>
      <ul>
        <li v-for="(chat, index) in contacts" :key="index" @click="changeChat(chat.id)">
          <div class="profileImg">{{ chat.name[0] }}</div>
          <h3>{{ chat.name }}</h3>
        </li>
        <li @click="handleNewContactModal">
          +
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
          <li v-if="chat.totalMessages !== chat.messages.length" class="loadMore" @click="increasePage"><span>Carregar mais mensagens...</span></li>
          <li v-for="(message, index) in chat.messages" :key="index" class="messageLi">
            <div class="message"
              :class="message.user_receiver_id === chat.receiver_user.id ? 'senderMessage' : 'receiverMessage'">
              <p v-if="!message.content.includes('base64')">{{
                message.content.toString() }}</p>
              <div v-else class="fileLi">
                <p>{{ message.content.split('|')[0] }}</p>
                <a :href="message.content.split(`|`)[1]" download="true"><v-icon name="io-download" /></a>
              </div>
              <span>{{ message.created_at.split("T")[1].slice(0, 5) }}</span>
            </div>
          </li>
        </ul>
        <form ref="messageForm" @submit.prevent="sendMessage">
          <input type="number" name="user_receiver_id" id="user_receiver_id" :value="chat.receiver_user.id">
          <input type="text" name="content" id="content" v-model="contentText" placeholder="message...">
          <button type="button" class="attach">
            <label for="file">
              <v-icon name="io-document-attach-sharp" />
              <input type="file" name="file" id="file" @change="sendFile">
            </label>
          </button>
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

  <NotifyComponent v-if="notify.show" :class="notify.class">{{ notify.msg }}</NotifyComponent>

  <div class="newContactModal" v-if="showNewContactModal" @click="handleNewContactModal">
    <form class="modal" @submit.prevent="addChat" @click.stop="">
      <label for="newContactId">
        Id:
        <input type="number" name="newContactId" id="newContactId" v-model="newContactId" :min="0">
      </label>
      <div class="btns">
        <button type="button" class="close" @click="handleNewContactModal">Fechar</button>
        <button type="submit">+ Novo Chat</button>
      </div>
    </form>
  </div>
</template>

<style scoped src="../assets/chat.css"></style>
