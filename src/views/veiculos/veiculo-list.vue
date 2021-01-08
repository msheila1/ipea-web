<template>
  <div id="veiculo-list">
    <app-page-header id="veiculo-header" title="Veículos" subtitle="Listagem">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Veículos</span>
      </div>
    </app-page-header>

    <veiculo-filter id="veiculo-filter" :loading="loading" :filter="filter" :cores="cores" :tipos="tipos" @reset="onReset" @search="onSearch" @municipio-autocomplete="onMunicipioAutocomplete"></veiculo-filter>

    <veiculo-table id="veiculo-table" :loading="loading" :result="veiculos" @page-change="onPageChange" @refresh="onRefresh" @detail="onDetail"></veiculo-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  CorVeiculo,
  FiltroVeiculo,
  Municipio,
  Page,
  Pageable,
  ResultList,
  TipoVeiculo,
  Veiculo,
} from '@/models';
import {
  CoresVeiculosService,
  MunicipiosService,
  TiposVeiculosService,
  VeiculosService,
} from '@/services';
import VeiculoFilter from '@/views/veiculos/shared/veiculo-filter.vue';
import VeiculoTable from '@/views/veiculos/shared/veiculo-table.vue';

@Component({
  components: {
    VeiculoFilter,
    VeiculoTable,
  },
})
export default class VeiculoList extends Vue {
  private filter = new FiltroVeiculo();

  protected created(): void {
    this.$store.dispatch('cores-veiculos/listAll');
    this.$store.dispatch('tipos-veiculos/listAll');
  }

  protected mounted(): void {
    _.assign(this.filter, this.$store.getters['veiculos/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('veiculos/clear').then(() => {
      self.filter = new FiltroVeiculo();
    });
  }

  private onSearch(): void {
    this.dispatchVeiculos(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchVeiculos(this.filter, new Pageable(pageNumber));
  }

  private onPageChange(pageNumber: number): void {
    this.dispatchVeiculos(this.filter, new Pageable(pageNumber));
  }

  private onDetail(model: Veiculo): void {
    this.$router.push({ name: 'VeiculoDetail', params: { id: model.id } });
  }

  private onMunicipioAutocomplete(queryString: string, callback: (results: Municipio[]) => void): void {
    MunicipiosService.query({ nome: queryString, counted: true  }).toPromise()
      .then((municipios: Page<Municipio>) => {
        callback(municipios.data);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get tipos(): TipoVeiculo[] {
    return this.$store.getters['tipos-veiculos/data'];
  }

  private get cores(): CorVeiculo[] {
    return this.$store.getters['cores-veiculos/data'];
  }

  private get veiculos(): ResultList<Veiculo> {
    return this.$store.getters['veiculos/resultList'];
  }

  private get loading(): boolean {
    return this.$store.getters['veiculos/loading'];
  }

  private dispatchVeiculos(filter: FiltroVeiculo, pageable: Pageable): void {
    this.$store.dispatch('veiculos/query', { filter, pageable });
  }
}
</script>