"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { copy } from "../copy";
import { Brand, StateBadge, Tag } from "./base";
import {
  caseSteps, homeHowSteps, homeScatterItems, notCards, qaRows, solutionCards, solutionContent,
  type SiteCard, type SiteStep, type SolutionKind,
} from "./site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="ev-header"><div className="ev-container ev-header__inner">
    <a href="/" aria-label="Eveedence — início"><Brand /></a>
    <button className="ev-menu-toggle" aria-label={open ? "Fechar navegação" : "Abrir navegação"} aria-expanded={open} aria-controls="ev-site-nav" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    <nav id="ev-site-nav" className={open ? "ev-nav is-open" : "ev-nav"} aria-label="Navegação principal">
      <a href="/#caso" onClick={() => setOpen(false)}>Um caso</a>
      <a href="/#como-funciona" onClick={() => setOpen(false)}>Como funciona</a>
      <a href="/#solucoes" onClick={() => setOpen(false)}>Soluções</a>
      <a href="/assurance" onClick={() => setOpen(false)}>Para firmas de assurance</a>
      <a href="/custo-da-prova" className="ev-button ev-button--secondary" onClick={() => setOpen(false)}>Teste do Custo da Prova <ArrowRight size={15} aria-hidden="true" /></a>
    </nav>
  </div></header>;
}

export function Section({ id, eyebrow, title, subtle = false, children, className = "" }: { id?: string; eyebrow?: string; title?: ReactNode; subtle?: boolean; children: ReactNode; className?: string }) {
  return <section id={id} className={"ev-section" + (subtle ? " ev-section--subtle" : "") + (className ? " " + className : "")}><div className="ev-container">{eyebrow ? <p className="ev-eyebrow">{eyebrow}</p> : null}{title ? <h2>{title}</h2> : null}{children}</div></section>;
}

export function EvidenceScatter({ items = homeScatterItems }: { items?: ReadonlyArray<SiteStep> }) {
  return <div className="ev-scatter">{items.map(item => <div key={item.number}><span className="ev-number">{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>;
}

export function HowSteps({ steps = homeHowSteps }: { steps?: ReadonlyArray<SiteStep> }) {
  return <div className="ev-how">{steps.map(step => <div key={step.number + "-" + step.title}><span className="ev-number">{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <aside className="ev-callout">{children}</aside>;
}

export function SolutionCard({ title, body, href }: { title: string; body: string; href?: string }) {
  const bodyContent = <><h3>{title}</h3><p>{body}</p>{href ? <span className="ev-card-link">Entenda o Evidence Job <ArrowRight size={15} aria-hidden="true" /></span> : null}</>;
  return href ? <a className="ev-solution-card" href={href}>{bodyContent}</a> : <article className="ev-solution-card">{bodyContent}</article>;
}

export function NotCard({ title, body }: SiteCard) {
  return <article className="ev-not-card"><h3>{title}</h3><p>{body}</p></article>;
}

export function TechNote({ children, caption = "Pesquisa evdnce · arquitetura em desenvolvimento; esta demonstração não apresenta um padrão público congelado." }: { children?: ReactNode; caption?: string }) {
  return <Section id="abordagem-tecnica" eyebrow="Abordagem técnica"><div className="ev-tech"><p>{children ?? "Presença, integridade e suficiência são perguntas diferentes. Um documento assinado não prova, sozinho, que a conclusão está correta."}</p><span className="ev-caption">{caption}</span></div></Section>;
}

export function CaseThread({ id = "hero-case-title" }: { id?: string }) {
  return <article className="ev-case" aria-labelledby={id}>
    <div className="ev-case__head"><div><p className="ev-eyebrow">Caso reconstruído</p><h2 id={id}>Incidente #1842<br />Notificação não exigida</h2></div><Tag>Exemplo ilustrativo</Tag></div>
    <ol className="ev-thread">{caseSteps.map((step, index) => <li key={step.title} className={step.missing ? "ev-thread__step is-missing" : "ev-thread__step"}>
      <span className={index === 0 ? "ev-thread__point is-opening" : "ev-thread__point"} aria-hidden="true" />
      <div className="ev-thread__heading"><h3>{step.title}</h3><Tag>{step.source}</Tag></div><p>{step.body}</p>
      {step.date ? <time>{step.date}</time> : null}{step.missing ? <StateBadge state="insufficient" subtle /> : null}
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

export function PageHero({ eyebrow, title, lead, cta = "Teste seu Custo da Prova" }: { eyebrow: string; title: string; lead: string; cta?: string }) {
  return <section className="ev-page-hero"><div className="ev-container"><p className="ev-eyebrow ev-eyebrow--brand">{eyebrow}</p><h1>{title}</h1><p className="ev-lead">{lead}</p><div className="ev-actions"><a className="ev-button ev-button--primary" href="/custo-da-prova">{cta}<ArrowRight size={18} aria-hidden="true" /></a><a className="ev-button ev-button--secondary" href="/#como-funciona">Como trabalhamos</a></div></div></section>;
}

export function QATable() {
  return <div className="ev-qa" role="region" tabIndex={0} aria-label="Perguntas e evidências do exemplo"><table><caption>Exemplo ilustrativo · o registro encontrado e a pergunta que ele precisa responder</caption><thead><tr><th>Pergunta</th><th>O que procurar</th><th>O que temos</th></tr></thead><tbody>{qaRows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[3] === "missing" ? <StateBadge state="insufficient">{row[2]}</StateBadge> : row[3] === "unverified" ? <StateBadge state="unverified">{row[2]}</StateBadge> : row[2]}</td></tr>)}</tbody></table></div>;
}

export function ProofTeaser() {
  return <section className="ev-proof-teaser"><div className="ev-container"><p className="ev-eyebrow">Custo da Prova</p><div className="ev-proof-teaser__grid"><h2>A decisão levou minutos.<br />E provar, meses depois?</h2><div><p>Conte os sistemas. As pessoas. As versões que faltam. Comece por um caso que sua equipe já encerrou.</p><a className="ev-button ev-button--inverse" href="/custo-da-prova">Fazer o teste <ArrowRight size={18} aria-hidden="true" /></a></div></div></div></section>;
}

export function SiteFooter() {
  return <footer className="ev-footer"><div className="ev-container ev-footer__inner"><Brand /><p>Evidence Operations<br /><span>Para quando alguém pergunta “prove”.</span></p><nav aria-label="Rodapé"><a href="/custo-da-prova">Teste do Custo da Prova</a><a href="/#abordagem-tecnica">Abordagem técnica</a></nav></div></footer>;
}

export function SiteHome() {
  return <div className="ev-root" data-ev-theme="light"><a className="ev-skip" href="#conteudo">Pular para conteúdo</a><SiteHeader /><main id="conteudo"><Hero />
    <Section eyebrow="O problema" title={<>O trabalho terminou.<br />A pergunta pode vir depois.</>} subtle><EvidenceScatter /></Section>
    <Section id="caso" eyebrow="Can you prove it?" title={<>Uma conclusão.<br />Quatro perguntas antes de aceitá-la.</>}><QATable /></Section>
    <Section id="como-funciona" eyebrow="Como começar" title={<>Reconstrua um caso.<br />Meça o esforço de provar.</>} subtle><HowSteps /><Callout>O teste organiza suas respostas. Não verifica documentos nem emite um veredito de conformidade.</Callout></Section>
    <Section id="solucoes" eyebrow="Por onde começar" title={<>O mesmo problema.<br />Três formas de ele aparecer.</>}><div className="ev-solutions">{solutionCards.map(card => <SolutionCard key={card.title} title={card.title} body={card.body} href={card.href} />)}</div></Section>
    <Section eyebrow="O que não somos" title={<>Você não precisa trocar<br />as ferramentas que já executam o trabalho.</>} subtle><p className="ev-section-lead">Seu SIEM, GRC, KYC, ticketing ou case management continuam fazendo o que fazem. A Eveedence organiza a evidência produzida por eles e deixa explícito o limite da conclusão.</p><div className="ev-not-grid">{notCards.map(card => <NotCard key={card.title} title={card.title} body={card.body} />)}</div></Section>
    <ProofTeaser /><TechNote />
  </main><SiteFooter /></div>;
}

export function SolutionDetail({ kind }: { kind: SolutionKind }) {
  const page = solutionContent[kind];
  return <div className="ev-root" data-ev-theme="light"><a className="ev-skip" href="#conteudo">Pular para conteúdo</a><SiteHeader /><main id="conteudo"><PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
    <Section eyebrow="A pergunta" title="Comece pelo que alguém precisará conseguir responder."><Callout><strong>{page.question}</strong></Callout></Section>
    <Section eyebrow="O Evidence Job" title="A resposta precisa ser composta, não lembrada." subtle><HowSteps steps={page.steps} /></Section>
    <Section eyebrow="O que a Eveedence organiza" title="Evidência com origem, versão e limite explícitos."><EvidenceScatter items={page.evidence} /></Section>
    <Section eyebrow="Limites" title="Provar melhor não transforma a evidência em algo que ela não é." subtle><div className="ev-not-grid">{page.limits.map(limit => <NotCard key={limit.title} title={limit.title} body={limit.body} />)}</div></Section>
    <ProofTeaser /><TechNote />
  </main><SiteFooter /></div>;
}

export function AssuranceFirmsPage() {
  const steps: ReadonlyArray<SiteStep> = [
    { number: "01", title: "Repita o mesmo Evidence Job", body: "Use uma estrutura consistente entre clientes sem padronizar a conclusão profissional." },
    { number: "02", title: "Separe coleta de julgamento", body: "Artifacts, gaps e follow-ups ficam distinguíveis da conclusão do avaliador." },
    { number: "03", title: "Entregue um expediente reavaliável", body: "O cliente consegue entender o que foi considerado, o que faltou e o limite da conclusão." },
  ];
  const benefits: ReadonlyArray<SiteStep> = [
    { number: "01", title: "Margem", body: "Reduza trabalho humano repetitivo de pedir, organizar, versionar e remontar evidências." },
    { number: "02", title: "Consistência", body: "A mesma metodologia operacional pode ser aplicada em múltiplos clientes e ciclos." },
    { number: "03", title: "Defensabilidade", body: "Base, escopo, evidência e limitações permanecem ligados ao trabalho entregue." },
  ];
  return <div className="ev-root" data-ev-theme="light"><a className="ev-skip" href="#conteudo">Pular para conteúdo</a><SiteHeader /><main id="conteudo"><PageHero eyebrow="Para firmas de assurance" title="Menos tempo montando o expediente. Mais tempo avaliando evidência." lead="A Eveedence ajuda firmas de assurance, cyber e consultorias a estruturar o trabalho repetitivo de evidência sem substituir independência, julgamento profissional ou a conclusão do avaliador." cta="Mapeie um Evidence Job" />
    <Section eyebrow="Onde a margem some" title="A avaliação termina. A montagem do pacote começa de novo."><EvidenceScatter items={benefits} /></Section>
    <Section eyebrow="Como trabalhar" title="Estruture a operação sem automatizar o julgamento." subtle><HowSteps steps={steps} /><Callout>A Eveedence não assina sua conclusão nem transforma a plataforma em auditor. Ela organiza o que foi pedido, fornecido, avaliado e declarado como gap.</Callout></Section>
    <Section eyebrow="Modelo de parceria" title="Um parceiro pode operar o mesmo padrão de Evidence Operations em vários clientes."><div className="ev-assurance-model"><div><span className="ev-number">PARTNER</span><strong>Firma de assurance</strong><p>Metodologia, relação com o cliente e conclusão profissional.</p></div><ArrowRight aria-hidden="true" /><div><span className="ev-number">EVIDENCE OPS</span><strong>Eveedence</strong><p>Estrutura, provenance, version binding, gaps e expediente.</p></div><ArrowRight aria-hidden="true" /><div><span className="ev-number">CLIENTES</span><strong>Múltiplos engagements</strong><p>Mesma operação de prova, escopos e conclusões separados.</p></div></div></Section>
    <Section eyebrow="O que não muda" title="A ferramenta não cria independência por conta própria." subtle><div className="ev-not-grid"><NotCard title="O julgamento continua sendo seu." body="A Eveedence não decide se a evidência é suficiente para o trabalho profissional sem o critério e a avaliação responsáveis." /><NotCard title="O avaliador não deve avaliar o próprio trabalho." body="A composição de evidência não remove requisitos de independência, segregação ou conflito de interesse aplicáveis ao engagement." /></div></Section>
    <ProofTeaser /><TechNote />
  </main><SiteFooter /></div>;
}
