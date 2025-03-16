<script setup lang="ts">
import { ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

const chats = ref([])

async function getChats () {

}

</script>

<template>
  <div class="container">
    <HeaderComponent/>

    <nav>
      <div>
        <RouterLink to="/chats">Chat</RouterLink>
        <RouterLink to="/metrics">Metrics</RouterLink>
      </div>
      <div>config</div>
    </nav>

    <aside>

    </aside>

    <main>main</main>

    <FooterComponent/>
  </div>
</template>

<style scoped>
@import "../assets/chat.css";
</style>
