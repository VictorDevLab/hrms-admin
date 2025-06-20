<template>
    <v-container fluid>
        <v-row v-if="!addNewTraining">
            <v-col cols="12">
                <v-card class="pa-4">
                    <!-- Header -->
                    <div class="d-flex justify-space-between align-center mb-4">
                        <div class="d-flex align-center">
                            <h2 class="text-h5 mr-2">All Trainings</h2>
                            <v-icon size="20" color="grey">mdi-information-outline</v-icon>
                        </div>
                        <v-btn color="primary" @click="addNewTraining = true" prepend-icon="mdi-plus">
                            Add New
                        </v-btn>
                    </div>

                    <!-- Data Table -->
                    <v-data-table :headers="headers" :items="trainings" :items-per-page="10" class="elevation-0"
                        item-key="id">
                        <!-- Training Name Column -->
                        <template v-slot:item.trainingName="{ item }">
                            <span class="font-weight-medium">{{ item.trainingName }}</span>
                        </template>

                        <!-- Method of Training Column -->
                        <template v-slot:item.methodOfTraining="{ item }">
                            <v-chip :color="item.methodOfTraining === 'External' ? 'error' : 'default'" size="small"
                                variant="tonal">
                                {{ item.methodOfTraining }}
                            </v-chip>
                        </template>

                        <!-- Employee Attended Column -->
                        <template v-slot:item.employeeAttended="{ item }">
                            <div class="d-flex align-center">
                                <!-- Show avatars for employees -->
                                <div class="d-flex" style="margin-right: 8px;">
                                    <v-avatar v-for="(employee, index) in item.employees" :key="index" size="24"
                                        :style="{ marginLeft: index > 0 ? '-8px' : '0', zIndex: item.employees.length - index }">
                                        <v-img :src="employee.avatar"></v-img>
                                    </v-avatar>
                                </div>
                                <!-- Show additional count if more than displayed -->
                                <v-chip v-if="item.additionalCount > 0" size="small" color="primary" variant="tonal">
                                    + {{ item.additionalCount }}
                                </v-chip>
                            </div>
                        </template>

                        <!-- Status Column -->
                        <template v-slot:item.status="{ item }">
                            <v-chip color="warning" size="small" variant="tonal">
                                {{ item.status }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
         <AddNew @discard-form="discardForm"/>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import AddNew from './addNew.vue'

//
const addNewTraining = ref(false)
// Table headers
const headers = ref([
    { title: 'ID', value: 'id', sortable: true },
    { title: 'Training Name', value: 'trainingName', sortable: true },
    { title: 'Program', value: 'program', sortable: true },
    { title: 'Method of Training', value: 'methodOfTraining', sortable: true },
    { title: 'Start Date', value: 'startDate', sortable: true },
    { title: 'End Date', value: 'endDate', sortable: true },
    { title: 'Hours of Training', value: 'hoursOfTraining', sortable: true },
    { title: 'Employee Attended', value: 'employeeAttended', sortable: false },
    { title: 'Status', value: 'status', sortable: true }
])

// Training data
const trainings = ref([
    {
        id: 'T-006',
        trainingName: 'Test Mondays - test',
        program: 'AI and Machine Learning',
        methodOfTraining: 'Internal',
        startDate: 'May 19, 2025',
        endDate: 'May 19, 2025',
        hoursOfTraining: '1 Hr 30 Mins',
        employees: [
            { avatar: 'https://i.pravatar.cc/24?img=1' },
            { avatar: 'https://i.pravatar.cc/24?img=2' }
        ],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-006',
        trainingName: 'Friday Test',
        program: 'AI and Machine Learning',
        methodOfTraining: 'Internal',
        startDate: 'May 12, 2025',
        endDate: 'May 12, 2025',
        hoursOfTraining: '1 Hr',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-011',
        trainingName: 'Thursday Test',
        program: 'Azure Security & Compliance Fundamentals',
        methodOfTraining: 'Internal',
        startDate: 'Mar 27, 2025',
        endDate: 'Mar 27, 2025',
        hoursOfTraining: '2 Hrs',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-010',
        trainingName: 'Demo for Meeting',
        program: 'Cloud Pentesting Bootcamp',
        methodOfTraining: 'Internal',
        startDate: 'Dec 19, 2024',
        endDate: 'Dec 19, 2024',
        hoursOfTraining: '2 Hrs 30 Mins',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-011',
        trainingName: 'Friday Test',
        program: 'Azure Security & Compliance Fundamentals',
        methodOfTraining: 'Internal',
        startDate: 'Dec 20, 2024',
        endDate: 'Dec 20, 2024',
        hoursOfTraining: '2 Hrs 30 Mins',
        employees: [],
        additionalCount: 2,
        status: 'Scheduled'
    },
    {
        id: 'T-010',
        trainingName: 'Cloud Pentesting Bootcamp',
        program: 'Cloud Pentesting Bootcamp',
        methodOfTraining: 'External',
        startDate: 'Oct 28, 2024',
        endDate: 'Oct 28, 2024',
        hoursOfTraining: '4 Hrs 30 Mins',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-006',
        trainingName: 'sdfgs',
        program: 'AI and Machine Learning',
        methodOfTraining: 'Internal',
        startDate: 'Oct 23, 2024',
        endDate: 'Oct 23, 2024',
        hoursOfTraining: '3 Hrs',
        employees: [],
        additionalCount: 4,
        status: 'Scheduled'
    },
    {
        id: 'T-011',
        trainingName: 'Test George',
        program: 'Azure Security & Compliance Fundamentals',
        methodOfTraining: 'Internal',
        startDate: 'Oct 29, 2024',
        endDate: 'Oct 29, 2024',
        hoursOfTraining: '3 Hrs 30 Mins',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-012',
        trainingName: 'Test Upload 3',
        program: 'Customer Service',
        methodOfTraining: 'Internal',
        startDate: 'Nov 24, 2024',
        endDate: 'Nov 24, 2024',
        hoursOfTraining: '7 Hrs',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    },
    {
        id: 'T-012',
        trainingName: 'Test Uploads 2',
        program: 'Customer Service',
        methodOfTraining: 'Internal',
        startDate: 'Nov 11, 2024',
        endDate: 'Nov 11, 2024',
        hoursOfTraining: '3 Hrs',
        employees: [],
        additionalCount: 0,
        status: 'Scheduled'
    }
])

const discardForm = ()=> {
    addNewTraining.value = false
}
</script>

<style scoped>
.v-data-table {
    border-radius: 8px;
}
</style>