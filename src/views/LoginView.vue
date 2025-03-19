<script setup lang="ts">
import NotifyComponent from '@/components/NotifyComponent.vue';
import { nextTick, reactive, ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()

const baseURL = import.meta.env.VITE_API_URL

const loginPanel = ref(true)
const loginForm = ref(null)
const signupForm = ref(null)
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

async function login() {
  const data = new FormData(loginForm.value!)
  notify.cancel()

  await nextTick()

  if (data.get("email") == "" || data.get("password") == "") {
    notify.msg = "Preencha todos os campo."
    notify.class = "error"
    notify.start()
    return
  }

  const res = await (await fetch(baseURL + "/login", {
    method: "POST",
    body: data
  })).json()

  if (res.error) {
    notify.msg = "E-mail ou senha incorreto."
    notify.class = "error"
    notify.start()
    return
  }

  if (res.token) {
    sessionStorage.setItem("token", res.token)
    router.push("/chat")
    return
  }
}

async function signup() {
  const data = new FormData(signupForm.value!)

  notify.cancel()

  await nextTick()

  if (data.get("name") == "" || data.get("email") == "" || data.get("password") == "") {
    notify.msg = "Preencha todos os campo."
    notify.class = "error"
    notify.start()
    return
  }

  const resSignup = await (await fetch(baseURL + "/users/create", {
    method: "POST",
    body: data
  })).json()


  if (resSignup.error) {
    notify.msg = "Este e-mail já está sendo usado."
    notify.class = "error"
    notify.start()
    return
  }

  const resLogin = await (await fetch(baseURL + "/login", {
    method: "POST",
    body: data
  })).json()

  if (resLogin.token) {
    sessionStorage.setItem("token", resLogin.token)
    router.push("/chat")
    return
  }
}

function handlePanel() {
  loginPanel.value = !loginPanel.value
}
</script>

<template>
  <div class="container">
    <main v-if="loginPanel" class="loginMain">
      <section>
        <form ref="loginForm" @submit.prevent="login">
          <h2>Login</h2>
          <input type="email" name="email" id="email" placeholder="E-mail">
          <input type="password" name="password" id="password" placeholder="Senha">
          <button type="submit">Login</button>
        </form>
      </section>
      <div></div>
      <section>
        <h2>Não tem uma conta?</h2>
        <p>Em poucos passos crie uma conta agora.</p>
        <button @click="handlePanel">Sing Up</button>
      </section>
    </main>

    <main v-else class="signupMain">
      <section>
        <form ref="signupForm" @submit.prevent="signup">
          <h2>Sign Up</h2>
          <input type="name" name="name" id="name" placeholder="Name">
          <input type="email" name="email" id="email" placeholder="E-mail">
          <input type="password" name="password" id="password" placeholder="Senha">
          <button type="submit">Sign Up</button>
        </form>
      </section>
      <div></div>
      <section>
        <h2>Já possui uma conta?</h2>
        <p>Faz login agora mesmo.</p>
        <button @click="handlePanel">Login</button>
      </section>
    </main>
  </div>
  <NotifyComponent v-if="notify.show" :class="notify.class">{{ notify.msg }}</NotifyComponent>
</template>

<style scoped>
@import "../assets/login.css";
</style>
