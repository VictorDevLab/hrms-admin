<template>
  <div id="app">
    <MainLayout v-if="authStore.isAuthenticated">
      <router-view/>
    </MainLayout>
    <Login v-else/>
  </div>
</template>

<script setup>
import MainLayout from './components/MainLayout.vue'
import Login from './pages/Login/index.vue'
import {ref, onBeforeMount} from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.checkRefreshToken();
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Rubik', sans-serif !important;
}
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>