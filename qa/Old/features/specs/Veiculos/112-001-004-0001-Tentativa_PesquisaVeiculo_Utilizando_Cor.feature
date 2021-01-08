#language: pt

Funcionalidade: 112-001-004-0001-Tentativa de Pesquisa de Veículos utilizando somente Cor do Veículo - Entrada: PRATA - Resultado: Validação - Adicione placa ou chassi ou municipio.

Cenário: Selecionar uma ou mais cores do veículo e não obter resultado algum. O sistema deverá validar solicitando como parâmetro adicional o chassi ou município.

Dado que estou na tela de pesquisa de Veículos - Somente Cor do Veículo.

Quando preencho a Cor do Veículo e pesquiso - Somente Cor do Veículo.

Então verifico se o sistema retornou a mensagem Adicione placa ou chassi ou municipio - Somente Cor do Veículo.