<template>
    <v-container class="">
        <v-card>
            <v-stepper v-model="step" alt-labels class="custom-scrollbar"
                style="min-height: 600px; max-height: 600px; overflow-y: scroll;">
                <div class="d-flex justify-center align-center pa-0 ma-0">
                    <v-stepper-item :complete="step > 1" :value="1" title="Personal"
                        icon="mdi-account"></v-stepper-item>

                    <v-divider></v-divider>

                    <v-stepper-item :complete="step > 2" :value="2" title="Employment"
                        icon="mdi-briefcase"></v-stepper-item>

                    <v-divider></v-divider>
                    <v-stepper-item :complete="step > 3" :value="3" title="Leaves"
                        icon="mdi-briefcase"></v-stepper-item>

                    <v-divider></v-divider>

                    <v-stepper-item :complete="step > 4" :value="4" title="Compensation"
                        icon="mdi-currency-usd"></v-stepper-item>
                        <div class="mr-5 mb-8">
                            <v-btn variant="outlined" size="small" color="red" @click="$emit('closeEmpForm')">
                                close
                            </v-btn>
                        </div>
                </div>
                <v-divider></v-divider>

                <v-stepper-window>

                    <!-- Step 2: Personal Information -->
                    <v-stepper-window-item :value="1">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.firstName" label="First Name"
                                        prepend-inner-icon="mdi-account" variant="underlined" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.lastName" label="Last Name"
                                        variant="underlined" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.phone" label="Phone Number"
                                        prepend-inner-icon="mdi-phone" variant="underlined"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.personalEmail" label="Personal Email"
                                        type="email" prepend-inner-icon="mdi-email-outline"  variant="underlined"></v-text-field>
                                </v-col> -->
                                <v-col cols="4">
                                    <v-text-field v-model="employee.personal.address" label="Address"
                                        prepend-inner-icon="mdi-home" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="d-flex align-center">
                                    <v-btn color="green" class="mt-3" @click="openUploadModal" :loading="uploading"
                                        variant="outlined"><v-icon left>mdi-cloud-upload</v-icon> Upload Image</v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field v-model="employee.personal.image" label="Image" prepend-inner-icon=""
                                        disabled variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.state" label="State"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.city" label="City"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.zipCode" label="Zip Code"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.personal.dateOfBirth" label="Date of Birth"
                                        type="date" prepend-inner-icon="mdi-calendar"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.personal.gender" label="Gender" :items="genderOptions"
                                        prepend-inner-icon="mdi-human-male-female" variant="underlined"></v-select>
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
                                        prepend-inner-icon="mdi-briefcase" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.employment.employeeType" label="Employee Type"
                                        :items="employeeTypeOptions" variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.roleId" label="Role ID"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.email" label="Email Address" type="email"
                                        prepend-inner-icon="mdi-email" variant="underlined" :rules="emailRules"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.password" label="Password"
                                        :type="showPassword ? 'text' : 'password'"
                                        :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:prepend="showPassword = !showPassword" variant="underlined"
                                        :rules="passwordRules" required></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.employeeId" label="Employee ID"
                                        prepend-inner-icon="mdi-badge-account" variant="underlined"></v-text-field>
                                </v-col> -->
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.manager" label="Manager"
                                        prepend-inner-icon="mdi-account-supervisor" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.dateOfJoining" label="Date of Joining"
                                        type="date" prepend-inner-icon="mdi-calendar-plus"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.startDate" label="Start Date" type="date"
                                        prepend-inner-icon="mdi-calendar-start" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.endDate" label="End Date" type="date"
                                        prepend-inner-icon="mdi-calendar-end" variant="underlined"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.employment.probationEndDate"
                                        label="Probation End Date" type="date" prepend-inner-icon="mdi-calendar-clock"
                                        variant="underlined"></v-text-field>
                                </v-col> -->
                            </v-row>
                        </v-card-text>
                    </v-stepper-window-item>
                    <!-- Step 3: Leaves -->
                    <v-stepper-window-item :value="3">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.annualLeaves" label="Annual Leaves"
                                        type="number" prepend-inner-icon="mdi-calendar-star"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.sickLeaves" label="Sick Leaves" type="number"
                                        prepend-inner-icon="mdi-calendar-heart" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.maternityLeaves" label="Maternity Leaves"
                                        type="number" prepend-inner-icon="mdi-baby-bottle"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.paternityLeaves" label="Paternity Leaves"
                                        type="number" prepend-inner-icon="mdi-baby-face"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.emergencyLeaves" label="Emergency Leaves"
                                        type="number" prepend-inner-icon="mdi-alert-circle"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.compassionateLeaves"
                                        label="Compassionate Leaves" type="number"
                                        prepend-inner-icon="mdi-heart-multiple" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.leaves.studyLeaves" label="Study Leaves"
                                        type="number" prepend-inner-icon="mdi-school-outline"
                                        variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>

                    </v-stepper-window-item>

                    <!-- Step 4: Compensation -->
                    <v-stepper-window-item :value="4">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.basicSalary" label="Basic Salary"
                                        type="number" prepend-inner-icon="mdi-currency-usd"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.compensation.currency" label="Currency"
                                        :items="currencyOptions" prepend-inner-icon="mdi-cash"
                                        variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select v-model="employee.compensation.payFrequency" label="Pay Frequency"
                                        :items="payFrequencyOptions" prepend-inner-icon="mdi-calendar-clock"
                                        variant="underlined"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.bonus" label="Bonus" type="number"
                                        prepend-inner-icon="mdi-gift" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.housingAllowance"
                                        label="Housing Allowance" type="number" prepend-inner-icon="mdi-home-city"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.commission" label="Commission"
                                        type="number" prepend-inner-icon="mdi-percent"
                                        variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <p class="font-weight-bold ml-2" style="font-size: 16px;">Banking Details</p>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.bankName" label="Bank Name"
                                        prepend-inner-icon="mdi-briefcase" icon-color="green-darken-1"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.bankAddress" label="Bank Address"
                                        prepend-inner-icon="mdi-briefcase" variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="employee.compensation.accountNumber" label="Account Number"
                                        type="number" prepend-inner-icon="mdi-percent"
                                        variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-stepper-window-item>
                </v-stepper-window>

                <v-card-actions class="pa-4">
                    <v-btn v-if="step > 1" @click="step--" variant="tonal" prepend-inner-icon="mdi-chevron-left">
                        Previous
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn v-if="step < 4" @click="step++" color="primary" variant="tonal"
                        prepend-inner-icon="mdi-chevron-right">
                        Next
                    </v-btn>

                    <v-btn v-if="step === 4" @click="submitForm" color="success" variant="tonal"
                        prepend-inner-icon="mdi-check">
                        Submit
                    </v-btn>
                </v-card-actions>

                <!-- image upload modal -->
                <v-dialog v-model="imageUploadDialog" max-width="600" persistent>
                    <v-card>
                        <v-card-title>Crop Image</v-card-title>
                        <v-card-text>
                            <div class="cropper-area">
                                <vue-cropper ref="cropper" :src="localImage" :aspect-ratio="1" :view-mode="2"
                                    :auto-crop-area="0.7" :background="false" />
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey" text @click="dialog = false">
                                Cancel
                            </v-btn>
                            <v-btn color="primary" :loading="uploading" @click="uploadImage">
                                Upload
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                    <v-icon color="red" size="large" class="mr-2">mdi-close-circle-outline</v-icon>
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
import VueCropper from 'vue-cropperjs';
import 'vue-cropperjs/node_modules/cropperjs/dist/cropper.css';

const emit = defineEmits(['employeeAdded', 'closeEmpForm']);
// Cloudinary configuration
const cloudinaryCloudName = 'dorfdxszi';
const cloudinaryUploadPreset = 'preset-vic';

const imageUploadDialog = ref(false);
const localImage = ref('');
const uploading = ref(false);
const cropper = ref(null);

const authStore = useAuthStore()
const step = ref(1)
const showPassword = ref(false)
const showSuccessDialog = ref(false)
const showFailDialog = ref(false)

const employee = ref({
    email: "",
    password: "Welcome@123",
    personal: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        image: "",
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
    leaves: {
        annualLeaves: 0,
        sickLeaves: 0,
        maternityLeaves: 0,
        paternityLeaves: 0,
        emergencyLeaves: 0,
        compassionateLeaves: 0,
        studyLeaves: 0,
    },
    compensation: {
        basicSalary: "",
        currency: "",
        payFrequency: "",
        bonus: "",
        housingAllowance: "",
        commission: "",
        bankName: "",
        accountNumber: "",
        bankAddress: "",
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
           setTimeout(() => {
            showSuccessDialog.value = true
              }, 3000)
        }
        emit('employeeAdded', response.data) 
    } catch (error) {
        console.error('Error submitting form:', error)
        showFailDialog.value = true
        return
    }
}

const openUploadModal = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localImage.value = e.target.result;
        imageUploadDialog.value = true;
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

const uploadImage = async () => {
  uploading.value = true;
  try {
    // Get cropped image
    const canvas = cropper.value.getCroppedCanvas();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', cloudinaryUploadPreset);

    // Upload to Cloudinary
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      formData
    );
    employee.value.personal.image = response.data.secure_url;
    imageUploadDialog.value = false;
    localImage.value = '';
  } catch (error) {
    console.error('Upload failed:', error);
    // Handle error (e.g., show error message to user)
  } finally {
    uploading.value = false;
  }
};
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #8a8a8a; 
  border-radius: 10px; 
}
.cropper-area {
  max-height: 400px;
  overflow: hidden;
}
</style>