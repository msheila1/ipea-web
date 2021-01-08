Dado("que eu acesse a pagina de pesquisa de veículos.") do
  user_page.load
  #user_page.efetuar_login_sucesso
  sleep(1)
  user_page.acessar_veiculos
  user_page.bt_limpar
  end
  
  Quando("a tela é exibida.") do

  find(:xpath, ".//span[2]/span[@class='ivu-breadcrumb-item-link']", text: 'VEÍCULOS', exact: true)
    
  end
  
  Então("eu confiro o campo com o Label Marca_Modelo.") do
  find(:xpath, ".//div[@id='marca']/label/div/label", text: 'Marca/Modelo', exact: true)
  end
  
  Então("a disposição do Layout.") do
    find(:xpath, ".//div[@id='placa']/label/div/label", text: 'Placa', exact: true)
    find(:xpath, ".//div[@id='chassi']/label/div/label", text: 'Chassi', exact: true)
    find(:xpath, ".//div[@id='cores']/label/div/label", text: 'Cor', exact: true)
    find(:xpath, ".//div[@id='tipos']/label/div/label", text: 'Tipo de veículo', exact: true)
    find(:xpath, ".//div[@id='municipio']/label/div/label", text: 'Município', exact: true)
  
  
  sleep(1)
  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)
  end
