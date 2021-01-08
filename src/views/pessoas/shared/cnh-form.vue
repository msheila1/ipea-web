<template>
  <app-card>
    <el-form label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="condutor" label="Condutor">
            <el-input type="text" :value="cnh.condutor | startCase" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="registro" label="Registro">
            <el-input type="text" :value="cnh.registro" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="categoria" label="Categoria">
            <el-input type="text" :value="cnh.categoria" :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="validade" label="Validade">
            <el-input type="text" :value="cnh.dataValidade | formatDate" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="endereco" label="Endereço">
            <el-input type="text" :value="cnh.endereco | address" :readonly="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Cnh } from '@/models';

@Component
export default class CnhForm extends Vue {
  @Prop({ default: () => new Cnh() }) private cnh!: Cnh;
}
</script>
