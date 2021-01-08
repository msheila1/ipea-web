Dados("que quando pesquiso a Idade Aproximada na tela de Pessoas.") do
  user_page.load
  visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
  #user_page.efetuar_login_sucesso
  sleep(1) 
  user_page.acessar_pessoas
   
 
  
end
  
  Quando("preencho o campo Idade Aproximada com o valor aproximado.") do

    user_page.clicar_combo_idaprox
    sleep(1)
    user_page.sel_idaprox
    sleep(1)
    user_page.clicar_pesquisar
   
    end

  Então("o sistema retorna os dados conforme Idade Aproximada utilizada.") do
        #find(:xpath, '//th[5]/div/span', text: 'RG', exact: true)

            #Confere o número de registros de Histórico apresentados após a consulta
            find('span', text: 'Total de 288 registros', exact: true)
 
             #find('span', text: 'NOME', exact: true)
             #find('span', text: '40', exact: true)
    end