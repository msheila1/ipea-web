<template>
  <el-form ref="form" :model="model" :rules="rules" label-position="top">
    <b-alert variant="info" show>Selecione um indivíduo para o auto de reconhecimento fotográfico.</b-alert>

    <div class="row">
      <div class="col-sm">
        <el-form-item id="reconhecedor" prop="nomeReconhecedor">
          <div slot="label">
            <span>Reconhecedor(a)</span>
            <i v-b-tooltip title="Informe o nome da pessoa reconhecedora." class="icon-help"></i>
          </div>
          <el-autocomplete v-model="model.nomeReconhecedor" value-key="nome" :fetch-suggestions="onReconhecedorAutocomplete" @select="onReconhecedorAutocompleteSelect" :debounce="1000" autofocus placeholder="Digite parte do nome da pessoa" class="w-100">
            <i slot="suffix" class="icon-search4"></i>
          </el-autocomplete>
        </el-form-item>
      </div>
    </div>

    <el-collapse-transition>
      {{ model.reconhecedor }}
      <div v-show="model.reconhecedor">
        <div class="row">
          <div class="col-sm">
            <el-form-item id="delegado" prop="nomeDelegado">
              <div slot="label">
                <span>Delegado(a) do B.O</span>
                <i v-b-tooltip title="Informe o nome do(a) Delegado(a) da ocorrência." class="icon-help"></i>
              </div>
              <el-autocomplete v-model="model.nomeDelegado" value-key="nome" :fetch-suggestions="onDelegadoAutocomplete" @select="onDelegadoAutocompleteSelect" :debounce="1000" placeholder="Digite parte do nome do(a) delegado(a)" class="w-100">
                <i slot="suffix" class="icon-search4"></i>
              </el-autocomplete>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <el-form-item id="escrivao" prop="nomeEscrivao">
              <div slot="label">
                <span>Escrivão(ã) do B.O</span>
                <i v-b-tooltip title="Informe o nome do(a) Escrivão(ã) da ocorrência." class="icon-help"></i>
              </div>
              <el-autocomplete v-model="model.nomeEscrivao" value-key="nome" :fetch-suggestions="onEscrivaoAutocomplete" @select="onEscrivaoAutocompleteSelect" :debounce="1000" placeholder="Digite parte do nome do(a) escrivão(ã)" class="w-100">
                <i slot="suffix" class="icon-search4"></i>
              </el-autocomplete>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <el-form-item id="naturezas">
              <div slot="label">
                <span>Natureza</span>
                <i v-b-tooltip title="Selecione a natureza da ocorrência." class="icon-help"></i>
              </div>
              <el-select v-model="naturezasOcorrencia" @change="onNaturezaSelect" filterable multiple collapse-tags class="w-100">
                <el-option v-for="natureza in naturezas" :key="natureza.id" :label="natureza.rubrica" :value="natureza.rubrica"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-collapse-transition>

    <div class="d-flex justify-content-end w-100">
      <el-button id="cancel" type="default" @click="onCancel">Cancelar</el-button>

      <el-popover id="popover" v-model="popoverVisible" placement="top" width="300">
        <p>Deseja confirmar a inclusão de <span class="font-weight-semibold">{{ model.nome }}</span> no auto de reconhecimento fotográfico?</p>

        <div style="text-align: right; margin: 0">
          <el-button type="danger" size="mini" @click="popoverVisible = false">Não</el-button>
          <el-button type="success" size="mini" @click="onSave">Sim</el-button>
        </div>

        <el-button id="confirm" type="primary" slot="reference" class="ml-2">Confirmar</el-button>
      </el-popover>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import {
  AutoReconhecimento,
  Delegado,
  Escrivao,
  NaturezaOcorrencia,
  Ocorrencia,
  Pessoa,
Reconhecedor,
} from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class AutoReconhecimentoForm extends Vue {
  @Prop({ default: () => [] as NaturezaOcorrencia[] }) private naturezas!: NaturezaOcorrencia[];
  @Prop({ default: () => new AutoReconhecimento() }) private model!: AutoReconhecimento;

  private naturezasOcorrencia = [];
  private popoverVisible = false;

  private rules: any = {
    naturezasOcorrencia: [ Rules.empty ],
    nomeDelegado: [ Rules.required, Rules.min ],
    nomeEscrivao: [ Rules.required, Rules.min ],
    nomeReconhecedor: [ Rules.required, Rules.min ],
  };

  private onCancel(): void {
    this.$emit('cancel');
  }

  private onSave(): void {
    const self = this;
    self.popoverVisible = false;

    const form: any = self.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      self.model.rubricas = self.naturezasOcorrencia.join(', ').concat('.');

      self.$emit('save', self.model, form);
    });
  }

  /**
   * Reconhecedor
   */

  private onReconhecedorAutocomplete(queryString: string, callback: (results: Reconhecedor[]) => void): void {
    this.autocomplete('reconhecedor-autocomplete', queryString, callback);
  }

  private onReconhecedorAutocompleteSelect(reconhecedor: Reconhecedor): void {
    this.model.reconhecedor = reconhecedor;
  }

  /**
   * Delegado
   */

  private onDelegadoAutocomplete(queryString: string, callback: (results: Delegado[]) => void): void {
    this.autocomplete('delegado-autocomplete', queryString, callback);
  }

  private onDelegadoAutocompleteSelect(delegado: Delegado): void {
    this.model.delegado = delegado;
  }

  /**
   * Escrivão
   */

  private onEscrivaoAutocomplete(queryString: string, callback: (results: Escrivao[]) => void): void {
    this.autocomplete('escrivao-autocomplete', queryString, callback);
  }

  private onEscrivaoAutocompleteSelect(escrivao: Escrivao): void {
    this.model.escrivao = escrivao;
  }

  /**
   * Naturezas
   */

  private onNaturezaSelect(natureza: NaturezaOcorrencia): void {
    // console.log('onNaturezaSelect: ', natureza);
  }

  private autocomplete<T>(eventName: string, queryString: string, callback: (results: T[]) => void): void {
    if (!queryString || queryString.length < 2) {
      callback([]);
      return;
    }

    this.$emit(eventName, queryString, callback);
  }
}
</script>
