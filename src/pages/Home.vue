<template>
    <div class="home">
        <h1>Welcome to Homepage</h1>
        <p>This is the home page of your Vue application.</p>
    </div>
    <div>
        <h1>{{name}}</h1>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const name = ref('Vue 3 Application');
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2rem;
}

h1 {
    color: #42b883;
}
</style>