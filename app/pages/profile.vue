<template>
  <v-container class="py-8" max-width="760">
    <!-- Top Back Navigation -->
    <div class="d-flex align-center justify-space-between mb-4">
      <v-btn
        to="/"
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="text-none font-weight-medium"
      >
        Back to Dashboard
      </v-btn>
      <v-chip color="primary" size="small" variant="tonal">
        Account Settings
      </v-chip>
    </div>

    <v-card elevation="3" rounded="xl" class="pa-6 pa-sm-8 bg-white">
      <!-- Profile Header & Avatar Upload -->
      <div class="d-flex flex-column flex-sm-row align-center ga-5 mb-6">
        <div class="position-relative">
          <v-avatar size="96" color="#2f49eb" class="elevation-2">
            <v-img
              v-if="form.picture"
              :src="form.picture"
              :alt="user?.name"
              cover
            />
            <span v-else class="text-h4 font-weight-bold text-white">
              {{ form.firstName?.charAt(0)?.toUpperCase() || 'U' }}
            </span>
          </v-avatar>

          <v-btn
            icon="mdi-camera"
            size="x-small"
            color="#2f49eb"
            class="position-absolute"
            style="bottom: 0; right: 0;"
            title="Change profile photo"
            @click="triggerFilePicker"
          />
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handlePhotoUpload"
          />
        </div>

        <div class="text-center text-sm-left">
          <h1 class="text-h5 font-weight-bold text-grey-darken-4">
            {{ user?.name }}
          </h1>
          <p class="text-body-2 text-medium-emphasis mb-2">
            {{ user?.email }}
          </p>
          <div class="d-flex flex-wrap justify-center justify-sm-start ga-2">
            <v-btn
              size="small"
              variant="tonal"
              color="#2f49eb"
              class="text-none"
              prepend-icon="mdi-image-edit-outline"
              @click="triggerFilePicker"
            >
              Upload New Photo
            </v-btn>
            <v-btn
              v-if="form.picture"
              size="small"
              variant="text"
              color="error"
              class="text-none"
              @click="form.picture = ''"
            >
              Remove Photo
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider class="mb-6" />

      <!-- Alerts -->
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        closable
        class="mb-4"
        @click:close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>

      <v-alert
        v-if="successMessage"
        type="success"
        variant="tonal"
        closable
        class="mb-4"
        @click:close="successMessage = ''"
      >
        {{ successMessage }}
      </v-alert>

      <!-- Profile Edit Form -->
      <form @submit.prevent="handleSaveProfile">
        <div class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-3">
          Personal Information
        </div>

        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.firstName"
              label="First Name"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-outline"
              required
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.surname"
              label="Surname / Last Name"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-outline"
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model="form.email"
          label="Email Address"
          type="email"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-email-outline"
          :disabled="user?.provider === 'google'"
          :hint="
            user?.provider === 'google'
              ? 'Google Sign-In email is linked to your Google account'
              : 'You will use this email on your next login'
          "
          persistent-hint
          class="mb-5"
        />

        <v-divider class="mb-5" />

        <div class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-1">
          Security &amp; Password
        </div>
        <p class="text-caption text-medium-emphasis mb-3">
          Leave blank if you do not want to change your password.
        </p>

        <v-row dense class="mb-4">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.newPassword"
              label="New Password"
              :type="showPass ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="showPass = !showPass"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.confirmPassword"
              label="Confirm New Password"
              :type="showPass ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-check-outline"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end ga-3">
          <v-btn
            to="/"
            variant="outlined"
            color="grey-darken-2"
            size="large"
            class="text-none"
            rounded="lg"
          >
            Cancel
          </v-btn>

          <v-btn
            type="submit"
            color="#2f49eb"
            size="large"
            class="text-white text-none font-weight-bold"
            rounded="lg"
            prepend-icon="mdi-content-save-check"
          >
            Update Profile
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useProjects } from '~/composables/useProjects'

definePageMeta({
  middleware: 'auth',
})

const { user, initAuth, updateProfile } = useAuth()
const { transferProjectsOwner } = useProjects()

const fileInputRef = ref<HTMLInputElement | null>(null)
const showPass = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  firstName: '',
  surname: '',
  email: '',
  picture: '',
  newPassword: '',
  confirmPassword: '',
})

const populateForm = () => {
  if (!user.value) return
  const parts = (user.value.name || '').trim().split(' ')
  form.firstName = user.value.firstName ?? parts[0] ?? ''
  form.surname = user.value.surname ?? parts.slice(1).join(' ') ?? ''
  form.email = user.value.email || ''
  form.picture = user.value.picture || ''
  form.newPassword = ''
  form.confirmPassword = ''
}

onMounted(() => {
  initAuth()
  populateForm()
})

const triggerFilePicker = () => {
  fileInputRef.value?.click()
}

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Please select a valid image file (PNG, JPG, or WEBP).'
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      form.picture = reader.result
    }
  }
  reader.readAsDataURL(file)
}

const handleSaveProfile = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (form.newPassword && form.newPassword !== form.confirmPassword) {
    errorMessage.value = 'New password and confirm password do not match.'
    return
  }

  const res = updateProfile({
    firstName: form.firstName,
    surname: form.surname,
    email: form.email,
    picture: form.picture,
    newPassword: form.newPassword || undefined,
  })

  if (!res.ok) {
    errorMessage.value = res.message
    return
  }

  if (res.oldEmail && res.newEmail && res.oldEmail !== res.newEmail) {
    transferProjectsOwner(res.oldEmail, res.newEmail)
  }

  form.newPassword = ''
  form.confirmPassword = ''
  successMessage.value = res.message
}
</script>