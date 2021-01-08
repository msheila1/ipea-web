<template>
  <app-card icon="icon-filter3" header="Filtros para pesquisa" :collapsible="true">
    <el-form id="form" ref="form" :model="filter" label-position="top">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item id="data-criacao" prop="dataCriacao">
            <div slot="label">
              <span>Data da criação</span>
              <i v-b-tooltip title="Informe a data da criação da carga." class="icon-help"></i>
            </div>
            <el-select v-model="filter.dataCriacao" filterable :class="[{'is-success': !!filter.dataCriacao}, 'w-100']">
              <el-option v-for="dataCriacao in datas" :key="dataCriacao" :label="dataCriacao | formatDateTime" :value="dataCriacao"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="update" type="warning" @click="onUpdate"><i class="icon-database-diff mr-1"></i>Atualizar carga</el-button>
      <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { FiltroAuditoriaCarga } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class CargaFilter extends Vue {
  @Prop({ default: () => new FiltroAuditoriaCarga() }) private filter!: FiltroAuditoriaCarga;
  @Prop({ default: false }) private loading!: boolean;
  @Prop({ default: [] }) private datas!: Date[];

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
    this.$emit('search', this.$refs.form);
  }

  private onUpdate(): void {
    this.$emit('update', this.$refs.form);
  }
}
</script>
