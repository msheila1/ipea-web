  Quando("preencho o campo Placa e pesquiso.") do
    #user_page.load
    #user_page.efetuar_login_sucesso
    #visit 'http://10.72.251.134/#/veiculos'
    
    user_page.load
    user_page.efetuar_login_sucesso
    user_page.acessar_veiculos
    user_page.preencher_placa
    #user_page.preencher_chassi
    sleep (1)
    #user_page.preencher_marca
    sleep(1)
    #user_page.clicar_combo_cor
    sleep(1)
    #user_page.preencher_cor
    #select 'BEGE', from: '#coresInput'
    #user_page.clicar_combo_tipo
    #user_page.clicar_combo_tipo
    sleep(1)
    #user_page.preencher_tipo
    sleep(2)
    
    #user_page.clicar_municipio
    #user_page.preencher_municipio


    #user_page.sel_op_municipio
    #find('#municipioCompleteInput').set 'SANTOS'
    

    
    #find('ul', text: 'SANTOS - SP').click

  
    
    user_page.clicar_pesquisar
    sleep(3)
    #click_link 'CHI3000'
    #user_page.clicar_link_detalhes
    #sleep(4)
  end
  
  Então("o sistema retorna registros conforme a placa utilizada.") do
  find('a', text: 'I/AUDI A4 CABRIOLET 3.0', exact: true)
  #find('a', text: 'JEEP RENEGADE ', exact: true)
end
  
  Quando("preencho o campo Chassi e pesquiso.") do
    visit 'http://10.72.251.134/#/veiculos'
    user_page.bt_limpar
    sleep(2)
    user_page.preencher_chassi
    sleep (2)
    user_page.clicar_pesquisar
    sleep(3)
  end

  Então ("o sistema retorna registros conforme o Chassi utilizado.") do
  find('a', text: 'IMP/ALFA ROMEO 155 SUPER', exact: true)
  #find('a', text: 'FUSCA ROSA', exact: true)

  #select 'BRANCA', from: 'element-id=coresInput'


  end

