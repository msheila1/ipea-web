  Quando("estou na tela inicial e clico em Veículos.") do
  user_page.load
  #user_page.expandir_menu
  #user.acessar_veiculos
  
  user_page.efetuar_login_sucesso
  sleep(2)
  find(:xpath, '//ul/li[3]/span').click
  sleep(2)

  

  

   # visit 'http://10.72.251.134/#/inicio'
    #find(:xpath, “xpath do elemento”).click
   # page.has_xpath?('//*[@id="app"]/div/section/aside/div/span/i')
   # sleep(1)
   # page.has_xpath?('//li[3]/span')
    sleep(2)
  end
  
  Então("verifico se estou na tela de Veículos.") do
    sleep(2)
    expect(page).to have_content 'VEÍCULOS', true
    #expect(page).to have_content 'CARROS', true

    #find('a', text: 'FUSCA ROSA', exact: true)
    sleep(2)
  end