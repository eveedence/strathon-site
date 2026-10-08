# Site

Arquitetura e blueprint das páginas. Os previews de página (`PageHomeTop`, `PageHomeBottom`, `PageProofTest`) usam exatamente estes componentes e o texto de `Eveedence.copy`: o texto mora num lugar só.

## Mapa

```text
Home
Soluções ▾
   Incident Evidence · Decision Evidence · Assurance Evidence
Para firmas de assurance
Como funciona
Recursos ▾
   Evidence Jobs · Pesquisa · Guias · Casos
Abordagem técnica  (pesquisa evdnce)
Empresa
[Reconstrua um caso]
```

Começar pequeno: o objetivo é o visitante entender a tese, não ter 40 páginas. Regulador **nunca** é item de menu. Dentro de uma solução, o regulador vira “Contexto aplicável” (ANPD, BCB, Anatel, ECA Digital) e o Evidence Job continua sendo o produto. Páginas de solução reutilizam `Hero`, `CaseThread`, `QATable`, `SolutionCard` e `ProofTeaser`; só o caso de exemplo muda.

## Home: ordem das seções

| # | Seção | Componente | Pergunta que responde | Tom da superfície |
|---|---|---|---|---|
| 0 | Cabeçalho | `SiteHeader` | Onde estou? | `surface-app` |
| 1 | Hero | `Hero` + `CaseThread` | Isso é para mim? | `surface-app` |
| 2 | O problema | `Section` + `EvidenceScatter` | “Somos nós.” | `surface-subtle` |
| 3 | Um caso, uma pergunta | `Section` + `QATable` | Como seria a resposta? | `surface-app` |
| 4 | Como funciona | `Section` + `HowSteps` + `Callout` | Preciso trocar de ferramenta? | `surface-subtle` |
| 5 | Soluções | `Section` + `SolutionCard` ×3 | Por onde começo? | `surface-app` |
| 6 | O que não somos | `Section` + `NotCard` ×4 | Quais promessas vocês não fazem? | `surface-subtle` |
| 7 | Teste do Custo da Prova | `ProofTeaser` | Quanto me custa hoje? | `surface-inverse` |
| 8 | Abordagem técnica | `TechNote` | Posso confiar nessa prova? | `surface-subtle` |
| 9 | Rodapé | `SiteFooter` | | `surface-inverse` |

Depois do hero, mostrar um **caso**, não features: não “Evidence Graph / Cryptographic Verification / Policy Engine”. O visitante pensa “somos nós” no bloco 2, “é assim que eu responderia” no 3 e só então lê o método.

## Teste do Custo da Prova (`ProofTest`)

O CTA mais importante do site, no lugar de “Book a demo”. O visitante escolhe uma decisão ou incidente **encerrado há pelo menos 90 dias** e responde sete perguntas: pessoas, sistemas, política vigente exata, artifacts de origem desconhecida, “não existia” × “não encontramos”, tempo, repetibilidade por um terceiro.

- O resultado é uma **ficha**, não uma nota: sistemas envolvidos, pessoas necessárias, proveniência desconhecida, version binding (completo, parcial, ausente), tempo estimado, repetível por terceiro. “Insumos de reconstrução” = pessoas + sistemas, e o rodapé da ficha diz isso. Sem pontuação, sem faixa, sem “risco alto”.
- Lacunas aparecem como lista do que a equipe teria de resolver à mão (`ev-sheet__open`), nunca como veredito.
- Hoje o componente **não envia nada**: as respostas ficam no navegador e o texto da página diz isso. Se um dia a ficha for enviada ou salva, a frase “Suas respostas ficam neste navegador” sai ou muda **no mesmo commit**.
- Fecha com **“Reconstrua esse caso conosco”**.

## Regras de página

- Um `t-site-display` por página (só home); demais páginas abrem com `t-site-h2`.
- Um CTA primário (`Button` primary, `lg`) por viewport. Secundário só `secondary`. Nunca dois botões escuros lado a lado.
- Cada exemplo de caso leva `Exemplo ilustrativo`. Cada caso mostra **ao menos uma lacuna** (`StateBadge state="insufficient"`): caso sem lacuna parece score disfarçado.
- Hover nunca é a única via de uma ação; alvo de 44 px; foco visível.
- Layout responsivo abaixo de 880 px: grades viram coluna, menu colapsa (`menu` já está em `Icon`), `t-site-display` cai para 40 px.
- Imagens: nenhuma fotografia, nenhuma ilustração figurativa. Diagrama e caso são o visual.

## Afirmações a validar antes de publicar

O site descreve capacidades. Cada linha abaixo precisa ser verdadeira no dia da publicação ou ser reescrita:

1. “A Eveedence **se conecta** às fontes onde o trabalho já acontece” (passo 1 de Como funciona): hoje é verdade para quais conectores?
2. “Produz um expediente que pode ser **reconstruído e avaliado**”: o expediente existe como entregável hoje, ou é o diagnóstico pago?
3. “Casos que sua equipe consegue **verificar**”: verificar o quê, por quem, com qual ferramenta? Manter alinhado ao Verified-vs-Present do produto.
4. Cadeia de evidência no hero: dados são fictícios e rotulados; garantir que nenhum nome de ferramenta real (Splunk, ServiceNow…) apareça sem acordo.
5. `evdnce`: só “em desenvolvimento ativo, ainda não é padrão público congelado”.
6. “Para firmas de assurance” no menu: a página existe com proposta de valor própria (margem, não compliance) antes de entrar no menu.
