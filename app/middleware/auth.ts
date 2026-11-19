import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { user, initAuth } = useAuth()
  initAuth()

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})