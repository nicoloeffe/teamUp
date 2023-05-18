<template>
    <LoginForm/>
</template>

<script>
import LoginForm from "../components/LoginForm.vue"
import {defineComponent} from 'vue';
export default defineComponent({
    name:"LoginView",
    components: {
        LoginForm

    }
})

</script>