<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="confidencial-column">Número/Ano</th>
          <th>Delegacia</th>
          <th>Vítima</th>
          <th class="text-center">Data do fato</th>
          <th class="text-center">Data da instauração</th>
          <th class="text-center">Incidência Penal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(inquerito, index) in result.page.data" :key="inquerito.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="inquerito.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>{{ inquerito.numero | join(inquerito.ano) }}</span>
          </td>
          <td>{{ inquerito.delegacia }}</td>
          <td>{{ inquerito.vitima | startCase }}</td>
          <td class="text-center">
            {{ inquerito.dataFato | formatDate }}
          </td>
          <td class="text-center">
            {{ inquerito.dataInstauracao | formatDate }}
          </td>
          <td class="text-center">
            <el-popover placement="right" width="400" trigger="hover" v-if="inquerito.incidencias && !inquerito.confidencial">
              <ul class="media-list text-center">
                <li v-for="incidencia in inquerito.incidencias" :key="incidencia.id" class="font-weight-bold">
                  {{ incidencia | formatIncidenciaPenal }}
                </li>
              </ul>
              <el-button v-if="inquerito.incidencias && !inquerito.confidencial" slot="reference" plain size="mini">
                ...
              </el-button>
            </el-popover>
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Inquerito, ResultList } from '@/models';

@Component
export default class InqueritoTable extends Vue {
  @Prop({ default: () => new ResultList<Inquerito>() }) private result!: ResultList<Inquerito>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
