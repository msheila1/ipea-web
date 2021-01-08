<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" label-position="top">
      <div class="row">
        <div class="col-md">
          <el-form-item id="tipos-indices" prop="tiposIndices">
            <div slot="label">
              <span>Tipo de indice</span>
              <i v-b-tooltip title="Selecione indice que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select v-model="filter.indices" filterable multiple collapse-tags :class="[{'is-success': !!filter.indices.length}, 'w-100']">
              <el-option v-for="tipoServico in tiposIndices" :key="tipoServico" :label="tipoServico" :value="tipoServico"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { FiltroAuditoriaElasticsearch, Period, TipoResposta, TipoServico } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class ElasticsearchFilter extends Vue {
  @Prop({ default: () => new FiltroAuditoriaElasticsearch() }) private filter!: FiltroAuditoriaElasticsearch;
  @Prop({ default: () => [] }) private tiposIndices!: string[];
  @Prop() private loading!: boolean;

  protected mounted(): void {
    const self = this;

    // Vincula a execução da pesquisa à tecla ENTER
    self.$el.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { // ENTER
        self.onSearch();
      }
    });
  }

  private onReset(): void {
    const form: any = this.$refs.form;
    form.resetFields();

    this.$emit('reset', form);
  }

  private onSearch(): void {
    const self = this;

    const form: any = this.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      this.$emit('search', form);
    });
  }
}
</script>
