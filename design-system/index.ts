import * as components from "./components";
import { copy } from "./copy";
import tokens from "./tokens.json";

export * from "./components";
export type { EvidenceState } from "./components";
export { copy, tokens };
// Module namespace for consumers migrating from the earlier Eveedence.* kit.
export const Eveedence = { ...components, copy, tokens } as const;
