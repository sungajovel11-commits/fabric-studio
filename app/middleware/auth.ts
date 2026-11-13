import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { user, initAuth } = useAuth()
  initAuth()

  const isAuthenticated = Boolean(user.value)

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})