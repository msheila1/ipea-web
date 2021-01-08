<template>
  <div id="ocorrencia-detail">
    <app-page-header title="Ocorrências" subtitle="Detalhe">
      <div id="breadcrumb" slot="breadcrumb" class="breadcrumb">
        <router-link id="home-link" to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <router-link id="ocorrencia-link" to="/ocorrencias" class="breadcrumb-item">Ocorrências</router-link>
        <span id="active-link" class="breadcrumb-item active">B.O. nº {{ ocorrencia.numero | join(ocorrencia.ano) | join(ocorrencia.delegacia && ocorrencia.delegacia.nome, ' - ') }}</span>
      </div>
    </app-page-header>

    <div class="row">
      <div class="col-sm">
        <ocorrencia-form id="ocorrencia-form" :model="ocorrencia" @show-historico-modal="onShowHistoricoModal"></ocorrencia-form>

        <historico-modal id="historico-modal" ref="historicoModal"></historico-modal>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane id="pessoa-tab" :disabled="pessoas.isEmpty()">
            <span id="pessoa-badge" slot="label">
              Pessoas envolvidas <span class="badge badge-pill">{{ pessoas.count() }}</span>
            </span>

            <pessoa-table id="pessoa-table" :loading="loadingPessoas" :result="pessoas" @page-change="onPessoaPageChange" @refresh="onPessoaRefresh" @detail="onPessoaDetail"></pessoa-table>
          </el-tab-pane>
          <el-tab-pane id="veiculo-tab" :disabled="veiculos.isEmpty()">
            <span id="veiculo-badge" slot="label">
              Veículos envolvidos <span class="badge badge-pill">{{ veiculos.count() }}</span>
            </span>

            <veiculo-table id="veiculo-table" :loading="loadingVeiculos" :result="veiculos" @page-change="onVeiculoPageChange" @refresh="onVeiculoRefresh"></veiculo-table>
          </el-tab-pane>
          <el-tab-pane id="natureza-tab" :disabled="naturezas.isEmpty()">
            <span id="natureza-badge" slot="label">
              Naturezas <span class="badge badge-pill">{{ naturezas.count() }}</span>
            </span>

            <natureza-table id="natureza-table" :loading="loadingNaturezas" :result="naturezas" @page-change="onNaturezaPageChange" @refresh="onNaturezaRefresh"></natureza-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane id="semelhante-table-tab" :disabled="semelhantes.isEmpty()">
            <span id="semelhante-table-badge" slot="label">
              Ocorrências semelhantes <span class="badge badge-pill">{{ semelhantes.count() }}</span>
            </span>

            <semelhante-table id="semelhante-table" :loading="loadingSemelhantes" :result="semelhantes" :referencia="ocorrencia" @page-change="onSemelhantePageChange" @refresh="onSemelhanteRefresh" @detail="onSemelhanteDetail" @view-history="onSemelhanteViewHistory" @view-pdf="onSemelhanteViewPDF"></semelhante-table>
          </el-tab-pane>
          <el-tab-pane id="semelhante-map-tab" label="Mapa das ocorrências" :disabled="semelhantes.isEmpty()">
            <semelhante-map id="semelhante-map" :coordenadas="coordenadas" @detail="onSemelhanteDetail"></semelhante-map>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane v-if="!loadingSemelhantes"  id="suspeito-tab" :disabled="suspeitos.isEmpty()">
            <span slot="label">
              Possíveis suspeitos <span class="badge badge-pill">{{ suspeitos.count() }}</span>
            </span>

            <suspeito-navbar v-if="suspeitos.isNotEmpty()" id="suspeito-navbar" @auto-reconhecimento-open="onAutoReconhecimentoOpen"></suspeito-navbar>

            <suspeito-grid v-if="suspeitos.isNotEmpty()" id="suspeito-grid" :result="suspeitos" @foto-select="onSuspeitoFotoSelect" @foto-reload="onSuspeitoFotoReload"></suspeito-grid>
            <b-alert v-else-if="suspeitos.isEmpty()" variant="info" show>Nenhum possível suspeito foi localizado para a ocorrência.</b-alert>

            <auto-reconhecimento-modal ref="reconhecimentoModal" id="auto-reconhecimento-modal" :ocorrencia="ocorrencia" :reconhecidos="reconhecidos" @save="onReconhecimentoSave" @reconhecedor-autocomplete="onReconhecedorAutocomplete" @delegado-autocomplete="onDelegadoAutocomplete" @escrivao-autocomplete="onEscrivaoAutocomplete"></auto-reconhecimento-modal>
          </el-tab-pane>
          <el-tab-pane id="auto-reconhecimento-tab" :disabled="autosReconhecimentos.isEmpty()">
            <span id="auto-reconhecimento-badge" slot="label">
              Autos de reconhecimento fotográfico <span class="badge badge-pill">{{ autosReconhecimentos.count() }}</span>
            </span>

            <auto-reconhecimento-table id="auto-reconhecimento-table" :loading="loadingAutosReconhecimentos" :result="autosReconhecimentos" @page-change="onAutoReconhecimentoPageChange" @refresh="onAutoReconhecimentoRefresh" @view-pdf="onAutoReconhecimentoViewPDF" ></auto-reconhecimento-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Notification } from 'element-ui';

import { EncryptHelper } from '@/helpers';
import {
  AutoReconhecimento,
  Coordenada,
  Delegado,
  Documento,
  Escrivao,
  FiltroAutoReconhecimento,
  FiltroDelegado,
  FiltroEscrivao,
  FiltroOcorrenciaSemelhante,
  FiltroReconhecedor,
  FiltroSuspeito,
  Foto,
  NaturezaOcorrencia,
  Ocorrencia,
  OcorrenciaSemelhante,
  Page,
  Pageable,
  Pessoa,
  PessoaOcorrencia,
  Reconhecedor,
  ResultList,
  Suspeito,
  Veiculo,
} from '@/models';
import {
  AutosReconhecimentosService,
  DelegadosService,
  DownloadsService,
  EscrivaesService,
  OcorrenciasService,
  ReconhecedoresService,
  SuspeitosService,
} from '@/services';
import AutoReconhecimentoModal from '@/views/ocorrencias/shared/auto-reconhecimento-modal.vue';
import AutoReconhecimentoTable from '@/views/ocorrencias/shared/auto-reconhecimento-table.vue';
import HistoricoModal from '@/views/ocorrencias/shared/historico-modal.vue';
import NaturezaTable from '@/views/ocorrencias/shared/natureza-table.vue';
import OcorrenciaForm from '@/views/ocorrencias/shared/ocorrencia-form.vue';
import PessoaTable from '@/views/ocorrencias/shared/pessoa-table.vue';
import SemelhanteMap from '@/views/ocorrencias/shared/semelhante-map.vue';
import SemelhanteTable from '@/views/ocorrencias/shared/semelhante-table.vue';
import SuspeitoGrid from '@/views/ocorrencias/shared/suspeito-grid.vue';
import SuspeitoNavbar from '@/views/ocorrencias/shared/suspeito-navbar.vue';
import VeiculoTable from '@/views/ocorrencias/shared/veiculo-table.vue';
import _ from 'lodash';

@Component({
  components: {
    AutoReconhecimentoModal,
    AutoReconhecimentoTable,
    HistoricoModal,
    NaturezaTable,
    OcorrenciaForm,
    PessoaTable,
    SemelhanteMap,
    SemelhanteTable,
    SuspeitoGrid,
    SuspeitoNavbar,
    VeiculoTable,
  },
})
export default class OcorrenciaDetail extends Vue {
  private ocorrencia: Ocorrencia = new Ocorrencia();

  protected beforeRouteEnter(to: Route, from: Route, next: any): void {
    if (to.params.id && to.params.id.startsWith(EncryptHelper.MASK)) {
      Notification.warning({
        title: 'Confidencial',
        message: 'Usuário sem permissão para visualizar registro confidencial.',
      });
      next(false);

    } else {
      OcorrenciasService.findById(to.params.id).toPromise()
        .then((ocorrencia: Ocorrencia) => {
          if (ocorrencia && ocorrencia.id) {
            next((vm: any) => {
              vm.ocorrencia = ocorrencia;

              vm.$store.dispatch('ocorrencias-semelhantes/clear');
              vm.$store.dispatch('autos-reconhecimentos/clear');

              vm.dispatchAutosReconhecimentos(ocorrencia, new Pageable());
              vm.dispatchNaturezas(ocorrencia, new Pageable());
              vm.dispatchPessoas(ocorrencia, new Pageable());
              vm.dispatchSemelhantes(ocorrencia, new Pageable());
              vm.dispatchVeiculos(ocorrencia, new Pageable());
            });

          } else {
            Notification.warning({ title: 'Navegação', message: 'Registro não encontrado.' });
            next(false);
          }
        })
        .catch((error: Error) => {
          Notification.error({ title: 'Navegação', message: error.message });
          next(false);
        });
    }
  }

  protected beforeRouteUpdate(to: Route, from: Route, next: any): void {
    const self = this;

    if (to.params.id && to.params.id.startsWith(EncryptHelper.MASK)) {
      Notification.warning({
        title: 'Confidencial',
        message: 'Usuário sem permissão para visualizar registro confidencial.',
      });
      next(false);

    } else {
      OcorrenciasService.findById(to.params.id).toPromise()
        .then((ocorrencia: Ocorrencia) => {
          if (ocorrencia && ocorrencia.id) {
            self.ocorrencia = ocorrencia;

            self.$store.dispatch('ocorrencias-semelhantes/clear');
            self.$store.dispatch('autos-reconhecimentos/clear');

            self.dispatchAutosReconhecimentos(ocorrencia, new Pageable());
            self.dispatchNaturezas(ocorrencia, new Pageable());
            self.dispatchPessoas(ocorrencia, new Pageable());
            self.dispatchSemelhantes(ocorrencia, new Pageable());
            self.dispatchVeiculos(ocorrencia, new Pageable());

            next();

          } else {
            Notification.warning({ title: 'Navegação', message: 'Registro não encontrado.' });
            next(false);
          }
        })
        .catch((error: Error) => {
          Notification.error({ title: 'Navegação', message: error.message });
          next(false);
        });
    }
  }

  /**
   * Dados Básicos
   */

  private onShowHistoricoModal(ocorrencia: Ocorrencia): void {
    const modal: any = this.$refs.historicoModal;
    modal.show(ocorrencia);
  }

  /**
   * Pessoas envolvidas
   */

  private onPessoaRefresh(pageNumber: number): void {
    this.dispatchPessoas(this.ocorrencia, new Pageable(pageNumber));
  }

  private onPessoaPageChange(pageNumber: number): void {
    this.dispatchPessoas(this.ocorrencia, new Pageable(pageNumber));
  }

  private onPessoaDetail(pessoa: PessoaOcorrencia): void {
    this.$router.push({ name: 'PessoaDetail', params: { id: pessoa.id } });
  }

  private get pessoas(): ResultList<PessoaOcorrencia> {
    return this.$store.getters['ocorrencias-pessoas/resultList'];
  }

  private get loadingPessoas(): boolean {
    return this.$store.getters['ocorrencias-pessoas/loading'];
  }

  private dispatchPessoas(ocorrencia: Ocorrencia, pageable: Pageable): void {
    this.$store.dispatch('ocorrencias-pessoas/query', { ocorrenciaId: ocorrencia.id, pageable });
  }

  /**
   * Veículos envolvidos
   */

  private onVeiculoRefresh(pageNumber: number): void {
    this.dispatchVeiculos(this.ocorrencia, new Pageable(pageNumber));
  }

  private onVeiculoPageChange(pageNumber: number): void {
    this.dispatchVeiculos(this.ocorrencia, new Pageable(pageNumber));
  }

  private get veiculos(): ResultList<Veiculo> {
    return this.$store.getters['ocorrencias-veiculos/resultList'];
  }

  private get loadingVeiculos(): boolean {
    return this.$store.getters['ocorrencias-veiculos/loading'];
  }

  private dispatchVeiculos(ocorrencia: Ocorrencia, pageable: Pageable): void {
    this.$store.dispatch('ocorrencias-veiculos/query', { ocorrenciaId: ocorrencia.id, pageable });
  }

  /**
   * Naturezas
   */

  private onNaturezaRefresh(pageNumber: number): void {
    this.dispatchNaturezas(this.ocorrencia, new Pageable(pageNumber));
  }

  private onNaturezaPageChange(pageNumber: number): void {
    this.dispatchNaturezas(this.ocorrencia, new Pageable(pageNumber));
  }

  private get naturezas(): ResultList<NaturezaOcorrencia> {
    return this.$store.getters['ocorrencias-naturezas/resultList'];
  }

  private get loadingNaturezas(): boolean {
    return this.$store.getters['ocorrencias-naturezas/loading'];
  }

  private dispatchNaturezas(ocorrencia: Ocorrencia, pageable: Pageable): void {
    this.$store.dispatch('ocorrencias-naturezas/query', { ocorrenciaId: ocorrencia.id, pageable });
  }

  /**
   * Ocorrências Semelhates
   */

  private onSemelhanteRefresh(pageNumber: number): void {
    this.dispatchSemelhantes(this.ocorrencia, new Pageable(pageNumber));
  }

  private onSemelhantePageChange(pageNumber: number): void {
    this.dispatchPageChangeSemelhantes(new Pageable(pageNumber));
  }

  private onSemelhanteDetail(ocorrencia: OcorrenciaSemelhante): void {
    this.$router.push({ name: 'OcorrenciaDetail', params: { id: ocorrencia.id } });
  }

  private onSemelhanteViewPDF(ocorrencia: OcorrenciaSemelhante): void {
    OcorrenciasService.download(ocorrencia).toPromise()
      .then((documento: Documento) => {
        DownloadsService.open(documento);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private onSemelhanteViewHistory(ocorrencia: OcorrenciaSemelhante): void {
    const modal: any = this.$refs.historicoModal;
    modal.show(ocorrencia);
  }

  private get semelhantes(): ResultList<OcorrenciaSemelhante> {
    return this.$store.getters['ocorrencias-semelhantes/resultList'];
  }

  private get loadingSemelhantes(): boolean {
    return this.$store.getters['ocorrencias-semelhantes/loading'];
  }

  private dispatchSemelhantes(ocorrencia: Ocorrencia, pageable: Pageable): void {
    const filter = {
      referencia: ocorrencia,
      raioDistancia: 1500,
      similaridadeAceitavel: 10,
      modusOperandiAutor: true,
      modusOperandiVitima: false,
    } as FiltroOcorrenciaSemelhante;

    this.$store.dispatch('ocorrencias-semelhantes/query', { filter, pageable });
  }

  /**
   * Paginação em memória no client, porque não temos paginação no servidor do watson. \o/
   */
  private dispatchPageChangeSemelhantes(pageable: Pageable): void {
    this.$store.dispatch('ocorrencias-semelhantes/queryPageChange', { pageable });
  }

  /**
   * Mapa das Ocorrências Semelhantes
   */

  private get coordenadas(): Coordenada[] {
    return this.$store.getters['ocorrencias-semelhantes/coordenadas'];
  }

  /**
   * Possíveis Suspeitos
   */

  private onSuspeitoFotoSelect(foto: Foto, suspeito: Suspeito): void {
    this.$store.dispatch('ocorrencias-suspeitos/selectFoto', { foto, suspeito });
  }

  private onSuspeitoFotoReload(foto: Foto, suspeito: Suspeito): void {
     this.$store.dispatch('ocorrencias-suspeitos/reloadFoto', {suspeito, foto});
  }

  private onAutoReconhecimentoOpen(): void {
    const modal: any = this.$refs.reconhecimentoModal;
    modal.open();
  }

  private get suspeitos(): ResultList<Suspeito> {
    return this.$store.getters['ocorrencias-suspeitos/resultList'];
  }

  /**
   * Auto de Reconhecimento Fotográfico (Modal)
   */

  private onReconhecimentoSave(autoReconhecimento: AutoReconhecimento): void {
    const self = this;

    AutosReconhecimentosService.insert(autoReconhecimento).toPromise()
      .then((result: AutoReconhecimento) => {
        const modal: any = this.$refs.reconhecimentoModal;
        modal.close();

        self.$notify.success('Auto de Reconhecimento Fotográfico gerado com sucesso.');
        // self.dispatchAutosReconhecimentos(this.ocorrencia, new Pageable(1));
        self.$store.dispatch('ocorrencias-suspeitos/unselectAll');

        self.onAutoReconhecimentoViewPDF(result);
      })
      .catch((error: Error) => self.$notify.error(error.message));
  }

  private onReconhecedorAutocomplete(queryString: string, callback: (results: Reconhecedor[]) => void): void {
    ReconhecedoresService.list(new FiltroReconhecedor(queryString, this.ocorrencia)).toPromise()
      .then((reconhecedores: Reconhecedor[]) => {
        callback(reconhecedores);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private onDelegadoAutocomplete(queryString: string, callback: (results: Delegado[]) => void): void {
    DelegadosService.list(new FiltroDelegado(queryString)).toPromise()
      .then((delegados: Delegado[]) => {
        callback(delegados);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private onEscrivaoAutocomplete(queryString: string, callback: (results: Escrivao[]) => void): void {
    EscrivaesService.list(new FiltroEscrivao(queryString)).toPromise()
      .then((escrivaes: Escrivao[]) => {
        callback(escrivaes);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get reconhecidos(): Suspeito[] {
    return this.$store.getters['ocorrencias-suspeitos/reconhecidos'];
  }

  /**
   * Autos de Reconhecimentos Fotográficos (Tabela)
   */

  private onAutoReconhecimentoRefresh(pageNumber: number): void {
    this.dispatchAutosReconhecimentos(this.ocorrencia, new Pageable(pageNumber));
  }

  private onAutoReconhecimentoPageChange(pageNumber: number): void {
    this.dispatchAutosReconhecimentos(this.ocorrencia, new Pageable(pageNumber));
  }

  private onAutoReconhecimentoViewPDF(autoReconhecimento: AutoReconhecimento): void {
    AutosReconhecimentosService.download(autoReconhecimento).toPromise()
      .then((documento: Documento) => {
        DownloadsService.open(documento);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get autosReconhecimentos(): ResultList<AutoReconhecimento> {
    return this.$store.getters['autos-reconhecimentos/resultList'];
  }

  private get loadingAutosReconhecimentos(): boolean {
    return this.$store.getters['autos-reconhecimentos/loading'];
  }

  private dispatchAutosReconhecimentos(ocorrencia: Ocorrencia, pageable: Pageable): void {
    const filter = {
      ocorrencia,
    } as FiltroAutoReconhecimento;

    this.$store.dispatch('autos-reconhecimentos/query', { filter, pageable });
  }

}
</script>
