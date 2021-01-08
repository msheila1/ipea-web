<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <!--th>Data da elaboração</th-->
          <th>Número/Ano</th>
          <!--th>Natureza</th-->
          <th>Delegacia</th>
          <th>Similaridade</th>
          <th>Distância (m)</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ocorrenciaSemelhante, index) in result.page.data" :key="ocorrenciaSemelhante.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <!--td>
            <span v-if="ocorrenciaSemelhante.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              {{ ocorrenciaSemelhante.dataElaboracao | formatDate }}
            </router-link>
          </td-->
          <td>
            <span v-if="ocorrenciaSemelhante.confidencial">{{ ocorrenciaSemelhante.numero_bo }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              {{ ocorrenciaSemelhante.numero | join(ocorrenciaSemelhante.ano) }}
            </router-link>
          </td>
          <!--td>
            <span v-if="ocorrenciaSemelhante.confidencial">{{ ocorrenciaSemelhante.naturezas | encrypt }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              <ul class="list-inline list-inline-dotted mb-0">
                <li v-for="(natureza) in ocorrenciaSemelhante.naturezas" :key="natureza.id" class="list-inline-item">
                  <span class="font-weight-normal">{{ natureza.rubrica }}</span>
                </li>
              </ul>
            </router-link>
          </td-->
          <td>
            <span v-if="ocorrenciaSemelhante.confidencial">{{ ocorrenciaSemelhante.delegacia }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              {{ ocorrenciaSemelhante.delegacia | lookup('nome') }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrenciaSemelhante.confidencial">{{ ocorrenciaSemelhante.similaridade }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              {{ ocorrenciaSemelhante.similaridade }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrenciaSemelhante.confidencial">{{ ocorrenciaSemelhante.distancia }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrenciaSemelhante)" class="text-dark">
              {{ ocorrenciaSemelhante.distancia | numeric }}
            </router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-ocorrencia-semelhantes-table" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: ocorrenciaSemelhante, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
                <el-dropdown-item :command="{ data: ocorrenciaSemelhante, event: 'view-history' }"><i class="icon-eye-plus mr-1"></i> Visualizar Histórico</el-dropdown-item>
                <el-dropdown-item :command="{ data: ocorrenciaSemelhante, event: 'view-pdf' }"><i class="icon-file-pdf mr-1"></i> Visualizar PDF</el-dropdown-item>
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

import { Ocorrencia, OcorrenciaSemelhante, Pageable, ResultList } from '@/models';

@Component
export default class SemelhanteTable extends Vue {
  @Prop({ default: () => new ResultList<OcorrenciaSemelhante>() }) private result!: ResultList<OcorrenciaSemelhante>;
  @Prop({ default: () => new Ocorrencia() }) private referencia!: Ocorrencia;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as OcorrenciaSemelhante);

    } else if ('view-pdf' === command.event) {
      this.onViewPDF(command.data as OcorrenciaSemelhante);

    } else if ('view-history' === command.event) {
      this.onViewHistory(command.data as OcorrenciaSemelhante);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(ocorrenciaSemelhante: OcorrenciaSemelhante): void {
    this.$emit('detail', ocorrenciaSemelhante);
  }

  private onViewPDF(ocorrenciaSemelhante: OcorrenciaSemelhante): void {
    this.$emit('view-pdf', ocorrenciaSemelhante);
  }

  private onViewHistory(ocorrenciaSemelhante: OcorrenciaSemelhante): void {
    this.$emit('view-history', ocorrenciaSemelhante);
  }

  private toOcorrenciaDetail(ocorrenciaSemelhante: OcorrenciaSemelhante): Location {
    return { name: 'OcorrenciaDetail', params: { id: ocorrenciaSemelhante.id }};
  }
}
</script>
