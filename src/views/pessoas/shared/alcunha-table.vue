<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="confidencial-column">RG</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(alcunha, index) in result.page.data" :key="alcunha.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="alcunha.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>{{ alcunha.rg }}</span>
          </td>
          <td>{{ alcunha.alcunha | startCase }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Alcunha, ResultList } from '@/models';

@Component
export default class AlcunhaTable extends Vue {
  @Prop({ default: () => new ResultList<Alcunha>() }) private result!: ResultList<Alcunha>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
