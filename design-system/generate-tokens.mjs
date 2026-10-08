import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dir=path.dirname(fileURLToPath(import.meta.url));
const tokens=JSON.parse(fs.readFileSync(path.join(dir,"tokens.json"),"utf8"));
const declarations = values => Object.entries(values).map(([key,value])=>"  --ev-"+key+": "+value+";").join("\n");
const css="/* Generated from design-system/tokens.json. Run node design-system/generate-tokens.mjs. */\n:root, [data-ev-theme='light'] {\n"+declarations({...tokens.primitives,...tokens.light})+"\n}\n[data-ev-theme='dark'] {\n"+declarations(tokens.dark)+"\n}\n";
fs.writeFileSync(path.join(dir,"tokens.css"),css);
const luminance=hex=>{const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
let failed=false; const report=[];
for(const name of ["light","dark"]){const t=tokens[name];const pairs=[];
for(const foreground of ["text-primary","text-secondary","text-muted"]) for(const background of ["surface-app","surface-card","surface-subtle","surface-sunken"]) pairs.push([foreground,background,4.5]);
pairs.push(["action-on-primary","action-primary",4.5],["action-on-primary","action-primary-hover",4.5],["action-on-brand","action-brand",4.5],["action-on-brand","action-brand-hover",4.5],["link","surface-app",4.5],["link","surface-card",4.5],["border-control","surface-card",3],["border-control","surface-app",3],["border-control","surface-sunken",3],["focus","surface-card",3]);
for(const state of ["verified","integrity","unverified","insufficient"]) pairs.push(["state-"+state+"-fg","state-"+state+"-bg",4.5]);
for(const [fg,bg,min] of pairs){const contrast=ratio(t[fg],t[bg]);report.push({theme:name,foreground:fg,background:bg,ratio:Number(contrast.toFixed(2)),minimum:min,pass:contrast>=min});if(contrast<min)failed=true;}
}
fs.writeFileSync(path.join(dir,"contrast-report.json"),JSON.stringify({scope:"Token pairs only; not a complete accessibility audit",pairs:report},null,2)+"\n");
console.log(report.length+" token pairs checked; "+report.filter(r=>!r.pass).length+" failures.");
console.log("Signature red on white: "+ratio(tokens.primitives["brand-signature"],"#FFFFFF").toFixed(2)+":1. Identity artwork only; not small text with white foreground.");
if(failed)process.exitCode=1;
