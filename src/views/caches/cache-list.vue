<template>
  <div id="cache-list">
    <app-page-header id="cache-header" title="Cache" subtitle="Redis">
      <div slot="breadcrumb" class="breadcrumb">
        <router-link to="/" class="breadcrumb-item"><i class="icon-home2 mr-1"></i>Início</router-link>
        <span class="breadcrumb-item active">Cache</span>
      </div>
    </app-page-header>

    <cache-filter id="cache-filter" :loading="loading" :filter="filter" :tipos-servicos="tiposServicos" @reset="onReset" @reset-cache="onResetCache" @search="onSearch"></cache-filter>

    <cache-table id="cache-table" :loading="loading" :result="caches" @page-change="onPageChange" @refresh="onRefresh" @detail="onDetail" @remove="onRemove"></cache-table>

    <foto-modal id="foto-modal" ref="fotoModal"></foto-modal>

    <limpeza-modal id="limpeza-modal" ref="limpezaModal" @confirm="onLimpezaConfirm"></limpeza-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import {
  Cache,
  FiltroCache,
  Pageable,
  ResultList,
  TipoServico,
} from '@/models';
import CacheFilter from '@/views/caches/shared/cache-filter.vue';
import CacheTable from '@/views/caches/shared/cache-table.vue';
import FotoModal from '@/views/caches/shared/foto-modal.vue';
import LimpezaModal from '@/views/caches/shared/limpeza-modal.vue';

@Component({
  components: {
    CacheFilter,
    CacheTable,
    FotoModal,
    LimpezaModal,
  },
})
export default class CacheList extends Vue {
  private filter = new FiltroCache();
  private lookups: TipoServico[] = [];

  protected created(): void {
    this.$store.dispatch('tipos-servicos/listAll');
  }

  protected mounted(): void {
    _.assign(this.filter, this.$store.getters['caches/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('caches/clear').then(() => {
      self.filter = new FiltroCache();
    });
  }

  private onSearch(): void {
    this.dispatchCaches(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchCaches(this.filter, new Pageable(pageNumber));
  }

  private onPageChange(pageNumber: number): void {
    this.dispatchCaches(this.filter, new Pageable(pageNumber));
  }

  private onRemove(cache: Cache): void {
    const self = this;

    self.$confirm('Você realmente gostaria de remover este cache?', 'Atenção', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    })
    .then(() => {
      return self.$store.dispatch('caches/delete', { cache });
    })
    .then(() => {
      return self.dispatchCaches(self.filter, new Pageable());
    })
    .catch((error: Error) => self.$notify.error(error.message));
  }

  private onDetail(cache: Cache): void {
    const modal: any = this.$refs.fotoModal;
    modal.open(cache);
  }

  private get tiposServicos(): TipoServico[] {
    return this.$store.getters['tipos-servicos/cacheaveis'];
  }

  private get caches(): ResultList<Cache> {
    return this.$store.getters['caches/resultList'];
  }

  private get loading(): boolean {
    return this.$store.getters['caches/loading'];
  }

  private dispatchCaches(filter: FiltroCache, pageable: Pageable): void {
    this.$store.dispatch('caches/query', { filter, pageable });
  }

  /**
   * Modal de Limpeza
   */

  private onResetCache(): void {
    // Realiza o lookup para recuperar o objeto a partir dos ids selecionados pelo usuário
    this.lookups = _.filter(this.tiposServicos, (tipo) => {
      return _.includes(this.filter.tiposServicos, tipo.codigo);
    });

    const modal: any = this.$refs.limpezaModal;
    modal.open(this.lookups);
  }

  private onLimpezaConfirm(): void {
    this.$store.dispatch('caches/deleteAll');

    const modal: any = this.$refs.limpezaModal;
    modal.close();
  }
}
</script>
