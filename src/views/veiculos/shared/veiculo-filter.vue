<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <div class="alert alert-primary border-0 rounded-0" style="margin-left: -20px; margin-right: -20px;">
      <small>Pesquisa com <b class="font-weight-bold">" * "</b> - Retorna todos os registros que possuam as combinações informadas Ex.: TUD*1. Resultado: TUD1001, TUD0021, TUD0001.</small>
      <br>
      <small>Pesquisa com <b class="font-weight-bold">" ? "</b> - Substitui um caractere desconhecido (ou que não se deseja informar) em determinada posição no campo de pesquisa. Ex1.: SAV?002. Resultado: SAV0002, SAV7002. Ex.2: SAV000?. Resultado: SAV0002, SAV0005, SAV0008. Ex3.: BGT??37. Resultado: BGT1237, BGT5937.</small>
    </div>

    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="placa" prop="placa">
            <div slot="label">
              <span>Placa</span>
              <i v-b-tooltip title="Informe a placa (Ex.: BPM1256) ou parte dela (Ex.: BPM)." class="icon-help"></i>
            </div>
            <el-input ref="placa" type="text" v-model="filter.placa" :maxlength="7" :class="{'is-success': !!filter.placa}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="chassi" prop="chassi">
            <div slot="label">
              <span>Chassi</span>
              <i v-b-tooltip title="Informe o chassi (Ex.: 9BWCA15X6YP102804) ou parte dele (Ex.: 9BW)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.chassi" :maxlength="17" :class="{'is-success': !!filter.chassi}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="marca" prop="marca">
            <div slot="label">
              <span>Marca/Modelo</span>
              <i v-b-tooltip title="Informe a marca e/ou modelo do veículo. Ex.: GOL" class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.marca" :maxlength="30" :class="{'is-success': !!filter.marca}"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="cores" prop="cores">
            <div slot="label">
              <span>Cor</span>
              <i v-b-tooltip title="Selecione a cor desejada" class="icon-help"></i>
            </div>
            <el-select v-model="filter.cores" filterable multiple collapse-tags :class="[{'is-success': !!filter.cores.length}, 'w-100']">
              <el-option v-for="cor in cores" :key="cor.codigo" :label="cor.descricao | startCase" :value="cor.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="tipos" prop="tipos">
            <div slot="label">
              <span>Tipo de veículo</span>
              <i v-b-tooltip title="Selecione o tipo de veículo" class="icon-help"></i>
            </div>
            <el-select v-model="filter.tipos" filterable multiple collapse-tags class="w-100" :class="{'is-success': !!filter.tipos.length}">
              <el-option v-for="tipo in tipos" :key="tipo.codigo" :label="tipo.descricao | startCase" :value="tipo.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="municipio" prop="municipio">
            <div slot="label">
              <span>Município</span>
              <i v-b-tooltip title="Informe o município (Ex.: Santo André) e SELECIONE o item na lista suspensa (Ex.: SANTO ANDRÉ - SP)." class="icon-help"></i>
            </div>
            <el-autocomplete v-model="filter.municipio" value-key="nomeAndUf" :fetch-suggestions="onMunicipioAutocomplete" @select="onMunicipioAutocompleteSelect" :debounce="1000" :trigger-on-focus="false" placeholder="Digite parte do nome do município" :class="[{'is-success': !!filter.municipio}, 'w-100']">
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

import { CorVeiculo, FiltroVeiculo, Municipio, TipoVeiculo } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class VeiculoFilter extends Vue {
  @Prop({ default: () => [] }) private cores!: CorVeiculo[];
  @Prop({ default: () => new FiltroVeiculo() }) private filter!: FiltroVeiculo;
  @Prop({ default: false }) private loading!: boolean;
  @Prop({ default: () => [] }) private tipos!: TipoVeiculo[];

  private rules: any = {
    chassi: [ Rules.min ],
    municipio: [ Rules.min ],
    placa: [ Rules.min ],
  };

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.placa as HTMLInputElement).focus();

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
    (this.$refs.placa as HTMLInputElement).focus();
    this.$emit('reset', form);
  }

  private onSearch(): void {
    const self = this;

    const form: any = self.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      try {
        await self.validate();

      } catch (error) {
        self.$notify.error(error.message);
        return false;
      }

      self.$emit('search', form);
    });
  }

  private onMunicipioAutocomplete(queryString: string, callback: (results: Municipio[]) => void): void {
    if (!queryString || queryString.length < 2) {
      callback([]);
      return;
    }

    this.$emit('municipio-autocomplete', queryString, callback);
  }

  private onMunicipioAutocompleteSelect(municipio: Municipio): void {
    this.filter.descricaoIbge = municipio.id;
    this.filter.idDetran = municipio.id_detran;

    this.$emit('municipio-autocomplete-select', municipio);
  }

  private async validate(): Promise<boolean> {
    const self = this;

    if (self.filter.placa || self.filter.chassi) {
      return true;
    }

    // tslint:disable-next-line:max-line-length
    if ((!_.isEmpty(self.filter.cores) || !_.isEmpty(self.filter.tipos) || !_.isEmpty(self.filter.marca)) && !self.filter.idDetran) {
      throw new Error('Adicione placa, chassi ou município.');
    }

    // tslint:disable-next-line:max-line-length
    if (_.isEmpty(self.filter.cores) && _.isEmpty(self.filter.tipos) && _.isEmpty(self.filter.marca) && self.filter.idDetran) {
      throw new Error('Adicione outro filtro.');
    }

    if (_.isEmpty(self.filter.cores) && _.isEmpty(self.filter.tipos) && !self.filter.idDetran) {
      throw new Error('Preencha pelo menos um campo no formulário.');
    }

    return true;
  }
}
</script>
<style>
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-textarea__inner {
  border-color: #67c23a !important;
}
</style>
