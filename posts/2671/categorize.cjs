const fs = require('fs');
const text = fs.readFileSync('ufc_athletes.csv', 'utf8');
const lines = text.split('\n');
const header = lines[0].split(',');
const idx = header.indexOf('nickname');
let vals = lines.slice(1).map(l => (l.split(',')[idx] || '').trim());
vals = vals.filter(v => v && v !== 'NA');
const uniq = [...new Set(vals)];

// ---- dictionaries (case-insensitive, word-boundary matched) ----
const animals = [
  'lion','tiger','bear','wolf','shark','snake','eagle','hawk','panther','cougar',
  'cat','dog','bull','ram','horse','fox','cobra','viper','python','ape','monkey',
  'gorilla','baboon','elephant','rhino','buffalo','bison','deer','puma','lynx',
  'leopard','cheetah','jaguar','hyena','coyote','bearjew','beast','animal',
  'creature','dragon','phoenix','serpent','falcon','raptor','crow','raven','owl',
  'crocodile','alligator','gator','barracuda','fish','whale','mantis','scorpion',
  'spider','wasp','bee','ant','roach','cockroach','worm','hound','pitbull',
  'bulldog','terrier','puppy','kitten','cub','babyshark','battlecat','beastboy',
  'beastmaster','beastmode','anqa','aquaman'
];

const places = [
  'texas','brazil','brazilian','argentina','argentine','mexico','mexican','usa',
  'american','canada','canadian','russia','russian','china','chinese','japan',
  'japanese','korea','korean','cuba','cuban','venezuela','venezuelan','peru',
  'peruvian','chile','chilean','colombia','colombian','ecuador','uruguay',
  'paraguay','bolivia','panama','nicaragua','honduras','guatemala','spain',
  'spanish','portugal','portuguese','france','french','italy','italian','greece',
  'greek','germany','german','england','english','ireland','irish','scotland',
  'scottish','wales','poland','polish','turkey','turkish','egypt','egyptian',
  'iran','iraqi','israel','israeli','lebanon','lebanese','jordan','syria',
  'africa','african','nigeria','ghana','kenya','australia','australian','india',
  'indian','pakistan','thailand','viet','filipino','philippines','caribbean',
  'bahia','veneziano','alemao','caipira','gaucho','carioca','paulista','texan',
  'california','florida','new york','vegas','hawaii','alaska','ohio','detroit',
  'chicago','boston','miami','georgia','colorado','nevada','utah','arizona',
  'jaragua','curitiba','recife','fortaleza','manaus','salvador','rio','lisbon',
  'madrid','milan','roma','rome','paris','london','berlin','moscow','athens',
  'cairo','dublin','oslo','lima','bogota','santiago','saigon','tokyo','san',
  'angeles','diego','francisco','el salvador','palestine','mongolian'
];

const objects = [
  'gun','ak-47','ak47','rifle','pistol','shotgun','cannon','bomb','missile','knife',
  'blade','sword','axe','hammer','anvil','club','bat','gauge','caliber','bullet',
  'shell','rocket','torpedo','train','a-train','a10','a-10','plane','jet',
  'helicopter','truck','car','motor','engine','wheel','drone','satellite',
  'spaceship','iron','steel','metal','gold','silver','diamond','copper','bronze',
  'stone','rock','glass','wood','chain','wire','bolt','gear','spring','clock',
  'watch','phone','computer','tv','radio','laser','lamp','torch','comet','meteor',
  'moon','sun','planet','atomic','nuclear','24k','100 grand','5 star','8th wonder',
  'abc','bdk','crown','throne','shield','spear','bow','arrow','dart','dagger',
  'anchor','hook','net','trap','box','bell','horn','drum','guitar','mic',
  'microphone','camera','lens','mirror','window','door','wall','bridge','tower',
  'freight','stun gun','top gun','young gun','war hammer','axe murderer',
  'cole train','j-train','nite train','big train','little axe','j-bomb','meat truck'
];

const cat = { animal: [], place: [], object: [], other: [] };
const classify = (s) => {
  const low = ' ' + s.toLowerCase() + ' ';
  const has = (w) => {
    const esc = w.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
    return new RegExp('\\b' + esc + '\\b').test(low);
  };
  if (animals.some(has)) return 'animal';
  if (places.some(has)) return 'place';
  if (objects.some(has)) return 'object';
  return 'other';
};

uniq.forEach(n => cat[classify(n)].push(n));

console.log('CATEGORY COUNTS (of ' + uniq.length + ' unique nicknames)');
for (const k of ['animal','place','object','other']) {
  console.log(k.padEnd(8), cat[k].length);
}
console.log('\n--- SAMPLES ---');
for (const k of ['animal','place','object','other']) {
  console.log('\n[' + k + '] (' + cat[k].length + ')');
  console.log(cat[k].slice(0, 50).join(', '));
}

fs.writeFileSync('nickname_categories.json', JSON.stringify(cat, null, 2));
console.log('\nSaved categorized lists to nickname_categories.json');
