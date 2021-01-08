import { LoadingBar } from 'iview';
import Router, { Route } from 'vue-router';
import { PositionResult, Position } from 'vue-router/types/router';
import Vue from 'vue';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  scrollBehavior: (to: Route, from: Route, savedPosition: void | Position): PositionResult => {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' },
      meta: { hidden: true },
    },
    {
      path: '@navegacao',
      name: '@navegacao',
      meta: { type: 'header', title: 'Navegação', icon: 'icon-menu' },
    },
    {
      path: '/inicio',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
      meta: { title: 'Dashboard', icon: 'icon-home4', auth: true, roles: ['user'] },
    },
    {
      path: '/ocorrencias',
      name: 'OcorrenciaList',
      component: () => import(/* webpackChunkName: "ocorrencia-list" */ './views/ocorrencias/ocorrencia-list.vue'),
      meta: { title: 'Ocorrências', icon: 'icon-magazine', auth: true, roles: ['user'] },
    },
    {
      path: '/ocorrencias/:id/detalhar',
      name: 'OcorrenciaDetail',
      component: () => import(/* webpackChunkName: "ocorrencia-detail" */ './views/ocorrencias/ocorrencia-detail.vue'),
      meta: { hidden: true, title: 'Detalhe da Ocorrência', auth: true, roles: ['user'] },
    },
    {
      path: '/pessoas',
      name: 'PessoaList',
      component: () => import(/* webpackChunkName: "pessoa-list" */ './views/pessoas/pessoa-list.vue'),
      meta: { title: 'Pessoas', icon: 'icon-user', auth: true, roles: ['user'] },
    },
    {
      path: '/pessoas/:id/detalhar',
      name: 'PessoaDetail',
      component: () => import(/* webpackChunkName: "pessoa-detail" */ './views/pessoas/pessoa-detail.vue'),
      meta: { hidden: true, title: 'Detalhe da Pessoa', auth: true, roles: ['user'] },
    },
    {
      path: '/veiculos',
      name: 'VeiculoList',
      component: () => import(/* webpackChunkName: "veiculo-list" */ './views/veiculos/veiculo-list.vue'),
      meta: { title: 'Veículos', icon: 'icon-car', auth: true, roles: ['user'] },
    },
    {
      path: '/veiculos/:id/detalhar',
      name: 'VeiculoDetail',
      component: () => import(/* webpackChunkName: "veiculo-detail" */ './views/veiculos/veiculo-detail.vue'),
      meta: { hidden: true, title: 'Detalhe do Veículo', auth: true, roles: ['user'] },
    },
    {
      path: '@sistema',
      name: '@sistema',
      meta: { type: 'header', title: 'Sistema', icon: 'icon-menu' },
    },
    {
      path: '/auditoria',
      name: 'AuditoriaList',
      component: () => import(/* webpackChunkName: "auditoria-list" */ './views/auditoria/auditoria-list.vue'),
      meta: { title: 'Auditoria', icon: 'icon-eye-plus', auth: true, roles: ['admin'] },
    },
    {
      path: '/caches',
      name: 'CacheList',
      component: () => import(/* webpackChunkName: "cache-list" */ './views/caches/cache-list.vue'),
      meta: { title: 'Caches', icon: 'icon-database-menu', auth: true, roles: ['admin'] },
    },
    {
      path: '/watson',
      name: 'WatsonList',
      component: () => import(/* webpackChunkName: "watson-list" */ './views/watson/watson-list.vue'),
      meta: { title: 'Watson', icon: 'icon-brain', auth: true, roles: ['admin'] },
    },
    {
      path: '/upload',
      name: 'UploadList',
      component: () => import(/* webpackChunkName: "upload-list" */ './views/upload/upload-list.vue'),
      meta: { title: 'Upload de Fotos', icon: 'icon-upload', auth: true, roles: ['admin'] },
    },
    {
      path: '/configuracoes',
      name: 'Configuracoes',
      component: () => import(/* webpackChunkName: "configuracoes" */ './views/home.vue'),
      meta: { title: 'Configurações', icon: 'icon-gear', auth: true, roles: ['user'], hidden: true },
    },
    {
      path: '/versoes',
      name: 'Versoes',
      component: () => import(/* webpackChunkName: "versoes" */ './views/home.vue'),
      meta: { title: 'Versões', icon: 'icon-list-unordered', badge: '1.0', auth: true, roles: ['user'], hidden: true },
    },
    {
      path: '/central-de-ajuda',
      name: 'CentralAjuda',
      meta: { title: 'Central de Ajuda', icon: 'icon-help', hidden: true },
      children: [
        {
          path: '/documentacao',
          name: 'Documentacao',
          component: () => import(/* webpackChunkName: "documentacao" */ './views/home.vue'),
          meta: { title: 'Documentação' },
        },
        {
          path: '/perguntas-frequentes',
          name: 'PerguntasFrequentes',
          component: () => import(/* webpackChunkName: "perguntas-frequentes" */ './views/home.vue'),
          meta: { title: 'Perguntas Frequentes' },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();

  store.dispatch('auth/updateToken')
    .then(() => next())
    .catch(() => next(false));
});

router.afterEach((route) => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
