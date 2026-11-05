import {useEffect,useRef,useState} from 'react';import {useInView} from 'framer-motion';
export default function ImpactCounter({value=null,label}){const r=useRef(null);const v=useInView(r,{once:true});const [n,setN]=useState(0);
useEffect(()=>{if(!v||value==null)return;let s=null;const f=t=>{s??=t;const p=Math.min((t-s)/1400,1);setN(Math.round(value*p));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)},[v,value]);
return(<div ref={r} className="stat"><b>{value==null?'—':n.toLocaleString('en-IN')}</b><span>{label}</span>{value==null&&<em>Awaiting verified figure</em>}</div>)}
