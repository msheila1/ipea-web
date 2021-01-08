Dado("que estou na tela de pesquisa de Veículos - Placa três caracteres.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_veiculos 
    user_page.bt_limpar
  end
  
  Quando("Preencho o campo Placa com os três primeiros caracteres e pesquiso - Placa três caracteres.") do
    user_page.preencher_placa_3
    sleep(2)
  end
  
  Então("Verifico se o sistema retornou apenas os registros que atendem ao filtro utilizado três caracteres iniciais - Placa três caracteres.") do
    user_page.clicar_pesquisar
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(3)
    #find('html').send_keys [:page_down] 
    #find('html').send_keys :control, :subtract
    find('html').send_keys([:control , :subtract])
    find('html').send_keys([:control , :subtract])
    #page.driver.browser.action.send_keys([:control,:subtract]).perform
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom out'] = 1")
    #Confere PLACA
    find('a', text: 'SAV0002', exact: true)
    #Confere MARCA/MODELO
    find('a', text: 'RENAULT/CLIO RT 1.6 16V', exact: true)
    #Confere CHASSI
    find('a', text: '9BV00000090000012', exact: true)
    #Confere COR
    #find('a', text: 'DOURADA', exact: true)
    #Confere ANO
    #find('a', text: '2009/2009', exact: true)
    #Confere TIPO
    #find('a', text: 'AUTOMOVEL', exact: true)
    #Confere MUNICÍPIO
    #find('a', text: 'SAO PAULO-SP', exact: true)
    #Confere Total de Registros Retornados
    find('span', text: 'Total de 18 registros', exact: true)
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  end