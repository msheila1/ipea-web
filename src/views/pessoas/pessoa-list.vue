<template>
  <div id="pessoa-list">
    <app-page-header id="pessoa-header" title="Pessoas" subtitle="Listagem">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link id="home-link" to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span id="active-link" class="breadcrumb-item active">Pessoas</span>
      </div>
    </app-page-header>

    <pessoa-filter id="pessoa-filter" :loading="loading" :filter="filter" @reset="onReset" @search="onSearch"></pessoa-filter>

    <pessoa-table id="pessoa-table" :loading="loading" :result="pessoas" @page-change="onPageChange" @refresh="onRefresh" @detail="onDetail"></pessoa-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  FiltroPessoa,
  Pageable,
  Pessoa,
  ResultList,
} from '@/models';
import { PessoasService } from '@/services';
import PessoaFilter from '@/views/pessoas/shared/pessoa-filter.vue';
import PessoaTable from '@/views/pessoas/shared/pessoa-table.vue';

@Component({
  components: {
    PessoaFilter,
    PessoaTable,
  },
})
export default class PessoaList extends Vue {
  private filter = new FiltroPessoa();

  protected mounted(): void {
    this.filter = _.cloneDeep(this.$store.getters['pessoas/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('pessoas/clear').then(() => {
      self.filter = new FiltroPessoa();
    });
  }

  private onSearch(): void {
    this.dispatchPessoas(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchPessoas(this.filter, new Pageable(pageNumber));
  }

  private onPageChange(pageNumber: number): void {
    this.dispatchPessoas(this.filter, new Pageable(pageNumber));
  }

  private onDetail(model: Pessoa): void {
    this.$router.push({ name: 'PessoaDetail', params: { id: model.id } });
  }

  private get pessoas(): ResultList<Pessoa> {
    return this.$store.getters['pessoas/resultList'];
  }

  private get loading(): boolean {
    return this.$store.getters['pessoas/loading'];
  }

  private dispatchPessoas(filter: FiltroPessoa, pageable: Pageable): void {
    this.$store.dispatch('pessoas/query', { filter, pageable });
  }
}
</script>
