<template>
  <div class="admin-central pt-8" style="background-color: #f5f5f5; min-height: 100vh;">
     <v-row class="mb-6 ml-2">
            <div cols="12" sm="6" md="3" class="mb-3" v-for="card in cards" :key="card.id"
                style="min-width: 200px; max-width: 220px; max-height: 110px">
                <v-card elevation="3" height="85" :style="
                selectedCard == card.id
                  ? 'background:transparent linear-gradient(295deg, #6488EE 0%, #0918F7 100%) 0% 0% no-repeat padding-box;'
                  : ''
              " class="text-center pa-4 mr-6 quick-card-card" align="center" color="white-lighten-1"
                    @click="setSelectedCard(card.id)">
                   <v-row style="height: 100%" width="100%" align="center" justify="center">
                    <v-col cols="2" class="px-0 text-right">
                        <v-icon :color="card.color" size="30" class="mt-2">{{ card.icon }}</v-icon>
                    </v-col>
                    <v-col cols="7" class="my-auto px-0" style="font-size: 15px">
                        <span v-html="card.title" class="" :style="selectedCard == card.id   ? 'color: white;': ''"></span>
                    </v-col>
                   </v-row>
                </v-card>
            </div>
        </v-row>
        <div class="pa-0 ma-0">
            <Assets v-if="selectedCard === '#assets'" />
            <Trainings v-if="selectedCard === '#trainings'" />
        </div>  
  </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import Assets from '@/components/Assets/assets.vue'
  import Trainings from '@/components/TrainingAndDev\'t/trainings.vue'
  
  const selectedCard = ref('#assets');

  const cards = ref([
      {
          title: 'Assets',
          id: '#assets',
          icon: 'mdi-account-group',
          color: 'green',
      },
])


const setSelectedCard = (cardId) => {
    selectedCard.value = cardId;
};
  </script>

  <style scoped>
  
.quick-action-card {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.quick-action-card:hover {
    transform: translateY(-2px);
}
  </style>