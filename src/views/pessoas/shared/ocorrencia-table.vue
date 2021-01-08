<template>
  <app-table-collapse header="Ocorrências relacionadas a pessoa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Delegacia</th>
          <th>Número/Ano</th>
          <th>Natureza</th>
          <th class="text-center">Data do fato</th>
          <th>Envolvimento da pessoa</th>
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
            <span v-if="ocorrencia.confidencial">{{ ocorrencia.data }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.data | formatDate }}
            </router-link>
          </td>
          <td>
            <span v-if="ocorrencia.confidencial">{{ ocorrencia.envolvimento }}</span>
            <router-link v-else :to="toOcorrenciaDetail(ocorrencia)" class="text-dark">
              {{ ocorrencia.envolvimento }}
            </router-link>
          </td>
          <td class="text-center">
            <el-dropdown v-if="!ocorrencia.confidencial" @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-pessoa-ocorrencia-table" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: ocorrencia, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
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

import { Ocorrencia, ResultList } from '@/models';

@Component
export default class OcorrenciaTable extends Vue {
  @Prop({ default: () => new ResultList<Ocorrencia>() }) private result!: ResultList<Ocorrencia>;
  @Prop({ default: false }) private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as Ocorrencia);

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

  private onDetail(model: Ocorrencia): void {
    this.$emit('detail', model);
  }

  private onViewPDF(model: Ocorrencia): void {
    this.$emit('view-pdf', model);
  }

  private toOcorrenciaDetail(model: Ocorrencia): Location {
    return { name: 'OcorrenciaDetail', params: { id: model.id }};
  }
}
</script>
