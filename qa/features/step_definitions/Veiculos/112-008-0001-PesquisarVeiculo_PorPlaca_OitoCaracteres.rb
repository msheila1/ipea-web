Dado("que estou na tela de pesquisa de Veículos - Placa oito caracteres.") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
    user_page.acessar_veiculos 
    user_page.bt_limpar
  end
  
Quando("Preencho o campo Placa com oito caracteres.") do
    user_page.preencher_placa_err
    sleep(2)
  end
  
Então("o sistema ignora o oitavo caracter.") do
    sleep(3)
    #O campo aceita somente 07 caracteres, o cursor fica visivel no campo aguardando nova ação do usuário.
    find('h6', text: 'Filtros para pesquisa', exact: true)
    page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  end
