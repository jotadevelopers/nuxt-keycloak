<template>
    <div>
        <h1>This is a protected page</h1>
        <h3>Click above to logout</h3>
        <button @click="logout">logout</button>
    </div>
</template>
<script setup>
const logout = () => {
    const { logout } = useAuth();
    logout({ redirectUri: '/' })
}
</script>