# QA de design — checkpoint 11

- Fonte do sistema de design: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Implementação para computador: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-desktop.png`
- Implementação para celular: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-mobile-final.png`
- Comparação lado a lado: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-comparison.png`
- Dimensões da referência: 1487 × 1058 pixels
- Área de visualização no computador: 1440 × 900; implementação: 1425 × 1239 pixels
- Área de visualização no celular: 390 × 844; implementação: 375 × 2007 pixels
- Normalização de densidade: escala de dispositivo igual a 1; referência e implementação para computador reunidas na comparação
- Estado: rota da visão geral, Estação Arara Azul e dados demonstrativos semelhantes aos de produção

## Escopo e relação com a referência

Este checkpoint aplica o acabamento final a todo o front-end. O aviso de
monitoramento demonstrativo da referência aprovada passou a integrar o layout
compartilhado. A rota 404 e a navegação por teclado entre abas completam estados
importantes de navegação sem alterar a linguagem visual estabelecida.

## Comparação da visualização completa

- A visão geral mantém a hierarquia aprovada: cabeçalho institucional, seletor
  de estação, resumo operacional, última leitura, avisos e histórico.
- O aviso no rodapé segue a faixa compacta de informação da referência, mas usa
  uma superfície sólida e uma borda à esquerda coerentes com o sistema de design.
- A composição para computador permanece intencionalmente aberta, com divisores
  no lugar de cartões aninhados.
- A página 404 utiliza a mesma tipografia, o mesmo espaçamento e o mesmo tratamento
  de cores e botões das rotas funcionais.

## Evidências de responsividade

- A versão para computador foi verificada em 1440 × 900.
- A versão para celular foi verificada em 390 × 844, com `scrollWidth` igual a
  `clientWidth` (390 pixels), o que comprova a ausência de rolagem horizontal.
- O aviso de segurança ocupa um bloco compacto e legível no celular.
- A navegação do cabeçalho mantém o comportamento acessível do menu existente.

## Evidências de acessibilidade e navegação

- Uma URL desconhecida exibe o título semântico “Página não encontrada”, um texto
  explicativo e um link de retorno à visão geral.
- O rodapé compartilhado informa que o produto é demonstrativo e direciona
  situações de emergência aos canais oficiais do município.
- As abas de gestão respondem às teclas de seta para a esquerda e para a direita,
  além de `Home` e `End`. Ao pressionar a seta para a direita em “Estações”, a aba
  “Leituras” foi selecionada e recebeu foco.
- O link de salto, os estilos de foco visíveis, os títulos semânticos e o suporte
  à redução de movimento permanecem presentes.
- Uma nova aba do navegador não apresentou erros no console.

## Evidências de documentação e manutenção

- O README original do Vite foi substituído pela documentação específica do
  projeto em português: escopo, funcionalidades, tecnologias, API, configuração,
  ambiente, scripts, estrutura, direção visual, fluxo Git e requisitos de deploy.
- Os componentes obsoletos da página provisória foram removidos.
- `npm run lint`, `npm run build` e `git diff --check` foram executados com sucesso.

## Comparação dos textos visíveis sem rolagem

O texto da visão geral permanece inalterado. O novo aviso de segurança aparece
intencionalmente no final de todas as rotas e evita qualquer alegação de caráter
oficial.

## Constatações

Não restam divergências P0, P1 ou P2 que exijam ação dentro do escopo deste
checkpoint. Uma marca gráfica personalizada permanece como acabamento P3
opcional e só deve ser introduzida após aprovação visual própria.

## Acabamentos posteriores

- Escolher a plataforma de hospedagem e configurar as regras de reescrita da SPA
  e as variáveis de ambiente.
- Executar os testes finais de CORS e de recarregamento de rotas na origem publicada.
- Decidir se será criada uma marca gráfica personalizada.

Resultado final: aprovado.
