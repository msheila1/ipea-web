Dado("que estou logado.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(2)
  end
  
  Quando("clico em sair.") do
    user_page.efetuar_logout
   
  end
  sleep(2)
  Então("o sistema encerra minha sessão e exibe a tela de login.") do
    find('#username', exact: true)
    
  end