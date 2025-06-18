<template>
    <v-app>
        <!-- Navigation Drawer / Sidebar -->
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="white" theme="light"
            width="280" rail-width="72" class="ma-0 pa-0 custom-scrollbar" style="border-right: 7px solid #e0e0e0;">
            <!-- Company Logo -->
            <div class="pa-4 text-center" v-show="!rail">
                <v-img src="/src/assets/logo.png" width="210" alt="Company Logo" class="mx-auto"></v-img>
            </div>

            <!-- User Profile Section -->
            <v-list-item class="">
                <template v-slot:prepend>
                    <v-badge bordered bottom color="green-accent-4" dot offset-x="1" offset-y="2" class="ml-4">
                        <v-avatar size="50" style="border: 1.5px solid #258bff">
                            <v-img :src="user.personal?.image" :alt="user.personal?.firstName"></v-img>
                        </v-avatar>
                    </v-badge>
                </template>

                <v-list-item-title v-show="!rail" class="font-weight-bold text-md-h6 mt-6 mr-2">
                    {{user.personal?.firstName}} <br />
                    {{user.personal?.lastName}}
                </v-list-item-title>
                <v-list-item-subtitle v-show="!rail" class="text-grey-darken-4 mr-2">
                    {{user.employment?.title}}
                </v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn variant="tonal" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                        @click.stop="rail = !rail" color="blue" size="small"></v-btn>
                </template>
            </v-list-item>

            <v-divider class="my-3"></v-divider>
            <v-list class="pt-0 darkBlue-heading-text ml-2">
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route"
                    @click="selectMenu(item.title)" :style="selectedMenu == item.title
                            ? 'background:transparent linear-gradient(295deg, #6488EE 0%, #0918F7 100%) 0% 0% no-repeat padding-box;'
                            : ''
                        " class="rounded">
                    <v-list-item-content>
                        <v-list-item-title class="darkBlue-heading-text d-flex justify-start"
                            style="font-size: 14px; width: 100%">
                            <div class="d-flex align-center" style="width: 100%">
                                <v-icon size="24" :icon="item.icon" :color="item.color || 'primary'" class="mr-2 custom-icon" />
                                <span :style="selectedMenu == item.title ? 'color: white;' : ''">
                                    {{ item.title }}
                                </span>
                            </div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider class="my-3"></v-divider>
            <v-list class="pt-0 darkBlue-heading-text ml-2 custom-scrollbar">
                  <v-list-item v-for="item in secondaryMenuItems" :key="item.title" :to="item.route"
                    @click="selectMenu(item.title)" :style="selectedMenu == item.title
                            ? 'background:transparent linear-gradient(295deg, #6488EE 0%, #0918F7 100%) 0% 0% no-repeat padding-box;'
                            : ''
                        " class="rounded">
                    <v-list-item-content>
                        <v-list-item-title class="darkBlue-heading-text d-flex justify-start"
                            style="font-size: 14px; width: 100%">
                            <div class="d-flex align-center" style="width: 100%">
                                <v-icon size="24" :icon="item.icon" :color="item.color || 'primary'" class="mr-2 custom-icon" />
                                <span :style="selectedMenu == item.title ? 'color: white;' : ''">
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
                <v-list class="pt-0 darkBlue-heading-text ml-2 custom-scrollbar">
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
                            <v-img :src="user.personal?.image"></v-img>
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
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
const drawer = ref(true)
const rail = ref(false)
const authStore = useAuthStore()

const user = authStore.user.data
const selectedMenu = ref(null)

const menuItems = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/', color: 'blue' },
  { title: 'My Work', icon: 'mdi-briefcase', route: '/my-work', color: 'orange' },
  { title: 'HR Self Service', icon: 'mdi-account-group', route: '/hr-self-service', color: 'green' },
  { title: 'Manager Central', icon: 'mdi-shield-account', route: '/manager-central', color: 'deep-purple' },
  //   { title: 'My Projects', icon: 'mdi-folder-multiple', route: '/my-projects', color: 'light-blue' },
  { title: 'Training & Development', icon: 'mdi-school', route: '/trainings', color: 'pink' },
  { title: 'Employee Transition', icon: 'mdi-account-switch', route: '/employee-transition', color: 'red' },
  { title: 'Payroll Central', icon: 'mdi-cash-multiple', route: '/payroll-central', color: 'green' },
  { title: 'Performance Hub', icon: 'mdi-speedometer', route: '/performance', color: 'red' },
  { title: 'Assets', icon: 'mdi-laptop', route: '/assets', color: 'orange-darken-2' },
  { title: 'Reports', icon: 'mdi-file-chart', route: '/reports', color: 'blue-darken-2' }
])
const secondaryMenuItems = ref([
    {
        title: 'Settings',
        icon: 'mdi-cog',
        route: '/configurations'
    },
    {
        title: 'My Profile',
        icon: 'mdi-account',
        route: '/my-profile',
        color: 'brown-darken-1'
    },
    {
        title: 'Support',
        icon: 'mdi-face-agent',
        route: '/my-profile',
        color: 'orange-darken-4'
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

const selectMenu = (menu) => {
    selectedMenu.value = menu
}
onMounted(()=> {
    selectedMenu.value = "Dashboard"
})
</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
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