<script setup>


import {ref} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import axios from '../axios';

const router = useRouter();
const route = useRoute();


const postId = route.params.id

const title = ref('');
const text = ref('');
const file = ref(null);


const errorMsg = ref('');
const image_url = ref('');




const apiPostIdUrl = import.meta.env.VITE_API_URL + '/posts/' + postId;
axios({
  method: 'get',
  url: apiPostIdUrl,
}).then(function(r) {
  const post = r.data
  title.value=  post.title
  text.value=  post.text
  image_url.value=  post.image_url


}).catch(function(response) {
  console.log(response);
});






function onFileChanged($event) {
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];
    image_url.value = URL.createObjectURL(file.value);

    /**
     * Fix bug with the footer going up
     */
    window.scrollTo(0, 0);
  }
}

function handleForm() {

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('text', text.value);
  formData.append('image', file.value);

  const headers = {};
  const token = localStorage.getItem('bearerToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  fetch(apiPostIdUrl, {
    method: 'put',
    body: formData,
    headers,
  })
    .then(async function(r) {
      const jsonData = await r.json();
      if ('success' === jsonData.type) {
        router.push({name: 'posts'});
      } else {
        errorMsg.value = jsonData.publicMessage;
      }

    }).catch(function(error) {
    errorMsg.value = error;
  });

}

</script>

<template>

<div class="formpage">


  <form>
    <h1>Modifier un post</h1>
    <div class="form-control">
      <input type="text" id="id-title" placeholder="Titre" v-model="title" />
    </div>

    <div class="form-control">
      <textarea id="id-text" v-model="text" placeholder="Ecrivez un message..."></textarea>
    </div>

    <div class="form-control">
      <input type="file" id="id-image"
             @change="onFileChanged($event)"
             accept="image/*"
             capture
      />
      <div class="img-preview">
        <img :src="image_url" alt="">
      </div>
    </div>


    <button type="submit" className="button-all" @click.prevent="handleForm()">Mettre à jour</button>
  </form>
</div>
</template>
