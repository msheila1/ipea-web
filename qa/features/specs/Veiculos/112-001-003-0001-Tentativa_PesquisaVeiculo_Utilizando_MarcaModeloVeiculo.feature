#language: pt

Funcionalidade: 112-001-003-0001-Tentativa de Pesquisa de Veículos utilizando somente Marca/Modelo do Veículo - Entrada: FIAT/PALIO - Resultado: Validação - Adicione placa ou chassi ou municipio.

Cenário: Informar a marca modelo do veículo e não retornar resultado. O sistema deverá validar solicitando como parâmetro adicional o chassi ou município.

Dado que estou na tela de pesquisa de Veículos - Somente Marca Modelo Veículo.

Quando preencho a Marca ou Modelo de Veículo e pesquiso - Somente Marca Modelo Veículo.

Então verifico se o sistema retornou a mensagem Adicione placa ou chassi ou municipio - Somente Marca Modelo Veículo.