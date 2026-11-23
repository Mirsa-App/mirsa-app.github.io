import*as THREE from"three";import{RoomEnvironment}from"./RoomEnvironment.js";
const hero=document.getElementById("x3d"),cv=document.getElementById("x3d-c");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:"high-performance"})}catch(e){}
if(!r||reduce||!hero){r&&r.dispose()}else{
let PR=Math.min(devicePixelRatio,3);r.setPixelRatio(PR);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;const pm=new THREE.PMREMGenerator(r);const envT=pm.fromScene(new RoomEnvironment(),.02).texture;
const sc=new THREE.Scene();sc.environment=envT;const cam=new THREE.PerspectiveCamera(40,1,.1,60);
sc.add(new THREE.AmbientLight(0x9a8cff,.9));
const l1=new THREE.PointLight(0x2dd4bf,90,40);l1.position.set(5,3,6);sc.add(l1);
const l2=new THREE.PointLight(0xa78bfa,110,40);l2.position.set(-6,-2,5);sc.add(l2);
const l3=new THREE.PointLight(0xffe2a8,70,30);l3.position.set(0,2,4);sc.add(l3);
const world=new THREE.Group();sc.add(world);
function tex(fn,s=512){const c=document.createElement("canvas");c.width=c.height=s;fn(c.getContext("2d"),s);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=r.capabilities.getMaxAnisotropy();t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;return t}
const glowTex=tex((g,s)=>{const k=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);k.addColorStop(0,"#fff");k.addColorStop(.25,"#fff8");k.addColorStop(1,"#fff0");g.fillStyle=k;g.fillRect(0,0,s,s)},128);
// crescent
const sh=new THREE.Shape();sh.absarc(0,0,1.25,0,Math.PI*2,false);
const hole=new THREE.Path();hole.absarc(.52,.26,1.04,0,Math.PI*2,true);sh.holes.push(hole);
const geo=new THREE.ExtrudeGeometry(sh,{depth:.34,bevelEnabled:true,bevelSize:.08,bevelThickness:.08,bevelSegments:10,curveSegments:200});geo.center();
const moon=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:0xffc94d,metalness:1,roughness:.1,clearcoat:.6,clearcoatRoughness:.08,envMapIntensity:2.2,emissive:0x5a3600,emissiveIntensity:.35}));
moon.rotation.z=.55;world.add(moon);
function glow(col,sc_,op){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));m.scale.set(sc_,sc_,1);return m}
const g1=glow(0xffb84d,3.4,.3),g2=glow(0x8b5cf6,7,.22),g3=glow(0x2dd4bf,10,.08);g1.position.z=-.4;g2.position.z=-1.2;g3.position.z=-2;world.add(g1,g2,g3);
// rings
for(const [rad,op] of [[3.0,.3],[3.9,.16]]){const rg=new THREE.Mesh(new THREE.RingGeometry(rad-.012,rad+.012,360),new THREE.MeshBasicMaterial({color:0xc4b5fd,transparent:true,opacity:op,side:THREE.DoubleSide,depthWrite:false}));rg.rotation.x=Math.PI/2.15;world.add(rg)}
// icons
const icons=[
 ["#2dd4bf","#0f766e",(g,s)=>{g.lineWidth=14;g.strokeStyle="#fff";g.lineCap="round";for(let i=0;i<3;i++){g.beginPath();g.roundRect(70+i*14,150-i*34,116,42,12);g.stroke()}}],
 ["#a78bfa","#5b21b6",(g,s)=>{g.fillStyle="#fff";const c=[[128,70,26],[190,128,18],[110,170,22]];g.beginPath();g.moveTo(128,60);g.lineTo(144,112);g.lineTo(196,128);g.lineTo(144,144);g.lineTo(128,196);g.lineTo(112,144);g.lineTo(60,128);g.lineTo(112,112);g.closePath();g.fill()}],
 ["#f472b6","#9d174d",(g,s)=>{g.strokeStyle="#fff";g.lineWidth=14;g.lineCap="round";for(const y of[88,128,168]){g.beginPath();g.moveTo(66,y);g.lineTo(190,y);g.stroke();g.fillStyle="#fff";g.beginPath();g.arc(66+((y*7)%90)+20,y,15,0,7);g.fill()}}],
 ["#60a5fa","#1d4ed8",(g,s)=>{g.fillStyle="#fff";g.beginPath();g.roundRect(70,76,116,104,20);g.fill();g.strokeStyle="#fff";g.lineWidth=12;g.beginPath();g.arc(128,90,26,Math.PI,0);g.stroke()}],
 ["#fbbf24","#b45309",(g,s)=>{g.strokeStyle="#fff";g.lineWidth=14;g.lineCap="round";g.beginPath();g.arc(128,128,52,.4,Math.PI*1.7);g.stroke();g.fillStyle="#fff";g.beginPath();g.moveTo(176,70);g.lineTo(196,118);g.lineTo(150,110);g.fill()}],
 ["#34d399","#047857",(g,s)=>{g.fillStyle="#fff";g.beginPath();g.moveTo(128,56);g.bezierCurveTo(200,70,200,150,128,200);g.bezierCurveTo(56,150,56,70,128,56);g.fill();g.fillStyle="#047857";g.beginPath();g.arc(128,110,16,0,7);g.fill()}],
 ["#fb7185","#9f1239",(g,s)=>{g.fillStyle="#fff";g.beginPath();g.arc(128,128,50,0,7);g.fill();g.fillStyle="#9f1239";g.beginPath();g.arc(148,114,44,0,7);g.fill();g.globalCompositeOperation="destination-out"}]
];
function rr(w,h,rad){const s=new THREE.Shape();s.moveTo(-w/2+rad,-h/2);s.lineTo(w/2-rad,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+rad);s.lineTo(w/2,h/2-rad);s.quadraticCurveTo(w/2,h/2,w/2-rad,h/2);s.lineTo(-w/2+rad,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-rad);s.lineTo(-w/2,-h/2+rad);s.quadraticCurveTo(-w/2,-h/2,-w/2+rad,-h/2);return s}
const bodyG=new THREE.ExtrudeGeometry(rr(1,1,.27),{depth:.14,bevelEnabled:true,bevelSize:.035,bevelThickness:.04,bevelSegments:3,curveSegments:14});bodyG.center();
const edgeG=new THREE.EdgesGeometry(new THREE.ShapeGeometry(rr(1.07,1.07,.3),14));
const faceG=new THREE.ShapeGeometry(rr(.86,.86,.22),14);
// uv for shape geometry: remap 0..1
{const p=faceG.attributes.position,uv=faceG.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/.86+.5,p.getY(i)/.86+.5)}
const tiles=[];const realImg=new Image();realImg.src="mirsa-icon.png";let realTex=null;realImg.onload=()=>{const c=document.createElement("canvas");c.width=c.height=512;const g=c.getContext("2d");g.drawImage(realImg,0,0,512,512);realTex=new THREE.CanvasTexture(c);realTex.colorSpace=THREE.SRGBColorSpace;realTex.anisotropy=r.capabilities.getMaxAnisotropy();realTex.generateMipmaps=true;realTex.minFilter=THREE.LinearMipmapLinearFilter;const tl=tiles[0];if(tl){tl.userData.face.material.map=realTex;tl.userData.face.material.needsUpdate=true}};
icons.forEach(([c1,c2,draw],i)=>{
 const t=tex((g,s)=>{const k=g.createLinearGradient(0,0,s,s);k.addColorStop(0,c1);k.addColorStop(1,c2);g.fillStyle=k;g.fillRect(0,0,s,s);draw(g,s);const sheen=g.createLinearGradient(0,0,0,s);sheen.addColorStop(0,"#ffffff55");sheen.addColorStop(.5,"#fff0");g.fillStyle=sheen;g.fillRect(0,0,s,s)});
 const grp=new THREE.Group();
 grp.add(new THREE.Mesh(bodyG,new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.22,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,emissive:new THREE.Color(c1),emissiveIntensity:.12,depthWrite:false})));
 const face=new THREE.Mesh(faceG,new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:1}));face.position.z=.115;grp.add(face);
 const ed=new THREE.LineSegments(edgeG,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.8}));ed.position.z=.09;grp.add(ed);
 const gl=glow(new THREE.Color(c1),2,.35);gl.position.z=-.3;grp.add(gl);
 grp.userData={face,a:i/icons.length*Math.PI*2,rad:[3.0,3.9][i%2],y:(i%3-1)*.5,sp:.14+(i%3)*.03,d:i*.12};grp.scale.setScalar(0);world.add(grp);tiles.push(grp)});
// particles
const N=220,pp=new Float32Array(N*3);for(let i=0;i<N;i++){pp[i*3]=(Math.random()-.5)*20;pp[i*3+1]=(Math.random()-.5)*14;pp[i*3+2]=-4+Math.random()*9}
const pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pp,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({map:glowTex,color:0xc4b5fd,size:.12,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));sc.add(pts);
let W=1,H=1,camZ=15;
function size(){W=hero.clientWidth||1;H=hero.clientHeight||1;r.setSize(W,H,false);cam.aspect=W/H;camZ=Math.min(19,Math.max(11,9.6/(2*Math.tan(20*Math.PI/180)*cam.aspect)));cam.updateProjectionMatrix()}
size();addEventListener("resize",size);new ResizeObserver(size).observe(hero);
let tx=0,ty=0,cx=0,cy=0,vis=true,raf=0;
addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*2;ty=(e.clientY/innerHeight-.5)*2});
addEventListener("deviceorientation",e=>{if(e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/28));ty=Math.max(-1,Math.min(1,(e.beta-50)/28))});
addEventListener("touchstart",()=>{if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)DeviceOrientationEvent.requestPermission().catch(()=>{})},{once:true});
new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis&&!raf)if(vis&&!raf)loop()}).observe(hero);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&vis&&!raf)loop()});
const clk=new THREE.Clock();
const ease=x=>1-Math.pow(1-Math.min(Math.max(x,0),1),4);
let fc=0,ft=performance.now(),low=0;
function loop(){if(!vis||document.hidden){raf=0;return}raf=requestAnimationFrame(loop);
 if(++fc==90){const n=performance.now(),fps=90000/(n-ft);ft=n;fc=0;if(fps<50){if(++low>=1&&PR>1.5){PR=Math.max(1.5,PR-.5);r.setPixelRatio(PR);r.setSize(W,H,false)}}else low=0}
 const t=clk.getElapsedTime(),k=ease(t/2.2);
 cx+=(tx-cx)*.05;cy+=(ty-cy)*.05;
 cam.position.set(cx*.5,.3-cy*.3,camZ+(1-k)*4);cam.lookAt(0,0,0);
 world.rotation.y=cx*.35;world.rotation.x=cy*.18;
 moon.position.set(0,Math.sin(t*.8)*.08,.6);moon.rotation.y=Math.sin(t*.45)*.35;moon.scale.setScalar((.6+.4*ease(t/1.6))*1.25);
 g1.material.opacity=.28+Math.sin(t*1.3)*.05;
 for(const m of tiles){const u=m.userData,s=ease((t-.5-u.d)/1.2),a=u.a+t*u.sp+(1-s)*1.5;
  m.position.set(Math.cos(a)*u.rad,u.y+Math.sin(t*.9+u.a)*.1,Math.sin(a)*u.rad*.55);
  m.rotation.set(Math.sin(t*.6+u.a)*.25-cy*.15,Math.cos(a)*.35+cx*.2,Math.cos(t*.5+u.a)*.12);
  m.scale.setScalar(s*(.78+.22*(Math.sin(a)*.5+.5)))}
 pts.rotation.y=t*.01+cx*.05;pts.position.y=Math.sin(t*.2)*.15;
 r.render(sc,cam)}
document.documentElement.classList.add("x3d-on");loop()}
