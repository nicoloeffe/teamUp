<template>
  <div class="custom">
    <div class="flex flex-col items-center justify-center ch">
      <div class="w-full max-w-md p-4 bg-green-500 rounded-lg shadow-md">
        <div v-for="campo in campos" :key="campo._id" class="bg-white rounded-lg pt-4 my-2">
          <div class="font-bold container" style="text-transform: capitalize;">
            <img src="../images/field.svg" alt="field" width="300">
            <button @click.prevent= "this.nome = campo.nome, fetchOrari()"
              class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-base px-5 my-2 text-center dark:bg-green-600 fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">
              {{ campo.nome }}</button>
          </div>
          <div v-if="campo.nome === this.gCampo.nome" >
            <li v-for="prenotazioni in this.gCampo.prenotazioni" :key="prenotazioni._id"> {{ prenotazioni.orario }} </li>
          </div>          
        </div>
      </div>
    </div>  
  </div>
  </template>
  
  <script>
  import { config } from "@/config";
  
  export default {
    data() {
      return {
        campos: [], // Initialize an empty array for campos
        datiOrari: {
          nome: "",
          data: "2023-05-03"
        },
        gCampo: [],
      };
    },
    mounted() {
      this.fetchCampos(); // Call the method to fetch campos when the component is mounted
    },
    methods: {
      async fetchCampos() {
        try {
          console.log("trying to process request");
          const res = await fetch(`${config.BASE_URL}/campi/getcampi`);
          const data = await res.json();
          console.log(data);
          this.campos = data.findCampo; // Set the fetched campos data to the component's data property
        } catch (error) {
          console.error(error);
        }
      },
      async fetchOrari(){
        const datiOrari = {
          nome: this.nome,
          data: this.datiOrari.data
        };

        const opzioniRichiesta = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datiOrari),
        };

        try{
          console.log("trying to process request " + datiOrari.nome);

          const res = await fetch(`${config.BASE_URL}/campi/getorari`, opzioniRichiesta);
          const data = await res.json();

          if (data.success) {
            console.log("riuscito")
            console.log(data.findCampo.prenotazioni)
            this.gCampo = data.findCampo
            console.log(this.gCampo.nome)
            data.findCampo.prenotazioni.forEach(element => {
              console.log(element.orario)
            });
          }
        } catch(error){
          console.error(error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .custom{
    background-image: url("../images/sfondo.jpeg");
    background-size: cover;
    background-position:center;
    resize: both;
  }
  .ch{
    min-height: 90vh;
  }
</style>
  