Dado("que estou na tela de pesquisa de Veículos - Placa Exata.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    user_page.acessar_veiculos
  end
  
  Quando("preencho a placa completa e pesquiso - Placa Exata.") do
    user_page.preencher_placa
    user_page.clicar_pesquisar
  end
  
  Então("verifico se o sistema retornou um único registro referente a placa utilizada no filtro - Placa Exata.") do
    #Confere PLACA

  find('a', text: 'CHI3000', exact: true)
  #Confere MARCA/MODELO
  find('a', text: 'I/AUDI A4 CABRIOLET 3.0', exact: true)
  #Confere CHASSI
  find('a', text: '9BD1234SP1CHI3100', exact: true)
  #Confere COR
  find('a', text: 'AMARELA', exact: true)
  #Confere ANO
  find('a', text: '1988/1988', exact: true)
  #Confere TIPO
  find('a', text: 'AUTOMOVEL', exact: true)
  #Confere MUNICÍPIO
  find('a', text: 'SANTOS', exact: true)
  #Confere Total de Registros Retornados
  find('span', text: 'Total de 1 registros', exact: true)
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
end