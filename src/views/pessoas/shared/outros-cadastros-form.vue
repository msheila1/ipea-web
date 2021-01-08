<template>
  <app-card>
    <el-form label-position="top">
      <div class="media">
        <div class="media-body">
          <div class="mb-2">
            <div class="font-weight-semibold">{{ cadastros.nome | defaultValue}}, CPF {{ cadastros.cpf | cpf | defaultValue }}</div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Informações Pessoais</span>
            <div class="font-weight-semibold">{{ cadastros.dataNascimento | formatDate }} {{ cadastros.dataNascimento | formatYear | join(cadastros.naturalidade, ', ') | join(cadastros.nacionalidade, ', ') | startCase }}</div>
            <div class="font-weight-semibold">Fixo:. ({{ cadastros.ddd }}) {{ cadastros.telefoneFixo | defaultValue }} - Cel:. ({{ cadastros.ddd }}) {{ cadastros.celular | defaultValue }}</div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Endereço</span>
            <div class="font-weight-semibold"> {{ cadastros.endereco.tipoLogradouro | defaultValue('') | startCase }} {{ cadastros.endereco | address | defaultValue | startCase }}</div>
          </div>
          <div class="mb-2">
            <span class="text-muted">Filiação</span>
            <div class="font-weight-semibold"> {{ cadastros.ascendente1 | join(cadastros.ascendente2, ', ') | join(cadastros.ascendente3, ', ') | join(cadastros.ascendente4, ', ')  | defaultValue | startCase }}</div>
          </div>
        </div>
      </div>
    </el-form>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { ReceitaFederal } from '@/models';

@Component
export default class OutroCadastroForm extends Vue {
  @Prop({ default: () => new ReceitaFederal() }) private cadastros!: ReceitaFederal;
}
</script>
