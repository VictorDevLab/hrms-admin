<template>
    <header>
        <div class="header_div">
            <p>Welcome to My World!</p>
            <img class="logo" :src="logo" alt="Vue logo" />
        </div>
    </header>
</template>

<script setup>
import logo from '@/assets/logo.svg'
</script>

<style scoped>  
.header_div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
}
img.logo {
    margin: 0 auto 2rem;
    height: 100px;
}
</style>