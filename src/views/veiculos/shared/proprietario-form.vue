<template>
  <app-card style="min-height: 386px;">
    <el-form label-position="top">
      <div class="row">
        <div style="min-height: 19px;" class="col d-flex justify-content-end">
          <span v-if="model.confidencial" class="badge badge-flat border-danger text-danger-600">Confidencial</span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <el-form-item id="nome" label="Nome">
            <el-input type="text" :value="model.nome" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-4">
          <el-form-item id="rg" label="RG">
            <el-input type="text" :value="model.rg" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="uf" label="UF/Órgão">
            <el-input type="text" :value="model.rgUf | join(model.rgOrgao)" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="documento" label="Documento">
            <el-input type="text" :value="model.numeroDocumento | cpfCnpj" :readonly="true">
              <template v-if="model.tipoDocumento" slot="prepend">{{ model.tipoDocumento }}</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-sm-3">
          <el-form-item id="telefone" label="Telefone">
            <el-input type="text" :value="model.telefone | phone" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="endereco" label="Endereço">
            <el-input type="textarea" :value="model.endereco | address" :rows="3" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="text-center" v-if="!model.confidencial && model.id">
      <router-link id="pessoa-link" :to="toPessoaDetail(model)">Visualizar dossiê da pessoa<i class="icon-arrow-right8 ml-1"></i></router-link>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { ProprietarioVeiculo } from '@/models';

@Component
export default class ProprietarioForm extends Vue {
  @Prop({ default: () => new ProprietarioVeiculo() }) private model!: ProprietarioVeiculo;

  private toPessoaDetail(proprietario: ProprietarioVeiculo): Location {
    return { name: 'PessoaDetail', params: { id: proprietario.id }};
  }
}
</script>
