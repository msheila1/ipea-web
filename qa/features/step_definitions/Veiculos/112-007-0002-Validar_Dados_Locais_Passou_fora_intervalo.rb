Dado("que acessei a seção “Detecta LPR”, do dossiê do veículo") do
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
  
  Dado("informo a data inicial maior que {int} dias") do |int|
    sleep(2)
    user_page.data_inicial_msg
  end
  
  Dado("informo a data final válida") do
    sleep(2)
    user_page.data_final_ok
  end
  
  Quando("eu clico no botão “Pesquisar”") do
    user_page.clicar_busca
  end
  
  Então("o sistema exibe uma mensagem de consistência, informando que o intervalo máximo entre a data inicial e final é {int} dias.") do |int|
   #Confere DADOS BÁSICOS
   
    find(:css, "div.ivu-notice-desc", text: "Período não pode ser superior a 7 dias", exact: true)
 
    sleep(1)
    #Aplica Zoom para pegar print da tela inteira
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    sleep(1)
   
  end
  
  