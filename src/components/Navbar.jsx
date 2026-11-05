import {useEffect,useState} from 'react';import {NavLink,Link,useLocation} from 'react-router-dom';import {Menu,X} from 'lucide-react';import {NAV} from '../config.js';
export default function Navbar(){const [s,setS]=useState(false);const [o,setO]=useState(false);const {pathname}=useLocation();const solid=s||o||pathname!=='/';
useEffect(()=>{const f=()=>setS(scrollY>40);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
return(<header className={'nav'+(solid?' solid':'')}><Link to="/" className="logo" onClick={()=>setO(false)}>NGO</Link>
<button className="burger" aria-expanded={o} aria-label="Menu" onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button>
<nav className={o?'open':''}>{NAV.map(([p,l])=><NavLink key={p} to={p} end={p==='/'} onClick={()=>setO(false)}>{l}</NavLink>)}
<Link to="/donate" className="btn gold sm" onClick={()=>setO(false)}>Donate</Link></nav></header>)}
