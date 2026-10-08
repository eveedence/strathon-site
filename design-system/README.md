# Eveedence Design System v0.2 — proposta

Atualização local preparada em 2026-10-08 a partir do logotipo oficial atualizado e das capturas fornecidas pelo usuário. O export do artefato anterior não estava disponível. Esta é uma reconstrução editável dos fundamentos e componentes visíveis, não uma reprodução de todos os 22 componentes originais.

## Abrir

Na raiz do projeto:

```powershell
node design-system/generate-tokens.mjs
node node_modules/typescript/bin/tsc --noEmit
pnpm build
pnpm start --hostname 127.0.0.1 --port 3107
```

- `/design-system`: catálogo, marca, tokens, temas, tipografia, espaçamento e componentes.
- `/`: aplicação da marca na home.
- `/custo-da-prova`: ficha interativa, sem score e sem transmissão ou armazenamento de respostas.
- `/design-system.html`: encaminha o endereço legado para o catálogo novo.

## Fontes de verdade

| Arquivo | Papel |
|---|---|
| `tokens.json` | Primitivas e cores semânticas por tema; única fonte dos valores de cor |
| `generate-tokens.mjs` | Gera o CSS e checa os pares de contraste declarados |
| `tokens.css` | Gerado; não editar à mão |
| `contrast-report.json` | Resultado da checagem de tokens; não é auditoria WCAG completa |
| `eveedence.css` | Tipografia, layout e estilos dos componentes |
| `components.tsx` | Brand, Button, StateBadge, Tag, SearchField, SiteHeader, CaseThread, Hero, QATable, ProofTeaser, SiteFooter e ProofTest |
| `guide.tsx` | Catálogo visual e seletor de tema |
| `copy.ts` | Mensagem principal, CTA e texto de privacidade da ficha |
| `../public/brand/` | Logotipo oficial e fontes Geist locais |

Os valores em #CE102C dos screenshots históricos não definem a identidade nova. O logotipo atualizado fornecido usa **#FF0004**. O símbolo anterior foi retirado de todas as aplicações ativas.

## Regras da marca

- Logotipo atualizado: viewBox 0 0 607 91.
- SVG copiado sem alteração; hash SHA-256 conferido contra o arquivo fornecido.
- Não recompor o wordmark, não alterar seus cortes, proporção ou cor.
- Respiro proposto: ao menos ¼ da altura do ativo em cada lado.
- O mesmo logotipo vermelho aparece em claro e escuro. Não foi criada uma versão branca recolorida.
- O símbolo foi removido do catálogo, componentes e favicon; seu arquivo anterior permanece apenas no backup histórico.
- O logo não é sinal de integridade, completude ou verificação.
- Geist Sans permanece; Geist Mono é usada em identificadores, horários, tokens e metadados.
- A forma dos componentes acompanha a marca com curvas moderadas: controle 10 px, card 18 px, shell 28 px. São propostas novas.
- Fontes reaproveitadas do cache compilado do site: Geist Latin variável e Geist Mono Latin variável. Não há pedido externo de fonte em runtime.
- A tagline antiga não foi incorporada.

## Cor e acessibilidade

- Identidade: #FF0004. Contraste contra branco ~4:1; inadequado para texto pequeno branco/vermelho.
- Ação de marca: #CE0004, com texto branco; hover #B00003.
- Ação operacional principal: grafite em claro, claro em escuro.
- Cor não é a única informação: badges sempre incluem texto e ícone.
- Quatro estados: integridade verificada, problema de integridade, ainda não verificada, informação insuficiente.
- Assinada é distinta de integridade verificada; timestamp provisório é explícito.
- Texto normal usa contraste mínimo 4.5:1 nos pares checados; controles usam 3:1.
- As primitivas não são invertidas. Os mapeamentos semânticos do tema escuro são próprios.
- Tema escuro é proposta do catálogo. A home e o teste permanecem claros.
- Foco visível, navegação móvel explícita, alvos de 44 px ou mais, redução de movimento respeitada.
- QATable permite rolagem horizontal local e foco por teclado em telas estreitas.

## Conteúdo e limites

- Posicionamento preservado: Evidence Operations / Custo da Prova.
- A copy da home foi ajustada para demonstrar o problema e o método, sem afirmar conectores ou uma plataforma operacional já disponível.
- Soluções são contextos de início; não há links para páginas ainda inexistentes.
- Os exemplos continuam ilustrativos e apresentam lacunas.
- Nomes de ferramentas comerciais foram substituídos por classes de fonte.
- Elementos localizados representam presença; o caso declara integridade e suficiência não avaliadas.
- A ficha usa as respostas informadas. Pessoas + sistemas é contagem de insumos, não score.
- Mudar uma resposta invalida a ficha anterior. Recarregar elimina as respostas.
- Copiar a ficha é uma ação explícita do usuário.
- Não há endpoint de envio, lead capture, preços, diagnósticos vendidos ou verificação documental implementados.
- Este trabalho não altera gates do produto, licença de evdnce nem estado de publicação.

## Preservação e integração

Os arquivos anteriores de home, layout e guia foram preservados em `../.backup/brand-refresh-2026-10-08/` como texto. O pacote legado em `evdnce/packages/design-system/canonical` e os trabalhos locais existentes naquele repositório não foram alterados. A adoção no dashboard e em outros consumidores é uma migração posterior.

## Validação

- TypeScript verificado separadamente com `tsc --noEmit`.
- Build Next.js de produção executado.
- Contraste de 52 pares de tokens checado, 0 falhas.
- Chromium: home desktop/mobile, navegação móvel, temas do catálogo e ficha interativa.
- Relatório de navegador e screenshots acompanham o pacote.
- Não equivale a auditoria completa de acessibilidade nem a aprovação das propostas de marca.

## API React

O arquivo index.ts exporta os componentes individualmente e o namespace Eveedence (incluindo copy e tokens). Importe os estilos eveedence.css uma vez no layout e disponibilize os ativos de public/brand no mesmo caminho. A API reconstruída cobre os componentes listados; não promete compatibilidade integral com o bundle anterior.
