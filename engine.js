export const VERSION=1;
export const initial=()=>({version:VERSION,name:'Vô Danh Đạo Hữu',realm:0,floor:1,exp:720,stones:1280,map:0,unlocked:0,activity:null,progress:0,kills:0,gathered:0,crafted:0,breakthroughs:0,bossWins:[],claimed:[],bag:{herb_001:10,potion:3},equipment:{},owned:['equip_001_sword_weapon','equip_001_sword_chest'],skills:{},last:Date.now(),hp:1000,log:[]});
export const format=n=>Intl.NumberFormat('vi-VN',{notation:n>=1e6?'compact':'standard',maximumFractionDigits:1}).format(n);
export function level(s,d){return d.cultivation.levels.find(x=>x.cultivation_id===d.cultivation.realms[s.realm].id&&x.floor===s.floor)}
export function stats(s,d){let l=level(s,d),r={hp:+l.hp,attack:+l.attack,defense:+l.defense};for(const id of Object.values(s.equipment)){const e=d.equipment.items.find(x=>x.id===id);if(e){r.hp+=+e.white_hp;r.attack+=+e.white_attack;r.defense+=+e.white_defense}}r.attack+=Object.values(s.skills).reduce((a,b)=>a+b*8,0);return r}
export function addLog(s,msg){s.log.unshift(msg);s.log=s.log.slice(0,15)}
export function setActivity(s,type){s.activity=type;s.progress=0;s.last=Date.now()}
export function damage(a,def,l=1){return Math.max(1,Math.round(a*(1-def/(def+500*l))))}
export function breakthrough(s,d){let l=level(s,d);if(s.exp<+l.exp_bar)return false;if(s.floor===10&&s.realm===8)return false;s.exp=0;if(s.floor<10)s.floor++;else{s.floor=1;s.realm++}s.breakthroughs++;s.hp=stats(s,d).hp;addLog(s,'Đột phá thành công! '+d.cultivation.realms[s.realm].name+' tầng '+s.floor);return true}
export function questReady(s,id){return [true,s.kills>=3,s.gathered>=5,s.breakthroughs>=1,s.bossWins.length>=1][id]}
export function claim(s,id){if(s.claimed.includes(id)||!questReady(s,id))return false;s.claimed.push(id);s.stones+=[200,300,200,500,800][id];s.bag.potion=(s.bag.potion||0)+1;return true}
export function equip(s,id,d){const e=d.equipment.items.find(x=>x.id===id);if(!e||!s.owned.includes(id))return false;s.equipment[e.slot]=id;s.hp=Math.min(s.hp,stats(s,d).hp);return true}
export function tick(s,d,seconds=1){const out=[];seconds=Math.max(0,Math.min(seconds,28800));for(let i=0;i<seconds;i++){
const st=stats(s,d);if(!s.activity){s.hp=Math.min(st.hp,s.hp+st.hp*.02);continue}s.progress++;
if(s.activity==='cultivate'){s.exp=Math.min(+level(s,d).exp_bar,s.exp+6);if(s.progress%10===0)out.push('+60 tu vi')}
if(s.activity==='gather'&&s.progress%5===0){let h=d.items.items.find(x=>x.category==='herb'&&x.source_map_id===d.world.locations[s.map].id);s.bag[h.id]=(s.bag[h.id]||0)+1;s.gathered++;s.exp=Math.min(+level(s,d).exp_bar,s.exp+8);out.push('+1 '+h.name)}
if(s.activity==='craft'&&s.progress%8===0){if((s.bag.herb_001||0)<5||s.stones<10){s.activity=null;out.push('Dừng luyện đan: thiếu nguyên liệu');continue}s.bag.herb_001-=5;s.stones-=10;s.bag.potion=(s.bag.potion||0)+1;s.crafted++;out.push('Luyện thành 1 Hồi Xuân Đan')}
if(s.activity==='travel'&&s.progress>=8){s.map=s.destination;s.activity=null;delete s.destination;s.progress=0;out.push('Đã đến '+d.world.locations[s.map].name)}
if(s.activity==='fight'||s.activity==='boss'){
const boss=s.activity==='boss';const list=d.combat.monsters.filter(x=>x.map_id===d.world.locations[s.map].id);const enemy=boss?d.combat.bosses[s.map]:list[s.kills%3];
if(!s.enemy)s.enemy={...enemy,current:+enemy.hp};let hit=damage(st.attack,+s.enemy.defense,s.realm*10+s.floor);s.enemy.current-=hit;
s.hp=Math.max(0,s.hp-damage(+s.enemy.attack,st.defense,s.realm*10+s.floor));
if(s.hp<=0){s.activity=null;s.enemy=null;s.hp=Math.round(st.hp*.25);out.push('Rút lui về điểm nghỉ. Đang hồi phục.');continue}
if(s.enemy.current<=0){s.kills++;s.stones+=boss?150:+enemy.spirit_stones;s.exp=Math.min(+level(s,d).exp_bar,s.exp+(boss?120:+enemy.exp));out.push('Đánh bại '+enemy.name+(boss?' · mở đường mới!':''));
if(boss){if(!s.bossWins.includes(s.map))s.bossWins.push(s.map);s.unlocked=Math.max(s.unlocked,Math.min(44,s.map+1));s.activity=null}else if(s.kills%3===0){const e=d.equipment.items.find(x=>x.map_id===enemy.map_id&&!s.owned.includes(x.id));if(e){s.owned.push(e.id);out.push('Nhặt được '+e.name)}}s.enemy=null}
}
}for(const msg of out.slice(-5))addLog(s,msg);return out}
export function loadSave(raw){try{
const s=JSON.parse(raw), number=(v,max=Number.MAX_VALUE)=>Number.isFinite(v)&&v>=0&&v<=max, int=(v,max)=>Number.isInteger(v)&&v>=0&&v<=max, obj=v=>v&&typeof v==='object'&&!Array.isArray(v), list=v=>Array.isArray(v)&&v.length<=2000;
if(!obj(s)||s.version!==VERSION||!int(s.realm,8)||!int(s.floor,10)||s.floor<1||!int(s.map,44)||!int(s.unlocked,44)||s.map>s.unlocked||!number(s.exp)||!number(s.stones)||!number(s.hp)||!number(s.last)||!number(s.progress)||!number(s.kills)||!number(s.gathered)||!number(s.crafted)||!number(s.breakthroughs)||!obj(s.bag)||!obj(s.skills)||!obj(s.equipment)||!list(s.owned)||!list(s.claimed)||!list(s.bossWins)||!list(s.log)||!['cultivate','gather','craft','travel','fight','boss',null].includes(s.activity))throw Error();
if(Object.values(s.bag).some(v=>!int(v,1e12))||Object.values(s.skills).some(v=>!int(v,1e6))||Object.values(s.equipment).some(v=>typeof v!=='string')||s.owned.some(v=>typeof v!=='string')||s.log.some(v=>typeof v!=='string')||s.claimed.some(v=>!int(v,4))||s.bossWins.some(v=>!int(v,44)))throw Error();
if(s.activity==='travel'&&(!int(s.destination,s.unlocked)))throw Error();
if(s.enemy&&(!obj(s.enemy)||!number(+s.enemy.hp)||!number(+s.enemy.attack)||!number(+s.enemy.defense)||!number(s.enemy.current)||typeof s.enemy.name!=='string'))throw Error();
return {...initial(),...s,name:String(s.name).slice(0,24),log:s.log.slice(0,15)}
}catch{return null}}
