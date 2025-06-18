<template>
  <v-row class="ma-0">
    <!-- Left Column - Employee List -->
    <v-col cols="3" class="pa-2">
      <v-card elevation="2" class="h-100">
        <v-card-title class="text-h6 pa-3 bg-primary text-white">
          <v-icon left class="mr-2">mdi-account-group</v-icon>
          Employees
        </v-card-title>
        
        <v-text-field
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search employees..."
          variant="outlined"
          density="compact"
          class="ma-3"
          hide-details
        ></v-text-field>
        
        <v-list density="compact" class="pa-0">
          <v-list-item
            v-for="user in filteredUsers"
            :key="user.id"
            :active="selectedEmployeeId === user._id"
            @click="selectEmployee(user)"
            class="mb-1 py-3"
          >
            <template v-slot:prepend>
              <v-avatar size="50" class="mr-3">
                <v-img v-if="user.personal?.image" :src="user.personal.image" />
                <v-icon v-else color="primary">mdi-account-circle</v-icon>
              </v-avatar>
            </template>
            
            <v-list-item-title class="font-weight-medium d-flex flex-wrap">
              {{ user.personal?.firstName }} {{ user.personal?.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle class="d-flex flex-wrap">
              {{ user.employment?.title || 'No Title' }}
            </v-list-item-subtitle>
            
            <template v-slot:append>
              <v-chip
                size="small"
                color="teal"
                variant="flat"
                v-if="user.employment?.employeeId"
              >
                {{ user.employment.employeeId }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <!-- Right Column - Employee Details -->
    <v-col cols="9" class="pa-2">
      <v-card elevation="2" class="h-100">
        <v-card-title class="d-flex align-center justify-space-between pa-4 bg-grey-lighten-5">
          <div class="d-flex align-center">
            <v-avatar size="50" class="mr-3">
              <v-img v-if="currentEmployee.personal?.image" :src="currentEmployee.personal.image" />
              <v-icon v-else color="primary" size="30">mdi-account-circle</v-icon>
            </v-avatar>
            <div>
              <h2 class="text-h5">
                {{ currentEmployee.personal?.firstName }} {{ currentEmployee.personal?.lastName }}
              </h2>
              <p class="text-subtitle-1 text-grey-darken-1 ma-0">
                {{ currentEmployee.employment?.title }} - {{ currentEmployee.employment?.department }}
              </p>
            </div>
          </div>
          
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              variant="outlined"
              @click="toggleEditMode"
              :prepend-icon="editMode ? 'mdi-close' : 'mdi-pencil'"
            >
              {{ editMode ? 'Cancel' : 'Edit' }}
            </v-btn>
            
            <v-btn
              v-if="editMode"
              color="success"
              @click="saveChanges"
              prepend-icon="mdi-content-save"
              :loading="saving"
            >
              Save Changes
            </v-btn>
            
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="closeForm"
            ></v-btn>
          </div>
        </v-card-title>

        <v-tabs v-model="activeTab" grow color="blue-accent-4" class="border-b">
          <v-tab value="personal">
            <v-icon left>mdi-account</v-icon>
            Personal
          </v-tab>
          <v-tab value="employment">
            <v-icon left>mdi-briefcase</v-icon>
            Employment
          </v-tab>
          <v-tab value="hr">
            <v-icon left>mdi-calendar</v-icon>
            HR & Leaves
          </v-tab>
          <v-tab value="compensation">
            <v-icon left>mdi-currency-usd</v-icon>
            Compensation
          </v-tab>
          <!-- <v-tab value="documents">
            <v-icon left>mdi-file-document</v-icon>
            Documents
          </v-tab>
          <v-tab value="logs">
            <v-icon left>mdi-history</v-icon>
            Logs
          </v-tab> -->
        </v-tabs>

        <v-card-text class="pa-4" style="height: 500px; overflow-y: auto;">
          <v-tabs-window v-model="activeTab">
            
            <!-- Personal Tab -->
            <v-tabs-window-item value="personal">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.personal.firstName"
                    label="First Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.personal.lastName"
                    label="Last Name"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.personal.phone"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editableEmployee.personal.address"
                    label="Address"
                    prepend-inner-icon="mdi-home"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editableEmployee.personal.city"
                    label="City"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editableEmployee.personal.state"
                    label="State"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.personal.zipCode"
                    label="Zip Code"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.personal.dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    prepend-inner-icon="mdi-calendar"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.personal.gender"
                    label="Gender"
                    :items="['Male', 'Female', 'Other']"
                    prepend-inner-icon="mdi-human-male-female"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.personal.maritalStatus"
                    label="Marital Status"
                    :items="['Single', 'Married', 'Divorced', 'Widowed']"
                    prepend-inner-icon="mdi-heart"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
              </v-row>
            </v-tabs-window-item>

            <!-- Employment Tab -->
            <v-tabs-window-item value="employment">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.employment.employeeId"
                    label="Employee ID"
                    prepend-inner-icon="mdi-badge-account"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.employment.department"
                    label="Department"
                    :items="['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales']"
                    prepend-inner-icon="mdi-domain"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.employment.title"
                    label="Job Title"
                    prepend-inner-icon="mdi-briefcase"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.employment.employeeType"
                    label="Employee Type"
                    :items="['Full-time', 'Part-time', 'Contract', 'Intern']"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.email"
                    label="Email Address"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- <v-text-field
                    v-model="editableEmployee.employment.manager"
                    label="Manager"
                    prepend-inner-icon="mdi-account-supervisor"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field> -->
                  <v-autocomplete 
                    v-model="editableEmployee.employment.manager" 
                    item-title="fullName" 
                    item-value="_id" 
                    label="Manager"
                    :items="managersList"
                    prepend-inner-icon="mdi-account-supervisor"
                    variant="outlined" 
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'">
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.employment.dateOfJoining"
                    label="Date of Joining"
                    type="date"
                    prepend-inner-icon="mdi-calendar-plus"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.employment.startDate"
                    label="Start Date"
                    type="date"
                    prepend-inner-icon="mdi-calendar-start"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.employment.endDate"
                    label="End Date"
                    type="date"
                    prepend-inner-icon="mdi-calendar-end"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-tabs-window-item>

            <!-- HR & Leaves Tab -->
            <v-tabs-window-item value="hr">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Leave Balances</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.annualLeaves"
                    label="Annual Leaves"
                    type="number"
                    prepend-inner-icon="mdi-calendar-star"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.sickLeaves"
                    label="Sick Leaves"
                    type="number"
                    prepend-inner-icon="mdi-calendar-heart"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.emergencyLeaves"
                    label="Emergency Leaves"
                    type="number"
                    prepend-inner-icon="mdi-alert-circle"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.maternityLeaves"
                    label="Maternity Leaves"
                    type="number"
                    prepend-inner-icon="mdi-baby-bottle"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.paternityLeaves"
                    label="Paternity Leaves"
                    type="number"
                    prepend-inner-icon="mdi-baby-face"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.leaves.studyLeaves"
                    label="Study Leaves"
                    type="number"
                    prepend-inner-icon="mdi-school-outline"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-tabs-window-item>

            <!-- Compensation Tab -->
            <v-tabs-window-item value="compensation">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Salary Information</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.basicSalary"
                    label="Basic Salary"
                    type="number"
                    prepend-inner-icon="mdi-currency-usd"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.compensation.currency"
                    label="Currency"
                    :items="['USD', 'EUR', 'GBP', 'KES']"
                    prepend-inner-icon="mdi-cash"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editableEmployee.compensation.payFrequency"
                    label="Pay Frequency"
                    :items="['Monthly', 'Bi-weekly', 'Weekly', 'Annual']"
                    prepend-inner-icon="mdi-calendar-clock"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.bonus"
                    label="Bonus"
                    type="number"
                    prepend-inner-icon="mdi-gift"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.housingAllowance"
                    label="Housing Allowance"
                    type="number"
                    prepend-inner-icon="mdi-home-city"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.commission"
                    label="Commission"
                    type="number"
                    prepend-inner-icon="mdi-percent"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-divider class="my-4"></v-divider>
                  <h3 class="text-h6 mb-4">Banking Details</h3>
                </v-col>
                
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.bankName"
                    label="Bank Name"
                    prepend-inner-icon="mdi-bank"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.bankAddress"
                    label="Bank Address"
                    prepend-inner-icon="mdi-map-marker"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editableEmployee.compensation.accountNumber"
                    label="Account Number"
                    prepend-inner-icon="mdi-numeric"
                    variant="outlined"
                    :readonly="!editMode"
                    :bg-color="editMode ? 'white' : 'grey-lighten-4'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-tabs-window-item>

            <!-- Documents Tab -->
            <!-- <v-tabs-window-item value="documents">
              <div class="text-center pa-8">
                <v-icon size="64" color="grey-lighten-1">mdi-file-document-outline</v-icon>
                <h3 class="text-h6 mt-4 mb-2">Documents Section</h3>
                <p class="text-grey-darken-1">Document management functionality will be implemented here.</p>
                <v-btn color="primary" prepend-icon="mdi-upload" disabled>
                  Upload Document
                </v-btn>
              </div>
            </v-tabs-window-item> -->

            <!-- Logs Tab -->
            <!-- <v-tabs-window-item value="logs">
              <div class="text-center pa-8">
                <v-icon size="64" color="grey-lighten-1">mdi-history</v-icon>
                <h3 class="text-h6 mt-4 mb-2">Activity Logs</h3>
                <p class="text-grey-darken-1">Employee activity logs will be displayed here.</p>
              </div>
            </v-tabs-window-item> -->

          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-col>

      <v-dialog v-model="showSuccessDialog" max-width="500">
            <v-card>
                <v-card-title class="text-h5 text-center">
                    <v-icon color="success" size="large" class="mr-2">mdi-check-circle</v-icon>
                    Success!
                </v-card-title>
                <v-card-text class="text-center">
                    Employee Updated successfully!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showSuccessDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showFailDialog" max-width="500">
            <v-card>
                <v-card-title class="text-h5 text-center">
                    <v-icon color="red" size="large" class="mr-2">mdi-close-circle-outline</v-icon>
                    Failed!
                </v-card-title>
                <v-card-text class="text-center">
                    Employee Update Failed!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showFailDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/axios'

const props = defineProps(['employee', 'users'])
const emit = defineEmits(['closeEmpForm', 'employeeUpdated'])

const authStore = useAuthStore()
// Reactive data
const activeTab = ref('personal')
const editMode = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const selectedEmployeeId = ref(null)
const currentEmployee = ref({})
const editableEmployee = ref({})

const showFailDialog = ref(false)
const showSuccessDialog = ref(false)
// Initialize data structure
const initializeEmployee = (employee) => {
  return {
    id: employee?._id || '',
    email: employee?.email || '',
    password: employee?.password || '',
    personal: {
      firstName: employee?.personal?.firstName || '',
      lastName: employee?.personal?.lastName || '',
      phone: employee?.personal?.phone || '',
      address: employee?.personal?.address || '',
      city: employee?.personal?.city || '',
      state: employee?.personal?.state || '',
      zipCode: employee?.personal?.zipCode || '',
      dateOfBirth: employee?.personal?.dateOfBirth || '',
      gender: employee?.personal?.gender || '',
      maritalStatus: employee?.personal?.maritalStatus || '',
      image: employee?.personal?.image || ''
    },
    employment: {
      employeeId: employee?.employment?.employeeId || '',
      department: employee?.employment?.department || '',
      title: employee?.employment?.title || '',
      employeeType: employee?.employment?.employeeType || '',
      roleId: employee?.employment?.roleId || '',
      manager: employee?.employment?.manager || '',
      dateOfJoining: employee?.employment?.dateOfJoining || '',
      startDate: employee?.employment?.startDate || '',
      endDate: employee?.employment?.endDate || ''
    },
    leaves: {
      annualLeaves: employee?.leaves?.annualLeaves || 0,
      sickLeaves: employee?.leaves?.sickLeaves || 0,
      emergencyLeaves: employee?.leaves?.emergencyLeaves || 0,
      maternityLeaves: employee?.leaves?.maternityLeaves || 0,
      paternityLeaves: employee?.leaves?.paternityLeaves || 0,
      studyLeaves: employee?.leaves?.studyLeaves || 0,
      compassionateLeaves: employee?.leaves?.compassionateLeaves || 0
    },
    compensation: {
      basicSalary: employee?.compensation?.basicSalary || 0,
      currency: employee?.compensation?.currency || 'USD',
      payFrequency: employee?.compensation?.payFrequency || 'Monthly',
      bonus: employee?.compensation?.bonus || 0,
      housingAllowance: employee?.compensation?.housingAllowance || 0,
      commission: employee?.compensation?.commission || 0,
      bankName: employee?.compensation?.bankName || '',
      bankAddress: employee?.compensation?.bankAddress || '',
      accountNumber: employee?.compensation?.accountNumber || ''
    }
  }
}

// Computed properties
const filteredUsers = computed(() => {
  if (!props.users) return []
  
  if (!searchQuery.value) return props.users
  
  return props.users.filter(user => {
    const fullName = `${user.personal?.firstName || ''} ${user.personal?.lastName || ''}`.toLowerCase()
    const title = (user.employment?.title || '').toLowerCase()
    const department = (user.employment?.department || '').toLowerCase()
    const employeeId = (user.employment?.employeeId || '').toLowerCase()
    const query = searchQuery.value.toLowerCase()
    
    return fullName.includes(query) || 
           title.includes(query) || 
           department.includes(query) || 
           employeeId.includes(query)
  })
})
const managersList = computed(()=> {
    //TODO return employees with emp type Manager
     return props.users.map(user => ({
      ...user,
      fullName: `${user.personal.firstName} ${user.personal.lastName}`
     }))
})
// Methods
const selectEmployee = (employee) => {
  selectedEmployeeId.value = employee._id
  currentEmployee.value = initializeEmployee(employee)
  editableEmployee.value = JSON.parse(JSON.stringify(currentEmployee.value))
  editMode.value = false
  activeTab.value = 'personal'
}

const toggleEditMode = () => {
  if (editMode.value) {
    // Cancel editing, reset changes
    editableEmployee.value = JSON.parse(JSON.stringify(currentEmployee.value))
  }
  editMode.value = !editMode.value
}

const saveChanges = async () => {
  saving.value = true
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token)

  const payload = editableEmployee.value
  console.log("payload", payload)
  try {
    const response = await axiosInstance.put(`/api/users/updateUser/${selectedEmployeeId.value}`, payload, { headers: { Authorization: AuthStr } })
    if (response.status === 200) {
        showSuccessDialog.value = true
      }
    currentEmployee.value = JSON.parse(JSON.stringify(editableEmployee.value))
    editMode.value = false
    emit('employeeUpdated', editableEmployee.value)
  } catch (error) {
      showFailDialog.value = true
    console.error('Error updating employee:', error)
  } finally {
    saving.value = false
  }
}

const closeForm = () => {
  emit('closeEmpForm')
}

// Initialize with the provided employee
watch(() => props.employee, (newEmployee) => {
  if (newEmployee) {
    selectedEmployeeId.value = newEmployee.id
    currentEmployee.value = initializeEmployee(newEmployee)
    editableEmployee.value = JSON.parse(JSON.stringify(currentEmployee.value))
  }
}, { immediate: true })

// Initialize selected employee if users are available
watch(() => props.users, (newUsers) => {
  if (newUsers && newUsers.length > 0 && !selectedEmployeeId.value) {
    // If no employee is pre-selected, select the first one
    if (props.employee) {
      selectEmployee(props.employee)
    } else {
      selectEmployee(newUsers[0])
    }
  }
}, { immediate: true })
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
  border-radius: 8px;
  margin: 0 8px;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.12);
  color: rgb(25, 118, 210);
}

.v-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.border-b {
  border-bottom: 1px solid #e0e0e0;
}

.v-card {
  border-radius: 12px;
}

.v-tabs-window-item {
  padding-top: 16px;
}

.v-text-field--readonly .v-field__input {
  opacity: 0.8;
}

.employee-section-title {
  color: #1976d2;
  font-weight: 600;
  margin-bottom: 16px;
}

</style>