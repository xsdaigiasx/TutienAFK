import{mkdir,copyFile,cp,rm,readFile}from'node:fs/promises';import{dirname}from'node:path';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','style.css','app.js','engine.js','map-layout.js'])await copyFile(f,'dist/'+f);
await cp('data','dist/data',{recursive:true});
const refs=new Set();function walk(v){if(typeof v==='string'&&v.startsWith('assets/'))refs.add(v);else if(v&&typeof v==='object')for(const x of Object.values(v))walk(x)}
for(const f of ['world_visuals','entity_art','item_art','location_visuals','skins'])walk(JSON.parse(await readFile('data/'+f+'.json','utf8')));
for(const path of refs){await mkdir(dirname('dist/'+path),{recursive:true});await copyFile(path,'dist/'+path)}console.log('Static build ready: dist/; '+refs.size+' active image files');
