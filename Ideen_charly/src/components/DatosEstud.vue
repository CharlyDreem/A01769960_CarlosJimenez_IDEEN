<script setup>
defineProps({
  encabezado: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h3>{{ encabezado }}</h3>
  <p>{{ contenido }}</p>
</template>

<style scoped>
h3,
p {
  font-size: 1.5rem;
  font-weight: bold;
}

h3 {
  color: var(--azul);
}

p {
  color: var(--gris);
}
</style>
