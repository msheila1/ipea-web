<template>
  <div class="row">
    <div v-for="suspeito in 6" :key="suspeito" class="col-sm">
      <div class="card">
        <div class="card-header bg-transparent header-elements-inline">
          <h6 class="card-title">
            <router-link :to="toPessoaDetail({})" title="Clique para visualizar o dossiê da pessoa">Nome da Pessoa Suspeita</router-link>
            <div class="list-icons list-icons-extended">
              <small class="list-icons-item">
                <span class="font-weight-bold">RG </span>41987987-9
              </small>
              <small class="list-icons-item">
                <span class="font-weight-bold">CPF </span>000.000.001-91
              </small>
            </div>
          </h6>
        </div>

        <el-carousel>
          <el-carousel-item v-for="item in 3" :key="item">
            <div class="card-img-actions">
              <img class="card-img-top img-fluid" src="http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/flat/4.png" alt="">
              <div class="card-img-actions-overlay card-img-top">
                <a href="http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/flat/4.png" class="btn btn-outline bg-white text-white border-white border-2" data-popup="lightbox">
                  Zoom
                </a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="card-footer d-flex justify-content-between">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { Ocorrencia, Endereco, Pessoa } from '@/models';

@Component({
  components: {},
})
export default class ConhecidoCarousel extends Vue {
  @Prop() private model!: Ocorrencia;

  public toOcorrenciaDetail(model: Ocorrencia): Location {
    return {
      name: 'OcorrenciaDetail',
      params: { id: model.id },
    };
  }

  public toPessoaDetail(model: Pessoa): Location {
    return {
      name: 'PessoaDetail',
      params: { id: model.id },
    };
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    /*line-height: 300px;*/
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
