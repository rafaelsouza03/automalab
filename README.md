AutomaLab


Ambiente interativo para construção, simulação e compreensão matemática de autômatos finitos.

O AutomaLab reúne, em uma única aplicação web, a construção visual de autômatos, a tabela de transições, a definição formal M = (Q, Σ, δ, q0, F), a validação estrutural e a simulação passo a passo de cadeias. O tipo do autômato (AFD ou AFND) é inferido automaticamente pela estrutura construída — não é preciso escolher antes.

👉 Acessar a aplicação em produção

Sumário
Funcionalidades
Fundamentação matemática
Tecnologias
Estrutura do repositório
Como executar localmente
Testes e qualidade
Publicação
Contribuindo
Roadmap
Documentação
Equipe
Licença
Funcionalidades
Construtor visual: criar/remover estados (q0 … q100), definir o inicial (→), marcar finais (◎), editar o alfabeto (Σ) e criar transições por formulário ou arrastando no diagrama.
Diagrama sincronizado: seta inicial, círculo duplo para aceitação, auto-laços, rótulos, layout automático e conexões por arraste (Cytoscape).
Tabela de transições: matriz estado × símbolo com edição bidirecional e legenda → / *.
Validação em tempo real: determinismo, ε indevido em AFD, transições faltantes e estados isolados, com sugestões de correção (inclusive criação de estado de erro).
Definição formal dinâmica: Q, Σ, q0, F e linhas de δ derivadas do modelo.
Simulação: veredito ACEITA / REJEITA, explicação textual, símbolo lido, conjunto de estados ativos e nota a cada passo — para AFD e AFND.
AFND completo: múltiplos destinos, transições ε, ε-fecho e critério S ∩ F ≠ ∅.
Persistência e portabilidade: salvamento automático no localStorage, biblioteca de exemplos e importação/exportação em JSON.
Acessibilidade: navegação por teclado, link "pular para o conteúdo", regiões aria-live, contraste, temas claro/escuro e alvos de toque amplos.
Fundamentação matemática
O sistema foi pensado para tornar explícita a relação entre Estruturas Matemáticas e computação:

Conceito	Onde aparece
Teoria dos conjuntos (Q, Σ, F, ∈, ⊆)	Painel de definição formal
Produto cartesiano (Q × Σ)	Domínio da função de transição e tabela
Função determinística (δ: Q × Σ → Q)	AFD
Conjunto potência (℘(Q)) e união/interseção	AFND, ε-fecho e estados alcançáveis
Sequências e cadeias (w, `	w
Exemplo clássico implementado nos exemplos: reconhecedor de cadeias terminadas em 1, com Q = {q0, q1}, Σ = {0, 1}, q0 ∈ Q e F = {q1}.

Tecnologias
Camada	Ferramentas
Interface	React 19, TypeScript 7, Vite 8, Tailwind CSS 4, lucide-react
Editor visual	Cytoscape 3 + cytoscape-dagre + cytoscape-edgehandles
Estado	Zustand 5 (store única, undo/redo, persistência)
Motor	Módulos TypeScript puros em src/engine/
Testes	Vitest 5, Testing Library, jsdom
Qualidade	oxlint, Prettier
Hospedagem	Firebase Hosting (projeto automalab-127e3) e Firebase Analytics
Não há backend próprio, banco remoto ou autenticação: toda a lógica roda no navegador.

Estrutura do repositório
.
├── src/
│   ├── engine/          # tipos, classificação, validação, simulação, ε-fecho, formatação
│   ├── store/           # store Zustand, persistência, announcer, tema
│   ├── components/      # editor, canvas, tabela, validação, definição formal, teste de palavra
│   ├── content/         # exemplos, textos didáticos, diálogos, importação/exportação
│   ├── tests/           # testes de engine, store e componentes
│   └── App.tsx          # composição das seções
├── firebase.json        # configuração do Hosting (public: ".")
├── .firebaserc          # projeto automalab-127e3
└── MANUAL_METODOLOGICO_REVISADO.md
Cada frente de trabalho tem um dono único sobre seus arquivos (ver Contribuindo).

Como executar localmente
Requisitos: Node.js 20.19+ ou 22.12+ e npm.

# instalar dependências
npm install

# servir em modo de desenvolvimento
npm run dev

# executar testes
npm test

# checar lint e formatação
npm run lint
npm run format:check

# gerar build de produção
npm run build

# pré-visualizar o build
npm run preview
Nota de build: o vite.config.ts usa base: '/automalab/' (cenário em subpasta). Para publicar na raiz do domínio do Firebase Hosting, gere o build com node ./node_modules/vite/bin/vite.js build --base=/.

Testes e qualidade
60 testes automatizados ativos cobrindo engine, store e componentes.
4 casos A1 registrados como it.todo, aguardando os enunciados oficiais do docente — nenhum dado foi inventado.
Pendência conhecida: npm run build (que roda tsc -b antes do Vite) ainda falha em três arquivos de teste por atribuição de null onde o tipo esperado é Automaton | undefined. O build de publicação é feito diretamente com o Vite enquanto essa tipagem não é corrigida.
Publicação
O site é servido estaticamente pelo Firebase Hosting:

firebase login
firebase deploy --only hosting --project automalab-127e3
A configuração de Hosting (public: ".") já aponta para o diretório com index.html e assets/. Nunca versionar node_modules/, .firebase/, chaves de serviço ou o bundle compilado.

Contribuindo
O trabalho foi dividido em cinco frentes para garantir autoria verificável no GitHub:

Pessoa	Frente	Domínio de arquivos
P1	Engine e conteúdo matemático	src/engine/**, src/content/**
P2	Estado e persistência	src/store/**
P3	Visualização e resultado	AutomatonCanvas, ResultPanel, TransitionTable, FormalDefinition, ValidationPanel
P4	Edição e biblioteca	AlphabetEditor, StateManager, TransitionEditor, AutomatonLibrary
P5	Casca, simulação e infraestrutura	App.tsx, Header, WordTester, configurações, Firebase, CI
Fluxo adotado:

Configure sua identidade: git config user.name "Seu Nome" e git config user.email "seu@email.com".
Trabalhe em uma branch própria: p1-engine, p2-store, p3-visualizacao, p4-edicao ou p5-shell-infra.
Faça commits atômicos e prefixados, ex.: [P3] Adiciona fita de leitura ao resultado.
Abra um Pull Request para main descrevendo a mudança e a evidência (teste ou captura).
O merge é feito como merge commit (sem squash), preservando autor e histórico. CODEOWNERS e a proteção da branch main garantem a revisão por frente.
Roadmap
Entregue: construtor AFD/AFND, diagrama, tabela, validação, definição formal, simulação, persistência, exemplos, deploy.
Em ajuste: fita de leitura com controles passo a passo, exibição explícita de Q × Σ e ℘(Q), painel de cardinalidades.
Futuro: determinização AFND → AFD, minimização, conversão com expressões regulares, análise léxica, exercícios com correção automática e exportação do diagrama em imagem.
Documentação
O Manual Metodológico completo (canvas, fundamentação, requisitos, arquitetura, calendário, riscos e apresentação) está em MANUAL_METODOLOGICO_REVISADO.md, na raiz do repositório.

Equipe
Integrante	RA	Frente
[Nome do integrante 1]	[RA]	P1 — Engine e conteúdo
[Nome do integrante 2]	[RA]	P2 — Estado e persistência
[Nome do integrante 3]	[RA]	P3 — Visualização
[Nome do integrante 4]	[RA]	P4 — Edição e biblioteca
[Nome do integrante 5]	[RA]	P5 — Casca, simulação e infra
Docente orientador(a): [Inserir nome] · Unidade Curricular: [Inserir UC]

Licença
A definir pela equipe antes da publicação final (sugestão: MIT).
