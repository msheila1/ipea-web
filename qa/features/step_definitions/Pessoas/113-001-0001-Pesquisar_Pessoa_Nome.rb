    Dados("que acesso a tela de Pessoas.") do
      user_page.load
      visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
      #user_page.efetuar_login_sucesso
      sleep(1) 
      user_page.acessar_pessoas
         sleep(1) 
      end
      
      Quando("preencho o campo nome com valor exato de um registro cadastrado.") do
       sleep(1) 
      user_page.preencher_nome
      user_page.clicar_pesquisar
      end
      sleep(1) 
      Então("o sisteme retorna os dados conforme nome utilizado.") do
    
        find(:xpath, '//th[3]/div/span', text: 'NOME', exact: true)
        #find('span', text: 'NOME', exact: true)
        find('span', text: 'VANDERLEI JOSÉ DA SILVA', exact: true) 
      end