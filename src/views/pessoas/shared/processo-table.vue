<template>
  <app-table-collapse :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="confidencial-column">Número/Ano</th>
          <th>Autoridade judiciária</th>
          <th>Tipo</th>
          <th class="text-center">Data da decisão</th>
          <th>Situação</th>
          <th>Número/Ano do inquérito</th>
          <th class="text-center">Incidência Penal</th>
          <th class="text-center">Penas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(processo, index) in result.page.data" :key="processo.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>
            <span v-if="processo.confidencial" class="badge badge-flat border-danger text-danger-600 d-block">Confidencial</span>
            <span v-else>
              {{ processo.numero | join(processo.ano) }}
            </span>
          </td>
          <td>{{ processo.autoridadeJudiciaria }}</td>
          <td>{{ processo.tipo | startCase }}</td>
          <td class="text-center">
            {{ processo.dataDecisao | formatDate }}
          </td>
          <td>{{ processo.situacao | startCase }}</td>
          <td>{{ processo.numeroInquerito | join(processo.anoInquerito) | encrypt(processo.confidencial) }}</td>
          <td class="text-center">
            <el-popover placement="right" width="400" trigger="hover" v-if="processo.incidencias && !processo.confidencial">
              <ul class="media-list text-center">
                <li v-for="incidencia in processo.incidencias" :key="incidencia.id" class="font-weight-bold">
                  {{ incidencia | formatIncidenciaPenal }}
                </li>
              </ul>
              <el-button v-if="processo.incidencias && !processo.confidencial" slot="reference" plain size="mini">
                 ...
              </el-button>
            </el-popover>
          </td>
          <td class="text-center">
            <el-popover placement="right" width="400" trigger="hover" v-if="processo.penas && !processo.confidencial">
              <ul class="media-list text-center">
                <li v-for="pena in processo.penas" :key="pena.id" class="font-weight-bold">
                  {{ pena | formatPena }}
                </li>
              </ul>
              <el-button v-if="processo.penas && !processo.confidencial" slot="reference" plain size="mini">
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

import { Processo, ResultList } from '@/models';

@Component
export default class ProcessoTable extends Vue {
  @Prop({ default: () => new ResultList<Processo>() }) private result!: ResultList<Processo>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }
}
</script>
