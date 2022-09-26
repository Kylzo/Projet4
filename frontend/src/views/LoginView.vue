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

function handleForm() {

  const apiUrl = import.meta.env.VITE_API_URL + '/auth/login';

  const payload = {
    email: email.value,
    password: password.value,
  };

  axios({
    method: 'post',
    url: apiUrl,
    data: payload,
  }).then(function (r) {
    userStore.login(r.data);
    localStorage.setItem('bearerToken', r.data.token);
    localStorage.setItem('userId', r.data.user_id);
    localStorage.setItem('is_admin', r.data.is_admin);

    /**
     * make sure axios is aware of it, so that we can directly delete post for instance,
     * without reloading the page
     */
    axios.defaults.headers = {
      'Authorization': `Bearer ${r.data.token}`,
    };
    router.push({ name: 'posts' });
  }).catch(function (response) {
    errorMsg.value = response.data.error;
  });

}

</script>

<template>
  <div class="formpage">
    <form>

      <p class="error" v-if="errorMsg">{{ errorMsg }}</p>


      <div class="form-control">
        <input id="id-email" type="text" placeholder="Adresse e-mail" v-model="email">
      </div>

      <div class="form-control">
        <input id="id-password" type="password" placeholder="Mot de passe" v-model="password">
      </div>

      <div>
        <button type="submit" className="button-login" @click.prevent="handleForm()">Se connecter</button>
      </div>

    </form>
  </div>
</template>
