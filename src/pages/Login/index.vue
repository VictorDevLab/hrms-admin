<template>
  <div>
    <div class="login_wrapper">
      <div class="fill-height">
        <div class="d-flex align-center pa-6 pt-10 pb-0">
          <div class="border-end pe-5">
            <img loading="lazy" decoding="async" :src="loginSvg" class="logo-img" />
          </div>
          <div class="ml-4">
            <p class="text-h6 font-weight-semibold gradient-text ma-0">
              ALPHA CENTRAL
            </p>
          </div>
        </div>

        <v-container fluid class="fill-height px-16 pb-16">
          <v-row class="fill-height justify-center align-center" no-gutters>
            <v-col cols="12" lg="6" class="d-none d-xl-flex">
              <div class="text-center pt-16">
                <div class="preview-container">
                  <img 
                    loading="lazy" 
                    decoding="async" 
                    src="@/assets/preview.png" 
                    alt="app preview"
                    class="preview-img d-none d-lg-block mx-auto"
                  />
                  <div class="mt-8">
                    <h2 class="text-h4 text-white font-weight-regular mb-4 d-none d-lg-block">
                      Simple yet powerful HRMS for businesses 
                    </h2>
                    <p class="text-subtitle-1 text-grey-lighten-1 d-none d-lg-block">
                      Track expenses, customize invoices, run reports and even more all from one place
                    </p>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="12" lg="6" xl="5">
              <v-card class="login-card mx-auto" elevation="8" rounded="lg">
                <div class="card-header position-relative">
                  <img 
                    loading="lazy" 
                    decoding="async" 
                    :src="bgimage" 
                    alt="Login"
                    class="header-bg"
                  />
                </div>
                
                <v-card-text class="pa-0">
                  <div class="position-relative">
                    <div class="px-3">
                      <div class="curve-parent">
                        <div class="curve position-relative">
                          <div class="keyhole-icon">
                            <v-avatar size="64" color="primary" class="keyhole-avatar">
                              <img loading="lazy" decoding="async" :src="keyhole" class="keyhole-img" />
                            </v-avatar>
                          </div>
                        </div>
                      </div>
                      
                      <div class="login-content px-4">
                        <div class="pt-6 pt-xl-14 mb-4">
                          <!-- Login title if needed -->
                        </div>

                        <v-form v-if="environment == 'development'" @submit.prevent="login">
                          <div class="mb-6">
                            <v-text-field
                              v-model="email"
                              label="Email Address"
                              type="email"
                              variant="outlined"
                              density="comfortable"
                              required
                            />

                            <v-text-field
                              v-model="password"
                              label="Password"
                              :type="showPassword ? 'text' : 'password'"
                              variant="outlined"
                              density="comfortable"
                           
                              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append-inner="showPassword = !showPassword"
                              class="mt-4"
                              required
                            />

                            <v-btn
                              type="submit"
                              color="primary"
                              size="large"
                              block
                              :loading="isSubmitting"
                              class="mt-6"
                            >
                              Login
                            </v-btn>
                          </div>
                        </v-form>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import keyhole from "@/assets/keyhole.svg"
import loginSvg from "@/assets/loginSvg.svg"
import bgimage from "@/assets/bg-image.png"

const authStore = useAuthStore()
const router = useRoute()
const environment = process.env.NODE_ENV
//const auth = useAuth()
const redirecting = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
// Snackbar for notifications
const snackbar = ref({
  show: false,
  text: '',
  color: 'error',
  timeout: 5000
})
const email = ref("")
const password = ref("")

const showSnackbar = (text, color = 'error') => {
  snackbar.value = {
    show: true,
    text,
    color,
    timeout: 5000
  }
}

const props = defineProps({
  loggedIn: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['login'])

const login = async () => {
  isSubmitting.value = true
  try {
   const success = await authStore.login(email.value, password.value)
  if(success) {
    showSnackbar('Login successful!', 'success')
    isSubmitting.value = false
    email.value = ""
    password.value = ""
  } 
  } catch (error) {
    console.error('Login error:', error)
    showSnackbar('An error occurred while logging in.', error)
    isSubmitting.value = false
    return
  }
}
</script>

<style scoped>
* {
  font-family: 'Rubik', sans-serif;
}
.login_wrapper {
  background: url("@/assets/nathan-bg.svg") !important;
  overflow: hidden auto;
  height: 100vh;
}
.logo-img {
  height: 40px;
}

@media (min-width: 1200px) {
  .logo-img {
    height: auto;
  }
  .login_wrapper {
    overflow: hidden;
  }
}

.gradient-text {
  background: linear-gradient(to right, #44A16A, #3582B3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-card {
  width: 100%;
  max-width: 460px;
}

@media (min-width: 1200px) {
  .login-card {
    max-width: 650px;
  }
}

.card-header {
  height: 280px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.header-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #40485F;
}

.preview-container {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preview-img {
  max-width: 83%;
}

.login-content {
  min-height: 320px;
}

@media (min-width: 1200px) {
  .login-content {
    min-height: 350px;
  }
}

.outlook-btn {
  border-color: #3B82F6 !important;
}

.outlook-icon {
  height: 40px;
}

.curve {
  position: absolute;
  top: -8px;
  left: 18px;
  z-index: 1;
}

.keyhole-icon {
  position: absolute;
  top: -22px;
  left: 2px;
  z-index: 50;
}

.keyhole-avatar {
  background-color: #1A70D4 !important;
}

.keyhole-img {
  width: 24px;
  height: 24px;
}

.curve-parent {
  position: relative;
}

.curve::before {
  position: absolute;
  top: -27px;
  left: -43px;
  content: '';
  display: block;
  width: 178px;
  height: 63px;
  -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NiAzMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5iZ19zb3VyY2VfYmFkZ2VfMTwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01Ny42NywxMS45NEM1Mi4zNiw2LjcxLDQ4LjQyLDAsMzguMywwSDM3LjdDMjcuNTgsMCwyMy42NCw2LjcxLDE4LjMzLDExLjk0LDE0LjQ3LDE2Ljc2LDYuNjEsMTcuODEsMCwxOFYzMUg3NlYxOEM2OS4zOSwxNy44MSw2MS41MywxNi43Niw1Ny42NywxMS45NFoiLz48L2c+PC9nPjwvc3ZnPg==);
  clip: rect(0px, 142px, 36px, 9px);
  z-index: 0;
  background: #fff;
}

/* Hide body overflow */
:deep(body) {
  overflow: hidden;
}
</style>