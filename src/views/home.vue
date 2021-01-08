<template>
  <div id="home">
    <app-page-header id="home-header" title="Início" subtitle="Dashboard">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Dashboard</span>
      </div>
    </app-page-header>

    <p>Utilize o menu lateral para acessar as funcionalidades do sistema.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>
