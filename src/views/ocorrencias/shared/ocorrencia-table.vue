<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Delegacia</th>
          <th>Número/Ano</th>
          <th>Data da elaboração</th>
          <th>Natureza</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ocorrencia, index) in result.page.data" :key="ocorrencia.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="ocorrencia.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.delegacia | lookup('nome') }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrencia.confidencial">{{ ocorrencia.numero }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.numero | join(ocorrencia.ano) }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrencia.confidencial">{{ ocorrencia.dataElaboracao }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.dataElaboracao | formatDate }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrencia.confidencial">{{ ocorrencia.naturezas | encrypt }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              <ul class="list-inline list-inline-dotted mb-0">
                <li v-for="(natureza) in ocorrencia.naturezas" :key="natureza.id" class="list-inline-item">
                  <span class="font-weight-normal">{{ natureza.rubrica }}</span>
                </li>
              </ul>
            </router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-ocorrencia-table" class="icon-menu9"></i>
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

import { Ocorrencia, Page, Pageable, ResultList } from '@/models';

@Component
export default class OcorrenciaTable extends Vue {
  @Prop() private result!: ResultList<Ocorrencia>;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as Ocorrencia);

    } else if ('view-historico' === command.event) {
      this.onViewHistorico(command.data as Ocorrencia);

    } else if ('view-pdf' === command.event) {
      this.onViewPDF(command.data as Ocorrencia);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(ocorrencia: Ocorrencia): void {
    this.$emit('detail', ocorrencia);
  }

  private onViewHistorico(ocorrencia: Ocorrencia): void {
    this.$emit('view-historico', ocorrencia);
  }

  private onViewPDF(ocorrencia: Ocorrencia): void {
    this.$emit('view-pdf', ocorrencia);
  }

  private toOcorrenciaDetail(ocorrencia: Ocorrencia): Location {
    return { name: 'OcorrenciaDetail', params: { id: ocorrencia.id }};
  }
}
</script>
