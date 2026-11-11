(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  $("#year").textContent = new Date().getFullYear();

  // Mobile navigation
  const menuButton = $(".menu-toggle");
  const nav = $(".main-nav");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  $$(".main-nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuButton.setAttribute("aria-expanded","false"); menuButton.textContent="☰";
  }));

  // Donation amount selector and safe demo-only form
  let selectedAmount = 500;
  $$(".amount").forEach(button => button.addEventListener("click", () => {
    $$(".amount").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedAmount = Number(button.dataset.amount);
    $("#customAmount").value = "";
  }));
  $("#customAmount").addEventListener("input", () => {
    if ($("#customAmount").value) $$(".amount").forEach(b => b.classList.remove("active"));
  });
  $("#donationForm").addEventListener("submit", event => {
    event.preventDefault();
    const custom = Number($("#customAmount").value);
    const amount = custom > 0 ? custom : selectedAmount;
    const name = $("#donorName").value.trim();
    const email = $("#donorEmail").value.trim();
    if (!name || !email || amount < 1) return;
    $("#formMessage").textContent = `Thank you, ${name}. Demo request prepared for ₹${amount.toLocaleString("en-IN")} (${$("#purpose").value}). No payment was taken.`;
  });

  // GSAP entrance and scroll reveals
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-content > *", {y:24, opacity:0, duration:0.85, stagger:0.12, ease:"power3.out", delay:0.15});
    gsap.from(".hero-seal", {scale:.65, opacity:0, rotation:-18, duration:1.1, ease:"back.out(1.5)", delay:.45});
    $$(".pillar-card,.work-card,.activity-card,.about-grid > *, .gallery-grid img").forEach(el => {
      gsap.from(el, {y:35, opacity:0, duration:.75, ease:"power2.out",
        scrollTrigger:{trigger:el, start:"top 88%", once:true}});
    });
    gsap.from(".values-inner > div", {y:20, opacity:0, stagger:.12, duration:.65,
      scrollTrigger:{trigger:".values-band",start:"top 85%",once:true}});
  }

  // Three.js: custom 3D justice-scale sculpture. Falls back gracefully if WebGL is unavailable.
  const host = $("#justice-scene");
  if (host && window.THREE) {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, host.clientWidth/host.clientHeight, .1, 100);
      camera.position.set(0, 1.4, 8.8);
      const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      host.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.25));
      const key = new THREE.DirectionalLight(0xffd16a, 3.2); key.position.set(3,5,5); scene.add(key);
      const fill = new THREE.PointLight(0x5b9cff, 2.2); fill.position.set(-4,1,3); scene.add(fill);
      const gold = new THREE.MeshStandardMaterial({color:0xe7ad2f, metalness:.82, roughness:.2});
      const brightGold = new THREE.MeshStandardMaterial({color:0xffd86c, metalness:.78, roughness:.17});
      const darkGold = new THREE.MeshStandardMaterial({color:0x80500d, metalness:.75, roughness:.28});
      const sculpture = new THREE.Group(); scene.add(sculpture);

      function cylinder(rt, rb, h, x,y,z, mat, radial=48) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,radial),mat);
        m.position.set(x,y,z); sculpture.add(m); return m;
      }
      function sphere(r,x,y,z,mat) {
        const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,24),mat);m.position.set(x,y,z);sculpture.add(m);return m;
      }
      function bar(x1,y1,z1,x2,y2,z2,r,mat) {
        const a=new THREE.Vector3(x1,y1,z1), b=new THREE.Vector3(x2,y2,z2), d=new THREE.Vector3().subVectors(b,a);
        const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),20),mat);
        m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());sculpture.add(m);return m;
      }
      // Pedestal and central pillar
      cylinder(.95,.95,.18,0,-1.55,0,darkGold);
      cylinder(.72,.85,.2,0,-1.36,0,brightGold);
      cylinder(.27,.34,1.45,0,-.55,0,gold);
      cylinder(.48,.48,.14,0,.2,0,brightGold);
      cylinder(.18,.18,.2,0,.36,0,darkGold);
      // Central finial
      sphere(.22,0,.72,0,brightGold);
      cylinder(.10,.16,.55,0,.52,0,gold);
      // Balance beam
      bar(-2.05,.68,0,2.05,.68,0,.09,brightGold);
      sphere(.16,-2.05,.68,0,brightGold); sphere(.16,2.05,.68,0,brightGold);
      // Chains and pans
      [-1.55,1.55].forEach(x => {
        bar(x,.58,0,x,.0,0,.025,darkGold);
        bar(x-.28,.55,0,x-.28,-.18,0,.018,brightGold);
        bar(x+.28,.55,0,x+.28,-.18,0,.018,brightGold);
        const pan=new THREE.Mesh(new THREE.SphereGeometry(.52,48,20,0,Math.PI*2,0,Math.PI/2.8),brightGold);
        pan.position.set(x,-.22,0);pan.scale.y=.45;sculpture.add(pan);
        const rim=new THREE.Mesh(new THREE.TorusGeometry(.49,.035,12,64,Math.PI*2),gold);
        rim.rotation.x=Math.PI/2;rim.position.set(x,-.22,0);sculpture.add(rim);
      });
      sculpture.rotation.y=-.18; sculpture.position.set(.15,-.05,0); sculpture.scale.set(1.02,1.02,1.02);
      camera.lookAt(0,-.15,0);
      const clock=new THREE.Clock();
      function render(){
        requestAnimationFrame(render);
        const t=clock.getElapsedTime();
        sculpture.rotation.y=-.18+Math.sin(t*.35)*.12;
        sculpture.position.y=-.05+Math.sin(t*.7)*.06;
        renderer.render(scene,camera);
      }
      render();
      const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};
      if ("ResizeObserver" in window) new ResizeObserver(resize).observe(host); else window.addEventListener("resize",resize);
    } catch (error) {
      console.warn("3D scene unavailable; continuing with the CSS hero background.", error);
    }
  }
})();