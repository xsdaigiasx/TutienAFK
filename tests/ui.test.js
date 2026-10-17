import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import{readFileSync}from'node:fs';
test('all screens render; navigation, shopping, equipment, settings, and activities work',async()=>{
 const nodes=new Map(),events={};function node(key){if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',value:'',open:false,classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false}});return nodes.get(key)}
 const context=vm.createContext({console,Date,Math,JSON,Number,Object,String,Array,Intl,Set,Error,Blob,URL,setTimeout:()=>0,clearTimeout(){},setInterval(){},document:{querySelector:node,addEventListener:(n,fn)=>events[n]=fn},window:{scrollTo(){},scrollY:0,addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},fetch:async p=>({ok:true,json:async()=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url)))})});
 const engine=readFileSync(new URL('../engine.js',import.meta.url),'utf8').replace(/export /g,'');const app=readFileSync(new URL('../app.js',import.meta.url),'utf8').replace(/^import .*\n/,'');
 vm.runInContext(engine+'\n'+app+'\nglobalThis.inspect=()=>({s,tab});globalThis.testGo=go;',context);await new Promise(r=>setImmediate(r));
 assert.match(node('#main').innerHTML,/Động phủ/);
 const click=dataset=>events.click({target:{closest:()=>({dataset})}});
 for(const tab of ['world','character','bag','quests','skills','market','battle','home']){context.testGo(tab);assert.ok(node('#main').innerHTML.length>200,tab)}
 click({action:'buy-potion'});assert.equal(context.inspect().s.bag.potion,4);
 click({equip:'equip_001_sword_weapon'});assert.equal(context.inspect().s.equipment.weapon,'equip_001_sword_weapon');
 click({action:'cultivate'});assert.equal(context.inspect().s.activity,'cultivate');click({action:'gather'});assert.equal(context.inspect().s.activity,'gather');click({action:'stop'});assert.equal(context.inspect().s.activity,null);
 click({action:'settings'});assert.ok(node('#modal').open);node('#rename').value='<img onerror=alert(1)>';click({action:'rename'});context.testGo('character');assert.ok(!node('#main').innerHTML.includes('<img onerror'));
 click({claim:'0'});assert.equal(context.inspect().s.claimed.length,1);click({map:'44'});assert.ok(node('#modal').open);assert.match(node('#modal-content').innerHTML,/Chưa mở/);
});
