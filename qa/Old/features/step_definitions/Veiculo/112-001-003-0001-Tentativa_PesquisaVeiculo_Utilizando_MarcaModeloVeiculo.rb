  Dado("que estou na tela de pesquisa de Veículos - Somente Marca Modelo Veículo.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    #user_page.acessar_ocorrencias
    user_page.acessar_veiculos
    user_page.bt_limpar
  end
  
  Quando("preencho a Marca ou Modelo de Veículo e pesquiso - Somente Marca Modelo Veículo.") do
    user_page.preencher_marca
    sleep(1)
    user_page.clicar_pesquisar
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(3)
  end
  
  Então("verifico se o sistema retornou a mensagem Adicione placa ou chassi ou municipio - Somente Marca Modelo Veículo.") do
    #find('a', text: 'CHI0015').send_keys(:page_down)
        #find('a', text: 'CHI0015').hover
        #Confere Total de Registros Retornados
        #find('span', text: 'Total de 134 registros', exact: true)
        find(:css, "div.ivu-notice-desc", text: "Adicione placa ou chassi ou municipio", exact: true)
       # page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.7
  end