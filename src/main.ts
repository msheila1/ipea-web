import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'viewerjs/dist/viewer.css';
import 'offline-js/themes/offline-language-portuguese-brazil-indicator.css';
import 'offline-js/themes/offline-language-portuguese-brazil.css';
import 'highlight.js/styles/github.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';
import filters from './filters';
import './registerServiceWorker';
import { HttpStatusEnum, getStatusText } from '@/enums/http-status.enum';

// Configuração do Axios
const BASE_API = process.env.VUE_APP_BASE_API;
const HTTP = axios.create({
  baseURL: BASE_API,
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': BASE_API,
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

// Interceptador das Requisições
HTTP.interceptors.request.use(
  (config) => {
    return new Promise((resolve, reject) => {
      store.dispatch('auth/getToken')
        .then((token) => {
          config.headers.Authorization = 'Bearer ' + token;
          resolve(config);
        })
        .catch((error) => reject(error));
    });
  },
  (error) => {
    const err = !error.response ? error : error.response.data;

    if (!err.code) {
      err.code = HttpStatusEnum.INTERNAL_SERVER_ERROR;
      err.message = getStatusText(err.code);

    } else if (err.code === 'ECONNABORTED') {
      err.code = HttpStatusEnum.REQUEST_TIMEOUT;
      err.message = getStatusText(err.code);
    }

    return Promise.reject(err);
  },
);

// Interceptador das Respostas
HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = !error.response ? error : error.response.data;

    if (!err.code) {
      err.code = HttpStatusEnum.INTERNAL_SERVER_ERROR;
      err.message = getStatusText(err.code);

    } else if (err.code === 'ECONNABORTED') {
      err.code = HttpStatusEnum.REQUEST_TIMEOUT;
      err.message = getStatusText(err.code);
    }

    return Promise.reject(err);
  },
);

Vue.use(VueAxios, HTTP);
Vue.use(components);
Vue.use(filters);

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

Vue.config.productionTip = false;

store.dispatch('auth/init')
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
  .catch((error) => {
    /* tslint:disable:no-console */
    console.error(error);
  });
