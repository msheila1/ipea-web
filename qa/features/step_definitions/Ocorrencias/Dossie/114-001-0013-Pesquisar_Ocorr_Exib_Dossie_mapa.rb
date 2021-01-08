Dados("que acesso a tela de Ocorrência, efetuo uma pesquisa de Ocorrencia com sucesso na tela inicial.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    user_page.bt_limpar
    sleep(1) 
  end
  
  Quando("eu seleciono uma ocorrência no grid,  visualizo o Mapa das ocorrências semelhantes no Dossê.") do
    sleep(1) 
    user_page.preencher_numero
    sleep(1) 
    user_page.preencher_ano_bo
    sleep(1) 
    user_page.clicar_delegacia
    sleep(1) 
    user_page.preencher_delegacia
    sleep(1) 
    user_page.sel_op_delegacia
    sleep(1) 
    user_page.pesquisar_ocorrencia
    sleep(1) 
    user_page.visualizar_dossie
    sleep(2) 
    user_page.partes_env
    sleep(2) 
    user_page.visualizar_mapa
    sleep(2) 
  end
  
  
  Então("o sistema exibe o Mapa das ocorrências semelhantes e um RAIO pré definido.") do
    sleep(2) 

    find(:xpath, "//div[@id='atual']" , text: 'Ocorrência atual', exact: true)
    find('h3', text: 'Legenda')
    find(:xpath, "//div[@id='semelhante']", text: 'Ocorrência semelhante', exact: true)
    find(:xpath, "//div[@id='conhecido']", text: 'Autor conhecido', exact: true)
    #find(:xpath, "//div[@class='gmnoprint'][2]/div[2]/div[1]", text: 'Satélite', exact: true)

    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  end
  