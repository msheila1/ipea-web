Dado("que estou na tela de pesquisa de Veículos - Chassi Exato") do
  user_page.load
  #user_page.efetuar_login_sucesso
  #user_page.acessar_ocorrencias
  user_page.acessar_veiculos
  user_page.bt_limpar
end
  Quando("preencho o chassi completo e pesquiso") do
    user_page.preencher_chassi
    sleep(1)
    user_page.clicar_pesquisar
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(3)
  end
  
  Então("verifico se o sistema retornou um único registro referente ao chassi utilizado no filtro.") do
    #find('a', text: 'CHI0015').send_keys(:page_down)
        #find('a', text: 'CHI0015').hover
        #Confere Total de Registros Retornados
        find('span', text: 'Total de 1 registros', exact: true)   
       # page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.7
end