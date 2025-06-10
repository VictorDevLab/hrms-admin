<template>
    <div>
        <!-- Welcome Section -->
        <v-row class="mb-6">
            <v-col cols="9">
                <v-card elevation="0" color="transparent">
                    <v-card-text>
                        <div class="d-flex align-center mb-4">
                            <v-icon size="40" color="orange" class="mr-3">mdi-weather-sunny</v-icon>
                            <div>
                                <h2 class="font-weight-light indigo-darken-4 h1">Good Evening, Victor K Dev</h2>
                                <p class="h2 text-grey-darken-1 mb-0">Welcome back to your dashboard</p>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="text-center">
                <v-btn flat color="#FF8181" class="text-white mt-4 mr-6 rounded-xl" @click="$router.push('/clock-in')">
                     <v-icon size="24">mdi-timer</v-icon>clock in
                </v-btn>
            </v-col>
        </v-row>

        <!-- Quote Section -->
        <v-row class="mb-6">
            <v-col cols="12" md="8" style="position: relative;">
                <img src="./../assets/quote_img.png"
                    style="position: absolute; width: 220px; top: 3%; left: 5%; z-index: 10">
                </img>
                <v-card elevation="0" max-height="180" class="quote-card">
                    <v-card-text class="text-center pa-6">

                        <h3 class="mb-4 blue-darken-2" style="font-size: 1.1rem;">Quote of the day</h3>
                        <blockquote class="font-italic mb-4" style="font-size: 1.2rem;">
                            "{{ quote }}"
                        </blockquote>
                        <p class="text-grey-darken-3">- {{ author }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card elevation="0" color="blue-lighten-5" class="h-100" max-width="150px">
                    <v-card-text class="text-center pa-6">
                        <v-icon size="30" color="blue">mdi-calendar-today</v-icon>
                        <h3 class="mt-3">{{ currentDate.day }}</h3>
                        <p class="">{{ currentDate.month }}</p>
                        <p class="text-grey-darken-1">{{ currentDate.year }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Quick Actions -->
        <v-row class="mb-6 ml-6">
            <v-col cols="12">
                <h3 class="font-bold mb-4">Quick Actions</h3>
            </v-col>
            <div cols="12" sm="6" md="3" class="mb-3" v-for="action in quickActions" :key="action.title"
                style="min-width: 230px; max-width: 230px; max-height: 110px">
                <v-card elevation="0" class="text-center pa-4 mr-6 quick-action-card" color="blue-lighten-1"
                    @click="navigateTo(action.route)" style="background:transparent linear-gradient(295deg, #6488EE
                    0%, #0918F7 100%) 0% 0% no-repeat padding-box">
                    <v-icon :color="action.color" size="24" class="mb-2 mr-2">{{ action.icon }}</v-icon>
                    <span class="">{{ action.title }}</span>
                    <p class="text-body-2 text-white">{{ action.description }}</p>
                </v-card>
            </div>
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
    background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
    position: relative;
}
.h1 {
    font-size: 1.6rem;
}
.h2 {
    font-size: 1.25rem;
}
.h3 {
    font-size: 1rem;
}
.h4 {
    font-size: 0.875rem;
}
</style>