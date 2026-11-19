<template>
  <v-app>
    <v-app-bar
      v-if="route.path !== '/login'"
      color="#1976d2"
      theme="dark"
      elevation="1"
    >
      <v-app-bar-title class="font-weight-bold">
        <NuxtLink
          to="/"
          class="d-inline-flex align-center ga-2 text-white text-decoration-none"
        >
          <v-icon icon="mdi-palette-swatch" size="26" color="white" />
          <span class="text-white">Fabric Studio</span>
        </NuxtLink>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-2 pr-3">
        <v-btn
          :variant="route.path === '/' ? 'tonal' : 'text'"
          class="text-none text-white"
          prepend-icon="mdi-view-dashboard-outline"
          @click="navigateTo('/')"
        >
          Dashboard
        </v-btn>

        <v-btn
          :variant="route.path === '/canvas-editor' ? 'tonal' : 'text'"
          class="text-none text-white"
          prepend-icon="mdi-vector-square"
          @click="navigateTo('/canvas-editor')"
        >
          Canvas Editor
        </v-btn>

        <v-btn
          :variant="route.path === '/profile' ? 'tonal' : 'text'"
          class="text-none text-white"
          prepend-icon="mdi-account-circle-outline"
          @click="navigateTo('/profile')"
        >
          Profile
        </v-btn>

        <v-btn
          variant="outlined"
          color="white"
          class="text-none text-white"
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
const { initAuth, logout } = useAuth()

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

onMounted(() => {
  initAuth()
})
</script>