import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import AdminDashboard from './views/AdminDashboard.vue';
import FlowList from './components/FlowList.vue';
import Person from './components/Person.vue';
import Map from './components/Map.vue';
import Cabinet from './components/Cabinet.vue';
import Item from './components/Item.vue';
import Feed from './components/Feed.vue';
import Control from './components/Control.vue';
import Login from './views/Login.vue';
import FlowWizard from './views/FlowWizard.vue';
import FlowSelect from './components/FlowSelect.vue';
import FlowDescribe from './components/FlowDescribe.vue';
import FlowEdit from './components/FlowEdit.vue';
import Flow from './components/Flow.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
    },
    {
      path: '/plan/:id/edit',
      component: FlowEdit,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        { path: '', components: { view: FlowList } },
        { path: '/plan/:id', components: { view: Flow } },
        { path: '', components: { view: FlowList } },
        { path: '/person', components: { view: Person } },
        { path: '/map', components: { view: Map } },
        { path: '/cabinet', components: { view: Cabinet } },
        { path: '/item', components: { view: Item } },
        { path: '/feed', components: { view: Feed } },
        { path: '/control', components: { view: Control } },
        { path: '/flow', components: { view: Flow } },
        // { path: 'flow', components: { 'view': Flow } },
      ],
    },
    // {
    //   path: '/op/dashboard',
    //   name: 'admin-dashboard',
    //   component: AdminDashboard,
    //   children: [
    //     { path: '', components: { view: FlowList } },
    //     { path: '/person', components: { view: Person } },
    //     { path: '/map', components: { view: Map } },
    //     { path: '/cabinet', components: { view: Cabinet } },
    //     { path: '/item', components: { view: Item } },
    //     { path: '/feed', components: { view: Feed } },
    //     { path: '/control', components: { view: Control } },
    //     { path: '/flow', components: { view: Flow } },
    //   ],
    // },
    {
      path: '/plan-wizard',
      name: 'plan-wizard',
      component: FlowWizard,
      children: [
        { path: '', redirect: 'select' },
        { path: 'select', components: { step: FlowSelect } },
        { path: 'describe', components: { step: FlowDescribe } },
        { path: 'edit', components: { step: FlowEdit } },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        isPublic: true,
      },
      component: Login,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
});
