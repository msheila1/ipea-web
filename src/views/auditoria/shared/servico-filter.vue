<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="periodo" prop="periodo">
            <div slot="label">
              <span>Período do acesso</span>
              <i v-b-tooltip title="Informe o período (início e fim) do acesso ao serviço." class="icon-help"></i>
            </div>
            <el-date-picker v-model="filter.periodo" type="datetimerange" format="dd/MM/yyyy HH:mm:ss" range-separator="à" start-placeholder="Data/Hora inicial" end-placeholder="Data/Hora final" autofocus class="w-100"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="tipos-servicos" prop="tiposServicos">
            <div slot="label">
              <span>Tipo de serviço</span>
              <i v-b-tooltip title="Selecione os tipos de serviços que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select v-model="filter.tiposServicos" filterable multiple collapse-tags :class="[{'is-success': !!filter.tiposServicos.length}, 'w-100']">
              <el-option v-for="tipoServico in tiposServicos" :key="tipoServico.id" :label="tipoServico.descricao" :value="tipoServico.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="tipos-respostas" prop="tiposRespostas">
            <div slot="label">
              <span>Tipo de resposta</span>
              <i v-b-tooltip title="Selecione os tipos de respostas que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select v-model="filter.tiposRespostas" filterable multiple collapse-tags :class="[{'is-success': !!filter.tiposRespostas.length}, 'w-100']">
              <el-option v-for="tipoResposta in tiposRespostas" :key="tipoResposta.id" :label="tipoResposta.descricao" :value="tipoResposta.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { FiltroAuditoriaServico, Period, TipoResposta, TipoServico } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class ServicoFilter extends Vue {
  @Prop({ default: () => new FiltroAuditoriaServico() }) private filter!: FiltroAuditoriaServico;
  @Prop({ default: [] }) private tiposServicos!: TipoServico[];
  @Prop({ default: [] }) private tiposRespostas!: TipoResposta[];
  @Prop() private loading!: boolean;

  private rules: any = {
    periodo: [ Rules.required, Rules.period(10) ],
  };

  protected mounted(): void {
    const self = this;

    // Vincula a execução da pesquisa à tecla ENTER
    self.$el.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { // ENTER
        self.onSearch();
      }
    });
  }

  private onReset(): void {
    const form: any = this.$refs.form;
    form.resetFields();

    this.$emit('reset', form);
  }

  private onSearch(): void {
    const self = this;

    const form: any = this.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      this.$emit('search', form);
    });
  }
}
</script>
