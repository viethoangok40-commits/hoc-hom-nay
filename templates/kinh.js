/* ===== Giao diện "kính 3D": nền, bụi sáng, parallax, chuyển cảnh, vật thể thủy tinh (three.js tải lười) ===== */
(function(){
"use strict";
var D=JSON.parse(document.getElementById('data').textContent), K=D.kinh||{};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var coarse=window.matchMedia&&matchMedia('(pointer: coarse)').matches;
var body=document.body, root=document.documentElement;
var CH=K.chapters||{};
var G={ready:false}; // vật thể 3D (điền khi three.js đã tải)
function toneOf(id){ var m=/^c(\d+)/.exec(id||''); var c=m&&CH[m[1]]; return (c&&c.tone)||K.tone||'cong-nghe'; }
function vatOf(id){ var m=/^c(\d+)/.exec(id||''); var c=m&&CH[m[1]]; return c?c.vat:'bia'; }
function modeOf(id){ return (id==='mo-dau'||/^c\d+$/.test(id||''))?'lon':'nho'; }

/* ---------- nền: gradient + 2 quầng sáng + bụi sáng ---------- */
var bg=document.createElement('div'); bg.id='kbg'; bg.setAttribute('aria-hidden','true');
bg.innerHTML='<div class="g"></div><div class="q q1"></div><div class="q q2"></div><canvas></canvas>';
body.insertBefore(bg,body.firstChild);
var box=document.createElement('div'); box.id='k3d'; box.setAttribute('aria-hidden','true');
box.innerHTML='<div class="tinh">'+tinhSvg()+'</div>'; body.insertBefore(box,bg.nextSibling);
function tinhSvg(){ // ảnh tĩnh dự phòng: quả cầu kính vẽ bằng SVG (WebGL lỗi / chưa tải xong)
  return '<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet"><defs>'+
  '<radialGradient id="kt-a" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#cfe9ff" stop-opacity=".16"/><stop offset=".8" stop-color="#9fb8ff" stop-opacity=".10"/><stop offset="1" stop-color="#fff" stop-opacity=".45"/></radialGradient>'+
  '<linearGradient id="kt-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd6f5" stop-opacity=".7"/><stop offset=".5" stop-color="#9ff0ff" stop-opacity=".5"/><stop offset="1" stop-color="#c6ffb3" stop-opacity=".7"/></linearGradient></defs>'+
  '<circle cx="200" cy="200" r="150" fill="url(#kt-a)"/><circle cx="200" cy="200" r="149" fill="none" stroke="url(#kt-b)" stroke-width="2.5"/>'+
  '<ellipse cx="150" cy="128" rx="46" ry="24" fill="#fff" opacity=".45" transform="rotate(-28 150 128)"/></svg>';
}
var dust=bg.querySelector('canvas'), dctx=dust.getContext('2d'), parts=[], DPR=Math.min(2,window.devicePixelRatio||1);
function sizeDust(){ dust.width=Math.round(innerWidth*DPR); dust.height=Math.round(innerHeight*DPR); }
sizeDust(); addEventListener('resize',sizeDust);
for(var i=0;i<(coarse?28:44);i++) parts.push({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.8,v:.004+Math.random()*.01,a:.15+Math.random()*.45,w:Math.random()*6.28});
var dLast=0;
function drawDust(t){
  var W=dust.width,H=dust.height; dctx.clearRect(0,0,W,H);
  var dt=dLast?Math.min(.05,(t-dLast)/1000):0; dLast=t;
  for(var i=0;i<parts.length;i++){ var p=parts[i];
    if(!reduce){ p.y-=p.v*dt; p.w+=dt*.6; if(p.y<-.02){p.y=1.02; p.x=Math.random();} }
    var x=(p.x+Math.sin(p.w)*.006)*W, y=p.y*H-sy*14*DPR*p.r;
    dctx.globalAlpha=p.a*(.6+.4*Math.sin(p.w*1.7)); dctx.beginPath(); dctx.arc(x,y,p.r*DPR,0,6.283); dctx.fillStyle='#fff'; dctx.fill(); }
}
/* ---------- parallax: chỉ theo cuộn (vùng chữ .txt / .cards); không dùng cảm biến nghiêng ---------- */
var sy=0, ty=0; // sy: vị trí cuộn đã làm mượt (0 → 1)
document.addEventListener('scroll',function(e){ var t=e.target; if(t&&t.classList&&(t.classList.contains('txt')||t.classList.contains('cards'))&&t.scrollHeight>t.clientHeight){ ty=t.scrollTop/Math.max(1,t.scrollHeight-t.clientHeight); kick(); } },{passive:true,capture:true});
document.addEventListener('album:render',function(){ ty=0; });

/* ---------- theo màn: tông màu, chế độ vật thể, chuyển cảnh, đánh số thẻ ---------- */
var curTone='', curVat='', curMode='';
function setTone(t){ if(t===curTone) return; body.classList.remove('tone-'+curTone); curTone=t; body.classList.add('tone-'+t); if(G.ready) G.setTone(t); }
document.addEventListener('album:render',function(e){
  var d=e.detail||{}, el=d.el;
  setTone(toneOf(d.id));
  var mode=modeOf(d.id); setMode(mode);
  if(mode==='lon'&&el) requestAnimationFrame(function(){ fitCover(el); });
  var vat=vatOf(d.id); if(vat!==curVat){ curVat=vat; if(G.ready) G.show(vat); }
  if(el&&d.changed&&!reduce&&d.dir){ el.classList.remove('vao-tien','vao-lui'); void el.offsetWidth; el.classList.add(d.dir>0?'vao-tien':'vao-lui'); }
  else if(el&&d.changed&&reduce){ el.classList.remove('vao-tien'); void el.offsetWidth; el.classList.add('vao-tien'); }
  if(el&&!el.__so){ el.__so=1; if(d.id==='mo-dau') el.classList.add('k-mo-dau');
    var k=0; [].forEach.call(el.querySelectorAll('.step.idea'),function(p){ k++; var s=document.createElement('span'); s.className='so'; s.setAttribute('aria-hidden','true'); s.textContent=(k<10?'0':'')+k; p.appendChild(s); }); }
});

function setMode(m){ if(m===curMode) return; curMode=m; body.classList.toggle('orb-nho',m==='nho'); if(m==='nho'&&box.style.height){ box.style.height=''; if(G.ready) G.resize(); } }
/* bìa: chữ dài thì bớt khoảng trên; vật thể co vào phần trống phía trên chữ (quá ít chỗ → thu nhỏ về góc) */
function fitCover(el){
  var cover=el.querySelector('.cover'); if(!cover||el.hidden) return;
  if(innerWidth>820){ cover.style.removeProperty('--cover-top'); box.style.height=''; if(G.ready) G.resize(); return; }
  cover.style.removeProperty('--cover-top'); el.style.setProperty('--k','1');
  var need=cover.scrollHeight-cover.clientHeight, pad=parseFloat(getComputedStyle(cover).paddingTop)||0;
  if(need>2) cover.style.setProperty('--cover-top',Math.max(.1*innerHeight,pad-need)+'px');
  if(window.__album&&__album.refit) __album.refit();
  var first=cover.querySelector('.kick')||cover.firstElementChild, top=box.getBoundingClientRect().top;
  var room=first?first.getBoundingClientRect().top-top-6:0;
  if(room<.14*innerHeight){ setMode('nho'); box.style.height=''; }
  else { box.style.height=Math.min(.4*innerHeight,room)+'px'; }
  if(G.ready) G.resize();
}
/* ---------- vòng lặp chung (bụi + parallax + 3D); dừng khi ẩn tab ---------- */
var raf=0, lastF=0, minDt=coarse?1000/30:0;
function loop(t){ raf=0; if(document.hidden) return;
  if(t-lastF>=minDt){ lastF=t; var ns=sy+(ty-sy)*.12; if(Math.abs(ns-sy)>.0005){ sy=ns; root.style.setProperty('--sy',sy.toFixed(3)); } drawDust(t); if(G.ready) G.frame(t); }
  if(!reduce) raf=requestAnimationFrame(loop);
}
function kick(){ if(reduce){ sy=ty; root.style.setProperty('--sy',sy.toFixed(3)); return; } if(!raf) raf=requestAnimationFrame(loop); }
document.addEventListener('visibilitychange',function(){ if(!document.hidden) kick(); });
kick();
if(reduce) document.addEventListener('album:render',function(){ setTimeout(function(){ lastF=0; requestAnimationFrame(loop); },60); });

/* ---------- 3D thủy tinh (three.js r147, tải lười sau khi trang đã hiện) ---------- */
function webglOk(){ try{ var c=document.createElement('canvas'); return !!(c.getContext('webgl2')||c.getContext('webgl')); }catch(e){ return false; } }
function later(fn){ if(window.requestIdleCallback) requestIdleCallback(fn,{timeout:1500}); else setTimeout(fn,700); }
if(K.three!==false && webglOk() && !(navigator.connection&&navigator.connection.saveData)) addEventListener('load',function(){ later(load3d); });
function load3d(){
  function go(){ try{ start3d(); }catch(e){ console.warn('3D kính lỗi:',e); } }
  if(window.THREE) return go();
  var src=K.three||(D.vendor&&D.vendor.three)||'../vendor/three-r147.min.js';
  if(window.__need) return window.__need(src,function(ok){ if(ok) go(); }); // dùng chung bộ tải với mô hình GLB của bài; lỗi → giữ ảnh tĩnh
  var s=document.createElement('script'); s.src=src; s.async=true; s.onload=go; document.head.appendChild(s);
}
function start3d(){
  var T=window.THREE; if(!T||!T.MeshPhysicalMaterial) return;
  var r=new T.WebGLRenderer({antialias:DPR<2,alpha:true,powerPreference:'low-power'});
  r.setPixelRatio(DPR); r.setClearColor(0x000000,0);
  r.outputEncoding=T.sRGBEncoding; r.toneMapping=T.ACESFilmicToneMapping; r.toneMappingExposure=1.05;
  var cv=r.domElement; cv.style.opacity='0'; box.appendChild(cv);
  r.domElement.addEventListener('webglcontextlost',function(e){ e.preventDefault(); G.ready=false; cv.style.opacity='0'; box.classList.remove('co-3d'); });
  var scene=new T.Scene(), cam=new T.PerspectiveCamera(32,1,.1,50); cam.position.set(0,0,6.2);
  var dl=new T.DirectionalLight(0xffffff,1.4); dl.position.set(3,4,5); scene.add(dl); scene.add(new T.AmbientLight(0xffffff,.25));
  var pm=new T.PMREMGenerator(r), envs={};
  function envFor(tone){ // môi trường phản chiếu dựng tại chỗ theo tông (không cần file HDR)
    if(envs[tone]) return envs[tone];
    var es=new T.Scene(), cols=tone==='chat-luong'?[0x1C0C3F,0x3A1F6E,0x2F7A6A,0x9BE3B5]:[0x060E2A,0x0B2456,0x145C9E,0x4FC3F7];
    var g=new T.SphereGeometry(10,32,16), c=[], p=g.attributes.position, A=new T.Color(cols[0]),B=new T.Color(cols[1]),C=new T.Color(cols[2]);
    for(var i=0;i<p.count;i++){ var y=(p.getY(i)/10+1)/2, col=y>.5?B.clone().lerp(A,(y-.5)*2):C.clone().lerp(B,y*2); c.push(col.r,col.g,col.b); }
    g.setAttribute('color',new T.Float32BufferAttribute(c,3));
    es.add(new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide})));
    function panel(w,h,x,y,z,col,int){ var m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(col).multiplyScalar(int),side:T.DoubleSide})); m.position.set(x,y,z); m.lookAt(0,0,0); es.add(m); }
    panel(6,3,-4,6,4,0xffffff,3.2); panel(3,6,7,1,-2,cols[3],2.2); panel(8,1.2,0,-6,3,0xffffff,1.2);
    envs[tone]=pm.fromScene(es,.03).texture; return envs[tone];
  }
  function glass(o){ return new T.MeshPhysicalMaterial(Object.assign({color:0xffffff,metalness:0,roughness:.06,transmission:1,thickness:1.1,ior:1.45,
    iridescence:1,iridescenceIOR:1.32,iridescenceThicknessRange:[120,460],clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.25,specularIntensity:1,
    attenuationColor:new T.Color(0xdff4ff),attenuationDistance:3.5},o||{})); }
  function solid(col,o){ return new T.MeshStandardMaterial(Object.assign({color:col,roughness:.42,metalness:.02},o||{})); }
  var builders={
    bia:function(){ // trang bìa: quả cầu kính chứa trái cây – cá – cà chua
      var g=new T.Group(); g.add(new T.Mesh(new T.SphereGeometry(1.32,64,48),glass({thickness:.35,attenuationDistance:8})));
      var tom=new T.Group(), tb=new T.Mesh(new T.SphereGeometry(.38,40,28),solid(0xE5342B,{roughness:.28})); tb.scale.set(1,.82,1); tom.add(tb);
      for(var i=0;i<5;i++){ var l=new T.Mesh(new T.ConeGeometry(.06,.26,6),solid(0x3E9B3A)); l.rotation.z=Math.PI/2.2; l.rotation.y=i*1.2566; l.position.set(Math.cos(i*1.2566)*.09,.31,-Math.sin(i*1.2566)*.09); l.rotation.order='YZX'; tom.add(l); }
      tom.position.set(-.42,-.38,.18); g.add(tom);
      var cam_=new T.Mesh(new T.SphereGeometry(.3,36,24),solid(0xF59A23,{roughness:.55})); cam_.position.set(.46,-.5,-.12); g.add(cam_);
      var la=new T.Mesh(new T.SphereGeometry(.12,16,10),solid(0x58B947)); la.scale.set(1,.25,.5); la.position.set(.52,-.2,-.1); la.rotation.z=-.6; g.add(la);
      var fish=new T.Group(), fb=new T.Mesh(new T.SphereGeometry(.42,40,24),solid(0x5BA7E6,{metalness:.35,roughness:.25})); fb.scale.set(1,.42,.26); fish.add(fb);
      var tail=new T.Mesh(new T.ConeGeometry(.2,.32,4),solid(0x3D86C8,{metalness:.3,roughness:.3})); tail.rotation.z=Math.PI/2; tail.position.x=-.5; tail.scale.z=.3; fish.add(tail);
      var eye=new T.Mesh(new T.SphereGeometry(.04,12,8),solid(0x0B1530)); eye.position.set(.3,.06,.1); fish.add(eye);
      fish.position.set(.05,.38,.05); fish.rotation.y=-.35; g.add(fish); g.userData.fish=fish;
      return g; },
    'giot-sua':function(){ // giọt sữa: vỏ kính hình giọt, lõi sữa đục, vài giọt bắn quanh
      var g=new T.Group(), pts=[];
      // giọt nước: đỉnh nhọn, đáy tròn  x = sinθ·((1−cosθ)/2)^0.6 , y = cosθ  (θ: 0 → π, từ đáy lên đỉnh cho Lathe)
      for(var i=0;i<=48;i++){ var th=Math.PI*(1-i/48); pts.push(new T.Vector2(Math.max(1e-4,Math.sin(th)*Math.pow((1-Math.cos(th))/2,.6)*1.02),Math.cos(th)*1.22)); }
      var lathe=new T.LatheGeometry(pts,64);
      g.add(new T.Mesh(lathe,glass({thickness:.8,attenuationColor:new T.Color(0xfff4e6),attenuationDistance:2.2})));
      var core=new T.Mesh(lathe,new T.MeshPhysicalMaterial({color:0xFFF8EE,roughness:.32,sheen:1,sheenColor:new T.Color(0xffffff),clearcoat:.6}));
      core.scale.setScalar(.8); core.position.y=-.14; g.add(core);
      var dm=glass({thickness:.3,roughness:.3,iridescence:.4,clearcoat:0});
      [[-.95,.15,.3,.09],[1.0,-.35,-.2,.11],[.8,.65,.25,.06],[-.75,-.7,-.3,.07]].forEach(function(q){ var d=new T.Mesh(new T.SphereGeometry(q[3],24,16),dm); d.position.set(q[0],q[1],q[2]); g.add(d); });
      return g; },
    'te-bao':function(){ // tế bào / vi khuẩn: tế bào tròn có nhân + 3 trực khuẩn
      var g=new T.Group(), cell=new T.Mesh(new T.SphereGeometry(.82,56,40),glass({thickness:.9,attenuationColor:new T.Color(0xd8ffe8)})); g.add(cell);
      var nuc=new T.Mesh(new T.SphereGeometry(.3,32,24),solid(0x8E5BD6,{roughness:.3})); nuc.position.set(.12,.06,-.05); g.add(nuc);
      for(var i=0;i<6;i++){ var o=new T.Mesh(new T.SphereGeometry(.07,16,12),solid(0x3FC6A0)); o.position.set(Math.cos(i)*.5,Math.sin(i*1.7)*.4,Math.sin(i)*.35); g.add(o); }
      var bm=glass({thickness:.5,attenuationColor:new T.Color(0xe6fff0)});
      [[1.25,.65,.1,.5],[-1.2,.75,-.25,-.7],[.95,-.95,.2,1.2]].forEach(function(q){ var b=new T.Mesh(new T.CapsuleGeometry(.17,.62,8,24),bm); b.position.set(q[0],q[1],q[2]); b.rotation.z=q[3];
        var dna=new T.Mesh(new T.TorusKnotGeometry(.07,.018,48,6,2,3),solid(0xF2C94C)); b.add(dna); g.add(b); });
      return g; },
    khien:function(){ // chất lượng / ISO / HACCP / an toàn / quản lý: khiên kính, dấu tích phát sáng nằm trong lòng kính
      var g=new T.Group(), s=new T.Shape();
      s.moveTo(0,1.12); s.bezierCurveTo(.42,.98,.76,1.02,.94,1.1); s.bezierCurveTo(.98,.28,.74,-.62,0,-1.22); s.bezierCurveTo(-.74,-.62,-.98,.28,-.94,1.1); s.bezierCurveTo(-.76,1.02,-.42,.98,0,1.12);
      var geo=new T.ExtrudeGeometry(s,{depth:.34,bevelEnabled:true,bevelThickness:.14,bevelSize:.1,bevelSegments:8,curveSegments:36}); geo.center();
      g.add(new T.Mesh(geo,glass({thickness:1.4,attenuationColor:new T.Color(curTone==='chat-luong'?0xE9DEFF:0xDDF2FF),attenuationDistance:2.4})));
      var tickCol=curTone==='chat-luong'?0x2FCB7E:0x3FB4F0, tm=new T.MeshStandardMaterial({color:tickCol,emissive:tickCol,emissiveIntensity:.3,roughness:.35});
      var P=[new T.Vector3(-.44,.02,0),new T.Vector3(-.12,-.32,0),new T.Vector3(.48,.42,0)];
      var path=new T.CurvePath(); path.add(new T.LineCurve3(P[0],P[1])); path.add(new T.LineCurve3(P[1],P[2]));
      g.add(new T.Mesh(new T.TubeGeometry(path,32,.085,14,false),tm));
      P.forEach(function(p){ var j=new T.Mesh(new T.SphereGeometry(.085,16,12),tm); j.position.copy(p); g.add(j); });
      g.userData.spin=.28; return g; },
    'banh-rang':function(){ // quy trình: hai bánh răng kính ăn khớp, quay ngược chiều theo tỉ số răng
      function gear(n,R,r,hole){ var s=new T.Shape(), w=2*Math.PI/n;
        for(var i=0;i<n;i++){ var a=i*w; [[r,a],[R,a+w*.2],[R,a+w*.48],[r,a+w*.68]].forEach(function(p,j){ var x=Math.cos(p[1])*p[0],y=Math.sin(p[1])*p[0]; if(!i&&!j) s.moveTo(x,y); else s.lineTo(x,y); }); }
        s.closePath(); var h=new T.Path(); h.absarc(0,0,hole,0,Math.PI*2,true); s.holes.push(h);
        var geo=new T.ExtrudeGeometry(s,{depth:.26,bevelEnabled:true,bevelThickness:.06,bevelSize:.04,bevelSegments:4,curveSegments:24}); geo.center(); return geo; }
      var g=new T.Group(), gm=glass({thickness:.9,attenuationColor:new T.Color(0xE3F4FF),attenuationDistance:2.6});
      var axle=solid(curTone==='chat-luong'?0xB9A4FF:0x8AD8FF,{metalness:.4,roughness:.25});
      var big=new T.Group(); big.add(new T.Mesh(gear(12,1.0,.82,.26),gm)); big.add(new T.Mesh(new T.CylinderGeometry(.2,.2,.5,24).rotateX(Math.PI/2),axle));
      var small=new T.Group(); small.add(new T.Mesh(gear(8,.68,.52,.18),gm)); small.add(new T.Mesh(new T.CylinderGeometry(.13,.13,.46,20).rotateX(Math.PI/2),axle));
      big.position.set(-.45,.3,0); small.position.set(.7,-.66,.02); small.rotation.z=Math.PI/8;
      g.add(big); g.add(small); g.scale.setScalar(.92);
      g.userData.spin=.12; g.userData.tick=function(dt){ big.rotation.z+=dt*.5; small.rotation.z-=dt*.5*12/8; };
      return g; },
    'phan-tu':function(){ // phân tử: từ SDF (PubChem) nếu bài có, mặc định H₂O
      var g=new T.Group(), at=parseSdf(K.mol)||[{e:'O',p:[0,0,0]},{e:'H',p:[.757,.586,0]},{e:'H',p:[-.757,.586,0]}], bonds=at.bonds||[[0,1],[0,2]];
      var cen=new T.Vector3(), V=at.map(function(a){ return new T.Vector3(a.p[0],a.p[1],a.p[2]); }); V.forEach(function(v){cen.add(v)}); cen.multiplyScalar(1/V.length);
      var rad=0; V.forEach(function(v){ v.sub(cen); rad=Math.max(rad,v.length()); }); var sc=1.15/Math.max(.8,rad);
      var COL={O:0xFF7A7A,H:0xFFFFFF,C:0x9AA6B8,N:0x7FA8FF,S:0xFFE27A,P:0xFFB067};
      var mats={}; function mat(e){ return mats[e]||(mats[e]=glass({thickness:.7,attenuationColor:new T.Color(COL[e]||0xdddddd),attenuationDistance:.9})); }
      at.forEach(function(a,i){ var R=(a.e==='H'?.26:.42)*Math.min(1,sc*.9)+.02, m=new T.Mesh(new T.SphereGeometry(R,40,28),mat(a.e)); m.position.copy(V[i]).multiplyScalar(sc); g.add(m); });
      var bmat=solid(0xEAF4FF,{roughness:.2,metalness:.1});
      bonds.forEach(function(b){ var A=V[b[0]].clone().multiplyScalar(sc),B=V[b[1]].clone().multiplyScalar(sc),L=A.distanceTo(B); var c=new T.Mesh(new T.CylinderGeometry(.05,.05,L,12),bmat); c.position.copy(A).add(B).multiplyScalar(.5); c.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),B.clone().sub(A).normalize()); g.add(c); });
      return g; }
  };
  function parseSdf(t){ if(!t) return null; try{ var L=t.split(/\r?\n/), n=+L[3].slice(0,3), nb=+L[3].slice(3,6), at=[]; for(var i=0;i<n;i++){ var l=L[4+i]; at.push({p:[+l.slice(0,10),+l.slice(10,20),+l.slice(20,30)],e:l.slice(31,34).trim()}); }
    var bonds=[]; for(var j=0;j<nb;j++){ var b=L[4+n+j]; bonds.push([+b.slice(0,3)-1,+b.slice(3,6)-1]); } if(n>60) return null; at.bonds=bonds; return at; }catch(e){ return null; } }
  var objs={}, cur=null, fadeT=0, t0=performance.now(), lastT=0;
  function size(){ var W=box.clientWidth,H=box.clientHeight; if(!W||!H) return; r.setSize(W,H,false); cam.aspect=W/H; cam.updateProjectionMatrix(); var fit=W/H<1?1.18:1; cam.position.z=6.2*fit; }
  addEventListener('resize',size); size();
  G.resize=size;
  G.setTone=function(t){ scene.environment=envFor(t); };
  G.show=function(v){ if(!builders[v]) v='bia'; if(!objs[v]){ objs[v]=builders[v](); scene.add(objs[v]); }
    Object.keys(objs).forEach(function(k){ objs[k].visible=(k===v); }); cur=objs[v]; cur.scale.setScalar(.86); fadeT=performance.now(); };
  G.frame=function(t){ if(!cur) return; var dt=lastT?Math.min(.05,(t-lastT)/1000):0; lastT=t;
    var k=Math.min(1,(t-fadeT)/700), e=1-Math.pow(1-k,3); cur.scale.setScalar(.86+.14*e);
    if(!reduce){ cur.rotation.y+=dt*(cur.userData.spin||.32); cur.rotation.x=Math.sin((t-t0)/2600)*.12+sy*.25; cur.position.y=Math.sin((t-t0)/1900)*.04+sy*.18;
      if(cur.userData.tick) cur.userData.tick(dt);
      if(cur.userData.fish){ cur.userData.fish.rotation.y=-.35+Math.sin((t-t0)/700)*.25; } }
    r.render(scene,cam); };
  G.setTone(curTone||K.tone||'cong-nghe'); G.show(curVat||'bia'); G.ready=true; G.frame(performance.now());
  requestAnimationFrame(function(){ cv.style.opacity='1'; box.classList.add('co-3d'); });
  if(reduce){ document.addEventListener('album:render',function(){ setTimeout(function(){ if(G.ready) G.frame(performance.now()); },30); }); }
  window.__kinh={renderer:r,show:function(v){ curVat=v; G.show(v); },info:function(){ return {calls:r.info.render.calls,tris:r.info.render.triangles,pr:r.getPixelRatio(),vat:curVat}; }};
}
})();
