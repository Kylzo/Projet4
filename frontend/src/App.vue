<script setup>
import {RouterLink, RouterView} from 'vue-router';
import {useUserStore} from './stores/user';
import { storeToRefs } from 'pinia';


const store = useUserStore();
const { isLoggedIn, isAdmin } = storeToRefs(store);


function logout(){
  store.logout()
}


</script>

<template>
<div class="site">
  <header>

    <RouterLink to="/">
      <img alt="groupomania logo"
           class="logo"
           src="@/assets/icon-left-font.png"
      />

      <span class="admin-account" v-if="isAdmin">Admin</span>

    </RouterLink>

    <RouterLink to="/posts"><i class="fas fa-home" title="Accueil"></i></RouterLink>
    
    <nav>
      
      <RouterLink v-if="isLoggedIn" @click="logout()" to="/login" title="Déconnexion" class="test">[ <i class="fas fa-arrow-right"></i></RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">Se connecter</RouterLink>
      <RouterLink class="signup" v-if="!isLoggedIn" to="/register">S'inscrire</RouterLink>
    </nav>
  </header>


  <main>
    <RouterView />
  </main>


</div>
</template>

<style scoped>

</style>
