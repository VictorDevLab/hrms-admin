<template>
    <v-container fluid class="pa-6">
        <v-row>
            <!-- FAQ Section -->
            <v-col cols="12" md="5" lg="4">
                <v-card class="h-100">
                    <v-card-title class="text-h6 pb-4">
                        FAQs
                    </v-card-title>
                    <v-card-text class="pa-0">
                        <v-expansion-panels variant="accordion" class="elevation-0">
                            <v-expansion-panel v-for="(faq, index) in faqs" :key="index" class="border-b">
                                <v-expansion-panel-title class="text-body-1 font-weight-medium">
                                    {{ faq.question }}
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    {{ faq.answer }}
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Tickets and Support Section -->
            <v-col cols="12" md="7" lg="8">
                <div class="d-flex flex-column h-100">
                    <!-- Tickets Summary -->
                    <v-card class="mb-6">
                        <v-card-title class="d-flex justify-space-between align-center">
                            <span class="text-h6">Tickets Summary</span>
                            <v-btn color="primary" variant="flat" size="small">
                                VIEW TICKETS
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <v-card variant="outlined" class="text-center pa-4"
                                        style="border-left: 4px solid #f44336;">
                                        <div class="text-caption text-medium-emphasis mb-1">New Tickets</div>
                                        <div class="text-h4 font-weight-bold">{{ ticketStats.new }}</div>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card variant="outlined" class="text-center pa-4"
                                        style="border-left: 4px solid #ff9800;">
                                        <div class="text-caption text-medium-emphasis mb-1">In Progress</div>
                                        <div class="text-h4 font-weight-bold">{{ ticketStats.inProgress }}</div>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card variant="outlined" class="text-center pa-4"
                                        style="border-left: 4px solid #4caf50;">
                                        <div class="text-caption text-medium-emphasis mb-1">Completed</div>
                                        <div class="text-h4 font-weight-bold">{{ ticketStats.completed }}</div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- Raise a Ticket Section -->
                    <v-card class="flex-grow-1">
                        <v-card-title class="d-flex align-center">
                            <span class="text-h6 text-primary">Raise a ticket</span>
                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-phone" variant="text" size="small" class="mr-2"></v-btn>
                            <v-btn icon="mdi-email" variant="text" size="small" class="mr-2"></v-btn>
                            <v-btn icon="mdi-help-circle" variant="text" size="small"></v-btn>
                        </v-card-title>
                        <v-card-subtitle class="pb-4">
                            Submit a HRMS Support Request
                        </v-card-subtitle>
                        <v-card-text>
                            <v-form ref="ticketForm" v-model="formValid">
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-select v-model="ticketForm.module" :items="modules" label="Select a module"
                                            variant="outlined" density="comfortable"
                                            :rules="[v => !!v || 'Module is required']"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-select v-model="ticketForm.subModule" :items="subModules"
                                            label="Select a sub-module (if any)" variant="outlined"
                                            density="comfortable" :disabled="!ticketForm.module"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-select v-model="ticketForm.issueType" :items="issueTypes"
                                            label="Select an issue type" variant="outlined" density="comfortable"
                                            :rules="[v => !!v || 'Issue type is required']"></v-select>
                                    </v-col>
                                </v-row>

                                <v-text-field v-model="ticketForm.subject" label="Enter the subject of your request"
                                    variant="outlined" density="comfortable" class="mb-4"
                                    :rules="[v => !!v || 'Subject is required']"></v-text-field>

                                <v-textarea v-model="ticketForm.description" label="Describe your issue in detail"
                                    variant="outlined" rows="2" class="mb-4"
                                    :rules="[v => !!v || 'Description is required']"></v-textarea>

                                <div class="d-flex align-center justify-space-between">
                                    <div class="d-flex align-center">
                                        <v-icon class="mr-2" size="small">mdi-attachment</v-icon>
                                        <span class="text-body-2 text-medium-emphasis">Attach file(s)</span>
                                        <v-file-input v-model="ticketForm.attachments" multiple variant="plain"
                                            density="compact" class="ml-2" style="max-width: 200px;"></v-file-input>
                                    </div>
                                    <v-btn color="primary" variant="flat" size="large" :disabled="!formValid"
                                        @click="submitTicket">
                                        SUBMIT TICKET
                                    </v-btn>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const formValid = ref(false)
const ticketForm = ref({
    module: '',
    subModule: '',
    issueType: '',
    subject: '',
    description: '',
    attachments: []
})

const ticketStats = ref({
    new: 6,
    inProgress: 0,
    completed: 0
})

// FAQ
const faqs = ref([
    {
        question: 'What is an HRMS?',
        answer: 'HRMS stands for Human Resource Management System. It is a comprehensive software solution that helps organizations manage their human resources processes, including employee data, payroll, benefits, recruitment, and performance management.'
    },
    {
        question: 'Why do companies use HRMS?',
        answer: 'Companies use HRMS to streamline HR processes, reduce manual work, improve data accuracy, ensure compliance with regulations, and provide better employee experiences through self-service capabilities.'
    },
    {
        question: 'How does an HRMS improve efficiency?',
        answer: 'HRMS improves efficiency by automating routine tasks, centralizing employee data, reducing paperwork, enabling self-service for employees, and providing analytics for better decision-making.'
    },
    {
        question: 'What types of HRMS modules are available?',
        answer: 'Common HRMS modules include Employee Management, Payroll, Time & Attendance, Leave Management, Performance Management, Recruitment, Training & Development, and Benefits Administration.'
    },
    {
        question: 'How can employees update their personal information?',
        answer: 'Employees can update their personal information through the employee self-service portal by logging in with their credentials and accessing the personal information section.'
    },
    // {
    //     question: 'Can employees view their pay slips online?',
    //     answer: 'Yes, employees can view and download their pay slips through the employee portal under the payroll or compensation section.'
    // },
    {
        question: 'How do employees apply for leave?',
        answer: 'Employees can apply for leave through the self-service portal by selecting the leave type, dates, and submitting the request for manager approval.'
    },
    {
        question: 'Can employees track their attendance?',
        answer: 'Yes, employees can view their attendance records, including clock-in/out times, total hours worked, and attendance summary through the system.'
    },
    {
        question: 'How can managers approve leave requests?',
        answer: 'Managers can approve or reject leave requests through their dashboard, where they can view pending requests and take appropriate actions.'
    },
    {
        question: 'How is payroll processed in an HRMS?',
        answer: 'Payroll is processed automatically based on employee attendance, salary structures, deductions, and tax calculations. The system generates pay slips and handles statutory compliances.'
    },
    {
        question: 'Can HRMS integrate with other systems?',
        answer: 'Yes, modern HRMS solutions can integrate with various systems like accounting software, time tracking devices, email systems, and third-party applications through APIs.'
    },
    // {
    //     question: 'How secure is employee data in an HRMS?',
    //     answer: 'HRMS systems implement multiple security measures including data encryption, access controls, audit trails, regular backups, and compliance with data protection regulations.'
    // },
    // {
    //     question: 'What kind of support is available for HRMS users?',
    //     answer: 'HRMS users typically have access to technical support, user manuals, training materials, help desk services, and regular system updates and maintenance.'
    // }
])

// Form options
const modules = ref([
    'Employee Management',
    'Payroll',
    'Time & Attendance',
    'Leave Management',
    'Performance Management',
    'Recruitment',
    'Training & Development',
    'Benefits Administration'
])

const subModules = computed(() => {
    if (!ticketForm.value.module) return []

    const subModuleMap = {
        'Employee Management': ['Personal Information', 'Job Details', 'Documents', 'Emergency Contacts'],
        'Payroll': ['Salary Structure', 'Pay Slips', 'Tax Calculations', 'Deductions'],
        'Time & Attendance': ['Clock In/Out', 'Overtime', 'Shifts', 'Time Tracking'],
        'Leave Management': ['Leave Application', 'Leave Balance', 'Leave Approval', 'Holiday Calendar'],
        'Performance Management': ['Goals', 'Reviews', 'Feedback', 'Appraisals'],
        'Recruitment': ['Job Postings', 'Applications', 'Interviews', 'Onboarding'],
        'Training & Development': ['Training Programs', 'Certifications', 'Skills', 'Learning Paths'],
        'Benefits Administration': ['Health Insurance', 'Retirement Plans', 'Employee Benefits', 'Claims']
    }

    return subModuleMap[ticketForm.value.module] || []
})

const issueTypes = ref([
    'Bug Report',
    'Feature Request',
    'Access Issue',
    'Data Error',
    'System Performance',
    'Training Request',
    'Integration Issue',
    'Other'
])

// Methods
const submitTicket = () => {
    if (formValid.value) {
        console.log('Submitting ticket:', ticketForm.value)
        // TODO: Create api forr support module
        alert('Ticket submitted successfully!')
        resetForm()
    }
}

const resetForm = () => {
    ticketForm.value = {
        module: '',
        subModule: '',
        issueType: '',
        subject: '',
        description: '',
        attachments: []
    }
}
</script>

<style scoped>
.border-b {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.border-b:last-child {
    border-bottom: none;
}
</style>