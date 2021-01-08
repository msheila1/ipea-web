<template>
  <app-card icon="icon-newspaper" header="Dados do B.O.">
    <el-form label-position="top">
      <div class="row">
        <div class="col-sm-2">
          <el-form-item id="numero-ano" label="Número/Ano">
            <el-input type="text" :value="model.numero | join(model.ano)" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="delegacia" label="Delegacia">
            <el-input type="text" :value="model.delegacia | lookup('nome')" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="circunscricao" label="Circunscrição">
            <el-input type="text" :value="model.circunscricao" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-2">
          <el-form-item id="flagrante" label="Flagrante">
            <el-input type="text" :value="model.flagrante | formatBoolean" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-2">
          <el-form-item id="autoria" label="Autoria">
            <el-input type="text" :value="model.autoriaConhecida | formatBoolean('Conhecida', 'Desconhecida')" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
          <div class="col-sm">
          <el-form-item id="data" label="Data da ocorrência (Período)">
            <el-input type="text" :value="model.data | formatDate | join(model.periodo, ' - ')" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="data-comunicacao" label="Data da comunicação">
            <el-input type="text" :value="model.dataComunicacao | formatDate" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="data-elaboracao" label="Data da elaboração">
            <el-input type="text" :value="model.dataElaboracao | formatDate" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="tipo-local" label="Tipo de local">
            <el-input type="text" :value="model.tipoLocal" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="sub-tipo-local" label="Sub tipo de local">
            <el-input type="text" :value="model.subTipoLocal" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-6">
          <el-form-item id="local-fato" label="Local do fato">
            <el-input type="text" :value="model.local | address" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="historico">
            <div slot="label">
              <span>Histórico</span>
              <a href="#">
                <i v-b-tooltip @click="onShowHistoricoModal" title="Clique para abrir o histórico numa janela flutuante." class="icon-square-up-right"></i>
              </a>
            </div>
            <el-input type="textarea" :value="model.historico | normalize" :autosize="{ minRows: 2, maxRows: 4}" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Ocorrencia } from '@/models';

@Component
export default class OcorrenciaForm extends Vue {
  @Prop() private model!: Ocorrencia;

  private onShowHistoricoModal(): void {
    this.$emit('show-historico-modal', this.model);
  }
}
</script>
