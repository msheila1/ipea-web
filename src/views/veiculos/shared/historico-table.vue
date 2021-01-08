<template>
  <app-table-collapse header="Histórico do veículo" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Data/Hora do histórico</th>
          <th>Proprietário</th>
          <th>Município</th>
          <th>Motivo da alteração</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(historico, index) in result.page.data" :key="historico.id">
          <td class="text-center">{{ result.position(index) }}</td>
          <td>
            <span v-if="historico.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>{{ historico.dataInclusaoProprietarios | formatDateTime }}</span>
          </td>
          <td>
            <ul class="list-inline list-inline-dotted mb-0">
              <li class="list-inline-item">
                <span class="font-weight-normal">{{ historico.nomeProprietario }}</span>
              </li>
              <li class="list-inline-item" v-if="historico.tipoDocumento && historico.numeroDocumento">
                <span class="font-weight-semibold mr-1">{{ historico.tipoDocumento }}</span>
                <span class="font-weight-normal">{{ historico.numeroDocumento | cpfCnpj }}</span>
              </li>
              <li class="list-inline-item" v-if="historico.rgProprietario">
                <span class="font-weight-semibold mr-1">RG</span>
                <span class="font-weight-normal">{{ historico.rgProprietario }}</span>
              </li>
            </ul>
            <div>
              <span class="text-muted">{{ historico.endereco | address }}</span>
            </div>
          </td>
          <td>{{ historico.municipioVeiculo | startCase }}</td>
          <td>{{ historico.descricaoTransacao }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { HistoricoVeiculo, ResultList } from '@/models';

@Component
export default class HistoricoTable extends Vue {
  @Prop({ default: () => new ResultList<HistoricoVeiculo>() }) private result!: ResultList<HistoricoVeiculo>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
