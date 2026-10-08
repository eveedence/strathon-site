# Posicionamento

A tese para site e conteúdo dos próximos 60 a 90 dias: **vender o problema “Custo da Prova”, não a plataforma.** O produto ainda está amadurecendo; é a janela para descobrir quais Evidence Jobs se repetem, quais cargos sentem a dor e quais têm orçamento. A comunicação é também a máquina de discovery.

## Duas camadas

| Camada | Nome | Papel |
|---|---|---|
| Comercial | **Evidence Operations** | Compreensível, não nos prende a compliance, descreve o trabalho que automatizamos. |
| Técnica | **Provability Infrastructure** | Explica por que somos diferentes e onde o `evdnce` entra. Não vai na home. |

**Frase de posicionamento:** a Eveedence é a plataforma de Evidence Operations para organizações que precisam provar decisões, incidentes e controles.

**A frase que importa mais:** quando alguém pergunta “prove o que aconteceu e por que vocês decidiram isso”, a Eveedence ajuda a resposta a não começar numa caça a logs, documentos e pessoas.

**Em uma frase:** a Eveedence conecta as evidências espalhadas pelos seus sistemas e organiza o que aconteceu, por que aconteceu e o que sustenta aquela conclusão.

**Em 30 segundos:** empresas executam decisões e controles em dezenas de sistemas. O problema aparece meses depois, quando um auditor, regulador, cliente ou jurídico pede para provar o que aconteceu, e a equipe reconstrói tudo à mão. A Eveedence transforma essas informações dispersas num caso verificável: mostra os fatos, a regra usada, as evidências disponíveis e também o que está faltando.

Nada disso menciona hash, assinatura, standard, blockchain, JSON, governança de IA, LGPD ou SUSEP. Isso vem depois que a pessoa disser “é exatamente isso que acontece aqui”.

## Custo da Prova (Cost of Proof)

A expressão que queremos possuir. As empresas medem custo de compliance, de incidente, de auditoria, de fraude, de segurança. Quase ninguém pergunta: **quanto custa provar, depois, que fizemos a coisa certa?** A pergunta transforma um problema abstrato em dinheiro e cria nossa própria categoria mental. Em inglês: *Cost of Proof*. O Teste do Custo da Prova (`ProofTest`) é a forma dela no site.

## Ordem de educação

Começar pelo 1, nunca pelo 9.

1. Tenho um problema?
2. Esse problema custa dinheiro?
3. Existe um nome para ele?
4. Evidence Operations
5. Existe uma forma melhor de resolver?
6. Eveedence
7. Como posso confiar nessa prova?
8. Provability
9. `evdnce`

## Arquitetura de marca

```text
EVEEDENCE · Evidence Operations
"Transforme o que aconteceu em evidência que você consegue defender."
   ├─ Incident Evidence
   ├─ Decision Evidence
   ├─ Assurance Evidence
   └─ Partner Platform

FUNDAÇÃO TÉCNICA · Provability Infrastructure
   └─ evdnce · especificação, verificador, pesquisa
```

`evdnce` fica em **Abordagem técnica → pesquisa evdnce**, nunca no hero nem no menu como “Standard”: há ADRs em `Proposed`, gates abertos e nenhuma segunda implementação independente. Quando os gates fecharem: Eveedence = produto comercial, `evdnce` = especificação aberta.

A frase que queremos ouvir repetida: **“A Eveedence é para quando alguém pergunta ‘prove’.”**

## Hero

> **Quando alguém pedir para provar, não comece do zero.**
> A Eveedence transforma evidências espalhadas pelos seus sistemas em casos que sua equipe consegue reconstruir, verificar e defender.
> Para incidentes, decisões e controles que precisam sobreviver a auditorias, clientes e reguladores.

CTA principal **Reconstrua um caso real**; secundário **Veja como funciona**. “Agendar uma demo” pede que o visitante acredite no produto; “Reconstrua um caso real” pede só que ele reconheça o problema. Não usar: “Infraestrutura para evidência regulatória criptograficamente verificável”.

## O que não somos

Não é mais um GRC. Não é mais um repositório de logs. Não é mais um checklist de compliance. Não é um score de conformidade caixa-preta: quando não há evidência suficiente, a resposta pode ser “não sabemos”. E a frase que reduz resistência: **a Eveedence não substitui seu SIEM, GRC, KYC, ticketing ou case-management; ela conecta a evidência produzida por eles.**

## Quem compramos primeiro

| ICP | Cargos de entrada | Dor |
|---|---|---|
| A · assurance, cyber, consultorias (outbound inicial) | Managing Partner, Partner de Cyber Risk ou GRC, Head de Assurance, Head de IR | Margem: quanto trabalho humano repetitivo existe em produzir pacotes de evidência. O comprador econômico também ganha dinheiro com o processo. |
| B · empresa regulada | CISO, Head de Cyber, Head de GRC, Head de IR, DPO; depois CRO, CCO, Auditoria Interna | A dor de produzir a prova é de Security, Risk e Compliance, não do CTO. |
| C · IA e software regulado (não é o primeiro outbound) | Head de AI Governance, Model Risk, Responsible AI; em SaMD, Regulatory Affairs e Quality | Decisão automatizada que precisa ser reconstruída. |

Comitê de compra típico: champion (Head de GRC, Privacidade ou Compliance), usuário (analista, auditor, IR), técnico (CISO, arquitetura), jurídico (DPO), comprador econômico (CISO, CCO, CRO ou Partner) e procurement.

## Jornada comercial

```text
CONTEÚDO "Can you prove it?" → TESTE DO CUSTO DA PROVA → DISCOVERY DE 30 MIN (um caso real)
  → MAPEAMENTO DO EVIDENCE JOB → DIAGNÓSTICO PAGO → DESIGN PARTNER → PILOTO → PLATAFORMA ANUAL
```

Conteúdo e venda usam o mesmo objeto, um **Evidence Job**: não há quebra entre marketing e produto. Valores (diagnóstico, piloto, plataforma) são internos e **não vão para o site**.

A primeira call é “mostre-me como vocês fariam hoje”, não uma demo. Onde começaria? Quem chamaria? Qual sistema abriria? Onde está a política? Como descobriria a versão? Como saberia que todas as evidências estão presentes? Quem aceitaria a conclusão? No fim da reunião, não “quer ver a plataforma?”, mas: “existem seis sistemas e três pontos em que a reconstrução depende de conhecimento humano; o próximo passo é reconstruir um caso real e medir esse custo.”
