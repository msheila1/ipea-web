<template>
  <span class="avatar p-0">
    <img v-if="hasData()" :src="src" :width="width" :height="height" :title="title" :alt="alt" :class="shape">
    <span v-else-if="isLetter(emptyData)" :class="`btn ${css()} rounded-round btn-icon btn-sm`">
      <span class="letter-icon">{{ emptyData }}</span>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class Avatar extends Vue {
  @Prop() private data!: any;
  @Prop() private emptyData!: any;
  @Prop() private errorData!: any;
  @Prop({ default: 38 }) private height!: number;
  @Prop({ default: 38 }) private width!: number;
  @Prop({ default: '' }) private title!: string;
  @Prop({ default: '...' }) private alt!: string;
  @Prop({ default: '' }) private bgClass!: string;
  @Prop({ default: 'rounded-circle' }) private shape!: string;

  private bgClasses = [
    'bg-teal-400',
    'bg-blue',
    'bg-warning-400',
    'bg-success-400',
    'bg-danger-400',
    'bg-pink-400',
    'bg-brown-400',
    'bg-primary-400',
    'bg-indigo-400',
    'bg-success-400',
    'bg-danger-400',
  ];

  private hasData(): boolean {
    const self = this;
    return (self.data && typeof self.data === 'string') || (self.data && (self.data.src || self.data.base64));
  }

  private hasError(): boolean {
    const self = this;
    return self.data instanceof Error || (self.data && self.data.error);
  }

  private isBase64(value: string): boolean {
    try {
      return btoa(atob(value)) === value;
    } catch (err) {
      return false;
    }
  }

  private isLetter(value: any): boolean {
    const self = this;
    return typeof value === 'string' && value.length === 1;
  }

  private get src(): string {
    const self = this;
    let src = '';

    if (self.hasData()) {
      src = typeof self.data === 'string' ? self.data : self.data.src || self.data.base64;

    } else if (self.hasError()) {
      src = self.errorData;

    } else if (self.emptyData && !self.isLetter(self.emptyData)) {
      src = self.emptyData;
    }

    return self.isBase64(src) ? `data:image/jpg;base64,${src}` : src;
  }

  private css(): string {
    const self = this;

    if (self.bgClass) {
      return self.bgClass;
    }

    return self.bgClasses[_.random(0, self.bgClasses.length)];
  }
}
</script>

<!--router-link v-if="pessoa.confidencial" :to="toPessoaDetail(pessoa)" class="btn rounded-round btn-icon btn-sm bg-danger-400">
              <span class="letter-icon">C</span>
            </router-link>
            <router-link v-else :to="toPessoaDetail(pessoa)" :class="pessoa.foto && pessoa.foto.base64 ? '': `btn ${css()} rounded-round btn-icon btn-sm`">
              <img v-if="pessoa.foto && pessoa.foto.base64" :src="pessoa.foto.base64" width="38" height="38" :alt="pessoa.nome" class="rounded-circle">
              <span v-else-if="!pessoa.confidencial" class="letter-icon">{{ firstChar(pessoa.nome) }}</span>
            </router-link-->
