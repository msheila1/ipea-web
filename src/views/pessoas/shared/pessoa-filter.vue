<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <div class="alert alert-primary border-0 rounded-0" style="margin-left: -20px; margin-right: -20px;">
      <small>Pesquisa com <b class="font-weight-bold">" * "</b> - Retorna todos os registros que possuam as combinações informadas. Ex. (RG): 448*. Resultado: 44858706, 44893609. Ex. (CPF): 294*. Resultado: 29473754536, 29423580607.</small>
      <br>
      <small>Os campos: "Nome", "Idade aproximada", "Nome da mãe" e "Nome do pai" NÃO suportam pesquisa com " * ".</small>
    </div>

    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="rg" prop="rg">
            <div slot="label">
              <span>RG</span>
              <i v-b-tooltip title="Informe o número do RG sem o dígito (Ex.: 44758249) ou parte do número (Ex.: 447)." class="icon-help"></i>
            </div>
            <el-input ref="rg" type="text" v-model="filter.rg" :maxlength="15" :class="{'is-success': !!filter.rg}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="cpf" prop="cpf">
            <div slot="label">
              <span>CPF</span>
              <i v-b-tooltip title="Informe o número do CPF (Ex.: 65412503858) ou parte do número (Ex.: 654)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.cpf" :maxlength="15" :class="{'is-success': !!filter.cpf}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="nome" prop="nome">
            <div slot="label">
              <span>Nome</span>
              <i v-b-tooltip title="Informe o nome da pessoa (Ex.: José Antonio) ou parte do nome (Ex.: José)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.nome" :maxlength="100" :class="{'is-success': !!filter.nome}"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="idadeAproximada" prop="idadeAproximada">
            <div slot="label">
              <span>Idade aproximada</span>
              <i v-b-tooltip title="Selecione o intervalo da idade ou a opção 'Outra Idade' para informar a idade desejada (Ex.: 22) ou um intervalo de idades (Ex.: 22-36)." class="icon-help"></i>
            </div>
            <el-select v-if="ageRange.value !== 'custom'" v-model="filter.idadeAproximada" @change="onIdadeAproximadaChange" @clear="onIdadeAproximadaClear" filterable clearable class="w-100" :class="{'is-success': !!filter.idadeAproximada}">
              <el-option v-for="idade in idadesAproximadas" :key="idade.id" :label="idade.label" :value="idade.value"></el-option>
            </el-select>
            <el-input v-else type="text" v-model="filter.idadeAproximada" @clear="onIdadeAproximadaClear" clearable :maxlength="5" placeholder="Ex.: 10-30, 8-15" suffix-icon="el-icon-caret-left" :class="{'is-success': !!filter.idadeAproximada}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="nomeMae" prop="nomeMae">
            <div slot="label">
              <span>Nome da mãe</span>
              <i v-b-tooltip title="Informe o nome da mãe (Ex.: Carolina Facini) ou parte do nome (Ex.: Facini)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.nomeMae" :maxlength="100" :class="{'is-success': !!filter.nomeMae}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="nomePai" prop="nomePai">
            <div slot="label">
              <span>Nome do pai</span>
              <i v-b-tooltip title="Informe o nome do pai (Ex.: Bento Candido) ou parte do nome (Ex.: Bento)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.nomePai" :maxlength="100" :class="{'is-success': !!filter.nomePai}"></el-input>
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

import { MomentHelper } from '@/helpers';
import { AgeRange, FiltroPessoa, Pessoa, Period } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class PessoaFilter extends Vue {
  @Prop({ default: () => new FiltroPessoa() }) private filter!: FiltroPessoa;
  @Prop({ default: false }) private loading!: boolean;

  private ageRange: AgeRange | any = new AgeRange();
  private idadesAproximadas = AgeRange.of(0, 80);
  private rules = {
    cpf: [ Rules.numericAsteristico ],
    nome: [ Rules.min ],
    nomeMae: [ Rules.min ],
    nomePai: [ Rules.min ],
    idadeAproximada: [ Rules.ageRange ],
  };

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.rg as HTMLInputElement).focus();

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
    this.ageRange = new AgeRange();

    (this.$refs.rg as HTMLInputElement).focus();
    this.$emit('reset', form);
  }

  private onSearch(): void {
    const self = this;

    const form: any = this.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      if (self.ageRange.value === 'custom' && self.filter.idadeAproximada) {
        const years = (self.filter.idadeAproximada as string).split('-');

        const period = MomentHelper.convertAgeToPeriod(+years[0], +years[1]);
        self.filter.dataNascimentoInicial = period.start;
        self.filter.dataNascimentoFinal = period.end;

      } else if (self.filter.idadeAproximada) {
        const period = MomentHelper.convertAgeToPeriod(self.ageRange.min, self.ageRange.max);
        self.filter.dataNascimentoInicial = period.start;
        self.filter.dataNascimentoFinal = period.end;
      }

      this.$emit('search', form);
    });
  }

  private onIdadeAproximadaClear(): void {
    this.ageRange = new AgeRange();
    this.filter.idadeAproximada = '';
    this.filter.dataNascimentoInicial = undefined;
    this.filter.dataNascimentoFinal = undefined;
  }

  private onIdadeAproximadaChange(value: string): void {
    if ('custom' === value) {
      this.filter.idadeAproximada = '';
    }

    this.ageRange = this.idadesAproximadas.find((ageRange: AgeRange) => value === ageRange.value);
    if (!this.ageRange) {
      this.ageRange = new AgeRange();
    }
  }
}
</script>
