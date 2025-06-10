<template>
    <v-app>
        <!-- Navigation Drawer / Sidebar -->
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="white"
            theme="light" width="280" rail-width="72" class="ma-0 pa-0" style="border-right: 7px solid #e0e0e0;">
            <!-- Company Logo -->
            <div class="pa-4 text-center" v-show="!rail">
                <v-img src="/src/assets/logo.png" alt="Company Logo" class="mx-auto"></v-img>
            </div>

            <!-- User Profile Section -->
            <v-list-item class="">
                <template v-slot:prepend>
                    <v-badge bordered bottom color="green-accent-4" dot offset-x="1" offset-y="2" class="ml-4">
                        <v-avatar size="40" style="border: 1.5px solid #258bff">
                            <v-img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User Avatar"></v-img>
                        </v-avatar>
                    </v-badge>
                </template>

                <v-list-item-title v-show="!rail" class="font-weight-bold text-md-h6 mr-2">
                    Victor K Dev
                </v-list-item-title>
                <v-list-item-subtitle v-show="!rail" class="text-grey-darken-4 mr-2">
                    Senior Developer
                </v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn variant="text" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                        @click.stop="rail = !rail" color="blue" size="small"></v-btn>
                </template>
            </v-list-item>

            <v-divider class="my-3"></v-divider>
            <v-list class="pt-0 darkBlue-heading-text ml-2">
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route">
                    <v-list-item-content>
                        <v-list-item-title class="darkBlue-heading-text d-flex justify-start"
                            style="font-size: 14px; width: 100%">
                            <div class="d-flex align-center" style="width: 100%">
                                <v-icon :icon="item.icon" :color="item.color || 'primary'" class="mr-2 custom-icon" />
                                <span style="white-space: nowrap">
                                    {{ item.title }}
                                </span>
                            </div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider class="my-3"></v-divider>
            <v-list class="pt-0 darkBlue-heading-text ml-2">
                <v-list-item v-for="item in secondaryMenuItems" :key="item.title" :to="item.route">
                    <v-list-item-content>
                        <v-list-item-title class="darkBlue-heading-text d-flex justify-start"
                            style="font-size: 14px; width: 100%">
                            <div class="d-flex align-center" style="width: 100%">
                                <v-icon :icon="item.icon" :color="item.color || 'primary'" class="mr-2 custom-icon" />
                                <span style="white-space: nowrap">
                                    {{ item.title }}
                                </span>
                            </div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <!-- Bottom Section -->
            <template v-slot:append>
                <v-divider></v-divider>
                <!-- <v-list density="compact" nav class="px-2 pb-3">
                    <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout" color="red"
                        class="mt-2" rounded="lg">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-logout" class="me-3"></v-icon>
                        </template>
                </v-list-item>
            </v-list> -->
                <v-list class="pt-0 darkBlue-heading-text ml-2">
                    <v-list-item @click="logout" class="ml-2">
                        <v-list-item-content>
                            <v-list-item-title class="darkBlue-heading-text d-flex justify-start"
                                style="font-size: 14px; width: 100%">
                                <div class="d-flex align-center" style="width: 100%">
                                    <v-icon color="red" class="mr-2 custom-icon">mdi-logout</v-icon>
                                    <span style="white-space: nowrap">
                                        Logout
                                    </span>
                                </div>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <!-- App Bar -->
        <v-app-bar color="grey-lighten-4" elevation="0" height="64">
            <!-- Hamburger menu for mobile -->
            <v-app-bar-nav-icon v-if="$vuetify.display.mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <!-- Page Title -->
            <v-app-bar-title class="text-h6 font-weight-medium text-grey-darken-3">
                {{ pageTitle }}
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <!-- Search -->
            <v-btn icon variant="text" size="large">
                <v-icon>mdi-magnify</v-icon>
                <v-tooltip activator="parent" location="bottom">Search</v-tooltip>
            </v-btn>

            <!-- Notifications -->
            <v-btn icon variant="text" size="large" class="me-2">
                <v-badge color="red" content="3" offset-x="8" offset-y="8">
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
                <v-tooltip activator="parent" location="bottom">Notifications</v-tooltip>
            </v-btn>

            <!-- User Menu -->
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" size="large">
                        <v-avatar size="36">
                            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="goToProfile" prepend-icon="mdi-account">
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="goToSettings" prepend-icon="mdi-cog">
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="logout" prepend-icon="mdi-logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- Main Content -->
        <v-main class="" style="background-color: #F5F5F5; min-height: calc(100vh - 64px);">
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
    <v-dialog v-model="logoutDialog" width="500">
        <v-card max-width="500">
            <v-card-title class="text-center">Logging Out...</v-card-title>
            <v-card-text class="text-center">
                <v-progress-circular indeterminate color="red" size="64"></v-progress-circular>
                <!-- <p class="mt-4">Logging Out...</p>   -->
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const drawer = ref(true)
const rail = ref(false)
const authStore = useAuthStore()


const menuItems = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/', color: 'blue' },
  { title: 'My Work', icon: 'mdi-briefcase', route: '/my-work', color: 'orange' },
  { title: 'HR Self Service', icon: 'mdi-account-group', route: '/hr-self-service', color: 'green' },
  { title: 'Admin Central', icon: 'mdi-shield-account', route: '/admin-central', color: 'deep-purple' },
  { title: 'My Team', icon: 'mdi-account-multiple', route: '/my-team', color: 'yellow' },
  { title: 'My Projects', icon: 'mdi-folder-multiple', route: '/my-projects', color: 'light-blue' },
  { title: 'My Trainings', icon: 'mdi-school', route: '/trainings', color: 'pink' },
  { title: 'Employee Transition', icon: 'mdi-account-switch', route: '/employee-transition', color: 'red' },
  { title: 'Payroll Central', icon: 'mdi-cash-multiple', route: '/payroll-central', color: 'green' },
  { title: 'Performance Hub', icon: 'mdi-chart-line', route: '/performance', color: 'red' },
  { title: 'Assets', icon: 'mdi-laptop', route: '/assets', color: 'red' },
  { title: 'Reports', icon: 'mdi-file-chart', route: '/reports', color: 'red' }
])
const secondaryMenuItems = ref([
    {
        title: 'Settings',
        icon: 'mdi-cog',
        route: '/configurations'
    },
    {
        title: 'Reports',
        icon: 'mdi-chart-line',
        route: '/reports'
    },

])
const logoutDialog = ref(false)

const logout = () => {
    logoutDialog.value = true
    setTimeout(() => {
        console.log("Logging out...")
        authStore.logout()
    }, 1500) 
}
const isTokenExpired = () => {
 if (authStore.value === null) return true;
 else return false
}

</script>

<style scoped>
.v-navigation-drawer {
  border-right: none !important;
}
.custom-list-item {
  font-size: 12px; 
  align-items: center;
}

.custom-icon {
  font-size: 20px; 
  margin-right: 8px; 
}

.custom-text {
  font-size: 14px; 
  font-weight: 400;
}

</style>