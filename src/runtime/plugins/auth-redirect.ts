import { addRouteMiddleware, defineNuxtPlugin, defineNuxtRouteMiddleware } from '#imports'
import type { RouteLocationNormalized } from '#vue-router'
import useAuth from '../composables/useAuth'
export default defineNuxtPlugin({
  name: 'auth-middleware',
  setup() {
    addRouteMiddleware(
      'global-auth',
      defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
        const config = useRuntimeConfig().public.keycloak

        //Do not redirect on excluded routes
        const isExcluded = config.redirectOptions.exclude.some(path => {
          const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
          return regex.test(to.path)
        })

        if (isExcluded) return

        if (process.client) {
          const { isAuthenticated, login } = useAuth()
          if (!isAuthenticated) {
            await login()
          }
        }
      }),
      { global: true },
    )
  },
})
