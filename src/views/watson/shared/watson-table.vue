<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="text-center">Data da elaboração</th>
          <th class="text-center">Número/Ano</th>
          <th>Delegacia</th>
          <th class="text-center">Latitude/Longitude</th>
          <th class="text-center">Distância (m)</th>
          <th class="text-center">% Similaridade</th>
          <th class="text-center">Tipo de Similaridade</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ocorrencia, index) in result.page.data" :key="ocorrencia.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.dataElaboracao | formatDate }}
            </router-link>
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.numero | join(ocorrencia.ano) }}
            </router-link>
          </td>
          <td>
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.delegacia | lookup('nome') }}
            </router-link>
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.latitude | join(ocorrencia.longitude, ' / ') }}
            </router-link>
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.distancia }}
            </router-link>
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.similaridade }}
            </router-link>
          </td>
          <td class="text-center">
            <router-link :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.tipoSimilaridade }}
            </router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-watson-table"  class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: ocorrencia, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
                <el-dropdown-item :command="{ data: ocorrencia, event: 'view-historico' }"><i class="icon-file-text mr-1"></i> Visualizar Histórico</el-dropdown-item>
                <el-dropdown-item :command="{ data: ocorrencia, event: 'view-pdf' }"><i class="icon-file-pdf mr-1"></i> Visualizar PDF</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { OcorrenciaSemelhante, Page, Pageable, ResultList } from '@/models';

@Component
export default class WatsonTable extends Vue {
  @Prop({ default: () => new ResultList<OcorrenciaSemelhante>() }) private result!: ResultList<OcorrenciaSemelhante>;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as OcorrenciaSemelhante);

    } else if ('view-historico' === command.event) {
      this.onViewHistorico(command.data as OcorrenciaSemelhante);

    } else if ('view-pdf' === command.event) {
      this.onViewPDF(command.data as OcorrenciaSemelhante);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(ocorrencia: OcorrenciaSemelhante): void {
    this.$emit('detail', ocorrencia);
  }

  private onViewHistorico(ocorrencia: OcorrenciaSemelhante): void {
    this.$emit('view-historico', ocorrencia);
  }

  private onViewPDF(ocorrencia: OcorrenciaSemelhante): void {
    this.$emit('view-pdf', ocorrencia);
  }

  private toOcorrenciaDetail(ocorrencia: OcorrenciaSemelhante): Location {
    return { name: 'OcorrenciaDetail', params: { id: ocorrencia.id }};
  }
}
</script>
