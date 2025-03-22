<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const userId = sessionStorage.getItem("id")


function editProfile() {
  return
}

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

    <main>
      <h2>Id: {{ userId }}</h2>
      <form @submit="editProfile">
        <input type="name" name="name" id="name" placeholder="Name">
        <input type="email" name="email" id="email" placeholder="E-mail">
        <input type="password" name="password" id="password" placeholder="Senha">
        <button type="submit">Salvar</button>
      </form>
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped src="../assets/profile.css"></style>
