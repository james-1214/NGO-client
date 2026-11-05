import SectionHeading from '../components/SectionHeading.jsx';import EnquiryForm from '../components/EnquiryForm.jsx';
const W=[['Volunteer with us','Offer your time and skills.'],['Participate in outreach','Join community events.'],['Support humanitarian initiatives','Help strengthen our programmes.'],['Spread awareness','Share our message responsibly.']];
export default function GetInvolved(){return(<><section className="sec pt"><SectionHeading label="Get involved" title="Join the effort"/><div className="grid">{W.map(([t,d])=><div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></section>
<section className="sec alt"><SectionHeading label="Volunteer enquiry" title="Tell us about you"/><EnquiryForm volunteer/></section></>)}
