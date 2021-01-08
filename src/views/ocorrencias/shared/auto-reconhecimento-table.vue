<template>
  <app-table-collapse header="Autos de reconhecimento fotográfico" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="text-center">Data da elaboração</th>
          <th>Reconhecedor(a)</th>
          <th>Tipo de pessoa</th>
          <th>RG</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(autoReconhecimento, index) in result.page.data" :key="autoReconhecimento.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td class="text-center">
            <span v-if="autoReconhecimento.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>
              {{ autoReconhecimento.dataIdentificacao | formatDate }}
            </span>
          </td>
          <td>{{ autoReconhecimento.reconhecedor.nome | startCase }}</td>
          <td>{{ autoReconhecimento.reconhecedor.tipoPessoa }}</td>
          <td>{{ autoReconhecimento.reconhecedor.rg }}</td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-auto-reconhecimento-menu" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: autoReconhecimento, event: 'view' }"><i class="icon-eye mr-1"></i> Visualizar Auto de Reconhecimento</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { AutoReconhecimento, Pageable, ResultList } from '@/models';

@Component
export default class AutoReconhecimentoTable extends Vue {
  @Prop({ default: () => new ResultList<AutoReconhecimento>() }) private result!: ResultList<AutoReconhecimento>;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('view' === command.event) {
      this.onView(command.data as AutoReconhecimento);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onView(autoReconhecimento: AutoReconhecimento): void {
    this.$emit('view-pdf', autoReconhecimento);
  }
}
</script>
