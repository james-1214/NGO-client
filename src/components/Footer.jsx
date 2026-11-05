import {Link} from 'react-router-dom';import {CONFIG,NAV} from '../config.js';
export default function Footer(){return(<footer className="footer"><div><h3>NGO</h3><p>A non-political humanitarian organisation. Humanity first, dignity always.</p></div>
<div><b className="label">Explore</b>{NAV.map(([p,l])=><Link key={p} to={p}>{l}</Link>)}</div>
<div><b className="label">Support</b><Link to="/our-work#humanitarian">Humanitarian assistance</Link><Link to="/our-work#legal">Legal &amp; advocacy support</Link><Link to="/donate">Donate</Link></div>
<div><b className="label">Contact</b><span>{CONFIG.email||'Email placeholder'}</span><span>{CONFIG.phone||'Phone placeholder'}</span><span>{CONFIG.address}</span><span>Social links: placeholders</span></div>
<small>© {new Date().getFullYear()} NGO. NGO is not a law firm and does not give legal advice.</small></footer>)}
