"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { copy } from "../copy";
import { Button } from "./base";
import { SiteFooter, SiteHeader } from "./site";

const initial = { people: "", systems: "", policy: "", provenance: "", absence: "", hours: "", repeat: "" };
type Answers = typeof initial;
const options = {
  policy: [["complete", "Sim, a versão exata"], ["partial", "Tenho parte da informação"], ["missing", "Não localizamos a versão"], ["unknown", "Ainda não sabemos"]],
  absence: [["yes", "Sim, distinguimos os dois"], ["no", "Não fazemos essa distinção"], ["unknown", "Ainda não sabemos"]],
  repeat: [["yes", "Sim, sem ajuda privada"], ["help", "Só com ajuda da equipe"], ["no", "Não"], ["unknown", "Ainda não testamos"]],
} as const;
const labels: Record<keyof Answers, string> = {
  people: "Pessoas necessárias", systems: "Sistemas envolvidos", policy: "Versão da política",
  provenance: "Artefatos de origem desconhecida", absence: "Não produzido × não encontrado",
  hours: "Tempo estimado de reconstrução (horas)", repeat: "Repetibilidade por um terceiro",
};
const fields = Object.keys(initial) as (keyof Answers)[];

function display(key: keyof Answers, value: string) {
  if (key in options) return options[key as keyof typeof options].find(([candidate]) => candidate === value)?.[1] ?? value;
  return value;
}

export function ProofTest() {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [sheet, setSheet] = useState<Answers | null>(null);
  const [copied, setCopied] = useState(false);
  const update = (key: keyof Answers, value: string) => { setAnswers(previous => ({ ...previous, [key]: value })); setSheet(null); setCopied(false); };
  const gaps = sheet ? [
    sheet.policy !== "complete" ? "Localizar e vincular a versão exata da política." : null,
    Number(sheet.provenance) > 0 ? "Identificar a origem dos artefatos informados." : null,
    sheet.absence !== "yes" ? "Distinguir ausência de produção e ausência de localização." : null,
    sheet.repeat !== "yes" ? "Testar a reconstrução por uma pessoa externa à execução." : null,
  ].filter((gap): gap is string => Boolean(gap)) : [];

  return <div className="ev-root" data-ev-theme="light"><SiteHeader /><main className="ev-container ev-test"><p className="ev-eyebrow">Teste do Custo da Prova</p><h1>{copy.proofTitle}</h1><p className="ev-lead">Escolha um caso encerrado há pelo menos 90 dias. Responda com o que sua equipe sabe hoje.</p><p className="ev-caption">{copy.privacy}</p>
    <form className="ev-proof-form" onSubmit={event => { event.preventDefault(); setSheet({ ...answers }); setCopied(false); }}>
      {fields.map((key, index) => <label className="ev-field" key={key}><span><span className="ev-number">0{index + 1}</span>{labels[key]}</span>{key in options ? <select required value={answers[key]} onChange={event => update(key, event.target.value)}><option value="">Selecione uma resposta</option>{options[key as keyof typeof options].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select> : <input required type="number" min={key === "people" || key === "systems" ? 1 : 0} max={key === "hours" ? 100000 : 10000} step={key === "hours" ? "0.5" : "1"} value={answers[key]} onChange={event => update(key, event.target.value)} />}</label>)}
      <Button type="submit">Montar minha ficha <ArrowRight size={17} aria-hidden="true" /></Button>
    </form>
    {sheet ? <section className="ev-sheet" aria-live="polite"><p className="ev-eyebrow">Sua ficha de reconstrução</p><h2>O esforço que você informou.</h2><dl>{fields.map(key => <div key={key}><dt>{labels[key]}</dt><dd>{display(key, sheet[key])}</dd></div>)}</dl><p className="ev-caption">Insumos de reconstrução: {Number(sheet.people) + Number(sheet.systems)} = pessoas + sistemas. É uma contagem, não uma pontuação. Tempo: estimativa informada por você.</p><h3>O que ainda precisa ser investigado</h3>{gaps.length ? <ul>{gaps.map(gap => <li key={gap}>{gap}</li>)}</ul> : <p>As respostas não indicaram lacunas nas quatro perguntas qualitativas. Isso não estabelece suficiência ou integridade das evidências.</p>}<p>Próximo passo: reconstrua esse caso com sua equipe e compare o esforço real com a estimativa.</p><Button variant="secondary" onClick={async () => { const text = fields.map(key => labels[key] + ": " + display(key, sheet[key])).join("\n") + "\nLacunas: " + (gaps.join(" ") || "Nenhuma indicada nas respostas; evidências não avaliadas."); try { await navigator.clipboard.writeText(text); setCopied(true); } catch { setCopied(false); alert("Não foi possível copiar. Você pode selecionar o texto da ficha."); } }}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copied ? "Ficha copiada" : "Copiar ficha"}</Button></section> : null}
  </main><SiteFooter /></div>;
}
