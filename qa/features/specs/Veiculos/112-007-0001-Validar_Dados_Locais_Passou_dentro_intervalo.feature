#language: pt

Funcionalidade: Exibição de Locais onde o veiculo passou

Cenário: Informar data inicial e final (dentro do intervalo de 7 dias)

Dado que estou na seção “Detecta LPR”, do dossiê do veículo
E informo a data inicial
E informo a data final
Quando aciono o botão “Pesquisar” 
E o sistema lista os locais e horários, retornados do Detecta LPR, por onde o veículo suspeito passou
