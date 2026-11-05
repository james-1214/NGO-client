import {useState} from 'react';import SectionHeading from '../components/SectionHeading.jsx';
const A=[100,500,1000,2500];const P=['General Support','Humanitarian Assistance','Social Welfare','Legal Support','Community Outreach'];
export default function Donation(){const [f,setF]=useState({name:'',email:'',phone:'',amt:500,custom:'',freq:'One-time',purpose:P[0],msg:'',anon:false});const [e,setE]=useState({});
const set=(k,v)=>setF(p=>({...p,[k]:v}));const amt=f.custom?Number(f.custom):f.amt;
const validate=()=>{const x={};if(!f.anon&&f.name.trim().length<2)x.name='Enter your name.';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email.';if(!/^[0-9+ ()-]{8,16}$/.test(f.phone))x.phone='Enter a valid mobile number.';if(!Number.isInteger(amt)||amt<1)x.amt='Enter a whole-rupee amount.';setE(x)};
return(<><section className="sec pt"><SectionHeading label="Donate" title="Your Kindness Can Change a Life.">Every contribution represents an opportunity to bring support, dignity and hope to someone who needs it.</SectionHeading>
<p className="note strong">Payments are not enabled yet. This page is a design preview. No payment is taken and nothing is submitted.</p>
<div className="donate"><form className="form" noValidate onSubmit={ev=>{ev.preventDefault();validate()}}>
<fieldset><legend>Frequency</legend>{['One-time','Monthly'].map(v=><label key={v} className="chk"><input type="radio" checked={f.freq===v} onChange={()=>set('freq',v)}/>{v}</label>)}</fieldset>
<fieldset><legend>Amount</legend><div className="row left">{A.map(a=><button type="button" key={a} className={'chip'+(!f.custom&&f.amt===a?' on':'')} onClick={()=>{set('amt',a);set('custom','')}}>₹{a.toLocaleString('en-IN')}</button>)}</div>
<input type="number" min="1" inputMode="numeric" placeholder="Custom amount (₹)" value={f.custom} onChange={ev=>set('custom',ev.target.value)}/>{e.amt&&<span className="err" role="alert">{e.amt}</span>}</fieldset>
<label>Purpose<select value={f.purpose} onChange={ev=>set('purpose',ev.target.value)}>{P.map(p=><option key={p}>{p}</option>)}</select></label>
<label>Full name<input value={f.name} onChange={ev=>set('name',ev.target.value)}/>{e.name&&<span className="err" role="alert">{e.name}</span>}</label>
<label>Email<input type="email" value={f.email} onChange={ev=>set('email',ev.target.value)}/>{e.email&&<span className="err" role="alert">{e.email}</span>}</label>
<label>Mobile number<input type="tel" value={f.phone} onChange={ev=>set('phone',ev.target.value)}/>{e.phone&&<span className="err" role="alert">{e.phone}</span>}</label>
<label>Message (optional)<textarea rows="3" value={f.msg} onChange={ev=>set('msg',ev.target.value)}/></label>
<label className="chk"><input type="checkbox" checked={f.anon} onChange={ev=>set('anon',ev.target.checked)}/>Donate anonymously</label>
<button className="btn" type="button" onClick={validate}>Check my details</button><button className="btn" type="submit" disabled>Payments Coming Soon</button></form>
<aside className="summary"><h3>Summary (preview)</h3><p className="big">₹{Number.isInteger(amt)&&amt>0?amt.toLocaleString('en-IN'):'—'}</p><p>{f.freq} · {f.purpose}</p><p className="note">Not a transaction. No donation has been made.</p></aside></div></section></>)}
