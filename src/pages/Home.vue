<template>
  <div>
    <!-- Welcome Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="0" color="transparent">
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-icon size="40" color="orange" class="mr-3">mdi-weather-sunny</v-icon>
              <div>
                <h2 class="text-h4 font-weight-bold">Good Morning, Victor K Dev</h2>
                <p class="text-subtitle-1 text-grey-darken-1 mb-0">Welcome back to your dashboard</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quote Section -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <v-card elevation="0" class="quote-card">
          <v-card-text class="text-center pa-6">
            <img src="./../assets/quote_img.png" alt="" style="position: absolute; width: 240px; top: -10%; left: 3%">
            <h3 class="text-h6 mb-4">Quote of the day</h3>
            <blockquote class="text-h5 font-italic mb-4">
              "{{ quote }}"
            </blockquote>
            <p class="text-subtitle-1 text-grey-darken-1">- {{ author }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" color="blue-lighten-5" class="h-100">
          <v-card-text class="text-center pa-6">
            <v-icon size="60" color="blue">mdi-calendar-today</v-icon>
            <h3 class="text-h4 mt-3">{{ currentDate.day }}</h3>
            <p class="text-subtitle-1">{{ currentDate.month }}</p>
            <p class="text-body-2 text-grey-darken-1">{{ currentDate.year }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h3 class="text-h5 mb-4">Quick Actions</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-for="action in quickActions" :key="action.title">
        <v-card elevation="2" class="text-center pa-4 quick-action-card" @click="navigateTo(action.route)">
          <v-icon :color="action.color" size="48" class="mb-3">{{ action.icon }}</v-icon>
          <h4 class="text-h6">{{ action.title }}</h4>
          <p class="text-body-2 text-grey-darken-1">{{ action.description }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activity -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>
            <v-icon class="mr-2">mdi-clock-outline</v-icon>
            Recent Activity
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="activity in recentActivity" :key="activity.id">
                <v-list-item-avatar>
                  <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const quote = ref("An investment in knowledge pays the best interest.")
const author = ref("Benjamin Franklin")

const currentDate = computed(() => {
  const now = new Date()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']
  
  return {
    day: now.getDate(),
    month: months[now.getMonth()],
    year: now.getFullYear()
  }
})

const quickActions = ref([
  {
    title: 'My Work',
    description: 'View your tasks',
    icon: 'mdi-briefcase',
    color: 'blue',
    route: '/my-work'
  },
  {
    title: 'HR Self Service',
    description: 'Manage HR requests',
    icon: 'mdi-account-group',
    color: 'green',
    route: '/hr-self-service'
  },
  {
    title: 'Admin Central',
    description: 'Administrative tools',
    icon: 'mdi-shield-account',
    color: 'orange',
    route: '/admin-central'
  },
  {
    title: 'Reports',
    description: 'View analytics',
    icon: 'mdi-chart-line',
    color: 'purple',
    route: '/reports'
  }
])

const recentActivity = ref([
  {
    id: 1,
    title: 'New employee onboarding completed',
    time: '2 hours ago',
    icon: 'mdi-account-plus',
    color: 'green'
  },
  {
    id: 2,
    title: 'Payroll processing initiated',
    time: '4 hours ago',
    icon: 'mdi-cash-multiple',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Training module updated',
    time: '1 day ago',
    icon: 'mdi-school',
    color: 'orange'
  }
])

const navigateTo = (route) => {
  router.push(route)
}
</script>

<style scoped>
.quote-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.quick-action-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.quick-action-card:hover {
  transform: translateY(-2px);
}
</style>