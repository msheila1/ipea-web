<template>
  <app-table-collapse header="Suspeitos selecionados para reconhecimento" :loading="loading" :result="result" @page-change="onPageChange" :collapsed="collapsed" :refreshable="false">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Foto</th>
          <th>Nome</th>
          <th>RG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reconhecido, index) in result.page.data" :key="reconhecido.id">
          <td class="text-center">{{ result.position(index) }}</td>
          <td><img :src="src(reconhecido.fotos)" alt="Foto" width="38" height="38" class="rounded-circle"></td>
          <td>{{ reconhecido.nome }}</td>
          <td>{{ reconhecido.rg }}</td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { Pageable, ResultList, Suspeito, Foto } from '@/models';

@Component
export default class SuspeitoTable extends Vue {
  @Prop({ default: () => new ResultList<Suspeito>() }) private result!: ResultList<Suspeito>;
  @Prop() private collapsed!: boolean;
  @Prop() private loading!: boolean;

  public onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private src(fotos: Foto[]): string {
    if (fotos && fotos.length) {
      const selecionadas = _.filter(fotos, ['selecionada', true]);
      const data = selecionadas[0].base64;

      return this.isBase64(data) ? `data:image/jpg;base64,${data}` : data;
    }

    return '/photos/placeholder.png';
  }

  private isBase64(value: string): boolean {
    try {
      return btoa(atob(value)) === value;
    } catch (err) {
      return false;
    }
  }
}
</script>
