Dado("que estou permaneço na tela de Veiculos.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_veiculos
    sleep(1)
    end
  
    Dado("realizei a selecionei o tipo, limpei e selecionei o tipo novamente.") do
      
        user_page.clicar_combo_tipo
        sleep(1)
        user_page.selecionar_tipo_fod
        sleep(1)
        user_page.clicar_combo_tipo
        sleep(1)
        user_page.bt_limpar
        sleep(2)
        user_page.clicar_combo_tipo
        sleep(1)
        user_page.selecionar_tipo_fod
        sleep(1)
        user_page.clicar_combo_tipo
        sleep(1)
              
  end
  
  Quando("e após, clico eu sobre o botão “Limpar” da pagina novamente.") do
    sleep(2)
    user_page.bt_limpar
    sleep(2)
  end
  
  Então("o sistema limpa todos os dados da pagina de pesquisa novamente.") do
     sleep(1)
     #Aplica Zoom para pegar print da tela inteira
     page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
     sleep(1)
  end