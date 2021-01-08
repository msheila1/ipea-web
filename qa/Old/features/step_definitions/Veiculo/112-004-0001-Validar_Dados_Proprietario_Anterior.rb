Dado("que realizo uma pesquisa de veículos com sucesso para verificar dados do proprietário anterior do veículo.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    #user_page.efetuar_login_sucesso

    user_page.load
    user_page.acessar_veiculos
    user_page.prencher_placa_chi
    user_page.clicar_pesquisar

  end
  
  Quando("seleciono um registro para verificar dados do proprietário anterior do veículo.") do
    user_page.clicar_link_detalhes_chi   
    sleep(2)
    user_page.clicar_link_pro_anterior
    sleep(2)


   
  end
  
  Então("confiro os dados do proprietário anterior do veículo.") do
  #Confere Nome do Prorietário Anterior
  find('#proprietarioAnterior', text: 'ABGAIL SOUZA NEVES', exact: true) 
   
  #Confere RG do Prorietário Anterior
  #find('#rgProprietario', text: '580621728', exact: true)
  find('a', text: '580621728', exact: true)
#find('a', text: 'CHI0015').hover

  #Confere UF/Órgão do Prorietário Anterior
  find('#rgUfProprietarioAnterior', text: 'SP/SSP', exact: true)

  #Confere Tipo do documento do Prorietário Anterior
  find('#tipoDocumentoCpfCnpjProprietarioAnterior', text: 'CPF', exact: true)


  #Confere Número do Telefone do Prorietário Anterior
  find('#cpfCnpjProprietarioAnterior', text: '023.475.788-47', exact: true)

  #Confere Endereço do Prorietário Anterior
  find('#enderecoProprietarioFormatadoAnterior', text: '', exact: true) 

 sleep(1)
  user_page.clicar_historico
  sleep(1)


  user_page.clicar_bo

  sleep(1)

  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

  sleep(1)


  


    
  end