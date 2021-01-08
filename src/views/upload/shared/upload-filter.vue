<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true" :collapsed="true">
    <el-form id="form" ref="form" :model="filter" :rules="rules" label-position="top">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="rg" prop="rg">
            <div slot="label">
              <span>RG</span>
              <i v-b-tooltip title="Informe o número do RG sem o dígito (Ex.: 44758249) ou parte do número (Ex.: 447)." class="icon-help"></i>
            </div>
            <el-autocomplete v-model="filter.rg" value-key="rgs" :fetch-suggestions="onPessoaAutocomplete" @select="onPessoaAutocompleteSelect" :debounce="1000" placeholder="Digite o RG da pessoa" class="w-100"  :class="{'is-success': !!filter.rg}">
              <i slot="suffix" class="icon-search4"></i>
            </el-autocomplete>
          </el-form-item>
        </div>
        <!--
        <div class="col-sm-3">
          <el-form-item id="cpf" prop="cpf">
            <div slot="label">
              <span>CPF</span>
              <i v-b-tooltip title="Informe o número do CPF (Ex.: 65412503858) ou parte do número (Ex.: 654)." class="icon-help"></i>
            </div>
            <el-input type="text" v-model="filter.cpf" :maxlength="15" :class="{'is-success': !!filter.cpf}"></el-input>
          </el-form-item>
        </div>
        -->
        <div class="col-sm">
          <el-form-item id="nome" prop="nome">
            <div slot="label">
              <span>Nome</span>
              <i v-b-tooltip title="Informe o nome da pessoa (Ex.: José Antonio) ou parte do nome (Ex.: José)." class="icon-help"></i>
            </div>
            <el-autocomplete v-model="filter.nome" value-key="nome" :fetch-suggestions="onPessoaAutocomplete" @select="onPessoaAutocompleteSelect" :debounce="1000" placeholder="Digite parte do nome da pessoa" class="w-100"  :class="{'is-success': !!filter.nome}">
              <i slot="suffix" class="icon-search4"></i>
            </el-autocomplete>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="maxFiles" prop="maxFiles">
            <div slot="label">
              <span>Máximo de arquivos</span>
              <i v-b-tooltip title="Número máximo de arquivos permitidos." class="icon-help"></i>
            </div>
            <el-input ref="maxfiles" type="text" v-model="filter.maxFiles" :maxlength="10" :class="{'is-success': !!filter.maxFiles}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="preview" prop="preview">
            <el-checkbox name="allowPreview" v-model="filter.allowImagePreview">Habilitar pré-visualização da foto</el-checkbox>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { FiltroPessoa, Pessoa } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class UploadFilter extends Vue {
  @Prop({ default: () => new FiltroPessoa() }) private filter!: FiltroPessoa;
  @Prop({ default: false }) private loading!: boolean;

  private rules = {
    cpf: [ Rules.numericAsteristico ],
    nome: [ Rules.min ],
  };

  protected mounted(): void {
    const self = this;
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

    private onPessoaAutocomplete(query: string, callback: (results: Pessoa[]) => void): void {
    if (!query || query.length < 2) {
      callback([]);
      return;
    }

    const params = /^\d+$/.test(query) ? { rg: query } : { nome: query };

    this.$emit('pessoa-autocomplete', params, callback);
  }

  private onPessoaAutocompleteSelect(pessoa: Pessoa): void {
    if (pessoa) {
      this.filter.rg = pessoa.rg;
      this.filter.cpf = pessoa.cpf;
      this.filter.nome = pessoa.nome;
    }

    this.$emit('pessoa-autocomplete-select', pessoa);
  }
}
</script>
