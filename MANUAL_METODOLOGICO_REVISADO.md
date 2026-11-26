# MANUAL METODOLÓGICO DE DESENVOLVIMENTO — PROJETO A3 • MODELO UC HUB

## AutomaLab

**Ambiente Interativo para Construção, Simulação e Compreensão Matemática de Autômatos Finitos**

| Campo | Versão revisada — preencher antes da entrega |
|---|---|
| Projeto | AutomaLab — ambiente educacional web **implementado e publicado** |
| Área de conhecimento | Computação, Teoria da Computação, Compiladores, Educação em Computação e Estruturas Matemáticas |
| Unidade Curricular / Hub | `[Inserir Unidade Curricular — UC HUB / Ecossistema Ânima Educação]` |
| Instituição de Ensino | `[Inserir Nome da Instituição / Campus]` |
| Docente Orientador(a) | `[Inserir Nome do(a) Professor(a) Orientador(a)]` |
| Integrantes da Equipe | `[Integrante 1 — RA]` • `[Integrante 2 — RA]` • `[Integrante 3 — RA]` • `[Integrante 4 — RA]` • `[Integrante 5 — RA]` |
| Data de Entrega e Formato | Dia 04 — Manual Metodológico Completo (PDF) e Apresentação em Vídeo |
| **Estágio Atual** | **MVP implementado, testado automaticamente e disponível em produção** |
| **Endereço público** | **https://automalab-127e3.web.app** (Firebase Hosting, projeto `automalab-127e3`) |

### Nota Metodológica de Escopo e Maturidade (reescrita)

Este manual documenta o planejamento metodológico, a fundamentação conceitual, a arquitetura **efetivamente construída** e o estado de validação do sistema AutomaLab. Diferentemente da versão anterior — que descrevia o projeto em concepção e pré-desenvolvimento —, a presente revisão registra que o Produto Mínimo Viável foi **implementado, publicado em ambiente de hospedagem estática e submetido a testes automatizados**.

Os diagramas, fluxos e descrições de interface abaixo não são mais apenas especificações: correspondem ao comportamento observável na aplicação em produção. A avaliação empírica com estudantes voluntários permanece planejada e é tratada como etapa futura, distinta dos testes técnicos já executados.

### Legenda de revisão

Os marcadores abaixo indicam os três pontos que ainda serão alinhados no código no ato desta revisão, mediante aprovação deste texto:

- **[A1]** Fita de leitura segmentada e controles passo a passo na tela de teste de palavra.
- **[A2]** Exibição explícita de `Q × Σ` (produto cartesiano) e de `℘(Q)` na definição formal.
- **[A3]** Painel de análise estrutural com cardinalidades (`|Q|`, `|Σ|`, `|Q × Σ|`, `|℘(Q)|`).

Os demais itens descritos já existem no código e no site publicado. As pendências administrativas (nomes, RAs, UC, instituição, docente) e técnicas estão consolidadas no **Anexo A**.

---

## Sumário Estruturado do Manual

| Capítulo | Título | Eixo |
|---|---|---|
| 1 | Identificação e Contextualização do Projeto | Concepção e Cenário |
| 2 | Canvas Adaptado do Projeto A3 | Síntese Estratégica |
| 3 | Diagnóstico do Problema, Público-Alvo e Justificativa | Problemática Educacional |
| 4 | Objetivos Geral e Específicos | Direcionamento |
| 5 | Proposta de Solução e Fluxo Operacional | Operação do Sistema |
| 6 | Requisitos e Funcionalidades Modulares | Engenharia Funcional |
| 7 | Integração com Estruturas Matemáticas | Fundamentação Formal |
| 8 | Integração com Estruturas Matemáticas — Articulação Curricular | Articulação Curricular |
| 9 | Delimitação do Escopo e Produto Mínimo Viável (MVP) | Viabilidade Técnica |
| 10 | Metodologia de Desenvolvimento, Divisão da Equipe e Rastreabilidade | Processo Incremental |
| 11 | Interfaces Implementadas | Design e Experiência |
| 12 | Arquitetura e Tecnologias Empregadas | Estrutura Técnica |
| 13 | Acessibilidade e Usabilidade Pedagógica | Inclusão e Clareza |
| 14 | Estratégia de Validação e Plano de Testes | Garantia de Qualidade |
| 15 | Cronograma por Etapas e Frentes de Trabalho | Planejamento Temporal |
| 16 | Análise de Riscos, Limitações e Mitigação | Gestão de Riscos |
| 17 | Resultados Alcançados e Esperados | Impacto Projetado |
| 18 | Evolução Futura e Roadmap Tecnológico | Escalabilidade |
| 19 | Preparação da Apresentação em Vídeo | Comunicação do Projeto |
| 20 | Conclusão | Síntese Final |
| Anexo A | Pendências de Aprovação | Ajustes Finais |

---

## 1. Identificação e Contextualização do Projeto

O AutomaLab é um ambiente web educacional interativo desenvolvido para apoiar o ensino e a aprendizagem de autômatos finitos na graduação em Computação. O projeto nasce no contexto das unidades curriculares de Teoria da Computação, Linguagens Formais e Autômatos, Compiladores e Estruturas Matemáticas, que constituem a base teórica para compreender como máquinas abstratas reconhecem padrões e processam informações.

No estudo introdutório dos modelos computacionais, os estudantes entram em contato com conceitos de natureza altamente formal e abstrata: estados como configurações internas de memória, alfabetos como conjuntos finitos de símbolos, cadeias como sequências finitas de caracteres, transições como regras de mudança de configuração e linguagens formais como conjuntos de cadeias aceitas por um modelo.

Além da estrutura estática desses componentes, a compreensão dinâmica exige distinguir o determinismo — em que cada par estado/símbolo conduz a uma única transição — do não determinismo, no qual múltiplas ramificações e conjuntos de estados alcançáveis coexistem durante a leitura de uma entrada. O domínio pleno desses conceitos envolve rastrear caminhos de processamento passo a passo para verificar critérios de aceitação e rejeição.

A literatura pedagógica em Computação reconhece que a transição entre a notação algébrica e o comportamento dinâmico da computação representa um desafio formativo relevante. Em resposta a esse desafio, o AutomaLab reúne, em uma única aplicação acessível pelo navegador, representações visuais sincronizadas, simulação interativa e experimentação controlada. Ao contrário da versão anterior deste manual, **o impacto pedagógico ainda não foi medido empiricamente com estudantes**; o que se registra aqui é a entrega técnica de um ambiente funcional, passível de uso em aula e de futura avaliação.

O sistema classifica automaticamente o modelo como AFD ou AFND a partir da própria estrutura construída, dispensando a escolha prévia de tipo pelo estudante. Essa decisão de projeto foi adotada para aproximar a ferramenta do raciocínio matemático: é a forma da função de transição — e não uma opção de menu — que determina a natureza do autômato.

---

## 2. Canvas Adaptado do Projeto A3

Seguindo a estrutura metodológica do UC HUB, o Canvas Adaptado sintetiza os pilares estratégicos, educacionais e técnicos do AutomaLab, articulando a problemática identificada à solução **entregue**, aos recursos empregados e aos indicadores que nortearão a avaliação futura.

**CANVAS ADAPTADO — PROJETO AUTOMALAB (MVP ENTREGUE)**

| Elemento | Conteúdo |
|---|---|
| **1. Problema** | A elevada abstração dos autômatos finitos e a fragmentação entre seus componentes matemáticos (tupla formal), diagramas de estados, tabelas de transição e o rastreamento dinâmico do processamento de cadeias em uma experiência única de aprendizagem. |
| **2. Solução** | Ambiente web interativo para construção gráfica e simulação de autômatos finitos, com atualização simultânea de diagrama, tabela de transições, validação estrutural e formalização matemática. Publicado em hospedagem estática, sem necessidade de instalação pelo estudante. |
| **3. Proposta de valor** | Plataforma educacional acessível que integra construção visual, simulação controlada, representação formal e estruturas matemáticas aplicadas diretamente ao comportamento computacional dos autômatos — com classificação automática AFD/AFND. |
| **4. Público-alvo** | Primário: estudantes de Computação em Teoria da Computação, Linguagens Formais, Compiladores e Estruturas Matemáticas. Complementar: professores que buscam recursos visuais para demonstrações em aula e atividades práticas. |
| **5. Diferencial** | Sincronização em tempo real entre grafo interativo (Canvas), definição formal `M = (Q, Σ, δ, q0, F)`, tabela de transições, validação com diagnóstico e correção assistida, simulação de AFD e AFND com ε-fecho e conjuntos de estados alcançáveis, persistência local e biblioteca de exemplos. |
| **6. Benefícios esperados** | Maior articulação entre teoria e prática; visualização clara do processamento de cadeias; compreensão concreta dos elementos formais; exploração aplicada de conjuntos e funções; apoio ao estudo autônomo. |
| **7. Recursos necessários** | Equipe de cinco estudantes de Computação; React, TypeScript, Vite, Tailwind CSS, Cytoscape, Zustand, Vitest e Firebase Hosting; ferramentas de prototipação de interface; conhecimentos de modelagem de autômatos, algoritmos de simulação e Estruturas Matemáticas. |
| **8. Indicadores possíveis (avaliação futura)** | Capacidade de construir um autômato válido; identificação correta dos elementos formais; execução e interpretação de simulações; leitura de estados percorridos ou alcançáveis; associação entre modelo matemático e grafo. |

---

## 3. Diagnóstico do Problema, Público-Alvo e Justificativa

### 3.1. Diagnóstico da problemática educacional

O estudo de autômatos finitos exige que o estudante transite continuamente entre múltiplas linguagens de representação: a definição algébrica baseada em teoria dos conjuntos e funções, a representação tabular das transições, o diagrama de estados orientado por grafos e a execução operacional sobre cadeias de entrada. Em abordagens tradicionais baseadas exclusivamente em quadros estáticos ou listas de exercícios em papel, essas representações costumam ser trabalhadas de forma isolada.

Quando diagramas, formalizações e tabelas são estudados separadamente, estabelecer correspondências imediatas entre uma alteração estrutural no autômato e seus efeitos matemáticos ou operacionais torna-se difícil. Adicionar uma transição ou alterar um estado final modifica simultaneamente a função `δ`, o conjunto `F`, a matriz tabular e o conjunto de cadeias aceitas pela máquina. O AutomaLab resolve essa fragmentação mantendo **uma única fonte de verdade** em memória, da qual todas as visões são derivadas.

### 3.2. Caracterização do público-alvo

O público-alvo principal compreende estudantes de graduação em Computação — Ciência da Computação, Engenharia de Software, Sistemas de Informação e Análise e Desenvolvimento de Sistemas — matriculados em disciplinas que abordam modelos formais de computação e fundamentos matemáticos. Como público secundário, o sistema atende docentes interessados em uma ferramenta visual direta para ilustrar exemplos em sala de aula sem exigir instalações complexas: basta acessar a URL pública.

### 3.3. Justificativa educacional e tecnológica

A proposição de um ambiente web interativo justifica-se pela capacidade de tornar visíveis processos que, no papel, permanecem implícitos. A interatividade permite que o estudante formule hipóteses e observe imediatamente as consequências de suas escolhas de modelagem. Especificamente, o ambiente integrado permite:

- **Visualizar estados e transições:** transformar definições simbólicas em estruturas espaciais navegáveis e claras.
- **Experimentar entradas diferentes:** testar cadeias válidas, inválidas, vazias (ε) ou limítrofes.
- **Identificar caminhos de processamento:** acompanhar qual símbolo está sendo lido e quais estados assumem o controle da computação. **[A1]**
- **Comparar autômatos:** observar diferenças estruturais entre modelos determinísticos e não determinísticos — hoje classificados automaticamente pela aplicação.
- **Relacionar estruturas matemáticas ao comportamento computacional:** evidenciar que conjuntos, produtos cartesianos e funções são a própria engrenagem lógica do autômato. **[A2] [A3]**
- **Apoiar a aprendizagem independente:** oferecer feedback imediato sobre inconsistências estruturais e sobre o veredito de aceitação ou rejeição.

---

## 4. Objetivos Geral e Específicos

### Objetivo Geral

Desenvolver e disponibilizar um ambiente web educacional interativo para construção, visualização, simulação e compreensão matemática de autômatos finitos, integrando de maneira sincronizada suas representações gráficas, formais e operacionais.

### Objetivos Específicos

1. Permitir a construção visual e intuitiva de autômatos finitos diretamente no navegador. **Concluído.**
2. Representar explicitamente estados, alfabetos, transições, estado inicial e estados finais. **Concluído.**
3. Disponibilizar tabelas de transição geradas e atualizadas automaticamente em correspondência com o diagrama. **Concluído.**
4. Simular o processamento de cadeias de entrada com controle passo a passo. **Concluído no motor; interface de controle **[A1]**.**
5. Demonstrar visual e textualmente os caminhos percorridos durante a execução de uma cadeia. **Concluído.**
6. Integrar conceitos de teoria dos conjuntos (`Q`, `Σ`, `F`, `∈`, `⊆`) à representação estrutural dos autômatos. **Concluído.**
7. Relacionar o produto cartesiano `Q × Σ` ao conjunto de combinações possíveis entre estados e símbolos de entrada. **[A2]**
8. Explorar a distinção matemática entre funções de transição determinísticas e relações para conjuntos de estados. **Concluído (AFD e AFND implementados).**
9. Representar conjuntos de estados alcançáveis no processamento de Autômatos Finitos Não Determinísticos. **Concluído (ε-fecho e `S ∩ F`).**
10. Proporcionar uma arquitetura modular que sirva de base para futuras ampliações envolvendo expressões regulares, linguagens formais e análise léxica. **Concluído.**
11. Permitir a distinção inequívoca da autoria de cada integrante no repositório GitHub, por meio de frentes de trabalho, branches, Pull Requests e CODEOWNERS. **Concluído no planejamento; aplicação na entrega.**

---

## 5. Proposta de Solução e Fluxo Operacional

O AutomaLab é uma aplicação web de página única, organizada em painéis sincronizados que refletem o mesmo modelo de dados sob diferentes perspectivas pedagógicas. O fluxo operacional foi simplificado em relação ao plano original: **não há mais uma etapa de escolha de tipo**, pois o sistema infere AFD ou AFND automaticamente a partir das transições cadastradas.

**Fluxo operacional implementado (12 etapas):**

```
1. Biblioteca / exemplos  → 2. Alfabeto (Σ)  → 3. Estados (Q)  → 4. Inicial (q0) e finais (F)
                                     ↓
5. Transições (δ)  → 6. Diagrama ↔ Tabela  → 7. Validação  → 8. Definição formal (M)
                                     ↓
9. Análise estrutural [A3]  → 10. Cadeia (w)  → 11. Execução passo a passo [A1]  → 12. Veredito
```

### Detalhamento das etapas

| Etapa | Ação no sistema | Funcionamento |
|---|---|---|
| 1 | Biblioteca e exemplos | O estudante inicia do zero ou carrega um dos exemplos didáticos disponíveis. Há persistência local automática e importação/exportação de projetos em JSON. |
| 2 | Definir `Σ` | Símbolos são adicionados e removidos em `AlphabetEditor`; remover um símbolo limpa as transições que o utilizavam. |
| 3–4 | Definir `Q`, `q0` e `F` | IDs estáveis `q0 … q100` (limite de 101 estados); o primeiro estado criado torna-se o inicial; estados finais são alternados por clique. A remoção de um estado limpa transições e marcações ligadas. |
| 5 | Definir `δ` | Transições criadas por formulário ou arrastando conexões no diagrama. O sistema bloqueia duplicatas e transições com ε em AFD; em AFND aceita múltiplos destinos e ε. |
| 6 | Sincronização das visões | Abas **Diagrama** e **Tabela** no mesmo painel; qualquer edição em uma reflete na outra imediatamente. |
| 7 | Validação | `ValidationPanel` verifica determinismo, ε indevido, incompletude e states isolados, oferecendo correção assistida (inclusive "Adicionar estado de erro"). |
| 8 | Formalização | `FormalDefinition` exibe `M`, `Q`, `Σ`, `q0`, `F` e as linhas de `δ` derivadas do modelo. **[A2]** |
| 9 | Análise estrutural | Métricas e alertas de consistência do modelo. **[A3]** |
| 10–11 | Simulação controlada | A cadeia é informada em `WordTester`; o motor registra símbolo lido, estado(s) ativo(s), transição executada e nota explicativa a cada passo. **[A1]** |
| 12 | Diagnóstico | Veredito **ACEITA / REJEITA**, explicação textual e sequência completa de estados visitados ou alcançados. |

---

## 6. Requisitos e Funcionalidades Modulares

As funcionalidades são estruturadas em seis módulos integrados que operam sobre uma única representação interna do autômato. A coluna "Situação" registra o estado real de cada módulo.

| Módulo | Funcionalidades | Papel pedagógico | Situação |
|---|---|---|---|
| **1. Construtor de autômatos** | Criar e remover estados; definir estado inicial; marcar/desmarcar finais; definir alfabeto; criar, editar e remover transições; desfazer/refazer. | Permite experimentação ativa e manipulação direta dos componentes estruturais. | **Implementado.** IDs `qN` são estáveis e não há renomeação de estados — decisão registrada para evitar quebrar referências em `δ`. |
| **2. Diagrama visual** | Estados como nós, seta inicial, círculo duplo para finais, arestas direcionadas, auto-laços, rótulos, layout automático e arrastar-para-conectar. | Traduz a estrutura abstrata em grafo orientado, atualizado em tempo real. | **Implementado** com Cytoscape (Canvas), extensões dagre e edgehandles. |
| **3. Tabela de transições** | Matriz estado × símbolo, legenda `→` (inicial) e `*` (final), edição bidirecional com o diagrama. | Ensina a leitura tabular clássica usada na implementação algorítmica. | **Implementado.** |
| **4. Simulador de cadeias** | Receber cadeia; exibir símbolo atual, estado(s) ativo(s), transição executada, próximo estado, caminho e veredito. | Torna observável a dinâmica computacional e o rastreamento passo a passo. | **Implementado no motor; fita e controles na interface [A1].** |
| **5. Formalização matemática** | Quíntupla `M`, conjuntos `Q`, `Σ`, `F`, elemento `q0`, função `δ`, domínio/contradomínio, `Q × Σ` e conjuntos alcançáveis. | Conecta a construção gráfica à linguagem matemática rigorosa. | **Parcialmente implementado** — quíntupla e `δ` prontos; `Q × Σ` e `℘(Q)` **[A2]**. |
| **6. Área de análise** | Cardinalidades, lista de finais, transições definidas, alertas de faltantes e resumo da simulação. | Auxilia a diagnosticar incompletudes e validar consistência. | **A implementar [A3]**; validação básica já existe no módulo 7. |

---

## 7. Integração com Estruturas Matemáticas

Um dos diferenciais conceituais do AutomaLab reside na incorporação explícita de Estruturas Matemáticas como lente de compreensão dos autômatos finitos. O objetivo não é transformar a ferramenta em software de matemática pura, mas evidenciar como conjuntos, produtos cartesianos, relações e funções estruturam formalmente o comportamento computacional.

### 7.1. Teoria dos conjuntos e definição formal

Matematicamente, um Autômato Finito Determinístico é definido pela quíntupla ordenada:

`M = (Q, Σ, δ, q0, F)`

| Componente | Definição | Relação |
|---|---|---|
| `Q` | Conjunto finito e não vazio de estados | `Q ≠ ∅`; cardinalidade `|Q|` |
| `Σ` | Alfabeto, conjunto finito e não vazio de símbolos de entrada | `|Σ|` |
| `δ` | Função de transição que governa a mudança de estado | `δ: Q × Σ → Q` (AFD) |
| `q0` | Estado inicial | `q0 ∈ Q` |
| `F` | Conjunto de estados finais/de aceitação | `F ⊆ Q` (podendo ser `F = ∅`) |

**Exemplo didático — autômato reconhecedor de cadeias terminadas em "1":**

- `Q = {q0, q1}` (`|Q| = 2`)
- `Σ = {0, 1}` (`|Σ| = 2`)
- `q0 ∈ Q`
- `F = {q1}`, com `F ⊆ Q`

Diagrama: seta inicial → `q0`; laço `0` em `q0`; transição `1` de `q0` para `q1`; transição `0` de `q1` para `q0`; laço `1` em `q1`.

### 7.2. Produto cartesiano `Q × Σ` e mapeamento de transições

Para definir todas as situações possíveis de leitura em um AFD, utiliza-se o produto cartesiano `Q × Σ`, que reúne todos os pares ordenados formados por `q ∈ Q` e `a ∈ Σ`. Sua cardinalidade é `|Q × Σ| = |Q| · |Σ|`.

Com `Q = {q0, q1}` e `Σ = {0, 1}`:

`Q × Σ = { (q0, 0), (q0, 1), (q1, 0), (q1, 1) }`

| Par `(q, a)` | Estado `q` | Símbolo `a` | Destino `δ(q, a)` | Correspondência na tabela |
|---|---|---|---|---|
| `(q0, 0)` | `q0` | `0` | `q0` | Linha `q0`, coluna `0` → `q0` |
| `(q0, 1)` | `q0` | `1` | `q1` | Linha `q0`, coluna `1` → `q1` |
| `(q1, 0)` | `q1` | `0` | `q0` | Linha `q1`, coluna `0` → `q0` |
| `(q1, 1)` | `q1` | `1` | `q1` | Linha `q1`, coluna `1` → `q1` |

Essa relação é apresentada ao estudante na tela de formalização **[A2]**, com destaque para a correspondência um a um entre pares do domínio e células da tabela de transições.

### 7.3. Relações, funções e conjunto potência `℘(Q)`

A diferença estrutural entre os modelos determinístico e não determinístico manifesta-se diretamente na assinatura da transição. No AFD, `δ` é uma função total que associa cada par de `Q × Σ` a um único elemento de `Q`. No AFND, a leitura de um símbolo pode conduzir a zero, um ou múltiplos estados, fazendo com que o contradomínio seja o conjunto potência `℘(Q)`.

Para `Q = {q0, q1}`: `℘(Q) = { ∅, {q0}, {q1}, {q0, q1} }`, com `|℘(Q)| = 2² = 4`.

Durante a simulação de um AFND, operações entre conjuntos — união (`∪`), interseção (`∩`) e diferença (`−`) — calculam os estados alcançáveis a cada passo. O critério de aceitação verifica se `S_final ∩ F ≠ ∅`. A exibição do conjunto potência e de sua cardinalidade é exibida na área de análise **[A2] [A3]**.

| Dimensão | AFD | AFND |
|---|---|---|
| Assinatura | `δ: Q × Σ → Q` (função determinística) | `δ: Q × Σ → ℘(Q)` (sobre `Σ ∪ {ε}`) |
| Destino de `(q, a)` | Exatamente um estado `q' ∈ Q` | Subconjunto `S ⊆ Q`, inclusive `∅` |
| Transições vazias (`ε`) | Bloqueadas pela validação | Permitidas, com cálculo de ε-fecho |
| Operações de conjuntos | Pertinência (`∈`) e inclusão (`⊆`) | União (`∪`) de destinos e interseção (`∩`) com `F` |
| Critério de aceitação | `q_atual ∈ F` | `S ∩ F ≠ ∅` |
| Situação no projeto | **Implementado** | **Implementado** (antes previsto apenas como evolução futura) |

---

## 8. Integração com a Disciplina de Estruturas Matemáticas

### Diretriz de articulação curricular

Os tópicos listados conectam o AutomaLab à disciplina de Estruturas Matemáticas sem alterar a ementa institucional. A coluna "Recurso" descreve o que o sistema efetivamente oferece.

| Conceito | Relação com autômatos | Recurso no AutomaLab | Classificação |
|---|---|---|---|
| Teoria dos conjuntos | Definição de `Q`, `Σ`, `F` e estados ativos | Painel de definição formal em tempo real | Prioritária — **implementado** |
| Produto cartesiano | Combinações estado × símbolo (`Q × Σ`) | Lista de pares e matriz de transições | Prioritária — **[A2]** |
| Relações e funções | Assinatura de `δ`, domínio, imagem | Validador de determinismo e completude | Prioritária — **implementado** |
| Grafos dirigidos | Vértices, arestas, caminhos | Editor visual e alerta de estados isolados | Prioritária — **implementado** |
| Sequências e cadeias | Entrada `w`, comprimento `|w|`, cadeia vazia `ε` | Fita de leitura segmentada | Prioritária — **[A1]** |
| Cardinalidade | `|Q|`, `|Σ|`, `|Q × Σ|`, `|℘(Q)|` | Indicadores na área de análise | Complementar — **[A3]** |
| Lógica e álgebra booleana | Predicados de aceitação | Explicação textual do veredito | Complementar — **implementado** |
| Combinatória | Contagem de cadeias de tamanho `k` | Sugestão de baterias de teste | Complementar — futuro |
| Recursão | Função de transição estendida `δ*` | Rastreamento acumulado do prefixo lido | Complementar — **implementado** |
| Indução matemática | Prova de correção do reconhecimento | Material de apoio teórico | Futura |
| Equivalência e partições | Classes de estados equivalentes | Módulo futuro de minimização | Futura |

---

## 9. Delimitação do Escopo e Produto Mínimo Viável (MVP)

O escopo foi reavaliado ao longo do desenvolvimento. O MVP originalmente previsto como restrito a AFD foi **ampliado**: o suporte a AFND, ε-transições, ε-fecho e conjuntos de estados alcançáveis foi antecipado e entregue junto com o núcleo determinístico, porque o motor já operava sobre a abstração de conjuntos de estados.

| Estágio | Escopo | Situação real |
|---|---|---|
| **1. MVP prioritário** | Construtor visual; estados e alfabeto; `q0` e `F`; transições; diagrama sincronizado; tabela automática; formalização de `M`; simulador com veredito e caminho; persistência e exemplos. | **Entregue e publicado.** |
| **2. Evolução intermediária** | AFND; múltiplos caminhos; conjuntos de estados alcançáveis; transições `ε`; ε-fecho; conjunto potência `℘(Q)`. | **Entregue** (motor e visualização de passos). Exibição explícita de `Q × Σ`/`℘(Q)` e métricas **[A2] [A3]**; fita de leitura **[A1]**. |
| **3. Recursos avançados** | Determinização AFND → AFD; minimização; expressões regulares; análise léxica; análise sintática e autômatos com pilha. | **Roadmap**, não implementado. |

Fora do escopo atual, registrados como decisão explícita: renomeação de estados (IDs `qN` permanecem estáveis), geração de exercícios com correção automática, exportação do diagrama em imagem e colaboração em tempo real entre usuários.

---

## 10. Metodologia de Desenvolvimento, Divisão da Equipe e Rastreabilidade

### 10.1. Metodologia incremental

O desenvolvimento adotou metodologia incremental e iterativa, alinhada às boas práticas de Engenharia de Software e às entregas do UC HUB. Em vez de construir todo o sistema de uma vez, o processo foi dividido em seis fases encadeadas:

| Fase | Atividade | Situação |
|---|---|---|
| 1 | Levantamento e organização: problema, público, escopo, requisitos | **Concluída** |
| 2 | Modelagem formal e estruturas de dados | **Concluída** |
| 3 | Prototipação conceitual das interfaces | **Concluída** (posteriormente substituída por telas reais) |
| 4 | Desenvolvimento do MVP e integração matemática | **Concluída** |
| 5 | Testes técnicos, funcionais e matemáticos | **Em andamento** — testes automatizados executando; casos A1 pendentes |
| 6 | Avaliação pedagógica e evolução | **Planejada** — sessões com estudantes |

### 10.2. Divisão em cinco frentes de trabalho

Para que o professor consiga identificar a autoria de cada parte, o trabalho foi repartido em **cinco frentes com dono único** sobre conjuntos de arquivos distintos. Nenhuma frente altera arquivos de outra sem Pull Request revisado.

| Pessoa | Frente | Arquivos de domínio | Entregável principal |
|---|---|---|---|
| **P1** | Engine e conteúdo matemático | `src/engine/**` (types, classify, validate, simulate, simulateDfa, closure, format, stateId, serialize, autoLayout) e `src/content/**` (presets, education, dialogs, issues, importExport, simulation) | Motor de simulação AFD/AFND, validação, definição formal **[A2] [A3]** e conteúdos didáticos |
| **P2** | Estado e persistência | `src/store/**` (automatonStore, persistence, announcer, theme) | Store único, undo/redo,simulação passo a passo **[A1]**, importação/exportação e localStorage |
| **P3** | Visualização e resultado | `AutomatonCanvas.tsx`, `ResultPanel.tsx`, `TransitionTable.tsx`, `FormalDefinition.tsx`, `ValidationPanel.tsx` | Diagrama, tabela, validação e painel de análise **[A3]** |
| **P4** | Edição e biblioteca | `AlphabetEditor.tsx`, `StateManager.tsx`, `TransitionEditor.tsx`, `AutomatonLibrary.tsx`, `ConfirmDialog.tsx`, `EmptyState.tsx` | Construtor, exemplos e UX de edição |
| **P5** | Casca, simulação e infraestrutura | `App.tsx`, `Header.tsx`, `WordTester.tsx`, `AutomatonExplanationPanel.tsx`, `ThemeToggle.tsx`, `LiveRegion.tsx`, configurações, documentação, Firebase e CI | Layout, fita/controles **[A1]**, acessibilidade, deploy e pipeline |

### 10.3. Rastreabilidade de autoria no GitHub

A rastreabilidade é garantida por mecanismos verificáveis pelo professor:

1. **Identidade própria:** cada integrante configura `git config user.name` e `git config user.email` com seus dados antes do primeiro commit. O autor aparece corretamente no histórico.
2. **Branch por frente:** `p1-engine`, `p2-store`, `p3-visualizacao`, `p4-edicao`, `p5-shell-infra`.
3. **Commits atômicos e prefixados:** mensagens no formato `[P3] Adiciona fita de leitura ao painel de resultado`, com uma responsabilidade por commit.
4. **Pull Requests para `main`:** todo código entra por PR, com descrição do que mudou, frente responsável e evidência (teste ou captura).
5. **Merge commit (sem squash):** o histórico preserva cada commit individual e seu autor.
6. **CODEOWNERS:** arquivos de cada frente exigem aprovação do respectivo dono antes do merge.
7. **Proteção de `main`:** proibição de push direto, exigência de PR e de checagem de CI aprovada.
8. **CI:** workflow de GitHub Actions executando `lint`, `test` e `build` em cada PR.

Dessa forma, o histórico do repositório — e não apenas o texto deste manual — comprova quem implementou cada parte.

---

## 11. Interfaces Implementadas

As quatro telas abaixo descrevem a aplicação em produção, acessível em `https://automalab-127e3.web.app`.

### Tela 1 — Visão geral e biblioteca

Cabeçalho com navegação por âncoras, alternância de tema e ajuda de atalhos. Seção de acolhimento com o título **AutomaLab**, a frase "Monte e visualize autômatos finitos. O tipo (AFD ou AFND) é identificado automaticamente pela estrutura" e a quíntupla `M = (Q, Σ, δ, q0, F)`. Abaixo, o painel **Biblioteca** oferece exemplos agrupados em "Didáticos" e "Prova A1" (este último aguardando definição do professor), além de criação do autômato em branco, importação/exportação de JSON e persistência local automática.

### Tela 2 — Construtor (coluna esquerda)

Três seções numeradas:

- **1. Alfabeto** — editor de símbolos com adição/remoção e explicação didática contextual.
- **2. Estados** — lista de estados com marcação de inicial (`→`), finais (`◎`), adição, remoção e movimentação no canvas; limite de 101 estados.
- **3. Transições** — formulário de origem, símbolo e destino(s), com bloqueio de duplicatas e de ε em AFD; aceitação de múltiplos destinos em AFND.

### Tela 3 — Diagrama, tabela e formalização (coluna direita)

Painel **4. Diagrama e tabela** com badge do tipo inferido (`AFD` ou `AFND` — "inferido"), abas **Diagrama** e **Tabela**, e, abaixo delas, **Validação** e **Definição formal**. O diagrama usa nós circulares, seta inicial, contorno duplo para finais, auto-laços e rótulos; é possível arrastar nós e criar conexões arrastando a partir de um nó. A tabela mantém correspondência bidirecional com o grafo e usa a legenda `→` para o inicial e `*` para os finais. A validação lista erros e avisos com sugestão de correção. A definição formal mostra `M`, `Q`, `Σ`, `q0`, `F` e as linhas de `δ`; passa a exibir `Q × Σ`, `℘(Q)` e cardinalidades após **[A2] [A3]**.

### Tela 4 — Testar palavra

Campo **Palavra de entrada** (vazio = `ε`) e botão **Testar**. O resultado mostra veredito com ícone, explicação textual e lista recolhível com os passos da execução — símbolo consumido, restante, conjunto de estados ativos e nota explicativa, para AFD e AFND. Após **[A1]**, passa a exibir a fita segmentada e os controles **Executar / Próximo passo / Reiniciar**, além do estado anterior, da transição executada e do próximo estado.

---

## 12. Arquitetura e Tecnologias Empregadas

A aplicação é executada integralmente no navegador (**client-side**), sem backend próprio, banco de dados remoto ou autenticação. A hospedagem é estática no Firebase Hosting; o SDK Firebase é inicializado no bundle para Analytics.

| Camada | Tecnologia efetiva | Responsabilidade |
|---|---|---|
| Interface | React 19, TypeScript 7, Vite 8, Tailwind CSS 4, lucide-react | Componentes tipados, estilização utilitária, temas e build otimizado |
| Editor visual | Cytoscape 3.35 + cytoscape-dagre + cytoscape-edgehandles | Nós, arestas, auto-laços, layout automático e criação de conexões por arraste (Canvas) |
| Motor de autômatos | Módulos TypeScript puros em `src/engine` | Fonte única da quíntupla, classificação AFD/AFND, validação, serialização |
| Módulo matemático | `format.ts`, `stateId.ts`, `closure.ts`, `FormalDefinition.tsx` | Derivação de `Q`, `Σ`, `F`, `δ`, `Q × Σ` **[A2]** e cardinalidades **[A3]** |
| Simulador | `simulate.ts`, `simulateDfa.ts`, `store/automatonStore.ts` | Leitura de `w`, ε-fecho, histórico de passos, veredito e controle de execução **[A1]** |
| Persistência | Zustand 5 + `localStorage` + importação/exportação JSON | Estado global, undo/redo, salvamento local e portabilidade de projetos |
| Qualidade | Vitest 5, Testing Library, jsdom, oxlint, Prettier | Testes automatizados, lint e formatação |
| Hospedagem | Firebase Hosting (projeto `automalab-127e3`) + Firebase Analytics | Publicação estática em `https://automalab-127e3.web.app` |

**Fluxo de comunicação:** qualquer interação no editor, na tabela ou no diagrama atualiza o store central (`zustand`). O store notifica os componentes inscritos, que recalculam suas visões de forma sincronizada — grafo, tabela, validação, definição formal e simulador. Não há requisições ao servidor durante o uso; a única comunicação externa é a telemetria de Analytics.

**Nota de build:** o `vite.config.ts` mantém `base: '/automalab/'` para o cenário de subpasta; a publicação atual foi gerada com `--base=/` para servir na raiz do domínio do Firebase Hosting. O diretório de deploy (`C:\Users\isaac\automalab`) contém apenas `index.html`, `assets/`, `404.html`, favicon, ícones e os arquivos de configuração do Firebase — nunca o código-fonte.

---

## 13. Acessibilidade e Usabilidade Pedagógica

A acessibilidade foi tratada como requisito implementado, não apenas planejado:

- **Redundância representacional:** nenhum conceito depende exclusivamente do grafo; cada transição tem equivalência na tabela e na definição formal textual.
- **Independência de cor:** estados iniciais e finais são diferenciados por seta e contorno duplo; estados ativos durante a simulação também são descritos em texto.
- **Contraste e tipografia:** paleta com alto contraste, fontes legíveis (Inter e JetBrains Mono) e hierarquia visual definida entre controles e visualização.
- **Navegação por teclado:** link "Pular para o conteúdo", foco visível, botões com alvos de toque amplos e atalhos documentados.
- **Feedback sonoro/textual para leitores de tela:** região `aria-live` anuncia mudanças relevantes; vereditos usam `role="status"`.
- **Temas:** alternância entre claro e escuro com contraste preservado.
- **Mensagens objetivas:** textos de erro e ajuda escritos em linguagem acessível, com sugestão explícita de correção.

Essa abordagem beneficia tanto estudantes com necessidades específicas quanto iniciantes com diferentes estilos de aprendizagem — visual, tabular ou algébrico.

---

## 14. Estratégia de Validação e Plano de Testes

A validação é conduzida em três frentes complementares. A frente técnica já foi executada; a pedagógica permanece planejada.

| Categoria | O que foi verificado / será verificado | Critério |
|---|---|---|
| **Testes funcionais (automatizados)** | Criação e remoção de estados, alfabeto, marcações, transições, duplicatas, ε no AFD, múltiplos destinos no AFND, undo/redo, importação, limites, simulação, componentes de interface. **60 testes ativos** em `src/tests`, executados com Vitest + Testing Library. | Consistência entre visões e execução determinística sem falhas. |
| **Testes matemáticos** | `q0 ∈ Q`, `F ⊆ Q`, símbolos compatíveis com `Σ`, completude de `Q × Σ`, comportamento do AFD, ε-fecho e `S ∩ F` no AFND. | Rigor matemático preservado em todas as operações. |
| **Casos A1 (pendentes)** | `CT01`–`CT04`: quatro casos do professor (`A1_Q1`, `A1_Q2`, `A1_Q3_AFND`, `A1_Q4_AFND_E`) registrados como `it.todo` em `src/tests/casosDeTeste.test.ts`. | Aguardando definição oficial dos autômatos e cadeias pelo docente. **Não inventar dados.** |
| **Testes de usabilidade (planejados)** | Sessões observacionais com estudantes voluntários: facilidade de construção, clareza do diagrama, interpretação da formalização, acompanhamento da simulação e percepção de utilidade. | Identificação de melhorias e validação preliminar da clareza didática. |
| **Integração contínua (a configurar)** | Execução de `lint`, `test` e `build` em cada Pull Request, com CODEOWNERS e proteção de `main`. | Nenhum merge com testes falhando. |

**Pendência técnica registrada:** o comando `npm run build` (que roda `tsc -b` antes do Vite) falha em três arquivos de teste por atribuição de `null` onde o tipo esperado é `Automaton | undefined` (`App.test.tsx`, `ResultPanel.test.tsx`, `automatonStore.test.ts`). O deploy atual foi gerado com build direto do Vite; a correção dos tipos e a reescrita de `App.test.tsx` para a UI atual estão previstas no Anexo A.

---

## 15. Cronograma por Etapas e Frentes de Trabalho

O cronograma foi reescrito para refletir o que já foi entregue e a divisão em cinco pessoas. As semanas são estimativas acadêmicas, sem datas fixas confirmadas para as fases futuras.

| Etapa | Período | Atividade | Entregável | Responsável |
|---|---|---|---|---|
| 1 | Semana 1 | Definição do problema e escopo | Projeto delimitado e alinhado ao UC HUB | Equipe |
| 2 | Semana 2 | Levantamento de requisitos | Requisitos funcionais e pedagógicos organizados | Equipe |
| 3 | Semana 3 | Modelagem matemática e computacional | Contrato de dados (`types.ts`) e estruturas definidos | **P1** |
| 4 | Semana 4 | Prototipação e desenho da store | Telas conceituais e store central validados | **P2, P5** |
| 5 | Semanas 5–7 | Desenvolvimento do núcleo | Construtor, diagrama, tabela e simulação funcionais | **P1, P2, P3, P4** |
| 6 | Semana 8 | Integração e casca | Layout, acessibilidade, biblioteca e deploy | **P5** |
| 7 | Semana 9 | Formalização e análise | `M`, `Q × Σ`, cardinalidades e validação integrados **[A2] [A3]** | **P1, P3** |
| 8 | Semana 10 | Simulação visual completa | Fita e controles passo a passo **[A1]** | **P2, P5** |
| 9 | Semana 11 | Testes e CI | 60 testes corrigidos, lint, build e pipeline no GitHub | **P1, P2, P5** |
| 10 | Semana 12 | Avaliação pedagógica | Sessões com estudantes e ajustes de usabilidade | Equipe |
| 11 | Contínuo | Evolução | Casos A1, determinização, minimização e roadmap | Equipe |

---

## 16. Análise de Riscos, Limitações e Mitigação

| Risco | Impacto potencial | Mitigação adotada / planejada |
|---|---|---|
| Complexidade do editor visual | Dificuldade em nós, curvas, auto-laços e rótulos sobrepostos | Layout automático (dagre), geometria padronizada e edição complementar por formulário e tabela. |
| Escopo excessivo | Tentar implementar AFND, ε, expressões regulares e análise sintática ao mesmo tempo | MVP entregue com AFD + AFND; recursos avançados mantidos no roadmap. |
| Sobrecarga na integração matemática | Excesso de símbolos formais pode intimidar iniciantes | Formalização em bloco isolado, acompanhada de exemplos concretos e explicações em linguagem simples. |
| Barreiras de usabilidade | Confusão entre edição e simulação | Seções numeradas, painel de resultado à direita e fita de execução distinguindo claramente os modos **[A1]**. |
| Limitações de acessibilidade | Dependência exclusiva de mouse no diagrama | Equivalência por tabela, teclado, `aria-live` e temas com contraste. |
| Divergência documental | Manual descrevendo funcionalidades inexistentes | Revisão integral deste documento e marcação explícita das pendências **[A1] [A2] [A3]**. |
| Validação pedagógica pendente | Impacto real na aprendizagem ainda não medido | Testes com estudantes após a conclusão dos ajustes finais. |
| Qualidade do build | `tsc -b` falha em três testes; deploy depende de build direto do Vite | Correção dos tipos e reescrita de `App.test.tsx` antes da configuração da CI (Anexo A). |
| Casos A1 indefinidos | Impossibilidade de validar os casos do professor | Quatro `it.todo` aguardando os enunciados oficiais; nenhum autômato inventado. |

---

## 17. Resultados Alcançados e Esperados

**Resultados já alcançados:**

- Ambiente de aprendizagem interativo e acessível diretamente pelo navegador, sem instalação, em `https://automalab-127e3.web.app`.
- Construção e simulação de AFD **e AFND**, com ε-fecho, conjuntos de estados alcançados e veredito explicado.
- Sincronização em tempo real entre diagrama, tabela de transições, validação e definição formal.
- Persistência local, biblioteca de exemplos e importação/exportação de projetos em JSON.
- Base de código modular, tipada, com suíte automatizada de 60 testes e padrões de acessibilidade.
- Rastreabilidade de autoria planejada por frentes, branches, PRs e CODEOWNERS.

**Resultados esperados com os ajustes finais:**

- Exibição explícita de `Q × Σ`, `℘(Q)` e cardinalidades, fechando a integração com Estruturas Matemática exigida pelo manual. **[A2] [A3]**
- Fita de leitura e controles passo a passo na interface, tornando observável cada transição executada. **[A1]**
- Execução integral de `lint`, `test` e `build` na CI, com histórico Git auditável.
- Validação preliminar da clareza didática junto a estudantes e conclusão dos casos A1 assim que definidos pelo docente.

---

## 18. Evolução Futura e Roadmap Tecnológico

| Horizonte | Escopo | Situação |
|---|---|---|
| **MVP (entregue)** | Construtor visual, tabela sincronizada, formalização da quíntupla, validação, simulador com veredito, persistência e exemplos. | **Concluído** |
| **Intermediário (antecipado)** | AFND, caminhos simultâneos, conjuntos de estados alcançáveis, transições `ε` e ε-fecho. | **Concluído**; ajustes de exibição matemática **[A1] [A2] [A3]** |
| **Avançado (futuro)** | Determinização AFND → AFD por conjunto potência, minimização por partições de equivalência, conversão entre expressões regulares e autômatos, análise léxica introdutória. | Planejado |
| **Possibilidades adicionais** | Exercícios com correção automática, modo guiado, exportação do diagrama em imagem/vetores, compartilhamento entre estudantes, autômatos com pilha e análise sintática. | Planejado |

---

## 19. Preparação da Apresentação em Vídeo

A apresentação em vídeo acompanha a entrega escrita e deve comunicar o projeto com clareza em aproximadamente 5 a 6 minutos. Diferentemente do plano anterior, a demonstração pode — e deve — usar a aplicação em produção, não apenas protótipos.

| Tempo | Bloco narrativo | Foco | Recurso visual |
|---|---|---|---|
| 0:00 – 0:40 | Problema | Abstração e fragmentação entre tupla, diagrama, tabela e execução | Esquema do problema |
| 0:40 – 1:20 | O AutomaLab | Objetivo, público e URL pública | Canvas Adaptado e tela inicial |
| 1:20 – 2:40 | Demonstração ao vivo | Construir um AFD, editar no diagrama e ver a tabela e a definição atualizarem | Site no navegador |
| 2:40 – 3:40 | Diferencial matemático | `Q`, `Σ`, `F`, `δ`, `Q × Σ`, `℘(Q)` e estados alcançáveis **[A2] [A3]** | Painel de formalização e análise |
| 3:40 – 4:40 | Simulação | Testar uma cadeia, avançar passo a passo e interpretar o veredito **[A1]** | Fita de leitura e resultado |
| 4:40 – 5:30 | Viabilidade e trabalho em equipe | MVP entregue, stack leve, cinco frentes e rastreabilidade no GitHub | Quadro MVP × roadmap e histórico de commits |
| 5:30 – 6:00 | Impacto e conclusão | Benefícios educacionais e próximos passos | Síntese final |

---

## 20. Conclusão

O desenvolvimento metodológico do AutomaLab demonstra que é possível responder de forma estruturada e pedagogicamente fundamentada a uma problemática relevante no ensino de Computação: a necessidade de integrar, em um único espaço interativo, as múltiplas representações dos autômatos finitos. Ao articular simultaneamente a construção gráfica de diagramas, a geração automática de tabelas de transição, a formalização matemática e a simulação passo a passo de cadeias, o projeto torna visível a relação intrínseca entre abstração formal e comportamento computacional.

A incorporação explícita de conceitos de Estruturas Matemáticas — teoria dos conjuntos, produto cartesiano, relações, funções e conjunto potência — enriquece a concepção original sem descaracterizar a identidade do laboratório de autômatos. Essa fundamentação confere rigor conceitual à ferramenta e permite que o estudante compreenda a notação matemática como o alicerce operacional da máquina.

A ampliação do MVP para incluir AFND, ε-fecho e conjuntos de estados alcançáveis antecipou uma etapa antes prevista como distante, sem comprometer a estabilidade do núcleo determinístico. A publicação em hospedagem estática eliminou barreiras de instalação, e a divisão do trabalho em cinco frentes com rastreabilidade por Git torna verificável a contribuição individual de cada integrante.

Com os ajustes finais registrados nesta revisão — fita de leitura, exibição de `Q × Σ`/`℘(Q)` e painel de cardinalidades —, o AutomaLab consolida-se como uma proposta coerente, exequível e escalável, com potencial para apoiar o aprendizado de Teoria da Computação e servir de base para futuras expansões no domínio das linguagens formais e dos compiladores.

---

## Anexo A — Pendências de Aprovação

### A.1. Ajustes de código vinculados a esta revisão

| Item | O que será feito | Onde | Responsável |
|---|---|---|---|
| **[A1]** | Fita segmentada com símbolo atual, controlos Executar / Próximo Passo / Reiniciar, estado anterior, transição executada e próximo estado, consumindo `run`, `next`, `prev`, `playing`, `speed` e `setIndex` do store | `WordTester.tsx` + novo componente de fita | **P2 + P5** |
| **[A2]** | Exibição de `Q × Σ = {…}` e `℘(Q) = {…}` no painel de definição formal | `FormalDefinition.tsx` | **P1 + P3** |
| **[A3]** | Painel "Análise estrutural": `|Q|`, `|Σ|`, `|Q × Σ|`, `|℘(Q)|`, finais, transições definidas/faltantes e resumo da simulação | Novo componente em `src/components`, integrado ao `ResultPanel` | **P1 + P3** |

### A.2. Pendências técnicas

| Item | Situação | Ação necessária |
|---|---|---|
| Build completo | `npm run build` falha em 3 testes por `null` em `Automaton \| undefined` | Corrigir os 3 arquivos de teste e reescrever `App.test.tsx` para a UI atual (sem `TypeChooser`) |
| Casos A1 | 4 `it.todo` aguardando enunciado | Receber do professor os autômatos e cadeias oficiais |
| Repositório GitHub | Ainda não inicializado | `git init` na pasta fonte, `.gitignore`, CODEOWNERS, PR template, CONTRIBUTING e CI |
| Documentação auxiliar | `README.md` e `CONTEXTO.md` desatualizados (falam em etapa 2) | Atualizar para o estado descrito neste manual |
| Resquícios | `TypeChooser.tsx` órfão, `Header.tsx` linka `#tipo`, `tmp_patch_canvas.mjs` | Remover ou corrigir |
| Pasta de deploy | `C:\Users\isaac\automalab` contém só o build; fonte em `Downloads\automalab\automalab` | Manter separadas; não versionar build nem `.firebase/` |

### A.3. Dados a preencher antes da entrega final

- Unidade Curricular / Hub
- Nome da instituição e campus
- Nome do(a) docente orientador(a)
- Nomes e RAs dos **cinco** integrantes, associados às frentes P1–P5

---

*Documento revisado para aprovação. Após o aval, os marcadores **[A1] [A2] [A3]** são implementados no código, as pendências técnicas são resolvidas e este texto é convertido na versão final em PDF.*
