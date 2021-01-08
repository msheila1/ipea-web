Dados("que informo a Delegacia errada na tela de Ocorrência.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    #user_page.bt_limpar
   
    sleep(1) 
    end

    Quando("preencho os campos Número, Ano e Delegacia errada um registro cadastrado.") do
        sleep(1) 
        user_page.preencher_numero
        sleep(1)
        user_page.preencher_ano_bo
        sleep(1)
        user_page.clicar_delegacia
        sleep(1)
        #user_page.preencher_delegacia
        user_page.preencher_delegacia_errada
        sleep(1) 
        #user_page.sel_op_delegacia
        sleep(1) 
        user_page.pesquisar_ocorrencia
 end
      
    Então("verifico a mensagem de retorno Nenhum registro encontrado.") do

        find(:css, "div.ivu-notice-desc", text: "Nenhum registro encontrado.", exact: true)
        page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

end

