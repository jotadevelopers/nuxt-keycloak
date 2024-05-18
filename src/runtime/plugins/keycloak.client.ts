import { defineNuxtPlugin, useRuntimeConfig, useCookie } from '#imports'
import Keycloak from 'keycloak-js'

export default defineNuxtPlugin({
  name: 'nuxt-keycloak',
  enforce: 'pre',
  async setup() {
    const runtimeConfig = useRuntimeConfig()
    const keycloak = new Keycloak({
      url: runtimeConfig.public.keycloak.url,
      realm: runtimeConfig.public.keycloak.realm,
      clientId: runtimeConfig.public.keycloak.clientId,
    })
    await keycloak.init({
      onLoad: runtimeConfig.public.keycloak.onLoad,
    })

    keycloak.updateToken(2000)
    return {
      provide: {
        keycloak,
      },
    }
  },
})
