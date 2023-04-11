<script setup>
import { ref, onMounted } from 'vue'
import DatosEstud from '../components/DatosEstud.vue'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {getStorage ,ref as reffire, getDownloadURL} from "firebase/storage"
import router from '../router';

const nam = ref("")
const mat = ref("")
const cori = ref("")
const corp = ref("")
const carr = ref("")
const ima = ref("")

const firebaseConfig = {
  apiKey: "AIzaSyBZqFZLmgRgb7DZO7G3LU2vFpnn4aaGK-w",
  authDomain: "ideen-charly.firebaseapp.com",
  projectId: "ideen-charly",
  storageBucket: "ideen-charly.appspot.com",
  messagingSenderId: "707968411623",
  appId: "1:707968411623:web:c078fb2b15bdf85cbcbf42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



onMounted(async () =>{


const docRef = doc(db, "users", auth.currentUser.uid);
const docSnap = await getDoc(docRef);


if (docSnap.exists()) {
  
  // const nam=docSnap.data().name;
  nam.value =docSnap.data().name
  mat.value =docSnap.data().matricula
  cori.value =docSnap.data().correoinst
  corp.value =docSnap.data().correoper
  carr.value =docSnap.data().carrera
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

ima.value = await getDownloadURL(reffire(storage, "alumno.jpg"))

})


</script>

<template>
  <div>
    <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto" >
        <RouterLink class="whiteboton pa-4" to="/dashboard">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div>
      <v-btn class="link"  @click="logout"  icon="mdi-logout"></v-btn>
    </v-app-bar>

    <div class="container mt-14">
      <h1 class="text-center">INFORMACIÓN DEL ALUMNO</h1>
      <div class="text-center">
        <v-img :src="ima" alt="alumno" class="rounded-circle" cover />
      </div>
      <v-container class="mt-8">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <DatosEstud encabezado="Nombre Completo" :contenido="nam" />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <DatosEstud encabezado="Matrícula" :contenido="mat" />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <DatosEstud encabezado="Correo Institucional" :contenido="cori" />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <DatosEstud encabezado="Carrera" :contenido="carr" />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <DatosEstud encabezado="Correo Personal" :contenido="corp" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>


<script>

const firebaseConfig = {
  apiKey: "AIzaSyBZqFZLmgRgb7DZO7G3LU2vFpnn4aaGK-w",
  authDomain: "ideen-charly.firebaseapp.com",
  projectId: "ideen-charly",
  storageBucket: "ideen-charly.appspot.com",
  messagingSenderId: "707968411623",
  appId: "1:707968411623:web:c078fb2b15bdf85cbcbf42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default{
  methods: {
    async logout () {
      signOut(auth)
      router.push("/")      
}}}
</script>
<style scoped>
h1 {
  text-align: center;
  color: var(--azul);
}

.icono {
  aspect-ratio: 1;
  border-radius: 100000px;
  margin: 2rem auto;
  max-width: 16rem;
  overflow: hidden;
}

.contenido {
  max-width: 40rem;
}

.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}


.link {
  max-width: 2.5rem;
}

</style>
