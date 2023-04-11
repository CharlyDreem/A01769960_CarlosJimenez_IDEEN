<template>
  <v-app>
    <v-app-bar app color="#384FFE" dark>
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer></v-spacer>
      <div>
        <RouterLink class="whiteboton" to="/dashboard">INICIO</RouterLink>
        <RouterLink class="whiteboton" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div>
      <v-btn class="link" @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <h1 class="mt-8 text-center">MATERIAS INSCRITAS</h1>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8">
            <div class="my-8">
              <DatosMat
                v-for="(materia, i) in materias"
                :key="i"
                v-bind="materia"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DatosMat from '../components/DatosMat.vue'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import router from '../router';

const firebaseConfig = {
  apiKey: "AIzaSyBZqFZLmgRgb7DZO7G3LU2vFpnn4aaGK-w",
  authDomain: "ideen-charly.firebaseapp.com",
  projectId: "ideen-charly",
  storageBucket: "ideen-charly.appspot.com",
  messagingSenderId: "707968411623",
  appId: "1:707968411623:web:c078fb2b15bdf85cbcbf42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const materias = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "materias"));
  const dbt = []
  querySnapshot.forEach((doc) => {
    dbt.push(doc.data())
  });
  materias.value = dbt;
})

const logout = async () => {
  signOut(auth)
  router.push("/")
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(--azul);
}

.whiteboton {
  font-weight: bold;
  color: white;
  margin-left: 1rem;
}

.logo {
  max-width: 10rem;
}

</style>
