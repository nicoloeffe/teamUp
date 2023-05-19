<template>
    <div >
      <NavBar />
      <PrenotazioneForm />
    </div>
  </template>
  
  <script>
  import PrenotazioneForm from '@/components/PrenotazioneForm.vue';  
  import NavBar from '@/components/NavBar.vue'
  
  export default {
    components: {
      PrenotazioneForm,      
      NavBar
    },
  };
  </script>
  