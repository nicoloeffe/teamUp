<style scoped>
.custom {
  background-image: url("../images/sfondo.jpeg");
  background-size: cover;
  background-position: center;
  resize: both;
}
</style>
<template>
  <div class="custom">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-6 bg-green-500 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold text-center text-white">Prenotazione</h2>

        <form class="mt-6 bg-white rounded-lg p-4 ">
          <div>
            <label class="block text-gray-700 font-bold mb-2" for="nome">
              Nome
            </label>
            <input
              class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
              id="username" type="text" placeholder="Inserisci il tuo nome" />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 font-bold mb-2" for="cognome">
              cognome
            </label>
            <input
              class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
              id="cognome" type="cognome" placeholder="Inserisci il tuo cognome" />
          </div>
          <div class="container flex">
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2" for="date">
                Data
              </label>
              <input
                class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
                id="date" type="date" placeholder="Inserisci il tuo cognome" />
            </div>
            <div class="flex-grow"></div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2" for="time">
                Orario
              </label>
              <input
                class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
                id="time" type="time" placeholder="Inserisci il tuo cognome" />
            </div>
          </div>
          <button type="submit"
            class="mt-6 text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-base px-5 py-2 text-center dark:bg-green-600 fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">
            Prenota</button>

        </form>
      </div>
    </div>
  </div>

  <ul id="bookingList"></ul>
</template>
  
<script>
export default {
  methods: {
    async inviaPrenotazione() {
      const datiPrenotazione = {
        // Raccogli i dati necessari per la prenotazione dagli input del form
        utenteId: this.utenteId,
        dataPrenotazione: this.dataPrenotazione,
        oraPrenotazione: this.oraPrenotazione,
      };

      try {
        const response = await fetch('/api/prenotazioni', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datiPrenotazione),
        });

        if (!response.ok) {
          throw new Error('Impossibile inviare la prenotazione.');
        }

        // Prenotazione inviata con successo, esegui le azioni necessarie
      } catch (errore) {
        console.error(errore);
        // Gestisci l'errore, visualizza un messaggio, ecc.
      }
    },
  },
};
</script>
  