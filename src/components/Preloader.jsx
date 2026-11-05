import {useEffect,useState} from 'react';import {motion} from 'framer-motion';
export default function Preloader({onDone}){const [n,setN]=useState(0);
useEffect(()=>{let s=null,r;const f=t=>{s??=t;const p=Math.min((t-s)/1400,1);setN(Math.round(p*100));if(p<1)r=requestAnimationFrame(f);else setTimeout(onDone,250)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[onDone]);
return(<motion.div className="pre" exit={{opacity:0}} role="status" aria-label="Loading"><div className="sphere"><i/><i/><i/></div>
<motion.h1 initial={{opacity:0,letterSpacing:'.6em'}} animate={{opacity:1,letterSpacing:'.3em'}} transition={{duration:1}}>NGO</motion.h1><span>{n}%</span></motion.div>)}
