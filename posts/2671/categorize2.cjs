const fs = require('fs');
const c = JSON.parse(fs.readFileSync('nickname_categories.json', 'utf8'));
const others = c.other;

const cats = {
  title: ['king','queen','prince','princess','lord','emperor','sultan','baron',
    'duke','captain','sergeant','champ','champion','boss','don','jefe','chief',
    'majesty','el charro','el gallero','el matador','el conquistador','el valiente',
    'el terror','el fiera','ko king','red king','king kong','king kage','kingsbu',
    'your majesty','el jefe','la jefa','el caballero','chapo','el gringo'],
  occupation: ['assassin','hitman','butcher','soldier','ninja','pirate','gladiator',
    'doctor','professor','barber','cowboy','mechanic','carpenter','janitor','judge',
    'surgeon','messenger','preacher','librarian','dentist','lifeguard','executioner',
    'cannibal','headhunter','reaper','undertaker','bandit','outlaw','renegade',
    'warrior','punisher','samurai','ronin','shogun','mercenary','bodyguard','sniper',
    'slayer','killer','gunslinger','matador','conquistador','valiente','shamurai',
    'afro samurai','neo samurai','last samurai','karate','jedi','bushido','mauler',
    'crusher','destroyer','hunter','murderer','strangler','ripper','hangman',
    'grave digger','gravedigger','exorcist','disciple','master','sensei','trainer',
    'doberman','badger','boa constrictor','octopus','tarantula','weasel'],
  mythical: ['kraken','wolverine','terminator','monster','goku','darth','skywalker',
    'zombie','godzilla','frankenstein','conan','superman','hulk','tarzan','batman',
    'predator','ghost','skeletor','zohan','devil','demon','vampire','baba yaga',
    'wookiee','robocop','lex luthor','joker','skelator','gremlin','boogeyman',
    'bogeyman','werewolf','mummy','goblin','t-rex','god','goddess','archangel',
    'angel','messiah','valhalla','yoda','obi','sasuke','naruto','super saiyan',
    'sponge','poppins','houdini','genghis','goliath','hannibal','minotaur','troll',
    'cyborg','robot','mutant','freak','creature','beastman','were',"saiyan",'kylin',
    'fenix','phoenix','fenomeno','fenomeno','fen','lamia','golem','baba','yaga'],
  nature: ['hurricane','storm','thunder','lightning','fire','ice','tornado','blaze',
    'inferno','monsoon','quake','earthquake','cyclone','snowman','twilight','galaxy',
    'comet','star','moon','sun','sky','deep waters','waters','rain','wind','tsunami',
    'avalanche','volcano','meteor','cosmos','astro','atomic','huracan','fireball',
    'firekid','firefist','son of fire','nitro','turbo','thundercat','blizzard'],
  appearance: ['baby face','pretty boy','handsome','blonde','big','little','tiny',
    'tall','hairy','beautiful','red','black','white','blue','green','golden',
    'silver','platinum','brown','yellow','pretty','ugly','smooth','chubby','skinny',
    'fat','short','giant','mini','cute','hot','big sexy','big pretty','big brown',
    'big country','big swede','biggie','big baby','big pretty','fun size','big rig',
    'big deal','big ticket','big boy','big c','big brown','beautiful monster',
    'babyface','baby','baby k','baby shark','pink','fresh prince','fresh'],
  food: ['sugar','sweet','candy','chocolate','coffee','taco','cheesecake','cupcake',
    'mango','coconut','meatball','pop tart','hot sauce','wasabi','cookie','honey',
    'bacon','peanut','cocoa','juice','soda','beer','wine','tequila','pepper',
    'hot chocolate','suga','pepsi','cap n crunch',"cap'n crunch",'cheesesteak',
    'macarrao','feijao','miojo','toddynho','cacareco','caldeirao','morango',
    'glorinha','cake','meat','cup','chocolate','vanilla','cherry','lemon','lime'],
  abstract: ['almighty','all in','perfect','natural','magic','wonder','dream',
    'miracle','blessed','glory','messiah','saint','chaos','peace','hope','happy',
    'smile','joy','faith','soul','spirit','heart','mind','truth','chosen','promise',
    'pleasure','the one','glory to god','soldier of god','god of war','street buddha',
    'magic man','wonderboy','the chosen one','the secret weapon','the best','the real',
    'the truth','the gift','the promise','the miracle','the legend','the answer'],
  trait: ['psycho','crazy','savage','ferocious','ruthless','relentless','mad','bad',
    'wild','vicious','dangerous','evil','mean','nasty','filthy','violent','rude',
    'slick','suave','fearless','daring','lethal','brutal','ill will','trouble',
    'menace','mayhem','havoc','overkill','murder','blood','angry','calm','cool',
    'groovy','funky','lazy','bipolar','insane','silent','quiet','nice','kind','proud',
    'bold','brave','deadly','rough','tough','hard','cold','cruel','wicked','freaky',
    'creepy','scary','thrill','intense','toxic','dirty','fresh','rowdy','rude boy',
    'vicious','nasty','mean machine','short fuse','no mercy','no love','no regard',
    'no chance','no hype','no time','no worries','bad man','bad boy','bad seed',
    'bad ass','badys','primetime','prime time','rated r','raw','raw dawg']
};

const isCode = (s) => {
  const stripped = s.replace(/[^A-Za-z0-9]/g, '');
  return !!stripped && (/\d/.test(stripped) ||
    (stripped === stripped.toUpperCase() && stripped.length >= 2 && stripped.length <= 6));
};

const classify = (s) => {
  const low = ' ' + s.toLowerCase() + ' ';
  const has = (w) => {
    const esc = w.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
    return new RegExp('\\b' + esc + '\\b').test(low);
  };
  if (cats.title.some(has)) return 'title';
  if (cats.occupation.some(has)) return 'occupation';
  if (cats.mythical.some(has)) return 'mythical';
  if (cats.nature.some(has)) return 'nature';
  if (cats.appearance.some(has)) return 'appearance';
  if (cats.food.some(has)) return 'food';
  if (cats.abstract.some(has)) return 'abstract';
  if (cats.trait.some(has)) return 'trait';
  if (isCode(s)) return 'code';
  return 'other';
};

const out = { title: [], occupation: [], mythical: [], nature: [], appearance: [],
  food: [], abstract: [], trait: [], code: [], other: [] };
others.forEach(n => out[classify(n)].push(n));

console.log('SUB-CATEGORIES DERIVED FROM THE 1292 "other" NICKNAMES\n');
let total = 0;
for (const k of ['title','occupation','mythical','nature','appearance','food',
  'abstract','trait','code','other']) {
  total += out[k].length;
  console.log(k.padEnd(11), String(out[k].length).padStart(4),
    ' | e.g. ' + out[k].slice(0, 8).join(', '));
}
console.log('\nTOTAL accounted:', total, '/', others.length);
fs.writeFileSync('nickname_subcategories.json', JSON.stringify(out, null, 2));
