export type SolutionKind = "incident" | "decision" | "assurance";
export type SiteStep = { number: string; title: string; body: string };
export type SiteCard = { title: string; body: string };
export type CaseStep = { title: string; body: string; source: string; date?: string; missing?: boolean };

export const caseSteps: ReadonlyArray<CaseStep> = [
  { title: "Detecção", body: "Alerta de acesso anômalo a um bucket.", source: "Monitoramento", date: "14 fev 2026 · 09:12 UTC" },
  { title: "Evidências observadas", body: "Logs de acesso e registro de resposta.", source: "Ticket", date: "14 fev 2026 · 09:40 UTC" },
  { title: "Avaliação de risco", body: "Dados de 214 titulares, sem campos sensíveis.", source: "Avaliação", date: "15 fev 2026" },
  { title: "Política vigente", body: "Política de notificação v3.4, em vigor desde 1 jan 2026.", source: "Documento" },
  { title: "Decisão", body: "Notificação não exigida.", source: "Registro", date: "16 fev 2026" },
  { title: "Aprovação do DPO", body: "Nenhum registro localizado.", source: "Aprovação", missing: true },
  { title: "Ações", body: "Três ações de contenção concluídas.", source: "Ticket", date: "17 fev 2026" },
];

export const qaRows = [
  ["O que aconteceu?", "Alerta e ações registrados", "Registros localizados", "present"],
  ["Qual regra valia?", "Política de notificação v3.4", "Versão localizada", "present"],
  ["Quem revisou?", "Aprovação do DPO", "Nenhum registro localizado", "missing"],
  ["Isso sustenta a conclusão?", "Critério de aceitação da audiência", "Ainda não avaliado", "unverified"],
] as const;

export const homeScatterItems: ReadonlyArray<SiteStep> = [
  { number: "01", title: "O fato está num sistema.", body: "O registro existe, mas precisa ser encontrado." },
  { number: "02", title: "A regra está em outro.", body: "A versão de hoje pode não ser a versão usada." },
  { number: "03", title: "A explicação está com alguém.", body: "Conhecimento humano vira trabalho de reconstrução." },
];

export const homeHowSteps: ReadonlyArray<SiteStep> = [
  { number: "01", title: "Escolha a pergunta", body: "Uma decisão, incidente ou controle encerrado há pelo menos 90 dias." },
  { number: "02", title: "Mapeie as evidências", body: "Identifique fontes, pessoas, versões e o critério de quem avaliará a resposta." },
  { number: "03", title: "Declare as lacunas", body: "Distinga o que não foi produzido do que ainda não foi encontrado." },
];

export const notCards: ReadonlyArray<SiteCard> = [
  { title: "Não é outro GRC.", body: "Seus controles e workflows continuam onde já funcionam." },
  { title: "Não é outro repositório de logs.", body: "Guardar registros não estabelece, sozinho, o que uma conclusão sustenta." },
  { title: "Não é checklist de compliance.", body: "A obrigação é contexto. O trabalho começa pela pergunta que alguém precisa responder." },
  { title: "Não é score de conformidade.", body: "Quando a evidência não basta, “não sabemos” continua sendo uma resposta válida." },
];

export const solutionCards = [
  { title: "Incident Evidence", body: "O que aconteceu, quem respondeu e qual critério orientou a conclusão.", href: "/solucoes/incident-evidence" },
  { title: "Decision Evidence", body: "Qual versão decidiu, qual regra valia e quem revisou o resultado.", href: "/solucoes/decision-evidence" },
  { title: "Assurance Evidence", body: "O que foi pedido, o que sustenta a resposta e o que ainda falta.", href: "/solucoes/assurance-evidence" },
] as const;

export const solutionContent: Record<SolutionKind, {
  eyebrow: string;
  title: string;
  lead: string;
  question: string;
  steps: ReadonlyArray<SiteStep>;
  evidence: ReadonlyArray<SiteStep>;
  limits: ReadonlyArray<SiteCard>;
}> = {
  incident: {
    eyebrow: "Incident Evidence",
    title: "Reconstrua por que um incidente terminou naquela conclusão.",
    lead: "Organize fatos observados, versão da política, decisões, ações e lacunas sem substituir seu SIEM, seu case management ou o julgamento da equipe.",
    question: "Por que este incidente foi — ou não foi — comunicado, e o que sustentava essa decisão naquele momento?",
    steps: [
      { number: "01", title: "Fato observado", body: "Registre quais fontes observaram o evento e quando." },
      { number: "02", title: "Basis vigente", body: "Vincule a política, procedimento ou obrigação aplicável naquela data." },
      { number: "03", title: "Decisão e resposta", body: "Relacione avaliação, aprovação e ações executadas." },
      { number: "04", title: "Lacunas", body: "Declare o que não foi produzido, não foi localizado ou permanece indeterminado." },
    ],
    evidence: [
      { number: "01", title: "Timeline verificável", body: "Eventos e artifacts preservam origem, horário e relação com o caso." },
      { number: "02", title: "Version binding", body: "A análise aponta para a versão que valia, não para a versão atual por conveniência." },
      { number: "03", title: "Claim ceiling", body: "O expediente explicita o que a evidência demonstra — e o que não demonstra." },
    ],
    limits: [
      { title: "Não decide se o incidente é notificável.", body: "A Eveedence organiza o que sustenta a decisão; o critério continua com sua política, jurídico e responsáveis." },
      { title: "Não exige centralizar todo o dado bruto.", body: "O artifact sensível pode permanecer no sistema adequado; a composição pode trabalhar com referência e vínculo protegido." },
    ],
  },
  decision: {
    eyebrow: "Decision Evidence",
    title: "Mostre como uma decisão foi produzida — com a versão certa do sistema.",
    lead: "Para decisões automatizadas ou assistidas por software que precisam ser reconstruídas meses depois sem confundir o estado atual com o estado usado na época.",
    question: "Qual modelo, configuração, regra e evidência estavam realmente ligados a esta decisão?",
    steps: [
      { number: "01", title: "Subject", body: "Identifique a decisão e o sujeito/configuração a que a evidência se refere." },
      { number: "02", title: "Basis e versão", body: "Vincule política, modelo, configuração ou critérios usados naquele momento." },
      { number: "03", title: "Evidência da execução", body: "Componha observações, avaliações, aprovações e efeito produzido." },
      { number: "04", title: "Estado atual", body: "Mostre quando a configuração mudou e se a evidência histórica ainda sustenta a afirmação atual." },
    ],
    evidence: [
      { number: "01", title: "Versão, não memória", body: "A prova aponta para artifacts e versões concretas em vez de depender da configuração atual." },
      { number: "02", title: "Fato separado de conclusão", body: "Observação, avaliação e decisão continuam distinguíveis." },
      { number: "03", title: "Insuficiência explícita", body: "Ausência de binding ou current-state evidence não vira verde por inferência." },
    ],
    limits: [
      { title: "Não afirma que a decisão foi justa ou legal.", body: "Integridade e provenance não substituem revisão substantiva da política ou do resultado." },
      { title: "Não transforma assinatura em verdade.", body: "Uma assinatura pode proteger um artifact; não certifica a correção do conteúdo assinado." },
    ],
  },
  assurance: {
    eyebrow: "Assurance Evidence",
    title: "Transforme coleta repetitiva de evidência em um expediente que pode ser reavaliado.",
    lead: "Para avaliações em que evidência vem de várias fontes, precisa ser comparada com um critério e termina com gaps, limitações e uma conclusão profissional.",
    question: "O que foi pedido, o que foi fornecido, o que realmente sustenta a conclusão e o que continua faltando?",
    steps: [
      { number: "01", title: "Escopo esperado", body: "Declare população, janela, fontes e critérios antes de olhar o resultado." },
      { number: "02", title: "Coleta e provenance", body: "Vincule cada artifact à origem e à versão relevante." },
      { number: "03", title: "Gaps e exceções", body: "Separe não produzido, não fornecido, não localizado e indeterminado." },
      { number: "04", title: "Conclusão relativa", body: "A conclusão fica ligada ao escopo, basis, audiência e limitações declaradas." },
    ],
    evidence: [
      { number: "01", title: "Menos remontagem", body: "O mesmo job pode ser executado com estrutura consistente em avaliações recorrentes." },
      { number: "02", title: "Transparência de gaps", body: "Follow-ups deixam de se misturar com evidência originalmente fornecida." },
      { number: "03", title: "Reavaliação possível", body: "Outro profissional consegue inspecionar o expediente e entender o limite da conclusão." },
    ],
    limits: [
      { title: "Não substitui julgamento profissional.", body: "A plataforma organiza e preserva a base; a conclusão continua pertencendo ao avaliador responsável." },
      { title: "Não prova independência só por assinatura.", body: "Independência depende de fronteiras administrativas e do modelo de confiança declarado." },
    ],
  },
};
