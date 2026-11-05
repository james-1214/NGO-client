import {useState,useEffect} from 'react';import {Routes,Route,useLocation} from 'react-router-dom';import {motion} from 'framer-motion';
import Navbar from './components/Navbar.jsx';import Footer from './components/Footer.jsx';import Preloader from './components/Preloader.jsx';import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';import About from './pages/About.jsx';import OurWork from './pages/OurWork.jsx';import Impact from './pages/Impact.jsx';
import Gallery from './pages/Gallery.jsx';import Donation from './pages/Donation.jsx';import GetInvolved from './pages/GetInvolved.jsx';import Contact from './pages/Contact.jsx';
const P=({t,d,children})=>{useEffect(()=>{document.title=t+' | NGO';document.querySelector('meta[name=description]')?.setAttribute('content',d)},[t,d]);
return <motion.main initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.35}}>{children}</motion.main>};
export default function App(){const l=useLocation();const [ready,setReady]=useState(false);
return(<>{!ready&&<Preloader onDone={()=>setReady(true)}/>}<ScrollToTop/><Navbar/>
<Routes location={l} key={l.pathname}>
<Route path="/" element={<P t="Humanity First, Dignity Always" d="Humanitarian assistance and support in accessing justice."><Home/></P>}/>
<Route path="/about" element={<P t="About" d="Who we are, our vision and our non-political humanitarian commitment."><About/></P>}/>
<Route path="/our-work" element={<P t="Our Work" d="Humanitarian assistance and legal and advocacy support."><OurWork/></P>}/>
<Route path="/impact" element={<P t="Impact" d="Our impact, shared only when figures are verified."><Impact/></P>}/>
<Route path="/gallery" element={<P t="Gallery" d="Photo gallery of community and outreach activity."><Gallery/></P>}/>
<Route path="/donate" element={<P t="Donate" d="Donation preview. Payments are not yet enabled."><Donation/></P>}/>
<Route path="/get-involved" element={<P t="Get Involved" d="Volunteer and take part in outreach."><GetInvolved/></P>}/>
<Route path="/contact" element={<P t="Contact" d="Contact NGO for general, humanitarian, legal-support or volunteer enquiries."><Contact/></P>}/>
</Routes><Footer/></>);}
