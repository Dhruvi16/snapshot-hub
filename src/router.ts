import Create from '@/views/Create.vue';
import Proposal from '@/views/Proposal.vue';
import Proposals from '@/views/Proposals.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/dapp/:id', name: 'dapp', component: Proposal },
  { path: '/create', name: 'create', component: Create },
  { path: '/', name: 'dapps', component: Proposals },
  // { path: '/', name: 'home', component: Home },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
