<template>
  <v-row class="ma-0">
    <!-- Left Panel - All Pending Requests -->
    <v-col cols="6" class="pa-2">
      <v-card elevation="2" rounded="lg" class="h-100">
        <v-card-title class="text-h6 pa-3 d-flex align-center" style="background-color: #f5f5f5;">
          <v-icon class="mr-2">mdi-clipboard-list</v-icon>
          All Pending Requests
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchQuery"
            placeholder="Search User"
            variant="outlined"
            density="compact"
            hide-details
            class="mr-2"
            style="max-width: 200px;"
          >
            <template v-slot:prepend-inner>
              <v-icon size="small">mdi-magnify</v-icon>
            </template>
          </v-text-field>
          <!-- <v-btn icon="mdi-plus" color="primary" size="small"></v-btn> -->
        </v-card-title>
        <div v-if="loadingRequests" cols="12" sm="6" md="4" lg="3" v-for="i in 9" :key="i">
          <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
        </div>
        <div v-else class="custom-scrollbar" style="overflow-y: auto; height: 550px;">
          <v-list class="pa-0">
            <v-list-item 
              v-for="request in filteredRequests" 
              :key="request.id"
              :value="request.id"
              @click="selectRequest(request)"
              class="px-3 py-2 border-b"
              :class="{ 'bg-blue-lighten-5': selectedRequest?._id === request._id }"
            >
              <template v-slot:prepend>
                  <v-avatar size="40" class="mr-3">
                    <v-img :src="request.user.image" :alt="request.user.name"></v-img>
                  </v-avatar>
                </template>
  
                <v-list-item-content>
                  <div class="d-flex justify-space-between align-center mb-1">
                    <div>
                      <div class="font-weight-medium text-body-2">{{ request.user.name }} 
                      </div>
                      <div class="text-caption text-grey-darken-1">{{ request.leaveType }}</div>
                    </div>
                    <div class="text-right">
                      <v-chip :color="getRequestTypeColor(request.leaveType)" size="small" class="mb-1">
                        {{ request.leaveType }}
                      </v-chip>
                    </div>
                  </div>
  
                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center text-caption text-grey-darken-1">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      {{ request.numberOfDays }}
                    </div>
                    <div v-if="request.amount" class="text-right">
                      <span class="text-caption text-grey-darken-1">{{ request.amount }} </span>
                      <span class="text-caption text-grey-darken-1"> USD</span>
                    </div>
                  </div>
                </v-list-item-content>
          </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-col>

    <!-- Right Panel - Request Details -->
    <v-col cols="6" class="pa-2">
      <v-card elevation="2" rounded="lg" class="h-100" v-if="selectedRequest">
        <v-card-title class="text-h6 pa-3 d-flex align-center text-blue-darken-2" style="background-color: #e3f2fd;">
          <v-icon class="mr-2">mdi-information</v-icon>
          Request Info: {{ selectedRequest.leaveType }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" size="small"></v-btn>
        </v-card-title>

        <v-card-text class="pa-4">
          <!-- Request Details Grid -->
          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">request type</div>
              <div class="text-body-2 font-weight-medium">{{ selectedRequest.leaveType }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">requested on date</div>
              <div class="text-body-2 font-weight-medium">{{ formatDate(selectedRequest.createdAt) }}</div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">from date</div>
              <div class="text-body-2 font-weight-medium">{{ formatDate(selectedRequest.startDate) }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">to date</div>
              <div class="text-body-2 font-weight-medium">{{formatDate(selectedRequest.endDate) }}</div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">no of days</div>
              <div class="text-body-2 font-weight-medium">{{ selectedRequest.numberOfDays }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 mb-1">reason</div>
              <div class="text-body-2 font-weight-medium">{{ selectedRequest.reason }}</div>
            </v-col>
          </v-row>

          <!-- Approval Process Section -->
          <div class="mb-4">
            <div class="text-caption text-grey-darken-1 mb-2 d-flex align-center">
              approval process
              <v-spacer></v-spacer>
              <v-icon size="small">mdi-settings</v-icon>
            </div>

            <v-chip :color="selectedRequest.status === 'Processing' ? 'orange' : 'green'" size="small" class="mb-3">{{
              selectedRequest.status }}</v-chip>

            <!-- Single Approver -->
            <v-card variant="outlined" class="mb-3">
              <v-card-text class="pa-3">
                <div class="d-flex align-center">
                  <v-avatar size="32" class="mr-3">
                    <v-img :src="approver?.personal.image" :alt="approver?.personal.firstName"></v-img>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="text-body-2 font-weight-medium">{{ approver?.personal.firstName }} {{
                      approver?.personal.lastName }}</div>
                    <div class="text-caption text-grey-darken-1">{{ selectedRequest.status }}</div>
                  </div>
                  <v-chip :color="selectedRequest.status === 'Processing' ? 'orange' : 'green'" size="small">
                    {{ selectedRequest.status }}
                  </v-chip>
                </div>
                <div class="text-caption text-grey-darken-1 mt-2">
                  {{ selectedRequest.comments || "No Comments!" }}
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- Action -->
                 <v-row class="mt-4">
            <v-col>
              <v-btn color="success" variant="outlined" class="mr-2">
                <v-icon left>mdi-check</v-icon>
                approve
              </v-btn>
              <v-btn color="error" variant="outlined" class="mr-2">
                <v-icon left>mdi-close</v-icon>
                reject
              </v-btn>
              <v-btn color="primary" variant="outlined">
                <v-icon left>mdi-account-switch</v-icon>
                reassign
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <!-- Empty State -->
      <v-card elevation="2" class="h-100 d-flex align-center justify-center" v-else>
        <div class="text-center text-grey-darken-1">
          <v-icon size="64" class="mb-2">mdi-clipboard-list-outline</v-icon>
          <div class="text-h6">Select a request to view details</div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axiosInstance from '../../axios'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/dateFormatter';

const searchQuery = ref('')
const selected = ref([])
const selectedRequest = ref(null)
const loadingRequests = ref(false)

const authStore = useAuthStore()
const approver = ref(null)

const requests = ref([])

// Computed property for filtered requests based on search
const filteredRequests = computed(() => {
  if (!searchQuery.value) {
    return requests.value
  }
  return requests.value.filter(request => 
    request.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Function to select a request
const selectRequest = (request) => {
  selectedRequest.value = request
}

const getAllRequests = async() => {
  loadingRequests.value = true
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token)

  try {
    const response = await axiosInstance.get(`/api/requests/`, {headers: {Authorization: AuthStr}})
    if (response.status === 200) {
      console.log("response", response.data)
      requests.value = response.data.reverse()
    } 
     selectedRequest.value = requests.value[0] 
     console.log("selectedRequest", selectedRequest.value)
     await getApprover(selectedRequest.value?.approver) 

  } catch(error) {
   console.log("error", error)
  } finally {
    loadingRequests.value = false
  }

}
const getApprover = async (managerId) => {
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token)
  try {
    const response = await axiosInstance.get(`/api/users/${managerId}`, { headers: { Authorization: AuthStr } })
    approver.value = response.data
    console.log("approver", approver.value)
  } catch (error) {
    console.error('Error getting User Details:', error)
    throw error;
  }
}
const getRequestTypeColor = (type) => {
  switch (type) {
    case 'Annual Leaves': return 'blue'
    case 'Sick Leaves': return 'green'
    case 'Study Leaves': return 'orange'
    case 'Paternity Leaves': return 'purple'
    case 'Maternity Leaves': return 'purple'
    default: return 'grey'
  }
}

onMounted(async()=> {
  await getAllRequests()
    selectedRequest.value = requests.value[0]
})

</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #5a696d; 
  border-radius: 10px; 
}
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>