class UserPage < SitePrism::Page
    element :rg_pessoa, '#rgInput'
    element :rg, '#username'
    element :cpf, '#cpfInput'
    element :nome, '#nomeInput'
    #element :idadeaproximada, '#ivu-form-item-content'
    element :nomemae, '#nomeMaeInput'
    element :nomepai, '#nomePaiInput'
    element :Limpar, 'span', text: 'Limpar'
    #element :limpar, '#limpar > span > i'
    element :pesquisar, '#pesquisar'
    #element :pesquisar, '#pesquisar > span > span > i'
    element :NumeracaoGrid, 'span', text: '#'
    element :Foto, 'span', text: 'foto'
    element :Nome, 'span', text: 'Nome'
    element :Nascimento, 'span', text: 'NASCIMENTO'
    element :combo_idaprox, '#idadeAproximada > div > div > div.ivu-select-selection > div i'
    element :idaprox, '#idadeAproximada > div > div > div.ivu-select-dropdown > ul.ivu-select-dropdown-list > li:nth-child(1)'

    #element :combo_cor, "#cores > div > div > div.ivu-select-selection > div > i"
    #element :cor, '#cores > div > div > div.ivu-select-dropdown > ul.ivu-select-dropdown-list > li:nth-child(3)'
    #element :combo_tipo,  '#tipos > div > div > div.ivu-select-selection > div > i'
    #element :item_tipo, '#tipos > div > div > div.ivu-select-dropdown > ul.ivu-select-dropdown-list > li:nth-child(5)'


    def preencher_rg
        rg.set '35950984'
    end

    def preencher_rg_pessoa
        rg_pessoa.set '35950984'
    end

    def preencher_cpf
       cpf.set '31034577824'
    end

    def preencher_nome
        nome.set 'VANDERLEI JOSÉ DA SILVA'
    end

    def clicar_pesquisar
        pesquisar.click    
    end


    def clicar_combo_idaprox
        combo_idaprox.click
    end

       def sel_idaprox
        idaprox.click
    end
  

    def preencher_nome_mae
        nomemae.set 'Maria Jose'
    end

    def preencher_nome_pai
        nomepai.set 'JACINTHO CELESTINO DE SALLES'
    end
end
