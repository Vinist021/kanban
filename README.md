# Kanban (React + Vite)

**Visão Geral**
- **Descrição:** Projeto de um quadro Kanban construído com `React` e `Vite`, contendo colunas, cartões de tarefa e modais para criação/edição/visualização de tarefas.
- **Objetivo:** Fornecer uma base simples e extensível para organizar tarefas em colunas (por exemplo: To Do, Doing, Done) com componentes reutilizáveis.

**Funcionalidades Principais**
- **Quadro por colunas:** Cada coluna representa um estado/tipo de lista e organiza os cartões de tarefa.
- **Cartões de tarefa:** Componentes que exibem informações básicas da tarefa (título, data, etiquetas).
- **Modais para tarefa:** `TaskModal` para criar/editar tarefas e `TaskViewModal` para visualizar detalhes.
- **Pesquisa:** Input de busca (`SearchInput`) para filtrar tarefas por texto.
- **Formulários reutilizáveis:** Inputs e selects dentro de `src/components/shared/modal` para consistência nos modais.

**Estrutura do Projeto (resumo)**
- **Arquivos principais:**
  - `main.jsx`: Ponto de entrada da aplicação.
  - `App.jsx`: Componente raiz que monta o layout geral.
  - `index.css`: Estilos globais.
- **Componentes:**
  - `Page.jsx`: Layout/contêiner da página principal.
  - `BoardColumn.jsx`: Lógica e renderização das colunas do quadro.
  - `TaskCard.jsx`: Apresenta cada tarefa no quadro.
  - `TaskModal.jsx`: Formulário para criar/editar tarefas.
  - `TaskViewModal.jsx`: Exibe detalhes completos da tarefa.
  - `SearchInput.jsx`: Componente de pesquisa.
- **Shared / UI:**
  - `Modal.jsx`: Componente base de modal.
  - `Input.jsx`, `DateInput.jsx`, `SelectBox.jsx`: Controles de formulário reutilizáveis.

**Pré-requisitos**
- **Node.js:** Recomendado Node 16+.
- **npm** (ou `yarn`/`pnpm`) para instalar dependências.

**Instalação e Execução**
- **Instalar dependências:**

  ```bash
  npm install
  ```

- **Executar em modo de desenvolvimento:**

  ```bash
  npm run dev
  ```

- **Build para produção:**

  ```bash
  npm run build
  npm run preview
  ```

**Como usar a aplicação (fluxo básico)**
- **Visualizar o quadro:** Abra `http://localhost:5173` (porta padrão do Vite) após rodar `npm run dev`.
- **Criar tarefa:** Abra o modal de criação (botão/ação no UI) — preencha título, descrição, data e selecione coluna/etiquetas.
- **Editar tarefa:** Clique no cartão de tarefa para abrir o `TaskModal` em modo edição.
- **Visualizar detalhes:** Use o `TaskViewModal` para ver informações completas da tarefa.
- **Pesquisar tarefas:** Use o `SearchInput` para filtrar tarefas por texto no título/descrição.

**Componentes Importantes (detalhes)**
- **`BoardColumn`:** Renderiza uma coluna com um cabeçalho e uma lista de `TaskCard`. Deve receber props como `title`, `tasks` e callbacks para ações (adicionar, mover, editar).
- **`TaskCard`:** Mostra resumo da tarefa; dispara abertura do modal de visualização/edição ao clicar.
- **`TaskModal` / `TaskViewModal`:** Gerenciam estado local do formulário e disparam callbacks para salvar/atualizar/excluir tarefas.
- **`SearchInput`:** Emite eventos de busca (por exemplo via `onChange` ou `onSubmit`) para filtrar a lista de tarefas.

**Personalização e Extensão**
- **Adicionar persistência:** Atualmente os dados podem estar em estado local; adicione `localStorage`, IndexedDB ou uma API/remota (backend) para persistência.
- **Arrastar e soltar:** Para suporte DnD entre colunas, integre bibliotecas como `react-beautiful-dnd` ou `@dnd-kit`.
- **Autenticação:** Adicione autenticação se quiser suporte multiusuário com armazenamento em servidor.

**Scripts disponíveis** (definidos em `package.json`)
- **`npm run dev`**: Inicializa o servidor de desenvolvimento (Vite).
- **`npm run build`**: Gera a build de produção.
- **`npm run preview`**: Pré-visualiza a build gerada.

**Contribuição**
- **Como contribuir:**
  - Fazer um fork do repositório.
  - Criar uma branch com um nome descritivo (`feature/...` ou `fix/...`).
  - Abrir um Pull Request com descrição das mudanças.
- **Boas práticas:** Mantenha mudanças pequenas e com commits claros; atualize a documentação se alterar comportamento público.

**Dicas de desenvolvimento**
- **Formato:** Use `Prettier`/`ESLint` (configurações já presentes) para manter estilo consistente.
- **Testes:** Adicione testes unitários com `vitest` ou `jest` se desejar garantir estabilidade de componentes.

**Contato**
- Para dúvidas ou contribuições, abra uma issue no repositório.