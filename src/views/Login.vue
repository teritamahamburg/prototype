<template>
  <div class="wrapper">
    <v-card>
      <v-card-title class="headline">
        Sign in
      </v-card-title>

      <v-card-text class="content">
        <v-btn color="success">
          Login with google
        </v-btn>
        <v-btn raised @click="$router.push('/home')">
          Guest Login
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
