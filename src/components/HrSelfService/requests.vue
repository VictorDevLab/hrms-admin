<template>
  <v-row style="position: relative;">
    <v-col cols="12" md="6">
      <v-card v-if="leaveRequestCard" class="mx-auto pa-6 h-100" max-width="800" elevation="2" rounded="lg">
        <!-- Header Stats -->
        <div class="d-flex mb-6">
          <div class="d-flex align-center flex-1">
            <v-icon color="blue-lighten-2" size="28" class="mr-3">mdi-calendar-outline</v-icon>
            <div>
              <div class="text-h4 font-weight-bold text-red">{{ daysUsed }}</div>
              <div class="text-body-2 text-grey-darken-1">No of Days</div>
            </div>
          </div>

          <v-divider vertical class="mx-4"></v-divider>

          <div class="d-flex align-center flex-1">
            <v-icon color="blue" size="28" class="mr-3">mdi-calendar-check</v-icon>
            <div>
              <div class="text-h4 font-weight-bold text-blue">{{ daysRemaining || userDaysRemaining }}</div>
              <div class="text-body-2 text-grey-darken-1">Leave Remaining</div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" elevation="0" class="" @click="leaveRequestCard = false" color="red"
            size="x-small"></v-btn>
        </div>
        <v-divider class="mb-8"></v-divider>
        <v-form ref="form" v-model="valid">
          <v-row>
            <!-- Leave Type -->
            <v-col cols="12" md="6">
              <v-select v-model="leaveRequest.leaveType" :items="leaveTypes" @update:modelValue="selectRequestType"
                label="Leave Type" variant="underlined" :rules="[v => !!v || 'Leave type is required']" required>
                <template v-slot:label>
                  Leave Type <span class="text-red">*</span>
                </template>
              </v-select>
            </v-col>

            <!-- Leave Option -->
            <v-col cols="12" md="6">
              <v-select v-model="leaveRequest.leaveOption" :items="leaveOptions" label="Leave Option"
                variant="underlined" :rules="[v => !!v || 'Leave option is required']" required>
                <template v-slot:label>
                  Leave Option <span class="text-red">*</span>
                </template>
              </v-select>
            </v-col>

            <!-- Start Date -->
            <v-col cols="12" md="6">
              <v-text-field v-model="leaveRequest.startDate" label="Start Date" variant="underlined" type="date"
                :rules="[v => !!v || 'Start date is required']" required @change="getNumberOfDays">
                <template v-slot:label>
                  Start Date <span class="text-red">*</span>
                </template>
              </v-text-field>
            </v-col>

            <!-- End Date -->
            <v-col cols="12" md="6">
              <v-text-field v-model="leaveRequest.endDate" label="End Date" variant="underlined" type="date"
                :rules="[v => !!v || 'End date is required']" required @change="getNumberOfDays">
                <template v-slot:label>
                  End Date <span class="text-red">*</span>
                </template>
              </v-text-field>
            </v-col>

            <!-- Emergency Contact -->
            <v-col cols="12" md="6">
              <v-text-field v-model="leaveRequest.emergencyContact" label="Emergency Contact" variant="underlined"
                :rules="[v => !!v || 'Emergency contact is required']" required>
                <template v-slot:label>
                  Emergency Contact <span class="text-red">*</span>
                </template>
                <template v-slot:prepend-inner>
                  <v-icon size="20" color="blue-lighten-2">mdi-phone</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <!-- Notification Email -->
            <v-col cols="12" md="6">
              <v-text-field v-model="leaveRequest.notificationEmail" label="Notification Email" variant="underlined"
                type="email" :rules="emailRules">
                <template v-slot:prepend-inner>
                  <v-icon size="20" color="blue-lighten-2">mdi-email-outline</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <!-- Reason -->
            <v-col cols="12">
              <v-textarea v-model="leaveRequest.reason" label="Reason" variant="underlined" rows="3"
                :rules="[v => !!v || 'Reason is required']" required>
                <template v-slot:label>
                  Reason <span class="text-red">*</span>
                </template>
              </v-textarea>
            </v-col>
          </v-row>

          <!-- Submit Button -->
          <v-row justify="end" class="mt-4">
            <v-col cols="auto">
              <v-btn color="#4263EB" variant="flat" rounded="lg" :disabled="!valid" @click="submitForm" class="px-8">
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
      <v-card v-else elevation="2" rounded="lg" class="h-100">
        <v-card-title class="text-h6 pa-3 d-flex align-center text-blue-darken-3">
          <v-icon class="mr-2" color="blue-darken-2">mdi-clipboard-list</v-icon>
          Your Requests
          <v-spacer></v-spacer>
          <v-btn icon="mdi-plus" @click="createRequest" color="primary" size="small"></v-btn>
        </v-card-title>

        <div v-if="loadingRequests" cols="12" sm="6" md="4" lg="3" v-for="i in 9" :key="i">
          <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
        </div>
        <div v-else class="custom-scrollbar" style="overflow-y: auto; height: 550px;">
          <v-list class="pa-0 scroll">
            <v-list-item v-for="request in requests" :key="request.id" :value="request.id" class="px-3 py-2 border-b"
              :class="{ 'bg-blue-lighten-5': selectedRequest?._id === request._id }" @click="selectRequest(request)">
              <template v-slot:prepend>
                <v-avatar size="40" class="mr-3">
                  <v-img :src="user.personal.image" :alt="user.personal.firstName"></v-img>
                </v-avatar>
              </template>

              <v-list-item-content>
                <div class="d-flex justify-space-between align-center mb-1">
                  <div>
                    <div class="font-weight-medium text-body-2">{{ user.personal.firstName }} {{ user.personal.lastName
                      }}
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
    <v-col cols="12" md="6" class="pa-2">
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
              <v-btn :disabled="selectedRequest.status === 'Completed'" color="error" variant="outlined" class="mr-2">
                <v-icon left>mdi-close</v-icon>
                Withdraw
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Empty State -->
      <v-card elevation="2" class="h-100 d-flex align-center justify-center" v-else>
        <div class="text-center text-grey-darken-1">
          <v-icon size="64" class="mb-2" color="blue-darken-3">mdi-clipboard-list-outline</v-icon>
          <div class="text-h6 text-blue-darken-3">Select a request to view details</div>
        </div>
      </v-card>
    </v-col>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" style="position: absolute; right: 100px; bottom: 2px"
      :timeout="snackbar.timeout" location="bottom">
      {{ snackbar.text }}
    </v-snackbar>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '../../axios'
import { formatDate } from '@/utils/dateFormatter';

const authStore = useAuthStore()
//.data, object from pinia store
const user = ref(authStore.user.data)
console.log("user", user.value)
const approver = ref(null)
const requests = ref([])

// Form validation
const valid = ref(false)
const form = ref(null)
const leaveRequestCard = ref(false)
const loadingRequests = ref(false)
// Stats
//leaveRequest.leaveOption
const selectedLeaveRequest = ref(null)
const daysUsed = ref(0)
const userDaysRemaining = ref(0)
const daysRemaining = ref(userDaysRemaining.value)

const snackbar = ref({
  show: false,
  text: '',
  color: 'error',
  timeout: 5000
})
const showSnackbar = (text, color = 'error') => {
  snackbar.value = {
    show: true,
    text,
    color,
    timeout: 5000
  }
}

const selectedRequest = ref(null)
const leaveRequest = ref({
  leaveType: '',
  leaveOption: '',
  startDate: '',
  endDate: '',
  emergencyContact: '',
  notificationEmail: '',
  reason: '',
  numberOfDays: 0,
})
// Form options
const leaveTypes = ref([
  'Annual Leaves',
  'Sick Leaves',
  'Maternity Leaves',
  'Paternity Leaves',
  'Emergency Leaves',
  'Compassionate Leaves',
  'Study Leaves'
])
const leaveOptions = ref([
  'Full Day',
  'Half Day - Morning',
  'Half Day - Afternoon',
  'Quarter Day'
])
// Validation rules
const emailRules = [
  v => !v || /.+@.+\..+/.test(v) || 'Email must be valid'
]

// Methods

const selectRequestType = () => {
  selectedLeaveRequest.value = leaveRequest.value?.leaveType
  switch (leaveRequest.value.leaveType) {
    case 'Annual Leaves':
      userDaysRemaining.value = user.value.leaves.annualLeaves
      break
    case 'Sick Leaves':
      userDaysRemaining.value = user.value.leaves.sickLeaves
      break
    case 'Maternity Leaves':
      userDaysRemaining.value = user.value.leaves.maternityLeaves
      break
    case 'Paternity Leaves':
      userDaysRemaining.value = user.value.leaves.paternityLeaves
      break
    case 'Emergency Leaves':
      userDaysRemaining.value = user.value.leaves.emergencyLeaves
      break
    case 'Compassionate Leaves':
      userDaysRemaining.value = user.value.leaves.compassionateLeaves
      break
    case 'Study Leaves':
      userDaysRemaining.value = user.value.leaves.studyLeaves
      break
    default:
      userDaysRemaining.value = 0
  }
  console.log("Selected Request Type:", selectedLeaveRequest.value)
}
const submitForm = async () => {
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token) 
  const { valid } = await form.value.validate()

  const payload = {
    ...leaveRequest.value,
    userId: authStore.userId,
    approver: user.value.employment.manager
  }
  console.log("payload", payload)
  if (valid) {
    try {
      const response = await axiosInstance.post('/api/requests/create', payload, {
        headers: {
          Authorization: AuthStr
        }
      })

      console.log("res",response)

       if (response) {
          await getUserRequests()
          leaveRequestCard.value = false
          showSnackbar("Leave Request Submitted Successfully", "teal")
        }
    } catch(err) {
        console.error(err)
    }
  }
}
const createRequest = () => {
  leaveRequestCard.value = true
  selectedRequest.value = null
}
const selectRequest = (request) => {
  selectedRequest.value = request
}
const getUserRequests = async() => {
  loadingRequests.value = true
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token)

  try {
    const response = await axiosInstance.get(`/api/requests/${authStore.userId}`, {headers: {Authorization: AuthStr}})
    if (response.status === 200) {
      requests.value = response.data.reverse()
    } 
    selectedRequest.value = requests.value[0] 
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

const getNumberOfDays = () => {
 const start = new Date(leaveRequest.value.startDate)
  const end = new Date(leaveRequest.value.endDate)
  if (start && end) {
    const diffTime = Math.abs(end - start)
    daysUsed.value =  Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 
    daysRemaining.value = userDaysRemaining.value - daysUsed.value
    console.log("Days Used:", daysUsed.value)
    console.log("Days Remaining:", daysRemaining.value)
    leaveRequest.value.numberOfDays = daysUsed.value
  }
  return 0
}

onMounted(async ()=> {
  await getUserRequests()
})
</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
.v-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.text-red {
  color: #f44336;
}

.text-blue {
  color: #2196f3;
}

.v-divider {
  opacity: 0.3;
}

.v-text-field, .v-select, .v-textarea {
  margin-bottom: 8px;
}
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #5a696d; 
  border-radius: 10px; 
}
</style>