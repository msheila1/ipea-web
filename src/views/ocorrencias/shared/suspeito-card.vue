<template>
  <div :id="id" class="card">
    <div class="card-header p-0">
      <el-carousel v-if="suspeito.fotos && suspeito.fotos.length" :id="`carousel-${id}`" :arrow="arrow" :autoplay="false" indicator-position="none" v-viewer>
        <el-carousel-item v-for="(foto, index) in suspeito.fotos" :key="foto.id">
          <app-photo :data="foto" :description="foto.origem" :selected="foto.selecionada" @select="onFotoSelect(foto)" @reload="onFotoReload(foto)" @zoom="onFotoZoom(foto, index)"></app-photo>
        </el-carousel-item>
        <app-block-ui v-show="suspeito.loading"></app-block-ui>
      </el-carousel>

      <app-photo v-else description="Nenhuma foto foi encontrada para o suspeito"></app-photo>
    </div>

    <div class="card-body p-2">
      <router-link :to="toPessoaDetail" title="Clique para visualizar o dossiê da pessoa" class="font-weight-bold">{{ suspeito.nome }}</router-link>
      <div class="list-icons list-icons-extended d-block">
        <small class="list-icons-item">
          <span class="font-weight-bold">RG </span>{{ suspeito.rg }}
        </small>
        <small class="list-icons-item">
          <span class="font-weight-bold">CPF </span>{{ suspeito.cpf | cpfCnpj }}
        </small>
      </div>
      <small class="d-block">
        <span class="font-weight-bold">B.O. </span>
        <router-link :to="toOcorrenciaDetail" title="Clique para visualizar o dossiê da ocorrência">{{ suspeito.ocorrencia.numero | join(suspeito.ocorrencia.ano) }}</router-link>
      </small>
      <small class="d-block">
        <span class="font-weight-normal">{{ suspeito.ocorrencia.delegacia | lookup('nome') }}</span>
      </small>
    </div>

    <div class="card-footer d-flex justify-content-between align-items-center p-2">
      <i id="action-ocorrencia-suspeito-card" :title="statusText" :class="statusClass"></i>

      <!--el-dropdown>
        <span class="list-icons-item"><i class="icon-menu9"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Confirmar</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { Foto, Suspeito } from '@/models';

@Component
export default class SuspeitoCard extends Vue {
  @Prop() private id!: string;
  @Prop({ default: () => new Suspeito() }) private suspeito!: Suspeito;

  private onFotoZoom(foto: Foto, index: number): void {
    const selector = '#carousel-' + this.id;
    const reference: any = this.$el.querySelector(selector);

    if (reference) {
      reference.$viewer.view(index);
      reference.$viewer.show();
    }
  }

  private onFotoReload(foto: Foto): void {
    this.$emit('foto-reload', foto, this.suspeito);
  }

  private onFotoSelect(foto: Foto, selected: boolean): void {
    this.$emit('foto-select', foto, this.suspeito, selected);
  }

  private get toOcorrenciaDetail(): Location {
    return { name: 'OcorrenciaDetail', params: { id: this.suspeito.ocorrencia.id } };
  }

  private get toPessoaDetail(): Location {
    return { name: 'PessoaDetail', params: { id: this.suspeito.idPessoa } };
  }

  private get statusClass(): string {
    let cssClass = 'icon-user text-muted';

    if (this.suspeito.fotos && this.suspeito.fotos.length > 0) {
      cssClass += this.suspeito.reconhecido ? 'icon-user-check text-success' : 'icon-user-cancel text-danger';
    }

    return cssClass;
  }

  private get statusText(): string {
    if (this.suspeito.fotos && this.suspeito.fotos.length > 0) {
      return this.suspeito.reconhecido ? 'Suspeito reconhecido' : 'Suspeito não reconhecido';
    }

    return 'Suspeito sem foto para reconhecimento';
  }

  private get arrow(): string {
    return this.suspeito.fotos && this.suspeito.fotos.length > 1 ? 'always' : 'never';
  }
}
</script>

<style>
.el-carousel__container {
  height: 200px !important;
}
</style>
