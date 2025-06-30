<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters v-if="employeeData">
      <!-- Left Sidebar -->
      <v-col cols="12" md="4" lg="3">
        <v-card class="h-100 mt-3 mr-3" max-height="600" elevation="1" rounded="lg">
          <v-card-text class="pa-6">
            <!-- Header -->
            <div class="d-flex justify-space-between align-center mb-4">
              <v-chip color="blue" variant="flat" size="small">
                {{ employeeData.leaves.annualLeaves }} Unlimited
              </v-chip>
              <div class="text-caption text-medium-emphasis">
                {{ employeeData.employment.employeeId }}
              </div>
            </div>

            <!-- Profile Image and Edit -->
            <div class="text-center mb-4">
              <v-avatar size="120" class="mb-3">
                <v-img 
                  :src="employeeData.personal.image" 
                  :alt="fullName"
                  cover
                />
              </v-avatar>
              <v-btn 
                icon="mdi-pencil" 
                size="small" 
                color="blue" 
                variant="text"
                class="position-absolute"
                style="top: 90px; right: calc(50% - 60px);"
              />
              <div class="d-flex align-center justify-center mb-2">
                <v-chip color="success" size="small" variant="flat">
                  <v-icon start>mdi-circle</v-icon>
                  Active
                </v-chip>
              </div>
            </div>

            <!-- Name and Title -->
            <div class="text-center mb-4">
              <h3 class="text-h5 font-weight-bold mb-1">{{ fullName }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-3">{{ employeeData.employment.title }}</p>
              
              <!-- Contact Info -->
              <div class="text-left">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" class="me-2">mdi-phone</v-icon>
                  <span class="text-body-2">{{ employeeData.personal.phone }}</span>
                </div>
                <div class="d-flex align-center mb-4">
                  <v-icon size="small" class="me-2">mdi-email</v-icon>
                  <span class="text-body-2">{{ employeeData.email }}</span>
                </div>
              </div>
            </div>

            <!-- Work Anniversary -->
            <div class="mb-4">
              <div class="text-subtitle-2 font-weight-bold mb-2">Work Anniversary</div>
              <div class="text-body-2 text-medium-emphasis">{{ workAnniversary }}</div>
              <div class="d-flex align-center mt-2">
                <span class="text-caption">{{ yearsOfService }}</span>
                <v-icon color="red" size="small" class="ml-2">mdi-medal</v-icon>
              </div>
            </div>

            <!-- Reporting To -->
            <div class="mb-4">
              <div class="text-subtitle-2 text-medium-emphasis mb-2">Reporting to</div>
              <div class="d-flex align-center">
                <v-avatar size="32" class="me-2">
                  <v-img src="https://via.placeholder.com/32" />
                </v-avatar>
                <span class="text-body-2">Sample Dev Admin</span>
              </div>
            </div>

            <!-- Change Password -->
            <v-btn 
              color="pink" 
              variant="text" 
              size="small"
              class="text-none"
            >
              Change Password
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Content -->
      <v-col cols="12" md="8" lg="9">
        <div class="mt-3 mr-3">
          <!-- Expandable Sections -->
          <div class="mb-4">
            <v-expansion-panels multiple>
              <!-- Bio -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="blue" class="me-3">mdi-account-circle</v-icon>
                    <span class="text-h6">Your Bio</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Full Name</div>
                      <div class="text-body-1 mb-3">{{ fullName }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Email</div>
                      <div class="text-body-1 mb-3">{{ employeeData.email }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Phone</div>
                      <div class="text-body-1 mb-3">{{ employeeData.personal.phone }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Date of Birth</div>
                      <div class="text-body-1 mb-3">{{ formatDate(employeeData.personal.dateOfBirth) }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Personal Information -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="purple" class="me-3">mdi-account</v-icon>
                    <span class="text-h6">Personal Information</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">First Name</div>
                      <div class="text-body-1 mb-3">{{ employeeData.personal.firstName }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Last Name</div>
                      <div class="text-body-1 mb-3">{{ employeeData.personal.lastName }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Gender</div>
                      <div class="text-body-1 mb-3">{{ employeeData.personal.gender }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Marital Status</div>
                      <div class="text-body-1 mb-3">{{ employeeData.personal.maritalStatus }}</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-medium-emphasis">Address</div>
                      <div class="text-body-1 mb-3">
                        {{ employeeData.personal.address }}, {{ employeeData.personal.city }}, 
                        {{ employeeData.personal.state }} {{ employeeData.personal.zipCode }}
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Emergency Contact -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="red" class="me-3">mdi-phone-alert</v-icon>
                    <span class="text-h6">Emergency Contact</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-body-2 text-medium-emphasis">
                    No emergency contact information available.
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Employment Information -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="purple" class="me-3">mdi-briefcase</v-icon>
                    <span class="text-h6">Employment Information</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Employee ID</div>
                      <div class="text-body-1 mb-3">{{ employeeData.employment.employeeId }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Department</div>
                      <div class="text-body-1 mb-3">{{ employeeData.employment.department }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Job Title</div>
                      <div class="text-body-1 mb-3">{{ employeeData.employment.title }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Employee Type</div>
                      <div class="text-body-1 mb-3">{{ employeeData.employment.employeeType }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Role</div>
                      <div class="text-body-1 mb-3">{{ employeeData.employment.roleId }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Date of Joining</div>
                      <div class="text-body-1 mb-3">{{ formatDate(employeeData.employment.dateOfJoining) }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Compensation -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="green" class="me-3">mdi-currency-usd</v-icon>
                    <span class="text-h6">Compensation</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Basic Salary</div>
                      <div class="text-body-1 mb-3">{{ formatCurrency(employeeData.compensation.basicSalary, employeeData.compensation.currency) }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Pay Frequency</div>
                      <div class="text-body-1 mb-3">{{ employeeData.compensation.payFrequency }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Bonus</div>
                      <div class="text-body-1 mb-3">{{ formatCurrency(employeeData.compensation.bonus, employeeData.compensation.currency) }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Housing Allowance</div>
                      <div class="text-body-1 mb-3">{{ formatCurrency(employeeData.compensation.housingAllowance, employeeData.compensation.currency) }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Banking Information -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="blue" class="me-3">mdi-bank</v-icon>
                    <span class="text-h6">Banking Information</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Bank Name</div>
                      <div class="text-body-1 mb-3">{{ employeeData.compensation.bankName }}</div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis">Account Number</div>
                      <div class="text-body-1 mb-3">{{ employeeData.compensation.accountNumber }}</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-medium-emphasis">Bank Address</div>
                      <div class="text-body-1 mb-3">{{ employeeData.compensation.bankAddress }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Medical Details -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="red" class="me-3">mdi-medical-bag</v-icon>
                    <span class="text-h6">Medical Details</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-body-2 text-medium-emphasis">
                    No medical details available.
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Personal Documents -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="orange" class="me-3">mdi-file-document</v-icon>
                    <span class="text-h6">Personal Documents</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-body-2 text-medium-emphasis">
                    No documents uploaded.
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Assets -->
              <v-expansion-panel rounded="lg" elevation="1" >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="green" class="me-3">mdi-package-variant</v-icon>
                    <span class="text-h6">Assets</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-body-2 text-medium-emphasis">
                    No assets assigned.
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/axios'

const authStore = useAuthStore()

const employeeData = ref(null)

// Computed properties
const fullName = computed(() => {
  return `${employeeData.value.personal.firstName} ${employeeData.value.personal.lastName}`
})

const workAnniversary = computed(() => {
  const joinDate = new Date(employeeData.value.employment.dateOfJoining)
  return joinDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
})

const yearsOfService = computed(() => {
  const joinDate = new Date(employeeData.value.employment.dateOfJoining)
  const today = new Date()
  const diffTime = Math.abs(today - joinDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 365) {
    return `with us for ${diffDays} day(s)`
  } else {
    const years = Math.floor(diffDays / 365)
    return `with us for ${years} year(s)`
  }
})
const getUserDetails = async () => {
    const AuthStr = 'Bearer '.concat(authStore.token)
    try {
        const response = await axiosInstance.get(`/api/users/${authStore.userId}`, { headers: { Authorization: AuthStr } })
        employeeData.value = response.data
    } catch (error) {
        console.error('Error getting User Details:', error)
        throw error;
    }
}
// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(parseFloat(amount) || 0)
}

onMounted(async () => {
  await getUserDetails()
})
</script>

<style scoped>
.v-expansion-panel-title {
  padding: 16px 24px;
}

.v-expansion-panel-text {
  padding: 0 24px 24px;
}

.position-absolute {
  position: absolute;
}

.v-avatar {
  border: 3px solid #f5f5f5;
}
</style>