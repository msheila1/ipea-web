Dados("que acesso a tela de Ocorrência e efetua uma pesquisa com sucesso.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    user_page.bt_limpar
    sleep(1) 
  end
  
  Quando("eu seleciono uma ocorrência no grid e visualizo registros em RDOs semelhantes.") do
    sleep(1) 
    user_page.preencher_numero_rdo
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
  end
  
  Então("o sistema todos os registros em RDOs semelhantes") do
    sleep(2) 
    find('h6', text: 'RDOs semelhantes')
    find('span', text: 'Total de 1 registros')
    find('h6', text: 'Possíveis suspeitos')
    find(:xpath, "//h6/span/sup", text: '8')
    #find('span', text: 'Total de 4 registros')

    sleep(2)
       
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  end
  