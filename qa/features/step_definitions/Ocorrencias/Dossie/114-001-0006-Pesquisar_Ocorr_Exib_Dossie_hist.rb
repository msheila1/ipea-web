
Dados("que acesso a tela de Ocorrência, efetuo uma pesquisa e valido o histórico.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    sleep(1)
    user_page.bt_limpar
    sleep(1) 
  end
  
Quando("verifico a quantidade de caracteres exibidos no histórico.") do
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
    sleep(2) 
    user_page.visualizar_dossie
    sleep(2) 
    user_page.partes_env
  end
  
Então("o sistema exibe o histórico no dossie da ocorrência") do
  sleep(2) 
    find('div.historic', text: 'Histórico', exact: true)

    sleep(2)
       
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  end