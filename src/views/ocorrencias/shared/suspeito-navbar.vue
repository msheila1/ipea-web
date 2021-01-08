<template>
  <div class="navbar navbar-expand-lg navbar-light navbar-component rounded">
    <div class="navbar-collapse collapse">
      <span class="navbar-text font-weight-semibold mr-3">
        Após reconhecer os suspeitos listados abaixo, clique no botão ao lado para preencher o formulário do Auto de Reconhecimento Fotográfico.
      </span>

      <span class="navbar-text font-weight-semibold mr-3 ml-md-auto"></span>

      <el-button id="auto-reconhecimento-open" type="primary" size="mini" @click="onAutoReconhecimentoOpen">Preencher Formulário</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SuspeitoNavbar extends Vue {

  private onAutoReconhecimentoOpen(): void {
    this.$emit('auto-reconhecimento-open');
  }
}
</script>
