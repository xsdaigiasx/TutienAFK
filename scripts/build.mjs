import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','style.css','app.js','engine.js'])await copyFile(f,'dist/'+f);
for(const f of ['assets','data'])await cp(f,'dist/'+f,{recursive:true});
console.log('Static build ready: dist/');
