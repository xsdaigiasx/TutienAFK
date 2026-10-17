import{readFile,writeFile}from'node:fs/promises';
let html=await readFile('index.html','utf8'),css=await readFile('style.css','utf8'),app=await readFile('app.js','utf8'),engine=await readFile('engine.js','utf8');
const catalog={};for(const f of ['world','cultivation','combat_entities','equipment','arts_and_relics','items_and_recipes'])catalog['data/'+f+'.json']=JSON.parse(await readFile('data/'+f+'.json','utf8'));
const image='data:image/png;base64,'+(await readFile('assets/world-map.png')).toString('base64');
app=app.replace(/^import .*\n/,'').replaceAll('assets/world-map.png',image);
const source='const embeddedData='+JSON.stringify(catalog)+';const fetch=async path=>({ok:!!embeddedData[path],json:async()=>embeddedData[path]});\n'+engine.replace(/export /g,'')+'\n'+app;
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>').replace('<script type="module" src="app.js"></script>',()=>'<script type="module">'+source.replace(/<\/script/gi,'<\\/script')+'</script>');
await writeFile('CHOI_THU.html',html);console.log('Standalone demo ready: CHOI_THU.html');
