"use client";

import { useState, type ReactNode, type ButtonHTMLAttributes } from "react";
import { ArrowRight, CheckCircle2, CircleDashed, CircleHelp, TriangleAlert, Menu, X, Search, Download, Package, Copy, Check } from "lucide-react";
import { copy } from "./copy";

export type EvidenceState = "verified" | "integrity" | "unverified" | "insufficient";
const states = {
  verified: { label: "Integridade verificada", icon: CheckCircle2 },
  integrity: { label: "Problema de integridade", icon: TriangleAlert },
  unverified: { label: "Ainda não verificada", icon: CircleDashed },
  insufficient: { label: "Informação insuficiente", icon: CircleHelp },
};

export function Brand() {
  return <img className="ev-logo" src="/brand/eveedence-logotipo.svg" alt="Eveedence" width={607} height={91} />;
}
export function Button({ variant = "primary", children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "brand" | "ghost"; children: ReactNode }) {
  return <button className={`ev-button ev-button--${variant} ${className}`} {...props}>{children}</button>;
}
export function StateBadge({ state, children, subtle = false }: { state: EvidenceState; children?: ReactNode; subtle?: boolean }) {
  const Icon = states[state].icon;
  return <span className={`ev-state ev-state--${state} ${subtle ? "ev-state--subtle" : ""}`}><Icon size={16} aria-hidden="true" />{children ?? states[state].label}</span>;
}
export function Tag({ children }: { children: ReactNode }) { return <span className="ev-tag">{children}</span>; }
export function SearchField({ label = "Buscar evidências", onChange }: { label?: string; onChange?: (value: string) => void }) {
  return <label className="ev-search"><Search size={19} aria-hidden="true" /><span className="ev-sr-only">{label}</span><input type="search" placeholder="Buscar por identificador, sistema ou decisão" onChange={e => onChange?.(e.target.value)} /></label>;
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="ev-header"><div className="ev-container ev-header__inner">
    <a href="/" aria-label="Eveedence — início"><Brand /></a>
    <button className="ev-menu-toggle" aria-label={open ? "Fechar navegação" : "Abrir navegação"} aria-expanded={open} aria-controls="ev-site-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="ev-site-nav" className={open ? "ev-nav is-open" : "ev-nav"} aria-label="Navegação principal">
      <a href="/#caso" onClick={() => setOpen(false)}>Um caso real</a><a href="/#como-funciona" onClick={() => setOpen(false)}>Como funciona</a><a href="/#solucoes" onClick={() => setOpen(false)}>Soluções</a>
      <a href="/custo-da-prova" className="ev-button ev-button--secondary" onClick={() => setOpen(false)}>Teste do Custo da Prova <ArrowRight size={15} aria-hidden="true" /></a>
    </nav>
  </div></header>;
}
const steps = [
  { title: "Detecção", body: "Alerta de acesso anômalo a um bucket.", source: "Monitoramento", date: "14 fev 2026 · 09:12 UTC" },
  { title: "Evidências observadas", body: "Logs de acesso e registro de resposta.", source: "Ticket", date: "14 fev · 09:40 UTC" },
  { title: "Avaliação de risco", body: "Dados de 214 titulares, sem campos sensíveis.", source: "Avaliação", date: "15 fev 2026" },
  { title: "Política vigente", body: "Política de notificação v3.4, em vigor desde 1 jan 2026.", source: "Documento" },
  { title: "Decisão", body: "Notificação não exigida.", source: "Registro", date: "16 fev 2026" },
  { title: "Aprovação do DPO", body: "Nenhum registro localizado.", source: "Aprovação", missing: true },
  { title: "Ações", body: "Três ações de contenção concluídas.", source: "Ticket", date: "17 fev 2026" },
];
export function CaseThread({ id = "hero-case-title" }: { id?: string }) {
  return <article className="ev-case" aria-labelledby={id}>
    <div className="ev-case__head"><div><p className="ev-eyebrow">Caso reconstruído</p><h2 id={id}>Incidente #1842<br />Notificação não exigida</h2></div><Tag>Exemplo ilustrativo</Tag></div>
    <ol className="ev-thread">{steps.map((step, index) => <li key={step.title} className={step.missing ? "ev-thread__step is-missing" : "ev-thread__step"}>
      <span className={index === 0 ? "ev-thread__point is-opening" : "ev-thread__point"} aria-hidden="true" />
      <div className="ev-thread__heading"><h3>{step.title}</h3><Tag>{step.source}</Tag></div><p>{step.body}</p>
      {step.date && <time>{step.date}</time>}{step.missing && <StateBadge state="insufficient" subtle />}
    </li>)}</ol>
    <div className="ev-case__foot"><span>6 de 7 elementos localizados</span><span>1 lacuna explícita</span></div>
    <p className="ev-case__scope">Presença de documentos. Integridade e suficiência ainda não avaliadas.</p>
  </article>;
}
export function Hero() {
  return <section className="ev-hero"><div className="ev-container ev-hero__grid"><div className="ev-hero__copy">
    <p className="ev-eyebrow ev-eyebrow--brand">{copy.eyebrow}</p><h1>{copy.hero}</h1><p className="ev-lead">{copy.lead}</p><p className="ev-body">{copy.intro}</p>
    <div className="ev-actions"><a className="ev-button ev-button--primary" href="/custo-da-prova">{copy.cta}<ArrowRight size={18} aria-hidden="true" /></a><a className="ev-button ev-button--secondary" href="/#como-funciona">{copy.secondary}</a></div>
    <p className="ev-caption">{copy.note}</p>
  </div><CaseThread /></div></section>;
}
export function QATable() {
  const rows = [
    ["O que aconteceu?", "Alerta e ações registrados", "Registros localizados"],
    ["Qual regra valia?", "Política de notificação v3.4", "Versão localizada"],
    ["Quem revisou?", "Aprovação do DPO", "Nenhum registro localizado"],
    ["Isso sustenta a conclusão?", "Critério de aceitação da audiência", "Ainda não avaliado"],
  ];
  return <div className="ev-qa" role="region" tabIndex={0} aria-label="Perguntas e evidências do exemplo"><table><caption>Exemplo ilustrativo · o registro encontrado e a pergunta que ele precisa responder</caption><thead><tr><th>Pergunta</th><th>O que procurar</th><th>O que temos</th></tr></thead><tbody>{rows.map((row,i) => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{i > 1 ? <StateBadge state="insufficient">{row[2]}</StateBadge> : row[2]}</td></tr>)}</tbody></table></div>;
}
export function ProofTeaser() {
  return <section className="ev-proof-teaser"><div className="ev-container"><p className="ev-eyebrow">Custo da Prova</p><div className="ev-proof-teaser__grid"><h2>A decisão levou minutos.<br />E provar, meses depois?</h2><div><p>Conte os sistemas. As pessoas. As versões que faltam. Comece por um caso que sua equipe já encerrou.</p><a className="ev-button ev-button--inverse" href="/custo-da-prova">Fazer o teste <ArrowRight size={18} aria-hidden="true" /></a></div></div></div></section>;
}
export function SiteFooter() {
  return <footer className="ev-footer"><div className="ev-container ev-footer__inner"><Brand /><p>Evidence Operations<br /><span>Para quando alguém pergunta “prove”.</span></p><a href="/design-system">Design system</a></div></footer>;
}
export function SiteHome() {
  return <div className="ev-root" data-ev-theme="light"><a className="ev-skip" href="#conteudo">Pular para conteúdo</a><SiteHeader /><main id="conteudo"><Hero />
    <section className="ev-section ev-section--subtle"><div className="ev-container"><p className="ev-eyebrow">O problema</p><h2>O trabalho terminou.<br />A pergunta pode vir depois.</h2><div className="ev-scatter"><div><span className="ev-number">01</span><h3>O fato está num sistema.</h3><p>O registro existe, mas precisa ser encontrado.</p></div><div><span className="ev-number">02</span><h3>A regra está em outro.</h3><p>A versão de hoje pode não ser a versão usada.</p></div><div><span className="ev-number">03</span><h3>A explicação está com alguém.</h3><p>Conhecimento humano vira trabalho de reconstrução.</p></div></div></div></section>
    <section id="caso" className="ev-section"><div className="ev-container"><p className="ev-eyebrow">Can you prove it?</p><h2>Uma conclusão.<br />Quatro perguntas antes de aceitá-la.</h2><QATable /></div></section>
    <section id="como-funciona" className="ev-section ev-section--subtle"><div className="ev-container"><p className="ev-eyebrow">Como começar</p><h2>Reconstrua um caso.<br />Meça o esforço de provar.</h2><div className="ev-how">{[["Escolha a pergunta","Uma decisão, incidente ou controle encerrado há pelo menos 90 dias."],["Mapeie as evidências","Identifique fontes, pessoas, versões e o critério de quem avaliará a resposta."],["Declare as lacunas","Distinga o que não foi produzido do que ainda não foi encontrado."]].map(([title,body],i)=><div key={title}><span className="ev-number">0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div><aside className="ev-callout">O teste organiza suas respostas. Não verifica documentos nem emite um veredito de conformidade.</aside></div></section>
    <section id="solucoes" className="ev-section"><div className="ev-container"><p className="ev-eyebrow">Por onde começar</p><h2>O mesmo problema.<br />Três formas de ele aparecer.</h2><div className="ev-solutions">{[["Incident Evidence","O que aconteceu, quem respondeu e qual critério orientou a conclusão."],["Decision Evidence","Qual versão decidiu, qual regra valia e quem revisou o resultado."],["Assurance Evidence","O que foi pedido, o que sustenta a resposta e o que ainda falta."]].map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <ProofTeaser /><section className="ev-section"><div className="ev-container ev-tech"><p className="ev-eyebrow">Abordagem técnica</p><p>Presença, integridade e suficiência são perguntas diferentes. Um documento assinado não prova, sozinho, que a conclusão está correta.</p><span className="ev-caption">Pesquisa evdnce · arquitetura em desenvolvimento; esta demonstração não apresenta um padrão público congelado.</span></div></section>
  </main><SiteFooter /></div>;
}

const initial = {people:"", systems:"", policy:"", provenance:"", absence:"", hours:"", repeat:""};
type Answers = typeof initial;
export function ProofTest() {
  const [answers,setAnswers]=useState<Answers>(initial);
  const [sheet,setSheet]=useState<Answers|null>(null);
  const [copied,setCopied]=useState(false);
  const update=(key:keyof Answers,value:string)=>{setAnswers(prev=>({...prev,[key]:value}));setSheet(null);setCopied(false);};
  const options={policy:[["complete","Sim, a versão exata"],["partial","Tenho parte da informação"],["missing","Não localizamos a versão"],["unknown","Ainda não sabemos"]],absence:[["yes","Sim, distinguimos os dois"],["no","Não fazemos essa distinção"],["unknown","Ainda não sabemos"]],repeat:[["yes","Sim, sem ajuda privada"],["help","Só com ajuda da equipe"],["no","Não"],["unknown","Ainda não testamos"]]};
  const labels={people:"Pessoas necessárias",systems:"Sistemas envolvidos",policy:"Versão da política",provenance:"Artefatos de origem desconhecida",absence:"Não produzido × não encontrado",hours:"Tempo estimado de reconstrução (horas)",repeat:"Repetibilidade por um terceiro"};
  const fields=(Object.keys(initial) as (keyof Answers)[]);
  const show=(key:keyof Answers,value:string)=> key in options ? options[key as keyof typeof options].find(([v])=>v===value)?.[1] ?? value : value;
  const gaps=sheet?[sheet.policy!=="complete"?"Localizar e vincular a versão exata da política.":null,Number(sheet.provenance)>0?"Identificar a origem dos artefatos informados.":null,sheet.absence!=="yes"?"Distinguir ausência de produção e ausência de localização.":null,sheet.repeat!=="yes"?"Testar a reconstrução por uma pessoa externa à execução.":null].filter(Boolean):[];
  return <div className="ev-root" data-ev-theme="light"><SiteHeader /><main className="ev-container ev-test"><p className="ev-eyebrow">Teste do Custo da Prova</p><h1>{copy.proofTitle}</h1><p className="ev-lead">Escolha um caso encerrado há pelo menos 90 dias. Responda com o que sua equipe sabe hoje.</p><p className="ev-caption">{copy.privacy}</p>
  <form className="ev-proof-form" onSubmit={e=>{e.preventDefault();setSheet({...answers});setCopied(false);}}>
    {fields.map((key,i)=><label className="ev-field" key={key}><span><span className="ev-number">0{i+1}</span>{labels[key]}</span>{key in options?<select required value={answers[key]} onChange={e=>update(key,e.target.value)}><option value="">Selecione uma resposta</option>{options[key as keyof typeof options].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select>:<input required type="number" min={key==="people"||key==="systems"?1:0} max={key==="hours"?100000:10000} step={key==="hours"?"0.5":"1"} value={answers[key]} onChange={e=>update(key,e.target.value)} />}</label>)}
    <Button type="submit">Montar minha ficha <ArrowRight size={17} aria-hidden="true" /></Button>
  </form>
  {sheet&&<section className="ev-sheet" aria-live="polite"><p className="ev-eyebrow">Sua ficha de reconstrução</p><h2>O esforço que você informou.</h2><dl>{fields.map(key=><div key={key}><dt>{labels[key]}</dt><dd>{show(key,sheet[key])}</dd></div>)}</dl><p className="ev-caption">Insumos de reconstrução: {Number(sheet.people)+Number(sheet.systems)} = pessoas + sistemas. É uma contagem, não uma pontuação. Tempo: estimativa informada por você.</p><h3>O que ainda precisa ser investigado</h3>{gaps.length?<ul>{gaps.map(gap=><li key={gap}>{gap}</li>)}</ul>:<p>As respostas não indicaram lacunas nas quatro perguntas qualitativas. Isso não estabelece suficiência ou integridade das evidências.</p>}<p>Próximo passo: reconstrua esse caso com sua equipe e compare o esforço real com a estimativa.</p><Button variant="secondary" onClick={async()=>{const text=fields.map(key=>labels[key]+": "+show(key,sheet[key])).join("\n")+"\nLacunas: "+(gaps.join(" ")||"Nenhuma indicada nas respostas; evidências não avaliadas.");try{await navigator.clipboard.writeText(text);setCopied(true);}catch{setCopied(false);alert("Não foi possível copiar. Você pode selecionar o texto da ficha.");}}}>{copied?<Check size={16} aria-hidden="true" />:<Copy size={16} aria-hidden="true" />}{copied?"Ficha copiada":"Copiar ficha"}</Button></section>}
  </main><SiteFooter /></div>;
}
export function ComponentExamples() {
  return <><div className="ev-example"><p className="ev-eyebrow">Botões · alvo mínimo de 44 px</p><div className="ev-demo-row"><Button><Download size={17} aria-hidden="true" />Exportar consulta</Button><Button variant="brand">Ação de marca</Button><Button variant="secondary">Limpar</Button><Button disabled>Desativado</Button></div></div><div className="ev-example"><p className="ev-eyebrow">Estados · ícone e palavra bastam</p><div className="ev-demo-row">{(Object.keys(states) as EvidenceState[]).map(state=><StateBadge state={state} key={state}/>)}</div><div className="ev-demo-row"><StateBadge state="integrity">Assinatura não verificável</StateBadge><StateBadge state="unverified">Timestamp provisório</StateBadge></div><p className="ev-caption">Assinada descreve presença de uma assinatura; integridade verificada exige uma verificação executada.</p></div><div className="ev-example"><SearchField /></div><div className="ev-example ev-demo-row"><Tag>decision</Tag><Tag>observation</Tag><Tag>Controle</Tag><Tag>Exemplo ilustrativo</Tag></div></>;
}
export { ArrowRight, Package };
