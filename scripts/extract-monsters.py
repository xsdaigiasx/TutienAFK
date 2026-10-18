"""Extract standalone sprites from user-provided RGBA source sheets; no resampling.
Usage: python3 scripts/extract-monsters.py SOURCE_IMAGES_DIRECTORY
Uses connected opaque cores to recover protrusions beyond nominal grid boundaries.
"""
from pathlib import Path
import sys,json
import numpy as np
from PIL import Image
from scipy import ndimage
root=Path(__file__).resolve().parents[1];source=Path(sys.argv[1]);manifest=json.loads((root/'data/entity_art.json').read_text());out=root/'assets/monsters-single-v012';out.mkdir(exist_ok=True);report=[];original=json.loads((source.parent/'monster_art_manifest.json').read_text());
for sheet in sorted(source.glob('*.png')):
 im=Image.open(sheet).convert('RGBA');pixels=np.array(im);alpha=pixels[:,:,3];h,w=alpha.shape
 cores,n=ndimage.label(ndimage.binary_opening(alpha>64,iterations=3));sizes=np.bincount(cores.ravel());groups=np.zeros_like(cores,dtype=np.uint8)
 centres=ndimage.center_of_mass(alpha,cores,range(1,n+1));present=set()
 for label,(cy,cx) in enumerate(centres,1):
  if sizes[label]<300:continue
  row=min(4,int(cy/h*5));col=min(2,int(cx/w*3));cell=row*3+col+1;groups[cores==label]=cell;present.add(cell)
 if len(present)!=15:raise ValueError((sheet.name,present))
 _,nearest=ndimage.distance_transform_edt(groups==0,return_indices=True);ownership=groups[tuple(nearest)]
 entries=[(r['monster_id'],{'name':r['name'],'row':r['row'],'column':r['column']}) for r in original if Path(r['sheet']).name==sheet.name]
 for id,a in entries:
  cell=(a['row']-1)*3+a['column'];visible=(ownership==cell)&(alpha>8);ys,xs=np.where(visible);left,right=xs.min(),xs.max()+1;top,bottom=ys.min(),ys.max()+1
  crop=pixels[top:bottom,left:right].copy();crop[:,:,3]=np.where(ownership[top:bottom,left:right]==cell,crop[:,:,3],0)
  sprite=Image.fromarray(crop);padding=max(18,round(max(sprite.size)*.075));side=max(sprite.size)+2*padding;canvas=Image.new('RGBA',(side,side));canvas.paste(sprite,((side-sprite.width)//2,(side-sprite.height)//2))
  dest=out/(id+'.webp');canvas.save(dest,'WEBP',lossless=True,method=4)
  manifest[id]={'kind':'image','src':str(dest.relative_to(root)),'name':a['name'],'pixel_art':True,'width':side,'height':side,'padding':padding,'source_sheet':sheet.name,'source_bounds':[int(left),int(top),int(right),int(bottom)]}
  report.append({'id':id,'source':sheet.name,'bounds':[int(left),int(top),int(right),int(bottom)],'size':side,'padding':padding,'pixels':int(visible.sum())})
assert len(report)==135, 'Expected all 135 monsters before replacing manifest'
(root/'data/entity_art.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));(root/'docs/monster-extraction-v012.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('Extracted',len(report),'individual sprites from original PNG, lossless, no upscaling')
