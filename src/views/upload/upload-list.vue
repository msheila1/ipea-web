<template>
  <div id="upload-list">
    <app-page-header id="upload-header" title="Upload" subtitle="Upload de Fotos">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Upload</span>
      </div>
    </app-page-header>
    <upload-filter id="upload-filter" :loading="loading" :filter="filter" @reset="onReset" @pessoa-autocomplete="onPessoaAutocomplete" @pessoa-autocomplete-select="onPessoaAutocompleteSelect"></upload-filter>

    <app-card icon="icon-upload" header="Upload de fotos" :collapsible="true" class="scroll-upload">
      <el-form label-position="top" enctype="multipart/form-data">
      <file-pond
          name="file"
          ref="pond"
          label-idle="Arraste e solte arquivos ou <span class='filepond--label-action'>Selecione na pasta</span>"
          labelFileLoading = "lendo.."
          labelFileProcessing = "Enviando.."
          labelFileProcessingComplete = "Enviado com sucesso!"
          labelFileProcessingAborted = "Cancelar envio."
          labelTapToCancel = "clique para cancelar."
          labelTapToRetry = "clique para tentar novamente."
          labelTapToUndo = "clique para desfazer."
          labelButtonRemoveItem = "Remover"
          labelButtonAbortItemLoad = "Abortar"
          labelButtonRetryItemLoad = "Tentar Novamente."
          labelButtonAbortItemProcessing = "Cancelar"
          labelButtonUndoItemProcessing = "Desfazer"
          labelButtonRetryItemProcessing = "Tentar Novamente"
          labelButtonProcessItem = "Enviar"
          labelFileTypeNotAllowed="Tipo de arquivo inválido"
          fileValidateTypeLabelExpectedTypes="Esperado {allButLastType}"
          :allow-image-preview="filter.allowImagePreview"
          :allow-multiple="filter.allowMultiple"
          :instant-upload="filter.instantUpload"
          :max-files="filter.maxFiles"
          accepted-file-types="image/png, image/gif, image/jpeg, image/jpg"
          :server=serverURL()
          :files="files"
          :file-metadata-object="pessoa"
          @warning="onWarning"
          @error="onError"
          @addfile="onAddFile"
          @updatefiles="onUpdateFiles"
          @removefile="onRemoveFile"
          @processfile="onProcessFile">
      </file-pond>
      </el-form>
      <div slot="footer">
        <el-button id="removeAll" type="default" @click="onRemoveFiles" :disabled="files.length < 1"><i class="icon-eraser2 mr-1"></i>Remover Todos</el-button>
        <el-button id="processAll" type="primary" :loading="loading" @click="onProcessFiles" :disabled="files.length < 1"><i :class="[ !loading ? 'icon-upload' : '', 'mr-1' ]"></i>{{ loading ? 'Enviando...' : 'Enviar Todos' }}</el-button>
      </div>
    </app-card>

    <upload-table id="upload-table" :loading="loading" :result="results" @page-change="onPageChange"></upload-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UploadFilter from '@/views/upload/shared/upload-filter.vue';
import UploadTable from '@/views/upload/shared/upload-table.vue';
import { PessoasService } from '@/services';
import _ from 'lodash';
import { Notification } from 'element-ui';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import {
  Pageable,
  Pessoa,
  FiltroUpload,
  ResultList,
  Foto,
Page,
} from '@/models';

const TIMEOUT = 10000;
// tslint:disable-next-line:max-line-length
const FOTO_ERROR: Foto = { id: '0', base64: '/photos/upload-error.png' , origem: '99', codigoOrigem: '', descricao: 'Imagem com erro de upload', selecionada: false, cpf: '', rg: '', expira: 0, expiraEnum: ''};

@Component({
  components: {
    UploadFilter,
    UploadTable,
  },
})

export default class UploadList extends Vue {
  public files: any[] =  [];
  private filter = new FiltroUpload();
  private pessoa = new Pessoa();
  private results: ResultList<Pessoa> = new ResultList<Pessoa>();
  private headers: any =  { Authorization: 'Bearer' };
  private data: Pessoa[] = [];

  private get loading(): boolean {
    return this.$store.getters['pessoas/loading'];
  }

  private onPessoaAutocomplete(params: any, callback: (results: Pessoa[]) => void): void {
      PessoasService.query(params, new Pageable()).toPromise()
      .then((result: any) => {
        callback(result.data);
      })
      .catch((error: Error) => this.$notify.error(error.message));
  }

  private onPessoaAutocompleteSelect(pessoa: Pessoa): void {
    const self = this;
    self.pessoa = pessoa;
    self.results.page.data = [];
    self.results.page.data.push(self.pessoa);
  }

  private onReset(): void {
    const self = this;
    self.pessoa = new Pessoa();

    self.$store.dispatch('pessoas/clear').then(() => {
      self.filter = new FiltroUpload();
    });

    self.filter.allowImagePreview = false;

  }

  private dispatchPessoas(filter: FiltroUpload, pageable: Pageable): void {
    this.$store.dispatch('pessoas/query', { filter, pageable });
  }

  private get pessoas(): ResultList<Pessoa> {
    return this.$store.getters['pessoas/resultList'];
  }

  private onProcessFiles(): void {
    const self = this;
    const pond: any = self.$refs.pond;
    self.$confirm('Fazer UPLOAD dos arquivos?', 'Confirmação', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    })
    .then(() => pond.processFiles())
    .catch((action: string) => { /* console.debug(action) */ });
  }

  private onRemoveFiles(): void {
    const self = this;
    const pond: any = self.$refs.pond;
    self.$confirm('Remover TODOS dos arquivos?', 'Confirmação', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    })
    .then(() => pond.removeFiles())
    .catch((action: string) => { /* console.debug(action) */ });
  }

  private onWarning(error: any, file: any, status: any): any {
    this.$notify.warning(error.message || error.body);
  }

  private onError(error: any, file: any, status: any): any {
    this.$notify.error(error.message || error.body);
  }

  private onProcessFile(error: any, file: any): any {
    const self = this;
    if (error) {
      self.removePessoa(file);
      const pessoa: Pessoa = file.getMetadata();
      pessoa.foto = FOTO_ERROR;
      file.setMetadata(pessoa);
      self.results.page.data.push(pessoa);
      self.results.page.count = self.results.page.data.length;
    }
  }

  private onAddFile(error: any, file: any): any {
    const self = this;
    if (error) {
      self.$notify.error(error.body);
    } else {
      self.searchPessoa(file);
    }
  }

  private searchPessoa(file: any): void {
    const self = this;
    let pessoa: Pessoa;
    // tslint:disable-next-line:max-line-length
    PessoasService.query({ search: true, rg: self.rgWithoutFileSeparator( file.filenameWithoutExtension ) }, new Pageable()).toPromise()
      .then((result: any) => {
        pessoa = result.data[0];
        if (pessoa) {
          file.setMetadata(pessoa);
          const pessoaEncontrada = _.find(self.data, (p: Pessoa) => {
            return p.id === pessoa.id;
          });
          if (!pessoaEncontrada) {
            self.data.push(pessoa);
          }
        }
        self.results.page = Page.newInstance(self.data, 1, 10);
      })
      .catch((error: Error) => {
        self.$notify.error(error.message);
      });
  }

  private onPageChange(pageNumber: number): void {
    this.results = ResultList.newInstance(this.data, pageNumber, 10);
  }

  private rgWithoutFileSeparator(rg: any): any {
    let position = rg.indexOf('_');
    if (position < 0 ) {
      position = rg.indexOf('-');
    }
    if (position > 0 ) {
      rg = rg.substring(0, position);
    }
    return rg;
  }

  private onRemoveFile(file: any): any {
    const self = this;
    self.removePessoa(file);
  }

  private removePessoa(file: any): void {
    const self = this;
    self.results.page.data = [];
    const pessoa: Pessoa = file.getMetadata();
    if (pessoa) {
      const removido = _.remove(self.data, (p: Pessoa) => {
        return p.id === pessoa.id;
      });
    }
    self.results.page = Page.newInstance(self.data, 1, 10);
  }

  private onUpdateFiles(files: any): any {
    const self = this;
    self.files = files;
    if (_.isEmpty(self.files) ) {
      self.data = [];
    }
    self.results.page = Page.newInstance(self.data, 1, 10);
  }

  private serverURL(): any {
    const token = this.getToken();

    const action = (url: string, method: string) => {
      return {
        url,
        method,
        withCredentials: true,
        headers: this.headers,
        timeout: TIMEOUT,
        onload: (response: any) => {
          return response.key;
        },
        onerror: (response: any) => {
          return response.data;
        },
      };
    };

    return {
      url: process.env.VUE_APP_BASE_API + '/fotos/upload/',
      process: action('process', 'POST'),
      revert: action('revert', 'DELETE'),
      restore: action('restore', 'GET'),
      load: action('load', 'GET'),
      fetch: action('fetch', 'GET'),
    };
  }

  private getToken(): any {
    return new Promise((resolve, reject) => {
      this.$store.dispatch('auth/getToken')
        .then((token) => {
          this.headers.Authorization = 'Bearer ' + token;
          resolve(this.headers);
        })
        .catch((error) => reject(error));
    });
  }

}
</script>

<style lang="scss">
  .scroll-upload {
    overflow-y: auto;
    max-height: 400px;
  }
</style>

