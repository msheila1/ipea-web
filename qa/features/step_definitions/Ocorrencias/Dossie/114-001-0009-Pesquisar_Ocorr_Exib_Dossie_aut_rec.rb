Dados("que acesso a tela de Ocorrência, efetuo uma pesquisa de Ocorrencia com sucesso.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    user_page.bt_limpar
    sleep(1) 
  end
  
  
  Quando("eu seleciono uma ocorrência no grid,  visualizo o Dossie e clico no Link Auto de Reconhecimento Fotográfico.") do
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
    user_page.aut_rec_fot
    sleep(2) 

  end
  
  Então("o sistema exibe Autos de Reconhecimento Fotográfico conforme pesquisado.") do
    sleep(2) 

    find('span', text: 'Total de 56 registros', exact: true)

    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  end