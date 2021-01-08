#language: pt

Funcionalidade: Versão do Sistema.

Cenário: Validar o versionamento do sistema.

Dado eu faça o login com sucesso
Quando acesso a pagina inicial
Então visualizo, na parte inferior da tela, a atual versão do sistema
E ao acessar qualquer outra tela do sistema, continuo visualizando a atual versão do sistema
