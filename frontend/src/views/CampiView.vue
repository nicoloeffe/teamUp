<template>
    <div >
        <NavBar/>
        <CampiPage/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import NavBar from '@/components/NavBar.vue'
  import CampiPage from '@/components/CampiPage.vue';
  
  export default {
    name: 'CampiView',
    components: {
      NavBar, 
      CampiPage,
    },
    
  }
  </script>