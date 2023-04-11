<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  nombre: {
    type: String,
    required: true
  },
  profe: {
    type: String,
    required: true
  },
  salon: {
    type: String
  },
  dia: {
    type: String
  },
  hora: {
    type: String
  }
})

let dialog = ref(false)
</script>

<template>
  <v-sheet class="pa-6 mx-auto my-14" max-width="720" elevation="2" rounded="xl">
    <h3>{{ nombre }}</h3>
    <p>Profesor: {{ profe }}</p>
    <v-row class="dialog_row">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn
            class="details font-weight-bold text-capitalize text-h6"
            color="#384FFE"
            variant="text"
            v-bind="props"
            >Ver detalles</v-btn
          >
        </template>
        <v-sheet class="pa-12 mx-auto" width="100%" max-width="600" elevation="2" rounded="xl">
          <h3 class="dialog_title">{{ nombre }}</h3>
          <div class="dialog_info">
            <p>Profesor: {{ profe }}</p>
            <p>Salón: {{ salon }}</p>
            <p>Días: {{ dia }}</p>
            <p>Horario: {{ hora }}</p>
          </div>
          <v-row>
            <v-spacer />
            <v-btn
              class="font-weight-bold text-h6"
              color="#384FFE"
              variant="text"
              @click="dialog = false"
              >CERRAR</v-btn
            >
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-row>
  </v-sheet>
</template>

<style scoped>
.dialog_row {
  margin-top: 1rem;
}

.dialog_title {
  text-align: center;
  font-size: 2rem;
}

.dialog_info {
  margin: 2rem 0 3rem 0;
}

.dialog_info p {
  margin: 0.25rem 0;
}

p {
  font-size: 1.2rem;
  color: var(--gris);
  font-weight: bold;
}

h3 {
  font-size: 1.2rem;
  color: var(--azul);
}

@media screen and (min-width: 960px) {
  .dialog_row {
    margin-top: 0;
  }

  .details {
    font-size: 1.2rem;
  }

  .dialog_title {
    font-size: 2rem;
  }

  .dialog_info p {
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
