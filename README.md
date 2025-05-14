# Desafio Frontend - Interface Bancária

Este projeto é uma aplicação frontend desenvolvida como parte de um desafio, simulando funcionalidades básicas de uma interface bancária, como visualização de saldo e realização de transferências.

## Arquitetura

A arquitetura do projeto foi pensada para promover manutenibilidade, escalabilidade e clareza, seguindo práticas comuns no desenvolvimento com React.

### Descrição

- **Arquitetura Baseada em Componentes (Component-Based Architecture - CBA):**
  O projeto é fundamentalmente estruturado em componentes React. A interface do usuário é decomposta em peças menores, reutilizáveis e independentes, facilitando o desenvolvimento e a manutenção.

- **Separação de Preocupações (Separation of Concerns - SoC):**
  A estrutura de pastas reflete uma clara separação de responsabilidades, tornando o código mais organizado e fácil de localizar:
  - `src/pages/`: Contém os componentes que representam as diferentes telas ou rotas principais da aplicação (ex: `Balance.tsx`, `Transfer.tsx`).
  - `src/components/`: Agrupa componentes de UI reutilizáveis que são utilizados em diversas partes da aplicação (ex: `BalanceComponent.tsx`, `PermanentDrawerLeft.tsx`).
  - `src/contexts/`: Responsável pelo gerenciamento de estado global ou compartilhado entre componentes, utilizando a Context API do React (ex: `AccountContext.tsx`).
  - `src/services/`: Encapsula a lógica de comunicação com APIs externas, como o `apiClient.ts` para interagir com o backend.
  - `src/utils/`: Armazena funções utilitárias genéricas que podem ser usadas em todo o projeto (ex: `formatters.ts`).
  - `src/assets/`: Local para arquivos estáticos como imagens, ícones SVG, etc.
  - `src/App.tsx`: Componente principal que configura as rotas da aplicação e provedores globais.
  - `src/main.tsx`: Ponto de entrada da aplicação React, onde a aplicação é montada no DOM.

### Motivação pela Escolha da Arquitetura

- **Reutilização e Modularidade:** A componentização inerente ao React, organizada conforme descrito, permite um alto grau de reutilização de código, tornando o desenvolvimento mais eficiente e a aplicação mais modular.
- **Manutenibilidade:** Com responsabilidades bem definidas para cada diretório e componente, torna-se mais simples entender, depurar e modificar o código sem introduzir efeitos colaterais inesperados.
- **Escalabilidade:** A estrutura adotada é projetada para escalar. À medida que novas funcionalidades são adicionadas, elas podem ser integradas de forma organizada dentro da estrutura existente.
- **Padrões da Comunidade React:** A organização segue convenções amplamente utilizadas e recomendadas pela comunidade React, o que facilita a colaboração e a integração de novos desenvolvedores ao projeto.
- **Fluxo de Dados Previsível:** O uso da Context API para gerenciamento de estado global ajuda a manter um fluxo de dados unidirecional e mais previsível, simplificando o rastreamento de como os dados são alterados e propagados pela aplicação.

## Tecnologias Utilizadas

- React (v18+)
- TypeScript
- Vite (Bundler e Servidor de Desenvolvimento)
- Material-UI (Biblioteca de Componentes de UI)
- React Router DOM (Gerenciamento de Rotas)
- Axios (Cliente HTTP para chamadas API)
- Yup (Validação de Schemas e Formulários)
- ESLint (Linting de Código)

## Pré-requisitos

- Node.js (versão 18.x ou superior recomendada)
- npm (v9.x ou superior) ou Yarn (v1.22.x ou superior)

## Instruções para Rodar o Projeto

1.  **Instale as dependências:**
    Utilizando npm:

    ```bash
    npm install
    ```

    Ou utilizando Yarn:

    ```bash
    yarn install
    ```

2.  **Configure as variáveis de ambiente:**

    - Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env` na raiz do projeto:
      ```bash
      cp .env.example .env
      ```
    - Abra o arquivo `.env` recém-criado e edite a variável `VITE_API_BASE_URL` para apontar para a URL base da sua API de backend.
      Exemplo:
      ```
      VITE_API_BASE_URL=https://interview.mattlabz.tech
      ```

3.  **Execute o projeto em modo de desenvolvimento:**
    Utilizando npm:

    ```bash
    npm run dev
    ```

    Ou utilizando Yarn:

    ```bash
    yarn dev
    ```

    A aplicação estará disponível, por padrão, em `http://localhost:5173` (o Vite informará a porta exata no console).

4.  **(Opcional) Para gerar uma build de produção:**
    Utilizando npm:
    ```bash
    npm run build
    ```
    Ou utilizando Yarn:
    ```bash
    yarn build
    ```
    Os arquivos otimizados para produção serão gerados na pasta `dist/`.

## Estrutura de Pastas Principal

```
desafio/
├── public/               # Arquivos estáticos públicos
├── src/                  # Código fonte da aplicação
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env.example          # Exemplo de variáveis de ambiente
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── index.html            # HTML principal da aplicação
├── package.json          # Metadados do projeto e dependências
├── tsconfig.json         # Configuração do TypeScript
└── README.md             # Este arquivo
```
