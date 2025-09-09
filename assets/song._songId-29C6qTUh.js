import{a as I,u as $,r as t,j as e}from"./index-CgjJ7-jr.js";import{c as i,B as o}from"./createLucideIcon-DVspd8zP.js";import{s as E,S as L}from"./songs-Bgrmvebv.js";import{p as q,a as T}from"./chordParser-QEKANY46.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"m14 12 4 4 4-4",key:"buelq4"}],["path",{d:"M18 16V7",key:"ty0viw"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]],B=i("a-arrow-down",A);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"m14 11 4-4 4 4",key:"1pu57t"}],["path",{d:"M18 16V7",key:"ty0viw"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]],P=i("a-arrow-up",H);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],y=i("chevron-down",D);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],V=i("chevron-up",F);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M15 12h6",key:"upa0zy"}],["path",{d:"M15 6h6",key:"1jlkvy"}],["path",{d:"m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13",key:"blevx4"}],["path",{d:"M3 18h18",key:"1h113x"}],["path",{d:"M3.92 11h6.16",key:"1bqo8m"}]],U=i("letter-text",W);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M21 15V6",key:"h1cx4g"}],["path",{d:"M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",key:"8saifv"}],["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}]],Z=i("list-music",R);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M5 12h14",key:"1ays0h"}]],J=i("minus",G);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],O=i("plus",K);function se(){const{songId:n}=I({from:"/song/$songId"}),u=$(),[l,p]=t.useState(()=>{const s=localStorage.getItem("chords-font-size");return s?parseInt(s,10):14}),[a,f]=t.useState(()=>{const s=localStorage.getItem(`chords-transposition-${n}`);return s?parseInt(s,10):0}),[r,g]=t.useState(()=>{const s=localStorage.getItem("chords-visibility");return s?s==="true":!0}),[d,v]=t.useState(!1),[m,b]=t.useState(()=>{const s=localStorage.getItem(`chords-capo-${n}`);return s?parseInt(s,10):0});t.useEffect(()=>{localStorage.setItem("chords-font-size",l.toString())},[l]),t.useEffect(()=>{localStorage.setItem(`chords-transposition-${n}`,a.toString())},[a,n]),t.useEffect(()=>{localStorage.setItem("chords-visibility",r.toString())},[r]),t.useEffect(()=>{localStorage.setItem(`chords-capo-${n}`,m.toString())},[m,n]);const c=t.useMemo(()=>E.find(s=>s.id===n),[n]),k=t.useMemo(()=>c?c.lyrics.split(`

`).map((x,z)=>e.jsx("div",{className:"mb-4",children:x.split(`
`).map((h,N)=>{if(r)return q(h,a);if(h.startsWith("## "))return e.jsx("h2",{className:"font-bold text-foreground mb-2",children:h.substring(3)},N);{const _=T(h);return e.jsx("p",{className:"mb-1",children:_||" "},N)}})},z)):[],[c,a,r]),j=()=>{u({to:"/"})},S=()=>{p(s=>Math.max(s-2,10))},w=()=>{f(s=>Math.min(s+1,12))},M=()=>{f(s=>Math.max(s-1,-12))},C=()=>{p(s=>Math.min(s+2,24))};return c?e.jsx("div",{className:"max-w-4xl mx-auto",children:e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs(o,{onClick:j,variant:"outline",children:[e.jsx("span",{className:"hidden sm:inline",children:"← Back to Songs"}),e.jsx("span",{className:"sm:hidden",children:"←"})]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3 sm:gap-6",children:[r&&e.jsxs("div",{className:"flex items-center",children:[e.jsx(o,{onClick:M,variant:"outline",size:"sm",disabled:a<=-12,className:"rounded-r-none",children:e.jsx(J,{className:"h-4 w-4"})}),e.jsxs("div",{className:"flex items-center justify-center text-foreground w-8 h-9 text-sm font-mono border-t border-b border-border bg-background",children:[a>0?"+":"",a]}),e.jsx(o,{onClick:w,variant:"outline",size:"sm",disabled:a>=12,className:"rounded-l-none",children:e.jsx(O,{className:"h-4 w-4"})})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(o,{onClick:S,variant:"outline",size:"sm",disabled:l<=10,className:"rounded-r-none border-r-0",children:e.jsx(B,{className:"h-5 w-5"})}),e.jsx(o,{onClick:C,variant:"outline",size:"sm",disabled:l>=24,className:"rounded-l-none",children:e.jsx(P,{className:"h-7 w-7"})})]}),e.jsx(o,{onClick:()=>v(!d),variant:"outline",size:"sm",title:d?"Hide more controls":"Show more controls",children:d?e.jsx(V,{className:"h-4 w-4"}):e.jsx(y,{className:"h-4 w-4"})})]}),d&&e.jsxs("div",{className:"flex items-center gap-3 sm:gap-6 justify-end",children:[r&&e.jsxs("div",{className:"relative",children:[e.jsxs("select",{value:m,onChange:s=>b(parseInt(s.target.value,10)),className:"appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",children:[e.jsx("option",{value:0,children:"No Capo"}),Array.from({length:12},(s,x)=>x+1).map(s=>e.jsxs("option",{value:s,children:["Capo ",s]},s))]}),e.jsx(y,{className:"absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(o,{onClick:()=>g(!1),variant:r?"outline":"default",size:"sm",title:"Show lyrics only",className:"rounded-r-none border-r-0",children:e.jsx(U,{className:"h-4 w-4"})}),e.jsx(o,{onClick:()=>g(!0),variant:r?"default":"outline",size:"sm",title:"Show lyrics with chords",className:"rounded-l-none",children:e.jsx(Z,{className:"h-4 w-4"})})]})]})]})]}),e.jsxs("div",{className:"text-center border-b pb-4 mb-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-foreground mb-2",children:c.title}),e.jsxs("p",{className:"text-lg text-muted-foreground",children:["by ",c.artist]})]}),e.jsx("div",{className:"leading-relaxed",style:{fontSize:`${l}px`},children:k}),e.jsx("div",{className:"mt-8 pt-6 border-t",children:e.jsx("div",{className:"flex justify-center",children:e.jsxs(o,{onClick:()=>u({to:"/editor"}),variant:"outline",className:"flex items-center gap-2",children:[e.jsx(L,{className:"h-4 w-4"}),"Edit Song"]})})})]})}):e.jsxs("div",{className:"text-center py-12",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Song Not Found"}),e.jsx("p",{className:"text-muted-foreground mb-6",children:"The song you're looking for doesn't exist."}),e.jsx(o,{onClick:j,children:"← Back to Songs"})]})}export{se as component};
