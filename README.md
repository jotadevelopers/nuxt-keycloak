# Nuxt Keycloak

This is a Keycloak module for Nuxt

## Features

- Nuxt 3 ready
- Vue 3 composables
- Keycloak client side authentication support
- Use keycloak-js client
- TypeScript support

## Usage

1. Add nuxt-keycloak depedence to your project:

`yarn add @jotadevelopers/nuxt-keycloak`

2. Then, add nuxt-keycloak to the modules section of your Nuxt configuration:

```bash
export default defineNuxtConfig({
    modules: ['@jotadevelopers/nuxt-keycloak'],
    keycloak: {
        url: '<keycloak-url>',
        realm: '<keycloak-realm-name>',
        clientId: '<keycloack-client-id>',
        # url to exclude from authentication check
        redirectOptions: {
            exclude: ['/'],
        },
    },
...
})

```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Prepare development server using `yarn dev:prepare` or `npm run dev:prepare`
4. Build module using `yarn build` or `npm run build`
5. Launch keycloak in docker container `docker compose up`
6. Launch playground using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)
