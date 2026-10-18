import json
from PIL import ImageFont
from itertools import combinations
w=json.load(open('data/world.json'));v=json.load(open('data/world_visuals.json'));n=json.load(open('data/map_nodes.json'))
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',12);sm=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',9)
def box(name,req,x,y,viewport_width,viewport_height,maxwidth=140):
 lines=['']
 for word in name.split():
  text=(lines[-1]+' '+word).strip()
  if f.getlength(text)>maxwidth-14 and lines[-1]:lines.append(word)
  else:lines[-1]=text
 width=min(maxwidth,max([f.getlength(line) for line in lines]+[sm.getlength(req)])+14);height=15*len(lines)+22
 x=x/100*viewport_width;y=y/100*viewport_height
 return (x-width/2,y-height/2,x+width/2,y+height/2,name)
fail=0
for world in ['world_human','world_spirit','world_immortal']:
 # Overall locations are shown only at >= 2.5x; label font size stays constant.
 maps=[m for m in w['locations'] if m['parent_id'] in v[world]['regions']]
 width=280*2.5;height=width*v[world]['height']/v[world]['width'];boxes=[box(m['name'],m['requirement_label'],n[m['id']]['lx'],n[m['id']]['ly'],width,height) for m in maps]
 for a,bx in combinations(boxes,2):
  if min(a[2],bx[2])-max(a[0],bx[0])>0 and min(a[3],bx[3])-max(a[1],bx[1])>0:print('OVERVIEW OVERLAP',world,a,bx);fail+=1
for world in ['world_human','world_spirit','world_immortal']:
 im=__import__('PIL.Image',fromlist=['open']).open(v[world]['image']);assert im.size==(v[world]['width'],v[world]['height'])
 for width in [280,320,440]:
  height=width*v[world]['height']/v[world]['width'];boxes=[]
  for rid,geo in v[world]['regions'].items():
   region=next(r for r in w['regions'] if r['id']==rid);first=next(m for m in w['locations'] if m['parent_id']==rid)
   boxes.append(box(region['name'],first['requirement_label'],geo['label']['x'],geo['label']['y'],width,height,min(144,width*.46)))
  for a in boxes:
   if a[0]<0 or a[1]<0 or a[2]>width or a[3]>height:print('REGION CLIP',world,width,a);fail+=1
  for a,bx in combinations(boxes,2):
   if min(a[2],bx[2])-max(a[0],bx[0])>0 and min(a[3],bx[3])-max(a[1],bx[1])>0:print('REGION OVERLAP',world,width,a,bx);fail+=1
print('Atlas label issues:',fail)
raise SystemExit(bool(fail))
