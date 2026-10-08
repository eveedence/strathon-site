import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(fs.readFileSync(path.join(dir, "tokens.json"), "utf8"));
const primitiveRef = /^\{([^}]+)\}$/;
function resolveValue(value) {
  const match = primitiveRef.exec(value);
  if (!match) throw new Error(`Semantic token '${value}' must reference a primitive as {token-name}.`);
  const primitive = tokens.primitives[match[1]];
  if (!primitive) throw new Error(`Unknown primitive '${match[1]}'.`);
  return primitive;
}
const resolveMap = values => Object.fromEntries(Object.entries(values).map(([key,value]) => [key,resolveValue(value)]));
const light=resolveMap(tokens.light); const dark=resolveMap(tokens.dark);
const declarations=values=>Object.entries(values).map(([key,value])=>`  --ev-${key}: ${value};`).join("\n");
const css=`/* Generated from design-system/tokens.json. Run node design-system/generate-tokens.mjs. */\n:root, [data-ev-theme='light'] {\n${declarations({...tokens.primitives,...light})}\n}\n[data-ev-theme='dark'] {\n${declarations(dark)}\n}\n`;
fs.writeFileSync(path.join(dir,"tokens.css"),css);

const sourceCss=fs.readFileSync(path.join(dir,"eveedence.css"),"utf8");
const hardcodedHex=[...sourceCss.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(match=>match[0]);
if(hardcodedHex.length) throw new Error(`Hardcoded hex colors are not allowed in eveedence.css: ${[...new Set(hardcodedHex)].join(", ")}`);

const luminance=hex=>{const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
let failed=false; const report=[];
for(const [name,theme] of [["light",light],["dark",dark]]){
  const pairs=[];
  for(const fg of ["text-primary","text-secondary","text-muted"]) for(const bg of ["surface-app","surface-card","surface-subtle","surface-sunken"]) pairs.push([fg,bg,4.5]);
  pairs.push(["text-on-inverse","surface-inverse",4.5],["text-on-inverse-muted","surface-inverse",4.5],["action-on-primary","action-primary",4.5],["action-on-primary","action-primary-hover",4.5],["action-on-brand","action-brand",4.5],["action-on-brand","action-brand-hover",4.5],["action-on-inverse","action-inverse",4.5],["action-on-inverse","action-inverse-hover",4.5],["link","surface-app",4.5],["link","surface-card",4.5],["border-control","surface-card",3],["border-control","surface-app",3],["border-control","surface-sunken",3],["border-on-inverse","surface-inverse",3],["focus","surface-card",3],["focus-inverse","surface-inverse",3]);
  for(const state of ["verified","integrity","unverified","insufficient"]) pairs.push([`state-${state}-fg`,`state-${state}-bg`,4.5]);
  for(const [foreground,background,minimum] of pairs){const contrast=ratio(theme[foreground],theme[background]);const row={theme:name,foreground,background,ratio:Number(contrast.toFixed(2)),minimum,pass:contrast>=minimum};report.push(row);if(!row.pass) failed=true}
}
fs.writeFileSync(path.join(dir,"contrast-report.json"),JSON.stringify({scope:"Token pairs only; not a complete accessibility audit",pairs:report},null,2)+"\n");
console.log(`${report.length} token pairs checked; ${report.filter(row=>!row.pass).length} failures.`);
console.log(`Signature red on white: ${ratio(tokens.primitives["brand-signature"],tokens.primitives.white).toFixed(2)}:1. Identity artwork only; not small text with white foreground.`);
console.log("Semantic tokens resolve only from primitives; eveedence.css contains no hardcoded hex colors.");
if(failed) process.exitCode=1;
