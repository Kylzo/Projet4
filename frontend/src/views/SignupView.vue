<script setup>

import axios from '@/axios.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router/dist/vue-router';
import { useUserStore } from '../stores/user';


const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const firstname = ref('')
const lastname = ref('')


function handleForm() {

    const apiUrl = import.meta.env.VITE_API_URL + '/auth/signup';
    const payload = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
    };



    axios(
        {
            method: 'post',
            url: apiUrl,
            data: payload,
        }
    ).then(function (r) {
        router.push({ name: 'login' });
    }
    ).catch(function (response) {
        errorMsg.value = response.data.error;
    });
}

</script>
    
<template>
    <div class="formpage">
        <form>

            <p class="error" v-if="errorMsg">{{ errorMsg }}</p>

            <div class="form-control">
                <input id="id-firstname" type="text" placeholder="Prénom*" v-model="firstname">
            </div>

            <div class="form-control">
                <input id="id-lastname" type="text" placeholder="Nom*" v-model="lastname">
            </div>

            <div class="form-control">
                <input id="id-email" type="email" placeholder="Adresse e-mail*" v-model="email">
            </div>

            <div class="form-control">
                <input id="id-password" type="password" placeholder="Mot de passe*" v-model="password">
            </div>

            <div>
                <button type="submit" class="button-signup" @click.prevent="handleForm()">S'inscrire</button>
            </div>

        </form>
    </div>
</template>
    