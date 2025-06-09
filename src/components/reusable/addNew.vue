<template>
    <v-container class="">
        <v-card class="custom-scrollbar">
            <v-stepper v-model="step" alt-labels style="min-height: 603px; max-height: 603px; overflow-y: scroll;">
                <div class="d-flex justify-center align-center pa-0 ma-0">
                    <v-stepper-item :complete="step > 1" :value="1" title="Personal"
                        icon="mdi-account"></v-stepper-item>

                    <v-divider></v-divider>

                    <v-stepper-item :complete="step > 2" :value="2" title="Employment"
                        icon="mdi-briefcase"></v-stepper-item>

                    <v-divider></v-divider>

                    <v-stepper-item :complete="step > 3" :value="3" title="Compensation"
                        icon="mdi-currency-usd"></v-stepper-item>
                </div>
                <v-divider></v-divider>

                <v-stepper-window>

                    <!-- Step 2: Personal Information -->
                    <v-stepper-window-item :value="1">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.firstName" label="First Name"
                                        prepend-inner-icon="mdi-account"  variant="underlined" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.lastName" label="Last Name"
                                         variant="underlined" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.phone" label="Phone Number"
                                        prepend-inner-icon="mdi-phone"  variant="underlined"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.personalEmail" label="Personal Email"
                                        type="email" prepend-inner-icon="mdi-email-outline"  variant="underlined"></v-text-field>
                                </v-col> -->
                                <v-col cols="12">
                                    <v-text-field v-model="employee.personal.address" label="Address"
                                        prepend-inner-icon="mdi-home"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.city" label="City"
                                         variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.state" label="State"
                                         variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.zipCode" label="Zip Code"
                                         variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.dateOfBirth" label="Date of Birth"
                                        type="date" prepend-inner-icon="mdi-calendar"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.personal.gender" label="Gender" :items="genderOptions"
                                        prepend-inner-icon="mdi-human-male-female"  variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.personal.maritalStatus" label="Marital Status"
                                        :items="maritalStatusOptions" prepend-inner-icon="mdi-heart"
                                         variant="underlined"></v-select>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-stepper-window-item>

                    <!-- Step 3: Employment Information -->
                    <v-stepper-window-item :value="2">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.employment.department" label="Department"
                                        :items="departmentOptions" prepend-inner-icon="mdi-domain"
                                         variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.title" label="Job Title"
                                        prepend-inner-icon="mdi-briefcase"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.employment.employeeType" label="Employee Type"
                                        :items="employeeTypeOptions"  variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.roleId" label="Role ID"
                                         variant="underlined"></v-text-field>
                                </v-col>
                                 <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.email" label="Email Address" type="email"
                                        prepend-inner-icon="mdi-email"  variant="underlined" :rules="emailRules"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.password" label="Password"
                                        :type="showPassword ? 'text' : 'password'"
                                        :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:prepend="showPassword = !showPassword"  variant="underlined"
                                        :rules="passwordRules" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.employeeId" label="Employee ID"
                                        prepend-inner-icon="mdi-badge-account"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.manager" label="Manager"
                                        prepend-inner-icon="mdi-account-supervisor"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.dateOfJoining" label="Date of Joining"
                                        type="date" prepend-inner-icon="mdi-calendar-plus"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.startDate" label="Start Date" type="date"
                                        prepend-inner-icon="mdi-calendar-start"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.endDate" label="End Date" type="date"
                                        prepend-inner-icon="mdi-calendar-end"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.probationEndDate"
                                        label="Probation End Date" type="date" prepend-inner-icon="mdi-calendar-clock"
                                         variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-stepper-window-item>

                    <!-- Step 4: Compensation -->
                    <v-stepper-window-item :value="3">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.basicSalary" label="Basic Salary"
                                        type="number" prepend-inner-icon="mdi-currency-usd"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.compensation.currency" label="Currency"
                                        :items="currencyOptions" prepend-inner-icon="mdi-cash"  variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.compensation.payFrequency" label="Pay Frequency"
                                        :items="payFrequencyOptions" prepend-inner-icon="mdi-calendar-clock"
                                         variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.bonus" label="Bonus" type="number"
                                        prepend-inner-icon="mdi-gift"  variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.housingAllowance"
                                        label="Housing Allowance" type="number" prepend-inner-icon="mdi-home-city"
                                         variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.commission" label="Commission"
                                        type="number" prepend-inner-icon="mdi-percent"  variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-stepper-window-item>
                </v-stepper-window>

                <v-card-actions class="pa-4">
                    <v-btn v-if="step > 1" @click="step--"  variant="underlined" prepend-inner-icon="mdi-chevron-left">
                        Previous
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn v-if="step < 3" @click="step++" color="primary" prepend-inner-icon="mdi-chevron-right">
                        Next
                    </v-btn>

                    <v-btn v-if="step === 3" @click="submitForm" color="success" prepend-inner-icon="mdi-check">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-stepper>
        </v-card>

        <!-- Success Dialog -->
        <v-dialog v-model="showSuccessDialog" max-width="500">
            <v-card>
                <v-card-title class="text-h5 text-center">
                    <v-icon color="success" size="large" class="mr-2">mdi-check-circle</v-icon>
                    Success!
                </v-card-title>
                <v-card-text class="text-center">
                    Employee registration completed successfully!
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
                    <v-icon color="red" size="large" class="mr-2">mdi-alpha-x-circle</v-icon>
                    Failed!
                </v-card-title>
                <v-card-text class="text-center">
                    Employee registration Failed!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showFailDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const step = ref(1)
const showPassword = ref(false)
const showSuccessDialog = ref(false)
const showFailDialog = ref(false)

const employee = ref({
    email: "",
    password: "",
    personal: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        dateOfBirth: "",
        state: "",
        zipCode: "",
        gender: "",
        maritalStatus: "",
        personalEmail: "",
    },
    employment: {
        department: "",
        title: "",
        employeeType: "",
        roleId: "",
        employeeId: "",
        startDate: "",
        endDate: "",
        manager: "",
        dateOfJoining: "",
        probationEndDate: "",
    },
    compensation: {
        basicSalary: "",
        currency: "",
        payFrequency: "",
        bonus: "",
        housingAllowance: "",
        commission: "",
    },
})

// Validation rules
const emailRules = [
    v => !!v || 'Email is required',
    v => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
    v => !!v || 'Password is required',
    v => (v && v.length >= 6) || 'Password must be at least 6 characters',
]

// Options for select fields
const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']
const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed']
const departmentOptions = ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations', 'Engineering']
const employeeTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Intern']
const currencyOptions = ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR']
const payFrequencyOptions = ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Annually']

const submitForm = async () => {
    //attach token to the request
       const token = authStore.token
       const AuthStr = 'Bearer '.concat(token)
    //TODO: Add form validation 
    
    const payload = employee.value
    try {
        const response = await axios.post('http://localhost:3001/api/users/createNew', payload, { headers: { Authorization: AuthStr }})
        if(response.status == 201) {
            showSuccessDialog.value = true
        }
    } catch (error) {
        console.error('Error submitting form:', error)
        showFailDialog.value = true
        return
    }
}
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #8a8a8a; 
  border-radius: 10px; 
}

</style>