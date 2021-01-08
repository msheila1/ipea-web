<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" label-position="top">
      <div class="row">
        <div class="col-sm-6">
          <el-form-item id="tipos-servicos" prop="tiposServicos">
            <div slot="label">
              <span>Tipos de serviços</span>
              <i v-b-tooltip title="Selecione os tipos de serviços que deseja pesquisar." class="icon-help"></i>
            </div>
            <el-select ref="tiposServicos" v-model="filter.tiposServicos" filterable multiple collapse-tags autofocus :class="[{'is-success': !!filter.tiposServicos.length}, 'w-100']">
              <el-option v-for="tipoServico in tiposServicos" :key="tipoServico.codigo" :label="tipoServico.descricao" :value="tipoServico.codigo"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="reset-cache" type="warning" @click="onResetCache"><i class="icon-database-remove mr-1"></i>Limpar cache</el-button>
      <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { FiltroCache, TipoServico } from '@/models';

@Component
export default class CacheFilter extends Vue {
  @Prop() private filter!: FiltroCache;
  @Prop() private loading!: boolean;
  @Prop() private tiposServicos!: TipoServico[];

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.tiposServicos as HTMLInputElement).focus();

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

  private onResetCache(): void {
    this.$emit('reset-cache', this.$refs.form);
  }

  private onSearch(): void {
    this.$emit('search', this.$refs.form);
  }
}
</script>
