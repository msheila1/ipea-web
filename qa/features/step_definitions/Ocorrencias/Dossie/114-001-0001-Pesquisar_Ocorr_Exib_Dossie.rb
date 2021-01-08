Dados("que acesso a tela de Ocorrência e efetua uma pesquisa.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    user_page.bt_limpar
    sleep(1) 
  end
  
  Quando("eu seleciono uma ocorrência no grid e clico no botão de Visualização.") do
    sleep(1) 
    user_page.preencher_numero
    user_page.preencher_ano_bo
    user_page.clicar_delegacia
    user_page.preencher_delegacia
    sleep(2) 
    user_page.sel_op_delegacia
    sleep(2) 
    user_page.pesquisar_ocorrencia
    sleep(2) 
    user_page.visualizar_dossie
    sleep(2) 
    user_page.partes_env
    

  end
  
  Então("o sistema exibe o dossie da ocorrência") do
    find('h6', text: 'Dados do B.O', exact: true)
    find('Span', text: 'Natureza', exact: true)
    find('Span', text: 'Partes envolvidas', exact: true)
    find('Span', text: 'Veículos envolvidos', exact: true)
    find('Span', text: 'Auto de reconhecimento fotográfico', exact: true)
    find('Span', text: 'Mapa das ocorrências semelhantes', exact: true)
  

    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  end