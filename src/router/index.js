import Vue from 'vue';
import VueRouter from 'vue-router';
import Log from '../views/Log.vue';

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'Log',
      component: Log,
   },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
