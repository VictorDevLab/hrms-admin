<template>
    <v-container fluid>
        <v-row>
            <!-- Leaderboard Section -->
            <v-col cols="12" md="6">
                <v-card class="pa-4">
                    <v-card-title class="text-h5 mb-4">Leaderboard</v-card-title>
                    <v-list>
                        <v-list-item v-for="(user, index) in leaderboard" :key="user.id" class="mb-2">
                            <template v-slot:prepend>
                                <v-chip :color="index < 3 ? 'primary' : 'grey'" size="small" class="mr-3">
                                    {{ index + 1 }}
                                </v-chip>
                                <v-avatar size="40" class="mr-3">
                                    <v-img :src="user.avatar"></v-img>
                                </v-avatar>
                            </template>
                            <v-list-item-title class="font-weight-medium">
                                {{ user.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                Score: {{ user.score }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <!-- Training Hours Chart -->
            <v-col cols="12" md="6">
                <v-card class="pa-4">
                    <v-card-title class="text-h5 mb-4">Training Hours</v-card-title>
                    <div class="training-hours">
                        <div v-for="training in trainingHours" :key="training.name" class="d-flex align-center mb-3">
                            <div class="training-label" style="min-width: 150px;">
                                {{ training.name }}
                            </div>
                            <div class="flex-grow-1 mx-3">
                                <v-progress-linear :model-value="(training.hours / maxTrainingHours) * 100"
                                    :color="training.color" height="20" rounded></v-progress-linear>
                            </div>
                            <div class="training-value" style="min-width: 40px; text-align: right;">
                                {{ training.hours }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="mt-4">
            <!-- Badges Earned -->
            <v-col cols="12" md="4">
                <v-card class="pa-4">
                    <v-card-title class="text-h6 mb-4">Badges Earned</v-card-title>
                    <div class="d-flex justify-space-around">
                        <div v-for="badge in badges" :key="badge.type" class="text-center">
                            <v-avatar size="80" :color="badge.color" class="mb-2">
                                <v-icon size="40" color="white">{{ badge.icon }}</v-icon>
                            </v-avatar>
                            <div class="text-caption font-weight-bold">{{ badge.type }}</div>
                            <div class="text-caption">Earned by {{ badge.earned }}</div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <!-- Upcoming Trainings -->
            <v-col cols="12" md="4">
                <v-card class="pa-4">
                    <v-card-title class="text-h6 mb-4">Upcoming Trainings</v-card-title>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th>Training Name</th>
                                <th>Starting Date</th>
                                <th>Employees Attended</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="training in upcomingTrainings" :key="training.id">
                                <td>
                                    <div class="font-weight-medium">{{ training.name }}</div>
                                    <div class="text-caption text-grey">{{ training.company }}</div>
                                </td>
                                <td>{{ training.date }}</td>
                                <td>{{ training.attended }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>

            <!-- Overall Satisfaction Survey -->
            <v-col cols="12" md="4">
                <v-card class="pa-4">
                    <v-card-title class="text-h6 mb-4">Overall Satisfaction Survey</v-card-title>
                    <div class="d-flex justify-center align-center" style="height: 200px;">
                        <div class="satisfaction-chart">
                            <svg width="150" height="150" viewBox="0 0 150 150">
                                <circle cx="75" cy="75" r="60" fill="none" stroke="#e0e0e0" stroke-width="15" />
                                <circle cx="75" cy="75" r="60" fill="none" stroke="#4caf50" stroke-width="15"
                                    stroke-dasharray="251.2" stroke-dashoffset="75.36" stroke-linecap="round" />
                                <circle cx="75" cy="75" r="45" fill="none" stroke="#ff9800" stroke-width="15"
                                    stroke-dasharray="188.4" stroke-dashoffset="150.72" stroke-linecap="round" />
                                <circle cx="75" cy="75" r="30" fill="none" stroke="#f44336" stroke-width="15"
                                    stroke-dasharray="125.6" stroke-dashoffset="113.04" stroke-linecap="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="d-flex justify-center mt-3">
                        <div class="d-flex align-center mr-4">
                            <div class="satisfaction-dot" style="background: #4caf50;"></div>
                            <span class="text-caption ml-1">Satisfied</span>
                        </div>
                        <div class="d-flex align-center mr-4">
                            <div class="satisfaction-dot" style="background: #ff9800;"></div>
                            <span class="text-caption ml-1">Neutral</span>
                        </div>
                        <div class="d-flex align-center">
                            <div class="satisfaction-dot" style="background: #f44336;"></div>
                            <span class="text-caption ml-1">Dissatisfied</span>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <!-- Enrolled Users Table -->
        <v-row class="mt-4">
            <v-col cols="12">
                <v-card class="pa-4">
                    <v-card-title class="text-h6 mb-4">Enrolled Users</v-card-title>
                    <v-data-table :headers="userHeaders" :items="enrolledUsers" :items-per-page="10"
                        class="elevation-0">
                        <template v-slot:item.trainee="{ item }">
                            <div class="d-flex align-center">
                                <v-avatar size="32" class="mr-3">
                                    <v-img :src="item.avatar"></v-img>
                                </v-avatar>
                                <span class="font-weight-medium">{{ item.trainee }}</span>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Leaderboard data
const leaderboard = ref([
    { id: 1, name: 'Kelvin M. Paul', score: 78, avatar: 'https://i.pravatar.cc/40?img=1' },
    { id: 2, name: 'Paul Kelvin-ke', score: 65, avatar: 'https://i.pravatar.cc/40?img=2' },
    { id: 3, name: 'Lucy Ndungu', score: 55, avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 4, name: 'Patricia Walker', score: 42, avatar: 'https://i.pravatar.cc/40?img=4' },
    { id: 5, name: 'Cynthia Baker', score: 36, avatar: 'https://i.pravatar.cc/40?img=5' },
    { id: 6, name: 'Sarah Muthoni', score: 24, avatar: 'https://i.pravatar.cc/40?img=6' },
    { id: 7, name: 'Mwangi Kimani', score: 24, avatar: 'https://i.pravatar.cc/40?img=7' },
    { id: 8, name: 'Mercy Njeri', score: 24, avatar: 'https://i.pravatar.cc/40?img=8' }
])

// Training hours data
const trainingHours = ref([
    { name: 'Cybersecurity', hours: 9, color: 'blue' },
    { name: 'Digital Marketing', hours: 2, color: 'blue' },
    { name: 'Cloud Pentesting', hours: 8.5, color: 'blue' },
    { name: 'HRMS Training & D...', hours: 1, color: 'grey' },
    { name: 'HRMS Module', hours: 1, color: 'grey' },
    { name: 'Project Management', hours: 1, color: 'grey' },
    { name: 'Test Session', hours: 1, color: 'grey' },
    { name: 'AI and Machine Le...', hours: 169, color: 'blue' },
    { name: 'New Employee Orie...', hours: 1, color: 'grey' },
    { name: 'Freshers Orientation', hours: 1, color: 'blue' },
    { name: 'Deep Learning and...', hours: 1, color: 'blue' },
    { name: 'Orientation', hours: 1, color: 'grey' },
    { name: 'Azure Security &...', hours: 39.5, color: 'blue' },
    { name: 'Unknown Program', hours: 1, color: 'grey' },
    { name: 'Client Journey', hours: 1, color: 'blue' },
    { name: 'Customercare', hours: 1, color: 'grey' },
    { name: 'Customer Service', hours: 1, color: 'blue' }
])

const maxTrainingHours = computed(() => {
    return Math.max(...trainingHours.value.map(t => t.hours))
})

// Badges data
const badges = ref([
    { type: 'TOP SCORER BADGE', earned: 200, color: 'amber', icon: 'mdi-trophy' },
    { type: 'SECOND BEST SCORER', earned: 300, color: 'grey', icon: 'mdi-medal' },
    { type: 'TRAINING COMPLETED', earned: 500, color: 'grey-darken-1', icon: 'mdi-school' }
])

// Upcoming trainings data
const upcomingTrainings = ref([
    { id: 1, name: 'Soft Skills Training', company: 'ACME Solutions', date: '14 May 24', attended: 21 },
    { id: 2, name: 'Technical Training', company: 'ACME Solutions', date: '20 May 24', attended: 15 }
])

// Enrolled users data
const enrolledUsers = ref([
    {
        trainee: 'Alexander Andersen',
        email: 'benard+test@nathandigital.com',
        programs: 1,
        sessions: 1,
        avatar: 'https://i.pravatar.cc/32?img=11'
    },
    {
        trainee: 'Adam Reynolds',
        email: 'benard+jen@nathandigital.com',
        programs: 1,
        sessions: 1,
        avatar: 'https://i.pravatar.cc/32?img=12'
    },
    {
        trainee: 'Amber Wellington',
        email: 'amber.wright@example.com',
        programs: 1,
        sessions: 1,
        avatar: 'https://i.pravatar.cc/32?img=13'
    },
    {
        trainee: 'Adoyo Ageyo',
        email: 'adoyoageyo@gmail.com',
        programs: 1,
        sessions: 1,
        avatar: 'https://i.pravatar.cc/32?img=14'
    },
    {
        trainee: 'Sample Dev Admin',
        email: 'sample@admindev.com',
        programs: 2,
        sessions: 2,
        avatar: 'https://i.pravatar.cc/32?img=15'
    },
    {
        trainee: 'Alejandro Martin',
        email: 'alejandro.martin@example.com',
        programs: 1,
        sessions: 1,
        avatar: 'https://i.pravatar.cc/32?img=16'
    }
])

const userHeaders = ref([
    { title: 'Trainee', value: 'trainee', sortable: true },
    { title: 'Email', value: 'email', sortable: true },
    { title: 'Number of Programs', value: 'programs', sortable: true },
    { title: 'Number of Sessions', value: 'sessions', sortable: true }
])
</script>

<style scoped>
.training-hours {
    max-height: 400px;
    overflow-y: auto;
}

.satisfaction-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
}

.satisfaction-chart svg {
    transform: rotate(-90deg);
}
</style>