Dado("eu faça o login com sucesso") do
    user_page.load
    #user_page.efetuar_login_sucesso
    sleep(1)
     
end
  
  Quando("acesso a pagina inicial") do
    find(:xpath, ".//a/span[@class='sub-title']", text: 'Inquérito Policial Eletrônico Analítico', exact: true)
  end
  
  Então("visualizo, na parte inferior da tela, a atual versão do sistema") do
    find(:xpath, ".//div/footer/span[@class='ml-auto']", text: 'Build v1.0.355 de 30/01/2018', exact: true)
  end
  
  Então("ao acessar qualquer outra tela do sistema, continuo visualizando a atual versão do sistema") do
    user_page.acessar_ocorrencias
    sleep(1)

    find(:xpath, ".//div/footer/span[@class='ml-auto']", text: 'Build v1.0.355 de 30/01/2018', exact: true)

  sleep(1)
  #Aplica Zoom para pegar print da tela inteira
  page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
  sleep(1)

  end
  