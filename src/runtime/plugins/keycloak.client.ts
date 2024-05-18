import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import Keycloak, { type KeycloakOnLoad } from 'keycloak-js'

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
      onLoad: runtimeConfig.public.keycloak.onLoad as KeycloakOnLoad,
    })

    keycloak.updateToken(2000)
    return {
      provide: {
        keycloak,
      },
    }
  },
})
