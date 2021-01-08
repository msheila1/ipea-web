#language: pt

Funcionalidade: 112-001-005-0001-Tentativa de Pesquisa de Veículos utilizando somente Tipo de Veículo - Entrada: AUTOMÓVEL - Resultado: Validação - Adicione placa ou chassi ou municipio.

Cenário: Selecionar um ou mais tipos de veículo e não obter resultado algum. O sistema deverá validar solicitando como parâmetro adicional o chassi ou município.

Dado que estou na tela de pesquisa de Veículos - Somente Tipo de Veículo.

Quando preencho a Cor do Veículo e pesquiso - Somente Tipo de Veículo.

Então verifico se o sistema retornou a mensagem Adicione placa ou chassi ou municipio - Somente Tipo de Veículo.