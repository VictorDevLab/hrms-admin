<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-6">
                    <!-- Header -->
                    <div class="d-flex justify-space-between align-center mb-6">
                        <h6 class="text-h6">Create Training Session</h6>
                        <div class="d-flex gap-3">
                            <v-btn variant="outlined" color="error" @click="$emit('discard-form')">
                                Discard
                            </v-btn>
                            <v-btn color="primary" @click="saveAndContinue">
                                Save & Continue
                            </v-btn>
                        </div>
                    </div>

                    <!-- Tab Navigation -->
                    <!-- <v-tabs v-model="currentTab" class="mb-6">
                        <v-tab value="training-details" class="text-primary font-weight-bold">
                            Training Details
                        </v-tab>
                        <v-tab value="resources" disabled class="text-grey">
                            Resources
                        </v-tab>
                        <v-tab value="configuration" disabled class="text-grey">
                            Configuration
                        </v-tab>
                        <v-tab value="emails" disabled class="text-grey">
                            Emails
                        </v-tab>
                    </v-tabs> -->

                    <!-- Training Details Form -->
                    <v-form ref="form" v-model="formValid">
                        <v-row>
                            <!-- Training Programs -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Training Programs <span class="text-error">*</span>
                                </v-label>
                                <v-select v-model="formData.trainingProgram" :items="trainingPrograms"
                                    placeholder="Training Program" variant="outlined" :rules="requiredRules" density="comfortable"></v-select>
                            </v-col>

                            <!-- Training Session Title -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Training Session Title <span class="text-error">*</span>
                                </v-label>
                                <v-text-field v-model="formData.sessionTitle" placeholder="Session Title"
                                    variant="outlined" :rules="requiredRules" density="comfortable"></v-text-field>
                            </v-col>

                            <!-- Method of Training -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Method of Training <span class="text-error">*</span>
                                </v-label>
                                <v-select v-model="formData.methodOfTraining" :items="trainingMethods"
                                    placeholder="Internal" variant="outlined" :rules="requiredRules" density="comfortable"></v-select>
                            </v-col>

                            <!-- Trainer -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Trainer <span class="text-error">*</span>
                                </v-label>
                                <v-select v-model="formData.trainer" :items="trainers" placeholder="Company Employees"
                                    variant="outlined" :rules="requiredRules" density="comfortable"></v-select>
                            </v-col>

                            <!-- Organizer -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Organizer <span class="text-error">*</span>
                                </v-label>
                                <v-select v-model="formData.organizer" :items="organizers"
                                    placeholder="Select organizer" variant="outlined" :rules="requiredRules" density="comfortable"></v-select>
                            </v-col>

                            <!-- Organizer Contact -->
                            <v-col cols="12" md="4">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Organizer Contact <span class="text-error">*</span>
                                </v-label>
                                <div class="d-flex">
                                    <v-select v-model="formData.countryCode" :items="countryCodes" variant="outlined" density="comfortable"
                                        style="max-width: 120px;" class="mr-2">
                                        <template v-slot:selection="{ item }">
                                            <div class="d-flex align-center">
                                                <img :src="item.raw.flag" width="16" class="mr-1">
                                                {{ item.raw.code }}
                                            </div>
                                        </template>
                                        <template v-slot:item="{ item, props }">
                                            <v-list-item v-bind="props">
                                                <template v-slot:prepend>
                                                    <img :src="item.raw.flag" width="16" class="mr-2">
                                                </template>
                                                <v-list-item-title>{{ item.raw.code }}</v-list-item-title>
                                            </v-list-item>
                                        </template>
                                    </v-select>
                                    <v-text-field v-model="formData.phoneNumber" placeholder="Phone number"
                                        variant="outlined" class="flex-grow-1" :rules="requiredRules" density="comfortable"></v-text-field>
                                </div>
                            </v-col>

                            <!-- Mode of Session -->
                            <v-col cols="12" md="6">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Mode of Session <span class="text-error">*</span>
                                </v-label>
                                <v-select v-model="formData.modeOfSession" :items="sessionModes"
                                    placeholder="Mode of Session" variant="outlined" :rules="requiredRules" density="comfortable"></v-select>
                            </v-col>

                            <!-- Select Platform -->
                            <v-col cols="12" md="6">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Select Platform
                                </v-label>
                                <v-select v-model="formData.platform" :items="platforms" placeholder="Select Platform"
                                    variant="outlined" density="comfortable"></v-select>
                            </v-col>

                            <!-- Notes -->
                            <v-col cols="12" md="6">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Notes <span class="text-error">*</span>
                                </v-label>
                                <v-textarea v-model="formData.notes" placeholder="Add Notes" variant="outlined" rows="4"
                                    :rules="requiredRules" density="comfortable"></v-textarea>
                            </v-col>

                            <!-- Session Details -->
                            <v-col cols="12" md="6">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Session Details <span class="text-error">*</span>
                                </v-label>
                                <v-textarea v-model="formData.sessionDetails" placeholder="Details of the session"
                                    variant="outlined" rows="4" :rules="requiredRules" density="comfortable"></v-textarea>
                            </v-col>

                            <!-- Start Date -->
                            <v-col cols="12">
                                <v-label class="text-body-2 font-weight-medium mb-2">
                                    Start Date
                                </v-label>
                                <div class="d-flex align-center gap-4">
                                    <div style="min-width: 200px;">
                                        <v-text-field v-model="formData.startDate" variant="outlined"
                                            placeholder="2025-06-20" append-inner-icon="mdi-calendar" readonly
                                            @click:append-inner="showDatePicker = true" density="comfortable"></v-text-field>
                                    </div>

                                    <div style="min-width: 150px;">
                                        <v-select v-model="formData.startTime" :items="timeSlots"
                                            placeholder="Start Time" variant="outlined" density="comfortable"></v-select>
                                    </div>

                                    <div style="min-width: 150px;">
                                        <v-select v-model="formData.endTime" :items="timeSlots" placeholder="End Time"
                                            variant="outlined" density="comfortable"></v-select>
                                    </div>

                                    <div class="text-body-2 text-grey">
                                        Hours: {{ calculatedHours }}
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>

                    <!-- Date Picker Dialog -->
                    <v-dialog v-model="showDatePicker" width="auto">
                        <v-card>
                            <v-card-text>
                                <v-date-picker v-model="selectedDate" @update:model-value="updateDate"></v-date-picker>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['discard-form'])
// Form state
const currentTab = ref('training-details')
const formValid = ref(false)
const showDatePicker = ref(false)
const selectedDate = ref(new Date())

// Form data
const formData = ref({
    trainingProgram: '',
    sessionTitle: '',
    methodOfTraining: 'Internal',
    trainer: '',
    organizer: '',
    countryCode: '+971',
    phoneNumber: '',
    modeOfSession: '',
    platform: '',
    notes: '',
    sessionDetails: '',
    startDate: '2025-06-20',
    startTime: '',
    endTime: ''
})

// Validation rules
const requiredRules = [
    v => !!v || 'This field is required'
]

// Form options
const trainingPrograms = [
    'AI and Machine Learning',
    'Azure Security & Compliance Fundamentals',
    'Cloud Pentesting Bootcamp',
    'Customer Service',
    'Digital Marketing',
    'Cybersecurity'
]

const trainingMethods = [
    'Internal',
    'External'
]

const trainers = [
    'Company Employees',
    'External Trainer',
    'Third Party'
]

const organizers = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Wilson'
]

const countryCodes = [
    { code: '+971', flag: 'https://flagcdn.com/16x12/ae.png' },
    { code: '+1', flag: 'https://flagcdn.com/16x12/us.png' },
    { code: '+44', flag: 'https://flagcdn.com/16x12/gb.png' },
    { code: '+254', flag: 'https://flagcdn.com/16x12/ke.png' }
]

const sessionModes = [
    'Online',
    'Offline',
    'Hybrid'
]

const platforms = [
    'Zoom',
    'Microsoft Teams',
    'Google Meet',
    'WebEx',
    'In-Person'
]

const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

// Computed properties
const calculatedHours = computed(() => {
    if (!formData.value.startTime || !formData.value.endTime) {
        return '0 hrs 0 minutes'
    }

    const start = new Date(`2000-01-01 ${formData.value.startTime}:00`)
    const end = new Date(`2000-01-01 ${formData.value.endTime}:00`)

    if (end <= start) {
        end.setDate(end.getDate() + 1)
    }

    const diff = end - start
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} hrs ${minutes} minutes`
})

// Methods
const updateDate = (date) => {
    if (date) {
        formData.value.startDate = date.toISOString().split('T')[0]
        showDatePicker.value = false
    }
}

const discardForm = () => {
    // Reset form or navigate back
    Object.keys(formData.value).forEach(key => {
        if (key === 'methodOfTraining') {
            formData.value[key] = 'Internal'
        } else if (key === 'countryCode') {
            formData.value[key] = '+971'
        } else if (key === 'startDate') {
            formData.value[key] = '2025-06-20'
        } else {
            formData.value[key] = ''
        }
    })
}

const saveAndContinue = () => {
    // Validate form and save
    if (formValid.value) {
        console.log('Form data:', formData.value)
        // Handle form submission
    }
}
</script>

<style scoped>
.v-label {
    display: block;
    margin-bottom: 8px;
}

.gap-3 {
    gap: 12px;
}

.gap-4 {
    gap: 16px;
}
</style>