(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const G=!!(window.gsap&&window.ScrollTrigger);
let started=false;
/* Legacy CSS-based reveal hiding is replaced by GSAP; never leave content hidden. */
$$('.reveal-ready').forEach(e=>e.classList.remove('reveal-ready','is-visible'));

/* Split text nodes into masked words, keeping <em>/<br> structure. Returns inner word spans. */
function splitWords(el){
  const out=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{
    if(!n.nodeValue.trim())return;
    const f=document.createDocumentFragment();
    n.nodeValue.split(/(\s+)/).forEach(p=>{
      if(!p)return;
      if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(' '));return;}
      const w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
      const i=document.createElement('span');i.className='wi';i.textContent=p;w.appendChild(i);f.appendChild(w);out.push(i);
    });
    n.replaceWith(f);
  });
  return out;
}

/* Header: solid on scroll + active link tracking (works without GSAP) */
const header=$('.site-header');
const tbar=$('.topbar');const onScroll=()=>{if(!header)return;header.classList.toggle('is-solid',scrollY>40);header.style.setProperty('--hdr-top',Math.max(0,(tbar?tbar.offsetHeight:0)-scrollY)+'px');};addEventListener('resize',onScroll);
addEventListener('scroll',onScroll,{passive:true});onScroll();
const links=$$('.main-nav a[href^="#"]:not(.nav-cta)');
if('IntersectionObserver' in window){
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const id=e.target.id==='donation-form'?'donate':e.target.id;(map.get(id)||map.get('work')&&e.target.id==='humanitarian'&&map.get('work'))?.classList.add('active');}}),{rootMargin:'-45% 0px -50% 0px'});
  ['home','about','work','activities','gallery','donate','donation-form','contact'].forEach(id=>{const s=document.getElementById(id);if(s)io.observe(s);});
}

/* Ripple on all buttons (safe on touch too) */
document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.button');if(!b)return;
  const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');
  s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
  b.appendChild(s);setTimeout(()=>s.remove(),650);
});

/* Footer / decorative DOM that is safe without GSAP */
['#work','#activities','#gallery'].forEach(sel=>{const el=$(sel);if(el){const d=document.createElement('div');d.className='gold-sep';d.setAttribute('aria-hidden','true');el.before(d);}});
$$('.donation-section,.contact-section,.donation-banner').forEach(sec=>{for(let i=0;i<5;i++){const f=document.createElement('i');f.className='gold-float';f.style.cssText=`left:${8+Math.random()*84}%;top:${10+Math.random()*75}%;animation-delay:${-Math.random()*6}s;transform:scale(${.6+Math.random()*.9}) rotate(45deg)`;sec.appendChild(f);}});
const addr=$$('.contact-details > div').find(d=>/ADDRESS/i.test(d.textContent));
if(addr){const p=$('p',addr);if(p){const pin=document.createElement('span');pin.className='pin';pin.textContent='⌖';pin.setAttribute('aria-hidden','true');p.prepend(pin);}}
$$('.work-image,.about-photo,.activity-card').forEach(el=>{const n='http://www.w3.org/2000/svg',s=document.createElementNS(n,'svg');s.setAttribute('class','draw-outline');s.setAttribute('viewBox','0 0 100 100');s.setAttribute('preserveAspectRatio','none');s.setAttribute('aria-hidden','true');const r=document.createElementNS(n,'rect');['x','y'].forEach(a=>r.setAttribute(a,0));r.setAttribute('width',100);r.setAttribute('height',100);r.setAttribute('pathLength',1);s.appendChild(r);el.appendChild(s);});
$$('.amount').forEach(b=>b.addEventListener('click',()=>{if(G&&!reduce)gsap.fromTo(b,{scale:.92},{scale:1,duration:.5,ease:'back.out(3)'});}));

/* Cursor, trail, magnetic buttons, tilt — desktop pointer only */
function desktopFx(){
  if(!fine||reduce||!G)return;
  document.body.classList.add('has-cursor');
  const dot=document.createElement('div'),ring=document.createElement('div');dot.className='cur-dot';ring.className='cur-ring';document.body.append(dot,ring);
  const dx=gsap.quickTo(dot,'x',{duration:.08}),dy=gsap.quickTo(dot,'y',{duration:.08}),rx=gsap.quickTo(ring,'x',{duration:.35,ease:'power3'}),ry=gsap.quickTo(ring,'y',{duration:.35,ease:'power3'});
  let last=0;
  addEventListener('pointermove',e=>{dot.style.opacity=ring.style.opacity=1;dx(e.clientX);dy(e.clientY);rx(e.clientX);ry(e.clientY);
    const n=performance.now();if(n-last>45){last=n;const t=document.createElement('i');t.className='trail';t.style.left=e.clientX+'px';t.style.top=e.clientY+'px';document.body.appendChild(t);setTimeout(()=>t.remove(),700);}
    ring.classList.toggle('hot',!!e.target.closest('a,button,.amount,input,textarea,select'));},{passive:true});
  document.addEventListener('mouseleave',()=>dot.style.opacity=ring.style.opacity=0);
  $$('.hero-actions .button,.button-gold,.nav-donate').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.3});});
    b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));});
  $$('.work-image,.donation-form,.contact-form,.values-inner > div').forEach(c=>{
    gsap.set(c,{transformPerspective:900});
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;gsap.to(c,{rotationY:px*7,rotationX:-py*7,duration:.4,ease:'power2.out'});});
    c.addEventListener('pointerleave',()=>gsap.to(c,{rotationX:0,rotationY:0,duration:.7,ease:'power3.out'}));});
}

/* Hero entrance (runs after the loader) */
function heroIntro(){
  const h1=$('.hero h1'),words=h1?splitWords(h1):[];
  if(!G||reduce)return;
  const tl=gsap.timeline({defaults:{ease:'power4.out'}});
  tl.fromTo(words,{yPercent:115,rotate:4},{yPercent:0,rotate:0,duration:1,stagger:.12},0)
    .fromTo('.hero-kicker,.hero-copy,.hero-note',{y:24,opacity:0},{y:0,opacity:1,duration:.9,stagger:.12,clearProps:'transform'},.5)
    .fromTo('.hero-actions .button',{y:30,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.8,stagger:.12,ease:'back.out(1.6)',clearProps:'transform'},.9)
    .fromTo('.hero-seal',{scale:.4,opacity:0,rotationY:120},{scale:1,opacity:1,rotationY:0,duration:1.2,ease:'back.out(1.5)',clearProps:'transform'},.3);
}

/* Explicit from→to reveal: never lets GSAP infer a stale end state (prevents elements stuck hidden). */
function FT(t,v){const to={};Object.keys(v).forEach(k=>{
  if(k==='opacity')to.opacity=1;
  else if(['x','y','xPercent','yPercent','rotate','rotationX','rotationY'].includes(k))to[k]=0;
  else if(k==='scale')to.scale=1;
  else if(k==='scaleX')to.scaleX=1;
  else if(k==='clipPath')to.clipPath=String(v.clipPath).startsWith('circle')?'circle(80% at 50% 50%)':'inset(0% 0% 0% 0%)';
  else to[k]=v[k];});
  to.clearProps=(to.clearProps||'')||'';
  return gsap.fromTo(t,v,to);}
function scrollFx(){
  if(!G||reduce)return;
  gsap.registerPlugin(ScrollTrigger);
  // Hero exit + parallax
  const st={trigger:'.hero',start:'top top',end:'bottom top',scrub:true};
  gsap.to('.hero-content',{yPercent:-14,opacity:.15,ease:'none',scrollTrigger:st});
  gsap.to('#justice-scene',{yPercent:10,scale:.92,opacity:.4,ease:'none',scrollTrigger:st});
  gsap.to('.hero-rays,.hero-glow',{y:120,ease:'none',scrollTrigger:st});
  // Heading character/word reveal
  $$('.section h2,.donation-banner h2,.contact-section h2').forEach(h=>{
    const w=splitWords(h);FT(w,{yPercent:110,duration:.9,stagger:.06,ease:'power4.out',scrollTrigger:{trigger:h,start:'top 85%',toggleActions:'play none none none'}});});
  // Decorative lines & separators
  $$('.gold-sep,.gold-line').forEach(l=>FT(l,{scaleX:0,duration:1.3,ease:'power3.inOut',scrollTrigger:{trigger:l,start:'top 92%',toggleActions:'play none none none'}}));
  $$('.eyebrow span').forEach(s=>FT(s,{scaleX:0,transformOrigin:'left',duration:.8,scrollTrigger:{trigger:s,start:'top 92%',toggleActions:'play none none none'}}));
  // Clip reveals + gold outline draw
  $$('.about-photo,.activity-card img,.gallery-grid img').forEach((el,i)=>FT(el,{clipPath:'inset(0 0 100% 0)',scale:1.08,duration:1.2,delay:(i%4)*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}}));
  $$('.draw-outline rect').forEach(r=>gsap.to(r,{strokeDashoffset:0,duration:1.8,ease:'power2.inOut',scrollTrigger:{trigger:r.closest('div,article'),start:'top 80%',toggleActions:'play none none none'}}));
  // Humanitarian: circular mask. Legal: right-side image reveal + left text + divider.
  FT('#humanitarian .work-image',{clipPath:'circle(0% at 50% 50%)',duration:1.6,ease:'power3.out',scrollTrigger:{trigger:'#humanitarian',start:'top 80%',toggleActions:'play none none none'}});
  FT('#legal .work-image',{clipPath:'inset(0 0 0 100%)',duration:1.4,ease:'power3.out',scrollTrigger:{trigger:'#legal',start:'top 80%',toggleActions:'play none none none'}});
  FT('#legal .work-body > *',{x:-40,opacity:0,stagger:.1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'#legal',start:'top 70%',toggleActions:'play none none none'}});
  gsap.fromTo('#legal .work-body',{'--d':0},{'--d':1,duration:1.4,ease:'power2.inOut',scrollTrigger:{trigger:'#legal',start:'top 75%',toggleActions:'play none none none'}});
  // Parallax images
  $$('.about-photo img,.work-image img').forEach(img=>{gsap.fromTo(img,{yPercent:-7,scale:1.14},{yPercent:7,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}});});
  // Staggered cards
  [['.pillars','.pillar-card'],['.values-inner','.values-inner > div'],['.activity-grid','.activity-card'],['.contact-details','.contact-details > div']].forEach(([t,c])=>{
    const side=t==='.contact-details';
    FT(c,{y:side?0:50,x:side?50:0,opacity:0,duration:.9,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:t,start:'top 85%',toggleActions:'play none none none'}});});
  FT('.about-copy > *',{y:30,opacity:0,stagger:.1,duration:.9,scrollTrigger:{trigger:'.about-copy',start:'top 80%',toggleActions:'play none none none'}});
  FT('.donation-form',{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.donation-form',start:'top 85%',toggleActions:'play none none none'}});
  FT('.footer-col',{y:30,opacity:0,stagger:.12,duration:.9,scrollTrigger:{trigger:'.footer',start:'top 90%',toggleActions:'play none none none'}});
  // Floating gold elements drift with scroll
  $$('.gold-float').forEach((f,i)=>gsap.to(f,{y:(i%2?-1:1)*60,ease:'none',scrollTrigger:{trigger:f.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
  addEventListener('load',()=>ScrollTrigger.refresh());
}

function start(){
  if(started)return;started=true;
  document.body.classList.remove('loading');
  heroIntro();scrollFx();desktopFx();
}

/* Loader (~2.6s) with failsafes */
const loader=$('#loader');
function finish(){if(loader)loader.remove();start();}
if(!loader||!G||reduce){finish();}
else{
  gsap.registerPlugin(ScrollTrigger);
  const P=$('.ld-particles'),N=$('.ld-name');
  for(let i=0;i<36;i++){const p=document.createElement('i');p.className='ld-particle';p.style.left=Math.random()*100+'%';p.style.top=30+Math.random()*60+'%';P.appendChild(p);}
  N.innerHTML=[...'KHRPSC'].map(c=>`<span>${c}</span>`).join('');
  gsap.set('.ld-name span',{opacity:0,y:24,rotationX:-80});
  const tl=gsap.timeline({defaults:{ease:'power3.out'},onComplete:finish});
  tl.to('.ld-particle',{opacity:1,y:'-=70',duration:1.2,stagger:{each:.025,from:'random'}},0)
    .to('.ld-sweep',{x:'420%',duration:.9,ease:'power2.inOut'},.25)
    .fromTo('.ld-logo',{scale:.2,rotationY:-160,opacity:0},{scale:1,rotationY:0,opacity:1,duration:.9,ease:'back.out(1.4)'},.5)
    .to('.ld-ring circle',{strokeDashoffset:0,duration:.8,ease:'power2.inOut'},.9)
    .to('.ld-name span',{opacity:1,y:0,rotationX:0,duration:.5,stagger:.06},1.15)
    .to('.ld-tag',{opacity:1,duration:.5},1.7)
    .to('#loader',{opacity:0,scale:1.06,duration:.55,ease:'power2.inOut'},2.35);
  setTimeout(()=>{if(!started){tl.kill();finish();}},5000);
}
})();
