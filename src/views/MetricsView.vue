<script setup lang="ts">
import { ref } from 'vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const metrics = ref()

async function getMetrics() {
  try {
    const res = await axios.get(baseURL + "/metrics", )
    console.log(res)
    metrics.value = res.data as string
    console.log(metrics.value)

  } catch (error) {
    console.log(error)
  }

}

getMetrics()
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
      <p v-if="metrics">
        {{ metrics.value }}
      </p>

    </main>

    <FooterComponent />
  </div>
</template>
<style scope src="../assets/metrics.css"></style>
