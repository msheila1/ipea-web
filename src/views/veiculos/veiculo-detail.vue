<template>
  <div id="veiculo-detail">
    <app-page-header title="Veículos" subtitle="Detalhe">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link id="home-link" to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <router-link id="veiculos-link" to="/veiculos" class="breadcrumb-item">Veículos</router-link>
        <span id="active-link" class="breadcrumb-item active">Placa nº {{ veiculo.placa | placa }}</span>
      </div>
    </app-page-header>

    <div class="row">
      <div class="col-sm-6">
        <veiculo-form id="veiculo-form" :model="veiculo"></veiculo-form>
      </div>
      <div class="col-sm-6">
        <el-tabs tab-position="top">
          <el-tab-pane id="proprietario-atual-tab" label="Proprietário atual">
            <proprietario-form id="proprietario-atual" :model="veiculo.proprietarioAtual"></proprietario-form>
          </el-tab-pane>
          <el-tab-pane id="proprietario-anterior-tab" label="Proprietário anterior">
            <proprietario-form id="proprietario-anterior" :model="veiculo.proprietarioAnterior"></proprietario-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <historico-table id="historico-table" :loading="loadingHistoricos" :result="historicos" @page-change="onHistoricoPageChange" @refresh="onHistoricoRefresh"></historico-table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <ocorrencia-table id="ocorrencia-table" :loading="loadingOcorrencias" :result="ocorrencias" @page-change="onOcorrenciaPageChange" @refresh="onOcorrenciaRefresh" @detail="onOcorrenciaDetail" @view-pdf="onOcorrenciaViewPDF"></ocorrencia-table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <local-table id="local-table" :loading="loadingLocais" :result="locais" @page-change="onLocalPageChange" @refresh="onLocalRefresh" @search="onLocalSearch"></local-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Notification } from 'element-ui';
import { Observable, Subscription } from 'rxjs';
import _ from 'lodash';

import { EncryptHelper } from '@/helpers';

import { MomentHelper } from '@/helpers';
import {
  Documento,
  FiltroLocalVeiculo,
  HistoricoVeiculo,
  LocalVeiculo,
  Ocorrencia,
  Pageable,
  Period,
  ProprietarioVeiculo,
  ResultList,
  Veiculo,
  VeiculoOcorrencia,
} from '@/models';
import { VeiculosService, OcorrenciasService, DownloadsService } from '@/services';
import HistoricoTable from '@/views/veiculos/shared/historico-table.vue';
import LocalTable from '@/views/veiculos/shared/local-table.vue';
import OcorrenciaTable from '@/views/veiculos/shared/ocorrencia-table.vue';
import ProprietarioForm from '@/views/veiculos/shared/proprietario-form.vue';
import VeiculoForm from '@/views/veiculos/shared/veiculo-form.vue';

@Component({
  components: {
    HistoricoTable,
    LocalTable,
    OcorrenciaTable,
    ProprietarioForm,
    VeiculoForm,
  },
})
export default class VeiculoDetail extends Vue {
  private veiculo = new Veiculo();

  protected beforeRouteEnter(to: Route, from: Route, next: any): void {
    if (to.params.id && to.params.id.startsWith(EncryptHelper.MASK)) {
      Notification.warning({
        title: 'Confidencial',
        message: 'Usuário sem permissão para visualizar registro confidencial.',
      });
      next(false);

    } else {
      VeiculosService.findById(to.params.id).toPromise()
        .then((veiculo: Veiculo) => {
          if (veiculo && veiculo.id) {
            next((vm: any) => {
              vm.veiculo = veiculo;

              vm.dispatchHistorico(veiculo, new Pageable(1, 5));
              vm.dispatchLocal({
                  veiculoId: veiculo.id,
                  dataInicial: MomentHelper.currentDateTimeStartOf(),
                  dataFinal: MomentHelper.currentDateTimeEndOf(),
                } as FiltroLocalVeiculo,
                new Pageable(),
              );
              vm.dispatchOcorrencia(veiculo, new Pageable());
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
      VeiculosService.findById(to.params.id).toPromise()
        .then((veiculo: Veiculo) => {
          if (veiculo && veiculo.id) {
            self.veiculo = veiculo;

            self.dispatchHistorico(veiculo, new Pageable());
            self.dispatchLocal({
                veiculoId: veiculo.id,
                dataInicial: MomentHelper.currentDateTimeStartOf(),
                dataFinal: MomentHelper.currentDateTimeEndOf(),
              } as FiltroLocalVeiculo,
              new Pageable(),
            );
            self.dispatchOcorrencia(veiculo, new Pageable());

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
   * Histórico do veículo
   */

  private onHistoricoRefresh(pageNumber: number): void {
    this.dispatchHistorico(this.veiculo, new Pageable(pageNumber, 5));
  }

  private onHistoricoPageChange(pageNumber: number): void {
    this.dispatchHistorico(this.veiculo, new Pageable(pageNumber, 5));
  }

  private get historicos(): ResultList<HistoricoVeiculo> {
    return this.$store.getters['historicos-veiculos/resultList'];
  }

  private get loadingHistoricos(): boolean {
    return this.$store.getters['historicos-veiculos/loading'];
  }

  private dispatchHistorico(veiculo: Veiculo, pageable: Pageable): void {
    this.$store.dispatch('historicos-veiculos/query', { veiculoId: veiculo.id, pageable });
  }

  /**
   * Ocorrências relacionadas ao veículo
   */

  private onOcorrenciaRefresh(pageNumber: number): void {
    this.dispatchOcorrencia(this.veiculo, new Pageable(pageNumber));
  }

  private onOcorrenciaPageChange(pageNumber: number): void {
    this.dispatchOcorrencia(this.veiculo, new Pageable(pageNumber));
  }

  private onOcorrenciaDetail(model: VeiculoOcorrencia): void {
    this.$router.push({
      name: 'OcorrenciaDetail',
      params: { id: model.id },
    });
  }

  private onOcorrenciaViewPDF(model: VeiculoOcorrencia): void {
    const ocorrencia = {
      ano: model.ano,
      numero: model.numero,
      delegacia: model.delegacia,
    } as Ocorrencia;

    OcorrenciasService.download(ocorrencia).toPromise()
      .then((documento: Documento) => {
        DownloadsService.open(documento);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get ocorrencias(): ResultList<VeiculoOcorrencia> {
    return this.$store.getters['ocorrencias-veiculos/resultList'];
  }

  private get loadingOcorrencias(): boolean {
    return this.$store.getters['ocorrencias-veiculos/loading'];
  }

  private dispatchOcorrencia(veiculo: Veiculo, pageable: Pageable): void {
    this.$store.dispatch('ocorrencias-veiculos/queryByPessoa', { filter: { placa: veiculo.placa }, pageable });
  }

  /**
   * Locais onde o veículo passou
   */

  private onLocalSearch(filter: FiltroLocalVeiculo, pageNumber: number): void {
    this.dispatchLocal(filter, new Pageable(pageNumber));
  }

  private onLocalRefresh(filter: FiltroLocalVeiculo, pageNumber: number): void {
    this.dispatchLocal(filter, new Pageable(pageNumber));
  }

  private onLocalPageChange(filter: FiltroLocalVeiculo, pageNumber: number): void {
    this.dispatchLocal(filter, new Pageable(pageNumber));
  }

  private get locais(): ResultList<LocalVeiculo> {
    return this.$store.getters['locais-veiculos/resultList'];
  }

  private get loadingLocais(): boolean {
    return this.$store.getters['locais-veiculos/loading'];
  }

  private dispatchLocal(filter: FiltroLocalVeiculo, pageable: Pageable): void {
    this.$store.dispatch('locais-veiculos/query', { filter: { ...filter, veiculoId: this.veiculo.id }, pageable });
  }
}
</script>
