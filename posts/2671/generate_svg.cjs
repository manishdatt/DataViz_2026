const fs = require('fs');
const data = JSON.parse(fs.readFileSync('viz_data.json', 'utf8'));
const PALETTE = ["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6",
  "#ec4899","#14b8a6","#f97316","#6366f1","#84cc16","#e11d48","#0ea5e9"];

function escXml(t){
  return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function textWidth(t){
  let total=0;
  for(const ch of t){
    let cw;
    if(ch===' ') cw=3;
    else if(ch>='a'&&ch<='z'){ if('iltfjr'.includes(ch)) cw=3; else if(ch==='m'||ch==='w') cw=8; else cw=5.5; }
    else if(ch>='A'&&ch<='Z'){ if(ch==='I') cw=4; else if(ch==='W'||ch==='M') cw=8.5; else cw=7; }
    else if(ch>='0'&&ch<='9') cw=6;
    else if('.,:;\'-!'.includes(ch)) cw=3;
    else cw=5.5;
    total+=cw;
  }
  return total;
}

const groups = [{items:data.main},{items:data.sub}];
const all = groups.flatMap(g=>Object.entries(g.items))
  .sort((a,b)=>b[1].count-a[1].count);
const max = Math.max(...all.map(e=>e[1].count));

const W=1160, labelW=160, barX=180, innerW=W-barX-20, barH=40,
  rowGap=18, padTop=10, padBot=10, lineH=18, titleH=36, title="AI-assisted Categorization of UFC Athlete Nicknames";

const pillLines = (ex)=>{
  let cx=barX+8, lines=1;
  (ex||[]).slice(0,20).forEach(nm=>{
    const w=nm.length*6.4+14;
    if(cx+w>barX+innerW-4){cx=barX+8;lines++;}
    cx+=w+6;
  });
  return lines;
};
const heights = all.map(([, val]) => {
  const lines = pillLines(val.examples);
  const contentH = Math.max(barH, (lines - 1) * lineH + 34);
  return contentH + rowGap;
});
const H = padTop + titleH + padBot + heights.reduce((a, b) => a + b, 0);

let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;min-width:760px;font-family:sans-serif">`;
s += `<rect width="${W}" height="${H}" fill="white"/>`;
s += `<text x="${W/2}" y="${padTop+24}" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#0f172a">${escXml(title)}</text>`;

let y=padTop, ci=0;
all.forEach(([key,val],i)=>{
  const color=PALETTE[ci++%PALETTE.length];
  const pct=((val.count/max)*100).toFixed(1);
  const name=key.charAt(0).toUpperCase()+key.slice(1);
  const lines=pillLines(val.examples);
  const contentH=Math.max(barH,(lines-1)*lineH+34);
  const blockH=(lines-1)*lineH+16;

  s += `<text x="${labelW}" y="${y+contentH/2-3}" text-anchor="end" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a">${escXml(name)}</text>`;
  s += `<text x="${labelW}" y="${y+contentH/2+13}" text-anchor="end" font-family="sans-serif" font-size="11" fill="#64748b">(${val.count})</text>`;

  const gid="barGrad"+i;
  s += `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="0">`+
    `<stop offset="0%" stop-color="${color}" stop-opacity="1"/>`+
    `<stop offset="${pct}%" stop-color="${color}" stop-opacity="1"/>`+
    `<stop offset="${pct}%" stop-color="${color}" stop-opacity="0.15"/>`+
    `<stop offset="100%" stop-color="${color}" stop-opacity="0.15"/>`+
    `</linearGradient></defs>`;
  s += `<rect x="${barX}" y="${y}" width="${innerW}" height="${contentH}" rx="6" fill="url(#${gid})"/>`;

  let cx=barX+8, cy=y+(contentH-blockH)/2;
  (val.examples||[]).slice(0,20).forEach(raw=>{
    const nm=raw.trim();
    const w=textWidth(nm)+22;
    if(cx+w>barX+innerW-4){cx=barX+8;cy+=lineH;}
    s += `<rect x="${cx}" y="${cy}" width="${w}" height="16" rx="8" fill="#ffffff" fill-opacity="0.75"/>`;
    s += `<text x="${cx+8}" y="${cy+12}" font-family="sans-serif" font-size="11" fill="#0f172a">${escXml(nm)}</text>`;
    cx+=w+6;
  });
  y+=heights[i];
});
s += `</svg>`;
fs.writeFileSync('nickname_categories.svg', s);
console.log('Wrote nickname_categories.svg  ('+all.length+' categories, H='+H+')');
