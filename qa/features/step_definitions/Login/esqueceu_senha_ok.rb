Dado("que eu queira logar na aplicação e não lembro a senha.") do
    user_page.load
  end
  
  Quando("clico em Esqueceu sua senha?.") do
    sleep(1)
    user_page.esqueci_senha_link
  end
  
  Então("o sistema exibe a tela Esqueceu sua senha?") do
    find(:xpath, "//p", text: "Esqueceu sua senha?", exact: true)
  end
  
  Quando("eu informo o RG e clico em OK") do
    user_page.insere_rg
    user_page.clicar_btn_ok
  end
  
  Então("o sistema envia um e-mail para o usuário alterar a senha.") do
    sleep(5)
    find('span', text: 'Falha ao enviar e-mail, por favor, tente novamente mais tarde', exact: true)
  
  end

