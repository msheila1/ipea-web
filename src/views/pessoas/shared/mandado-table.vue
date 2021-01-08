<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th style="width: 190px;">Número/Ano do processo</th>
          <th>Autoridade judiciária</th>
          <th class="text-center">Data de expedição</th>
          <th>Classificação</th>
          <th>Situação</th>
          <th>Incidência penal</th>
          <th>Pena</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mandado, index) in result.page.data" :key="mandado.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="mandado.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>{{ mandado.numeroProcesso | join(mandado.anoProcesso) }}</span>
          </td>
          <td>{{ mandado.autoridadeJudiciaria }}</td>
          <td class="text-center">
            {{ mandado.dataExpedicao | formatDate }}
          </td>
          <td>{{ mandado.classificacao }}</td>
          <td>{{ mandado.situacao | startCase }}</td>
          <td>{{ mandado.incidenciaPenal | formatIncidenciaPenal }}</td>
          <td>{{ mandado.pena | formatPena }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Mandado, ResultList } from '@/models';

@Component
export default class MandadoTable extends Vue {
  @Prop({ default: () => new ResultList<Mandado>() }) private result!: ResultList<Mandado>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
