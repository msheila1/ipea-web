    Quando("Efetuo Login.") do
    user_page.load
    user_page.efetuar_login_sucesso
    #page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  


    sleep(1)
  
    

    sleep(1)

    #fill_in "username", :with=> "263698890"
    #fill_in "password", :with=> 'Nv@150978'
    #click_button 'Entrar'
    #Sleep(2)
    #find('#app > div > section > aside > div > span > i').click
    #Sleep(3)
    #page.has_xpath?('//li[3]/span')
    #Sleep(3)



    #page.has_css?('table tr.foo')
    #page.has_content?('foo')
    #find_element(:xpath, ).click
    #find('#app > div > section > aside > div > div.ivu-layout-sider-children > ul.ivu-menu.ivu-menu-dark.ivu-menu-vertical.menu-item > li.ivu-menu-item-group > ul > li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected > span').click
    #click_on 'Veículos'
    
  end
  
  Então("a página inicial é exibida.") do
  #find('ul.ivu-menu.ivu-menu-dark.ivu-menu-vertical.menu-item > li.ivu-menu-item > i').click
  #user_page.acessar_inicial

  sleep(1)
    #expect(page).to have_content 'Utilize o menu lateral para acessar as funcionalidades do sistema.', exact: true

   #validação dados pegos de planilha
    data_login = Roo::Spreadsheet.open('C:/Users/magna32/Desktop/data_login.xlsx')
    @logado = data_login.sheet('data_login').cell('A', 3).to_s # Para usuário Logado  

    
    find('.ivu-menu-submenu-title', text: @logado, exact: true)

    data_login = Roo::Spreadsheet.open('C:/Users/magna32/Desktop/data_login.xlsx')
    @pagina = data_login.sheet('data_login').cell('A', 4).to_s # Para texto identificador da página 
    
    find('.ivu-breadcrumb', text: @pagina, exact: true)

    

   
    #user_page.acessar_ocorrencias
    

   # find('span', text: 'admin').click
   
    #find(:xpath, '//li[2]/ul/li', text: 'Sair').click
    
    #find('button', text: 'Sim').click
    #user_page.efetuar_logout

  sleep(1)
  end
