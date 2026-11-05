import {motion} from 'framer-motion';
export default function SectionHeading({label,title,children,light}){return(<motion.div className={'sh'+(light?' light':'')} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.7}}>
{label&&<span className="label">{label}</span>}<h2>{title}</h2>{children&&<p>{children}</p>}</motion.div>)}
