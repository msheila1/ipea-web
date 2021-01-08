#Dir [File.join(File.dirname(__FILE__), "/pages/login_page.rb")].each {|file| require file}
#Dir[File.join(File.dirname(__FILE__), "../pages/*_page.rb")].each {|file| require file}


module Pages
    def user_page
      @user_page ||= UserPage.new
    end
    end


    # Modulos para chamar as classes instanciadas
#module Pages
 # def user_page
  #  @user_page ||= UserPage.new
  #end
#end