Dado("que estou na tela de pesquisa de Veículos - e informe somente a cor.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    #user_page.acessar_ocorrencias
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    end
    
    Quando("clico no combo.") do
      user_page.clicar_combo_cor
      sleep(3)
    end
    
    Então("verifico que as cores são exibidas na ordem alfabética de A a Z.") do
      
          #find(:css, "div.ivu-notice-desc", text: "Adicione placa ou chassi ou municipio", exact: true)
          #find('ul > li.ivu-select-item', text: "AMARELA",  exact: true)
          find('li', text: 'AMARELA', exact: true)
          find('li', text: 'AZUL', exact: true)
          find('li', text: 'BEGE', exact: true)
          find('li', text: 'VERMELHA', exact: true)
    end
    

