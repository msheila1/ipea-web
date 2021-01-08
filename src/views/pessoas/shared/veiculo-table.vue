<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="text-center">Placa</th>
          <th>Chassi</th>
          <th>Marca/Modelo</th>
          <th>Cor</th>
          <th class="text-center">Ano de Fabricação/Modelo</th>
          <th>Tipo</th>
          <th>Município</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(veiculo, index) in result.page.data" :key="veiculo.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td class="text-center">
            <span v-if="veiculo.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <router-link v-else :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.placa | placa }}</router-link>
          </td>
          <td>
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.chassi }}</router-link>
          </td>
          <td>
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.marca }}</router-link>
          </td>
          <td>
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.cor | startCase }}</router-link>
          </td>
          <td class="text-center">
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.anoFabricacao | join(veiculo.anoModelo) }}</router-link>
          </td>
          <td>
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.tipo | startCase }}</router-link>
          </td>
          <td>
            <router-link :to="toVeiculoDetail(veiculo)" class="text-dark">{{ veiculo.municipio | startCase }}</router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-veiculo-table"  class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: veiculo, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
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

import { Pageable, ResultList, Veiculo } from '@/models';

@Component
export default class VeiculoTable extends Vue {
  @Prop({ default: () => new ResultList<Veiculo>() }) private result!: ResultList<Veiculo>;
  @Prop({ default: false }) private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as Veiculo);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(model: Veiculo): void {
    this.$emit('detail', model);
  }

  private toVeiculoDetail(model: Veiculo): Location {
    return { name: 'VeiculoDetail', params: { id: model.id }};
  }
}
</script>
