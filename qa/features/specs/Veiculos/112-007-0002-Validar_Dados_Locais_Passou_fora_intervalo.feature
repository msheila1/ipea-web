#language: pt

Funcionalidade: Exibição de Locais onde o veiculo passou

Cenário: Informar data inicial e final (fora do intervalo de 7 dias)

Dado que acessei a seção “Detecta LPR”, do dossiê do veículo
E informo a data inicial maior que 07 dias
E informo a data final válida
Quando eu clico no botão “Pesquisar”
Então o sistema exibe uma mensagem de consistência, informando que o intervalo máximo entre a data inicial e final é 7 dias.
