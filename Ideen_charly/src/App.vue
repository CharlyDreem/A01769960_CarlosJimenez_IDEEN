<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  
  <v-layout>
      
    <v-main>
      <RouterView />
    </v-main>

  </v-layout>
</template>

<style scoped>
.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}
</style>
