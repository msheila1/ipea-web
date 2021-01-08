<template>
  <div id="auditoria-list">
    <app-page-header id="auditoria-header" title="Auditoria">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Auditoria</span>
      </div>
    </app-page-header>

    <el-tabs tab-position="top">
      <el-tab-pane id="carga-tab" label="Cargas">
        <carga-filter id="carga-filter" :loading="loadingCargas" :filter="filterCarga" :datas="datasCarga" @reset="onCargaReset" @search="onCargaSearch" @update="onCargaUpdate"></carga-filter>
        <carga-table id="carga-table" :loading="loadingCargas" :result="resultCargas" @refresh="onCargaRefresh"></carga-table>
      </el-tab-pane>
      <el-tab-pane id="elasticsearch-tab" label="Elasticsearch">
        <elasticsearch-table id="elasticsearch-table" :loading="loadingElasticsearch" :result="resultElasticsearch" @page-change="onElasticsearchPageChange" @refresh="onElasticsearchRefresh"></elasticsearch-table>
      </el-tab-pane>
      <el-tab-pane id="elasticsearch-config-tab" label="Elasticsearch Configs">
        <elasticsearch-filter id="elasticsearch-filter" :loading="loadingElasticsearchConfig" :filter="filterElasticsearch" :tipos-indices="tiposIndices" @reset="onElasticsearchConfigReset" @search="onElasticsearchConfigSearch"></elasticsearch-filter>
        <elasticsearch-config-table id="elasticsearch-config-table" :loading="loadingElasticsearchConfig" :result="resultElasticsearchConfig" @page-change="onElasticsearchConfigPageChange" @refresh="onElasticsearchConfigRefresh" @set-configuration="onElasticsearchConfiguration" ></elasticsearch-config-table>
      </el-tab-pane>
      <el-tab-pane id="servico-tab" label="Serviços">
        <servico-filter id="servico-filter" :loading="loadingServicos" :filter="filterServico" :tipos-servicos="tiposServicosExternos" :tipos-respostas="tiposRespostas" @reset="onServicoReset" @search="onServicoSearch"></servico-filter>
        <servico-table id="servico-table" :loading="loadingServicos" :result="resultServicos" @page-change="onServicoPageChange" @refresh="onServicoRefresh"></servico-table>
      </el-tab-pane>
      <el-tab-pane id="acesso-tab" label="Acessos">
        <acesso-filter id="acesso-filter" :loading="loadingAcessos" :filter="filterAcesso" :tipos-servicos="tiposServicosInternos" :tipos-relatorios="tiposRelatorios" @reset="onAcessoReset" @search="onAcessoSearch"></acesso-filter>
        <acesso-table id="acesso-table" :loading="loadingAcessos" :result="resultAcessos" :tipo-relatorio="filterAcesso.tipoRelatorio" @page-change="onAcessoPageChange" @refresh="onAcessoRefresh"></acesso-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  AuditoriaAcesso,
  AuditoriaCarga,
  AuditoriaElasticsearch,
  AuditoriaServico,
  ElasticsearchConfig,
  FiltroAuditoriaAcesso,
  FiltroAuditoriaCarga,
  FiltroAuditoriaElasticsearch,
  FiltroAuditoriaServico,
  Pageable,
  ResultList,
} from '@/models';
import AcessoFilter from '@/views/auditoria/shared/acesso-filter.vue';
import AcessoTable from '@/views/auditoria/shared/acesso-table.vue';
import CargaFilter from '@/views/auditoria/shared/carga-filter.vue';
import CargaTable from '@/views/auditoria/shared/carga-table.vue';
import ElasticsearchConfigTable from '@/views/auditoria/shared/elasticsearch-config-table.vue';
import ElasticsearchFilter from '@/views/auditoria/shared/elasticsearch-filter.vue';
import ElasticsearchTable from '@/views/auditoria/shared/elasticsearch-table.vue';
import ServicoFilter from '@/views/auditoria/shared/servico-filter.vue';
import ServicoTable from '@/views/auditoria/shared/servico-table.vue';

@Component({
  components: {
    AcessoFilter,
    AcessoTable,
    CargaFilter,
    CargaTable,
    ElasticsearchConfigTable,
    ElasticsearchFilter,
    ElasticsearchTable,
    ServicoFilter,
    ServicoTable,
  },
})
export default class AuditoriaList extends Vue {
  private filterAcesso = new FiltroAuditoriaAcesso();
  private filterCarga = new FiltroAuditoriaCarga();
  private filterElasticsearch = new FiltroAuditoriaElasticsearch();
  private filterServico = new FiltroAuditoriaServico();

  protected created(): void {
    this.$store.dispatch('auditoria-cargas/listData');
    this.$store.dispatch('tipos-relatorios/listAll');
    this.$store.dispatch('tipos-respostas/listAll');
    this.$store.dispatch('tipos-servicos/listAll');
    this.$store.dispatch('tipos-indices/listAll');
  }

  protected mounted(): void {
    _.assign(this.filterAcesso, this.$store.getters['auditoria-acessos/filter']);
    _.assign(this.filterCarga, this.$store.getters['auditoria-cargas/filter']);
    _.assign(this.filterElasticsearch, this.$store.getters['auditoria-elasticsearch/filter']);
    _.assign(this.filterServico, this.$store.getters['auditoria-servicos/filter']);

    this.dispatchElasticsearch(this.filterElasticsearch, new Pageable(1, 1000));
  }

  /**
   * Auditoria das Cargas
   */

  private onCargaReset(): void {
    const self = this;

    self.$store.dispatch('auditoria-cargas/clear').then(() => {
      self.filterCarga = new FiltroAuditoriaCarga();
    });
  }

  private onCargaSearch(): void {
    this.dispatchCargas(this.filterCarga);
  }

  private onCargaRefresh(): void {
    this.dispatchCargas(this.filterCarga);
  }

  private onCargaUpdate(): void {
    this.$confirm('Você confirma a atualização da carga?', 'Atenção', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    })
    .then(() => this.$store.dispatch('auditoria-cargas/update'))
    .catch((action: string) => { /* console.debug(action) */ });
  }

  private get datasCarga(): Date[] {
    return this.$store.getters['auditoria-cargas/datas'];
  }

  private get resultCargas(): ResultList<AuditoriaCarga> {
    return this.$store.getters['auditoria-cargas/resultList'];
  }

  private get loadingCargas(): boolean {
    return this.$store.getters['auditoria-cargas/loading'];
  }

  private dispatchCargas(filter: FiltroAuditoriaCarga): void {
    this.$store.dispatch('auditoria-cargas/list', { filter });
  }

  /**
   * Auditoria do Elasticsearch
   */

  private onElasticsearchRefresh(pageNumber: number): void {
    this.dispatchElasticsearch(this.filterElasticsearch, new Pageable(pageNumber, 1000));
  }

  private onElasticsearchPageChange(pageNumber: number): void {
    this.dispatchElasticsearch(this.filterElasticsearch, new Pageable(pageNumber, 1000));
  }

  private get resultElasticsearch(): ResultList<AuditoriaElasticsearch> {
    return this.$store.getters['auditoria-elasticsearch/resultList'];
  }

  private get loadingElasticsearch(): boolean {
    return this.$store.getters['auditoria-elasticsearch/loading'];
  }

  private dispatchElasticsearch(filter: FiltroAuditoriaElasticsearch, pageable: Pageable): void {
    this.$store.dispatch('auditoria-elasticsearch/query', { filter, pageable });
  }

  /**
   * Auditoria dos Serviços
   */

  private onServicoReset(): void {
    const self = this;

    self.$store.dispatch('auditoria-servicos/clear').then(() => {
      self.filterServico = new FiltroAuditoriaServico();
    });
  }

  private onServicoSearch(): void {
    this.dispatchServicos(this.filterServico, new Pageable());
  }

  private onServicoRefresh(pageNumber: number): void {
    this.dispatchServicos(this.filterServico, new Pageable(pageNumber));
  }

  private onServicoPageChange(pageNumber: number): void {
    this.dispatchServicos(this.filterServico, new Pageable(pageNumber));
  }

  private get tiposServicosExternos(): string[] {
    return this.$store.getters['tipos-servicos/externos'];
  }

  private get tiposRespostas(): string[] {
    return this.$store.getters['tipos-respostas/data'];
  }

  private get resultServicos(): ResultList<AuditoriaServico> {
    return this.$store.getters['auditoria-servicos/resultList'];
  }

  private get loadingServicos(): boolean {
    return this.$store.getters['auditoria-servicos/loading'];
  }

  private dispatchServicos(filter: FiltroAuditoriaServico, pageable: Pageable): void {
    this.$store.dispatch('auditoria-servicos/query', { filter, pageable });
  }

  /**
   * Auditoria dos Acessos
   */

  private onAcessoReset(): void {
    const self = this;

    self.$store.dispatch('auditoria-acessos/clear').then(() => {
      self.filterAcesso = new FiltroAuditoriaAcesso();
    });
  }

  private onAcessoSearch(): void {
    this.dispatchAcessos(this.filterAcesso, new Pageable());
  }

  private onAcessoRefresh(pageNumber: number): void {
    this.dispatchAcessos(this.filterAcesso, new Pageable(pageNumber));
  }

  private onAcessoPageChange(pageNumber: number): void {
    this.dispatchAcessos(this.filterAcesso, new Pageable(pageNumber));
  }

  private get tiposRelatorios(): string[] {
    return this.$store.getters['tipos-relatorios/data'];
  }

  private get tiposServicosInternos(): string[] {
    return this.$store.getters['tipos-servicos/internos'];
  }

  private get resultAcessos(): ResultList<AuditoriaAcesso> {
    return this.$store.getters['auditoria-acessos/resultList'];
  }

  private get loadingAcessos(): boolean {
    return this.$store.getters['auditoria-acessos/loading'];
  }

  private dispatchAcessos(filter: FiltroAuditoriaAcesso, pageable: Pageable): void {
    this.$store.dispatch('auditoria-acessos/query', { filter, pageable });
  }

  /**
   * Auditoria dos Serviços
   */

  private onElasticsearchConfigReset(): void {
    const self = this;

    self.$store.dispatch('auditoria-elasticsearch-config/clear').then(() => {
      self.filterElasticsearch = new FiltroAuditoriaElasticsearch();
    });
  }

  private onElasticsearchConfigSearch(): void {
    this.dispatchElasticsearchConfig(this.filterElasticsearch, new Pageable());
  }

  private onElasticsearchConfigRefresh(pageNumber: number): void {
    this.dispatchElasticsearchConfig(this.filterElasticsearch, new Pageable(pageNumber));
  }

  private onElasticsearchConfigPageChange(pageNumber: number): void {
    this.dispatchElasticsearchConfig(this.filterElasticsearch, new Pageable(pageNumber));
  }

  private get tiposIndices(): string[] {
    return this.$store.getters['tipos-indices/data'];
  }

  private get resultElasticsearchConfig(): ResultList<ElasticsearchConfig> {
    return this.$store.getters['auditoria-elasticsearch-config/resultList'];
  }

  private get loadingElasticsearchConfig(): boolean {
    return this.$store.getters['auditoria-elasticsearch-config/loading'];
  }

  private dispatchElasticsearchConfig(filter: FiltroAuditoriaElasticsearch, pageable: Pageable): void {
    this.$store.dispatch('auditoria-elasticsearch-config/query', { filter, pageable });
  }

  private onElasticsearchConfiguration(model: ElasticsearchConfig): void {
    this.$store.dispatch('auditoria-elasticsearch-config/setConfigIndice', model);
  }


}
</script>
