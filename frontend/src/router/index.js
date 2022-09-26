import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PostView from '../views/PostView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'
import SignupView from '../views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostView
    },
    {
      path: '/register',
      name: 'register',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/posts/create',
      name: 'createPost',
      component: CreatePostView
    },
    {
      path: '/posts/edit/:id',
      name: 'editPost',
      component: EditPostView
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostView
    },
  ]
})

export default router
