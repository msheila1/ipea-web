<template>
  <div id="ocorrencia-list">
    <app-page-header id="ocorrencia-header" title="Ocorrências" subtitle="Listagem">
      <div id="breadcrumb" slot="breadcrumb" class="breadcrumb">
        <router-link id="home-link" to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span id="active-link" class="breadcrumb-item active">Ocorrências</span>
      </div>
    </app-page-header>

    <ocorrencia-filter id="ocorrencia-filter" :loading="loading" :filter="filter" @reset="onReset" @search="onSearch" @delegacia-autocomplete="onDelegaciaAutocomplete"></ocorrencia-filter>

    <ocorrencia-table id="ocorrencia-table" :loading="loading" :result="ocorrencias" @page-change="onPageChange" @refresh="onRefresh" @detail="onDetail" @view-historico="onViewHistorico" @view-pdf="onViewPDF"></ocorrencia-table>

    <historico-modal id="historico-modal" ref="historicoModal"></historico-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  Delegacia,
  Documento,
  FiltroOcorrencia,
  Ocorrencia,
  Pageable,
  ResultList,
} from '@/models';
import { DelegaciasService, DownloadsService, OcorrenciasService } from '@/services';
import HistoricoModal from '@/views/ocorrencias/shared/historico-modal.vue';
import OcorrenciaFilter from '@/views/ocorrencias/shared/ocorrencia-filter.vue';
import OcorrenciaTable from '@/views/ocorrencias/shared/ocorrencia-table.vue';

@Component({
  components: {
    HistoricoModal,
    OcorrenciaFilter,
    OcorrenciaTable,
  },
})
export default class OcorrenciaList extends Vue {
  private filter: FiltroOcorrencia = new FiltroOcorrencia();

  protected mounted(): void {
    this.filter = _.cloneDeep(this.$store.getters['ocorrencias/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('ocorrencias/clear').then(() => {
      self.filter = new FiltroOcorrencia();
    });
  }

  private onSearch(): void {
    this.dispatchOcorrencias(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchOcorrencias(this.filter, new Pageable(pageNumber));
  }

  private onPageChange(pageNumber: number): void {
    this.dispatchOcorrencias(this.filter, new Pageable(pageNumber));
  }

  private onDetail(ocorrencia: Ocorrencia): void {
    this.$router.push({
      name: 'OcorrenciaDetail',
      params: { id: ocorrencia.id },
    });
  }

  private onViewHistorico(ocorrencia: Ocorrencia): void {
    const modal: any = this.$refs.historicoModal;
    modal.show(ocorrencia);
  }

  private onViewPDF(ocorrencia: Ocorrencia): void {
    OcorrenciasService.download(ocorrencia).toPromise()
      .then((documento: Documento) => {
        DownloadsService.open(documento);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private onDelegaciaAutocomplete(params: any, callback: (results: Delegacia[]) => void): void {
    DelegaciasService.list(params).toPromise()
      .then((delegacias: Delegacia[]) => {
        callback(delegacias);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get ocorrencias(): ResultList<Ocorrencia> {
    return this.$store.getters['ocorrencias/resultList'];
  }

  private get loading(): boolean {
    return this.$store.getters['ocorrencias/loading'];
  }

  private dispatchOcorrencias(filter: FiltroOcorrencia, pageable: Pageable): void {
    this.$store.dispatch('ocorrencias/query', { filter, pageable });
  }
}
</script>
