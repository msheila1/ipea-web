Dado("que eu execute uma ação qualquer na aplicação") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    user_page.bt_limpar
   
    sleep(1) 
    end
  
  Quando("ocorrer algum problema com uma situação ou erro") do
    sleep(1) 
    user_page.preencher_numero_errado
    user_page.preencher_ano_bo
    user_page.clicar_delegacia
    user_page.preencher_delegacia
    sleep(1) 
    user_page.sel_op_delegacia
    sleep(1) 
    user_page.pesquisar_ocorrencia
    end
  
  Então("o sistema deverá retornar a mensagem de validação em Português.") do

        find(:css, "div.ivu-notice-desc", text: "Nenhum registro encontrado.", exact: true)

        page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
    end
  