Dado("que realizo uma pesquisa de veículos com sucesso para verificar dados de Boletins de Ocorrência relacionados ao veículo a fim de visualizar os B.O.s.") do
    visit 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    user_page.load
    user_page.efetuar_login_sucesso_del
    sleep(1)
    user_page.acessar_veiculos
    user_page.bt_limpar
    sleep(2)
    user_page.preencher_placa_fod
    user_page.clicar_pesquisar
    sleep(2)
    end
  
    Quando("seleciono um registro para verificar os dados de Boletins de Ocorrência relacionados ao veículo e seleciono um B.O.") do
      user_page.clicar_link_detalhes_fod   
        sleep(2)
        #user_page.clicar_link_pro_anterior
        #sleep(2)
        user_page.clicar_bo
        
    end
  
    Então("o sistema exibe o B.O. relacionado.") do
      #Confere as colunas da grid "B.Os relacionados ao veículo"
    
      #find('class', 'ivu-table-column-center', exact: true)
      find('span', text: '#', exact: true)
    
      find('span', text: 'DATA DA ELABORAÇÃO', exact: true)
    
      find('span', text: 'NÚMERO/ANO', exact: true)
    
      find('span', text: 'NATUREZA', exact: true )
    
      find('span', text: 'DELEGACIA', exact: true)
    
      find('span', text: 'ENVOLVIMENTO', exact: true)
    
      find('span', text: 'OPÇÕES', exact: true)
    
      sleep(1)
      #Confere o número de registros de Histórico apresentados após a consulta
      #find('span', text: 'Total de 784 registros', exact: true)
      find('span', text: 'Aproximadamente 800 resultados', exact: true)
      
      visit 'blob:http://10.72.251.134/f5b2e4f6-4c1e-451c-ae59-f81f3f2bb23f'
  
      #janela atual, recebe uma janela que foi aberta pelo link (user_page.visualizacao_bo)
      janela = window_opened_by do
      user_page.visualizacao_bo
      find('span', text: 'a6c56e52-1e7b-4ddb-9280-87206bd11bae', exact: true)
     
    end

      find('span', text: 'a6c56e52-1e7b-4ddb-9280-87206bd11bae', exact: true)
     
    #muda o foco para a janela atual  
    within_window janela do
      #valida se a url é igual a url aberta pelo link (user_page.visualizacao_bo)
      #expect(current_url).to eq 'blob:http://10.72.251.134/f5b2e4f6-4c1e-451c-ae59-f81f3f2bb23f'
      expect(current_url).to eq URI.parse(current_url)
      #expect(current_url) = URI.parse(current_url)
      
      @mensagem = find('f5b2e4f6-4c1e-451c-ae59-f81f3f2bb23f')
      expect(@mensagem.text).to eq 'O arquivo não foi encontrado'
      #@mensagem = find('a6c56e52-1e7b-4ddb-9280-87206bd11bae')
      #find('span', text: 'a6c56e52-1e7b-4ddb-9280-87206bd11bae', exact: true)
      janela.close
      sleep(2)

      #outra opção
      
      #user_page.visualizacao_bo
      #mudando para a ultima aba
      #switch_to_window window.last

      #expect(current_url).to eq 'blob:http://10.72.251.134'
      
      #@mensagem = find('Oa6c56e52-1e7b-4ddb-9280-87206bd11bae')
      #expect(@mensagem.text).to eq 'O arquivo não foi encontrado'
      #@mensagem = find('a6c56e52-1e7b-4ddb-9280-87206bd11bae')
      #find('span', text: 'a6c56e52-1e7b-4ddb-9280-87206bd11bae', exact: true)
      #window.last.close
      #sleep(2)

    end

    
  
    sleep(5)
     #Aplica Zoom para pegar print da tela inteira
     page.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
     sleep(1)
    
end
  
  