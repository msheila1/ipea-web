<template>
  <b-modal ref="modal" title="Confirmação do Auto de Reconhecimento Fotográfico" :hide-footer="true" header-bg-variant="primary">
    <suspeito-table id="suspeito-table" :result="suspeitos" @page-change="onReconhecidoPageChange" :collapsed="collapsed"></suspeito-table>
    <auto-reconhecimento-form v-show="hasReconhecidos()" id="auto-reconhecimento-form" :naturezas="ocorrencia.naturezas" :model="model" @save="onSave" @cancel="onCancel" @reconhecedor-autocomplete="onReconhecedorAutocomplete" @delegado-autocomplete="onDelegadoAutocomplete" @escrivao-autocomplete="onEscrivaoAutocomplete"></auto-reconhecimento-form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import _ from 'lodash';

import {
  AutoReconhecimento,
  Delegado,
  Escrivao,
  Ocorrencia,
  Page,
  Pageable,
  Pessoa,
  ResultList,
  Suspeito,
} from '@/models';
import AutoReconhecimentoForm from './auto-reconhecimento-form.vue';
import SuspeitoTable from './suspeito-table.vue';

@Component({
  components: {
    AutoReconhecimentoForm,
    SuspeitoTable,
  },
})
export default class AutoReconhecimentoModal extends Vue {
  @Prop({ default: () => new AutoReconhecimento() }) private model!: AutoReconhecimento;
  @Prop({ default: () => new Ocorrencia() }) private ocorrencia!: Ocorrencia;
  @Prop({ default: [] }) private reconhecidos!: Suspeito[];

  private collapsed = false;
  private suspeitos: ResultList<Suspeito>;

  constructor() {
    super();
    this.suspeitos = ResultList.newInstance(this.reconhecidos, 1, 2);
  }

  public open(): void {
    this.model.escrivao = this.ocorrencia.escrivao;
    this.model.delegado = this.ocorrencia.delegado;

    this.model.nomeEscrivao = this.ocorrencia.escrivao.nome;
    this.model.nomeDelegado = this.ocorrencia.delegado.nome;
    const modal: any = this.$refs.modal;
    modal.show();
  }

  public close(): void {
    const modal: any = this.$refs.modal;
    modal.hide();
  }

  /**
   * Tabela (Suspeitos reconhecidos)
   */

  private onReconhecidoPageChange(pageNumber: number): void {
    this.suspeitos = ResultList.newInstance(this.reconhecidos, pageNumber, 2);
  }

  @Watch('reconhecidos', { immediate: false, deep: true })
  private watchReconhecidoChanged(value: Suspeito[], oldValue: Suspeito[]): void {
    this.suspeitos = ResultList.newInstance(this.reconhecidos, 1, 2);
  }

  /**
   * Formulário
   */

  private onReconhecedorAutocomplete(queryString: string, callback: (results: Pessoa[]) => void): void {
    this.$emit('reconhecedor-autocomplete', queryString, callback);
  }

  private onReconhecedorAutocompleteSelect(pessoa: Pessoa): void {
    this.collapsed = true;
  }

  private onDelegadoAutocomplete(queryString: string, callback: (results: Delegado[]) => void): void {
    this.$emit('delegado-autocomplete', queryString, callback);
  }

  private onEscrivaoAutocomplete(queryString: string, callback: (results: Escrivao[]) => void): void {
    this.$emit('escrivao-autocomplete', queryString, callback);
  }

  private onSave(autoReconhecimento: AutoReconhecimento): void {
    autoReconhecimento.ocorrencia = this.ocorrencia;
    autoReconhecimento.reconhecidos = this.reconhecidos;

    this.$emit('save', autoReconhecimento);
  }

  private onCancel(): void {
    this.close();
  }

  private hasReconhecidos(): boolean {
    return this.reconhecidos && this.reconhecidos.length > 0;
  }

  private clear(): void {
    this.collapsed = false;
    this.suspeitos = ResultList.newInstance(this.reconhecidos, 1, 2);
  }
}
</script>
