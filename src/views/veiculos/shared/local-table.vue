<template>
  <app-table-collapse header="Locais onde o veículo passou" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <el-form slot="navbar" id="form" ref="form" :model="filter" :rules="rules" :inline="true" class="ml-3">
      <div class="row">
        <div class="col-sm-6">
          <el-form-item id="periodo" prop="periodo" size="small">
            <el-date-picker v-model="filter.periodo" type="datetimerange" format="dd/MM/yyyy HH:mm:ss" range-separator="à" start-placeholder="Data/Hora inicial" end-placeholder="Data/Hora final" :class="[{'is-success': !!filter.periodo.length}, 'w-100']"></el-date-picker>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="onSearch"><i class="icon-search4"></i></el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Local</th>
          <th>Data/Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(local, index) in result.page.data" :key="local.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="local.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>{{ local.nomeLeitor }}</span>
          </td>
          <td>
            {{ local.dataHoraEvento | formatDateTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { MomentHelper } from '@/helpers';
import { FiltroLocalVeiculo, LocalVeiculo, ResultList } from '@/models';
import Rules from '@/validators/rules.validator';

// TODO Verificar a estratégia utilizada para gerenciar o período.
@Component
export default class LocalTable extends Vue {
  @Prop({ default: () => new ResultList<LocalVeiculo>() }) private result!: ResultList<LocalVeiculo>;
  @Prop({ default: false }) private loading!: boolean;

  private filter: FiltroLocalVeiculo = new FiltroLocalVeiculo();
  private rules: any = {
    periodo: [ Rules.required, Rules.period(7) ],
  };

  constructor() {
    super();
    this.filter.dataInicial = MomentHelper.currentDateTimeStartOf();
    this.filter.dataFinal = MomentHelper.currentDateTimeEndOf();
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', this.filter, pageNumber );
  }

  private onSearch(): void {
    const self = this;

    const form: any = this.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      this.$emit('search', self.filter);
    });
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', this.filter, pageNumber );
  }
}
</script>
