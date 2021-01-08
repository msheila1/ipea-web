import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

import alcunhas from './alcunhas';
import auditoriaAcessos from './auditoria-acessos';
import auditoriaCargas from './auditoria-cargas';
import auditoriaElasticsearch from './auditoria-elasticsearch';
import auditoriaElasticsearchConfig from './auditoria-elasticsearch-config';
import auditoriaServicos from './auditoria-servicos';
import auth from './auth';
import autosReconhecimentos from './autos-reconhecimentos';
import caches from './caches';
import coresVeiculos from './cores-veiculos';
import criminal from './criminal';
import elasticsearch from './elasticsearch';
import enderecos from './enderecos';
import historicosVeiculos from './historicos-veiculos';
import inqueritos from './inqueritos';
import layout from './layout';
import locaisVeiculos from './locais-veiculos';
import mandados from './mandados';
import ocorrencias from './ocorrencias';
import ocorrenciasNaturezas from './ocorrencias-naturezas';
import ocorrenciasPessoas from './ocorrencias-pessoas';
import ocorrenciasSemelhantes from './ocorrencias-semelhantes';
import ocorrenciasSuspeitos from './ocorrencias-suspeitos';
import ocorrenciasVeiculos from './ocorrencias-veiculos';
import outrosNomes from './outros-nomes';
import outrosRgs from './outros-rgs';
import pessoas from './pessoas';
import pessoasOcorrencias from './pessoas-ocorrencias';
import pessoasVeiculos from './pessoas-veiculos';
import pessoasVeiculosAnteriores from './pessoas-veiculos-anteriores';
import processos from './processos';
import suspeitos from './suspeitos';
import tiposIndices from './tipos-indices';
import tiposRelatorios from './tipos-relatorios';
import tiposRespostas from './tipos-respostas';
import tiposServicos from './tipos-servicos';
import tiposVeiculos from './tipos-veiculos';
import veiculos from './veiculos';
import veiculosAnteriores from './veiculos-anteriores';
import watson from './watson';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const config: any = {
  strict: debug,
  modules: {
    alcunhas,
    'auditoria-acessos': auditoriaAcessos,
    'auditoria-cargas': auditoriaCargas,
    'auditoria-elasticsearch': auditoriaElasticsearch,
    'auditoria-elasticsearch-config': auditoriaElasticsearchConfig,
    'auditoria-servicos': auditoriaServicos,
    auth,
    'autos-reconhecimentos': autosReconhecimentos,
    caches,
    'cores-veiculos': coresVeiculos,
    criminal,
    elasticsearch,
    enderecos,
    'historicos-veiculos': historicosVeiculos,
    inqueritos,
    layout,
    'locais-veiculos': locaisVeiculos,
    mandados,
    ocorrencias,
    'ocorrencias-naturezas': ocorrenciasNaturezas,
    'ocorrencias-pessoas': ocorrenciasPessoas,
    'ocorrencias-semelhantes': ocorrenciasSemelhantes,
    'ocorrencias-suspeitos': ocorrenciasSuspeitos,
    'ocorrencias-veiculos': ocorrenciasVeiculos,
    'outros-nomes': outrosNomes,
    'outros-rgs': outrosRgs,
    pessoas,
    'pessoas-veiculos': pessoasVeiculos,
    'pessoas-veiculos-anteriores': pessoasVeiculosAnteriores,
    processos,
    suspeitos,
    'pessoas-ocorrencias': pessoasOcorrencias,
    'tipos-indices': tiposIndices,
    'tipos-relatorios': tiposRelatorios,
    'tipos-respostas': tiposRespostas,
    'tipos-servicos': tiposServicos,
    'tipos-veiculos': tiposVeiculos,
    veiculos,
    'veiculos-anteriores': veiculosAnteriores,
    watson,
  },
};

export enum Types {
  CLEAR = 'clear',
}

export interface State {
  loading: boolean;
}

export default new Vuex.Store({
  ...config,
  actions: {
    async clear(store: ActionContext<State, any>): Promise<void> {
      for (const moduleName in config.modules) {
        if (config.modules[moduleName].actions.hasOwnProperty('clear')) {
          store.commit(`${moduleName}/${Types.CLEAR}`);
        }
      }
    },
  },
});
