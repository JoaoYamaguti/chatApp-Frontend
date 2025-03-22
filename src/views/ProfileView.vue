<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import NotifyComponent from '@/components/NotifyComponent.vue';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const baseURL = import.meta.env.VITE_API_URL
const token = sessionStorage.getItem("token")
const userId = sessionStorage.getItem("id")
const user = ref()
const form = ref()
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

async function getUser() {
  const router = useRouter()
  try {
    const res = await axios.get(baseURL + `/users/show/${userId}`)

    user.value = res.data
  } catch {
    router.push("/login")
  }
}

async function editProfile() {
  const data = new FormData(form.value)

  if (data.get("password") != "") {
    if (data.get("password") !== data.get("confirmPassword")) {
      notify.msg = "Confirme sua nova senha."
      notify.class = "error"
      notify.start()
      return
    }
  } else {
    data.delete("password")
    data.delete("confirmPassword")
  }

  await axios.post(baseURL + `/users/edit`, data,
    {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  )

  notify.msg = "Usuário Alterado."
  notify.class = "ok"
  notify.start()

  getUser()

  return
}

getUser()
</script>

<template>
  <div class="container">
    <HeaderComponent />

    <nav>
      <div>
        <RouterLink to="/chat"><v-icon name="io-chatbubble" /></RouterLink>
        <RouterLink to="/metrics"><v-icon name="io-bar-chart-sharp" /></RouterLink>
      </div>
      <div>
        <RouterLink to="/profile"><v-icon name="io-person" class="configIcon" /></RouterLink>
      </div>
    </nav>

    <main>
      <h2>Id: {{ userId }}</h2>
      <form @submit.prevent="editProfile" ref="form">
        <input v-if="user" type="name" name="name" id="name" placeholder="Name" :value="user.name">
        <input v-if="user" type="email" name="email" id="email" placeholder="E-mail" :value="user.email" disabled>
        <input type="password" name="password" id="password" placeholder="Senha">
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmação de senha">
        <button type="submit">Salvar</button>
      </form>
    </main>

    <FooterComponent />
  </div>
  <NotifyComponent v-if="notify.show" :class="notify.class">{{ notify.msg }}</NotifyComponent>
</template>

<style scoped src="../assets/profile.css"></style>
