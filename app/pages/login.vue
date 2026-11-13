<template>
  <div class="login-split-bg d-flex align-center justify-center pa-4">
    <v-card
      max-width="940"
      width="100%"
      elevation="12"
      class="login-card overflow-hidden"
    >
      <v-row no-gutters>
        <!-- Left Column: Fabric Studio Logo + Login / Create Account + Google Sign-In -->
        <v-col
          cols="12"
          md="6"
          class="bg-white pa-8 pa-sm-10 d-flex flex-column justify-center"
        >
          <div class="text-center mb-5">
            <div
              v-if="!isRegisterMode"
              class="d-inline-flex align-center justify-center ga-2"
            >
              <v-icon icon="mdi-palette-swatch" size="34" color="#2f49eb" />
              <h1 class="text-h4 font-weight-bold text-grey-darken-4">
                Fabric Studio
              </h1>
            </div>

            <h1 v-else class="text-h4 font-weight-bold text-grey-darken-4">
              Create Account
            </h1>
          </div>

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            closable
            class="mb-4 text-left"
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-alert
            v-if="successMessage"
            type="success"
            variant="tonal"
            closable
            class="mb-4 text-left"
            @click:close="successMessage = ''"
          >
            {{ successMessage }}
          </v-alert>

          <!-- LOGIN FORM -->
          <form v-if="!isRegisterMode" @submit.prevent="handleFormLogin">
            <div class="mb-3">
              <label class="text-caption text-grey-darken-1 d-block mb-1">
                Username or email
              </label>
              <v-text-field
                v-model="emailInput"
                placeholder="sample@.com"
                variant="solo-filled"
                flat
                bg-color="#eef0f4"
                density="comfortable"
                hide-details
                rounded="lg"
              />
            </div>

            <div class="mb-2">
              <label class="text-caption text-grey-darken-1 d-block mb-1">
                Password
              </label>
              <v-text-field
                v-model="passwordInput"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                variant="solo-filled"
                flat
                bg-color="#eef0f4"
                density="comfortable"
                hide-details
                rounded="lg"
                :append-inner-icon="
                  showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="showPassword = !showPassword"
              />
            </div>

            <div class="d-flex align-center mb-4">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                color="#2f49eb"
                density="compact"
                hide-details
              />
            </div>

            <v-btn
              type="submit"
              block
              height="46"
              color="#2f49eb"
              class="text-white text-none font-weight-bold rounded-lg mb-4"
              elevation="0"
            >
              Login
            </v-btn>
          </form>

          <!-- CREATE ACCOUNT FORM -->
          <form v-else @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="text-caption text-grey-darken-1 d-block mb-1">
                Full Name
              </label>
              <v-text-field
                v-model="regName"
                variant="solo-filled"
                flat
                bg-color="#eef0f4"
                density="comfortable"
                hide-details
                rounded="lg"
              />
            </div>

            <div class="mb-3">
              <label class="text-caption text-grey-darken-1 d-block mb-1">
                Email Address
              </label>
              <v-text-field
                v-model="regEmail"
                type="email"
                variant="solo-filled"
                flat
                bg-color="#eef0f4"
                density="comfortable"
                hide-details
                rounded="lg"
              />
            </div>

            <div class="mb-4">
              <label class="text-caption text-grey-darken-1 d-block mb-1">
                Password
              </label>
              <v-text-field
                v-model="regPassword"
                :type="showPassword ? 'text' : 'password'"
                variant="solo-filled"
                flat
                bg-color="#eef0f4"
                density="comfortable"
                hide-details
                rounded="lg"
                :append-inner-icon="
                  showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="showPassword = !showPassword"
              />
            </div>

            <v-btn
              type="submit"
              block
              height="46"
              color="#2f49eb"
              class="text-white text-none font-weight-bold rounded-lg mb-4"
              elevation="0"
            >
              Save &amp; Create Account
            </v-btn>
          </form>

          <!-- Toggle Link -->
          <div class="text-center mb-3">
            <template v-if="!isRegisterMode">
              <span class="text-caption text-medium-emphasis">
                Don't have an account ?
              </span>
              <a
                href="#"
                class="text-caption font-weight-bold text-decoration-none ml-1"
                style="color: #2f49eb;"
                @click.prevent="toggleMode(true)"
              >
                Sign up
              </a>
            </template>
            <template v-else>
              <span class="text-caption text-medium-emphasis">
                Already have an account ?
              </span>
              <a
                href="#"
                class="text-caption font-weight-bold text-decoration-none ml-1"
                style="color: #2f49eb;"
                @click.prevent="toggleMode(false)"
              >
                Login
              </a>
            </template>
          </div>

          <!-- OR Divider -->
          <div v-show="!isRegisterMode" class="d-flex align-center my-2">
            <v-divider />
            <span class="text-caption text-medium-emphasis px-3">OR</span>
            <v-divider />
          </div>

          <!-- Official Google Sign-In Button -->
          <div
            v-show="!isRegisterMode"
            class="d-flex flex-column align-center mt-2"
          >
            <div ref="googleBtnRef" />

            <v-progress-circular
              v-if="loadingScript"
              indeterminate
              color="#2f49eb"
              size="24"
              class="mt-2"
            />
          </div>
        </v-col>

        <!-- Right Column: Interactive Sliding Showcase -->
        <v-col
          cols="12"
          md="6"
          class="right-panel pa-8 pa-sm-10 d-flex flex-column align-center justify-center text-center"
        >
          <v-window v-model="currentSlide" class="w-100">
            <!-- SLIDE 1 -->
            <v-window-item :value="0">
              <div class="d-flex flex-column align-center">
                <svg
                  viewBox="0 0 320 220"
                  width="265"
                  height="185"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mb-4"
                >
                  <text x="35" y="130" fill="#f59e0b" font-size="24" font-weight="bold">+</text>
                  <text x="275" y="55" fill="#2f49eb" font-size="26" font-weight="bold">+</text>
                  <rect x="62" y="40" width="196" height="132" rx="16" fill="#ffffff" stroke="#1e293b" stroke-width="6" />
                  <rect x="108" y="54" width="104" height="14" rx="7" fill="#1e293b" />
                  <circle cx="202" cy="61" r="3" fill="#ffffff" />
                  <path d="M 88 94 Q 105 76, 122 94 T 156 94 T 190 94 T 224 94" fill="none" stroke="#2f49eb" stroke-width="5" stroke-linecap="round" />
                  <rect x="136" y="8" width="48" height="46" rx="12" fill="#1e293b" />
                  <circle cx="160" cy="31" r="13" fill="#ffffff" />
                  <path d="M 160 31 L 160 18 A 13 13 0 0 1 173 31 Z" fill="#f59e0b" />
                  <rect x="28" y="34" width="64" height="70" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
                  <rect x="36" y="45" width="10" height="10" rx="2" fill="#2f49eb" />
                  <rect x="52" y="48" width="30" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="36" y="64" width="10" height="10" rx="2" fill="#2f49eb" />
                  <rect x="52" y="67" width="30" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="36" y="83" width="10" height="10" rx="2" fill="#2f49eb" />
                  <rect x="52" y="86" width="30" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="115" y="112" width="96" height="80" rx="12" fill="#1e293b" />
                  <circle cx="141" cy="140" r="14" fill="#ffffff" />
                  <path d="M 141 140 L 141 126 A 14 14 0 0 1 155 140 Z" fill="#f59e0b" />
                  <rect x="130" y="166" width="10" height="16" rx="2" fill="#ffffff" />
                  <rect x="146" y="160" width="10" height="22" rx="2" fill="#f59e0b" />
                  <rect x="162" y="152" width="10" height="30" rx="2" fill="#ffffff" />
                  <rect x="178" y="144" width="10" height="38" rx="2" fill="#f59e0b" />
                  <circle cx="242" cy="54" r="17" fill="#f59e0b" />
                  <path d="M 242 54 L 242 37 A 17 17 0 0 1 259 54 Z" fill="#2f49eb" />
                  <circle cx="76" cy="124" r="16" fill="#facc15" />
                  <rect x="70" y="138" width="12" height="8" rx="2" fill="#334155" />
                </svg>

                <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">
                  Check Your Canvas Progress
                </h2>
                <p class="text-body-2 text-medium-emphasis px-4 mb-6">
                  Create rectangles, circles, triangles, and custom text layers directly on an interactive HTML5 canvas.
                </p>
              </div>
            </v-window-item>

            <!-- SLIDE 2 -->
            <v-window-item :value="1">
              <div class="d-flex flex-column align-center">
                <svg
                  viewBox="0 0 320 220"
                  width="265"
                  height="185"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mb-4"
                >
                  <text x="40" y="55" fill="#2f49eb" font-size="24" font-weight="bold">+</text>
                  <text x="268" y="155" fill="#f59e0b" font-size="24" font-weight="bold">+</text>
                  <rect x="62" y="34" width="196" height="142" rx="16" fill="#ffffff" stroke="#1e293b" stroke-width="6" />
                  <rect x="108" y="72" width="104" height="68" rx="8" fill="#2f49eb" />
                  <rect x="102" y="66" width="116" height="80" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5,4" />
                  <circle cx="102" cy="66" r="5" fill="#ffffff" stroke="#2f49eb" stroke-width="2.5" />
                  <circle cx="218" cy="66" r="5" fill="#ffffff" stroke="#2f49eb" stroke-width="2.5" />
                  <circle cx="102" cy="146" r="5" fill="#ffffff" stroke="#2f49eb" stroke-width="2.5" />
                  <circle cx="218" cy="146" r="5" fill="#ffffff" stroke="#2f49eb" stroke-width="2.5" />
                  <line x1="160" y1="66" x2="160" y2="48" stroke="#f59e0b" stroke-width="2.5" />
                  <circle cx="160" cy="46" r="6" fill="#f59e0b" />
                  <rect x="95" y="160" width="130" height="32" rx="16" fill="#1e293b" />
                  <circle cx="122" cy="176" r="8" fill="#2f49eb" />
                  <circle cx="147" cy="176" r="8" fill="#f59e0b" />
                  <circle cx="172" cy="176" r="8" fill="#10b981" />
                  <circle cx="197" cy="176" r="8" fill="#ef4444" />
                </svg>

                <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">
                  Drag, Resize &amp; Recolor Live
                </h2>
                <p class="text-body-2 text-medium-emphasis px-4 mb-6">
                  Select any object to move, scale, rotate, or inspect real-time X/Y coordinates and dimensions.
                </p>
              </div>
            </v-window-item>

            <!-- SLIDE 3 -->
            <v-window-item :value="2">
              <div class="d-flex flex-column align-center">
                <svg
                  viewBox="0 0 320 220"
                  width="265"
                  height="185"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mb-4"
                >
                  <text x="42" y="145" fill="#2f49eb" font-size="24" font-weight="bold">+</text>
                  <text x="265" y="60" fill="#f59e0b" font-size="24" font-weight="bold">+</text>
                  <rect x="68" y="32" width="184" height="134" rx="16" fill="#ffffff" stroke="#1e293b" stroke-width="6" />
                  <circle cx="130" cy="95" r="28" fill="#f59e0b" />
                  <polygon points="185,65 218,122 152,122" fill="#2f49eb" />
                  <rect x="102" y="144" width="116" height="44" rx="12" fill="#1e293b" />
                  <path d="M 134 158 L 134 174 M 127 168 L 134 175 L 141 168" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  <text x="150" y="171" fill="#ffffff" font-size="13" font-weight="bold">.PNG</text>
                </svg>

                <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">
                  One-Click High-Res Export
                </h2>
                <p class="text-body-2 text-medium-emphasis px-4 mb-6">
                  Download your finished vector artwork as a crisp PNG image straight from your browser.
                </p>
              </div>
            </v-window-item>
          </v-window>

          <!-- Clickable Slide Indicators -->
          <div class="d-flex align-center justify-center ga-2 mt-2">
            <button
              v-for="idx in 3"
              :key="idx"
              type="button"
              :aria-label="`Slide ${idx}`"
              class="indicator-btn"
              :class="{ active: currentSlide === idx - 1 }"
              @click="currentSlide = idx - 1"
            />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { definePageMeta, useRuntimeConfig, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: 'auth',
})

const config = useRuntimeConfig()
const { registerAccount, loginWithEmail, loginWithCredential } = useAuth()

const isRegisterMode = ref(false)
const emailInput = ref('')
const passwordInput = ref('')
const rememberMe = ref(false)

const regName = ref('')
const regEmail = ref('')
const regPassword = ref('')

const showPassword = ref(false)
const googleBtnRef = ref<HTMLElement | null>(null)
const errorMessage = ref('')
const successMessage = ref('')
const loadingScript = ref(true)

const currentSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | null = null

const toggleMode = (register: boolean) => {
  isRegisterMode.value = register
  errorMessage.value = ''
  successMessage.value = ''
}

const handleRegister = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!regName.value.trim() || !regEmail.value.trim() || !regPassword.value.trim()) {
    errorMessage.value = 'Please fill in your full name, email, and password.'
    return
  }

  if (regPassword.value.length < 4) {
    errorMessage.value = 'Password must be at least 4 characters long.'
    return
  }

  const res = registerAccount(regName.value, regEmail.value, regPassword.value)
  if (!res.ok) {
    errorMessage.value = res.message
    return
  }

  emailInput.value = regEmail.value.trim()
  passwordInput.value = ''
  regName.value = ''
  regEmail.value = ''
  regPassword.value = ''
  isRegisterMode.value = false
  successMessage.value = res.message
}

const handleFormLogin = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!emailInput.value.trim() || !passwordInput.value.trim()) {
    errorMessage.value = 'Please enter your registered email and password, or sign in with Google.'
    return
  }

  const res = loginWithEmail(emailInput.value, passwordInput.value)
  if (!res.ok) {
    errorMessage.value = res.message
    return
  }

  navigateTo('/')
}

const handleCredentialResponse = (response: any) => {
  if (!response?.credential) {
    errorMessage.value = 'Google Sign-In was cancelled or returned no credential.'
    return
  }

  const success = loginWithCredential(response.credential)
  if (success) {
    navigateTo('/')
  } else {
    errorMessage.value = 'Failed to verify Google account details. Please try again.'
  }
}

const initializeGoogleSignIn = () => {
  const clientId =
    (config.public.googleClientId as string) ||
    '100372389745-jbv57048ov3uar8j245p9q02qq169eeq.apps.googleusercontent.com'

  const g = (window as any).google
  if (g?.accounts?.id && googleBtnRef.value) {
    loadingScript.value = false
    g.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      cancel_on_tap_outside: true,
    })

    g.accounts.id.renderButton(googleBtnRef.value, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'signin_with',
      shape: 'rectangular',
    })
  } else {
    setTimeout(initializeGoogleSignIn, 250)
  }
}

onMounted(() => {
  initializeGoogleSignIn()
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 3
  }, 4000)
})

onBeforeUnmount(() => {
  if (slideTimer) clearInterval(slideTimer)
})
</script>

<style scoped>
.login-split-bg {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    to bottom,
    #2f49eb 0%,
    #2f49eb 50%,
    #c6d4fb 50%,
    #c6d4fb 100%
  );
}

.login-card {
  border-radius: 28px !important;
}

.right-panel {
  background-color: #f3f5f9;
}

.indicator-btn {
  width: 34px;
  height: 4px;
  border-radius: 4px;
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: #cbd5e1;
  transition: background-color 0.25s ease;
}

.indicator-btn.active {
  background-color: #2f49eb;
}
</style>