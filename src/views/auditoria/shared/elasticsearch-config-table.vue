<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <!--th>Nome do índice</th-->
          <th>Index</th>
          <th class="text-center">Quantidade de documentos</th>
          <th class="text-center">config</th>
          <th class="text-center">read_only</th>
          <th class="text-center">read_only_allow_delete</th>
          <th class="text-center">refresh_interval</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auditoria, index) in result.page.data" :key="auditoria.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <!--td>{{ auditoria.nomeIndice }}</td-->
          <td class="text-uppercase">{{ auditoria.index }}</td>
          <td class="text-center">{{ auditoria.count | numeric }}</td>
          <td class="text-center">
            <a id="visualizar-configuracao" href="#" @click="onOpen(auditoria); tabAtiva = 'visualizar';" class=" d-block">Visualizar conteúdo</a>
          </td>
          <td class="text-center">
            <span :class="[tipoRespostaClass(auditoria.readOnly), 'badge badge-flat rounded-0']">
              <h6 class="font-weight-semibold mb-0">{{ auditoria.readOnly }}</h6>
            </span>
          </td>
          <td class="text-center">
            <span :class="[tipoRespostaClass(auditoria.readOnlyAllowDelete), 'badge badge-flat rounded-0']">
              <h6 class="font-weight-semibold mb-0">{{ auditoria.readOnlyAllowDelete }}</h6>
            </span>
          </td>
          <td class="text-center">
            {{ auditoria.refreshInterval }}
          </td>
          <td class="text-center">
            <el-dropdown @command="onActions" trigger="click">
              <span class="el-dropdown-link">
                <i id="action-elastic-config-table" class="icon-menu9"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ data: auditoria, event: 'read_only' }"><i class="icon-eye mr-1"></i>Mudar read_only</el-dropdown-item>
                <el-dropdown-item :command="{ data: auditoria, event: 'read_only_allow_delete' }"><i class="icon-file-text mr-1"></i> Mudar read_only_allow_delete</el-dropdown-item>
                <el-dropdown-item :command="{ data: auditoria, event: 'refresh_interval' }"><i class="icon-file-pdf mr-1"></i> Mudar refresh_interval</el-dropdown-item>
                <el-dropdown-item :command="{ data: auditoria, event: 'config' }"><i class="icon-file-pdf mr-1"></i> Mudar configuraçoes</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal" ref="modal" title="Configuração Indice Elasticsearch" header-bg-variant="primary">
      <el-tabs tab-position="top" :value="tabAtiva" @tab-click="changeTab">
        <el-tab-pane id="visualizar-tab" name="visualizar" label="Visualizar" :disabled="!auditoria.config">
          <pre v-highlightjs="pretty(auditoria.config)" style="max-height: 450px; overflow-y: auto;">
            <code class="json"></code>
          </pre>
        </el-tab-pane>
        <el-tab-pane id="editar-tab" name="editar" label="Editar">
          <el-form id="form" :model="model" label-position="top">
            <el-input type="textarea" v-model="model.config" :value="model.config" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="modal-footer" class="text-right">
        <el-button id="close" type="default" @click="onClose">Fechar</el-button>
        <el-button type="success" size="mini" @click="onSave" :disabled="tabAtiva === 'visualizar'">Sim</el-button>
      </div>
    </b-modal>

  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { ElasticsearchConfig, Page, Pageable, ResultList } from '@/models';

@Component
export default class ElasticsearchConfigTable extends Vue {
  @Prop() private result!: ResultList<ElasticsearchConfig>;
  @Prop() private loading!: boolean;

  private auditoria: ElasticsearchConfig = new ElasticsearchConfig();
  private model: ElasticsearchConfig = new ElasticsearchConfig();
  private tabAtiva: string = 'visualizar';

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onActions(command: any): void {
    if ('read_only' === command.event) {
      this.onReadOnly(command.data as ElasticsearchConfig);

    } else if ('read_only_allow_delete' === command.event) {
      this.onReadOnlyAllowDelete(command.data as ElasticsearchConfig);

    } else if ('refresh_interval' === command.event) {
      this.onRefreshInterval(command.data as ElasticsearchConfig);
    } else if ('config' === command.event) {
      this.onOpen(command.data as ElasticsearchConfig);
    }
  }

  private onReadOnly(config: ElasticsearchConfig): void {
    const model = new ElasticsearchConfig();

    model.readOnly = config.readOnly === 'true' ? 'false' : 'true';
    model.id = config.id;
    this.$emit('set-configuration', model);
  }

  private onReadOnlyAllowDelete(config: ElasticsearchConfig): void {
    const model = new ElasticsearchConfig();

    model.readOnlyAllowDelete = config.readOnlyAllowDelete === 'true' ? 'false' : 'true';
    model.id = config.id;
    this.$emit('set-configuration', model);
  }

  private onRefreshInterval(config: ElasticsearchConfig): void {
    const model = new ElasticsearchConfig();

    model.refreshInterval = config.refreshInterval === '-1' ? '5s' : '-1';
    model.id = config.id;
    this.$emit('set-configuration', model);
  }

  private tipoRespostaClass(tipoResposta: string): string {
    // tslint:disable-next-line:max-line-length
    return tipoResposta === 'false' ? 'border-success text-success-600' : 'border-danger text-danger-600';
  }

  private onClose(): void {
    const modal: any = this.$refs.modal;
    modal.hide();
  }

  private onOpen(auditoria: ElasticsearchConfig): void {
    this.model.id = auditoria.id;
    this.auditoria = auditoria;
    const modal: any = this.$refs.modal;
    modal.show();
  }

  private onSave(): void {
    this.onClose();
    this.$emit('set-configuration', this.model);
  }

  private pretty(conteudo: string): string {
    try {
      return conteudo ? JSON.stringify(JSON.parse(conteudo), null, 2) : conteudo;

    } catch (error) {
      return conteudo;
    }
  }
  private changeTab(tab: any) {
    this.tabAtiva = tab.name;
  }

}
</script>
