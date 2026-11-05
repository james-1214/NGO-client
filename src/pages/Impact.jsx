import SectionHeading from '../components/SectionHeading.jsx';import ImpactCounter from '../components/ImpactCounter.jsx';
// Set value to a verified number to enable the counter.
const M=[['Community assistance',null],['Humanitarian outreach',null],['Legal support initiatives',null],['Social welfare programmes',null],['Community events',null]];
export default function Impact(){return(<><section className="sec pt"><SectionHeading label="Impact" title="Impact we can stand behind">Numbers appear here only once verified. Until then, no figures are shown.</SectionHeading></section>
<section className="sec alt"><div className="stats">{M.map(([l,v])=><ImpactCounter key={l} label={l} value={v}/>)}</div></section>
<section className="sec"><SectionHeading label="Timeline" title="Milestones"/><p className="note">Timeline placeholder: add dated, verified milestones.</p></section></>)}
