Dado("que realizo uma pesquisa de veículos com sucesso para verificar dados de Boletins de Ocorrência relacionados ao veículo.") do
  visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
  user_page.load
  #user_page.efetuar_login_sucesso
  sleep(1)
  user_page.acessar_veiculos
  user_page.bt_limpar
  sleep(2)
  user_page.preencher_placa_fod
  user_page.clicar_pesquisar
  sleep(2)
  end
  
  Quando("seleciono um registro para verificar os dados de Boletins de Ocorrência relacionados ao veículo.") do
    user_page.clicar_link_detalhes_fod   
    sleep(2)
    #user_page.clicar_link_pro_anterior
    #sleep(2)
    user_page.clicar_bo
    sleep(2)
  end
  
  Então("confiro os dados do Boletim de Ocorrência relacionados ao veículo.") do
  #Confere as colunas da grid "B.Os relacionados ao veículo"

  #find('class', 'ivu-table-column-center', exact: true)
  find('span', text: '#', exact: true)

  find('span', text: 'DATA DA ELABORAÇÃO', exact: true)

  find('span', text: 'NÚMERO/ANO', exact: true)

  find('span', text: 'NATUREZA', exact: true )

  find('span', text: 'DELEGACIA', exact: true)

  find('span', text: 'ENVOLVIMENTO', exact: true)

  find('span', text: 'OPÇÕES', exact: true)

  sleep(1)
  #Confere o número de registros de Histórico apresentados após a consulta
  #find('span', text: 'Total de 784 registros', exact: true)
  find('span', text: 'Aproximadamente 800 resultados', exact: true)
  
   #Validar dados do primeiro registro apresentado na grid

  find(:xpath, "//tr[1]/td[@class='ivu-table-column-center']/div", text: '1', exact: true)
  #Confere contéudo da coluna "DATA DA ELABORAÇÃO" 
  find(:xpath, '//tr[1]/td[2]/div/a', text: '17/08/2018', exact: true)
  #Confere conteúdo da coluna "NÚMERO/ANO"
  find(:xpath, '//tr[1]/td[3]/div/a', text: '1559/2018', exact: true)
  #Confere conteúdo da coluna "NATUREZA"

 
  #find(:xpath, '//tr[1]/td[4]/div', text: '- Desaparecimento de pessoa', exact: true)

  # //tr[1]/td[4]/div/a/span'


  #Conferte conteúdo da coluna "DELEGACIA"
  find(:xpath, '//tr[1]/td[5]/div/a', text: '70º D.P. VILA EMA', exact: true)

  #Conferte conteúdo da coluna "ENVOLVIMENTO"
  find(:xpath, '//tr[1]/td[6]/div/a', text: 'ACIDENTADO', exact: true)



  sleep(1)
   #Aplica Zoom para pegar print da tela inteira
   page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
   sleep(1)
  

  end
