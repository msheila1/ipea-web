# Importa as gems
require 'capybara/cucumber'
require 'selenium-webdriver'
require 'site_prism'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec/matchers'
require 'faker'
require 'ostruct'
require 'roo'
#require 'tiny_tds'
require 'pry'
require 'roo'
require 'rake'
require 'rubocop'
require 'httparty'
#require 'jdbc-sqlserver'
#require 'activerecord-jdbc-adapter'
#require 'jdbc-mssqlserver'
#require 'activerecord'
#require 'db2'
require 'sequel'
require 'pg'
require_relative 'helper.rb'
require_relative 'page_helper.rb'
#require 'activerecord-jdbcmssql-adapter'



# Coloca as variaveis como global
World(Capybara::DSL)
World(Capybara::RSpecMatchers)
World(Pages)
World(Helper)

# Variavel para o nome do ambiente
AMBIENTE = ENV['AMBIENTE']
# Variavel para o nome do browser
BROWSER = ENV['BROWSER']
# Configuracao para dizer o caminho do ambiente a se usar
CONFIG = YAML.load_file(File
  .dirname(__FILE__) + "/ambientes/#{AMBIENTE}.yml")

# Configura o tipo de browser
Capybara.register_driver :selenium do |app|
  if BROWSER.eql?('chrome')
    Capybara::Selenium::Driver.new(
      app,
      browser: :chrome,
      desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
        'chromeOptions' => { 'args' => ['--start-maximized',
                                        '--disable-infobars'] }
      )
    )
  elsif BROWSER.eql?('firefox')
    Capybara::Selenium::Driver.new(
      app,
      browser: :firefox,
      desired_capabilities: Selenium::WebDriver::Remote::Capabilities
        .firefox(marionette: true)
    )
  end
end

# Configura o link principal e qual navegador vai usar
Capybara.configure do |config|
  config.default_driver = :selenium
  config.app_host = CONFIG['url_home']
end

# Configura o tempo maximo de espera
Capybara.default_max_wait_time = 20





browser = Capybara.current_session.driver.browser
browser.manage.window.resize_to(1920, 1080)
#browser.execute_script("document.getElementsByTagName('html')[0].style['zoom'] = 0.75")
#1280x1024
#1024x768
#1280x1024
#1600x1200
#800x600
Capybara.default_wait_time = 20
browser.manage.delete_all_cookies
#browser.manage.delete_all_cash

