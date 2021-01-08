Dado("que realizo uma pesquisa de veículos com sucesso.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    #user_page.efetuar_login_sucesso

    user_page.load
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    user_page.preencher_placa
    user_page.clicar_pesquisar
  end
  
  Quando("seleciono um registro.") do
    user_page.clicar_link_detalhes   
    sleep(2)
    
  end
  
  Então("confiro os dados pessoais do veículo.") do
  #Confere DADOS BÁSICOS
  find("h6", text: 'Dados básicos') 
  #Confere PLACA
  find('#placa', text: 'CHI3000', exact: true)
  #Confere Label Município/UF do veículo
  find(:xpath, "//div[@id='municipio']/label", text: 'Município/UF do veículo', exact: true)
  #Confere MUNICÍPIO
  find('#municipio', text: 'SANTOS-SP', exact: true)
  #Confere MARCA/MODELO
  find('#marcaModelo', text: 'I/AUDI A4 CABRIOLET 3.0', exact: true)
  #Confere CHASSI
  find('#chassi', text: '9BD1234SP1CHI3100', exact: true)  
  #Confere RENAVAN
  find('#renavam', text: '9768', exact: true) 
  #Confere COR
  find('#cor', text: 'AMARELA', exact: true)
  #Confere TIPO
  find('#tipo', text: 'AUTOMOVEL', exact: true)
  #Confere ANO
  find('#anoModelo', text: '1988/1988', exact: true)
  #Confere ESPÉCIE
  find('#especie', text: 'PASSAGEIRO', exact: true)
  #Confere CARROCERIA
  find('#carroceria', text: '', exact: true)
  #Confere CATEGORIA
  find('#categoria', text: 'OFICIAL', exact: true)

  #Confere Label UF
  find("h6", text: 'Dados básicos')  

  sleep(1)
  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)
 

 end