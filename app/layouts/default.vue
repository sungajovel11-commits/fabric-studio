<template>
  <div>
    <v-app-bar v-if="user" color="primary" elevation="2">
      <v-app-bar-title class="font-weight-bold">
        <NuxtLink
          to="/"
          class="d-inline-flex align-center text-white text-decoration-none"
          style="cursor: pointer;"
        >
          <v-icon icon="mdi-palette-swatch" class="mr-2" />
          <span>Fabric Studio</span>
        </NuxtLink>
      </v-app-bar-title>

      <v-spacer />

      <v-btn to="/" variant="text" prepend-icon="mdi-view-dashboard" class="mr-1">
        Dashboard
      </v-btn>
      <v-btn
        to="/canvas-editor"
        variant="text"
        prepend-icon="mdi-vector-square"
        class="mr-2"
      >
        Canvas Editor
      </v-btn>

      <!-- Clickable Profile Avatar -> /profile -->
      <NuxtLink
        to="/profile"
        class="d-inline-flex align-center text-decoration-none mr-3"
        title="Edit Profile"
        style="cursor: pointer;"
      >
        <v-avatar size="36" color="white" class="elevation-1">
          <v-img v-if="user.picture" :src="user.picture" :alt="user.name" cover />
          <span v-else class="text-primary font-weight-bold text-caption">
            {{ user.name?.charAt(0)?.toUpperCase() || 'U' }}
          </span>
        </v-avatar>
      </NuxtLink>

      <v-btn
        color="white"
        variant="outlined"
        size="small"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4 min-h-screen">
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, initAuth, logout } = useAuth()
onMounted(() => initAuth())
</script>