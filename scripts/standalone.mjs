import{readFile,writeFile,readdir}from'node:fs/promises';
let html=await readFile('index.html','utf8'),css=await readFile('style.css','utf8'),app=await readFile('app.js','utf8'),engine=await readFile('engine.js','utf8');
const catalog={};for(const f of ['world','cultivation','combat_entities','equipment','arts_and_relics','items_and_recipes','world_visuals'])catalog['data/'+f+'.json']=JSON.parse(await readFile('data/'+f+'.json','utf8'));
app=app.replace(/^import .*\n/,'');let data=JSON.stringify(catalog);
for(const f of await readdir('assets')){if(!/\.(png|webp|jpg)$/.test(f))continue;const path='assets/'+f,mime=f.endsWith('.webp')?'image/webp':f.endsWith('.jpg')?'image/jpeg':'image/png',image='data:'+mime+';base64,'+(await readFile(path)).toString('base64');app=app.replaceAll(path,image);data=data.replaceAll(path,image)}
const source='const embeddedData='+data+';const fetch=async path=>({ok:!!embeddedData[path],json:async()=>embeddedData[path]});\n'+engine.replace(/export /g,'')+'\n'+app;
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>').replace('<script type="module" src="app.js"></script>',()=>'<script type="module">'+source.replace(/<\/script/gi,'<\\/script')+'</script>');
await writeFile('CHOI_THU.html',html);console.log('Standalone demo ready: CHOI_THU.html');
