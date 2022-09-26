<script setup>
defineProps({
  post: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

</script>

<template>
  <div class="post-card">
    <span>{{ post.firstname }}</span>
    <span>{{ post.date_creation }}</span>
    <h4>{{ post.title }}</h4>
    <p>{{ post.text }}</p>

  </div>
</template>