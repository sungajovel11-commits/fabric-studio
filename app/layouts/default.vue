<template>
  <v-app>
    <v-app-bar
      v-if="route.path !== '/login'"
      color="#1976d2"
      dark
      elevation="1"
    >
      <v-app-bar-title class="font-weight-bold">
        <div class="d-inline-flex align-center ga-2">
          <v-icon icon="mdi-palette-swatch" size="26" />
          <span>Fabric Studio</span>
        </div>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-2 pr-3">
        <v-btn
          variant="tonal"
          class="text-none"
          prepend-icon="mdi-view-dashboard-outline"
          @click="navigateTo('/')"
        >
          Dashboard
        </v-btn>

        <v-btn
          variant="text"
          class="text-none"
          prepend-icon="mdi-vector-square"
          @click="navigateTo('/canvas-editor')"
        >
          Canvas Editor
        </v-btn>

        <v-avatar
          v-if="user?.email"
          color="white"
          size="32"
          class="text-primary font-weight-bold"
        >
          {{ user.email.charAt(0).toUpperCase() }}
        </v-avatar>

        <v-btn
          variant="outlined"
          class="text-none"
          prepend-icon="mdi-logout"
          @click="handleLogout"
        >
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { user, initAuth, logout } = useAuth()

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

onMounted(() => {
  initAuth()
})
</script>