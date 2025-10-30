<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <v-card elevation="6" class="pa-8 rounded-xl" max-width="500">
      <v-icon size="64" color="primary" class="mb-4">mdi-clock-outline</v-icon>
      <h2 class="text-h5 font-weight-bold mb-2">Payroll Module</h2>
      <p class="text-body-1 mb-6">
        We're working hard to bring you this feature soon. Stay tuned!
      </p>
      <v-progress-linear
        color="primary"
        indeterminate
        height="6"
        rounded
      ></v-progress-linear>
    </v-card>
  </v-container>
</template>

<script setup>
//
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
