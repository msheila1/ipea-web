<template>
  <app-table-collapse header="Outros endereços" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="confidencial-column">RG</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Origem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(endereco, index) in result.page.data" :key="endereco.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="endereco.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>
              {{ endereco.rg }}
            </span>
          </td>
          <td>{{ endereco.nome | startCase }}</td>
          <td>{{ endereco | address }}</td>
          <td>{{ endereco.origem }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Endereco, ResultList } from '@/models';

@Component
export default class OutroEnderecoTable extends Vue {
  @Prop({ default: () => new ResultList<Endereco>() }) private result!: ResultList<Endereco>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
