<template>
  <div id="pessoa-detail">
    <app-page-header title="Pessoas" subtitle="Detalhe">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link id="home-link" to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <router-link id="pessoas-link" to="/pessoas" class="breadcrumb-item">Pessoas</router-link>
        <span id="active-link" class="breadcrumb-item active">{{ pessoa.nome }}</span>
      </div>
    </app-page-header>

    <div class="row">
      <div class="col-sm">
        <pessoa-form id="pessoa-form" :model="pessoa" :fotos="fotos" @foto-reload="onFotoReload"></pessoa-form>
      </div>
      <div class="col-sm">
        <el-tabs tab-position="top" :value="tabAtivaDadosBasicos" @tab-click="changeTabDadosBasicos">
          <el-tab-pane id="cnh-tab" name="cnh" label="CNH">
            <cnh-form id="cnh-form" :cnh="cnhPessoa"></cnh-form>
          </el-tab-pane>
          <el-tab-pane id="outro-rg-tab" name="outrosRgs" :disabled="outrosRgs.isEmpty()">
            <span slot="label">
              Outros RGs <span class="badge badge-pill">{{ outrosRgs.count() }}</span>
            </span>

            <outro-rg-table id="outro-rg-table" :loading="loadingOutrosRgs" :result="outrosRgs" @page-change="onOutroRgPageChange" @refresh="onOutroRgRefresh" @detail="onDetailOutrosRgs"></outro-rg-table>
          </el-tab-pane>
          <el-tab-pane id="criminal-tab" name="criminal" label="Criminal" :disabled="!criminal.id">
            <criminal-form id="criminal-form" :criminal="criminal" :loading="loadingCriminal"></criminal-form>
          </el-tab-pane>
          <el-tab-pane id="outros-cadastros-tab" name="receitaFederal" label="Receita Federal" :disabled="!receitaFederal.id">
            <outros-cadastros-form id="outros-cadastros-form" :cadastros="receitaFederal"></outros-cadastros-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane label="Pessoas relacionadas">
            <conhecido-carousel id="conhecido-carousel" :loading="loadingConhecidos"></conhecido-carousel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div-->
    <div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane id="inquerito-tab" :disabled="inqueritos.isEmpty()">
            <span slot="label">
              Inquéritos <span class="badge badge-pill">{{ inqueritos.count() }}</span>
            </span>

            <inquerito-table id="inquerito-table" :loading="loadingInqueritos" :result="inqueritos" @page-change="onInqueritoPageChange" @refresh="onInqueritoRefresh"></inquerito-table>
          </el-tab-pane>
          <el-tab-pane id="processo-tab" :disabled="processos.isEmpty()">
            <span slot="label">
              Processos <span class="badge badge-pill">{{ processos.count() }}</span>
            </span>

            <processo-table id="processo-table" :loading="loadingProcessos" :result="processos" @page-change="onProcessoPageChange" @refresh="onProcessoRefresh"></processo-table>
          </el-tab-pane>
          <el-tab-pane id="mandado-tab" :disabled="mandados.isEmpty()">
            <span slot="label">
              Mandados <span class="badge badge-pill">{{ mandados.count() }}</span>
            </span>

            <mandado-table id="mandado-table" :loading="loadingMandados" :result="mandados" @page-change="onMandadoPageChange" @refresh="onMandadoRefresh"></mandado-table>
          </el-tab-pane>
          <el-tab-pane id="alcunha-tab" :disabled="alcunhas.isEmpty()">
            <span slot="label">
              Alcunhas <span class="badge badge-pill">{{ alcunhas.count() }}</span>
            </span>

            <alcunha-table id="alcunha-table" :loading="loadingAlcunhas" :result="alcunhas" @page-change="onAlcunhaPageChange" @refresh="onAlcunhaRefresh"></alcunha-table>
          </el-tab-pane>
          <el-tab-pane id="outro-nome-tab" :disabled="outrosNomes.isEmpty()">
            <span slot="label">
              Outros nomes <span class="badge badge-pill">{{ outrosNomes.count() }}</span>
            </span>

            <outro-nome-table id="outro-nome-table" :loading="loadingOutrosNomes" :result="outrosNomes" @page-change="onOutroNomePageChange" @refresh="onOutroNomeRefresh"></outro-nome-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <ocorrencia-table id="ocorrencia-table" :loading="loadingOcorrencias" :result="ocorrencias" @page-change="onOcorrenciaPageChange" @refresh="onOcorrenciaRefresh" @detail="onOcorrenciaDetail" @view-pdf="onOcorrenciaViewPDF"></ocorrencia-table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <el-tabs tab-position="top">
          <el-tab-pane id="veiculo-atual-tab" :disabled="veiculosAtuais.isEmpty()">
            <span slot="label">
              Veículos atuais <span class="badge badge-pill">{{ veiculosAtuais.count() }}</span>
            </span>

            <veiculo-table id="veiculo-atual-table" :loading="loadingVeiculosAtuais" :result="veiculosAtuais" @page-change="onVeiculoAtualPageChange" @refresh="onVeiculoAtualRefresh" @detail="onVeiculoAtualDetail"></veiculo-table>
          </el-tab-pane>
          <el-tab-pane id="veiculo-anterior-tab" :disabled="veiculosAnteriores.isEmpty()">
            <span slot="label">
              Veículos anteriores <span class="badge badge-pill">{{ veiculosAnteriores.count() }}</span>
            </span>

            <veiculo-table id="veiculo-anterior-table" :loading="loadingVeiculosAnteriores" :result="veiculosAnteriores" @page-change="onVeiculoAnteriorPageChange" @refresh="onVeiculoAnteriorRefresh" @detail="onVeiculoAnteriorDetail"></veiculo-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <outro-endereco-table id="outro-endereco-table" :loading="loadingOutrosEnderecos" :result="outrosEnderecos" @page-change="onOutroEnderecoPageChange" @refresh="onOutroEnderecoRefresh"></outro-endereco-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Notification } from 'element-ui';

import { EncryptHelper } from '@/helpers';
import {
  Alcunha,
  Cnh,
  Criminal,
  Documento,
  Endereco,
  FiltroPessoaOcorrencia,
  FiltroPessoaVeiculo,
  Foto,
  Inquerito,
  Mandado,
  Ocorrencia,
  OutroNome,
  OutroRg,
  ReceitaFederal,
  Pageable,
  Pessoa,
  Processo,
  ResultList,
  Veiculo,
} from '@/models';
import { DownloadsService, OcorrenciasService, OutroCadastroService, PessoasService } from '@/services';
import AlcunhaTable from '@/views/pessoas/shared/alcunha-table.vue';
import CnhForm from '@/views/pessoas/shared/cnh-form.vue';
import ConhecidoCarousel from '@/views/pessoas/shared/conhecido-carousel.vue';
import CriminalForm from '@/views/pessoas/shared/criminal-form.vue';
import MandadoTable from '@/views/pessoas/shared/mandado-table.vue';
import InqueritoTable from '@/views/pessoas/shared/inquerito-table.vue';
import OcorrenciaTable from '@/views/pessoas/shared/ocorrencia-table.vue';
import OutroEnderecoTable from '@/views/pessoas/shared/outro-endereco-table.vue';
import OutroNomeTable from '@/views/pessoas/shared/outro-nome-table.vue';
import OutroRgTable from '@/views/pessoas/shared/outro-rg-table.vue';
import OutrosCadastrosForm from '@/views/pessoas/shared/outros-cadastros-form.vue';
import PessoaForm from '@/views/pessoas/shared/pessoa-form.vue';
import ProcessoTable from '@/views/pessoas/shared/processo-table.vue';
import VeiculoTable from '@/views/pessoas/shared/veiculo-table.vue';

@Component({
  components: {
    AlcunhaTable,
    CnhForm,
    ConhecidoCarousel,
    CriminalForm,
    InqueritoTable,
    MandadoTable,
    OcorrenciaTable,
    OutroEnderecoTable,
    OutroNomeTable,
    OutroRgTable,
    OutrosCadastrosForm,
    PessoaForm,
    ProcessoTable,
    VeiculoTable,
  },
})
export default class PessoaDetail extends Vue {
  private pessoa = new Pessoa();
  private cnhPessoa = new Cnh();
  private receitaFederal = new ReceitaFederal();
  private tabAtivaDadosBasicos: string = 'cnh';

  protected beforeRouteEnter(to: Route, from: Route, next: any): void {
    if (to.params.id && to.params.id.startsWith(EncryptHelper.MASK)) {
      Notification.warning({
        title: 'Confidencial',
        message: 'Usuário sem permissão para visualizar registro confidencial.',
      });
      next(false);

    } else {
      PessoasService.findById(to.params.id).toPromise()
        .then((pessoa: Pessoa) => {
          if (pessoa && pessoa.id) {
            next((vm: any) => {
              vm.pessoa = pessoa;

              vm.dispatchFotos(pessoa);
              vm.dispatchCnh(pessoa);
              vm.dispatchCriminal(pessoa.id);
              vm.dispatchOutroCadastro(pessoa.cpf);
              vm.dispatchVeiculosAtuais(pessoa.cpf, new Pageable());
              vm.dispatchVeiculosAnteriores(pessoa.cpf, new Pageable());
              vm.dispatchOutrosRgs(pessoa, new Pageable(1, 5));
              vm.dispatchInqueritos(pessoa.rg, new Pageable());
              vm.dispatchProcessos(pessoa.rg, new Pageable());
              vm.dispatchMandados(pessoa.rg, new Pageable());
              vm.dispatchAlcunhas(pessoa, new Pageable());
              vm.dispatchOutrosNomes(pessoa, new Pageable());
              vm.dispatchOcorrencia(pessoa, new Pageable());
              vm.dispatchOutrosEnderecos(pessoa, new Pageable());
            });

          } else {
            Notification.warning({ title: 'Navegação', message: 'Registro não encontrado.' });
            next(false);
          }
        })
        .catch((error: Error) => {
          Notification.error({ title: 'Navegação', message: error.message });
          next(false);
        });
    }
  }

  protected beforeRouteUpdate(to: Route, from: Route, next: any): void {
    const self = this;

    if (to.params.id && to.params.id.startsWith(EncryptHelper.MASK)) {
      Notification.warning({
        title: 'Confidencial',
        message: 'Usuário sem permissão para visualizar registro confidencial.',
      });
      next(false);

    } else {
      PessoasService.findById(to.params.id).toPromise()
        .then((pessoa: Pessoa) => {
          if (pessoa && pessoa.id) {
            self.pessoa = pessoa;

            self.dispatchFotos(pessoa);
            self.dispatchCnh(pessoa);
            self.dispatchCriminal(pessoa.id);
            self.dispatchOutroCadastro(pessoa.cpf);
            self.dispatchVeiculosAtuais(pessoa.cpf, new Pageable());
            self.dispatchVeiculosAnteriores(pessoa.cpf, new Pageable());
            self.dispatchOutrosRgs(pessoa, new Pageable(1, 5));
            self.dispatchInqueritos(pessoa.rg, new Pageable());
            self.dispatchProcessos(pessoa.rg, new Pageable());
            self.dispatchMandados(pessoa.rg, new Pageable());
            self.dispatchAlcunhas(pessoa, new Pageable());
            self.dispatchOutrosNomes(pessoa, new Pageable());
            self.dispatchOcorrencia(pessoa, new Pageable());
            self.dispatchOutrosEnderecos(pessoa, new Pageable());

            next();

          } else {
            Notification.warning({ title: 'Navegação', message: 'Registro não encontrado.' });
            next(false);
          }
        })
        .catch((error: Error) => {
          Notification.error({ title: 'Navegação', message: error.message });
          next(false);
        });
    }
  }

  private changeTabDadosBasicos(tab: any) {
    this.tabAtivaDadosBasicos = tab.name;
  }

  /**
   * Dados Básicos
   */

  private get fotos(): Foto[] {
    return this.$store.getters['pessoas/fotos'];
  }

  /**
   * Outros RGs
   */

  private onOutroRgRefresh(pageNumber: number): void {
    this.dispatchOutrosRgs(this.pessoa, new Pageable(pageNumber, 5));
  }

  private onOutroRgPageChange(pageNumber: number): void {
    this.dispatchPageChangeOutrosRgs(new Pageable(pageNumber, 5));
  }

  private get outrosRgs(): ResultList<OutroRg> {
    return this.$store.getters['outros-rgs/resultList'];
  }

  private get loadingOutrosRgs(): boolean {
    return this.$store.getters['outros-rgs/loading'];
  }

  private dispatchOutrosRgs(model: Pessoa, pageable: Pageable): void {
    const filter = {
      rg: model.rg,
      cpf: model.cpf,
      nome: model.nome,
      nomeMae: model.nomeMae,
      nomePai: model.nomePai,
      dataNascimento: model.dataNascimento,
      confidencial: model.confidencial,
      origem: model.origem,
    };
    this.$store.dispatch('outros-rgs/listOutrosRgs', { pessoaId: model.id, filter, pageable });
  }

  private onDetailOutrosRgs(model: OutroRg): void {
    this.tabAtivaDadosBasicos = model.origem === 'criminal' ? 'criminal' : this.tabAtivaDadosBasicos;
    if (model.origem === 'criminal') {
      this.dispatchCriminal(model.id);
    }
  }

  private dispatchPageChangeOutrosRgs(pageable: Pageable): void {
    this.$store.dispatch('outros-rgs/queryPageChange', { pageable });
  }

  /**
   * Criminal
   */

  private get criminal(): Criminal {
    return this.$store.getters['criminal/modal'];
  }

  private get loadingCriminal(): boolean {
    return this.$store.getters['criminal/loading'];
  }

  private dispatchCriminal(id: string): void {
    this.$store.dispatch('criminal/findById', { id, pessoaId: this.$route.params.id });
  }

  /**
   * Ocorrências relacionadas a pessoa
   */

  private onOcorrenciaRefresh(pageNumber: number): void {
    this.dispatchOcorrencia(this.pessoa, new Pageable(pageNumber));
  }

  private onOcorrenciaPageChange(pageNumber: number): void {
    this.dispatchOcorrencia(this.pessoa, new Pageable(pageNumber));
  }

  private onOcorrenciaDetail(model: Ocorrencia): void {
    this.$router.push({ name: 'OcorrenciaDetail', params: { id: model.id } });
  }

  private onOcorrenciaViewPDF(model: Ocorrencia): void {
    OcorrenciasService.download(model).toPromise()
      .then((documento: Documento) => {
        DownloadsService.open(documento);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private get ocorrencias(): ResultList<Ocorrencia> {
    return this.$store.getters['pessoas-ocorrencias/resultList'];
  }

  private get loadingOcorrencias(): boolean {
    return this.$store.getters['pessoas-ocorrencias/loading'];
  }

  private dispatchOcorrencia(model: Pessoa, pageable: Pageable): void {
    const filter = {
      nomes: model.nome,
      rgs: model.rg,
      cpfs: model.cpf,
    } as FiltroPessoaOcorrencia;

    this.$store.dispatch('pessoas-ocorrencias/query', { pessoaId: model.id, filter, pageable });
  }

  /**
   * Inquéritos
   */

  private onInqueritoRefresh(pageNumber: number): void {
    this.dispatchInqueritos(this.pessoa.rg, new Pageable(pageNumber));
  }

  private onInqueritoPageChange(pageNumber: number): void {
    this.dispatchInqueritos(this.pessoa.rg, new Pageable(pageNumber));
  }

  private get inqueritos(): ResultList<Inquerito> {
    return this.$store.getters['inqueritos/resultList'];
  }

  private get loadingInqueritos(): boolean {
    return this.$store.getters['inqueritos/loading'];
  }

  private dispatchInqueritos(rgs: string, pageable: Pageable): void {
    // tslint:disable-next-line:max-line-length
    this.$store.dispatch('inqueritos/listFetchIncidenciasPenais', { pessoaId: this.$route.params.id, filter: { rgs } , pageable });
  }

  /**
   * Processos
   */

  private onProcessoRefresh(pageNumber: number): void {
    this.dispatchProcessos(this.pessoa.rg, new Pageable(pageNumber));
  }

  private onProcessoPageChange(pageNumber: number): void {
    this.dispatchProcessos(this.pessoa.rg, new Pageable(pageNumber));
  }

  private get processos(): ResultList<Processo> {
    return this.$store.getters['processos/resultList'];
  }

  private get loadingProcessos(): boolean {
    return this.$store.getters['processos/loading'];
  }

  private dispatchProcessos(rgs: string, pageable: Pageable): void {
    // tslint:disable-next-line:max-line-length
    this.$store.dispatch('processos/listFetchIncidenciasPenais', { pessoaId: this.$route.params.id, filter: { rgs } , pageable });
  }

  /**
   * Mandados
   */

  private onMandadoRefresh(pageNumber: number): void {
    this.dispatchMandados(this.pessoa.rg, new Pageable(pageNumber));
  }

  private onMandadoPageChange(pageNumber: number): void {
    this.dispatchMandados(this.pessoa.rg, new Pageable(pageNumber));
  }

  private get mandados(): ResultList<Mandado> {
    return this.$store.getters['mandados/resultList'];
  }

  private get loadingMandados(): boolean {
    return this.$store.getters['mandados/loading'];
  }

  private dispatchMandados(rgs: string, pageable: Pageable): void {
    this.$store.dispatch('mandados/listMandados', { pessoaId: this.$route.params.id, filter: { rgs } , pageable });
  }

  /**
   * Alcunhas
   */

  private onAlcunhaRefresh(pageNumber: number): void {
    this.dispatchAlcunhas(this.pessoa, new Pageable(pageNumber));
  }

  private onAlcunhaPageChange(pageNumber: number): void {
    this.dispatchAlcunhas(this.pessoa, new Pageable(pageNumber));
  }

  private get alcunhas(): ResultList<Alcunha> {
    return this.$store.getters['alcunhas/resultList'];
  }

  private get loadingAlcunhas(): boolean {
    return this.$store.getters['alcunhas/loading'];
  }

  private dispatchAlcunhas(model: Pessoa, pageable: Pageable): void {
    this.$store.dispatch('alcunhas/listAlcunhas', { pessoaId: model.id, filter: { rgs: model.rg } , pageable });
  }

  /**
   * Outros Nomes
   */

  private onOutroNomeRefresh(pageNumber: number): void {
    this.dispatchOutrosNomes(this.pessoa, new Pageable(pageNumber));
  }

  private onOutroNomePageChange(pageNumber: number): void {
    this.dispatchOutrosNomes(this.pessoa, new Pageable(pageNumber));
  }

  private get outrosNomes(): ResultList<OutroNome> {
    return this.$store.getters['outros-nomes/resultList'];
  }

  private get loadingOutrosNomes(): boolean {
    return this.$store.getters['outros-nomes/loading'];
  }

  private dispatchOutrosNomes(model: Pessoa, pageable: Pageable): void {
    this.$store.dispatch('outros-nomes/listOutrosNomes', { pessoaId: model.id, filter: { rgs: model.rg } , pageable });
  }

  /**
   * Veículos atuais
   */

  private onVeiculoAtualRefresh(pageNumber: number): void {
    this.dispatchVeiculosAtuais(this.pessoa.cpf, new Pageable(pageNumber));
  }

  private onVeiculoAtualPageChange(pageNumber: number): void {
    this.dispatchVeiculosAtuais(this.pessoa.cpf, new Pageable(pageNumber));
  }

  private onVeiculoAtualDetail(model: Veiculo): void {
    this.$router.push({ name: 'VeiculoDetail', params: { id: model.id } });
  }

  private get veiculosAtuais(): ResultList<Veiculo> {
    return this.$store.getters['pessoas-veiculos/resultList'];
  }

  private get loadingVeiculosAtuais(): boolean {
    return this.$store.getters['pessoas-veiculos/loading'];
  }

  private dispatchVeiculosAtuais(cpf: string, pageable: Pageable): void {
    const filter = new FiltroPessoaVeiculo();
    filter.cpfCnpjProprietario = cpf;

    this.$store.dispatch('pessoas-veiculos/query', { filter, pageable });
  }

  /**
   * Veículos anteriores
   */

  private onVeiculoAnteriorRefresh(pageNumber: number): void {
    this.dispatchVeiculosAnteriores(this.pessoa.cpf, new Pageable(pageNumber));
  }

  private onVeiculoAnteriorPageChange(pageNumber: number): void {
    this.dispatchVeiculosAnteriores(this.pessoa.cpf, new Pageable(pageNumber));
  }

  private onVeiculoAnteriorDetail(model: Veiculo): void {
    this.$router.push({ name: 'VeiculoDetail', params: { id: model.id } });
  }

  private get veiculosAnteriores(): ResultList<Veiculo> {
    return this.$store.getters['pessoas-veiculos-anteriores/resultList'];
  }

  private get loadingVeiculosAnteriores(): boolean {
    return this.$store.getters['pessoas-veiculos-anteriores/loading'];
  }

  private dispatchVeiculosAnteriores(cpf: string, pageable: Pageable): void {
    this.$store.dispatch('pessoas-veiculos-anteriores/query', { filter: { cpfCivil: cpf }, pageable });
  }

  /**
   * Outros endereços
   */

  private onOutroEnderecoRefresh(pageNumber: number): void {
    this.dispatchOutrosEnderecos(this.pessoa, new Pageable(pageNumber));
  }

  private onOutroEnderecoPageChange(pageNumber: number): void {
    this.dispatchOutrosEnderecos(this.pessoa, new Pageable(pageNumber));
  }

  private get outrosEnderecos(): ResultList<Endereco> {
    return this.$store.getters['enderecos/resultList'];
  }

  private get loadingOutrosEnderecos(): boolean {
    return this.$store.getters['enderecos/loading'];
  }

  private dispatchOutrosEnderecos(model: Pessoa, pageable: Pageable): void {
    const filter = {
      nome: model.nome,
      rg: model.rg,
    };
    this.$store.dispatch('enderecos/listEnderecos', { pessoaId: model.id, filter, pageable });
  }

  /**
   * CNH
   */
  private dispatchCnh(model: Pessoa): void {
    const filter = {
      cpf: model.cpf,
      nomeMae: model.nomeMae,
      nomePai: model.nomePai,
      nome: model.nome,
      dataNascimento: model.dataNascimento,
      exact: true,
    };

    PessoasService.findCnhById(!model.cpf ? filter : { cpf: model.cpf, exact: true }, this.$route.params.id).toPromise()
      .then((cnh: Cnh) => {
        this.cnhPessoa = cnh;
    });
  }

  /**
   * ReceitaFederal
   */
  private dispatchOutroCadastro(cpf: string): void {
    OutroCadastroService.listOutroCadastro({ cpf }, this.$route.params.id).toPromise()
      .then((model: ReceitaFederal) => {
        this.receitaFederal = model;
    });
  }

  /**
   * Fotos
   */

  private dispatchFotos(pessoa: Pessoa): void {
    this.$store.dispatch('pessoas/listFoto', { pessoa });
  }

  private onFotoReload(foto: Foto, pessoa: Pessoa): void {
     this.$store.dispatch('pessoas/reloadFoto', {pessoa, foto});
  }

}
</script>
