<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const title = ref('');
const text = ref('');
const file = ref(null);
const errorMsg = ref('');
const image_url = ref('');
const firstname = ref('');

function onFileChanged($event) {
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];
    image_url.value = URL.createObjectURL(file.value);
    window.scrollTo(0, 0);
  }
}

function handleForm() {

  const apiUrl = import.meta.env.VITE_API_URL + '/posts';

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('text', text.value);
  formData.append('image', file.value);
  formData.append('firstname', firstname.value);


  const headers = {};
  const token = localStorage.getItem('bearerToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  fetch(apiUrl, {
    method: 'post',
    body: formData,
    headers,
  })
    .then(async function (r) {
      const jsonData = await r.json();
      if ('success' === jsonData.type) {
        router.push({ name: 'posts' });
      } else {
        errorMsg.value = jsonData.publicMessage;
      }

    }).catch(function (error) {
      errorMsg.value = error;
    });

}

</script>

<template>

  <div class="formpage">


    <form>

      <h1>Créer un post</h1>

      <div class="form-control">
        <input type="text" id="id-title" placeholder="Titre" v-model="title" />
      </div>

      <div class="form-control">
        <input type="text" id="id-firstname" placeholder="Prénom" v-model="firstname" />
      </div>

      <div class="form-control">
        <textarea id="id-text" v-model="text" placeholder="Ecrivez un message...">
      </textarea>
      </div>

      <div class="form-control">
        <input type="file" id="id-image" @change="onFileChanged($event)" accept="image/*" capture />
        <div class="img-preview">
          <img :src="image_url" alt="">
        </div>
      </div>


      <button type="submit" className="button-all" @click.prevent="handleForm()">Envoyer</button>
    </form>
  </div>
</template>
