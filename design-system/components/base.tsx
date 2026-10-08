"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { CheckCircle2, CircleDashed, CircleHelp, TriangleAlert, Search } from "lucide-react";

export type EvidenceState = "verified" | "integrity" | "unverified" | "insufficient";
export type EvidenceDimension = "integrity" | "attestation" | "assurance" | "capture";

const statePresentation = {
  verified: { label: "Verificado", icon: CheckCircle2 },
  integrity: { label: "Problema detectado", icon: TriangleAlert },
  unverified: { label: "Ainda não avaliado", icon: CircleDashed },
  insufficient: { label: "Informação insuficiente", icon: CircleHelp },
} as const;

const dimensionLabels: Record<EvidenceDimension, string> = {
  integrity: "Integridade",
  attestation: "Attestation",
  assurance: "Assurance",
  capture: "Captura",
};

export function Brand() {
  return <img className="ev-logo" src="/brand/eveedence-logotipo.svg" alt="Eveedence" width={607} height={91} />;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "brand" | "ghost"; children: ReactNode }) {
  return <button className={"ev-button ev-button--" + variant + " " + className} {...props}>{children}</button>;
}

export function StateBadge({ state, children, subtle = false }: { state: EvidenceState; children?: ReactNode; subtle?: boolean }) {
  const Icon = statePresentation[state].icon;
  return <span className={"ev-state ev-state--" + state + (subtle ? " ev-state--subtle" : "")}><Icon size={16} aria-hidden="true" />{children ?? statePresentation[state].label}</span>;
}

export function EvidenceStateBadge({ dimension, state, label }: { dimension: EvidenceDimension; state: EvidenceState; label?: string }) {
  return <span className="ev-dimension-state"><span className="ev-dimension-state__dimension">{dimensionLabels[dimension]}</span><StateBadge state={state}>{label}</StateBadge></span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="ev-tag">{children}</span>;
}

export function SearchField({ label = "Buscar evidências", onChange }: { label?: string; onChange?: (value: string) => void }) {
  return <label className="ev-search"><Search size={19} aria-hidden="true" /><span className="ev-sr-only">{label}</span><input type="search" placeholder="Buscar por identificador, sistema ou decisão" onChange={event => onChange?.(event.target.value)} /></label>;
}

export function MetadataItem({ label, value, mono = false }: { label: string; value: ReactNode; mono?: boolean }) {
  return <div className="ev-meta-item"><dt>{label}</dt><dd className={mono ? "is-mono" : undefined}>{value}</dd></div>;
}

export function MetadataList({ items }: { items: ReadonlyArray<{ label: string; value: ReactNode; mono?: boolean }> }) {
  return <dl className="ev-meta-list">{items.map(item => <MetadataItem key={item.label} label={item.label} value={item.value} mono={item.mono} />)}</dl>;
}
