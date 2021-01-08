<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm-6">
          <el-form-item id="tipo-relatorio" prop="tipoRelatorio">
            <div slot="label">
              <span>Tipo de relatório</span>
              <i v-b-tooltip title="Selecione o tipo de relatório que deseja visualizar." class="icon-help"></i>
            </div>
            <el-select v-model="filter.tipoRelatorio" filterable autofocus :class="[{'is-success': !!filter.tipoRelatorio}, 'w-100']">
              <el-option v-for="tipoRelatorio in tiposRelatorios" :key="tipoRelatorio.id" :label="tipoRelatorio.descricao" :value="tipoRelatorio.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="periodo" prop="periodo">
            <div slot="label">
              <span>Período do acesso</span>
              <i v-b-tooltip title="Informe o período (início e fim) do acesso ao serviço." class="icon-help"></i>
            </div>
            <el-date-picker v-model="filter.periodo" type="datetimerange" format="dd/MM/yyyy HH:mm:ss" range-separator="à" start-placeholder="Data/Hora inicial" end-placeholder="Data/Hora final" :class="[{'is-success': !!filter.periodo.length}, 'w-100']"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="tipos-servicos" prop="tiposServicos">
            <div slot="label">
              <span>Tipo de serviço</span>
              <i v-b-tooltip title="Selecione os tipos de serviços que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select v-model="filter.tiposServicos" filterable multiple :class="[{'is-success': !!filter.tiposServicos.length}, 'w-100']">
              <el-option v-for="tipoServico in tiposServicos" :key="tipoServico.codigo" :label="tipoServico.descricao" :value="tipoServico.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="nome-usuario" prop="nomeUsuario">
            <div slot="label">
              <span>Nome do usuário</span>
              <i v-b-tooltip title="Informe parte do nome do usuário. Ex: JOSE% ou %JOSE ou %JOSE%" class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.nomeUsuario" :maxlength="50" :class="{'is-success': !!filter.nomeUsuario}"></el-input>
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

import { FiltroAuditoriaAcesso, Period, TipoRelatorio, TipoResposta, TipoServico } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class ServicoFilter extends Vue {
  @Prop({ default: () => new FiltroAuditoriaAcesso() }) private filter!: FiltroAuditoriaAcesso;
  @Prop({ default: [] }) private tiposRelatorios!: TipoRelatorio[];
  @Prop({ default: [] }) private tiposServicos!: TipoServico[];
  @Prop({ default: false }) private loading!: boolean;

  protected mounted(): void {
    const self = this;

    // Vincula a execução da pesquisa à tecla ENTER
    self.$el.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { // ENTER
        self.onSearch();
      }
    });
  }

  private get rules(): any {
    return {
      nomeUsuario: [ { ...Rules.required, required: this.filter.tipoRelatorio === 1 }, Rules.min ],
      periodo: [ Rules.required, Rules.period(7) ],
      tipoRelatorio: [ Rules.required ],
    };
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
