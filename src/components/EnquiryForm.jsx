import {useState} from 'react';import {CONFIG} from '../config.js';
const TYPES=['General enquiry','Humanitarian assistance enquiry','Legal support enquiry','Volunteer enquiry'];
export default function EnquiryForm({defaultType=TYPES[0],volunteer=false}){
const [f,setF]=useState({name:'',email:'',phone:'',type:defaultType,message:''});const [e,setE]=useState({});
const set=(k,v)=>setF(p=>({...p,[k]:v}));
const check=()=>{const x={};if(f.name.trim().length<2)x.name='Please enter your name.';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email address.';
if(f.phone&&!/^[0-9+ ()-]{8,16}$/.test(f.phone))x.phone='Enter a valid phone number.';if(f.message.trim().length<10)x.message='Please write at least 10 characters.';setE(x);return!Object.keys(x).length};
const body=`Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone||'-'}\nType: ${f.type}\n\n${f.message}`;
const open=(kind)=>{if(!check())return;const u=kind==='mail'?`mailto:${CONFIG.email}?subject=${encodeURIComponent(f.type)}&body=${encodeURIComponent(body)}`:`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(body)}`;window.open(u,'_blank','noopener')};
const F=({k,l,t='text',...r})=><label>{l}<input type={t} value={f[k]} onChange={ev=>set(k,ev.target.value)} aria-invalid={!!e[k]} {...r}/>{e[k]&&<span className="err" role="alert">{e[k]}</span>}</label>;
return(<form className="form" noValidate onSubmit={ev=>ev.preventDefault()}><F k="name" l="Name" autoComplete="name"/><F k="email" l="Email" t="email" autoComplete="email"/><F k="phone" l="Phone (optional)" t="tel" autoComplete="tel"/>
<label>Enquiry type<select value={f.type} onChange={ev=>set('type',ev.target.value)}>{(volunteer?['Volunteer enquiry']:TYPES).map(t=><option key={t}>{t}</option>)}</select></label>
<label>Message<textarea rows="5" value={f.message} onChange={ev=>set('message',ev.target.value)} aria-invalid={!!e.message}/>{e.message&&<span className="err" role="alert">{e.message}</span>}</label>
<p className="note">Please do not share confidential legal case details here. This form opens a draft in your own email or WhatsApp app; nothing is sent until you send it.</p>
<div className="row"><button type="button" className="btn" disabled={!CONFIG.email} onClick={()=>open('mail')}>{CONFIG.email?'Open email draft':'Email not configured yet'}</button>
<button type="button" className="btn ghost-d" disabled={!CONFIG.whatsapp} onClick={()=>open('wa')}>{CONFIG.whatsapp?'Open WhatsApp':'WhatsApp not configured yet'}</button></div></form>)}
