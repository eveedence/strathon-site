
"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Brand } from "./components/base";
import { ComponentExamples } from "./components/product";
import tokens from "./tokens.json";

const sections=[["marca","Marca"],["cores","Cores e temas"],["tipografia","Tipografia"],["componentes","Componentes"],["site","Site"]];
const palette=["brand-signature","brand-600","brand-900","ink-900","ink-500","mist-050"] as const;
const semantic=["surface-app","surface-card","surface-sunken","text-primary","text-secondary","text-muted","border-control","action-brand"] as const;

export default function DesignGuide(){
const [theme,setTheme]=useState<"light"|"dark">("light");
return <div className="ds-root" data-ev-theme={theme}><a className="ev-skip" href="#ds-content">Pular para conteúdo</a>
<header className="ds-topbar"><a href="/" aria-label="Eveedence — início"><Brand /></a><div className="ds-topbar-right"><span>Design system · v0.2 RC</span><div className="ds-theme" role="group" aria-label="Tema da prévia"><button aria-pressed={theme==="light"} onClick={()=>setTheme("light")}>Claro</button><button aria-pressed={theme==="dark"} onClick={()=>setTheme("dark")}>Escuro</button></div><a href="/">Ver o site <ArrowRight size={14} aria-hidden="true" /></a></div></header>
<div className="ds-layout"><aside className="ds-sidebar"><p>Fundamentos e aplicações</p><nav aria-label="Seções do design system">{sections.map(([id,label],i)=><a key={id} href={"#"+id}><span>0{i+1}</span>{label}</a>)}</nav></aside>
<main id="ds-content" className="ds-main"><div className="ds-intro"><div><p className="ev-eyebrow ev-eyebrow--brand">Eveedence · Evidence Operations</p><h1>A mesma marca.<br />Mais evidência.</h1><p>Um sistema para perguntar, reconstruir e mostrar o que sustenta uma conclusão.</p></div><p className="ds-intro-note">v0.2 RC candidata ao congelamento. Wordmark-only. Site e produto compartilham primitives → semantics → components; o tema escuro continua em avaliação.</p></div>
<section id="marca" className="ds-section"><div className="ds-section-head"><h2>01 · Um logotipo, uma identidade.</h2><p className="ev-eyebrow">Geometria original preservada</p></div><div className="ds-brand-grid"><div className="ds-brand-plate"><p className="ev-eyebrow">Logotipo · original</p><Brand /><p className="ev-caption">607 × 91 · preserve a proporção</p></div><div className="ds-brand-plate ds-brand-plate--dark"><p className="ev-eyebrow">Logotipo · fundo escuro</p><Brand /><p className="ev-eyebrow">Mesmo ativo · sem recoloração</p></div></div><p className="ds-note">O vermelho de identidade é #FF0004. O SVG oficial é usado sem redesenho, tagline ou recoloração. Respiro proposto: ao menos ¼ da altura do ativo em cada lado. A identidade não representa status “verificado”. O símbolo anterior foi retirado das aplicações.</p></section>
<section id="cores" className="ds-section"><div className="ds-section-head"><h2>02 · Primitives → semantics → components.</h2><p className="ev-eyebrow">{theme==="light"?"Tema claro":"Tema escuro · proposta"}</p></div><div className="ds-swatches">{palette.map(key=><div className="ds-swatch" key={key}><div className="ds-swatch-color" style={{background:tokens.primitives[key]}}/><div className="ds-swatch-meta"><span>{key}</span><code>{tokens.primitives[key]}</code></div></div>)}</div><div className="ds-semantic">{semantic.map(key=><div className="ds-token" key={key}><span className="ds-token-color" style={{background:tokens[theme][key]}} aria-hidden="true"/><span>{key}</span><code>{tokens[theme][key]}</code></div>)}</div><p className="ds-note">Semantics só podem apontar para primitives. Componentes só consomem semantics. O gerador falha se encontrar cor hexadecimal hardcoded em eveedence.css ou semantic token com valor literal.</p></section>
<section id="tipografia" className="ds-section"><div className="ds-section-head"><h2>03 · A pergunta primeiro.</h2><p className="ev-eyebrow">Geist Sans + Geist Mono</p></div>{[
["t-site-display","Quando alguém pedir para provar.",52,650,false,"52–62 px · mobile 40 px"],
["t-page-title","O que sustenta a conclusão?",27,600,false,"27 px / 1.2 · produto"],
["t-section-title","Um caso, uma pergunta.",17,600,false,"17 px / 1.35 · produto"],
["t-site-lead","O fato, a regra e o que ainda falta.",20,400,false,"20 px / 1.55 · site"],
["t-body","Presença de um registro não estabelece integridade.",14,400,false,"14 px / 1.6 · produto"],
["t-body-sm","Nenhum registro de aprovação localizado.",13,400,false,"13 px / 1.6 · produto"],
["t-caption","Exemplo ilustrativo. Suficiência ainda não avaliada.",12.5,400,false,"12.5 px / 1.6"],
["t-control","Reconstrua um caso real",13,600,false,"13 px · alvo mínimo 44 px"],
["t-site-body","Qual era a versão da política no dia da decisão?",16,400,false,"16 px / 1.6 · site"],
["t-site-eyebrow","INCIDENTE #1842 · 14 FEV 2026 · 09:12 UTC",11,500,true,"11 px / 1.6 · identificadores e metadados"]
].map(([name,text,size,weight,mono,note])=><div className="ds-type-row" key={String(name)}><div>{name}</div><div><p style={{fontSize:Number(size),fontWeight:Number(weight),fontFamily:mono?"var(--ev-font-mono)":"var(--ev-font-sans)"}}>{text}</p><small>{note}</small></div></div>)}<p className="ds-note">O lettering do logotipo é um ativo, não uma fonte para interface. Os títulos serifados do editor original não fazem parte da tipografia da marca.</p><div className="ds-spacing" style={{marginTop:32}}>{[4,8,12,16,24,32,48].map(n=><div key={n}><i style={{height:n}}/>{n} px</div>)}</div><p className="ds-note">Base de 4 px. Raios candidatos da v0.2: controles 8 px, cards 12 px, shells 16 px; pill apenas para estados e chips.</p></section>
<section id="componentes" className="ds-section"><div className="ds-section-head"><h2>04 · Site e produto compartilham regras, não semântica falsa.</h2><p className="ev-eyebrow">Produto + site</p></div><ComponentExamples/><p className="ds-note">EvidenceRow, SidebarNav, metadata primitives e EvidenceStateBadge fazem parte da superfície candidata. Estados sempre declaram a dimensão avaliada; não existe um semáforo universal de compliance.</p></section>
<section id="site" className="ds-section"><div className="ds-section-head"><h2>05 · O site é composição do sistema.</h2><p className="ev-eyebrow">Home + Teste do Custo da Prova</p></div><div className="ds-preview"><div className="ds-preview-bar"><span>Home · tema claro · exemplos ilustrativos</span><a href="/">Abrir em tamanho real <ArrowRight size={14} aria-hidden="true"/></a></div><iframe src="/" title="Prévia da home Eveedence" loading="lazy"/></div><p className="ds-note">A home e as páginas de solução usam Section, EvidenceScatter, HowSteps, Callout, SolutionCard, NotCard, TechNote e PageHero. O teste cria uma ficha com as respostas informadas; não envia dados, não calcula score e não avalia documentos.</p><a className="ev-button ev-button--secondary" style={{marginTop:20}} href="/custo-da-prova">Abrir Teste do Custo da Prova <ArrowRight size={16} aria-hidden="true"/></a></section>
<p className="ds-source-note">Design System v0.2 RC · candidato ao congelamento · wordmark-only · tokens gerados de um único JSON · tema escuro ainda não é superfície pública padrão.</p>
</main></div></div>;
}
