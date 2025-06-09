<template>
  <v-container class="">
    <v-row class="mb-4" v-if="!addNewEmp">
      <v-col cols="12" md="4" class="text-center mt-4">
        <v-text-field solo density="compact" variant="solo" hide-details class="rounded-xl"
          prepend-inner-icon="mdi-magnify" v-model="searchedName" placeholder="Search Employee Name" style="
            background: #ffffff;
            border: 0.5px solid #e9ecef;
            opacity: 1;
            border-radius: 8px;
          "></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-row class="pa-0">
          <v-col cols="6">
            <div class="d-flex justify-center">
              <v-col cols="2" md="3" align-self="center">
                <v-icon color="blue-accent-3" size="x-large" icon="mdi-face-man"></v-icon>
              </v-col>
              <v-col cols="10" md="9">
                <h2>60(88%)</h2>
                <span>Male Employees</span>
              </v-col>
            </div>
            <v-divider vertical></v-divider>
          </v-col>
          <v-col cols="6">
            <div class="d-flex">
              <v-col cols="2" md="3" align-self="center">
                <v-icon color="pink-accent-3" size="x-large" icon="mdi-face-woman"></v-icon>
              </v-col>
              <v-col cols="10" md="9">
                <h2>10(18%)</h2>
                <span>Female Employees</span>
              </v-col>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-icon v-bind="props" color="blue-accent-4" size="x-large" @click="addNewEmp = true"
              icon="mdi-account-multiple-plus" class="cursor-pointer mt-4 ml-0" />
          </template>
          <span>Add New Employee</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <div v-if="addNewEmp">
      <addNewEmployee />
    </div>
    <!-- Employee List -->
    <v-row v-else>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 12" :key="i">
          <v-skeleton-loader class="mx-auto border" max-width="365" style="border-radius: 8px;" type="card-avatar, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="employee-card" elevation="2" :ripple="false">
          <!-- Badge -->
          <v-chip :color="employee.badgeColor" class="employee-badge" size="small" variant="flat">
            {{ employee.badge }}
          </v-chip>

          <!-- Avatar -->
          <div class="avatar-container">
            <v-avatar size="80" class="employee-avatar">
              <v-img v-if="employee.avatar" :src="employee.avatar" :alt="employee.name" />
              <v-icon v-else size="40" color="primary">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </div>

          <!-- Employee Details -->
          <v-card-text class="text-center pa-3">
            <h3 class="employee-name text-h6 font-weight-bold mb-2">
              {{ employee.name }}
            </h3>
            <p class="employee-title text-body-2 mb-1">
              {{ employee.title }}
            </p>
            <p class="employee-department text-caption text-medium-emphasis">
              {{ employee.department }} - {{ employee.subDepartment }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import addNewEmployee from "@/components/reusable/addNew.vue";


const searchedName = ref("");
const addNewEmp = ref(false);
const employees = ref([
  {
    id: 1,
    name: 'Adetomiwa Teluwo',
    title: 'Global Expansion Specialist',
    department: 'Administration',
    subDepartment: 'Administration',
    badge: 'UK-USA',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Alesia Lebiadzevich',
    title: 'Assistant Operations Manager',
    department: 'Administration',
    subDepartment: 'Administration',
    badge: 'MAL-DD',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Ali Haidar Haidar',
    title: 'AWS Support',
    department: 'Executive Office',
    subDepartment: 'Executive Office',
    badge: 'DXB-DOS',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Amarjit Singh',
    title: 'AWS Support',
    department: 'Tech',
    subDepartment: 'Tech',
    badge: 'CON-IND',
    badgeColor: 'teal',
    avatar: null // Will show default icon
  },
  {
    id: 5,
    name: 'Ana Jane Crema',
    title: 'Personal Assistant to Co-',
    department: 'Management',
    subDepartment: 'Management',
    badge: 'NDV-005',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Ana Lou Salvador',
    title: 'Operations Analyst',
    department: 'Operations',
    subDepartment: 'Operations',
    badge: 'TT-2',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Anjelica Villarin',
    title: 'Operations Support Specialist',
    department: 'Operations',
    subDepartment: 'Operations',
    badge: 'PHL-015',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Antalia Antalia',
    title: 'AWS Support',
    department: 'Administration',
    subDepartment: 'Administration',
    badge: 'MM-1',
    badgeColor: 'teal',
    avatar: null // Will show default icon
  },
  {
    id: 9,
    name: 'Ayman Qasim',
    title: 'Legal Advisor',
    department: 'Legal',
    subDepartment: 'Legal',
    badge: 'DXB-032',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 10,
    name: 'Bhavik Mehta',
    title: 'Senior Software Engineer',
    department: 'Tech',
    subDepartment: 'Tech',
    badge: 'DXB-046',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 11,
    name: 'Bhavika Fudani',
    title: 'Business Analyst',
    department: 'Product',
    subDepartment: 'Product',
    badge: 'DXB-068',
    badgeColor: 'teal',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 12,
    name: 'Chandramohan Red...',
    title: 'Integration Support Executive',
    department: 'Tech',
    subDepartment: 'Tech',
    badge: 'VSI-004',
    badgeColor: 'teal',
    avatar: null // Will show default icon
  }
])
</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
.custom-search-field {
  background-color: #ffffff;
  border: 0.5px solid #e9ecef;
  opacity: 1;
  border-radius: 8px;
}
.employee-card {
  position: relative;
  height: 280px;
  border-radius: 8px !important;
  background: white;
  transition: all 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.employee-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  font-weight: 600;
  font-size: 11px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  margin-bottom: 16px;
}

.employee-avatar {
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.employee-name {
  color: #1a365d;
  line-height: 1.3;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.employee-title {
  color: #2d3748;
  font-weight: 500;
  min-height: 20px;
}

.employee-department {
  color: #718096;
  font-size: 12px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .employee-card {
    height: 260px;
  }
  
  .avatar-container {
    padding-top: 40px;
  }
}

@media (max-width: 600px) {
  .employee-card {
    height: 240px;
  }
  
  .employee-avatar {
    width: 70px !important;
    height: 70px !important;
  }
  
  .avatar-container {
    padding-top: 35px;
    margin-bottom: 12px;
  }
  
  .employee-name {
    font-size: 1.1rem !important;
    min-height: 40px;
  }
}
</style>
