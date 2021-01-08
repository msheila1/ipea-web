# modulo com um metodo para tirar foto e imbutir a foto no relatorio
# gerado pelo cucumber.
#module Helper
module Helper 

    def tirar_foto(nome_arquivo, resultado)
        caminho_da_pasta = "report/screenshots/test_#{resultado}"
        foto = "#{caminho_da_pasta}/#{nome_arquivo}.png"
        page.save_screenshot(foto)
        time_stamp = Time.now.strftime("%d/%m/%Y_%HH:%MM:%SS")
        embed(foto, 'image/png', 'Evidência de Teste Automatizado Executado em: ' + time_stamp)
    end
end