<template>
  <v-app>
    <v-app-bar
      v-if="route.path !== '/login'"
      color="#1976d2"
      dark
      elevation="1"
    >
      <v-app-bar-title class="font-weight-bold">
        <NuxtLink
          to="/"
          class="d-inline-flex align-center ga-2 text-white text-decoration-none"
        >
          <v-icon icon="mdi-palette-swatch" size="26" />
          <span>Fabric Studio</span>
        </NuxtLink>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-2 pr-3">
        <v-btn
          to="/"
          :variant="route.path === '/' ? 'tonal' : 'text'"
          class="text-none"
          prepend-icon="mdi-view-dashboard-outline"
        >
          Dashboard
        </v-btn>

        <v-btn
          to="/canvas-editor"
          :variant="route.path === '/canvas-editor' ? 'tonal' : 'text'"
          class="text-none"
          prepend-icon="mdi-vector-square"
        >
          Canvas Editor
        </v-btn>

        <NuxtLink
          to="/profile"
          title="Profile Settings"
          class="d-inline-flex align-center text-decoration-none cursor-pointer"
        >
          <v-avatar
            color="white"
            size="34"
            class="text-primary font-weight-bold"
          >
            {{ userInitial }}
          </v-avatar>
        </NuxtLink>

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
import { computed, onMounted } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { user, initAuth, logout } = useAuth()

const userInitial = computed(() => {
  const label = user.value?.name || user.value?.email || 'U'
  return label.charAt(0).toUpperCase()
})

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

onMounted(() => {
  initAuth()
})
</script>