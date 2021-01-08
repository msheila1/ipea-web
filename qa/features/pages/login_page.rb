class UserPage < SitePrism::Page
    #setando a url de acesso a tela de Login
    set_url 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    #Reconhecendo os elementos da tela de Login
    element :rg, '#username'
    element :senha, '#password'
    element :entrar, '#kc-login'
    element :esqueci_senha, :link, 'Esqueceu sua senha?'
    element :btn_ok,  "//div[@class=' row']/div/input"
    element :btn_voltar, :xpath, "//div/span/a"
    


    #Criando o método Efetuar Login 
    def efetuar_login_sucesso
    #Chamando a Gem Roo para abrir a planilha    
    data_login = Roo::Spreadsheet.open('C:/Users/magna32/Desktop/data_login.xlsx')
    #Criando a variável @user e atribuindo um valor a ela
    @user = data_login.sheet('data_login').cell('A', 2).to_s # Para user
    #Para o element "rg", setar o valor armazenado na varíavel @user    
    rg.set @user
    #Criando a variável @pass e atribuindo um valor a ela
    @pass = data_login.sheet('data_login').cell('B', 2).to_s # Para password
    #Para o element "senha", setar o valor armazenado na varíavel @pass   
    senha.set @pass
    #Clicar no botão "Entrar"
    entrar.click
    end

    def efetuar_login_sucesso_del
        #Chamando a Gem Roo para abrir a planilha    
        data_login = Roo::Spreadsheet.open('C:/Users/magna32/Desktop/data_login.xlsx')
        #Criando a variável @user e atribuindo um valor a ela
        @user = data_login.sheet('data_login').cell('A', 3).to_s # Para user
        #Para o element "rg", setar o valor armazenado na varíavel @user    
        rg.set @user
        #Criando a variável @pass e atribuindo um valor a ela
        @pass = data_login.sheet('data_login').cell('B', 3).to_s # Para password
        #Para o element "senha", setar o valor armazenado na varíavel @pass   
        senha.set @pass
        #Clicar no botão "Entrar"
        entrar.click
    end

    def esqueci_senha_link
        esqueci_senha.click    
    end
    
    def clicar_btn_ok
        btn_ok.click
    end

    def clicar_btn_voltar
        btn_voltar.click
    end

    def insere_rg
        data_login = Roo::Spreadsheet.open('C:/Users/magna32/Desktop/data_login.xlsx')
        @user = data_login.sheet('data_login').cell('A', 2).to_s # Para user
        rg.set @user
    end
   
end
