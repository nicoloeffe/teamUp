<template>
  <div>
    <LogoBar/>
    <RegistrationForm/>
  </div>
</template>



<script>
import { defineComponent } from 'vue'
import LogoBar from '../components/LogoBar.vue'
import RegistrationForm from '../components/RegistrationForm.vue'

export default defineComponent({
  name:"RegistrationView",
  components:{
    LogoBar,
    RegistrationForm
  }
    
})
</script>
