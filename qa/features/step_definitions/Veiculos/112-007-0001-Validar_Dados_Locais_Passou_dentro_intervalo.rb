Dado("que estou na seção “Detecta LPR”, do dossiê do veículo") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    sleep(2)
    user_page.preencher_placa_dzz
    user_page.clicar_pesquisar
    sleep(2)
    user_page.clicar_link_detalhes_dzz   
    end
  
  Dado("informo a data inicial") do
    sleep(2)
    user_page.data_inicial_ok
  end
  
  Dado("informo a data final") do
    sleep(2)
    user_page.data_final_ok
  end
  
  Quando("aciono o botão “Pesquisar”") do
    user_page.clicar_busca
  end
  
  
  Então("o sistema lista os locais e horários, retornados do Detecta LPR, por onde o veículo suspeito passou") do
  #Confere DADOS BÁSICOS
  sleep(1)
  
  #find(css: 'h6', text: 'Registros encontrados')
  #find(:css, "div.ivu-notice-desc", text: "Registros encontrados", exact: true)
  find(:xpath, ".//div/div/div/div/div/div/div/div/h6", text: 'Registros encontrados')
  #find('h6', text: 'Registros encontrados')
  #find(:xpath, "//div[@id='locais']/div/div/h6", text: 'Registros encontrados', exact: true)
  find('span', text: '#')
  find('span', text: 'LOCAL')
  find('span', text: 'DATA/HORA')
   find('span', text: 'Total de 488 registros', exact: true)

   sleep(1)
   #Aplica Zoom para pegar print da tela inteira
   page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
   sleep(1)
  
   
  end
  