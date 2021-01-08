<template>
  <app-card icon="icon-newspaper" header="Dados básicos" style="min-height: 440px;">
    <el-form label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="placa" label="Placa">
            <el-input type="text" :value="model.placa | placa" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="municipio" label="Município/UF">
            <el-input type="text" :value="model.municipio | startCase | join(model.uf)" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="marca" label="Marca/Modelo">
            <el-input type="text" :value="model.marca | join(model.modelo)" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="chassi" label="Chassi">
            <el-input type="text" :value="model.chassi" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="renavam" label="Renavam">
            <el-input type="text" :value="model.renavam" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="cor" label="Cor">
            <el-input type="text" :value="model.cor | startCase" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="tipo" label="Tipo de veículo">
            <el-input type="text" :value="model.tipo | startCase" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="ano-fabricacao-modelo" label="Ano de Fabricação/Modelo">
            <el-input type="text" :value="model.anoFabricacao | join(model.anoModelo)" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="especie" label="Espécie">
            <el-input type="text" :value="model.especie | startCase" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="carroceria" label="Carroceria">
            <el-input type="text" :value="model.carroceria" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="categoria" label="Categoria">
            <el-input type="text" :value="model.categoria | startCase" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Veiculo } from '@/models';

@Component
export default class VeiculoForm extends Vue {
  @Prop({ default: () => new Veiculo() }) private model!: Veiculo;
}
</script>
