<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Legislação</th>
          <th>Artigo</th>
          <th>Natureza</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(natureza, index) in result.page.data" :key="natureza.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>{{ natureza.legislacao }}</td>
          <td>{{ natureza.artigo }}</td>
          <td>{{ natureza.rubrica }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { NaturezaOcorrencia, Pageable, ResultList } from '@/models';

@Component
export default class NaturezaTable extends Vue {
  @Prop({ default: () => new ResultList<NaturezaOcorrencia>() }) private result!: ResultList<NaturezaOcorrencia>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
