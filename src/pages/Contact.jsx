import SectionHeading from '../components/SectionHeading.jsx';import EnquiryForm from '../components/EnquiryForm.jsx';import {CONFIG} from '../config.js';
export default function Contact(){return(<section className="sec pt split"><div><SectionHeading label="Contact" title="Get in touch">General, humanitarian assistance, legal support and volunteer enquiries are welcome.</SectionHeading>
<p>Email: {CONFIG.email||'placeholder'}<br/>Phone: {CONFIG.phone||'placeholder'}<br/>{CONFIG.address}</p></div><EnquiryForm/></section>)}
