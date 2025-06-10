<template>
<div>
        <v-row class="mb-6 ml-2">
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
                        <span v-html="card.title" class="" :style="selectedCard == card.id ? 'color: white;': ''"></span>
                    </v-col>
                   </v-row>
                </v-card>
            </div>
        </v-row>
</div>
</template>
<script setup>
import { ref } from 'vue'


  const cards = ref([
    {
        title: 'Company <br/> Set-up',
        id: '#admin-central',
        icon: 'mdi-briefcase',
        color: 'blue',
    },
    {
        title: 'Employee <br/> Data',
        id: '#employee-management',
        icon: 'mdi-account-group',
        color: 'green',
    },
    {
        title: 'Requests <br/> Management',
        id: '#team-calendar',
        icon: 'mdi-chart-line',
        color: 'purple',
    },
    {
        title: 'Assets',
        id: '#employee-requests',
        icon: 'mdi-shield-account',
        color: 'orange',
    }
])


</script>