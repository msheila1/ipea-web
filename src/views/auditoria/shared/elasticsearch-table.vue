<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <!--th>Nome do índice</th-->
          <th>Tipo do documento</th>
          <th class="text-center">Quantidade de documentos</th>
          <th class="text-center">Data da última inclusão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auditoria, index) in result.page.data" :key="auditoria.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <!--td>{{ auditoria.nomeIndice }}</td-->
          <td class="text-uppercase">{{ auditoria.tipoDocumento }}</td>
          <td class="text-center">{{ auditoria.quantidadeDocumentos | numeric }}</td>
          <td class="text-center">
            {{ auditoria.ultimaInclusao | formatDateTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { AuditoriaElasticsearch, Page, Pageable, ResultList } from '@/models';

@Component
export default class ElasticsearchTable extends Vue {
  @Prop() private result!: ResultList<AuditoriaElasticsearch>;
  @Prop() private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
