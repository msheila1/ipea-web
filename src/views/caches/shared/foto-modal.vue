<template>
  <b-modal id="foto-modal" ref="modal" title="Fotos em cache" header-bg-variant="primary" body-class="text-center">
    <img :src="toSrc(cache.conteudo)" :title="cache.tipoServico" height="300" width="400" alt="Foto">

    <div slot="modal-footer" class="text-right">
      <el-button id="close" type="default" @click="onClose">Fechar</el-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Cache, Foto } from '@/models';

@Component
export default class FotoModal extends Vue {
  private cache: Cache = new Cache();

  public open(cache: Cache): void {
    this.cache = cache;

    const modal: any = this.$refs.modal;
    modal.show();
  }

  private onClose(): void {
    const modal: any = this.$refs.modal;
    modal.hide();
  }

  private isBase64(value: string): boolean {
    try {
      return btoa(atob(value)) === value;
    } catch (err) {
      return false;
    }
  }

  private toSrc(foto: Foto): string {
    let src = '';

    if (foto) {
      src = typeof foto === 'string' ? foto : foto.base64;
    }

    return this.isBase64(src) ? `data:image/jpg;base64,${src}` : src;
  }
}
</script>
