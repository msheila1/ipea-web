<template>
  <b-modal ref="modal" header-bg-variant="primary">
    <span slot="modal-title">
      Histórico do B.O. nº {{ ocorrencia.numero| numeric | join(ocorrencia.ano) | join(ocorrencia.delegacia && ocorrencia.delegacia.nome, ' - ') }}
    </span>

    <el-input v-if="ocorrencia.historico" type="textarea" :value="ocorrencia.historico | normalize" :rows="18" :readonly="true" class=".input-text-align-justify"></el-input>
    <b-alert v-else variant="info" show>Nenhum histórico foi encontrado para esse Boletim de Ocorrência.</b-alert>

    <div slot="modal-footer" class="text-right">
      <el-button id="close-button" type="default" @click="onClose">Fechar</el-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Ocorrencia } from '@/models';

@Component
export default class HistoricoModal extends Vue {
  private ocorrencia: Ocorrencia = new Ocorrencia();

  public show(ocorrencia: Ocorrencia): void {
    this.ocorrencia = ocorrencia;

    const modal: any = this.$refs.modal;
    modal.show();
  }

  private onClose(): void {
    const modal: any = this.$refs.modal;
    modal.hide();

    this.$emit('closed');
  }
}
</script>
