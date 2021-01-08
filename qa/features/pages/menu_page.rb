class UserPage < SitePrism::Page
    set_url 'http://10.72.251.134/#/inicio'
    element :expandir, '#app > div > section > aside > div > span > i'
    element :inicial, 'ul.ivu-menu.ivu-menu-dark.ivu-menu-vertical.menu-item > li.ivu-menu-item > i'
    element :ocorrencias, 'span', text: "Ocorrências"
    #element :ocorrencias, :xpath, "//li[@class='ivu-menu-item ivu-menu-item-active ivu-menu-item-selected']/span"
    element :pessoas, 'span', text: "Pessoas"
    element :veiculos, 'span', text: "Veículos"
    

    def expandir_menu
    expandir.click
    end

    def acessar_ocorrencias
    ocorrencias.click
    end

    def acessar_pessoas
    pessoas.click
    end

    def acessar_veiculos
    veiculos.click
    end

    def acessar_inicial
    inicial.click
    end

end
