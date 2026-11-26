AutomaLab


Ambiente interativo para construção, simulação e compreensão matemática de autômatos finitos.

O AutomaLab permite montar um autômato diretamente no navegador, ver o diagrama e a tabela de transições atualizarem-se ao mesmo tempo, receber diagnóstico de inconsistências e testar palavras com explicação passo a passo. O tipo do modelo — AFD ou AFND — é descoberto automaticamente a partir da estrutura montada; não existe botão para "escolher o tipo".

Sumário
O que o AutomaLab faz
Como funciona
A estrutura de dados do autômato
Como ele identifica AFD e AFND
Cálculos e algoritmos usados
Funções mais importantes
Tecnologias
Como executar
Publicação
O que o AutomaLab faz
A aplicação trabalha com a quíntupla clássica da Teoria da Computação:

M = (Q, Σ, δ, q0, F)

Elemento	O que é	Como é editado no AutomaLab
Q	conjunto finito de estados	lista de estados q0 … q100, com criação e remoção
Σ	alfabeto, conjunto de símbolos de entrada	editor de símbolos; remover um símbolo remove as transições que o usavam
δ	função/relação de transição	formulário de origem → símbolo → destino(s) ou arraste no diagrama
q0	estado inicial	marcação de um estado como inicial (seta de entrada no grafo)
F	conjunto de estados finais	marcação de um ou mais estados com círculo duplo
A partir desses dados, o sistema gera automaticamente:

o diagrama (nós, setas, auto-laços, rótulos, layout);
a tabela de transições (linhas = estados, colunas = símbolos, legenda → inicial e * final);
a definição formal em notação matemática (Q, Σ, q0, F e linhas de δ);
o diagnóstico de problemas estruturais, com sugestão de correção;
a simulação de uma cadeia, com veredito aceita/rejeita e narração de cada passo.
Também há persistência automática no navegador, biblioteca de exemplos e importação/exportação de projetos em JSON.

Como funciona
Tudo parte de uma única fonte de verdade: o objeto Automaton, mantido na store Zustand (src/store/automatonStore.ts). Nenhum componente guarda sua própria cópia do modelo.

Edição (alfabeto / estados / transições / diagrama / tabela)
                     ↓
        store: Automaton (Q, Σ, δ, q0, F)
                     ↓
   ┌─────────────────┼──────────────────┬──────────────────┐
classify         validate           simulate          format
(tipo)        (diagnóstico)       (passos/veredito)  (notação)
                     ↓
 diagrama · tabela · definição formal · painel de resultado
O fluxo é unidirecional: qualquer alteração em um painel atualiza a store, e todos os painéis inscritos recalculam suas visões. O motor (src/engine/) é TypeScript puro — não depende de React nem do DOM —, o que permite testá-lo isoladamente.

Na simulação, a store pré-calcula todos os passos com simulateAutomaton() e guarda apenas um índice (index). Por isso avançar, voltar ou pular para um passo específico é apenas trocar o índice — a máquina não precisa ser reexecutada.

A estrutura de dados do autômato
Definida em src/engine/types.ts:

interface Automaton {
  type: AutomatonType          // 'AFD' | 'AFND' (inferido)
  alphabet: string[]           // Σ
  states: Array<{ id: string; x: number; y: number }>
  initial: string | null       // q0
  finals: string[]             // F
  transitions: Array<{ from: string; symbol: string; to: string }>
}
Identificadores de estado são estáveis: q0 a q100 (limite de 101 estados).
ε é reservado para transição vazia e não pode entrar no alfabeto.
Cada transição é um triple (origem, símbolo, destino) — a mesma informação de uma célula da tabela e de uma aresta do grafo.
O limite de nós de rastreamento de um AFND é 500 (MAX_TRACE_NODES).
Como ele identifica AFD e AFND
A classificação está em src/engine/classify.ts, na função classifyAutomaton(a). Ela não pergunta ao usuário: observa as transições.

O algoritmo faz três coisas:

1. Detecta transições ε

hasEpsilon = transitions.some(t => t.symbol === 'ε')
Se existir qualquer transição com symbol === 'ε', o modelo é AFND — afinal, AFD não muda de estado sem ler um símbolo.

2. Agrupa transições por par (estado, símbolo)

Para cada transição com símbolo comum, monta uma chave origem + símbolo e reúne todos os destinos distintos:

chave = `${t.from}\u0000${t.symbol}`
grupos.get(chave).targets.push(t.to)   // sem repetir destinos
Depois seleciona os grupos com mais de um destino:

nondeterministicPairs = grupos.filter(g => g.targets.length > 1)
Se, por exemplo, existem δ(q0, 0) = q0 e δ(q0, 0) = q1, o grupo (q0, 0) tem dois alvos e o modelo é não determinístico.

3. Decide o tipo

type = (hasEpsilon || nondeterministicPairs.length > 0) ? 'AFND' : 'AFD'
Estrutura construída	Resultado
Sem ε e no máximo um destino por par (estado, símbolo)	AFD
Qualquer transição ε	AFND
Dois ou mais destinos para o mesmo par (estado, símbolo)	AFND
A função também devolve reasons (motivos em português), exibidos na interface, e hasEpsilon/nondeterministicPairs para outras camadas. inferType() é um atalho que retorna só o tipo.

Essa decisão afeta diretamente duas outras funções:

validate() só exige completude de Q × Σ quando o modelo é AFD;
simulateAutomaton() escolhe o algoritmo de execução determinístico ou o de conjuntos de estados.
Observação: o campo type existe no objeto, mas é derivado da estrutura — a interface mostra o badge "inferido" ao lado de AFD/AFND.

Cálculos e algoritmos usados
1. Produto cartesiano Q × Σ
O domínio da função de transição é o conjunto de todos os pares (estado, símbolo):

Q × Σ = { (q, a) | q ∈ Q e a ∈ Σ }
|Q × Σ| = |Q| · |Σ|
Exemplo: com Q = {q0, q1} e Σ = {0, 1} → |Q × Σ| = 4, isto é, (q0,0), (q0,1), (q1,0), (q1,1).

O AutomaLab percorre esse produto na validação: para um AFD, cada par deve ter exatamente uma transição. O número de transições faltantes é |Q| · |Σ| − (transições definidas); cada falta gera o aviso "AFD incompleto" com a lista de pares ausentes.

2. Conjunto potência ℘(Q)
Modelo matemático do AFND: um símbolo pode levar a um subconjunto de estados.

δ: Q × Σ → ℘(Q)      (AFND)
δ: Q × Σ → Q         (AFD)
|℘(Q)| = 2^|Q|
Com |Q| = 2, existem 2² = 4 subconjuntos: ∅, {q0}, {q1}, {q0, q1}. É por isso que a simulação não determinística trabalha com conjuntos de estados ativos, e não com um estado só.

3. ε-fecho (epsilon closure)
Implementado em src/engine/closure.ts:

E(S) = maior conjunto tal que S ⊆ E(S) e,
       se q ∈ E(S) e existe q —ε→ p, então p ∈ E(S)
O algoritmo é uma busca em largura (BFS) com conjunto de visitados:

começa com os estados do próprio conjunto S;
percorre a fila e, para cada estado, segue todas as arestas ε;
adiciona destinos ainda não visitados.
O conjunto de visitados impede travamento em ciclos de ε. A versão para um único estado é epsilonClosureOf().

4. Simulação de AFD
Em src/engine/simulateDfa.ts:

cria uma fotografia inicial com o estado q0;
para cada símbolo a da cadeia, procura a transição única (estado_atual, a);
se não houver transição, a máquina trava e a palavra é rejeitada;
ao fim, aceita se estado_final ∈ F.
Cada passo registra prefixo lido, sufixo restante, estado ativo, transição executada e uma nota explicativa. A palavra vazia ε é aceita se e somente se q0 ∈ F.

5. Simulação de AFND
Em src/engine/simulate.ts:

S0 = E({q0})
para cada símbolo a:
    destinos = ⋃ { δ(q, a) | q ∈ S_atual }
    S_atual  = E(destinos)
    se S_atual = ∅ → travou, rejeita
aceita se S_final ∩ F ≠ ∅
Ou seja: a cada símbolo, a máquina reúne os destinos de todos os estados ativos, aplica o ε-fecho e segue em frente com o novo conjunto. Se pelo menos um caminho termina em estado final, a palavra é aceita.

O custo é proporcional a |w| · |Q| · |δ| no pior caso. Antes de simular, a função confere se todos os símbolos da cadeia pertencem a Σ; se algum não pertence, rejeita imediatamente com explicação.

6. Alcance a partir de q0
validate() faz uma BFS nas transições a partir do estado inicial. Estados não visitados recebem o aviso "estado inalcançável" — são estados que nunca poderiam ser ativados por nenhuma cadeia.

7. Formatação matemática
src/engine/format.ts converte os dados para notação de livro:

Entrada	Saída
[]	∅
['q0','q1']	{q0, q1}
['0','1']	0,1 (rótulo de aresta)
('q0','1','q1')	q0 —1→ q1
Funções mais importantes
Função	Arquivo	Papel
classifyAutomaton(a)	engine/classify.ts	Decide AFD/AFND, aponta pares não determinísticos e transições ε
inferType(a)	engine/classify.ts	Atalho que retorna apenas o tipo inferido
validate(a)	engine/validate.ts	Verifica IDs, alfabeto, q0, F, símbolos, completude e alcance; devolve erros/avisos com texto e correção
epsilonClosure(a, S)	engine/closure.ts	Calcula o ε-fecho de um conjunto de estados (BFS à prova de ciclos)
epsilonClosureOf(a, q)	engine/closure.ts	ε-fecho de um único estado
simulateAutomaton(a, w)	engine/simulate.ts	Verifica símbolos, escolhe o motor e devolve passos, veredito e explicação
simulateDfa(a, w)	engine/simulateDfa.ts	Execução determinística com travamento por falta de transição
formatSet / formatTargets	engine/format.ts	Notação de conjuntos (∅, {a, b})
formatSymbols / formatTransition	engine/format.ts	Rótulos de aresta e transições em texto
setInput, run, next, prev, setIndex	store/automatonStore.ts	Controlam a cadeia e a navegação pelos passos pré-calculados
setPlaying, togglePlaying, setSpeed	store/automatonStore.ts	Reprodução automática dos passos (500–2000 ms)
undo / redo	store/automatonStore.ts	Histórico de alterações do autômato
Tecnologias
Parte	Ferramenta
Interface	React 19, TypeScript 7, Vite 8, Tailwind CSS 4
Grafo	Cytoscape 3 + cytoscape-dagre + cytoscape-edgehandles
Estado	Zustand 5
Testes	Vitest 5 + Testing Library + jsdom (60 testes ativos)
Qualidade	oxlint e Prettier
Hospedagem	Firebase Hosting (projeto automalab-127e3) e Analytics
Toda a lógica roda no navegador: não há servidor de aplicação, banco de dados remoto nem login.

Como executar
Requisitos: Node.js 20.19+ ou 22.12+.

npm install       # dependências
npm run dev       # servidor de desenvolvimento
npm test          # testes automatizados
npm run lint      # análise estática
npm run build     # build de produção
npm run preview   # pré-visualizar o build
O vite.config.ts define base: '/automalab/'; para servir na raiz do domínio, o build de publicação é gerado com --base=/.

Publicação
firebase deploy --only hosting --project automalab-127e3
A configuração do Hosting (firebase.json) usa public: "." e aponta para o diretório que contém index.html e assets/.
