<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <div class="error-container">
          <div class="error-number mb-6">
            <span class="text-h2 font-weight-bold primary--text">4</span>
            <v-icon 
              size="60" 
              color="primary" 
              class="mx-2 rotating-icon"
            >
              mdi-help-circle-outline
            </v-icon>
            <span class="text-h2 font-weight-bold primary--text">4</span>
          </div>

          <h2 class="text-h3 font-weight-bold mb-4 text--primary">
            Oops! Page Not Found
          </h2>
          
          <p class="text-h6 mb-6 text--secondary">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, it happens to the best of us!
          </p>

          <v-card 
            outlined 
            class="mb-6 pa-4" 
            elevation="2"
          >
            <v-card-text>
              <h3 class="text-h6 mb-3">Here's what you can try:</h3>
              <div class="text-left">
                <v-chip 
                  v-for="suggestion in suggestions" 
                  :key="suggestion.id"
                  class="ma-1" 
                  color="secondary" 
                  outlined
                  small
                >
                  <v-icon left size="16">{{ suggestion.icon }}</v-icon>
                  {{ suggestion.text }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>

          <!-- Action Buttons -->
          <div class="d-flex flex-column flex-sm-row justify-center gap-3">
            <v-btn 
              color="primary" 
              size="large" 
              elevation="2"
              @click="goHome"
              class="mb-2 mb-sm-0"
            >
              <v-icon left>mdi-home</v-icon>
              Go Home
            </v-btn>
            
            <v-btn 
              color="secondary" 
              variant="outlined" 
              size="large"
              @click="goBack"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Go Back
            </v-btn>
          </div>

          <!-- Fun Animation -->
          <div class="mt-8">
            <v-icon 
              v-for="n in 3" 
              :key="n"
              :class="`floating-dot floating-dot-${n}`"
              color="primary"
              size="12"
            >
              mdi-circle
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const suggestions = ref([
  { id: 1, text: 'Check the URL for typos', icon: 'mdi-spell-check' },
  { id: 2, text: 'Try the search function', icon: 'mdi-magnify' },
  { id: 3, text: 'Visit our homepage', icon: 'mdi-home-outline' },
  { id: 4, text: 'Contact support', icon: 'mdi-help-circle' }
])


const goHome = () => {
  router.push('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

</script>

<style scoped>
* {
    font-family: 'Rubik', sans-serif;
}
.error-container {
  max-width: 100%;
  padding: 2rem 1rem;
}

.error-number {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.rotating-icon {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.floating-dot {
  margin: 0 4px;
  opacity: 0.6;
}

.floating-dot-1 {
  animation: float 2s ease-in-out infinite;
}

.floating-dot-2 {
  animation: float 2s ease-in-out infinite 0.5s;
}

.floating-dot-3 {
  animation: float 2s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.gap-3 {
  gap: 12px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .error-number {
    flex-direction: column;
  }
  
  .error-number .v-icon {
    margin: 1rem 0 !important;
  }
}
</style>