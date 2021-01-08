Dado("que estou na tela de pesquisa de veículos com campos de pesquisa limpos - WC - Interrogação - Primeira Variação.") do
  user_page.load
  #user_page.efetuar_login_sucesso
  #user_page.acessar_ocorrencias
  sleep(1)
  user_page.acessar_veiculos
  user_page.bt_limpar
end

Quando("Preencho o campo placa com primeira variação e pesquiso - WC - Interrogação - Primeira Variação.") do
  user_page.preencher_placa_WC_Int_Cen1 
  user_page.clicar_pesquisar
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(3)
end

Então("verifico se o sistema retornou apenas os registros que atendem ao filtro utilizado - WC - Interrogação - Primeira Variação.") do
  #find('a', text: 'CHI0015').send_keys(:page_down)
  #find('a', text: 'CHI0015').hover
  #Confere Total de Registros Retornados
  find('span', text: 'Total de 2 registros', exact: true)   
  # page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.7
end