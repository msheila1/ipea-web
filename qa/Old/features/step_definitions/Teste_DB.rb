# require 'rails/all'
#require 'tiny_tds'

#c = TinyTds::Client.new(
 # host: ENV['10.200.142.178:1433'],
 # username: ENV['usr_crinv'],
 # password: ENV['1!usrcrinv'],
 # database: 'DBINVESTIGACAO',
 # azure: true,
 # tds_version: '7.3'
#)

#puts c.execute("SELECT * FROM DbConVeiculo.dbo.Veiculo_dados
 # WHERE placa = 'fod0001'").each
# c.close



#require 'sequel'
#require 'activerecord-jdbcmssql-adapter'
#require 'tiny_tds'
#require 'pg'
#require 'pry'

#@db = Sequel.connect("jdbc:sqlserver://10.200.142.178:1433;database=Dbinvestigacao;user='usr_crinv';password='1!usrcrinv'")

#require 'tiny_tds'    
    #print 'test'       
   # client = TinyTds::Client.new username: 'usr_crinv', password: '1!usrcrinv',  
   # host: '10.200.142.178', port: 1433, database: 'Dbinvestigacao', azure:false
    
  #  results = client.execute("SELECT placa from DbConVeiculo.dbo.Veiculo_Dados where placa = 'CHI3000'")  
   # results.each do |row|  
   # puts row  
  #  end  



  #require 'tiny_tds'    
    #print 'test'       
   # client = TinyTds::Client.new username: 'usr_crinv', password: '1!usrcrinv',  
    #host: '10.200.142.178', port: 1433, database: 'DBINVESTIGACAO'
    
   # results = client.execute("SELECT placa from DbConVeiculo.dbo.Veiculo_Dados where placa = 'CHI3000'")  
   # results.each do |row|  
   # puts row  
   # end  
   #binding.pry

  # require 'tiny_tds'


   #client = TinyTds::Client.new(:username => 'usr_crinv', :password => '1!usrcrinv', :adapter => 'ado', :host => '10.200.142.178', :port => '1433' )
   #client.execute("Dbinvestigacao").do 
   #following block gets all the table names of the database and prints name.
   #result = client.execute("select * from Dbinvestigacao.dbo.Auto_Reconhecimento where id = '78'")
   #result.each do |row|
   #p row['cpf']	
   #puts row
   #end





  #client = Sequel.tinytds(
  #client = Sequel.tinytds(
   # :adapter=>   'ado',               #'ado'
   # :host     =>  '10.200.142.178',
   # :port =>  '1433',
   # :database => 'Dbinvestigacao',      
   # :username       => 'usr_crinv',  #No SSO possible
   # :password=> '1!usrcrinv'
  #)  
  #client.execute("Dbinvestigacao").do
  #placa = client.execute("select * from Dbinvestigacao.dbo.Auto_Reconhecimento where id = '78'")
  #placa.each do |row|
  #p row['cpf']
  #puts row
  #end


##require 'tiny_tds'


#client = TinyTds::Client.new(:username => 'usr_crinv', :password => '1!usrcrinv', :adapter=> 'ado', :host => '10.200.142.178', :port => 1433)
#client.execute("Dbinvestigacao").do 
#following block gets all the table names of the database and prints name.
#result = client.execute("SELECT * FROM sys.Tables")
#result.each do |row|
#p row['name']	
#end

  #binding.pry
  #puts 'coco'
  #puts placa
  #puts 'melda'
  #puts 123
  #binding.pry
  
  
 # client = Sequel.connect(
  #      :adapter=>   'ado',               #'ado'
   #     :host     =>  '10.200.142.178',
    #:port =>  '1433',
        #:database => 'Dbinvestigacao',      
       # :username       => 'usr_crinv',  #No SSO possible
        #:password=> '1!usrcrinv'
    #end  ) 
     # client.execute("Dbinvestigacao").do
      #result = client.execute("SELECT * FROM sys.Tables")
      #result.each do |row|
      #p row['name']	
      #end
      #puts 'puts'

      #client.execute('Dbinvestigacao').do
      #placa = client.execute("select * from Dbinvestigacao.dbo.Auto_Reconhecimento where id = '78'").do
      #placa.each do |row|
      #puts row
      #end
      
      #Auto_Reconhecimento where id = '78'

      #select * from Dbinvestigacao.dbo.Auto_Reconhecimento where id = '78'


     #@placa = client.execute("SELECT * from Auto_Reconhecimento where id = '78'")
     #binding.pry

     #placa.each do |row|
     #puts 1
     #puts @placa
     #puts 2
    # binding.pry
   # end


    #@acessa_bd = Mysql2::Client.new(:host =>"000.000.00.000", :database =>"base_meu_app", :username =>"root", :password =>"root")
    #@resultados = @acessa_bd.query("select * from usuarios where nome_usuario = 'BiroBiro'")
    #@resultados.each do |row|
     # puts row["nome_usuario"]
      #expect(row["nome_usuario"]).to eq 'BiroBiro'
    #end


 

    #client.test_connection  #force exception if problem occured



     # db = Sequel.connect(
      #  :adapter=>'ado', 
       # :host     =>connectiondata[:server], 
       # :database=>connectiondata[:database], 
        #~ :user       => connectiondata[:username],  #not needed via SSO
        #~ :password=>connectiondata[:password],    #not needed via SSO
        #:encoding =>Encoding::UTF_8,  #only MySQL
     # )
     # db.test_connection  #force exception if problem occured





#@set IBM_DB_HOME = C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/db2-2.7.0/
#require 'sequel'
#require 'tiny_tds'
#jdbc:db2://10.200.9.22:50001/RDO_DEV:user=db2aplicativos;password=adminpr0;

#jdbc:db2://10.200.9.22:50001/RDO_DEV:user=db2aplicativos;password=ADMINPR0;

#jdbc:db2://localhost:3700/database:user=user;password=ADMINPR0;

# SQL Server
#Sequel.connect('ado:///sequel_test?host=server%5cdb_instance')
#Sequel.connect('jdbc:db2://10.200.9.22:50001/RDO_DEV')

#require 'pry'
#require 'tiny_tds'
#client = TinyTds::Client.new(:host =>'10.200.142.178', :port =>1433, :database =>'DBINVESTIGACAO', :username =>'usr_crinv', :password =>'1!usrcrinv')

#binding.pry
#a = client.execute("select ANO_BO from TB_BO where HISTORICO_BO = 'xxxxxxxxxxxxx'")
#puts a



#client = TinyTds::Client.new (:host '10.200.142.178', :port 1433, :database 'DbConVeiculo', :username 'usr_crinv', :password '1!usrcrinv')

#require 'tiny_tds'
#require 'pry'
#client = TinyTds::Client.new username: 'db2aplicativos', password: 'ADMINPR0', host: '10.200.9.22', port: '50001', database: 'RDO_DEV'
#binding.pry
#a = client.execute("select ANO_BO from TB_BO where HISTORICO_BO = 'xxxxxxxxxxxxx'")
#binding.pry
#puts row
#binding.pry

