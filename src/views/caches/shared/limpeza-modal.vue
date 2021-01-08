<template>
  <b-modal id="modal" ref="modal" title="Limpeza de Cache" header-bg-variant="danger">
    
    <template v-if="tiposServicos && tiposServicos.length">
      <p>O cache dos registros associados aos serviços descritos abaixo serão removidos:</p>

      <ul class="list-inline list-inline-dotted font-weight-semibold ml-3">
        <li v-for="(tipoServico) in tiposServicos" :key="tipoServico.id" class="list-inline-item">
          {{ tipoServico.descricao }}
        </li>
      </ul>
    </template>
 
    <b-alert variant="danger" show>
      A limpeza do cache da aplicação é uma ação irreversível.<br/>
      Os serviços elegíveis ao uso do cache podem sofrer uma degradação de performance momentânea até um novo cache ser criado.<br/><br/>
      <span class="font-weight-semibold">
        Você deseja prosseguir com esta ação?
      </span>
    </b-alert>

    <div slot="modal-footer" class="text-right">
      <el-button id="cancel" type="default" @click="onCancel">Cancelar</el-button>
      <el-button id="confirm" type="danger" @click="onConfirm">Confirmar</el-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { TipoServico } from '@/models';

@Component
export default class LimpezaModal extends Vue {
  private tiposServicos: TipoServico[] = [];

  public open(tiposServicos: TipoServico[]): void {
    this.tiposServicos = tiposServicos;

    const modal: any = this.$refs.modal;
    modal.show();
  }

  public close(): void {
    const modal: any = this.$refs.modal;
    modal.hide();
  }

  private onCancel(): void {
    this.close();
  }

  private onConfirm(): void {
    this.$emit('confirm');
  }
}
</script>
