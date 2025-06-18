<template>
    <v-container fluid class="pa-6">
        <v-row>
            <v-col cols="12" md="7" class="custom-scrollbar"> 
                <v-data-table :headers="headers" :items="tasks" class="elevation-1 custom-scrollbar" :height="590"
                    fixed-header hide-default-footer :items-per-page="-1">
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
                            <div class="text-caption text-medium-emphasis">{{ item.date }}</div>
                        </div>
                    </template>

                    <!-- Assignee column -->
                    <template v-slot:item.assignee="{ item }">
                        <v-avatar size="32" :color="item.assignee.color">
                            <v-icon color="white">{{ item.assignee.icon }}</v-icon>
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
                </v-data-table>
            </v-col>

            <!-- Right Sidebar -->
            <v-col cols="12" md="5">
                <v-card>
                    <v-card-title class="mb-4 pa-4 d-flex align-center">
                        <p>Assigned Tasks</p>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" icon="mdi-plus" size="x-small"></v-btn>
                    </v-card-title>
                    <v-card-text class="pa-0">
                        <!-- Summary Cards -->
                        <v-row class="mb-4 px-4">
                            <v-col cols="4" class="text-center pa-1">
                                <div class="summary-card pa-3 rounded"
                                    style="background: #f8f9ff; border: 2px solid #e3e7ff;">
                                    <v-row class="align-center justify-center mb-2">
                                        <v-col cols="auto">
                                            <v-icon color="blue" class="me-1">mdi-calendar-today</v-icon>
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
                                            <v-icon color="blue" class="me-1">mdi-format-list-bulleted</v-icon>
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
                                            <v-icon color="blue" class="me-1">mdi-plus-circle</v-icon>
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
                                                <v-icon color="blue" class="me-1">mdi-format-list-bulleted</v-icon>
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
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dummy data
const headers = ref(
    [
        {
          title: 'Task',
          key: 'title',
          align: 'start',
          sortable: true,
          width: '40%'
        },
        {
          title: 'Assignee',
          key: 'assignee',
          align: 'center',
          sortable: false,
          width: '15%'
        },
        {
          title: 'Priority',
          key: 'priority',
          align: 'center',
          sortable: true,
          width: '20%'
        },
        {
          title: 'Status',
          key: 'status',
          align: 'center',
          sortable: true,
          width: '25%'
        }
      ]
)
const tasks = ref([
  {
    id: 1,
    title: "Employee's Sign",
    date: "Jun 02, 2025",
    assignee: { color: "blue", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 2,
    title: "Employer's Approval",
    date: "Jun 02, 2025",
    assignee: { color: "blue", icon: "mdi-account" },
    priority: "HIGH",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Create Employment contract",
    date: "Jun 02, 2025",
    assignee: { color: "grey", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 4,
    title: "Employee Details",
    date: "Jun 02, 2025",
    assignee: { color: "black", icon: "mdi-account" },
    priority: "HIGH",
    status: "In Progress"
  },
  {
    id: 5,
    title: "Employee's Sign",
    date: "Jun 02, 2025",
    assignee: { color: "blue", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 6,
    title: "Employer's Approval",
    date: "Jun 02, 2025",
    assignee: { color: "blue", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 7,
    title: "Create Employment contract",
    date: "Jun 02, 2025",
    assignee: { color: "grey", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 7,
    title: "Create Employment contract",
    date: "Jun 02, 2025",
    assignee: { color: "grey", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 7,
    title: "Create Employment contract",
    date: "Jun 02, 2025",
    assignee: { color: "grey", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
  {
    id: 7,
    title: "Create Employment contract",
    date: "Jun 02, 2025",
    assignee: { color: "grey", icon: "mdi-account" },
    priority: "HIGH",
    status: "Created"
  },
])

// Computed values for summary cards
const todaysTasks = computed(() => 88)
const allTasks = computed(() => 88)
const createdTasks = computed(() => 86)
const inProgressTasks = computed(() => 2)

// Helper function to get status color
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