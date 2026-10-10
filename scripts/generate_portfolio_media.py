#!/usr/bin/env python3
"""Generate lightweight, illustrative (not live-capture) portfolio motion assets.

Requirements: Python 3.11+, Pillow, ffmpeg in PATH.
Run: python scripts/generate_portfolio_media.py --output media
Optional: --existing-assets /path/to/original/Portfolio/public
         (adds owned hackathon photographs to the award reels if present)

All data and interfaces here are fictional demos for illustration. Do not pass
this media off as screen recordings, accuracy proofs, or genuine customer data.
"""
from __future__ import annotations
import argparse, math, os, shutil, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

W, H = 960, 540
FPS = 15
FONTS = '/usr/share/fonts/opentype/inter/'
FONTMAP = {'r':'Inter-Regular.otf', 'm':'Inter-Medium.otf', 's':'Inter-SemiBold.otf', 'b':'InterDisplay-Bold.otf'}
FALLBACK = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
_cache = {}

def font(size, weight='r'):
    k=(size,weight)
    if k not in _cache:
        p=Path(FONTS)/FONTMAP.get(weight,'Inter-Regular.otf')
        try:
            _cache[k]=ImageFont.truetype(str(p if p.exists() else FALLBACK),size)
        except OSError:
            _cache[k]=ImageFont.load_default(size=size)
    return _cache[k]

def rgb(c):
    return tuple(int(c[i:i+2],16) for i in (1,3,5)) if isinstance(c,str) and c.startswith('#') else c

def color_alpha(c,alpha=255):
    c=rgb(c)
    return (*c,alpha) if len(c)==3 else c

def txt(d, pos, value, size=17, fill='#e5edf8', weight='r', anchor=None):
    d.text(pos, str(value), font=font(size,weight), fill=rgb(fill), anchor=anchor)

def box(d, xy, fill, radius=15, outline=None, width=1):
    d.rounded_rectangle(tuple(map(int,xy)), radius=radius, fill=rgb(fill) if fill else None, outline=rgb(outline) if outline else None,width=width)

def stroke(d, points, fill, width=2, joint='curve'):
    d.line(points,fill=rgb(fill),width=width,joint=joint)

def cir(d, x,y,r, fill, outline=None, width=1):
    d.ellipse((int(x-r),int(y-r),int(x+r),int(y+r)),fill=rgb(fill) if fill else None, outline=rgb(outline) if outline else None,width=width)

def pill(d, x,y,label,fill='#142536',fg='#b9c9db',size=12,px=12,pad_y=8):
    f=font(size,'s')
    bb=d.textbbox((0,0),label,font=f)
    w=(bb[2]-bb[0])+px*2
    h=size+pad_y*2+2
    box(d,(x,y,x+w,y+h),fill,12)
    txt(d,(x+px,y+pad_y-1),label,size,fg,'s')
    return w

def clamp(x):return max(0,min(1,x))
def ease(x):
    x=clamp(x);return x*x*(3-2*x)

def progress(d,x,y,w,u,color):
    box(d,(x,y,x+w,y+7),'#243246',4)
    box(d,(x,y,x+w*clamp(u),y+7),color,4)

def gradient(accent):
    ar,ag,ab=rgb(accent)
    yy,xx=np.mgrid[0:H,0:W]
    glow=np.exp(-(((xx-800)/430.)**2+((yy-95)/390.)**2)*1.9)*0.12
    glow2=np.exp(-(((xx-130)/490.)**2+((yy-530)/360.)**2)*1.8)*0.06
    base=np.zeros((H,W,3),dtype=np.uint8)
    for i,(v,a) in enumerate(zip((10,16,29),(ar,ag,ab))):
        base[:,:,i]=np.uint8(np.clip(v+a*glow+((ar,ag,ab)[i])*glow2,0,255))
    im=Image.fromarray(base,'RGB')
    d=ImageDraw.Draw(im)
    for x in range(24,W,32):
        for y in range(24,H,32):
            cir(d,x,y,0.5,'#203044')
    return im

PROJECTS={
'unipirate':dict(title='UniPirate',tagline=['Study in Germany,','without the guesswork.'],tag='EDUCATION PLATFORM',accent='#69d7cb',stages=['Student profile','Evidence-based checks','Application tracker'],status='Full-stack · Rules · AI'),
'moneo':dict(title='Moneo',tagline=['Understand money.','Plan with confidence.'],tag='PERSONAL FINANCE',accent='#a6a4fb',stages=['Statement import','Financial analysis','What-if planning'],status='Finance engine · AI tools'),
'nox':dict(title='Nox',tagline=['An assistant inside','your Notion workflow.'],tag='AI DEVELOPER TOOL',accent='#f2bc78',stages=['Ask in context','Review the plan','Trace the actions'],status='Codex · Notion MCP · Approval'),
'worldsim':dict(title='WorldSim',tagline=['Explore possible','global scenarios.'],tag='SIMULATION LAB',accent='#77b0f8',stages=['Introduce an event','Explore propagation','Branch the timeline'],status='Synthetic cohorts · Simulation'),
'dreamtransport':dict(title='DreamTransport',tagline=['Find better routes','using real data.'],tag='OPTIMIZATION',accent='#91de9c',stages=['Passenger demand','Hub optimization','Route comparison'],status='Python · k-median · Graphs'),
'voice_oasis':dict(title='Voice Oasis',tagline=['Less noise.','More context.'],tag='VOICE AI',accent='#e4a9ec',stages=['Input audio','Voice processing','Speaker and memory'],status='Speech · Streaming · AI'),
'klebl':dict(title='Klebl AI',tagline=['Read complex','construction plans.'],tag='1ST PLACE HACKATHON',accent='#f4be86',stages=['Technical document','Extract structure','Review results'],status='Blueprints · Vision · Gemini'),
'mhack':dict(title='MHack / UdS OP',tagline=['Give your desktop','a capable operator.'],tag='3RD PLACE HACKATHON',accent='#8ecdfa',stages=['A natural-language task','Tool orchestration','Visible outcome'],status='Agents · Tools · Python'),
'swissinsight':dict(title='SwissInsight',tagline=['Ask questions','about Swiss startups.'],tag='2ND PLACE HACKATHON',accent='#edabc5',stages=['Natural language','Query knowledge graph','Visualize the answer'],status='SPARQL · Graphs · AI'),
}

HACKATHONS={
'mittelstand':dict(title='Mittelstand Hackathon',place='Neumarkt, Germany',award='1ST PLACE',project='Klebl AI',accent='#f4be86',photos=['mittelstadt.png','mittelstand2.jpeg','mittelstand3.jpeg']),
'techeurope':dict(title='{Tech: Europe} AI Hackathon',place='Munich, Germany',award='3RD PLACE',project='UdS Operator / MHack',accent='#8ecdfa',photos=['munichhack.jpeg']),
'starthack':dict(title='START HACK 2025',place='St. Gallen, Switzerland',award='3RD PLACE',project='Voice Oasis',accent='#e4a9ec',photos=['starthack.jpg','start_hack2.jpeg']),
'swisshacks':dict(title='SwissHacks',place='Zurich, Switzerland',award='2ND PLACE',project='SwissInsight',accent='#edabc5',photos=['swisshacks1.jpeg','swisshacks2.jpeg']),
'servusai':dict(title='Servus AI Summer',place='Neumarkt, Germany',award='2ND PLACE',project='DreamTransport',accent='#91de9c',photos=['dream_transport.gif']),
}

def base_project(cfg,t):
    im=gradient(cfg['accent']);d=ImageDraw.Draw(im)
    pill(d,42,36,cfg['tag'],fill='#1b2b3e',fg=cfg['accent'],size=11)
    txt(d,(42,102),cfg['title'],45,'#f1f6ff','b')
    for n,line in enumerate(cfg['tagline']):
        txt(d,(43,174+n*28),line,21,'#a9bbd0','m')
    # left step trail
    for i,st in enumerate(cfg['stages']):
        y=283+i*39
        active=(int(t*len(cfg['stages']))%len(cfg['stages']))==i
        cir(d,53,y+8,9,cfg['accent'] if active else '#2b3c50')
        if active:cir(d,53,y+8,3,'#071727')
        txt(d,(74,y-2),st,15,'#f3f7fd' if active else '#71859a','m' if active else 'r')
        if i+1<len(cfg['stages']):stroke(d,[(53,y+19),(53,y+32)],'#29384b',2)
    txt(d,(42,456),cfg['status'],12,'#8b9eb3','m')
    # outer tiny detail
    txt(d,(42,500),'PRODUCT WORKFLOW  /  CONCEPT ANIMATION',11,'#677c92','m')
    cir(d,871,41,4,cfg['accent'])
    txt(d,(884,32),'LOOP',11,'#92a9bb','s')
    return im

def window(d,title,accent):
    box(d,(405,70,920,469),'#121f31',18,outline='#344558',width=1)
    box(d,(405,70,920,115),'#172639',18)
    d.rectangle((405,96,920,115),fill='#172639')
    for i,c in enumerate(('#fc6f71','#f2c46a','#69cb9f')):cir(d,425+i*16,92,4,c)
    txt(d,(480,81),title,12,'#c5d7ea','m')
    cir(d,898,92,4,accent)

def card(d,x,y,w,h,fill='#192b40',border='#34455a',rad=11):
    box(d,(x,y,x+w,y+h),fill,rad,border,1)

def divider(d,x,y,w): stroke(d,[(x,y),(x+w,y)],'#304258',1)

def field(d,x,y,w,title,value,accent):
    txt(d,(x,y),title,11,'#819cb5','m')
    card(d,x,y+20,w,42)
    txt(d,(x+11,y+30),value,15,'#e6eef9','m')
    cir(d,x+w-18,y+41,3,accent)

def checkline(d,x,y,textv,accent,done=True):
    box(d,(x,y,x+20,y+20), '#224d48' if done else '#23354a',5)
    if done:stroke(d,[(x+5,y+10),(x+9,y+14),(x+16,y+6)],accent,2)
    txt(d,(x+31,y),textv,14,'#d5e2f0' if done else '#97acc1')

def bars(d,x,y,values,accent,progress_u=1.0,width=340):
    maxv=max(values)
    gap=17
    bw=(width-gap*(len(values)-1))/len(values)
    for i,v in enumerate(values):
        h=v/maxv*130*ease(progress_u)
        box(d,(x+i*(bw+gap),y-h,x+i*(bw+gap)+bw,y),accent if i==len(values)-2 else '#5364aa',5)
        txt(d,(x+i*(bw+gap)+bw/2,y+12),['JAN','FEB','MAR','APR','MAY','JUN'][i%6],10,'#8da2b9',anchor='mt')

def wave(d,x,y,w,h,level,accent,time_v):
    points=[]
    for k in range(210):
        xx=x+k*w/209
        env=(0.3+0.65*abs(math.sin(k*.053+.5)))
        yy=y+h/2+(math.sin(k*(.28 if level>0.75 else .19)-time_v*9)+.26*math.sin(k*.68+time_v*3))*h*.36*level*env
        points.append((int(xx),int(yy)))
    stroke(d,points,accent,2)

def network(d,accent,t,optimized=False):
    pts=[(468,224),(556,170),(632,254),(726,186),(822,252),(550,351),(716,363),(840,360)]
    edges=[(0,1),(1,2),(2,3),(3,4),(0,5),(5,6),(6,7),(2,6),(4,7)]
    for a,b in edges:
        stroke(d,[pts[a],pts[b]],'#344b61',3)
    if optimized:
        path=[0,1,2,6,7,4]
        prog=clamp(t*1.7)
        for i in range(len(path)-1):
            if prog*len(path)>i:
                a,b=pts[path[i]],pts[path[i+1]];q=clamp(prog*len(path)-i)
                end=(a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q)
                stroke(d,[a,end],accent,5)
    for i,(x,y) in enumerate(pts):
        active=optimized and i in {0,2,4,6}
        cir(d,x,y,8 if active else 6,accent if active else '#7693ac')
        cir(d,x,y,3,'#102335')

def d_scene(slug,stage,u,cfg):
    ac=cfg['accent'];d=None
    art=Image.new('RGB',(W,H),'#0a101d');d=ImageDraw.Draw(art)
    window(d,cfg['stages'][stage],ac)
    x=429
    if slug=='unipirate':
        if stage==0:
            txt(d,(429,136),'Build your student profile',22,'#f6f9fe','b')
            txt(d,(429,166),'Start with verified, structured inputs.',13,'#90a7c2')
            field(d,429,202,220,'Country','India',ac)
            field(d,668,202,220,'Study level',"Bachelor's",ac)
            field(d,429,299,459,'Qualification','Higher secondary / equivalent',ac)
            progress(d,429,403,457,.13+.78*ease(u),ac)
            txt(d,(430,422),'Step 1 of 3   ·   Example inputs',11,'#819db4')
        if stage==1:
            txt(d,(429,136),'Eligibility evidence',22,'#f6f9fe','b')
            txt(d,(429,167),'Decisions show what is known—and unknown.',13,'#90a7c2')
            for i,(a,b) in enumerate([('Qualification review','Source-backed'),('Rule coverage','Some cases unknown'),('Official documents','Links retained')]):
                card(d,429,206+i*66,454,55)
                cir(d,449,231+i*66,7,ac if i!=1 else '#f6c87a')
                txt(d,(466,214+i*66),a,14,'#e8eff7','s')
                txt(d,(466,233+i*66),b,11,'#8da5bf')
            txt(d,(431,419),'Official sources take priority over AI guesses.',11,ac)
        if stage==2:
            txt(d,(429,136),'Your application workspace',22,'#f6f9fe','b')
            txt(d,(429,165),'Example application · editable tasks',13,'#90a7c2')
            checkline(d,434,216,'Review entry requirements',ac,True)
            checkline(d,434,263,'Gather required documents',ac,True)
            checkline(d,434,310,'Check official application deadline',ac,False)
            checkline(d,434,357,'Submit when ready',ac,False)
            pill(d,430,413,'Now   /   Next   /   Later',fill='#23423f',fg=ac)
    elif slug=='moneo':
        if stage==0:
            txt(d,(429,137),'Import your transactions',23,'#f5f7ff','b')
            txt(d,(429,166),'Structured intake with review before acceptance',12,'#98aac5')
            card(d,430,206,457,129,fill='#17253c')
            pill(d,447,224,'CSV   •   SAMPLE DATA',fill='#273950',fg=ac)
            txt(d,(448,268),'example-statement.csv',19,'#e0e9fa','s')
            progress(d,448,305,415,ease(u),ac)
            checkline(d,437,366,'Column mapping reviewed',ac,True)
            txt(d,(438,409),'Uncertain records stay in Review',12,'#a4b7ca')
        elif stage==1:
            txt(d,(429,135),'Understand your spending',23,'#f5f7ff','b')
            txt(d,(429,165),'Synthetic sample values, not personal finances',12,'#98aac5')
            card(d,428,198,459,226)
            bars(d,456,369,[32,51,64,49,86,58],ac,u,397)
            txt(d,(449,215),'Monthly expenditure trends',14,'#eaf1fb','s')
            txt(d,(449,239),'Sample breakdown',12,'#93a9c4')
            pill(d,449,392,'TRANSACTIONS VERIFIED IN APP',fill='#292b4c',fg=ac,size=10)
        else:
            txt(d,(429,136),'Explore a what-if scenario',22,'#f5f7ff','b')
            txt(d,(429,165),'Calculations remain application-owned.',12,'#98aac5')
            card(d,429,202,457,204)
            txt(d,(452,225),'Travel allocation · demo',15,'#ebf0fc','s')
            txt(d,(452,270),'Less',13,'#98a9c5');txt(d,(823,270),'More',13,'#98a9c5')
            box(d,(451,306,860,313),'#30394c',4)
            cir(d,451+375*ease(u),310,10,ac)
            txt(d,(453,360),'Update plan → recalculate',14,ac,'s')
            txt(d,(430,429),'Explore assumptions before changing real data.',11,'#8fa5bc')
    elif slug=='nox':
        if stage==0:
            txt(d,(429,136),'Inside your Notion workspace',21,'#faf4eb','b')
            card(d,429,181,230,228)
            txt(d,(447,204),'Research Notes',17,'#e7eef5','s')
            for i,t in enumerate(['Meeting notes','Ideas & experiments','Architecture','Reading list']):
                txt(d,(449,251+i*34),'•  '+t,12,'#98adc4')
            card(d,671,181,215,228,fill='#1f2d40')
            txt(d,(688,200),'Nox assistant',15,ac,'s')
            txt(d,(688,243),'Organize these',14,'#dfe8f3')
            txt(d,(688,265),'notes by topic.',14,'#dfe8f3')
            progress(d,689,361,175,u,ac)
        elif stage==1:
            txt(d,(429,138),'Changes need your approval',21,'#faf4eb','b')
            txt(d,(429,165),'Preview the plan before updating Notion.',12,'#91a7bd')
            card(d,429,206,458,173)
            checkline(d,449,225,'Create a topics database',ac,True)
            checkline(d,449,271,'Move 4 related notes',ac,True)
            checkline(d,449,317,'Preserve original references',ac,True)
            pill(d,592,401,'REVIEW PROPOSED CHANGES',fill='#4a3d2e',fg=ac,size=11)
        else:
            txt(d,(429,137),'A visible action history',21,'#faf4eb','b')
            for i,(t,s) in enumerate([('Create database','Applied'),('Update references','Verified'),('Move notes','Approval tracked')]):
                card(d,429,192+i*73,460,62)
                txt(d,(449,203+i*73),t,15,'#dce7f4','s')
                pill(d,746,199+i*73,s,fill='#2e433d',fg='#91eac2',size=10)
            txt(d,(429,431),'Undo only where Notion supports verification.',11,'#879fba')
    elif slug=='worldsim':
        if stage==0:
            txt(d,(430,133),'Inject a world event',22,'#eaf3ff','b')
            txt(d,(430,163),'Illustrative scenario, not a prediction',12,'#a1b5c9')
            # globe
            cir(d,653,319,124,None,'#526982',2)
            for angle in range(-60,61,30):
                dx=124*math.cos(math.radians(angle));
                d.arc((653-dx,195,653+dx,443),20,340,fill='#2c4e71',width=2)
            for yy in [241,319,397]:
                dx=math.sqrt(max(0,124**2-(yy-319)**2))
                stroke(d,[(653-dx,yy),(653+dx,yy)],'#2d506e',2)
            for (ang,rr) in [(55,78),(137,95),(265,82),(315,115)]:
                a=math.radians(ang+u*32); px=653+rr*math.cos(a);py=319+rr*.7*math.sin(a)
                cir(d,px,py,5,ac)
            pill(d,440,398,'ENERGY PRICE SHOCK',fill='#1a3550',fg=ac,size=11)
        else:
            txt(d,(429,136),'Compare simulated paths',22,'#eaf3ff','b')
            txt(d,(429,166),'Synthetic cohorts · country interactions',12,'#95b0ca')
            chart=[(448,376),(497,349),(546,359),(593,285),(642,304),(693,244),(754,229),(813,191),(868,164)]
            coords=[(x, y+100*(1-ease(u))) for x,y in chart]
            stroke(d,coords,ac,4)
            stroke(d,[(448,370),(868,315)],'#667b91',2)
            for p in coords[::2]:cir(d,*p,4,ac)
            txt(d,(448,206),'Baseline',13,'#758ba4');txt(d,(773,207),'Scenario A',13,ac)
            pill(d,446,414,'BRANCH TIMELINE',fill='#243a54',fg=ac)
    elif slug=='dreamtransport':
        txt(d,(429,133),'Network optimization',22,'#eaf9ec','b')
        txt(d,(429,160),'Schematic network · not a geographic map',11,'#98b5a3')
        network(d,ac,u,optimized=(stage!=0))
        if stage==0:pill(d,451,412,'CURRENT NETWORK',fill='#253d33',fg='#a9e5b8')
        elif stage==1:pill(d,451,412,'HUB SELECTION · K-MEDIAN',fill='#253d33',fg='#a9e5b8')
        else:pill(d,451,412,'COMPARE ROUTE OPTIONS',fill='#253d33',fg='#a9e5b8')
    elif slug=='voice_oasis':
        txt(d,(429,135),['Audio input','Voice enhancement','Speaker and memory'][stage],23,'#faedff','b')
        txt(d,(429,165),'Illustrative signal, not recorded audio',12,'#ac9fbb')
        card(d,430,208,453,103)
        wave(d,449,231,415,55,1 if stage==0 else .45, '#cf718f' if stage==0 else ac,u)
        card(d,430,327,453,100)
        if stage==0:
            txt(d,(447,350),'Background noise detected',15,'#ebd3df','s')
            txt(d,(447,385),'Processing audio frames...',13,'#a79ab2')
        elif stage==1:
            wave(d,449,344,415,65,.55,ac,u)
            txt(d,(448,409),'Enhanced voice channel',11,ac)
        else:
            pill(d,447,351,'SPEAKER A',fill='#4b3650',fg=ac)
            txt(d,(448,395),'Conversation memory: contextual notes',12,'#d6c5de')
    elif slug=='klebl':
        txt(d,(431,134),'Technical drawing analysis',21,'#fff4e8','b')
        # blueprint
        card(d,430,180,266,246,'#1b2d40')
        for yy in range(200,423,20):stroke(d,[(443,yy),(684,yy)],'#263b53',1)
        for xx in range(443,683,20):stroke(d,[(xx,194),(xx,413)],'#263b53',1)
        d.rectangle((467,219,665,385),outline='#88a8c5',width=3)
        stroke(d,[(467,256),(562,256),(562,385)],'#88a8c5',3)
        stroke(d,[(550,219),(550,256)],'#88a8c5',3)
        stroke(d,[(602,256),(602,385)],'#88a8c5',3)
        stroke(d,[(480,312),(546,312)],'#88a8c5',2)
        if stage>=1:
            d.rectangle((464,216,669,389),outline=ac,width=3)
            if stage==2: d.rectangle((548,250,607,389),outline='#9addb4',width=3)
        card(d,711,194,176,215)
        txt(d,(725,213),'Structured fields',14,'#f3eee6','s')
        for i,fieldv in enumerate(['Rooms','Dimensions','Notes']):
            txt(d,(727,254+i*43),fieldv,13,'#bac8d6')
            pill(d,815,248+i*43,'✓' if stage==2 else '…',fill='#31453d' if stage==2 else '#304053',fg='#9be7c0' if stage==2 else '#b1c0cf',px=9,size=10)
        if stage==0: pill(d,442,437,'BLUEPRINT INPUT',fill='#3f392e',fg=ac,size=10)
        else:pill(d,442,437,'REVIEW EXTRACTED INFORMATION',fill='#3f392e',fg=ac,size=10)
    elif slug=='mhack':
        txt(d,(429,133),'Desktop task orchestration',22,'#eef9ff','b')
        card(d,429,184,459,59,fill='#24344b')
        txt(d,(444,203),'“Summarize project files and plan next steps”',13,'#e0eaf5','m')
        for i,(name,status) in enumerate([('file.search','Find files'),('python.run','Analyze content'),('plan.generate','Draft next steps')]):
            card(d,429,263+i*48,459,39)
            txt(d,(446,275+i*48),name,13,ac,'m')
            txt(d,(717,275+i*48),status,11,'#a4b9cf')
            cir(d,872,283+i*48,5,ac if u>(i+1)*.26 or stage>=1 else '#2b3a4b')
        txt(d,(432,429),'Transparent tool sequence · illustrative',11,'#91a5ba')
    elif slug=='swissinsight':
        txt(d,(429,133),'Question → knowledge graph',21,'#fcedf1','b')
        card(d,430,188,456,64)
        txt(d,(443,210),'“Explore Swiss startup funding patterns”',13,'#e9eef8','m')
        if stage==0:
            for xx,yy in [(515,328),(598,296),(685,345),(754,277),(837,348)]:cir(d,xx,yy,11,'#5a3d5c')
            arcs=[((515,328),(598,296)),((598,296),(685,345)),((685,345),(754,277)),((754,277),(837,348)),((598,296),(754,277))]
            for a,b in arcs:stroke(d,[a,b],ac,2)
            for xx,yy in [(515,328),(598,296),(685,345),(754,277),(837,348)]:cir(d,xx,yy,5,ac)
            pill(d,449,407,'RDF   /   SPARQL',fill='#4c2f48',fg=ac)
        else:
            card(d,441,274,430,145)
            bars(d,464,386,[27,42,65,50,86],ac,u,365)
            txt(d,(459,285),'Funding trends · sample visualization',13,'#dfcadc')
    return art

def project_frame(slug,t):
    cfg=PROJECTS[slug]; n=len(cfg['stages']); phase=min(n-1,int(t*n));u=(t*n-phase)
    base=base_project(cfg,t)
    scene=d_scene(slug,phase,u,cfg)
    a=base.copy();a.paste(scene.crop((405,70,921,470)),(405,70))
    if u>.84:
        next_idx=(phase+1)%n
        nextbase=base_project(cfg,(next_idx+.01)/n)
        nextscene=d_scene(slug,next_idx,0.01,cfg)
        nextbase.paste(nextscene.crop((405,70,921,470)),(405,70))
        a=Image.blend(a,nextbase,ease((u-.84)/.16))
    d=ImageDraw.Draw(a)
    progress(d,405,482,514,(t%1),cfg['accent'])
    return a

def get_photo_from_assets(root,names):
    if not root or not Path(root).is_dir():return []
    res=[]
    for name in names:
        p=Path(root)/name
        if p.is_file():
            try:
                im=Image.open(p);im.seek(0);res.append(im.convert('RGB'))
            except:pass
    return res

def fit_crop(image,w,h,t=0):
    sw,sh=image.size
    overscan=1.14
    scale=max(w/sw,h/sh)*overscan
    iw,ih=max(w,round(sw*scale)),max(h,round(sh*scale))
    resized=image.resize((iw,ih),Image.Resampling.LANCZOS)
    # modest Ken Burns movement
    shiftx=(iw-w)*clamp(.26+.5*t)
    shifty=(ih-h)*clamp(.48-.26*t)
    return resized.crop((int(shiftx),int(shifty),int(shiftx)+w,int(shifty)+h))

def awards_frame(key,t,photos):
    cfg=HACKATHONS[key]; ac=cfg['accent']
    im=gradient(ac);d=ImageDraw.Draw(im)
    pill(d,44,35,'HACKATHON HIGHLIGHT',fill='#263449',fg='#a7bbd0',size=11)
    # large award mark
    txt(d,(44,105),cfg['award'],43,ac,'b')
    txt(d,(44,191),cfg['title'],25,'#f3f6fd','b')
    txt(d,(44,236),cfg['place'],16,'#a8bace')
    stroke(d,[(44,296),(360,296)],'#35475d',2)
    txt(d,(44,327),'BUILT',11,'#7890a9','s')
    txt(d,(44,350),cfg['project'],25,'#eff4fc','s')
    txt(d,(44,458),'TEAM BUILD  •  DEMO  •  AWARD',12,'#7f95ab','m')
    box(d,(428,64,919,466),'#1a293b',18,'#43566a')
    if photos:
        idx=min(len(photos)-1,int(t*len(photos)))
        selected=photos[idx]
        sub=(t*len(photos))%1
        pic=fit_crop(selected,487,398,sub)
        pic=Image.blend(pic,Image.new('RGB',pic.size,'#111c2c'),.18)
        mask=Image.new('L',(487,398));md=ImageDraw.Draw(mask);md.rounded_rectangle((0,0,486,397),radius=14,fill=255)
        im.paste(pic,(430,66),mask)
        d=ImageDraw.Draw(im)
        box(d,(461,380,888,441),'#14273a',12)
        txt(d,(480,398),f'{cfg["project"]}  /  TEAM EVENT',14,'#fff7ee','s')
    else:
        # Photographs are available in the original repository, not in this package.
        # Provide abstract kinetic highlight now; --existing-assets builds photo reels later.
        for i in range(6):
            xx=485+i*69; yy=164+int(25*math.sin(t*2*math.pi+i*.8))
            d.rounded_rectangle((xx,yy,xx+28,yy+28),radius=8,fill=rgb(ac))
            stroke(d,[(xx+14,yy+28),(xx+14,yy+172)],'#466071',2)
        txt(d,(485,106),'BUILD → DEMO → PRESENT',14,'#abc0d4','s')
        # abstract panel
        card(d,484,307,372,105,'#22344c','#43566c')
        txt(d,(502,327),cfg['project'],26,'#eff5fa','b')
        txt(d,(502,367),'Project highlight reel',12,ac,'m')
        for i in range(25):
            xx=450+(i*59)%460;yy=178+(i*37)%100
            cir(d,xx,yy,1.5,ac)
    progress(d,428,482,490,t,ac)
    txt(d,(44,503),'EVENT PHOTOS CAN BE REBUILT FROM YOUR EXISTING REPOSITORY',10,'#637d94','m')
    return im

def render_video(draw_frame,output,poster,duration,fps=FPS):
    output.parent.mkdir(parents=True,exist_ok=True)
    poster.parent.mkdir(parents=True,exist_ok=True)
    cmd=['ffmpeg','-nostdin','-hide_banner','-loglevel','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(fps),'-i','-', '-an','-c:v','libx264','-preset','veryfast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(output)]
    process=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
    n=int(duration*fps)
    for i in range(n):
        t=i/n
        frame=draw_frame(t)
        if i==round(n*.41):frame.save(poster,'WEBP',quality=90,method=5)
        try:process.stdin.write(frame.tobytes())
        except BrokenPipeError:break
    process.stdin.close()
    err=process.stderr.read().decode('utf8','replace')
    code=process.wait()
    if code:raise RuntimeError(f'ffmpeg error {code}: {err}')
    if not poster.exists():draw_frame(.41).save(poster,'WEBP',quality=90)

def main():
    a=argparse.ArgumentParser()
    a.add_argument('--output',default='media')
    a.add_argument('--existing-assets',default=None)
    a.add_argument('--only',default=None,help='Single project/hackathon slug for test')
    args=a.parse_args()
    out=Path(args.output).resolve();(out/'projects').mkdir(parents=True,exist_ok=True);(out/'hackathons').mkdir(parents=True,exist_ok=True);(out/'posters').mkdir(parents=True,exist_ok=True)
    for slug in PROJECTS:
        if args.only and args.only!=slug:continue
        print(f'Project: {slug}',flush=True)
        render_video(lambda t,slug=slug:project_frame(slug,t),out/'projects'/f'{slug}.mp4',out/'posters'/f'{slug}.webp',7 if slug in ['unipirate','moneo','nox'] else 6)
    for slug,cfg in HACKATHONS.items():
        if args.only and args.only!=slug:continue
        print(f'Hackathon: {slug}',flush=True)
        photos=get_photo_from_assets(args.existing_assets,cfg['photos'])
        render_video(lambda t,slug=slug,photos=photos:awards_frame(slug,t,photos),out/'hackathons'/f'{slug}.mp4',out/'posters'/f'{slug}.webp',5)
    print('Done.',flush=True)

if __name__=='__main__':main()
