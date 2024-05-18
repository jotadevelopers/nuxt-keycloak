export default function () {
  const { $keycloak } = useNuxtApp()
  const isAuthenticated = $keycloak.authenticated
  const login = $keycloak.login
  const logout = $keycloak.logout
  return {
    isAuthenticated,
    login,
    logout,
  }
}
