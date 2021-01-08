<template>
  <app-card>
    <el-form label-position="top">
      <div class="media">
        <div class="media-body">
          <div class="mb-2">
            <div class="font-weight-semibold">{{ criminal.nome | defaultValue}}</div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Documentos de Identificação</span>
            <div class="font-weight-semibold">RG {{ criminal.rg | defaultValue}}</div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Informações Pessoais</span>
            <div class="font-weight-semibold">{{ criminal.dataNascimento | formatDate }} {{ criminal.dataNascimento | formatYear | join(criminal.naturalidade, ', ') | join(criminal.estadoCivil, ', ') | join(criminal.sexo, ', ') | join(criminal.grauInstrucao, ', ') | join(criminal.profissao, ', ') }}</div>
          </div>
          <div class="mb-2">
             <div class="row">
              <div class="col-sm">
                <span class="text-muted">Endereço Residencial</span>
                <div class="font-weight-semibold">{{ criminal.enderecoResidencial | address | defaultValue }}</div>
              </div>
              <div class="col-sm">
                <span class="text-muted">Endereço Comercial</span>
                <div class="font-weight-semibold">{{ criminal.enderecoComercial | address | defaultValue }}</div>
              </div>
             </div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Características Físicas</span>
            <div class="font-weight-semibold">{{ humanizeCaracteristicaFisica(criminal.caracteristicaFisica) | defaultValue }}</div>
          </div>
        </div>
      </div>
    </el-form>

    <app-block-ui v-if="loading" spinnerClass="icon-spinner2 spinner icon-2x text-blue-600" loadingText="Aguardando processamento..."></app-block-ui>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { CaracteristicaFisica, Criminal } from '@/models';

@Component
export default class CriminalForm extends Vue {
  @Prop({ default: () => new Criminal() }) private criminal!: Criminal;
  @Prop() private loading!: boolean;

  private humanizeCaracteristicaFisica(caracteristicaFisica: CaracteristicaFisica): string {
    if (!caracteristicaFisica) {
      return '';
    }

    const descricao = [];

    if (caracteristicaFisica.cabelo) {
      descricao.push(`Cabelos ${caracteristicaFisica.cabelo}`);
    }

    if (caracteristicaFisica.olhos) {
      descricao.push(`Olhos ${caracteristicaFisica.olhos}`);
    }

    if (caracteristicaFisica.pele) {
      descricao.push(`Pele ${caracteristicaFisica.pele}`);
    }

    let retorno = '';
    for (let i = 0; i < descricao.length; i++) {
      retorno += i !== 0 ? (i < descricao.length - 1 ? ', ' : ' e ') : '';
      retorno += descricao[i];
    }

    return retorno;
  }
}
</script>
