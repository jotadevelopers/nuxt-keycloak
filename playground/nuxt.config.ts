export default defineNuxtConfig({
  modules: ['../src/module'],
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'myrealm',
    clientId: 'my-client',
    redirectOptions: {
      exclude: ['/'],
    },
  },
  devtools: { enabled: true },
})
