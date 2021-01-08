<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Tipo de serviço</th>
          <th>Chave de identificação</th>
          <th>Tempo de expiração</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cache, index) in result.page.data" :key="cache.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>{{ cache.tipoServico }}</td>
          <td>
            <ul class="list-inline list-inline-dotted mb-0">
              <li v-show="cache.rg" class="list-inline-item">
                <span class="font-weight-semibold">RG </span>{{ cache.rg }}
              </li>
              <li v-show="cache.cpf" class="list-inline-item">
                <span class="font-weight-semibold">CPF </span>{{ cache.cpf | cpfCnpj }}
              </li>
            </ul>
          </td>
          <td>{{ cache.tempoExpiracao }}</td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-cache-table" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: cache, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
                <el-dropdown-item :command="{ data: cache, event: 'remove' }" class="text-danger"><i class="icon-trash mr-1"></i> Remover</el-dropdown-item>
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

import { Cache, Page, Pageable, ResultList } from '@/models';

@Component
export default class CacheTable extends Vue {
  @Prop() private result!: ResultList<Cache>;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as Cache);

    } else if ('remove' === command.event) {
      this.onRemove(command.data as Cache);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(model: Cache): void {
    this.$emit('detail', model);
  }

  private onRemove(model: Cache): void {
    this.$emit('remove', model);
  }
}
</script>
