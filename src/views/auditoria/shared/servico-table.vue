<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th>Tipo do serviço</th>
          <th>Usuário solicitante</th>
          <th>Requisição</th>
          <th>Resposta</th>
          <th class="text-center">Tempo gasto (ms)</th>
          <th class="text-center">Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auditoria, index) in result.page.data" :key="auditoria.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td>{{ auditoria.tipoServico | lookup }}</td>
          <td>{{ auditoria.usuarioSolicitante }}</td>
          <td>
            <a id="visualizar-requisicao" href="#" @click="onOpen(auditoria); tabAtiva = 'requisicao';" class=" d-block">Visualizar conteúdo</a>
            <span class="font-weight-normal text-muted d-block"> {{ auditoria.dataRequisicao | formatDateTime }}</span>
          </td>
          <td>
            <a id="visualizar-resposta" href="#" @click="onOpen(auditoria); tabAtiva = 'resposta'" class=" d-block">Visualizar conteúdo</a>
            <span class="font-weight-normal text-muted d-block"> {{ auditoria.dataResposta | formatDateTime }}</span>
          </td>
          <td class="text-center">{{ auditoria.dataRequisicao | elapsed(auditoria.dataResposta, 'millis') | numeric }}</td>
          <td class="text-center">
            <span :class="[tipoRespostaClass(auditoria.tipoResposta), 'badge badge-flat rounded-0']">{{ auditoria.tipoResposta | lookup }}</span>
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

import { TipoRespostaEnum } from '@/enums';
import { AuditoriaServico, Page, Pageable, ResultList, TipoResposta, TipoServico } from '@/models';

@Component
export default class ServicoTable extends Vue {
  @Prop({ default: () => new ResultList<AuditoriaServico>() }) private result!: ResultList<AuditoriaServico>;
  @Prop({ default: false }) private loading!: boolean;

  private auditoria: AuditoriaServico = new AuditoriaServico();
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

  private onOpen(auditoria: AuditoriaServico): void {
    this.auditoria = auditoria;

    const modal: any = this.$refs.modal;
    modal.show();
  }

  private tipoRespostaClass(tipoResposta: TipoResposta): string {
    // tslint:disable-next-line:max-line-length
    return tipoResposta && tipoResposta.codigo === TipoRespostaEnum.OK ? 'border-success text-success-600' : 'border-danger text-danger-600';
  }

  private pretty(conteudo: string): string {
    try {
      return conteudo ? JSON.stringify(JSON.parse(conteudo), null, 2) : conteudo;

    } catch (error) {
      return conteudo;
    }
  }
}
</script>
