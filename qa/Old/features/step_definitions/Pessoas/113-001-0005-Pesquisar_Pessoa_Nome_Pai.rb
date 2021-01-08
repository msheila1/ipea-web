Dados("que quando pesquiso o Nome do Pai na tela de Pessoas.") do
  user_page.load
  visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
  #user_page.efetuar_login_sucesso
  sleep(1) 
  user_page.acessar_pessoas
    sleep(1)  
  end
  
  Quando("preencho o campo Nome do Pai com o valor exato.") do

    user_page.preencher_nome_pai
    user_page.clicar_pesquisar

  end
  
  Então("o sistema retorna os dados conforme Nome do Pai utilizado.") do
    find(:xpath, '//th[8]/div/span', text: 'NOME DO PAI', exact: true)
        

    #find('span', text: 'NOME', exact: true)
    find('span', text: 'JACINTHO CELESTINO DE SALLES', exact: true) 
    
end
