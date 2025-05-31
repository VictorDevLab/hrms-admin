<template>
  <div class="admin-central pt-8" style="background-color: #f5f5f5; min-height: 100vh;">
     <v-row class="mb-6 ml-6">
            <div cols="12" sm="6" md="3" class="mb-3" v-for="card in cards" :key="card.id"
                style="min-width: 220px; max-width: 220px; max-height: 110px">
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
                        <span class="" :style="selectedCard == card.id ? 'color: white;': ''">{{ card.title }}</span>
                    </v-col>
                   </v-row>
                </v-card>
            </div>
        </v-row>
        <div>
            <AdminCentral v-if="selectedCard === '#admin-central'" />
            <EmployeeManagement v-if="selectedCard === '#employee-management'" />
            <EmployeeRequests v-if="selectedCard === '#employee-requests'" />
            <TeamCalendar v-if="selectedCard === '#team-calendar'" />
        </div>
  </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import AdminCentral from '@/components/AdminCentral/central.vue'
  
  const selectedCard = ref('#admin-central');

  const cards = ref([
    {
        title: 'Admin Central',
        id: '#admin-central',
        icon: 'mdi-briefcase',
        color: 'blue',
    },
    {
        title: 'Employee Management',
        id: '#employee-management',
        icon: 'mdi-account-group',
        color: 'green',
    },
    {
        title: 'Employee Requests',
        id: '#employee-requests',
        icon: 'mdi-shield-account',
        color: 'orange',
    },
    {
        title: 'Team Calendar',
        id: '#team-calendar',
        icon: 'mdi-chart-line',
        color: 'purple',
    }
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