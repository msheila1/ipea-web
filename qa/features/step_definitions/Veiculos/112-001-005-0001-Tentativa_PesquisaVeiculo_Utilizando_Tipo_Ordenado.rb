Dado("que estou na tela de pesquisa de Veículos - e informe somente o tipo.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    #user_page.acessar_ocorrencias
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    end
    
    Quando("clico no combo de Tipods de veiculos.") do
      sleep(1)
      user_page.clicar_combo_tipo
      user_page.selecionar_tipo
      sleep(1)
    end
    
    Então("verifico que os Tipos de veiculos são exibidas na ordem alfabética de A a Z.") do

        find('li', text: 'AUTOMOVEL', exact: true)
        find('li', text: 'CARRO DE MÂO', exact: true)
        find('li', text: 'INEXIST.', exact: true)
        find('li', text: 'QUADRICICLO', exact: true)

         sleep(1)
         #Aplica Zoom para pegar print da tela inteira
         page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
         sleep(1)
        
    end