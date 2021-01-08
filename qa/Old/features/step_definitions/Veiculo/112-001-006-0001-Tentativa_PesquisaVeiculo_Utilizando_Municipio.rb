Dado("que estou na tela de pesquisa de Veículos - Somente Município do Veículo.") do
  user_page.load
  #user_page.efetuar_login_sucesso
  #user_page.acessar_ocorrencias
  user_page.acessar_veiculos
  user_page.bt_limpar
  end
  
  Quando("preencho a Cor do Veículo e pesquiso -  Somente Município do Veículo.") do
    sleep(1)
  
    user_page.clicar_municipio
    sleep(1)
    user_page.preencher_municipio
    sleep(1)
    user_page.sel_op_municipio
    sleep(1)
    user_page.clicar_pesquisar
    sleep(1)

    #find('html').send_keys(:down)
    #user_page.preencher_municipio
    #sleep(1)
   # user_page.clicar_placa
    #sleep(1)
    #user_page.clicar_pesquisar
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  end
  
  Então("verifico se o sistema retornou a mensagem Adicione outro filtro -  Somente Município do Veículo.") do
     #find('a', text: 'CHI0015').send_keys(:page_down)
        #find('a', text: 'CHI0015').hover
        #Confere Total de Registros Retornados
        #find('span', text: 'Total de 134 registros', exact: true)
        find(:css, "div.ivu-notice-desc", text: "Adicione outro filtro", exact: true)
        
       #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.7
  end
  