(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const year=$("#year"); if(year) year.textContent=new Date().getFullYear();
  const menuButton=$(".menu-toggle"),nav=$(".main-nav");
  if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰";});$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));}

  // Send the visitor to the dedicated payment QR page with their selected donation details.
  const donationForm=$("#donationForm"); let selectedAmount=500;
  $$(".amount").forEach(button=>button.addEventListener("click",()=>{$$(".amount").forEach(b=>b.classList.remove("active"));button.classList.add("active");selectedAmount=Number(button.dataset.amount);const custom=$("#customAmount");if(custom)custom.value="";}));
  const customInput=$("#customAmount");if(customInput)customInput.addEventListener("input",()=>{if(customInput.value)$$(".amount").forEach(b=>b.classList.remove("active"));});
  if(donationForm)donationForm.addEventListener("submit",event=>{event.preventDefault();const custom=Number(customInput?.value);const amount=custom>0?custom:selectedAmount;const name=$("#donorName").value.trim();const email=$("#donorEmail").value.trim();const purpose=$("#purpose").value;if(!name||!email||!Number.isFinite(amount)||amount<1){$("#formMessage").textContent="Please enter valid donor details and an amount.";return;}const query=new URLSearchParams({amount:String(amount),purpose});location.href=`donate.html?${query.toString()}`;});

  // Always-on CSS/IntersectionObserver fallback so reveal effects still work if GSAP CDN is unavailable.
  const revealItems=$$(".pillar-card,.work-card,.activity-card,.about-grid > *, .gallery-grid img,.section-heading");
  revealItems.forEach(el=>el.classList.add('reveal-ready'));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(el=>observer.observe(el));}else revealItems.forEach(el=>el.classList.add('is-visible'));

  if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.from(".hero-content > *",{y:28,opacity:0,duration:1,stagger:.14,ease:"power3.out",delay:.12});gsap.from(".hero-seal",{scale:.5,opacity:0,rotation:-28,duration:1.3,ease:"back.out(1.7)",delay:.35});gsap.to(".hero-glow",{scale:1.25,opacity:.75,duration:3,yoyo:true,repeat:-1,ease:"sine.inOut"});}

  // Three.js animated justice scales with a floating orbit and swinging balance pans.
  const host=$("#justice-scene");
  if(host&&window.THREE){try{
    const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(38,Math.max(host.clientWidth,1)/Math.max(host.clientHeight,1),.1,100);camera.position.set(0,.35,7.4);camera.lookAt(0,-.15,0);const reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches;let mx=0,my=0,visible=true;if(!reduceM)window.addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;},{passive:true});
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(host.clientWidth||600,host.clientHeight||560);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;renderer.domElement.className='justice-canvas';host.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff,0x18264a,2.0));const key=new THREE.DirectionalLight(0xffd36b,4);key.position.set(3,5,6);scene.add(key);const rim=new THREE.PointLight(0x6aa9ff,3);rim.position.set(-4,1,2);scene.add(rim);const warm=new THREE.PointLight(0xffa51f,2);warm.position.set(2,-2,3);scene.add(warm);
    const gold=new THREE.MeshStandardMaterial({color:0xe9ad2f,metalness:.86,roughness:.19});const lightGold=new THREE.MeshStandardMaterial({color:0xffdf80,metalness:.82,roughness:.16});const darkGold=new THREE.MeshStandardMaterial({color:0x88520b,metalness:.8,roughness:.25});const group=new THREE.Group();scene.add(group);
    function cyl(rt,rb,h,x,y,z,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,48),mat);m.position.set(x,y,z);group.add(m);return m;}
    function ball(r,x,y,z,mat){const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,24),mat);m.position.set(x,y,z);group.add(m);return m;}
    function rod(a,b,r,mat,parent=group){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(vb,va);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),20),mat);m.position.copy(va).add(vb).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());parent.add(m);return m;}
    cyl(.92,.92,.18,0,-1.55,0,darkGold);cyl(.72,.84,.2,0,-1.36,0,lightGold);cyl(.25,.34,1.45,0,-.55,0,gold);cyl(.45,.45,.13,0,.2,0,lightGold);ball(.18,0,.52,0,lightGold);cyl(.1,.15,.45,0,.82,0,gold);ball(.2,0,1.08,0,lightGold);
    rod([-2.05,.72,0],[2.05,.72,0],.085,lightGold);ball(.14,-2.05,.72,0,lightGold);ball(.14,2.05,.72,0,lightGold);
    const pans=[];[-1.55,1.55].forEach(x=>{const panGroup=new THREE.Group();panGroup.position.set(x,.67,0);group.add(panGroup);rod([0,0,0],[0,-.72,0],.022,darkGold,panGroup);rod([-.28,-.04,0],[-.28,-.62,0],.017,lightGold,panGroup);rod([.28,-.04,0],[.28,-.62,0],.017,lightGold,panGroup);const bowl=new THREE.Mesh(new THREE.SphereGeometry(.48,48,24,0,Math.PI*2,0,Math.PI/2.7),lightGold);bowl.position.y=-.68;bowl.scale.y=.48;panGroup.add(bowl);const rimMesh=new THREE.Mesh(new THREE.TorusGeometry(.46,.03,12,64),gold);rimMesh.rotation.x=Math.PI/2;rimMesh.position.y=-.68;panGroup.add(rimMesh);pans.push(panGroup);});
    // Floating gold dust around the emblem.
    const particleCount=90,positions=new Float32Array(particleCount*3);for(let i=0;i<particleCount;i++){positions[i*3]=(Math.random()-.5)*5.8;positions[i*3+1]=(Math.random()-.5)*4.5;positions[i*3+2]=(Math.random()-.5)*1.8;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));const dust=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffd36b,size:.035,transparent:true,opacity:.8}));scene.add(dust);
    group.scale.setScalar(1.08);const clock=new THREE.Clock();let raf;function render(){if(!visible)return;raf=reduceM?0:requestAnimationFrame(render);const t=clock.getElapsedTime();group.rotation.y=-.2+Math.sin(t*.32)*.16+mx*.5;camera.position.x+=(mx*.9-camera.position.x)*.04;camera.position.y+=(.35-my*.5-camera.position.y)*.04;camera.lookAt(0,-.15,0);group.position.y=-.02+Math.sin(t*.85)*.08;pans.forEach((pan,i)=>{pan.rotation.z=Math.sin(t*1.15+i*Math.PI)*.055;});dust.rotation.y=t*.035;renderer.render(scene,camera);}render();
    if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{const was=visible;visible=e.isIntersecting;if(visible&&!was&&!document.hidden){cancelAnimationFrame(raf);render();}}).observe(host);
    addEventListener('pagehide',()=>{cancelAnimationFrame(raf);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();});renderer.dispose();});
    const fit=()=>{camera.position.z=Math.max(7.4,8.4/camera.aspect);};fit();
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;fit();camera.updateProjectionMatrix();renderer.setSize(w,h);};if('ResizeObserver'in window)new ResizeObserver(resize).observe(host);else window.addEventListener('resize',resize);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else if(visible)render();});
  }catch(err){console.error('Three.js scene could not start:',err);host.classList.add('scene-fallback');}}
})();
