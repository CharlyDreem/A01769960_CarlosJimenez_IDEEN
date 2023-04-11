<script setup>
//import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import router from '../router';
</script>

<template>
  <v-app>
    <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div>
    </v-app-bar>

    <v-main>
      <div style="padding: 1rem;">
        <h1>REGÍSTRATE</h1>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <v-form ref="form" v-model="valid" @submit.prevent="submitcuenta">
                    <v-text-field v-model="cuenta.name" :rules="nameRules" label="Nombre Completo"
                      placeholder="Nombre Completo" type="name" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.matricula" :rules="matriculaRules" label="Matricula"
                      placeholder="A0XXXXXXX" type="matricula" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.correoinst" :rules="emailRules"
                      label="Correo institucional" placeholder="A0XXXXXXX@tec.mx" type="email" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.correoper" :rules="emailRules2" label="Correo personal"
                      placeholder="example@mail.com" type="email" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.carrera" :rules="carreraRules" label="Carrera"
                      placeholder="ITC,IBT,IMT,etc..." type="career" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.contra1" :rules="passwordRules" label="Contraseña"
                      type="password" variant="outlined"></v-text-field>

                    <v-text-field v-model="cuenta.contra2"
                      :rules="[v => !!v || 'Campo obligatorio', v => v.length >= 6 || 'Necesitas 6 caracteres', v => v === cuenta.contra1 || 'La contraseña no coincide']"
                      label="Confirmar contraseña" type="password" variant="outlined"></v-text-field>

                    <v-checkbox v-model="cuenta.terminos" label="Acepto términos y condiciones" color="success"
                      :rules="condiciones" style="padding-left: 1rem;"></v-checkbox>

                    <v-btn block size="large" type="submit" variant="elevated" @click="submitcuenta"
                      style="background-color: var(--azul); color: white;">
                      Inicia sesión
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
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
const db = getFirestore(app);

export default{
  data: () => ({
    valid: true,
    cuenta :{
      name: "",
      matricula: "",
      correoinst: "",
      correoper: "",
      carrera: "",
      contra1: "",
      contra2: "",
      terminos: " "
    },
    nameRules: [
    v => !!v || 'Campo obligatorio',
    ],
    matriculaRules: [
    v => !!v || 'Campo obligatorio',
    v => v.length == 9 || 'Matricula no valida',
    ],
    emailRules:[
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalido'
      },
      v => !!v || 'Campo obligatorio',
    ],
    emailRules2:[
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalido'
      },
      v => !!v || 'Campo obligatorio',
    ],
    carreraRules:[
      v => !!v || 'Campo obligatorio',
      v => v.length == 3 || "Clave de carrera inválida"
    ],
    passwordRules: [
    v => !!v || 'Campo obligatorio', 
    v => v.length >= 6 || 'Necesitas 6 caracteres',
    ],
    condiciones: [
    v => v || "Acepta los términos y condiciones"
    ]
  }),

  methods: {
    async submitcuenta () {
      const { valid } = await this.$refs.form.validate()
       if (valid){
        createUserWithEmailAndPassword(auth, this.cuenta.correoinst, this.cuenta.contra1)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          setDoc(doc(db, "users", user), {
          name: this.cuenta.name,
          matricula: this.cuenta.matricula,
          correoper: this.cuenta.correoper,
          correoinst: this.cuenta.correoinst,
          carrera: this.cuenta.carrera
        }
        );
        router.push("/")
        })
       } 
      
    },
    
  },
}</script>

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
  max-width: 50rem;
}

.campo{
  max-width: 50rem;
}
.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}


</style>


