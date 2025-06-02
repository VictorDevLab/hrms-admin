<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <v-row class="mb-1">
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <div class="d-flex align-center justify-space-between mb-3">
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <h3 class="text-h6">2025-05-30</h3>
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
          
          <h2 class="text-h5 mb-4">Overview May 30, 2025</h2>
          
          <!-- Approval Requests Alert -->
          <v-alert 
            color="orange-lighten-4" 
            border="start" 
            border-color="orange"
            class="mb-4"
          >
            <div class="d-flex align-center">
              <span>84 Approval Requests are pending</span>
              <v-spacer></v-spacer>
              <v-btn icon size="small" color="orange">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-alert>

          <!-- Stats Grid -->
          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-center">
                <v-icon size="40" color="blue" class="mb-2">mdi-calendar-check</v-icon>
                <div class="text-h4 font-weight-bold">2</div>
                <div class="text-body-2 text-medium-emphasis">Leaves found</div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-center">
                <v-icon size="40" color="blue" class="mb-2">mdi-home</v-icon>
                <div class="text-h4 font-weight-bold">0</div>
                <div class="text-body-2 text-medium-emphasis">WFH</div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div class="text-center">
                <v-icon size="40" color="blue" class="mb-2">mdi-account-off</v-icon>
                <div class="text-h4 font-weight-bold">135</div>
                <div class="text-body-2 text-medium-emphasis">Absent</div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-center">
                <v-icon size="40" color="blue" class="mb-2">mdi-clock-alert</v-icon>
                <div class="text-h4 font-weight-bold">1</div>
                <div class="text-body-2 text-medium-emphasis">Late</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Upcoming Leaves -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" style="height: 100%;">
          <div class="d-flex align-center justify-space-between mb-3">
            <h3 class="text-h6">Upcoming Leaves</h3>
            <v-select
              v-model="selectedLeaveFilter"
              :items="leaveFilters"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 100px;"
            ></v-select>
          </div>

          <div class="upcoming-leaves">
            <v-list density="compact">
              <v-list-item
                v-for="leave in upcomingLeaves"
                :key="leave.id"
                class="px-0 mb-3"
              >
                <template #prepend>
                  <v-avatar size="40">
                    <v-img :src="leave.avatar"></v-img>
                  </v-avatar>
                </template>
                
                <v-list-item-title class="font-weight-medium">
                  {{ leave.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ leave.dates }}
                </v-list-item-subtitle>

                <template #append>
                  <div class="text-center">
                    <div class="text-h6 font-weight-bold">{{ leave.days.split(' ')[0] }}</div>
                    <div class="text-caption">{{ leave.days.split(' ')[1] }}</div>
                    <v-chip size="small" color="grey" variant="flat">
                      {{ leave.type }}
                    </v-chip>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>

      <!-- Organization -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" style="height: 100%;">
          <div class="d-flex align-center justify-space-between mb-3">
            <h2 class="" style="font-size: 16px;">Organization (69)</h2>
            <v-select
              v-model="selectedOrgFilter"
              :items="orgFilters"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 100px;"
            ></v-select>
          </div>

          <v-list density="compact">
            <v-list-item
              v-for="member in organizationMembers"
              :key="member.id"
              class="px-0"
            >
              <template #prepend>
                <v-avatar size="40">
                  <v-img :src="member.avatar"></v-img>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-medium">
                {{ member.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ member.role }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Projects and Tasks Stats -->
     <v-row class="mb-2">
        <v-col cols="12">
            <v-card class="pa-3 text-center d-flex justify-center align-center">
            <v-col cols="4">
               <div class="text-body-1">Total Projects</div>
               <v-icon size="45" color="#0064D7" class="mb-2">mdi-folder-multiple</v-icon>
               <div class="text-h4 font-weight-bold mb-1">7</div>
                <div class="d-flex justify-center mt-2">
                    <v-chip size="small" color="green" class="me-1">3</v-chip>
                    <v-chip size="small" color="orange" class="me-1">1</v-chip>
                    <v-chip size="small" color="green">3</v-chip>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="text-body-1">Total Tasks</div>
                <v-icon size="45" color="blue" class="mb-2">mdi-format-list-checks</v-icon>
                <div class="text-h4 font-weight-bold mb-1">0</div>
            </v-col>
            <v-col cols="4">
              <div class="text-body-1 mb-2">Tasks Statistics</div>
              <v-icon size="45" color="blue" class="mb-2">mdi-chart-bar</v-icon>
              <div class="text-h4 font-weight-bold">0</div>
            </v-col> 
        </v-card>
    </v-col>
    </v-row>

    <!-- Bottom Section -->
    <v-row>
      <!-- Ongoing Tasks -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 overflow-y-auto" height="500">
          <h3 class="text-h6 mb-4">Ongoing Tasks (75)</h3>
          
          <v-list>
            <v-list-item class="px-0 mb-3">
              <template #prepend>
                <v-icon color="blue">mdi-account</v-icon>
              </template>
              
              <v-list-item-title>Employee Details</v-list-item-title>
              <v-list-item-subtitle>Jun 01, 2025</v-list-item-subtitle>

              <template #append>
                <div class="d-flex align-center">
                  <v-avatar size="24">
                    <v-img src="https://i.pravatar.cc/150?img=1"></v-img>
                  </v-avatar>
                  <v-chip size="small" color="red" class="ms-2">HIGH</v-chip>
                  <v-chip size="small" color="blue" variant="outlined" class="ms-2">Created</v-chip>
                </div>
              </template>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item class="px-0">
              <template #prepend>
                <v-icon color="blue">mdi-file-document</v-icon>
              </template>
              
              <v-list-item-title>Create Employment contract</v-list-item-title>
              <v-list-item-subtitle>Jun 01, 2025</v-list-item-subtitle>

              <template #append>
                <div class="d-flex align-center">
                  <v-avatar size="24">
                    <v-img src="https://i.pravatar.cc/150?img=2"></v-img>
                  </v-avatar>
                  <v-chip size="small" color="red" class="ms-2">HIGH</v-chip>
                  <v-chip size="small" color="blue" variant="outlined" class="ms-2">Created</v-chip>
                </div>
              </template>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item class="px-0">
              <template #prepend>
                <v-icon color="blue">mdi-file-document</v-icon>
              </template>
              
              <v-list-item-title>Create Employment contract</v-list-item-title>
              <v-list-item-subtitle>Jun 01, 2025</v-list-item-subtitle>

              <template #append>
                <div class="d-flex align-center">
                  <v-avatar size="24">
                    <v-img src="https://i.pravatar.cc/150?img=2"></v-img>
                  </v-avatar>
                  <v-chip size="small" color="red" class="ms-2">HIGH</v-chip>
                  <v-chip size="small" color="blue" variant="outlined" class="ms-2">Created</v-chip>
                </div>
              </template>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item class="px-0">
              <template #prepend>
                <v-icon color="blue">mdi-file-document</v-icon>
              </template>
              
              <v-list-item-title>Create Employment contract</v-list-item-title>
              <v-list-item-subtitle>Jun 01, 2025</v-list-item-subtitle>

              <template #append>
                <div class="d-flex align-center">
                  <v-avatar size="24">
                    <v-img src="https://i.pravatar.cc/150?img=2"></v-img>
                  </v-avatar>
                  <v-chip size="small" color="red" class="ms-2">HIGH</v-chip>
                  <v-chip size="small" color="blue" variant="outlined" class="ms-2">Created</v-chip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Ongoing Projects -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 overflow-y-auto" height="500">
          <h3 class="text-h6 mb-4">Ongoing Projects (7)</h3>
          
          <v-list>
            <v-list-item class="px-0">
              <template #prepend>
                <v-avatar size="40">
                  <v-img src="https://i.pravatar.cc/150?img=3"></v-img>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-medium">Talk meeting</v-list-item-title>
              <v-list-item-subtitle>0/0 Task Done</v-list-item-subtitle>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item class="px-0">
              <template #prepend>
                <v-avatar size="40">
                  <v-img src="https://i.pravatar.cc/150?img=3"></v-img>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-medium">Talk meeting</v-list-item-title>
              <v-list-item-subtitle>0/0 Task Done</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Reactive data
const selectedLeaveFilter = ref('All')
const selectedOrgFilter = ref('All')

const leaveFilters = ['All', 'Approved', 'Pending', 'Rejected']
const orgFilters = ['All', 'Active', 'Inactive']

const upcomingLeaves = ref([
  {
    id: 1,
    name: 'Nancy Sundiam',
    dates: 'Friday, Jun 27, 2025 - Friday, Jun 27, 2025',
    days: '01 Day',
    type: 'Maternity',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 2,
    name: 'Nancy Sundiam',
    dates: 'Tuesday, Jun 17, 2025 - Tuesday, Jun 17, 2025',
    days: '01 Day',
    type: 'Maternity',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 3,
    name: 'Nancy Sundiam',
    dates: 'Thursday, Jun 26, 2025 - Thursday, Jun 26, 2025',
    days: '01 Day',
    type: 'Maternity',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 4,
    name: 'Nancy Sundiam',
    dates: 'Friday, Jun 20, 2025 - Saturday, Jun 21, 2025',
    days: '02 Days',
    type: 'Maternity',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Nancy Sundiam',
    dates: 'Monday, Jun 23, 2025 - Wednesday, Jun 25, 2025',
    days: '03 Days',
    type: 'Maternity',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
])

const organizationMembers = ref([
  {
    id: 1,
    name: 'Alesia Lebiadzevich',
    role: 'Assistant Operations Manager',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 2,
    name: 'Ana Lou Salvador',
    role: 'Operations Analyst',
    avatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    id: 3,
    name: 'Antalia Antalia',
    role: 'AWS Support',
    avatar: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 4,
    name: 'Ayman Qasim',
    role: 'Legal Advisor',
    avatar: 'https://i.pravatar.cc/150?img=8'
  }
])
</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
.upcoming-leaves {
  max-height: 400px;
  overflow-y: auto;
}

.v-card {
  border-radius: 12px;
}

.v-chip {
  font-size: 10px;
}
</style>