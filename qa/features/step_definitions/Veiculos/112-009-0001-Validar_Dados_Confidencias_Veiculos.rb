Dado("que realizo uma pesquisa de veículos com sucesso para filtro especifico.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    #user_page.efetuar_login_sucesso
    user_page.load
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    
  end
  
  Quando("seleciono um registro Confidencial.") do
    user_page.preencher_marca_conf
    sleep(1)
    user_page.preencher_municipio_conf
    sleep(1)
    user_page.clicar_municipio
    sleep(1)
    user_page.sel_op_municipio_conf
    sleep(1)
    user_page.clicar_pesquisar
    sleep(1)
    user_page.clicar_paginacao
    sleep(1)
    user_page.clicar_confidencial
    
  end
  
  Então("sistema exibe a mensagem de usuário sem permissão para vizualizar o registro.") do
 
    find(:css, "div.ivu-modal-confirm-body", text: "Usuário sem permissão para exibir registro confidencial.", exact: true)
    #find('#categoria', text: 'OFICIAL', exact: true)

  sleep(1)
  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)
 

 end


  