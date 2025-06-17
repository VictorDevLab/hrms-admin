<template>
  <div id="app">
    <Login v-if="!authStore.isAuthenticated"/>
    <MainLayout v-else>
      <router-view/>
    </MainLayout>
  </div>
</template>

<script setup>
import MainLayout from './components/MainLayout.vue'
import Login from './pages/Login/index.vue'
import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// onMounted(async () => {
//   if (!authStore.isAuthenticated) {
//     await authStore.checkRefreshToken();
//   }
// });
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Rubik', sans-serif;
}
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>