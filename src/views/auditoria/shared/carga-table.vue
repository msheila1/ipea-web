<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <table class="table table-striped table-bordered table-hover border-left-0 border-right-0">
      <thead>
        <tr>
          <th rowspan="2" class="number-column border-left-0">#</th>
          <th rowspan="2">Origem dos dados</th>
          <th colspan="2" class="text-center">Registros confidenciais</th>
          <th colspan="2" class="text-center">Total de registros</th>
          <th colspan="2" class="text-center">Último registro incluído</th>
          <th colspan="2" class="text-center">Data da consolidação</th>
          <th colspan="2" class="text-center border-right-0">Situação da consolidação</th>
        </tr>
        <tr>
          <th class="text-center small">Mainframe</th>
          <th class="text-center small">Elasticsearch</th>
          <th class="text-center small">Mainframe</th>
          <th class="text-center small">Elasticsearch</th>
          <th class="text-center small">Mainframe</th>
          <th class="text-center small">Elasticsearch</th>
          <th class="text-center small">Mainframe</th>
          <th class="text-center small">Elasticsearch</th>
          <th class="text-center small">Mainframe</th>
          <th class="text-center small border-right-0">Elasticsearch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auditoria, index) in result.page.data" :key="auditoria.id" :class="{'table-danger': hasDivergencia(auditoria)}">
          <td class="text-center border-left-0">
            {{ result.position(index) }}
          </td>
          <td>{{ auditoria.origem.nome }}</td>
          <td class="text-center">{{ auditoria.origem.totalConfidencial }}</td>
          <td :class="[{ 'text-danger': hasTotalConfidencialDivergente(auditoria) }, 'text-center']">
            {{ auditoria.destino.totalConfidencial }}
            <small v-show="hasTotalConfidencialDivergente(auditoria)" v-html="calculateDivergencia(auditoria.origem.totalConfidencial, auditoria.destino.totalConfidencial)" class="text-muted"></small>
          </td>
          <td class="text-center">{{ auditoria.origem.total }}</td>
          <td :class="[{ 'text-danger': hasTotalDivergente(auditoria) }, 'text-center']">
            {{ auditoria.destino.total }} 
            <small v-show="hasTotalDivergente(auditoria)" v-html="calculateDivergencia(auditoria.origem.total, auditoria.destino.total)" class="text-muted"></small>
          </td>
          <td class="text-center">{{ auditoria.origem.dataUltimaInclusao | formatDateTime }}</td>
          <td class="text-center">{{ auditoria.destino.dataUltimaInclusao }}</td>
          <td class="text-center">{{ auditoria.origem.dataConsolidacao }}</td>
          <td class="text-center">{{ auditoria.destino.dataConsolidacao }}</td>
          <td class="text-center">{{ auditoria.origem.situacaoConsolidacao }}</td>
          <td class="text-center border-right-0">{{ auditoria.destino.situacaoConsolidacao }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { AuditoriaCarga, Page, Pageable, ResultList } from '@/models';
import { AuditoriaCargasService } from '@/services';

@Component
export default class CargaTable extends Vue {
  @Prop({ default: () => new ResultList<AuditoriaCarga>() }) private result!: ResultList<AuditoriaCarga>;
  @Prop() private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private hasTotalConfidencialDivergente(auditoria: AuditoriaCarga): boolean {
    return auditoria.origem.totalConfidencial !== auditoria.destino.totalConfidencial;
  }

  private hasTotalDivergente(auditoria: AuditoriaCarga): boolean {
    return auditoria.origem.total !== auditoria.destino.total;
  }

  private hasDivergencia(auditoria: AuditoriaCarga): boolean {
    return this.hasTotalConfidencialDivergente(auditoria) || this.hasTotalDivergente(auditoria);
  }

  private calculateDivergencia(value1: number, value2: number): string {
    const result = (value2 || 0) - (value1 || 0);
    return result < 0 ? '&#x25BC;' + Math.abs(result) : '&#x25B2;' + result;
  }
}
</script>
