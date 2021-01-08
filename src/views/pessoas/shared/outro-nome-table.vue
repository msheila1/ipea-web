<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Nome</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(outroNome, index) in result.page.data" :key="outroNome.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="outroNome.confidencial" class="badge badge-flat border-danger text-danger-600 d-block confidencial-column">Confidencial</span>
            <span v-else>{{ outroNome.nome }}</span>
          </td>
          <td>{{ outroNome.tipo }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { OutroNome, ResultList } from '@/models';

@Component
export default class OutroNomeTable extends Vue {
  @Prop({ default: () => new ResultList<OutroNome>() }) private result!: ResultList<OutroNome>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
