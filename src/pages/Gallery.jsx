import {useState,useEffect,useRef} from 'react';import Photo from '../components/Photo.jsx';import SectionHeading from '../components/SectionHeading.jsx';import { IMAGES } from '../assets/images.js';
const CATS=['Humanitarian Assistance','Community Outreach','Social Welfare','Legal Awareness','Events'];
const ITEMS=[
  {c:'Humanitarian Assistance',t:'Humanitarian assistance',src:IMAGES.hero},
  {c:'Humanitarian Assistance',t:'Community support supplies',src:IMAGES.humanitarian},
  {c:'Community Outreach',t:'Community solidarity',src:IMAGES.community},
  {c:'Community Outreach',t:'Outreach volunteers',src:IMAGES.outreach},
  {c:'Social Welfare',t:'Social welfare support',src:IMAGES.humanitarian},
  {c:'Legal Awareness',t:'Legal guidance consultation',src:IMAGES.legal},
  {c:'Events',t:'Community gathering',src:IMAGES.community},
];
export default function Gallery(){const [cat,setCat]=useState('All');const [i,setI]=useState(null);const closeRef=useRef(null);
const list=ITEMS.filter(x=>cat==='All'||x.c===cat);
useEffect(()=>{if(i==null)return;closeRef.current?.focus();const k=e=>{if(e.key==='Escape')setI(null);if(e.key==='ArrowRight')setI(p=>(p+1)%list.length);if(e.key==='ArrowLeft')setI(p=>(p-1+list.length)%list.length)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[i,list.length]);
return(<section className="sec pt"><SectionHeading label="Gallery" title="Moments"/><div className="row left" role="group" aria-label="Filter">{['All',...CATS].map(c=><button key={c} className={'chip'+(cat===c?' on':'')} aria-pressed={cat===c} onClick={()=>setCat(c)}>{c}</button>)}</div>
<div className="masonry g">{list.map((x,n)=><button key={x.t} className="gi" onClick={()=>setI(n)} aria-label={'Open '+x.t}><Photo src={x.src} alt={x.t}/></button>)}</div>
{i!=null&&list[i]&&<div className="lb" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={()=>setI(null)}><div onClick={e=>e.stopPropagation()}><Photo src={list[i].src} alt={list[i].t}/><p>{list[i].t}</p>
<button className="btn sm" onClick={()=>setI((i-1+list.length)%list.length)}>Previous</button> <button className="btn sm" onClick={()=>setI((i+1)%list.length)}>Next</button> <button ref={closeRef} className="btn gold sm" onClick={()=>setI(null)}>Close</button></div></div>}</section>)}
