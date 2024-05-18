import { defineNuxtModule, createResolver, addPlugin, addImportsDir } from '@nuxt/kit'
import defu from 'defu'
import type { KeycloakOnLoad } from 'keycloak-js'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Keycloak URL
   * @default process.env.KEYCLOAK_URL
   * @example 'https://*.mydomain.com'
   * @type string
   * @docs https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   */
  url: string

  /**
   * Keycloak realm
   * @default process.env.KEYCLOAK_REALM
   * @example 'myrealm'
   * @type string
   * @docs https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   */
  realm: string

  /**
   * Keycloak realm client-id
   * @default process.env.KEYCLOAK_CLIENT_ID
   * @example 'client-id'
   * @type string
   * @docs https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   */
  clientId: string

  /**
   * To authenticate, you call the login function. Two options exist to make the adapter automatically authenticate. You can pass login-required or check-sso
   * @default process.env.KEYCLOAK_ON_LOAD
   * @example 'login-required'
   * @type KeycloakOnLoad
   * @docs https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   */
  onLoad: KeycloakOnLoad
  /**
   * Redirection options, set routes to skip in authenticate
   * @default
   * {
      exclude: [],
    }
   */
  redirectOptions: { exclude?: string[] }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@jotadevelopers/nuxt-keycloak',
    configKey: 'keycloak',
    compatibility: { nuxt: '^3.0.0' },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    url: process.env.KEYCLOAK_URL as string,
    realm: process.env.KEYCLOAK_REALM as string,
    clientId: process.env.KEYCLOAK_CLIENT_ID as string,
    onLoad: (process.env.KEYCLOAK_ON_LOAD as KeycloakOnLoad) ?? 'check-sso',
    redirectOptions: { exclude: [] },
  },
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    //Public runtimeConfig
    _nuxt.options.runtimeConfig.public.keycloak = defu(_nuxt.options.runtimeConfig.public.keycloak, {
      url: _options.url,
      realm: _options.realm,
      clientId: _options.clientId,
      onLoad: _options.onLoad,
      redirectOptions: _options.redirectOptions,
    })

    //Make sure the required configs are configured
    if (!_nuxt.options.runtimeConfig.public.keycloak.url) {
      console.warn('Missing keycloak url, set it either in `nuxt.config.js` or via env variable')
    }
    if (!_nuxt.options.runtimeConfig.public.keycloak.realm) {
      console.warn('Missing keycloak realm, set it either in `nuxt.config.js` or via env variable')
    }
    if (!_nuxt.options.runtimeConfig.public.keycloak.clientId) {
      console.warn('Missing keycloak clientId, set it either in `nuxt.config.js` or via env variable')
    }

    addPlugin(resolve('./runtime/plugins/keycloak.client.ts'))
    addPlugin(resolve('./runtime/plugins/auth-redirect.ts'))

    addImportsDir(resolve('./runtime/composables'))
  },
})
