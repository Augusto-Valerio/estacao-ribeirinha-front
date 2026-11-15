<h1 align="center">Estação Ribeirinha Frontend</h1>

<p align="center">
  Interface web para consulta e gerenciamento de estações de monitoramento voltadas principalmente a comunidades ribeirinhas da Amazônia.
</p>

<p align="center">
  <a href="#ficha-da-citizentech">Ficha da CitizenTech</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#integrantes">Integrantes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#interface">Interface</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#integração-com-a-api">Integração com a API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação">Documentação</a>
</p>

<p align="center">
  <a href="https://estacao-ribeirinha-front.onrender.com/">Frontend publicado</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://estacao-ribeirinha-api.onrender.com/">API publicada</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://github.com/Augusto-Valerio/estacao-ribeirinha-api">Repositório da API</a>
</p>

---

## Ficha da CitizenTech

| Campo | Definição |
|---|---|
| **Nome da CitizenTech** | Estação Ribeirinha |
| **Cidade e bairro / território** | Comunidades ribeirinhas da Amazônia, com estrutura preparada para cadastrar estações de diferentes municípios e estados brasileiros. |
| **Cidadãos beneficiados** | Moradores de comunidades ribeirinhas amazônicas e agentes comunitários responsáveis pelo acompanhamento das condições locais. |
| **Problema** | Dificuldade de concentrar e acompanhar informações locais sobre o nível da água, a energia disponível na bateria da estação e os avisos comunitários. |
| **Como funciona** | Cada estação registra o nível da água e o percentual de carga da bateria que mantém o ponto de monitoramento em funcionamento. A API armazena os dados no Oracle, calcula a tendência do nível e disponibiliza as informações para o frontend. |
| **O que cada parte faz** | O backend Java aplica as regras e disponibiliza a API; o Oracle armazena os dados; o frontend permite consultar e gerenciar estações, leituras e avisos. |
| **Indicadores de impacto** | Quantidade de estações acompanhadas, leituras registradas, avisos comunitários cadastrados e continuidade do histórico de monitoramento. |
| **ODS relacionados** | ODS 7 - Energia Acessível e Limpa; ODS 10 - Redução das Desigualdades; ODS 11 - Cidades e Comunidades Sustentáveis; ODS 13 - Ação Contra a Mudança Global do Clima. |
| **Repositório** | [github.com/Augusto-Valerio/estacao-ribeirinha-front](https://github.com/Augusto-Valerio/estacao-ribeirinha-front) |

> Os dados utilizados são demonstrativos. As tendências e os avisos apresentados pela aplicação não substituem comunicados da Defesa Civil nem representam previsões oficiais de enchentes.

---

## Projeto

A **Estação Ribeirinha** é uma solução CitizenTech concebida principalmente para apoiar comunidades ribeirinhas da Amazônia no acompanhamento de informações locais relacionadas ao nível da água e ao funcionamento dos pontos de monitoramento.

O frontend apresenta as estações cadastradas, a última medição do nível da água, a tendência calculada pela API e o percentual de carga da bateria responsável por fornecer energia aos sensores e demais componentes do ponto de monitoramento.

A aplicação também disponibiliza o histórico das leituras, gráficos de evolução do nível da água e avisos vinculados a cada estação. Uma área de gestão permite cadastrar, editar e excluir estações, leituras e avisos.

Embora tenha como foco principal o contexto amazônico, a estrutura da aplicação permite trabalhar com estações de diferentes municípios e estados brasileiros, sem limitar a solução a uma única cidade ou comunidade.

Este repositório contém somente o frontend do projeto, desenvolvido com **React, TypeScript e Vite**. Os dados são fornecidos pela API REST desenvolvida em Java com Spring Boot.

- [Repositório da API](https://github.com/Augusto-Valerio/estacao-ribeirinha-api)
- [API publicada](https://estacao-ribeirinha-api.onrender.com/)

Os dados apresentados são demonstrativos e não representam medições ou alertas oficiais.

---

## Integrantes

| Nome | RM |
|---|---|
| Augusto Valerio | 562185 |
| Pedro Marchese | 563339 |
| Mariana Oliveira | 564241 |
| Jonas Esteves | 564143 |
| Vitor Tigre | 561746 |

---

## Funcionalidades

<details>
<summary>Ver funcionalidades implementadas</summary>

- Seleção de estações de diferentes municípios e comunidades.
- Visualização da situação operacional da estação.
- Consulta da última leitura registrada.
- Exibição do nível atual da água.
- Exibição do percentual de carga da bateria da estação.
- Apresentação da tendência calculada pela API.
- Gráfico com as leituras registradas nas últimas 24 horas.
- Gráfico completo do histórico do nível da água.
- Tabela com todas as leituras vinculadas à estação.
- Consulta de avisos ativos e encerrados.
- Filtros de avisos por nível e situação.
- Cadastro, edição e exclusão de estações.
- Cadastro, edição e exclusão de leituras.
- Cadastro, edição e exclusão de avisos.
- Confirmação antes das operações de exclusão.
- Validação dos campos dos formulários.
- Tratamento de carregamento, erros e ausência de dados.
- Navegação responsiva para computadores e dispositivos móveis.
- Página para endereços não encontrados.
- Integração com a API publicada no Render.

</details>

---

## Interface

A aplicação está organizada em quatro áreas principais:

| Página | Finalidade |
|---|---|
| **Visão geral** | Apresenta a situação atual da estação, última leitura, bateria, tendência, gráfico das últimas 24 horas e avisos ativos. |
| **Histórico** | Apresenta o gráfico completo e a tabela com as leituras da estação selecionada. |
| **Avisos** | Exibe avisos ativos e encerrados, com filtros por nível e situação. |
| **Gestão** | Permite cadastrar, editar e excluir estações, leituras e avisos. |

Na **Visão geral**, o gráfico considera apenas as leituras das últimas 24 horas. Caso não existam medições nesse período, a aplicação informa que uma nova leitura é necessária.

A página **Histórico** mantém a consulta completa das medições registradas, mesmo quando elas não fazem mais parte do período exibido na Visão geral.

A página **Avisos** apresenta o arquivo de comunicados da estação selecionada. A Visão geral exibe somente os avisos ativos, enquanto a página de Avisos permite consultar registros ativos e encerrados.

---

## Arquitetura

O frontend realiza requisições HTTP para a API REST, que aplica as regras de negócio e acessa o Oracle Database.

```text
Usuário
   ↓
Frontend React
   ↓
API REST Spring Boot
   ↓
Oracle Database
```

| Parte | Responsabilidade |
|---|---|
| `pages` | Organiza as páginas principais da aplicação. |
| `features` | Reúne as funcionalidades de estações, leituras, avisos e gestão. |
| `components` | Contém elementos compartilhados de layout e navegação. |
| `services` | Realiza a comunicação HTTP com a API. |
| `types` | Define os contratos TypeScript utilizados pela aplicação. |
| `styles` | Centraliza estilos globais e tokens visuais. |

O frontend não acessa o banco de dados diretamente. Toda consulta ou alteração é realizada por meio da API Java.

---

## Integração com a API

A aplicação utiliza por padrão a API publicada em:

```text
https://estacao-ribeirinha-api.onrender.com
```

### Estações

| Método | Endpoint | Utilização no frontend |
|---|---|---|
| `GET` | `/estacoes` | Listar as estações disponíveis. |
| `POST` | `/estacoes` | Cadastrar uma estação. |
| `PUT` | `/estacoes/{idEstacao}` | Atualizar uma estação. |
| `DELETE` | `/estacoes/{idEstacao}` | Excluir uma estação sem vínculos. |

### Leituras

| Método | Endpoint | Utilização no frontend |
|---|---|---|
| `GET` | `/leituras/estacao/{idEstacao}` | Consultar o histórico da estação. |
| `GET` | `/leituras/estacao/{idEstacao}/ultima` | Consultar a última leitura. |
| `POST` | `/leituras` | Cadastrar uma leitura. |
| `PUT` | `/leituras/{idLeitura}` | Atualizar uma leitura. |
| `DELETE` | `/leituras/{idLeitura}` | Excluir uma leitura. |

### Avisos

| Método | Endpoint | Utilização no frontend |
|---|---|---|
| `GET` | `/avisos/estacao/{idEstacao}` | Consultar os avisos da estação. |
| `POST` | `/avisos` | Cadastrar um aviso. |
| `PUT` | `/avisos/{idAviso}` | Atualizar um aviso. |
| `DELETE` | `/avisos/{idAviso}` | Excluir um aviso. |

O serviço gratuito do Render pode levar alguns segundos para responder ao primeiro acesso após um período sem utilização.

---

## Validações e Comportamentos

<details>
<summary>Ver validações da interface</summary>

### Estações

- Nome, comunidade, município, UF e situação operacional são obrigatórios.
- A UF deve possuir exatamente duas letras.
- As situações disponíveis são `ATIVA`, `MANUTENCAO` e `INATIVA`.
- A exclusão exige confirmação.
- Estações com leituras ou avisos vinculados não podem ser excluídas antes da remoção desses registros.

### Leituras

- A leitura deve estar vinculada a uma estação.
- O nível da água deve ser maior ou igual a zero.
- A bateria deve possuir valor entre 0 e 100.
- A data e a hora não podem estar no futuro.
- A tendência de uma nova leitura é calculada automaticamente pela API.
- A exclusão exige confirmação.

### Avisos

- O aviso deve estar vinculado a uma estação.
- Título e mensagem são obrigatórios.
- Os níveis disponíveis são `INFORMATIVO`, `ATENCAO` e `CRITICO`.
- As situações disponíveis são `ATIVO` e `ENCERRADO`.
- A data e a hora não podem estar no futuro.
- A exclusão exige confirmação.

</details>

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Construção da interface |
| TypeScript 7 | Tipagem e desenvolvimento |
| Vite 8 | Servidor local e build de produção |
| React Router 7 | Navegação entre as páginas |
| Recharts 3 | Gráficos do nível da água |
| Phosphor Icons | Ícones da interface |
| Source Sans 3 | Tipografia utilizada |
| CSS Modules | Isolamento dos estilos dos componentes |
| Oxlint | Análise estática do código |
| Render | Publicação do frontend |

---

## Como Executar

### Pré-requisitos

- Git.
- Node.js 20.19 ou uma versão 22.12 ou superior.
- npm.
- API da Estação Ribeirinha disponível localmente ou publicada.

### Clonar o repositório

```bash
git clone https://github.com/Augusto-Valerio/estacao-ribeirinha-front.git
cd estacao-ribeirinha-front
```

### Instalar as dependências

```bash
npm install
```

### Configurar a API

Crie um arquivo chamado `.env.local` na raiz do projeto:

```env
VITE_API_BASE_URL=https://estacao-ribeirinha-api.onrender.com
```

Não coloque uma barra no final da URL.

O repositório também possui o arquivo `.env.example`, que apresenta o nome da variável necessária. O arquivo `.env.local` não deve ser enviado ao GitHub.

Para utilizar uma instância local da API, informe:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Iniciar a aplicação

```bash
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## Scripts

| Comando | Finalidade |
|---|---|
| `npm run dev` | Iniciar o servidor local de desenvolvimento. |
| `npm run lint` | Executar a análise estática do código. |
| `npm run build` | Verificar o TypeScript e gerar o build de produção. |
| `npm run preview` | Visualizar localmente o build de produção. |

Para conferir o projeto antes da publicação:

```bash
npm run lint
npm run build
```

---

## Testes Manuais

As principais funcionalidades podem ser verificadas diretamente pela interface:

1. Selecionar uma estação na Visão geral.
2. Conferir a última leitura, a bateria e a tendência.
3. Consultar o gráfico das últimas 24 horas.
4. Abrir o Histórico e conferir o gráfico e a tabela completa.
5. Abrir Avisos e testar os filtros de situação e nível.
6. Cadastrar uma estação pela área de Gestão.
7. Cadastrar, editar e excluir uma leitura.
8. Cadastrar, editar e excluir um aviso.
9. Remover os registros vinculados e excluir a estação temporária.
10. Conferir se os dados foram persistidos no Oracle por meio da API.

---

## Deploy

O frontend está publicado no Render como um **Static Site**.

A configuração do serviço está versionada no arquivo `render.yaml`:

| Configuração | Valor |
|---|---|
| Branch de produção | `main` |
| Comando de build | `npm ci && npm run build` |
| Diretório publicado | `dist` |
| Variável da API | `VITE_API_BASE_URL` |
| Redirecionamento | `/*` para `/index.html` |

O redirecionamento permite que as rotas do React Router sejam abertas diretamente pelo navegador.

Os arquivos gerados dentro de `assets` utilizam cache de longa duração, enquanto os cabeçalhos de segurança básicos são configurados pelo próprio `render.yaml`.

- [Acessar o frontend publicado](https://estacao-ribeirinha-front.onrender.com/)
- [Acessar a API publicada](https://estacao-ribeirinha-api.onrender.com/)
- [Acessar o repositório da API](https://github.com/Augusto-Valerio/estacao-ribeirinha-api)

---

## Documentação

A documentação completa contém a especificação da solução, arquitetura, endpoints, telas do frontend, Diagrama Entidade-Relacionamento, diagramas de classes, evidências dos testes e instruções de execução.

[Baixar a documentação da Estação Ribeirinha](https://github.com/Augusto-Valerio/estacao-ribeirinha-api/blob/main/Documenta%C3%A7%C3%A3o_Esta%C3%A7%C3%A3o_Ribeirinha.pdf)

---

<p align="center">
  Desenvolvido para a Global Solution 2026 - CitizenTech | FIAP
</p>
