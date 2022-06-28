import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue';
import Error404View from "../views/error/Error404View.vue";
import CustomerListView from "../views/customer/CustomerListView.vue";
import CustomerDetailView from "../views/customer/CustomerDetailView.vue";
import TeknisiListView from "../views/teknisi/TeknisiListView.vue";
import TeknisiDetailView from "../views/teknisi/TeknisiDetailView.vue";
import ServiceListView from "../views/service/ServiceListView.vue";
import ServiceDetailView from "../views/service/ServiceDetailView.vue";
import SupplieriListView from "../views/supplier/SupplieriListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerListView,
      meta: {
        title: 'Customer list'
      }
    },
    {
      path: '/customer/:id_customer',
      name: 'customer-detail',
      component: CustomerDetailView,
      meta: {
        title: 'Customer detail'
      }
    },
    {
      path: '/teknisi',
      name: 'teknisi',
      component: TeknisiListView,
      meta: {
        title: 'Teknisi list'
      }
    },
    {
      path: '/teknisi/:id_teknisi',
      name: 'teknisi-detail',
      component: TeknisiDetailView,
      meta: {
        title: 'Teknisi detail'
      }
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceListView,
      meta: {
        title: 'service list'
      }
    },
    {
      path: '/service/:kode',
      name: 'service-detail',
      component: ServiceDetailView,
      meta: {
        title: 'service detail'
      }
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: SupplieriListView,
      meta: {
        title: 'supplier list'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: Error404View,
      meta: {
        title: 'Error 404'
      }
    },
  ]
})

export default router
