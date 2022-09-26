<script setup>

import { RouterLink } from 'vue-router';
import axios from '@/axios.js';
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia/dist/pinia';


const apiUrl = import.meta.env.VITE_API_URL + '/posts';
const userStore = useUserStore();
const { isLoggedIn, userId, isAdmin } = storeToRefs(userStore);
const posts = ref([]);


function refresh() {

  axios({
    method: 'get',
    url: apiUrl,
  }).then(function (r) {
    posts.value = r.data;
  }).catch(function (response) {
    console.log(response);
  });
}

refresh();

function deletePost(id) {
  if (window.confirm('Voulez-vous vraiment supprimer ce post ?')) {

    const apiDeleteUrl = import.meta.env.VITE_API_URL + '/posts/' + id;
    axios({
      method: 'delete',
      url: apiDeleteUrl,
    }).then(function (r) {
      posts.value = posts.value.filter(item => item._id !== id);
    }).catch(function (response) {
      console.log(response);
    });
  }
}

function likePost(id) {
  const apiLikeUrl = import.meta.env.VITE_API_URL + '/posts/' + id + '/like';
  axios({
    method: 'post',
    url: apiLikeUrl,
  }).then(function (r) {
    refresh();

  }).catch(function (response) {
    alert(response.data.publicMessage);
  });
}


</script>

<template>
  <div class="postpage">


    <div class="posts-topbar" v-if="isLoggedIn">
      <button className="button-all" @click="$router.push({name: 'createPost'})">Publier</button>
    </div>


    <div class="posts-container">
      <div class="post-item" v-for="post in posts" :key="post._id">

        <h4>{{ post.title }}</h4>
        <hr>
        <p class="text">
          {{ post.text }}
        </p>
        <img v-if="post.image_url" :src="post.image_url" :alt="post.title" :title="post.title">


        <div class="likebar" v-if="post.likes > 0">
          <i class="fas fa-thumbs-up"></i> {{ post.likes }}
        </div>

        <div class="post-item-footer">
          <button v-if="!post.users_liked.includes(userId)" @click.prevent="likePost(post._id)" class="like-button">
            <i class="fas fa-thumbs-up"></i>
            J'aime !
          </button>



          <span class="mlauto">{{post.firstname + " " + "le" + " " + post.date_creation.slice(0, 19).replace('T', ' ')
          }}</span>
        </div>

        <div class="post-item-actions" v-if="post.user_id === userId || isAdmin">

          <a href="#" @click.prevent="deletePost(post._id)"><i class="fas fa-trash" title="Supprimer"></i></a>

          <RouterLink :to="{name: 'editPost', params: {id: post._id}}"><i class="fas fa-pen" title="Modifier"></i>
          </RouterLink>

        </div>


      </div>
    </div>
  </div>
</template>
