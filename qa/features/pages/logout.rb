class UserPage < SitePrism::Page
    set_url 'http://10.72.251.134:8081/auth/realms/ipea/protocol/openid-connect/auth?client_id=ssp-ipea-web&redirect_uri=http%3A%2F%2F10.72.251.134%2F%23%2Finicio&state=677a89b4-640e-441d-98ed-d663529c9c80&response_mode=fragment&response_type=code&scope=openid&nonce=a7230c1b-3157-4013-8b8c-2c3b4ed82f30'
    element :logado, 'span', text: 'Teste QA'
    #element :sair, '//li[2]/ul/li', text: 'Sair'
    element :sair, 'ul > li.group-last.ivu-menu-item-group', text: 'Sair'
    element :sim, 'button', text: 'Sim'

    def efetuar_logout
    logado.click
    sleep(1)
    sair.click
    sleep(1)
    sim.click
    end
end

