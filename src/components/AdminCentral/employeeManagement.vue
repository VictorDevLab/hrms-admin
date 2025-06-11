<template>
  <div class="ma-0" v-if="!selectedEmployee">
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
      <v-col cols="12" md="2" class="text-center">
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-icon v-bind="props" color="blue-accent-4" size="40" @click="addNewEmp = true"
              icon="mdi-plus-box" class="cursor-pointer mt-4 ml-0" />
          </template>
          <span>Add New Employee</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <div v-if="addNewEmp">
      <AddNewEmployee @employeeAdded="employeeAdded" @closeEmpForm="closeEmpForm"/>
    </div>
    <!-- Employee List -->
    <v-row v-else>
        <v-col v-if="loadingEmployees" cols="12" sm="6" md="4" lg="3" v-for="i in 12" :key="i">
          <v-skeleton-loader class="mx-auto border" max-width="365" style="border-radius: 8px;" type="card-avatar, actions"></v-skeleton-loader>
        </v-col>
      <v-col v-else v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="employee-card" elevation="2" :ripple="false"  @click="selectEmployee(employee)">
          <!-- Badge -->
          <v-chip color="teal" class="employee-badge" size="small" variant="flat">
            {{ employee.employment?.employeeId }}
          </v-chip>

          <!-- Avatar -->
          <div class="avatar-container">
            <v-avatar size="80" class="employee-avatar">
              <v-img v-if="employee.personal?.image" :src="employee.personal?.image" :alt="employee.personal?.firstName + employee.personal?.lastName" />
              <v-icon v-else size="40" color="primary">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </div>

          <!-- Employee Details -->
          <v-card-text class="text-center pa-3">
            <h3 class="employee-name text-h6 font-weight-bold mb-2">
              {{ employee.personal?.firstName }} {{ employee.personal?.lastName }}
            </h3>
            <p class="employee-title text-body-2 mb-1">
              {{ employee.employment?.title }}
            </p>
            <p class="employee-department text-caption text-medium-emphasis">
              {{ employee.employment?.department }} - dynamic
            </p>
          </v-card-text>
        </v-card>
      </v-col>
        <v-col><h3 v-if="employees.length <=0">No employees Found!</h3></v-col>
    </v-row>
  </div>
  <div v-else>
    <Employment :employee="selectedEmployee" :users="employees" @closeEmpForm="selectedEmployee = null"/>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import AddNewEmployee from "@/components/reusable/addNew.vue";
import Employment from "@/components/AdminCentral/employment.vue"

const authStore = useAuthStore();
const employees = ref([]);
const searchedName = ref("");
const addNewEmp = ref(false);
const loadingEmployees = ref(false);
const selectedEmployee = ref(null);

const getAllEmployees = async () => {
     loadingEmployees.value = true;
     const token = authStore.token
     const AuthStr = 'Bearer '.concat(token)
  try {
      const response = await axios.get('http://localhost:3001/api/users/getAll', { headers: { Authorization: AuthStr }});
      employees.value = response.data; 
  } catch (error) {
    console.error("Error fetching employees:", error);
  } finally {
    loadingEmployees.value = false;
  }
}

const employeeAdded = () => {
   addNewEmp.value = false;
   getAllEmployees();
};
const closeEmpForm = () => {
   addNewEmp.value = false;
};
const selectEmployee = (employee) => {
  selectedEmployee.value = employee;
  console.log("Selected Employee:", selectedEmployee.value);
};

//async mounted
onMounted(async () => {
  await getAllEmployees();
});
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
