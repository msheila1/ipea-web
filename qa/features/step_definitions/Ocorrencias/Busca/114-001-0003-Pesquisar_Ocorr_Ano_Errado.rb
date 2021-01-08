Dados("que informo o Ano errado na tela de Ocorrência.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    #user_page.bt_limpar
   
    sleep(1) 
    end

    Quando("preencho os campos Número, Ano errado e Delegacia de um registro cadastrado.") do
        sleep(1) 
        user_page.preencher_numero
        user_page.preencher_ano_bo_errado
        user_page.clicar_delegacia
        user_page.preencher_delegacia
        sleep(1) 
        user_page.sel_op_delegacia
        sleep(1) 
        user_page.pesquisar_ocorrencia
 end
      
Então("verifico o retorno da mensagem Nenhum registro encontrado.") do

        find(:css, "div.ivu-notice-desc", text: "Nenhum registro encontrado.", exact: true)
        #find('span', text: 'Total de 1 registros', exact: true)
        page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

end
