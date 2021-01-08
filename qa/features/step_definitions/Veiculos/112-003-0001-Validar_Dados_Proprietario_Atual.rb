Dado("que realizo uma pesquisa de veículos com sucesso com o intuito de verificar dados do proprietário atual do veículo.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    #user_page.efetuar_login_sucesso

    user_page.load
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    user_page.preencher_placa
    user_page.clicar_pesquisar
  end
  sleep(2)
  Quando("seleciono um registro com o intuito de verificar dados do proprietário atual do veículo.") do
    user_page.clicar_link_detalhes   
    sleep(2)
  end
  
  Então("confiro os dados do propretário atual do veículo.") do
  #Confere Nome do Prorietário Atual
  find('#proprietario', text: 'PRODESP CIA DE PARARARARA', exact: true) 
   
  #Confere RG do Prorietário Atual
  find('#rgProprietario', text: '', exact: true)


  #Confere UF/Órgão do Prorietário Atual
  find('#rgUfProprietario', text: '', exact: true)

  #Confere Label UF/Órgão do Prorietário Atual
  find(:xpath, "//div/div/div[1]//div/div/div[1]//div[3]/div/label", text: 'UF/Órgão', exact: true)

  #Confere Tipo do documento do Prorietário Atual
  find('#documentoProprietario', text: 'CNPJ', exact: true)

  #Confere Número do documento do Prorietário Atual
  find('#cpfCnpjProprietario', text: '81.243.735/0001-48', exact: true)

  #Confere Número do Telefone do Prorietário Atual
  find('#telefoneProprietario', text: '', exact: true)

  #Confere Endereço do Prorietário Atual
  find('#enderecoProprietarioFormatado', text: 'RUA DOS INGLESESE, 878 6 ANDAR - BELA VISTA - GUARULHOS - SP', exact: true)

  sleep(1)
  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)
 
   end