# Estação Ribeirinha — Front-end

Interface web responsiva para acompanhamento de estações de monitoramento em
municípios e comunidades ribeirinhas. O projeto apresenta níveis da água,
tendências, bateria dos equipamentos e avisos comunitários, além de oferecer a
gestão completa dos dados disponibilizados pela API.

Este repositório contém somente o front-end. O backend está disponível em
[estacao-ribeirinha-api](https://github.com/Augusto-Valerio/estacao-ribeirinha-api).

**Aplicação publicada:**
[estacao-ribeirinha-front.onrender.com](https://estacao-ribeirinha-front.onrender.com)

## Funcionalidades

- visão geral da estação selecionada, última leitura e situação operacional;
- gráfico e tabela de histórico do nível da água;
- consulta de avisos ativos e encerrados, com filtros por nível e status;
- CRUD de estações, leituras e avisos integrado à API publicada;
- estados de carregamento, erro, lista vazia e confirmação de exclusão;
- navegação responsiva para computador e celular;
- página 404 e recursos básicos de acessibilidade por teclado.

## Tecnologias

- React 19;
- TypeScript 7;
- Vite 8;
- React Router;
- Recharts;
- Phosphor Icons;
- CSS Modules e tokens CSS;
- Oxlint.

## API

A aplicação consome por padrão:

```text
https://estacao-ribeirinha-api.onrender.com
```

Principais recursos utilizados:

| Recurso | Operações |
| --- | --- |
| `/estacoes` | listar, cadastrar, atualizar e excluir |
| `/leituras/estacao/{id}` | consultar histórico por estação |
| `/leituras` | cadastrar, atualizar e excluir |
| `/avisos/estacao/{id}` | consultar avisos por estação |
| `/avisos` | cadastrar, atualizar e excluir |

O serviço gratuito do Render pode levar alguns segundos para responder ao
primeiro acesso depois de um período sem uso.

## Executar localmente

Pré-requisitos: Git, npm e uma versão do Node.js compatível com o Vite 8.

```powershell
git clone https://github.com/Augusto-Valerio/estacao-ribeirinha-front.git
cd estacao-ribeirinha-front
Copy-Item .env.example .env.local
npm install
npm run dev
```

Depois, acesse o endereço exibido pelo Vite, normalmente
`http://localhost:5173`.

### Variável de ambiente

```env
VITE_API_BASE_URL=https://estacao-ribeirinha-api.onrender.com
```

Não inclua a barra final na URL. Para usar outra instância da API, altere apenas
o arquivo `.env.local`.

## Scripts

```powershell
npm run dev      # servidor local com atualização automática
npm run lint     # análise estática
npm run build    # verificação TypeScript e build de produção
npm run preview  # prévia local do build
```

## Estrutura principal

```text
src/
├── app/          # roteamento
├── components/   # layout e componentes compartilhados
├── features/     # estações, leituras, avisos e gestão
├── pages/        # páginas da aplicação
├── services/     # cliente HTTP e integração com a API
├── styles/       # tokens e estilos globais
└── types/        # contratos TypeScript
```

## Direção visual

A interface segue uma adaptação do Padrão Digital de Governo para um painel de
situação: hierarquia tipográfica clara, azul institucional, cores semânticas,
bordas discretas e foco na leitura dos dados. Gradientes decorativos,
glassmorphism, animações sem função e excesso de cards foram evitados.

O produto permanece genérico para atender diferentes municípios e comunidades,
sem se apresentar como canal oficial de emergência.

## Fluxo Git

- `main`: versão estável;
- `develop`: integração dos checkpoints concluídos;
- `feature/*`: uma entrega funcional e revisável por branch.

Os commits seguem Conventional Commits, por exemplo:

```text
feat: implementar crud de avisos
fix: ajustar leitura do status em telas pequenas
docs: documentar execucao local do frontend
chore: integrar crud de avisos na develop
```

## Deploy

O front-end é publicado como **Render Static Site**. A configuração está
versionada em `render.yaml` e usa:

- branch de produção: `main`;
- build: `npm ci && npm run build`;
- diretório publicado: `dist`;
- variável de build: `VITE_API_BASE_URL`;
- rewrite `/*` para `/index.html`, necessário para as rotas do React Router;
- cache de longa duração somente para os arquivos versionados de `assets`.

O Blueprint acompanha o `render.yaml` pela `develop`, enquanto o site estático
publica os arquivos da branch estável `main`.

## Autor

[Augusto Valério](https://github.com/Augusto-Valerio)
