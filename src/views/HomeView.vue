<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const baseURL = import.meta.env.VITE_API_URL
const APIon = ref(false)
const showModal = ref(false)

async function fetchData() {
  APIon.value = false
  const res = await axios.get(baseURL + "/up")
  if (res.status != 200) {
    return
  }
  APIon.value = true
}

fetchData()

function handleModal() {
  showModal.value = !showModal.value
}

onMounted(() => console.log(baseURL))
</script>

<template>
  <div class="container">
    <main>
      <section>
        <h1>ChatApp</h1>
        <p>Em um primeiro momento este projeto nasceu apartir de teste para uma vaga para dev Jr.</p>
        <nav>
          <RouterLink to="/login" v-if="APIon">
            Start
          </RouterLink>
          <button v-else @click="handleModal">
            * Start *
          </button>
        </nav>
      </section>
      <section>
        <v-icon class="icon" name="io-chatbubbles" scale="7" animation="float" speed="slow" />
      </section>
    </main>
  </div>
  <div class="modal" v-if="showModal" @click="handleModal">
    <section @click.stop="">
      <h2>API Error</h2>
      <p>
        Tenha certeza que a API esta rodando...
        <br>
        Para mais informações, acesse:
        <a href="https://github.com/JoaoYamaguti/chatApp-backend" target="_blank">chatApp-backend repo</a>
      </p>
      <button @click="handleModal">Fechar</button>
    </section>
  </div>
</template>

<style scoped src="../assets/home.css"></style>
