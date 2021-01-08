<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <table class="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th v-show="isShowColumn('tipoServico')">Tipo de serviço</th>
          <th v-show="isShowColumn('funcionalidade')">Funcionalidade</th>
          <th v-show="isShowColumn('usuarioSolicitante')">Usuário solicitante</th>
          <th v-show="isShowColumn('totalAcessos')" class="text-center">Total de acessos</th>
          <th v-show="isShowColumn('requisicao')">Requisição</th>
          <th v-show="isShowColumn('resposta')">Resposta</th>
          <th v-show="isShowColumn('tempo')" class="text-center">Tempo gasto (ms)</th>
          <th v-show="isShowColumn('status')" class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auditoria, index) in result.page.data" :key="auditoria.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td v-show="isShowColumn('tipoServico')">{{ auditoria.tipoServico | lookup }}</td>
          <td v-show="isShowColumn('funcionalidade')">{{ auditoria.funcionalidade | lookup }}</td>
          <td v-show="isShowColumn('usuarioSolicitante')">
            <ul class="list-inline list-inline-dotted mb-0">
              <li v-show="auditoria.nomeUsuario" class="list-inline-item">
                {{ auditoria.nomeUsuario | startCase }}
              </li>
              <li v-show="auditoria.rgUsuario" class="list-inline-item">
                <span class="font-weight-semibold">RG </span>{{ auditoria.rgUsuario }}
              </li>
            </ul>
          </td>
          <td v-show="isShowColumn('totalAcessos')" class="text-center">{{ auditoria.totalAcessos }}</td>
          <td v-show="isShowColumn('requisicao')">
            <a id="visualizar-requisicao" href="#" @click="onOpen(auditoria); tabAtiva = 'requisicao';" class=" d-block">Visualizar conteúdo</a>
            <span class="font-weight-normal text-muted d-block"> {{ auditoria.dataRequisicao | formatDateTime }}</span>
          </td>
          <td v-show="isShowColumn('resposta')">
            <a id="visualizar-resposta" href="#" @click="onOpen(auditoria); tabAtiva = 'resposta';" class=" d-block">Visualizar conteúdo</a>
            <span class="font-weight-normal text-muted d-block"> {{ auditoria.dataResposta | formatDateTime }}</span>
          </td>
          <td v-show="isShowColumn('tempo')" class="text-center">{{ auditoria.dataRequisicao | elapsed(auditoria.dataResposta, 'millis') | numeric }}</td>
          <td v-show="isShowColumn('status')" class="text-center">
            <span :class="[statusClass(auditoria.status), 'badge badge-flat rounded-0']">{{ auditoria.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal" ref="modal" title="Conteúdo Trafegado" header-bg-variant="primary">
      <el-tabs tab-position="top" :value="tabAtiva">
        <el-tab-pane id="requisicao-tab" name="requisicao" label="Requisição" :disabled="!auditoria.conteudoRequisicao">
          <pre v-highlightjs="pretty(auditoria.conteudoRequisicao)" style="max-height: 450px; overflow-y: auto;">
            <code class="json"></code>
          </pre>
        </el-tab-pane>
        <el-tab-pane id="resposta-tab" name="resposta" label="Resposta" :disabled="!auditoria.conteudoResposta">
          <pre v-highlightjs="pretty(auditoria.conteudoResposta)" style="max-height: 450px; overflow-y: auto;">
            <code class="json"></code>
          </pre>
        </el-tab-pane>
      </el-tabs>

      <div slot="modal-footer" class="text-right">
        <el-button id="close" type="default" @click="onClose">Fechar</el-button>
      </div>
    </b-modal>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { TipoRelatorioEnum } from '@/enums';
import { AuditoriaAcesso, Page, Pageable, ResultList, TipoRelatorio } from '@/models';

@Component
export default class ServicoTable extends Vue {
  @Prop({ default: () => new ResultList<AuditoriaAcesso>() }) private result!: ResultList<AuditoriaAcesso>;
  @Prop({ default: false }) private loading!: boolean;
  @Prop() private tipoRelatorio!: number;

  private auditoria: AuditoriaAcesso = new AuditoriaAcesso();
  private tabAtiva: string = 'requisicao';

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onClose(): void {
    const modal: any = this.$refs.modal;
    modal.hide();
  }

  private onOpen(auditoria: AuditoriaAcesso): void {
    this.auditoria = auditoria;

    const modal: any = this.$refs.modal;
    modal.show();
  }

  // TODO Verificar se não há possibilidade de criar um enum no backend para não deixar hardcode.
  private statusClass(status: string): string {
    return status === 'CRIADO' ? 'border-success text-success-600' : 'border-danger text-danger-600';
  }

  private pretty(conteudo: string): string {
    try {
      return conteudo ? JSON.stringify(JSON.parse(conteudo), null, 2) : conteudo;

    } catch (error) {
      return conteudo;
    }
  }

  private isShowColumn(columnName: string): boolean {
    const self = this;
    const codigo = self.tipoRelatorio;

    let show = false;

    if (codigo === TipoRelatorioEnum.AUDITORIA_ANALITICA) {
      // tslint:disable-next-line:max-line-length
      show = _.includes([ 'tipoServico', 'funcionalidade', 'usuarioSolicitante', 'periodo', 'requisicao', 'resposta', 'tempo', 'status' ], columnName);

    } else if (codigo === TipoRelatorioEnum.ACESSOS_POR_FUNCIONALIDADE) {
      show = _.includes([ 'tipoServico', 'funcionalidade', 'usuarioSolicitante', 'totalAcessos' ], columnName);

    } else if (codigo === TipoRelatorioEnum.ACESSOS_POR_SERVICO) {
      show = _.includes([ 'tipoServico', 'usuarioSolicitante', 'totalAcessos' ], columnName);

    } else if (codigo === TipoRelatorioEnum.ACESSOS_POR_USUARIO) {
      show = _.includes([ 'usuarioSolicitante', 'totalAcessos' ], columnName);
    }

    return show;
  }
}
</script>
