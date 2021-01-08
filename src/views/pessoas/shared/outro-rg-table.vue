<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="confidencial-column">RG</th>
          <th>Origem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(outroRg, index) in result.page.data" :key="outroRg.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="outroRg.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>
              <a id="visualizar-rg" @click="onDetail(outroRg);" class="text-dark">{{ outroRg.numero }}</a>
            </span>
          </td>
          <td>
            <a id="visualizar-rg" @click="onDetail(outroRg);" class="text-dark">{{ outroRg.origem | startCase }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { OutroRg, Pageable, ResultList } from '@/models';

@Component
export default class OutroRgTable extends Vue {
  @Prop({ default: () => new ResultList<OutroRg>() }) private result!: ResultList<OutroRg>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(model: OutroRg): void {
    this.$emit('detail', model);
  }
}
</script>
