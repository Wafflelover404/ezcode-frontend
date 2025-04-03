import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import CourseSelection from '../components/CourseSelection.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/courses', component: CourseSelection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;