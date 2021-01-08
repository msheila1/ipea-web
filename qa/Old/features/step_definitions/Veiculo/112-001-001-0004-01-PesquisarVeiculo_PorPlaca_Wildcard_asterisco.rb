Dado("que estou na tela de pesquisa de veículos com campos de pesquisa limpos - WC - Asterisco - Primeira Variação.") do
  user_page.load
  #user_page.efetuar_login_sucesso
  #user_page.acessar_ocorrencias
  user_page.acessar_veiculos
end

Quando("Preencho o campo placa com primeira variação e pesquiso - WC - Asterisco - Primeira Variação.") do
  user_page.preencher_placa_WC_Ast_Cen1 
    user_page.clicar_pesquisar
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(3)
end

Então("verifico se o sistema retornou apenas os registros que atendem ao filtro utilizado - WC - Asterisco - Primeira Variação.") do
  #find('a', text: 'CHI0015').send_keys(:page_down)
        #find('a', text: 'CHI0015').hover
        #Confere Total de Registros Retornados
        find('span', text: 'Total de 3 registros', exact: true)   
       # page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75"
end
  