<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide :id="`slide-suspeito-${i+1}`" v-for="(suspeito, i) in result.page.data" :key="suspeito.id">
        <suspeito-card :id="`suspeito-card-${suspeito.id}`" :suspeito="suspeito" @foto-select="onFotoSelect" @foto-reload="onFotoReload"></suspeito-card>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev">
        <i class="icon-circle-left2"></i>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <i class="icon-circle-right2"></i>
      </div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Foto, ResultList, Suspeito } from '@/models';
import SuspeitoCard from './suspeito-card.vue';

@Component({
  components: {
    SuspeitoCard,
  },
})
export default class SuspeitoGrid extends Vue {
  @Prop() private result!: ResultList<Suspeito>;

  private swiperOption = {
    slidesPerView: 5,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  private onFotoReload(foto: Foto, suspeito: Suspeito): void {
    this.$emit('foto-reload', foto, suspeito);
  }

  private onFotoSelect(foto: Foto, suspeito: Suspeito, selected: boolean): void {
    this.$emit('foto-select', foto, suspeito, selected);
  }
}
</script>
