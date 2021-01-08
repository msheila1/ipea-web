Dado("que estou na tela de pesquisa de veículos - WC - Asterisco e Interrogação - Segunda Variação.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(2)
    user_page.acessar_veiculos
  end
  
  Quando("Preencho o campo placa e pesquiso - WC - Asterisco e Interrogação - Segunda Variação.") do
    user_page.preencher_placa_WC_AstInt_Cen2 
    user_page.clicar_pesquisar
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(3)
  end
  
  Então("verifico se o sistema retornou apenas os registros que atendem ao filtro utilizado - WC - Asterisco e Interrogação - Segunda Variação.") do
#find('a', text: 'CHI0015').send_keys(:page_down)
 #find('a', text: 'CHI0015').hover
 #Confere Total de Registros Retornados
 find('span', text: 'Total de 38 registros', exact: true)   
 # page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  end