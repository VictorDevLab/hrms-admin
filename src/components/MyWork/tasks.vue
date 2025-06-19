<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12" md="7" class="custom-scrollbar">
        <v-data-table :headers="headers" :items="tasks" class="elevation-1 custom-scrollbar" :height="590" fixed-header
          hide-default-footer :items-per-page="-1">
          <!-- Custom header -->
          <template v-slot:top>
            <v-toolbar flat class="bg-white">
              <v-toolbar-title class="text-h6 font-weight-medium">
                All Tasks - Assigned
              </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
          </template>

          <!-- Task title column -->
          <template v-slot:item.title="{ item }" class="py-4">
            <div>
              <div class="font-weight-medium mb-1">{{ item.title }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.dueDate }}</div>
            </div>
          </template>

          <!-- Assignee column -->
          <template v-slot:item.assignedTo="{ item }">
            <v-avatar size="32" :color="item.assignedTo">
                <v-img :src="userImages[item.assignedTo] || '../../assets/default-avatar.jpg'" />
            </v-avatar>
          </template>

          <!-- Priority column -->
          <template v-slot:item.priority="{ item }">
            <v-chip size="small" :color="item.priority === 'HIGH' ? 'red-lighten-4' : 'grey-lighten-2'"
              :text-color="item.priority === 'HIGH' ? 'red-darken-2' : 'grey-darken-2'" variant="flat">
              {{ item.priority }}
            </v-chip>
          </template>

          <!-- Status column -->
          <template v-slot:item.status="{ item }">
            <v-chip size="small" :color="getStatusColor(item.status)" variant="flat">
              {{ item.status }}
            </v-chip>
          </template>
          <!-- action to view/edit-->
          <template v-slot:item.actions="{ item }">
           <div class="d-flex align-center justify-end">
             <v-btn icon @click="editTask(item)" size="small" flat>
              <v-icon color="blue">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteTask(item)" size="small" flat>
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
           </div>
          </template>
        </v-data-table>
      </v-col>

      <!-- Right Sidebar -->
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title class="mb-4 pa-4 d-flex align-center">
            <p>Assigned Tasks</p>
            <v-spacer></v-spacer>
            <v-btn color="primary" icon="mdi-plus" size="x-small" @click="dialog = true"></v-btn>
          </v-card-title>
          <v-card-text class="pa-0">
            <!-- Summary Cards -->
            <v-row class="mb-4 px-4">
              <v-col cols="4" class="text-center pa-1">
                <div class="summary-card pa-3 rounded" style="background: #f8f9ff; border: 2px solid #e3e7ff;">
                  <v-row class="align-center justify-center mb-2">
                    <v-col cols="auto">
                      <v-icon color="blue" class="me-1 mb-3">mdi-calendar-today</v-icon>
                      <span class="text-h4 font-weight-bold text-blue">{{ todaysTasks }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div class="text-caption text-medium-emphasis">Today's Task</div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>

              <v-col cols="4" class="text-center pa-1">
                <div class="summary-card pa-3 rounded" style="background: #f0f4ff;">
                  <v-row class="align-center justify-center mb-2">
                    <v-col cols="auto">
                      <v-icon color="blue" class="me-1 mb-3">mdi-format-list-bulleted</v-icon>
                      <span class="text-h4 font-weight-bold text-blue">{{ allTasks }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div class="text-caption text-medium-emphasis">All Tasks</div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>

              <v-col cols="4" class="text-center pa-1">
                <div class="summary-card pa-3 rounded" style="background: #f0f4ff;">
                  <v-row class="align-center justify-center mb-2">
                    <v-col cols="auto">
                      <v-icon color="blue" class="me-1 mb-3">mdi-plus-circle</v-icon>
                      <span class="text-h4 font-weight-bold text-blue">{{ createdTasks }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div class="text-caption text-medium-emphasis">Created</div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

            <!-- In Progress Section -->
            <v-row class="px-4 pb-4">
              <v-col>
                <v-row class="mb-3">
                  <v-col>
                    <div class="text-subtitle-2">In Progress</div>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    <v-row class="align-center justify-center mb-2">
                      <v-col cols="auto">
                        <v-icon color="blue" class="me-1 mb-4">mdi-format-list-bulleted</v-icon>
                        <span class="text-h3 font-weight-bold text-blue">{{ inProgressTasks
                        }}</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card>
          <v-card-title class="text-h5 pa-6">
            Add New Task
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="task.title" label="Task Title" :rules="titleRules" required
                    variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea v-model="task.description" label="Description" rows="3" variant="outlined"></v-textarea>
                </v-col>

                <v-col cols="12">
                  <p>Who is this task for?</p>
                  <div class="d-flex align-center justify-between">
                    <v-chip :color="self ? 'blue' : 'grey-lighten-1'" @click="self = true">
                      Yourself
                    </v-chip>
                    <div class="ml-2">
                      <v-chip :color="self ? 'grey-lighten-1' : 'blue'" @click="self = false">
                        Someone else
                      </v-chip>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6" v-if="!self">
                  <v-text-field v-model="task.assignedTo" label="Assigned To" variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="task.project" label="Project" variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select v-model="task.priority" :items="priorityOptions" label="Priority"
                    variant="outlined"></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select v-model="task.status" :items="statusOptions" label="Status" variant="outlined"></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="task.dueDate" label="Due Date" type="date" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn color="grey-darken-1" variant="text" @click="closeDialog">
              Cancel
            </v-btn>
            <v-btn color="primary" variant="elevated" :loading="isSubmitting" :disabled="!valid" @click="saveTask(task)">
              {{ editFlag ? 'Edit Task': 'Create Task' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" style="position: absolute; right: 100px; bottom: 2px"
        :timeout="snackbar.timeout" location="bottom">
        {{ snackbar.text }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axiosInstance from '@/axios'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
const authStore = useAuthStore()

const snackbar = ref({
  show: false,
  text: '',
  color: 'error',
  timeout: 5000
})
const showSnackbar = (text, color = 'error') => {
  snackbar.value = {
    show: true,
    text,
    color,
    timeout: 5000
  }
}
const headers = ref(
  [
    { title: 'Task', key: 'title', align: 'start', sortable: true, width: '40%' },
    { title: 'Assigned To', key: 'assignedTo', align: 'center', sortable: false, width: '15%' },
    { title: 'Priority', key: 'priority', align: 'center', sortable: true, width: '20%' },
    { title: 'Status', key: 'status', align: 'center', sortable: true, width: '25%' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]
)
const tasks = ref([])
const dialog = ref(false)
const isSubmitting = ref(false)
const editFlag = ref(false)
const valid = ref(false)
const form = ref(null)
// Computed values for summary cards
const todaysTasks = computed(() => 5)
const allTasks = computed(() => 3)
const createdTasks = computed(() => 2)
const inProgressTasks = computed(() => 2)

const userImages = ref({}) // Cache for user images
const getStatusColor = (status) => {
  switch (status) {
    case 'Created':
      return 'blue-lighten-4'
    case 'In Progress':
      return 'orange-lighten-4'
    case 'Completed':
      return 'green-lighten-4'
    default:
      return 'grey-lighten-2'
  }
}

const task = ref({
  assignedTo: '',
  title: '',
  description: '',
  status: 'Created',
  priority: 'Low',
  dueDate: '',
  project: '',
})

const priorityOptions = ['Low', 'Medium', 'High']

const statusOptions = [
  { title: 'Created', value: 'Created' },
  { title: 'In Progress', value: 'In Progress' },
  { title: 'Completed', value: 'Completed' },
  { title: 'On Hold', value: 'On Hold' }
]
const self = ref(true)
const titleRules = [
  v => !!v || 'Task title is required',
  v => (v && v.length >= 3) || 'Title must be at least 3 characters'
]

// Methods
const saveTask = async (taskToEdit) => {
  console.log(taskToEdit)
  if (valid.value) {
    const newTask = {
      ...taskToEdit,
      assignedTo: self.value ? authStore.userId : task.value.assignedTo,
    }
    isSubmitting.value = true

    try {
      const token = authStore.token
      const AuthStr = 'Bearer '.concat(token)

      if (editFlag.value) {
        // Update existing task
        const response = await axiosInstance.put(`/api/tasks/${taskToEdit._id}`, newTask, {
          headers: { Authorization: AuthStr }
        })
        if (response.status === 200) {
          showSnackbar('Task Updated Successfully', 'teal')
        } else {
          showSnackbar('Error Updating Task')
        }
      } else {
        // Create new task
        const response = await axiosInstance.post('/api/tasks', newTask, {
          headers: { Authorization: AuthStr }
        })
        if (response.status === 201) {
          showSnackbar('Task Created Successfully', 'success')
          tasks.value.push(response.data)
        }
      }

    } catch (error) {
      console.log("Error Creating Task", error)
      showSnackbar('Error Creating Task')
    } finally {
      isSubmitting.value = false
      await getTasks()
    }
    closeDialog()
  }
}
const getTasks = async () => {
  try {
    const token = authStore.token
    const AuthStr = 'Bearer '.concat(token)

    const response = await axiosInstance.get('/api/tasks', { headers: { Authorization: AuthStr } })
    if (response.status === 200) {
      tasks.value = response.data
    }

  } catch (error) {
    console.log("Error Fetching Tasks", error)
  }
}
const editTask = (item) => {
  editFlag.value = true
  task.value = { ...item }
  dialog.value = true
}
const deleteTask = (item) => {
  console.log(item)
}
const getUserImage = async (id) => {
  if (userImages.value[id]) {
    return userImages.value[id] // Return cached image
  }
  
  const token = authStore.token
  const AuthStr = 'Bearer '.concat(token)
  
  try {
    const response = await axiosInstance.get(`/api/users/${id}`, { 
      headers: { Authorization: AuthStr } 
    })
    userImages.value[id] = response.data.personal.image
    console.log('User Image:', userImages.value[id])
    return userImages.value[id]
  } catch (error) {
    console.error('Error getting User Details:', error)
    userImages.value[id] = '../../assets/default-avatar.jpg'
    return userImages.value[id]
  }
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const resetForm = () => {
  task.value = {
    assignedTo: '',
    title: '',
    description: '',
    status: 'Created',
    priority: 'Low',
    dueDate: '',
    project: '',
  }

  if (form.value) {
    form.value.resetValidation()
  }
}

// Reset form when dialog closes
watch(dialog, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})

onMounted(async () => {
  await getTasks()
    tasks.value.forEach(item => {
    getUserImage(item.assignedTo)
  })
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.hover-bg:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.summary-card {
  transition: all 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>