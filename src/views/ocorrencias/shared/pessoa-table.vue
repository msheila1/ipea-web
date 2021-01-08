<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Nome completo</th>
          <th>Tipo</th>
          <th>Situação</th>
          <th>RG</th>
          <th class="text-center">CPF</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pessoa, index) in result.page.data" :key="pessoa.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="pessoa.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <router-link v-else :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.nome | startCase }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.tipo }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.situacao }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.rg }}</router-link>
          </td>
          <td class="text-center">
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.cpf | cpfCnpj }}</router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-ocorrencia-pessoa-table" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: pessoa, event: 'detail' }"><i class="icon-eye mr-1"></i> Detalhar</el-dropdown-item>
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
import { Location } from 'vue-router';

import { Pageable, PessoaOcorrencia, ResultList } from '@/models';

@Component
export default class PessoaTable extends Vue {
  @Prop({ default: () => new ResultList<PessoaOcorrencia>() }) private result!: ResultList<PessoaOcorrencia>;
  @Prop() private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as PessoaOcorrencia);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(pessoa: PessoaOcorrencia): void {
    this.$emit('detail', pessoa);
  }

  private toPessoaDetail(pessoa: PessoaOcorrencia): Location {
    return { name: 'PessoaDetail', params: { id: pessoa.id }};
  }
}
</script>
