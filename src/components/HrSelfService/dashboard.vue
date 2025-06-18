<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-card class="mx-auto employee-card h-100" elevation="2" rounded="lg">
                <!-- Header with status badges -->
                <v-card-text class="d-flex justify-space-between align-center pt-4 pb-2">
                    <v-chip size="small" color="light-blue" variant="flat" class="text-white">
                        {{ employmentStatus }}
                    </v-chip>
                    <v-chip size="small" color="purple-lighten-2" variant="flat" class="text-white">
                        {{ employeeId }}
                    </v-chip>
                </v-card-text>

                <!-- Profile Section -->
                <v-card-text class="text-center pb-0">
                    <div class="position-relative d-inline-block">
                        <!-- Avatar -->
                        <v-avatar size="80" class="mb-4">
                            <v-img :src="profileImage" :alt="employeeName"></v-img>
                        </v-avatar>
                        <!-- Online status indicator -->
                        <div class="status-indicator" :class="{ 'online': isOnline }"></div>
                    </div>

                    <!-- Employee Info -->
                    <h2 class="text-h5 font-weight-bold text-grey-darken-3 mb-1">
                        {{ employeeName }}
                    </h2>
                    <p class="text-body-1 text-grey-darken-1 mb-4">
                        {{ department }}
                    </p>
                </v-card-text>

                <!-- Work Anniversary -->
                <v-card-text class="py-2">
                    <div class="d-flex align-center">
                        <v-avatar size="40" class="mr-3">
                            <v-icon color="orange" size="24">mdi-trophy</v-icon>
                        </v-avatar>
                        <div>
                            <p class="text-body-2 text-grey-darken-1 mb-0">Work Anniversary</p>
                            <p class="text-body-1 font-weight-medium text-grey-darken-3 mb-0">
                                {{ anniversaryDate }}
                            </p>
                        </div>
                    </div>
                </v-card-text>

                <!-- Reports To Section -->
                <v-card-text class="pt-2 pb-4">
                    <v-card variant="outlined" rounded="pill" class="pa-2">
                        <div class="d-flex align-center">
                            <v-avatar size="32" class="mr-3">
                                <v-img :src="managerImage" :alt="managerName"></v-img>
                            </v-avatar>
                            <div class="flex-grow-1">
                                <p class="text-body-2 text-grey-darken-1 mb-0">Reporting to</p>
                                <p class="text-body-1 font-weight-medium text-grey-darken-3 mb-0">
                                    {{ managerName }}
                                </p>
                            </div>
                        </div>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" class="">
            <v-row>
                <v-col cols="12">
                    <v-card class="white pa-4" rounded="lg" elevation="1">
                        <v-card-header class="mb-6">
                            <p>Leave Balances</p>
                        </v-card-header>
                        <v-divider class="mb-4"></v-divider>
                        <template v-if="filteredLeave && filteredLeave.length > 0">
                            <v-row justify="center" class="" v-if="!showSwiper">
                                <v-col cols="4" sm="12" md="3" class="text-center caption px-0"
                                    v-for="(leave, key) in filteredLeave" :key="key">
                                    <v-btn fab large class="text-h5 white--text" elevation="0"
                                        :color="getLeaveColor(leave.name)">
                                        {{ leave.balance }}
                                    </v-btn>
                                    <p class="mb-0 mt-1 textFontSize font-weight-normal darkBlue-heading-text"
                                        style="overflow: visible">
                                        {{ leave.name }}
                                    </p>
                                </v-col>
                            </v-row>
                        </template>
                        <v-row v-else justify="center" align-center class="mt-8 pt-4 pb-6 greyBg">
                            <span class="bodyNewTxtClr">No leaves available</span>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card class="mx-auto employee-card h-100" elevation="2" rounded="lg">
                        <v-card-text class="text-center pb-0">
                            <!-- Header -->
                            <v-card-text class="pt-2 pb-4">
                                <v-card variant="outlined bg-blue-darken-2" rounded="pill" class="pa-2">
                                    <div class="d-flex align-center">
                                        <v-icon color="white" size="20" class="mr-2">mdi-calendar</v-icon>
                                        <div class="flex-grow-1">
                                            <p class="text-body-1 font-weight-medium text-white mb-0">
                                                HOLIDAY CALENDAR
                                            </p>
                                        </div>
                                    </div>
                                </v-card>
                            </v-card-text>

                            <!-- Holiday List -->
                            <v-card-text class="px-4 py-2">
                                <div class="holiday-list">
                                    <div v-for="(holiday, index) in holidays" :key="index"
                                        class="holiday-item d-flex align-center mb-3 pa-3">
                                        <v-avatar size="40" class="mr-3" :color="holiday.color">
                                            <v-icon color="white" size="20">mdi-calendar-blank</v-icon>
                                        </v-avatar>
                                        <div class="flex-grow-1 text-left">
                                            <p class="text-body-1 font-weight-medium text-grey-darken-3 mb-0">
                                                {{ holiday.name }}
                                            </p>
                                            <p class="text-body-2 text-grey-darken-1 mb-0">
                                                {{ holiday.date }}
                                            </p>
                                        </div>
                                        <v-chip size="small" :color="holiday.type === 'public' ? 'green' : 'orange'"
                                            variant="flat" class="text-white">
                                            {{ holiday.type === 'public' ? 'Public' : 'Religious' }}
                                        </v-chip>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="4">
            <v-card elevation="2" rounded="lg" class="h-100">
                <v-card-title class="text-h6 pa-3 d-flex align-center text-blue-darken-2" style="background-color: #f5f5f5;">
                    <v-icon class="mr-2" color="blue-darken-2">mdi-clipboard-list</v-icon>
                      Your Requests
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item v-for="request in requests" :key="request.id" :value="request.id"
                        class="px-3 py-2 bg-blue-lighten-0">
                        <template v-slot:prepend>
                            <v-avatar size="40" class="mr-3">
                                <v-img :src="request.avatar" :alt="request.name"></v-img>
                            </v-avatar>
                        </template>

                        <v-list-item-content>
                            <div class="d-flex justify-space-between align-center mb-1">
                                <div>
                                    <div class="font-weight-medium text-body-2">{{ request.name }}</div>
                                    <div class="text-caption text-grey-darken-1">{{ request.type }}</div>
                                </div>
                                <div class="text-right">
                                    <v-chip :color="getRequestTypeColor(request.requestType)" size="small" class="mb-1">
                                        {{ request.requestType }}
                                    </v-chip>
                                </div>
                            </div>

                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex align-center text-caption text-grey-darken-1">
                                    <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                                    {{ request.duration }}
                                </div>
                                <div v-if="request.amount" class="text-right">
                                    <span class="text-caption text-grey-darken-1">{{ request.amount }} </span>
                                    <span class="text-caption text-grey-darken-1"> USD</span>
                                </div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue'

const showSwiper = ref(false)

// Dummy data
const employmentStatus = ref('Full Time')
const employeeId = ref('DXB-098')
const employeeName = ref('Sample Admin Dev')
const department = ref('AWS Support')
const anniversaryDate = ref('Aug 09')
const isOnline = ref(true)
const managerName = ref('Ayman Qasim')

// Using placeholder images for demo
const profileImage = ref('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face')
const managerImage = ref('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face')

const leaves = ref({
    annualLeaves: 12,
    sickLeaves: 8,
    maternityLeaves: 0,
    paternityLeaves: 5,
    emergencyLeaves: 3,
    compassionateLeaves: 2,
    studyLeaves: 1,
})
const holidays = ref([
    {
        name: 'New Year\'s Day',
        date: 'January 1, 2025',
        type: 'public',
        color: 'green-lighten-2'
    },
    {
        name: 'Independence Day',
        date: 'December 12, 2025',
        type: 'public',
        color: 'blue-lighten-2'
    },
    {
        name: 'Christmas Day',
        date: 'December 25, 2025',
        type: 'religious',
        color: 'red-lighten-2'
    },
    {
        name: 'Eid Al-Fitr',
        date: 'March 30, 2025',
        type: 'religious',
        color: 'purple-lighten-2'
    },
    {
        name: 'Labour Day',
        date: 'May 1, 2025',
        type: 'public',
        color: 'orange-lighten-2'
    }
])

const getLeaveColor = (val) => {
    if (val.includes("Annual")) return "#5C7EEF";
    if (val.includes("Medical") || val.includes("Sick")) return "#6C72B3";
    if (val.includes("Emergency")) return "#7B658B";
    if (val.includes("Paternal") || val.includes("Paternity")) return "#5C85EF";
    if (val.includes("Maternity")) return "#5C7EEF";
    if (val.includes("Unpaid")) return "#93829A";
    if (val.includes("Study")) return "#6C72B3";
    if (val.includes("Compassionate")) return "#7B658B";
    if (val.includes("Hajj")) return "#6C72B3";
    return "#6A80EF";
}
const getRequestTypeColor = (type) => {
    switch (type) {
        case 'leave': return 'blue'
        case 'WFH': return 'green'
        case 'claim': return 'orange'
        case 'letter': return 'purple'
        default: return 'grey'
    }
}
const requests = ref([
    {
        id: 1,
        name: 'Joseph Chong',
        type: 'Annual Leaves',
        requestType: 'leave',
        duration: '01 Day',
        days: '01',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        requestedDate: 'Jun 09, 2025',
        fromDate: 'Monday, Jun 09, 2025',
        toDate: 'Monday, Jun 09, 2025',
        reason: 'Personal',
        approver: {
            name: 'Processing',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
        }
    },
    {
        id: 2,
        name: 'Joseph Chong',
        type: 'WFH',
        requestType: 'WFH',
        duration: '01 Day',
        days: '01',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        requestedDate: 'Jun 09, 2025',
        fromDate: 'Monday, Jun 09, 2025',
        toDate: 'Monday, Jun 09, 2025',
        reason: 'Test Emails',
        approver: {
            name: 'Zaki Farooq',
            status: 'Pending',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 3,
        name: 'Sample Admin Dev',
        type: 'Annual Leaves',
        requestType: 'leave',
        duration: '01 Day',
        days: '01',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        requestedDate: 'Jun 08, 2025',
        fromDate: 'Tuesday, Jun 10, 2025',
        toDate: 'Tuesday, Jun 10, 2025',
        reason: 'Medical',
        approver: {
            name: 'HR Manager',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        }
    },
    {
        id: 4,
        name: 'Sample Admin Dev',
        type: 'Salary Certificate',
        requestType: 'letter',
        duration: '-',
        days: '-',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        requestedDate: 'Jun 07, 2025',
        fromDate: '-',
        toDate: '-',
        reason: 'Bank Requirements',
        approver: {
            name: 'Finance Head',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        }
    },
    {
        id: 5,
        name: 'Sample Admin Dev',
        type: 'Mileage',
        requestType: 'claim',
        duration: '-',
        days: '-',
        amount: '49500',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        requestedDate: 'Jun 06, 2025',
        fromDate: 'Jun 01, 2025',
        toDate: 'Jun 05, 2025',
        reason: 'Business Travel',
        approver: {
            name: 'Department Head',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
        }
    },
    {
        id: 6,
        name: 'Sample Admin Dev',
        type: 'Client Meal (Business Event / Meeting)',
        requestType: 'claim',
        duration: '-',
        days: '-',
        amount: '10000',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        requestedDate: 'Jun 05, 2025',
        fromDate: 'Jun 04, 2025',
        toDate: 'Jun 04, 2025',
        reason: 'Client Meeting',
        approver: {
            name: 'Department Head',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
        }
    },
    {
        id: 7,
        name: 'Ana Lou Salvador',
        type: 'Maternity Leaves',
        requestType: 'leave',
        duration: '60 Days',
        days: '60',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        requestedDate: 'Jun 04, 2025',
        fromDate: 'Jul 01, 2025',
        toDate: 'Aug 30, 2025',
        reason: 'Maternity Leave',
        approver: {
            name: 'HR Director',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
        }
    },
    {
        id: 8,
        name: 'Sample Admin Dev',
        type: 'Travel Request Form',
        requestType: 'letter',
        duration: '-',
        days: '-',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        requestedDate: 'Jun 03, 2025',
        fromDate: 'Jun 15, 2025',
        toDate: 'Jun 20, 2025',
        reason: 'Business Trip',
        approver: {
            name: 'Travel Coordinator',
            status: 'Processing',
            comments: 'There are no comments!',
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
        }
    }
])

const filteredLeave = computed(() => {
    return Object.entries(leaves.value).map(([key, balance]) => ({
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Leaves', ' Leave'),
        balance: balance,
        key: key
    }));
})
</script>

<style lang="scss" scoped>
* {
    font-family: 'Rubik', sans-serif;
}

#leaveData .swiper-container {
    max-width: 100% !important;
}

#leaveData .leaveRounded {
    max-width: max-content !important;
    margin: 0 5px;
}

.swiperLOverflow {
    overflow: auto !important;
}

.textFontSize {
    font-size: 12px;
}

.darkBlue-heading-text {
    color: #2c3e50;
}

.bodyNewTxtClr {
    color: #6c757d;
}

.greyBg {
    background-color: #f8f9fa;
}

.employee-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.status-indicator {
    position: absolute;
    bottom: 15px;
    right: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    background-color: #e0e0e0;
    transition: background-color 0.3s ease;
}

.status-indicator.online {
    background-color: #4caf50;
}

.v-chip {
    font-weight: 500;
    letter-spacing: 0.5px;
}

.v-avatar .v-img {
    object-fit: cover;
}

.holiday-list {
    max-height: 350px;
    overflow-y: auto;
}

.holiday-item {
    border-radius: 12px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
}

.holiday-item:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-chip {
    font-weight: 500;
    letter-spacing: 0.5px;
    font-size: 0.75rem;
}

.holiday-list::-webkit-scrollbar {
    width: 4px;
}

.holiday-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.holiday-list::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

.holiday-list::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>