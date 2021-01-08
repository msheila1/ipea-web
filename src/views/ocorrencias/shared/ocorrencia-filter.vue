<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="numero" prop="numero">
            <div slot="label">
              <span>Número</span>
              <i v-b-tooltip title="Informe o número do Boletim de Ocorrência (Ex.: 168)." class="icon-help"></i>
            </div>
            <el-input ref="numero" type="text" v-model="filter.numero" :maxlength="10" :class="{'is-success': !!filter.numero}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="ano" prop="ano">
            <div slot="label">
              <span>Ano</span>
              <i v-b-tooltip title="Informe o ano do Boletim de Ocorrência (Ex.: 2018)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.ano" :maxlength="4" class="w-100" :class="{'is-success': !!filter.ano}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="delegacia" prop="nomeDelegacia">
            <div slot="label">
              <span>Delegacia</span>
              <i v-b-tooltip title="Informe a delegacia (Ex.: Praia Grande) e SELECIONE o item na lista suspensa (Ex.: 01º DP PRAIA GRANDE)." class="icon-help"></i>
            </div>
            <el-autocomplete v-model="filter.nomeDelegacia" value-key="nome" :fetch-suggestions="onDelegaciaAutocomplete" @select="onDelegaciaAutocompleteSelect" :debounce="1000" placeholder="Digite parte do nome da delegacia" class="w-100"  :class="{'is-success': !!filter.nomeDelegacia}">
              <i slot="suffix" class="icon-search4"></i>
            </el-autocomplete>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="historico" prop="historico">
            <div slot="label">
              <span>Histórico</span>
              <i v-b-tooltip title="Informe parte do histórico do Boletim de Ocorrência (Ex.: Dois indivíduos armados)." class="icon-help"></i>
            </div>
            <el-input type="textarea" v-model="filter.historico" :rows="1" :maxlength="150" :class="{'is-success': !!filter.historico}"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset-button" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="search-button" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Delegacia, FiltroOcorrencia } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class OcorrenciaFilter extends Vue {
  @Prop() private filter!: FiltroOcorrencia;
  @Prop() private loading!: boolean;

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.numero as HTMLInputElement).focus();

    // Vincula a execução da pesquisa à tecla ENTER
    self.$el.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { // ENTER
        self.onSearch();
      }
    });
  }

  private get rules(): any {
    return {
      ano: [ Rules.maxYear ],
      numero: [ Rules.numeric ],
      nomeDelegacia: [ Rules.min ],
    };
  }

  private onReset(): void {
    const form: any = this.$refs.form;
    form.resetFields();
    (this.$refs.numero as HTMLInputElement).focus();
    this.$emit('reset', form);
  }

  private onSearch(): void {
    const form: any = this.$refs.form;
    form.validate((isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      this.$emit('search', form);
    });
  }

  private onDelegaciaAutocomplete(query: string, callback: (results: Delegacia[]) => void): void {
    if (!query || query.length < 2) {
      callback([]);
      return;
    }

    const params = /^\d+$/.test(query) ? { id: query } : { nome: query };

    this.$emit('delegacia-autocomplete', params, callback);
  }

  private onDelegaciaAutocompleteSelect(delegacia: Delegacia): void {
    if (delegacia) {
      this.filter.idDelegacia = delegacia.id;
      this.filter.nomeDelegacia = delegacia.nome;
    }

    this.$emit('delegacia-autocomplete-select', delegacia);
  }
}
</script>
<style>
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-textarea__inner {
  border-color: #67c23a !important;
}
</style>