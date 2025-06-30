<template>
  <v-container fluid class="pa-4">
    <!-- Top Statistics Row -->
    <v-row class="mb-6">
      <v-col cols="12" md="2">
        <v-card class="pa-4 text-center" elevation="2">
          <div class="text-h4 font-weight-bold">{{ totalEmployees }}</div>
          <div class="text-subtitle-2 text-medium-emphasis">Total Employees</div>
          <div class="text-caption text-success d-flex align-center justify-center mt-1">
            <v-icon size="small" class="me-1">mdi-trending-up</v-icon>
            0 New employees
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="pa-4 text-center" elevation="2">
          <div class="text-h4 font-weight-bold">{{ turnoverRate }}%</div>
          <div class="text-subtitle-2 text-medium-emphasis">Turnover Rate</div>
          <div class="text-caption text-success d-flex align-center justify-center mt-1">
            <v-icon size="small" class="me-1">mdi-trending-down</v-icon>
            0.00% than last month
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="pa-4 text-center" elevation="2">
          <div class="text-h4 font-weight-bold">{{ exitedEmployees }}</div>
          <div class="text-subtitle-2 text-medium-emphasis">Exited Employees</div>
          <div class="text-caption text-success d-flex align-center justify-center mt-1">
            <v-icon size="small" class="me-1">mdi-trending-down</v-icon>
            0.00% than last month
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <div class="d-flex align-center justify-center mb-2">
            <v-icon color="blue" class="me-2">mdi-account</v-icon>
            <span class="text-h5 font-weight-bold">{{ maleEmployees }} ({{ malePercentage }}%)</span>
          </div>
          <div class="text-subtitle-2 text-medium-emphasis">Male Employees</div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <div class="d-flex align-center justify-center mb-2">
            <v-icon color="pink" class="me-2">mdi-account-outline</v-icon>
            <span class="text-h5 font-weight-bold">{{ femaleEmployees }} ({{ femalePercentage }}%)</span>
          </div>
          <div class="text-subtitle-2 text-medium-emphasis">Female Employees</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Middle Row - Department Distribution and Absence Statistics -->
    <v-row class="mb-6">
      <v-col cols="12" lg="8">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">mdi-office-building</v-icon>
            Department Distribution
          </v-card-title>
          <v-card-text>
            <canvas ref="departmentChart" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="4">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">mdi-calendar-remove</v-icon>
            Absence Statistic
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-caption">Medical Leave</span>
              <span class="text-caption">Unpaid Leave</span>
              <span class="text-caption">Compassionate Leave</span>
            </div>
            <canvas ref="absenceChart" style="max-height: 234px !important;" height="234"></canvas>
            <div class="mt-4">
              <div class="text-center text-caption">Week 1 - Week 4</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Bottom Row - Document Expiry and Self Service Request -->
    <v-row>
      <v-col cols="12" lg="6">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">mdi-file-document-alert</v-icon>
            Document Expiry
          </v-card-title>
          <v-card-text>
            <canvas ref="documentChart" height="250"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="6">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">mdi-account-cog</v-icon>
            Self Service Request
          </v-card-title>
          <v-card-text>
            <canvas ref="selfServiceChart" height="250"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// Reactive data
const totalEmployees = ref(108)
const turnoverRate = ref(0.00)
const exitedEmployees = ref(0)
const maleEmployees = ref(40)
const malePercentage = ref(37.04)
const femaleEmployees = ref(56)
const femalePercentage = ref(51.85)

// Chart refs
const departmentChart = ref(null)
const absenceChart = ref(null)
const documentChart = ref(null)
const selfServiceChart = ref(null)

// Department data
const departmentData = {
  labels: [
    'Accounting Dept', 'IT Dept', 'New Applicant', 'HR Dept', 'Purchase Dept',
    'Research & Development', 'Management', 'Sales Dept', 'Engineering Dept',
    'Supply Chain Mgmt', 'Early Childhood', 'Production Dept', 'Customer Service',
    'Human Resources', 'Clinical Quality', 'Marketing', 'Finance', 'Operations',
    'Customer Success', 'Research & Development', 'Quality Assurance'
  ],
  values: [250, 300, 400, 200, 350, 450, 280, 320, 380, 150, 500, 600, 220, 180, 340, 420, 360, 240, 480, 160, 300],
  male: [120, 180, 200, 80, 200, 250, 150, 180, 220, 80, 250, 350, 100, 90, 180, 220, 200, 120, 240, 90, 150],
  female: [130, 120, 200, 120, 150, 200, 130, 140, 160, 70, 250, 250, 120, 90, 160, 200, 160, 120, 240, 70, 150]
}

// Absence data
const absenceData = {
  weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  medical: [0.2, 0.1, 0.15, 0.25],
  unpaid: [0.1, 0.05, 0.08, 0.12],
  compassionate: [0.05, 0.02, 0.03, 0.06]
}

// Document expiry data
const documentExpiryData = {
  labels: ['Passport', 'National ID', 'Visa', 'Insurance'],
  values: [5, 0, 6, 0]
}

// Self service request data
const selfServiceData = {
  labels: ['Letters', 'Claims', 'Leave', 'Attendance', 'WFH'],
  values: [15, 35, 40, 5, 5],
  colors: ['#3F51B5', '#E91E63', '#FF9800', '#4CAF50', '#FFC107']
}

const createDepartmentChart = () => {
  if (!departmentChart.value) return
  
  new Chart(departmentChart.value, {
    type: 'bar',
    data: {
      labels: departmentData.labels,
      datasets: [
        {
          label: 'Average Contract Tenure',
          data: departmentData.values,
          backgroundColor: '#FFC107',
          borderColor: '#FF8F00',
          borderWidth: 1,
          type: 'line',
          yAxisID: 'y1'
        },
        {
          label: 'Male',
          data: departmentData.male,
          backgroundColor: '#2196F3',
          barThickness: 8
        },
        {
          label: 'Female',
          data: departmentData.female,
          backgroundColor: '#E91E63',
          barThickness: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            font: {
              size: 10
            }
          }
        },
        y: {
          beginAtZero: true,
          position: 'left'
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  })
}

const createAbsenceChart = () => {
  if (!absenceChart.value) return
  
  new Chart(absenceChart.value, {
    type: 'line',
    data: {
      labels: absenceData.weeks,
      datasets: [
        {
          label: 'Medical Leave',
          data: absenceData.medical,
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          tension: 0.4
        },
        {
          label: 'Unpaid Leave',
          data: absenceData.unpaid,
          borderColor: '#795548',
          backgroundColor: 'rgba(121, 85, 72, 0.1)',
          tension: 0.4
        },
        {
          label: 'Compassionate Leave',
          data: absenceData.compassionate,
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 1
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

const createDocumentChart = () => {
  if (!documentChart.value) return
  
  new Chart(documentChart.value, {
    type: 'bar',
    data: {
      labels: documentExpiryData.labels,
      datasets: [{
        data: documentExpiryData.values,
        backgroundColor: ['#26C6DA', '#66BB6A', '#9CCC65', '#42A5F5'],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 8
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

const createSelfServiceChart = () => {
  if (!selfServiceChart.value) return
  
  new Chart(selfServiceChart.value, {
    type: 'doughnut',
    data: {
      labels: selfServiceData.labels,
      datasets: [{
        data: selfServiceData.values,
        backgroundColor: selfServiceData.colors,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

onMounted(async () => {
  await nextTick()
  createDepartmentChart()
  createAbsenceChart()
  createDocumentChart()
  createSelfServiceChart()
})
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.text-success {
  color: #4CAF50 !important;
}
</style>