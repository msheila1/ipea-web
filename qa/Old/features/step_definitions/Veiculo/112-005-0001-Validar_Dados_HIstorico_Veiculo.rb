 Dado("que realizo uma pesquisa de veículos com sucesso para verificar dados de histórico do veículo.") do
  visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
  user_page.load
  #user_page.efetuar_login_sucesso
  user_page.acessar_veiculos
  sleep(2)
  user_page.preencher_placa_fod
  user_page.clicar_pesquisar
  end
  
  Quando("seleciono um registro para verificar dados do histórico do veículo.") do
    user_page.clicar_link_detalhes_fod   
    sleep(2)
    #user_page.clicar_link_pro_anterior
    #sleep(2)
    user_page.clicar_historico
    sleep(2)
  end
  Então("confiro os dados do histórico do veículo.") do
  #Confere as colunas da grid "Histórico do Veículo"
  find('span', text: '#', exact: true)
  find('span', text: 'DATA/HORA DO HISTÓRICO', exact: true)
  find('span', text: 'NOME', exact: true)
  find(:xpath, ".//table/thead/tr/th[5]/div[@class='ivu-table-cell']/span", text: 'MUNICÍPIO', exact: true )
  find('span', text: 'MOTIVO DA ALTERAÇÃO', exact: true)

  sleep(1)
  #Confere o número de registros de Histórico apresentados após a consulta
  find('span', text: 'Total de 15 registros', exact: true)

  #Validar dados do primeiro registro apresentado na grid
  #find('span', text: 'MUNICÍPIO', exact: false)
  #Coluna "#"
  find(:xpath, "//tr[@class='ivu-table-row'][1]/td[@class='ivu-table-column-left']/div[@class='ivu-table-cell']", text: '1', exact: true)
  #Confere contéudo da coluna "DATA/HORA DO HISTÓRICO" 
  find('span', text: '10/11/2011 10:05:11', exact: true)
  sleep(1)
  #Confere contéudo da coluna "NOME"
  find(:xpath, "//tr[@class='ivu-table-row'][1]/td[4]/div[@class='ivu-table-cell']/span", text: 'SSA TESTE TRANSF CAMP SP', exact: true)
  #Confere contéudo da coluna "MUNICÍPIO"
  find(:xpath, "//tr[@class='ivu-table-row'][1]/td[5]/div[@class='ivu-table-cell']/span", text: 'SAO PAULO', exact: true)
  #Confere conteúdo da coluna "MOTIVO DA ALTERAÇÃO"
  find(:xpath, "//tr[@class='ivu-table-row'][1]/td[6]/div[@class='ivu-table-cell']/span", text: 'ALTERAÇÃO DE ENDEREÇO SOLICITAÇÃO PRESENCIAL.', exact: true)

  #navega para a página 2 de Registros de Histórico
  user_page.clicar_reghistpg2
  sleep(1)
  #abrir os detalhes do registro de histórico
  user_page.clicar_reghistdet
  sleep(1)
  #Conferir dados de detahes de registros de histórico
  #item "RG:"
  find('span', text: 'RG:', exact: true)
  #Item RG conteúdo
  find('span', text: '123456788', exact: true)

  #item "CPF:"
  find('span', text: 'CPF:', exact: true)
  #Item CPF conteúdo
  find('span', text: '36712752', exact: true)

   #item "ENDEREÇO:"
   find('span', text: 'ENDEREÇO:', exact: true)
   #Item ENDEREÇO conteúdo
   find('span', text: 'RUA DE TESTE, 65 CS 3 - TESTE - 01234003 - SAO PAULO-SP', exact: true)







  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)
  #find('#ivu-icon ivu-icon-ios-arrow-right').click

 







   end
  

 
  #Confere Tipo do documento do Prorietário Anterior
  #find('#tipoDocumentoCpfCnpjProprietarioAnterior', text: 'CPF', exact: true)


  #Confere Número do Telefone do Prorietário Anterior
  #find('#cpfCnpjProprietarioAnterior', text: '023.475.788-47', exact: true)

  #Confere Endereço do Prorietário Anterior
  #find('#enderecoProprietarioFormatadoAnterior', text: '', exact: true) 


