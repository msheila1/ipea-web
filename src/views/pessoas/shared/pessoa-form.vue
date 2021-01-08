<template>
  <div class="card card-body">
    <div class="media">
      <div class="media-body">
        <h4 class="font-weight-semibold">
          {{ model.nome }}
          <span class="badge badge-flat border-primary text-primary-600">{{ model.origem | startCase }}</span>
        </h4>
        <div class="mb-2">
          <span class="text-muted">Documentos de Identificação</span>
          <div class="font-weight-semibold">RG {{ model.rg | defaultValue}} / CPF {{ model.cpf | cpf | defaultValue }}</div>
        </div>
        <div class="mb-2">
          <span class="text-muted">Informações Pessoais</span>
          <div class="font-weight-semibold">{{ model.dataNascimento | formatDate }} {{ model.dataNascimento | formatYear | join(model.naturalidade, ', ') | join(model.estadoCivil, ', ') | join(model.sexo, ', ') | join(model.grauInstrucao, ', ') | join(model.profissao, ', ') }}</div>
        </div>
        <div class="mb-2">
          <span class="text-muted">Endereço</span>
          <div class="font-weight-semibold">{{ model.enderecoResidencial | address | defaultValue }}</div>
        </div>
        <div class="mb-2">
          <span class="text-muted">Características Físicas</span>
          <div class="font-weight-semibold">{{ humanizeCaracteristicaFisica(model.caracteristicaFisica) | defaultValue }}</div>
        </div>
        <div class="mb-2">
          <span class="text-muted">Filiação</span>
          <div class="font-weight-semibold">{{ model.nomeMae | startCase }} e {{ model.nomePai | startCase }}</div>
        </div>
      </div>
      <div class="ml-3" style="width: 256px;">
        <div class="card">
          <div class="card-header p-0">
            <el-carousel v-if="fotos && fotos.length" id="carousel-fotos" :arrow="arrow" :autoplay="false" indicator-position="none" v-viewer>
              <el-carousel-item v-for="(foto, index) in fotos" :key="foto.id">
                <app-photo :data="foto" :description="foto.origem" @reload="onFotoReload(foto)" @zoom="onFotoZoom(foto, index)" :selectable="false"></app-photo>
              </el-carousel-item>
            </el-carousel>
            <app-photo v-else description="Nenhuma foto foi encontrada para o suspeito"></app-photo>
          </div>

          <div class="card-body p-2 text-center">
            <span v-if="model.codigoSituacao" class="badge badge-flat border-danger text-danger-600 w-50">{{ model.codigoSituacao | formatSituacaoCriminal }}</span>
          </div>
        </div>
      </div>
	  </div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Foto, Pessoa, CaracteristicaFisica } from '@/models';

@Component
export default class PessoaForm extends Vue {
  @Prop({ default: () => new Pessoa() }) private model!: Pessoa;
  @Prop({ default: () => [] as Foto[] }) private fotos!: Foto[];

  private onFotoZoom(foto: Foto, index: number): void {
    const selector = '#carousel-fotos';
    const reference: any = this.$el.querySelector(selector);
    if (reference) {
      reference.$viewer.view(index);
      reference.$viewer.show();
    }
  }

  private onFotoReload(foto: Foto): void {
    this.$emit('foto-reload', foto, this.model);
  }

  private get arrow(): string {
    return this.fotos && this.fotos.length > 1 ? 'always' : 'never';
  }

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

<style>
.el-carousel__container {
  height: 200px !important;
}
</style>
