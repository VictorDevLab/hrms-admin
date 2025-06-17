<template>
  <v-row>
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
        </div>
      <v-divider class="mb-8"></v-divider>
        <v-form ref="form" v-model="valid">
          <v-row>
            <!-- Leave Type -->
            <v-col cols="12" md="6">
              <v-select v-model="leaveRequest.leaveType" :items="leaveTypes" @update:modelValue="selectRequestType" label="Leave Type" variant="underlined"
                :rules="[v => !!v || 'Leave type is required']" required>
                <template v-slot:label>
                  Leave Type <span class="text-red">*</span>
                </template>
              </v-select>
            </v-col>

            <!-- Leave Option -->
            <v-col cols="12" md="6">
              <v-select v-model="leaveRequest.leaveOption" :items="leaveOptions" label="Leave Option" variant="underlined"
                :rules="[v => !!v || 'Leave option is required']" required>
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
              <v-text-field v-model="leaveRequest.notificationEmail" label="Notification Email" variant="underlined" type="email"
                :rules="emailRules">
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
              <v-btn color="#4263EB" variant="flat" rounded="lg" :disabled="!valid" @click="submitForm"
                class="px-8">
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" class="pa-2">
      <v-card elevation="2" rounded="lg" class="h-100">
        <v-card-title class="text-h6 pa-3 d-flex align-center text-blue-darken-2" style="background-color: #f5f5f5;">
          <v-icon class="mr-2" color="blue-darken-2">mdi-clipboard-list</v-icon>
          Your Requests
          <v-spacer></v-spacer>
        </v-card-title>

        <v-list class="pa-0">
          <v-list-item v-for="request in requests" :key="request.id" :value="request.id" class="px-3 py-2"
            :class="{ 'bg-blue-lighten-5': selectedRequest?.id === request.id }">
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
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '../../axios'

const authStore = useAuthStore()
//.data, object from pinia store
const user = authStore.user.data

// Form validation
const valid = ref(false)
const form = ref(null)
const leaveRequestCard = ref(true)
// Stats
//leaveRequest.leaveOption
const selectedRequest = ref(null)
const daysUsed = ref(0)
const userDaysRemaining = ref(0)
const daysRemaining = ref(userDaysRemaining.value)

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
  selectedRequest.value = leaveRequest.value?.leaveType
  switch (leaveRequest.value.leaveType) {
    case 'Annual Leaves':
      userDaysRemaining.value = user.leaves.annualLeaves
      break
    case 'Sick Leaves':
      userDaysRemaining.value = user.leaves.sickLeaves
      break
    case 'Maternity Leaves':
      userDaysRemaining.value = user.leaves.maternityLeaves
      break
    case 'Paternity Leaves':
      userDaysRemaining.value = user.leaves.paternityLeaves
      break
    case 'Emergency Leaves':
      userDaysRemaining.value = user.leaves.emergencyLeaves
      break
    case 'Compassionate Leaves':
      userDaysRemaining.value = user.leaves.compassionateLeaves
      break
    case 'Study Leaves':
      userDaysRemaining.value = user.leaves.studyLeaves
      break
    default:
      userDaysRemaining.value = 0
  }
  console.log("Selected Request Type:", selectedRequest.value)
}
const submitForm = async () => {
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token) 
  const { valid } = await form.value.validate()

  const payload = {
    ...leaveRequest.value,
    userId: authStore.userId,
    approver: user.employment.manager
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
          //TODO: refetch requests by that user
          leaveRequestCard.value = false
          //TODO:Snackbar
        }
    } catch(err) {
        console.error(err)
    }
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
])



const getRequestTypeColor = (type) => {
  switch (type) {
    case 'leave': return 'blue'
    case 'WFH': return 'green'
    case 'claim': return 'orange'
    case 'letter': return 'purple'
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

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>