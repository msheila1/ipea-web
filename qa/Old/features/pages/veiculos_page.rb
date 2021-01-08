class UserPage < SitePrism::Page
    set_url 'http://10.72.251.134/#/inicio'
    element :placa, '#placaInput'
    element :chassi, '#chassiInput'
    element :marca, '#marca > div > div > input'
    element :combo_cor, "#cores > div > div > div.ivu-select-selection > div > i"
    element :cor, '#cores > div > div > div.ivu-select-dropdown > ul.ivu-select-dropdown-list > li:nth-child(3)'
    element :combo_tipo,  '#tipos > div > div > div.ivu-select-selection > div > i'
    element :item_tipo, '#tipos > div > div > div.ivu-select-dropdown > ul.ivu-select-dropdown-list > li:nth-child(5)'
    element :municipio, '#municipioCompleteInput'
    element :pesquisar, '#pesquisar > span > span > i'
    element :limpar, '#limpar > span > i'
    element :op_municipio, 'ul', text: 'SANTOS - SP'
    element :lk_detalhes, :link, 'CHI3000'
    element :lk_detalhes_chi, :link, 'CHI0211'
    element :lk_detalhes_fod, :link, 'FOD0001'
    #element :prop_anterior, 'ivu-tabs-tab xh-highlight', text: 'Proprietário anterior'
    element :prop_anterior, '#app > div > section > main > div > div > div.ivu-tabs.ivu-tabs-card > div.ivu-tabs-bar > div > div > div > div > div:nth-child(3)'
    element :historico, 'span.font-weight-bold', text: 'Histórico do veículo'
    element :bo, 'span.font-weight-bold', text: 'B.Os relacionados ao veículo'
    element :reghistpg2, 'li', text: '2'
    element :reghistdet, :xpath, "//tr[1]/td/div/div/i"


    def preencher_placa
        placa.set 'CHI3000'
    end

    def prencher_placa_chi
        placa.set 'CHI0211'
    end

    def preencher_placa_fod
        placa.set 'FOD0001'
    end

    def preencher_placa_3
        placa.set 'SAV'
    end

    def preencher_placa_WC_AstInt_Cen1
        placa.set '*HI00?2'
    end
    
    def preencher_placa_WC_AstInt_Cen2
        placa.set '??I00?*'
    end
    
    def preencher_placa_WC_AstInt_Cen3
        placa.set '***000?'
    end

    def preencher_placa_WC_AstInt_Cen4
        placa.set '???000*'
    end

    def preencher_placa_WC_Ast_Cen1
        placa.set 'SAV***1'
    end

    def preencher_placa_WC_Ast_Cen2
        placa.set '***0002'
    end

    def preencher_placa_WC_Ast_Cen3
        placa.set 'CH****2'
    end

    def preencher_placa_WC_Ast_Cen4
        placa.set '*H****2'
    end

    def preencher_placa_WC_Int_Cen1
        placa.set 'SAV???5'
    end

    def preencher_placa_WC_Int_Cen2
        placa.set 'CHI??22'
    end

    def preencher_placa_WC_Int_Cen3
        placa.set '?HI0???'
    end

    def preencher_placa_WC_Int_Cen4
        placa.set '???000?'
    end

  

    def bt_limpar
        limpar.click
        #placa.clear
       # native.clear
       # native.send_keys(value.to_s)
    end

    def preencher_chassi
        chassi.set '9BD1234SP1EEU0002'
    end

    def preencher_chassi_3
        chassi.set '9BD'
    end

    def clicar_pesquisar
        pesquisar.double_click
    end

    def clicar_combo_cor
        combo_cor.click
    end

    def clicar_combo_tipo
        combo_tipo.click
    end

    def clicar_placa
        placa.click
    end


    def clicar_tipo
        tipo.click
    end

    def selecionar_tipo
        item_tipo.click
    end

    def selecionar_cor
        cor.click
    end

    def preencher_marca
       marca.set 'FIAT/PALIO'
    end

    def clicar_municipio
        municipio.click
    end

    def preencher_municipio
        municipio.set 'SANTOS'
    end

    def sel_op_municipio
        op_municipio.click
    end
    
    def clicar_link_detalhes
        lk_detalhes.click
    end

    def clicar_link_detalhes_chi
        lk_detalhes_chi.click
    end

    def clicar_link_detalhes_fod
        lk_detalhes_fod.click
    end


    def clicar_link_pro_anterior
        prop_anterior.click
    end

    def clicar_historico
        historico.click

    end

    def clicar_bo
        bo.double_click
    end

    def clicar_reghistpg2
        reghistpg2.click
    end

    def clicar_reghistdet
        reghistdet.click
    end

end