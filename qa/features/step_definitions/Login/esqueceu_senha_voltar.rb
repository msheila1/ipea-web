Dado("que eu queira logar na aplicação e não lembro a senha correta.") do
    user_page.load
    end
  
  Quando("clico no link Esqueceu sua senha?.") do
    user_page.esqueci_senha_link
  end
  
  Então("o sistema exibe a tela Esqueceu sua senha? para prenchimento") do
    find(:xpath, "//p", text: "Esqueceu sua senha?", exact: true)
  end
  
  Quando("eu informo o RG e clico em Voltar") do
    user_page.clicar_btn_voltar
  end
  
Então("o sistema o sistema retorna para a tela de login.") do
    find(:xpath, "//p/strong", text: 'Autenticação', exact: true)

   end
