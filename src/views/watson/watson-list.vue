<template>
  <div id="watson-list">
    <app-page-header id="watson-header" title="Watson" subtitle="Ocorrências analisadas">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Watson</span>
      </div>
    </app-page-header>

    <watson-filter id="watson-filter" :loading="loading" :filter="filter" @reset="onReset" @search="onSearch" @delegacia-autocomplete="onDelegaciaAutocomplete"></watson-filter>

    <watson-table id="watson-table" :loading="loading" :result="ocorrencias" @page-change="onPageChange" @refresh="onRefresh" @detail="onDetail" @view-historico="onViewHistorico" @view-pdf="onViewPDF"></watson-table>

    <historico-modal id="historico-modal" ref="historicoModal"></historico-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  Delegacia,
  FiltroWatson,
  OcorrenciaSemelhante,
  Page,
  Pageable,
  ResultList,
Documento,
} from '@/models';
import { DelegaciasService, OcorrenciasService, DownloadsService } from '@/services';
import HistoricoModal from '@/views/ocorrencias/shared/historico-modal.vue';
import WatsonFilter from '@/views/watson/shared/watson-filter.vue';
import WatsonTable from '@/views/watson/shared/watson-table.vue';

@Component({
  components: {
    HistoricoModal,
    WatsonFilter,
    WatsonTable,
  },
})
export default class WatsonList extends Vue {
  private filter = new FiltroWatson();

  protected mounted(): void {
    _.assign(this.filter, this.$store.getters['watson/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('watson/clear').then(() => {
      self.filter = new FiltroWatson();
    });
  }

  private onSearch(): void {
    this.dispatchWatson(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchWatson(this.filter, new Pageable(pageNumber));
  }

  private onPageChange(pageNumber: number): void {
    this.$store.dispatch('watson/changePage', { pageNumber });
  }

  private onDetail(model: OcorrenciaSemelhante): void {
    this.$router.push({
      name: 'OcorrenciaDetail',
      params: { id: model.id },
    });
  }

  private onViewHistorico(ocorrencia: OcorrenciaSemelhante): void {
    const modal: any = this.$refs.historicoModal;
    modal.show(ocorrencia); // TODO Garantir que o Watson esteja retornando o histórico
  }

  private onViewPDF(ocorrencia: OcorrenciaSemelhante): void {
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

  private get ocorrencias(): ResultList<OcorrenciaSemelhante> {
    return this.$store.getters['watson/resultList'];
  }

  private get loading(): boolean {
    return this.$store.getters['watson/loading'];
  }

  private dispatchWatson(filter: FiltroWatson, pageable: Pageable): void {
    this.$store.dispatch('watson/query', { filter, pageable });
  }
}
</script>
