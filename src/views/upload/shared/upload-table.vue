<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Foto</th>
          <th>Nome</th>
          <th class="text-center">Nascimento</th>
          <th>RG</th>
          <th>CPF</th>
          <th>Nome da mãe</th>
          <th>Nome do pai</th>
          <th>Origem</th>
          <th class="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pessoa, index) in result.page.data" :key="pessoa.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <app-avatar v-if="pessoa.confidencial" empty-data="C" bg-class="bg-danger" alt="Foto" title="Pessoa sem foto"></app-avatar>
            <router-link v-else :to="toPessoaDetail(pessoa)">
              <app-avatar :data="pessoa.foto && pessoa.foto.base64" :empty-data="pessoa.nome | firstLetter" alt="Foto" :title="pessoa.nome"></app-avatar>
            </router-link>
          </td>
          <td>
            <span v-if="pessoa.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <router-link v-else :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.nome | startCase }}</router-link>
          </td>
          <td class="text-center">
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">
              {{ pessoa.dataNascimento | formatDate }}
            </router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" :title="sliceValue(pessoa.rgs)" class="text-dark">{{ pessoa.rgs | truncate }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" :title="sliceValue(pessoa.cpfs)" class="text-dark">{{ pessoa.cpfs | truncateCpfCnpj }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.nomeMae | startCase }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.nomePai | startCase }}</router-link>
          </td>
          <td>
            <router-link :to="toPessoaDetail(pessoa)" class="text-dark">{{ pessoa.origens | join }}</router-link>
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-upload-table"  class="icon-menu9"></i>
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
import _ from 'lodash';
import { Page, Pageable, Pessoa, ResultList } from '@/models';

@Component
export default class UploadTable extends Vue {
  @Prop({ default: () => new ResultList<Pessoa>() }) private result!: ResultList<Pessoa>;
  @Prop({ default: false }) private loading!: boolean;

  private onActions(command: any): void {
    if ('detail' === command.event) {
      this.onDetail(command.data as Pessoa);
    }
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(model: Pessoa): void {
    this.$emit('detail', model);
  }

  private toPessoaDetail(model: Pessoa): Location {
    return { name: 'PessoaDetail', params: { id: model.id }};
  }

  private sliceValue(value: string[]): string[] {
    const newValue = value != null ? value : [];
    return _.slice(newValue, 1, newValue.length);
  }

}
</script>
