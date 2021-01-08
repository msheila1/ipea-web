<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="endpoint" prop="endpoint">
            <div slot="label">
              <span>Endpoint (Serviço)</span>
              <i v-b-tooltip title="Selecione o endpoint (serviço) que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select ref="endpoint" v-model="filter.endpoint" filterable autofocus :class="[{'is-success': !!filter.endpoint}, 'w-100']">
              <el-option v-for="endpoint in endpoints" :key="endpoint.codigo" :label="endpoint.descricao" :value="endpoint.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="modus-operandi">
            <div slot="label">
              <span>Qual modus operandi?</span>
              <i v-b-tooltip title="Indique qual o modus operandi que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-checkbox v-model="filter.modusOperandiAutor" label="Do autor" border></el-checkbox>
            <el-checkbox v-model="filter.modusOperandiVitima" label="Da vítima" border></el-checkbox>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="similaridade-aceitavel" prop="similaridadeAceitavel">
            <div slot="label">
              <span>% Similaridade aceitável</span>
              <i v-b-tooltip title="Selecione o percentual da similaridade aceitável das ocorrências pesquisadas." class="icon-help"></i>
            </div>
            <el-select v-model="filter.similaridadeAceitavel" filterable :class="[{'is-success': !!filter.similaridadeAceitavel}, 'w-100']">
              <el-option v-for="similaridadeAceitavel in similaridadesAceitaveis" :key="similaridadeAceitavel.codigo" :label="similaridadeAceitavel.descricao" :value="similaridadeAceitavel.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="raio" prop="raio">
            <div slot="label">
              <span>Raio em metros</span>
              <i v-b-tooltip title="Selecione o raio em que as ocorrências similares devem estar próximas da ocorrência de referência." class="icon-help"></i>
            </div>
            <el-select v-model="filter.raio" filterable :class="[{'is-success': !!filter.raio}, 'w-100']">
              <el-option v-for="raio in raios" :key="raio.codigo" :label="raio.descricao" :value="raio.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
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

import { Delegacia, FiltroWatson } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class WatsonFilter extends Vue {
  @Prop({ default: () => new FiltroWatson() }) private filter!: FiltroWatson;
  @Prop({ default: false }) private loading!: boolean;

  private endpoints: any = [
    { codigo: 'MO', descricao: 'Similar MO' },
    { codigo: 'DEL', descricao: 'Similar DEL' },
  ];

  private similaridadesAceitaveis: any = [
    { codigo: 10, descricao: 'Mínimo 10%' },
    { codigo: 25, descricao: 'Mínimo 25%' },
    { codigo: 50, descricao: 'Mínimo 50%' },
    { codigo: 75, descricao: 'Mínimo 75%' },
    { codigo: 90, descricao: 'Mínimo 90%' },
    { codigo: 0, descricao: 'Qualquer coisa' },
  ];

  private raios: any = [
    { codigo: 500, descricao: '500 metros' },
    { codigo: 1000, descricao: '1000 metros' },
    { codigo: 1500, descricao: '1500 metros' },
    { codigo: 3000, descricao: '3000 metros' },
    { codigo: 5000, descricao: '5000 metros' },
    { codigo: 7000, descricao: '7000 metros' },
    { codigo: 10000, descricao: '10.000 metros' },
    { codigo: 15000, descricao: '15.000 metros' },
    { codigo: 20000, descricao: '20.000 metros' },
    { codigo: 50000, descricao: '50.000 metros' },
  ];

  private rules: any = {
    ano: [ Rules.required, Rules.maxYear ],
    numero: [ Rules.required, Rules.numeric ],
    nomeDelegacia: [ Rules.required, Rules.min ],
  };

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.endpoint as HTMLInputElement).focus();

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
