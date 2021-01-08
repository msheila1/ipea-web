    Dados("que acesso a tela de Ocorrência.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_ocorrencias
    #user_page.bt_limpar
    sleep(1) 
    end

Quando("preencho os campos Número, Ano e Delegacia com valor exato de um registro cadastrado.") do
  sleep(1) 
  user_page.preencher_numero
  user_page.preencher_ano_bo
  user_page.clicar_delegacia
  user_page.preencher_delegacia
  sleep(1) 
  user_page.sel_op_delegacia
  sleep(1) 
  user_page.pesquisar_ocorrencia

end

Então("o sistema retorna a Ocorrência conforme os dados informados.") do
  #Confere LABEL DO GRID
  find("h6", text: 'Registros encontrados', exact: true)
  #Confere NÚMERO
  find('a', text: '2592', exact: true)
  #Confere ANO
  find('a', text: '2018', exact: true)
  #Confere DELEGACIA
  find('a', text: 'DEL.POL.PRAIA GRANDE', exact: true)
  #Confere NATUREZA
  find('a', text: '- ROUBO (ART. 157)', exact: true)
  #Confere Totalizador
  find('span', text: 'Total de 1 registros', exact: true)
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")

end
