<style scoped>
  .custom{
    background-image: url("../images/sfondo.jpeg");
    background-size: cover;
    background-position:center;
    resize: both;
  }
</style>
<template>
  <body>
    <div class="custom">
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-6 bg-green-500 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-white">Registrati</h2>
          <form class="mt-6">
            <div>
              <label class="block text-gray-700 font-bold mb-2 text-white" for="username">
                Nome utente
              </label>
              <input v-model="this.user.nomeUtente" class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="username" type="text" placeholder="Inserisci il tuo nome utente" />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2 text-white" for="email">
                Email
              </label>
              <input v-model="this.user.email" class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="email" type="email" placeholder="Inserisci la tua email" />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2 text-white" for="password">
                Password
              </label>
              <input  v-model="this.user.password" class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="password" type="password" placeholder="Inserisci la tua password" />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2 text-white" for="password-confirm">
                Conferma password
              </label>
              <input class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="password-confirm" type="password" placeholder="Inserisci di nuovo la tua password" />
            </div>
            <div class="mt-6">
              <button  class="w-full px-4 py-2 text-lg font-bold text-green-500 bg-white rounded-lg shadow-md hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"  @click= "signin()">
                Registrati
              </button>
            </div>
          </form>
          <hr class="my-6 border-gray-300 w-full" />
          <p class="mt-8 text-center">
            Hai già un account? <a class="text-green-500 hover:text-green-700 font-semibold" href="#">Accedi</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'SignUp',
    data(){
      return{
        user:{
          email:"mariorossi@gmail.com",
          password:"mariorossi",
          nomeUtente:"mario"
        },
        error:{
          status: false,
          message:"default error message"
        }
      }
    },
    methods:{
      async signin(){
        
        const opzioniRichiesta={
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.user)
        }
        console.log(opzioniRichiesta)
        try{
            const res=await fetch('http://localhost:8080/signin',opzioniRichiesta);
            const data= await res.json();

            if(data.success){
              console.log(data.message);
            }
            else{
              this.error.status=true;
              this.error.message= data?.error || data?.message || "Unexpected error"
            }
        }catch(error){
          this.error.status=true;
          this.error.message= error;
          console.log(this.error.message)
        }
      },
      log(){console.log("pressed")}
    }
  })
</script>