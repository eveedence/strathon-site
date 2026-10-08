import * as components from "./components";
import { copy } from "./copy";
import tokens from "./tokens.json";

export * from "./components";
export type { EvidenceState, EvidenceDimension, SolutionKind } from "./components";
export { copy, tokens };
export const Eveedence = { ...components, copy, tokens } as const;
