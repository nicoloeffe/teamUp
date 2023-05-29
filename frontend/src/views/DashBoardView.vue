<template>
    <div >
        <NavBar/>
        <DashBoard/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import NavBar from '@/components/NavBar.vue'
  import DashBoard from '@/components/DashBoard.vue';
  
  export default {
    name: 'DashBoardView',
    components: {
      NavBar, 
      DashBoard,
    },
    
  }
  </script>