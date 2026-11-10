/* ===== Cảnh mô phỏng máy (three.js r147 + addon, tải lười) =====
   HHN_MAY.mo(host, opt) dựng một máy từ module templates/may/<mã>.js (HHN_MAY_LIB[mã]).
   opt: { ma, buoc:[chữ…]|null, nhan:[số…]|null, phongCach:'kinh'|'hud'|'ban-ve'|'mat-cat'|'y-hoc', hdr:url|null, reduce, onClose }
   Đồ họa: WebGL antialias, pixel ratio ≤ 2, MeshPhysicalMaterial inox/kính, môi trường HDRI, bóng mềm,
   hậu kỳ SSAO (chất lượng Cao) + bloom (hạt phát sáng) + ACES/sRGB; hạt InstancedMesh (hàng nghìn).
   Điều khiển: Tách–Ghép, Xuyên thấu, Chạy/Dừng/Từng bước, Tốc độ, Thả sản phẩm, Chất lượng, xoay camera (OrbitControls). */
(function () {
  'use strict';
  var PACK = {
    kinh: { nen: '#0A1736', san: '#0D1D40', inox: '#DCE5EE', accent: '#8AD8FF', nhan: 'so', env: 1.0 },
    hud: { nen: '#040A16', san: '#06101F', inox: '#B9C9DC', accent: '#5CE1FF', nhan: 'chu', luoi: ['#2FD3FF', '#0C3049'], env: 0.85, vong: true },
    'ban-ve': { nen: '#2A2C30', san: '#2E3135', inox: '#9097A0', accent: '#FF4D4F', nhan: 'tron-do', luoi: ['#E8EAED', '#45494F'], vien: true, env: 0.45 },
    'mat-cat': { nen: '#22150D', san: '#2D1C11', inox: '#DCC6AC', accent: '#FFB45A', nhan: 'so', catNgang: true, doThi: true, env: 0.9 },
    'y-hoc': { nen: '#1C0A29', san: '#271035', inox: '#EAD8F3', accent: '#FF8FC7', nhan: 'so', muiTen: true, env: 1.0 },
  };
  var CSS = [
    '.may{position:fixed;inset:0;z-index:60;font-size:15px;line-height:1.45;color:#EEF3FA;font-family:var(--body,"Be Vietnam Pro",system-ui,sans-serif);background:#0A1736;--ac:#8AD8FF;--pn:rgba(10,18,40,.72);--vien:rgba(255,255,255,.18);overflow:hidden}',
    '.may *{box-sizing:border-box}.may button{font:inherit;color:inherit;cursor:pointer}',
    '.may-cv{position:absolute;inset:0}.may-cv canvas{display:block;width:100%;height:100%;outline:none;touch-action:none}',
    '.may-chi,.may-nhanlop{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}',
    '.may-chi line{stroke:var(--ac);stroke-width:1.2;opacity:.85}.may-chi circle{fill:none;stroke:var(--ac);stroke-width:1.4}',
    '.may-mk{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;display:flex;align-items:center;gap:6px;padding:3px 10px 3px 4px;border-radius:999px;background:var(--pn);border:1px solid var(--vien);font-size:13px;font-weight:600;white-space:nowrap;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);cursor:pointer}',
    '.may-mk b{display:grid;place-items:center;min-width:22px;height:22px;border-radius:999px;background:var(--ac);color:#06101F;font-size:12px}',
    '.may-mk.chon{border-color:var(--ac);box-shadow:0 0 0 2px color-mix(in srgb,var(--ac) 40%,transparent)}',
    '.may-dau{position:absolute;left:16px;right:16px;top:12px;display:flex;align-items:center;gap:12px;pointer-events:none}',
    '.may-dau h2{margin:0;font-size:20px;font-weight:700;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 2px 12px rgba(0,0,0,.5)}',
    '.may-dau button{pointer-events:auto}',
    '.may-nut{min-height:40px;padding:0 14px;border-radius:12px;border:1px solid var(--vien);background:var(--pn);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);font-size:14px;font-weight:600;white-space:nowrap}',
    '.may-nut[aria-pressed="true"]{background:var(--ac);color:#06101F;border-color:var(--ac)}',
    '.may-nut kbd,.may-dk kbd{font:inherit;font-size:11px;opacity:.7;margin-left:6px;border:1px solid currentColor;border-radius:4px;padding:0 4px}',
    '.may-pn{position:absolute;top:64px;width:300px;max-height:calc(100% - 170px);overflow:auto;padding:14px 16px;border-radius:18px;background:var(--pn);border:1px solid var(--vien);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}',
    '.may-trai{left:16px}.may-phai{right:16px}',
    '.may-pn h3{margin:0 0 8px;font-size:13px;font-weight:700;color:var(--ac)}',
    '.may-buoc{margin:0;padding:0;list-style:none;counter-reset:b}',
    '.may-buoc li{counter-increment:b;position:relative;padding:7px 8px 7px 34px;border-radius:10px;font-size:13.5px;line-height:1.4;cursor:pointer;opacity:.62;transition:opacity .2s,background-color .2s}',
    '.may-buoc li::before{content:attr(data-n);position:absolute;left:6px;top:7px;width:20px;height:20px;border-radius:999px;border:1px solid currentColor;display:grid;place-items:center;font-size:11px;font-weight:700}',
    '.may-buoc li.on{opacity:1;background:rgba(255,255,255,.08)}.may-buoc li.on::before{background:var(--ac);color:#06101F;border-color:var(--ac)}',
    '.may-bp{margin:0 0 10px;padding:0;list-style:none}.may-bp li{display:flex;gap:8px;align-items:baseline;padding:6px 8px;border-radius:10px;font-size:13.5px;cursor:pointer}',
    '.may-bp li b{min-width:22px;text-align:center;color:var(--ac)}.may-bp li.chon{background:rgba(255,255,255,.1)}',
    '.may-the{font-size:13.5px;line-height:1.5;border-top:1px solid var(--vien);padding-top:10px;min-height:3em}.may-the strong{color:var(--ac)}',
    '.may-dk{position:absolute;left:0;right:0;margin:0 auto;width:max-content;bottom:14px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;max-width:calc(100% - 24px);padding:10px 12px;border-radius:18px;background:var(--pn);border:1px solid var(--vien);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}',
    '.may-dk label{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;white-space:nowrap}',
    '.may-dk input[type=range]{accent-color:var(--ac);width:130px}',
    '.may-bao{position:absolute;left:0;right:0;margin:0 auto;width:max-content;max-width:calc(100% - 32px);bottom:150px;padding:8px 14px;border-radius:12px;background:var(--pn);border:1px solid var(--ac);font-size:13px;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.may-bao.on{opacity:1}',
    '.may-dothi{position:absolute;right:16px;bottom:96px;width:300px;padding:10px 12px;border-radius:14px;background:var(--pn);border:1px solid var(--vien);display:none}',
    '.may-dothi h3{margin:0 0 4px;font-size:12px;color:var(--ac)}.may-dothi canvas{width:100%;height:110px;display:block}',
    '.may-dothi .cg{font-size:11px;opacity:.85;display:flex;gap:12px}.may-dothi .cg i{display:inline-block;width:10px;height:3px;margin-right:4px;vertical-align:middle}',
    '.may-tinh{position:absolute;inset:0;display:grid;place-items:center;padding:40px}.may-tinh svg{max-width:min(760px,92vw);max-height:70vh}',
    '.may-tinh p{max-width:40em;text-align:center}',
    /* gói phong cách */
    '.may.pc-hud{--ac:#5CE1FF;--pn:rgba(4,14,30,.78);--vien:rgba(92,225,255,.35)}',
    '.may.pc-hud .may-pn,.may.pc-hud .may-dk,.may.pc-hud .may-nut{border-radius:4px}',
    '.may.pc-hud .may-mk{border-radius:2px;padding:2px 8px 2px 2px;border-color:rgba(92,225,255,.6);text-transform:none;letter-spacing:.02em}.may.pc-hud .may-mk b{border-radius:2px;background:transparent;color:#5CE1FF;border:1px solid #5CE1FF}',
    '.may.pc-ban-ve{--ac:#FF4D4F;--pn:rgba(34,36,40,.9);--vien:rgba(232,234,237,.55)}',
    '.may.pc-ban-ve .may-pn,.may.pc-ban-ve .may-dk,.may.pc-ban-ve .may-nut{border-radius:2px;-webkit-backdrop-filter:none;backdrop-filter:none}',
    '.may.pc-ban-ve .may-mk{background:transparent;border:0;padding:0;-webkit-backdrop-filter:none;backdrop-filter:none;font-weight:500}.may.pc-ban-ve .may-mk b{background:#E5484D;color:#fff;min-width:24px;height:24px;border:2px solid #fff}',
    '.may.pc-ban-ve .may-chi line{stroke:#E8EAED;stroke-width:1}',
    '.may.pc-mat-cat{--ac:#FFB45A;--pn:rgba(40,24,14,.8);--vien:rgba(255,200,150,.3)}.may.pc-mat-cat .may-dothi{display:block}',
    '.may.pc-mat-cat .may-chi line{stroke-dasharray:4 3}',
    '.may.pc-y-hoc{--ac:#FF8FC7;--pn:rgba(40,12,52,.76);--vien:rgba(255,170,220,.32)}',
    '.may.pc-y-hoc .may-buoc li{margin-bottom:18px}.may.pc-y-hoc .may-buoc li:not(:last-child)::after{content:"↓";position:absolute;left:12px;bottom:-18px;color:#FF8FC7;font-weight:700}',
    '@media (max-width:820px){.may-pn{top:auto;bottom:auto;position:relative;width:auto;max-height:26vh;margin:8px}.may-trai,.may-phai{left:auto;right:auto}',
    '.may-cols{position:absolute;left:0;right:0;top:52px;display:flex;flex-direction:column;pointer-events:none}.may-cols>*{pointer-events:auto}',
    '.may-dk{gap:6px;padding:8px;bottom:8px}.may-dk input[type=range]{width:84px}.may-dk .may-nut{min-height:36px;padding:0 10px;font-size:13px}.may-dk kbd,.may-dau kbd{display:none}.may-mk span{display:none}.may-mk{padding:3px}.may-dothi{display:none!important}.may-dau h2{font-size:16px}',
    '.may-trai h3,.may-phai h3,.may-bp{display:none}.may-buoc li:not(.on){display:none}.may-buoc li{opacity:1}.may-pn{padding:8px 12px;max-height:none}.may-the{border:0;padding:0;min-height:0}.may-bao{bottom:170px}}',
  ].join('\n');

  function hexLin(T, hex) { return new T.Color(hex).convertSRGBToLinear(); }
  var OutputShader = {
    uniforms: { tDiffuse: { value: null }, exposure: { value: 1.0 } },
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: [
      'uniform sampler2D tDiffuse;uniform float exposure;varying vec2 vUv;',
      'vec3 RRT(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}',
      'vec3 aces(vec3 c){const mat3 I=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));',
      'const mat3 O=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));',
      'c*=exposure/0.6;c=I*c;c=RRT(c);c=O*c;return clamp(c,0.0,1.0);}',
      'vec3 srgb(vec3 c){return mix(pow(c,vec3(0.41666))*1.055-vec3(0.055),c*12.92,vec3(lessThanEqual(c,vec3(0.0031308))));}',
      'void main(){vec4 t=texture2D(tDiffuse,vUv);gl_FragColor=vec4(srgb(aces(t.rgb)),1.0);}',
    ].join('\n'),
  };

  var HHN = window.HHN_MAY = window.HHN_MAY || {};
  HHN.mo = function (host, opt) {
    var T = window.THREE, mk = (window.HHN_MAY_LIB || {})[opt.ma];
    if (!T || !mk) throw new Error('thiếu three.js hoặc module máy "' + opt.ma + '"');
    if (!document.getElementById('may-css')) { var st = document.createElement('style'); st.id = 'may-css'; st.textContent = CSS; document.head.appendChild(st); }
    var pc = PACK[opt.phongCach] ? opt.phongCach : 'kinh', P = PACK[pc], reduce = !!opt.reduce;
    var lin = function (h) { return hexLin(T, h); };
    var ctx = { lin: lin, mat: {
      inox: function (o) { return new T.MeshPhysicalMaterial(Object.assign({ color: lin(P.inox), metalness: P.vien ? 0.25 : 1, roughness: P.vien ? 0.75 : 0.22, clearcoat: P.vien ? 0 : 0.35, clearcoatRoughness: 0.2, envMapIntensity: P.env }, o || {})); },
      kinh: function (o) { return new T.MeshPhysicalMaterial(Object.assign({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 0.4, envMapIntensity: P.env }, o || {})); },
      son: function (hex, o) { return new T.MeshStandardMaterial(Object.assign({ color: lin(hex), roughness: 0.55, metalness: 0.1, envMapIntensity: P.env }, o || {})); },
    } };
    var M = mk(T, ctx);

    // ---------- DOM ----------
    var root = document.createElement('div'); root.className = 'may pc-' + pc; root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Cảnh mô phỏng: ' + M.ten);
    root.style.setProperty('--ac', P.accent); root.style.background = P.nen;
    root.innerHTML = '<div class="may-cv"></div><svg class="may-chi"></svg><div class="may-nhanlop"></div>' +
      '<div class="may-dau"><h2></h2><button type="button" class="may-nut" data-k="dong">✕ Đóng<kbd>Esc</kbd></button></div>' +
      '<div class="may-cols"><aside class="may-pn may-trai"><h3>Các bước</h3><ol class="may-buoc"></ol></aside>' +
      '<aside class="may-pn may-phai"><h3>Bộ phận</h3><ul class="may-bp"></ul><div class="may-the">Chạm vào một bộ phận để xem chức năng.</div></aside></div>' +
      '<div class="may-dothi"><h3></h3><canvas width="560" height="220"></canvas><div class="cg"><span><i style="background:#F2C230"></i>Phần nhẹ (béo)</span><span><i style="background:#3BA7E6"></i>Phần nặng (sữa gầy)</span></div></div>' +
      '<div class="may-dk">' +
      '<label>Ghép <input type="range" data-k="tach" min="0" max="100" value="0" aria-label="Tách – ghép bộ phận"> Tách<kbd>T</kbd></label>' +
      '<button type="button" class="may-nut" data-k="xuyen" aria-pressed="false">Xuyên thấu<kbd>X</kbd></button>' +
      '<button type="button" class="may-nut" data-k="chay" aria-pressed="false">▶ Chạy<kbd>Space</kbd></button>' +
      '<button type="button" class="may-nut" data-k="buoc1">Từng bước<kbd>N</kbd></button>' +
      '<label>Tốc độ <input type="range" data-k="tocdo" min="25" max="300" value="100" aria-label="Tốc độ mô phỏng"><span data-k="tdv">1×</span></label>' +
      '<button type="button" class="may-nut" data-k="tha">Thả sản phẩm<kbd>D</kbd></button>' +
      '<button type="button" class="may-nut" data-k="cl">Chất lượng: Cao<kbd>Q</kbd></button>' +
      '<button type="button" class="may-nut" data-k="datlai">Góc nhìn<kbd>R</kbd></button></div>' +
      '<div class="may-bao" aria-live="polite"></div>';
    host.appendChild(root);
    var $ = function (s) { return root.querySelector(s); }, q = function (k) { return root.querySelector('[data-k="' + k + '"]'); };
    $('.may-dau h2').textContent = M.ten; $('.may-dothi h3').textContent = M.chuThichDoThi || 'Số hạt ra';
    function bao(t) { var b = $('.may-bao'); b.textContent = t; b.classList.add('on'); clearTimeout(bao.t); bao.t = setTimeout(function () { b.classList.remove('on'); }, 2600); }

    // ---------- renderer + cảnh ----------
    var cv = $('.may-cv'), W = cv.clientWidth || innerWidth, H = cv.clientHeight || innerHeight;
    var renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    var PR = Math.min(2, window.devicePixelRatio || 1);
    renderer.setPixelRatio(PR); renderer.setSize(W, H);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.localClippingEnabled = !!P.catNgang;
    cv.appendChild(renderer.domElement); renderer.domElement.tabIndex = 0;
    var scene = new T.Scene(); scene.background = lin(P.nen); scene.fog = new T.Fog(lin(P.nen), 10, 22);
    var cam = new T.PerspectiveCamera(34, W / H, 0.05, 60);
    var CP = new T.Vector3().fromArray(M.camera.pos), CT = new T.Vector3().fromArray(M.camera.target);
    cam.position.copy(CP);
    var orbit = new T.OrbitControls(cam, renderer.domElement); orbit.target.copy(CT); orbit.enableDamping = !reduce; orbit.dampingFactor = 0.08;
    orbit.minDistance = 2.2; orbit.maxDistance = 10; orbit.maxPolarAngle = Math.PI * 0.56; orbit.update();
    // ánh sáng: HDRI nhỏ (môi trường) + đèn chính đổ bóng mềm + đèn viền màu gói
    var pm = new T.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new T.RoomEnvironment(), 0.04).texture; // tạm thời, thay bằng HDRI khi tải xong
    if (opt.hdr && T.RGBELoader) new T.RGBELoader().load(opt.hdr, function (tx) { tx.mapping = T.EquirectangularReflectionMapping; var e = pm.fromEquirectangular(tx).texture; scene.environment = e; tx.dispose(); }, undefined, function () { /* giữ RoomEnvironment */ });
    var key = new T.DirectionalLight(0xffffff, 1.5); key.position.set(4, 7, 3.5); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.camera.left = -3.2; key.shadow.camera.right = 3.2; key.shadow.camera.top = 3.6; key.shadow.camera.bottom = -3; key.shadow.camera.near = 1; key.shadow.camera.far = 20;
    key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; scene.add(key);
    scene.add(new T.HemisphereLight(lin('#ffffff'), lin(P.san), 0.35));
    var rim = new T.PointLight(lin(P.accent), 1.4, 12); rim.position.set(-3.5, 2.5, -3); scene.add(rim);
    scene.fog = new T.Fog(lin(P.nen), 13, 36);
    var san = new T.Mesh(new T.CircleGeometry(40, 128), new T.MeshStandardMaterial({ color: lin(P.san).multiplyScalar(0.55), roughness: 1, metalness: 0, envMapIntensity: 0.15 }));
    san.rotation.x = -Math.PI / 2; san.position.y = -2.385; san.receiveShadow = true; scene.add(san);
    if (P.luoi) { var gh = new T.GridHelper(14, 56, lin(P.luoi[0]), lin(P.luoi[1])); gh.position.y = -2.38; gh.material.transparent = true; gh.material.opacity = pc === 'hud' ? 0.35 : 0.5; scene.add(gh); }

    // ---------- bộ phận ----------
    var catPlane = new T.Plane(new T.Vector3(0, 0, -1), 0.0);
    var parts = M.boPhan.slice(), pickables = [];
    parts.forEach(function (bp) {
      bp.lap = bp.obj.position.clone(); scene.add(bp.obj); bp.obj.userData.boPhan = bp;
      bp.obj.traverse(function (o) {
        if (!o.isMesh) return; pickables.push(o); o.userData.bp = bp;
        var m = o.material; if (P.catNgang) { m.clippingPlanes = [catPlane]; m.clipShadows = true; }
        if (P.vien) { var e = new T.LineSegments(new T.EdgesGeometry(o.geometry, 28), new T.LineBasicMaterial({ color: lin('#F2F4F7'), transparent: true, opacity: 0.55 })); if (P.catNgang) e.material.clippingPlanes = [catPlane]; o.add(e); }
      });
    });
    (M.trangTri || []).forEach(function (o) { scene.add(o); });
    var nhanSo = opt.nhan && opt.nhan.length ? opt.nhan : parts.map(function (b) { return b.so; });

    // ---------- hạt (InstancedMesh) ----------
    var CL = { cao: { pr: PR, ssao: true, bong: 2048, hat: 6000 }, vua: { pr: Math.min(1.25, PR), ssao: false, bong: 1024, hat: 2500 } };
    var chatLuong = 'cao', khoaCL = false;
    var hatGeo = new T.IcosahedronGeometry(1, 1);
    var hatMat = new T.MeshStandardMaterial({ roughness: 0.35, metalness: 0, envMapIntensity: 0.6 });
    hatMat.onBeforeCompile = function (sh) { // độ phát sáng riêng từng hạt (aGlow): sữa 0, béo/nước sáng dần khi tách pha → bloom
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float aGlow;\nvarying float vGlow;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vGlow;').replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#ifdef USE_COLOR\ntotalEmissiveRadiance += vColor * vGlow;\n#endif');
    };
    var hatMesh = null, S = null, N = 0, conTro = 0;
    function taoHat(n) {
      if (hatMesh) { scene.remove(hatMesh); hatMesh.dispose(); }
      N = n; hatMesh = new T.InstancedMesh(hatGeo, hatMat, N); hatMesh.frustumCulled = false;
      hatMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
      hatMesh.instanceColor = new T.InstancedBufferAttribute(new Float32Array(N * 3), 3); hatMesh.instanceColor.setUsage(T.DynamicDrawUsage);
      var a = hatMesh.instanceMatrix.array; for (var i = 0; i < N; i++) { a[i * 16 + 15] = 1; }
      var ga = new T.InstancedBufferAttribute(new Float32Array(N), 1); ga.setUsage(T.DynamicDrawUsage); hatGeo.setAttribute('aGlow', ga);
      var cu = S; S = {}; ['song', 'pha', 'u', 'j', 'beo', 'k', 'th', 'r0', 'a0', 'x', 'y', 'z', 'cr', 'cg', 'cb', 's', 'gl'].forEach(function (f) { S[f] = new Float32Array(N); if (cu) S[f].set(cu[f].subarray(0, Math.min(N, cu[f].length))); });
      scene.add(hatMesh);
    }
    taoHat(CL.cao.hat);
    var R0 = 0.0115, ra = { nhe: 0, nang: 0 }, tg = 0, chay = false, toc = 1, hangCho = 0, tichSinh = 0;
    function sinh1() { for (var t = 0; t < N; t++) { var i = (conTro + t) % N; if (!S.song[i]) { M.hat.sinh(S, i); conTro = (i + 1) % N; return true; } } return false; }
    function buocSim(dt) { // dt đã nhân tốc độ
      tg += dt;
      var muc = N / 5.6; // hạt/giây để lấp đầy
      if (chay) { tichSinh += muc * dt; }
      if (hangCho > 0) { var m = Math.min(hangCho, Math.ceil(N / 0.6 * dt)); tichSinh += m; hangCho -= m; }
      while (tichSinh >= 1) { if (!sinh1()) { tichSinh = 0; break; } tichSinh -= 1; }
      var om = M.omega * (chay || hangCho > 0 || dangCon() ? 1 : 0);
      for (var i = 0; i < N; i++) { if (!S.song[i]) continue; var p4 = S.pha[i] === 4; M.hat.buoc(S, i, dt, om); if (p4 && !S.song[i]) { if (S.beo[i]) ra.nhe++; else ra.nang++; } }
    }
    function dangCon() { for (var i = 0; i < N; i += 7) if (S.song[i]) return true; return false; }
    function veHat() {
      var a = hatMesh.instanceMatrix.array, c = hatMesh.instanceColor.array, ga = hatGeo.getAttribute('aGlow'), g = ga.array, an = tachE > 0.06;
      hatMesh.visible = !an;
      for (var i = 0; i < N; i++) {
        var o = i * 16, s = S.song[i] ? R0 * S.s[i] : 0;
        a[o] = s; a[o + 5] = s; a[o + 10] = s; a[o + 12] = S.x[i]; a[o + 13] = S.y[i]; a[o + 14] = S.z[i];
        c[i * 3] = S.cr[i]; c[i * 3 + 1] = S.cg[i]; c[i * 3 + 2] = S.cb[i]; g[i] = S.gl[i];
      }
      hatMesh.instanceMatrix.needsUpdate = true; hatMesh.instanceColor.needsUpdate = true; ga.needsUpdate = true;
    }

    // ---------- mũi tên dòng chảy (gói y-hoc) ----------
    var muiTen = [];
    if (P.muiTen && M.tuyen) {
      var mg = new T.ConeGeometry(0.035, 0.1, 12); mg.rotateX(Math.PI / 2);
      var mm = new T.MeshStandardMaterial({ color: lin('#FF8FC7'), emissive: lin('#FF5FB0'), emissiveIntensity: 1.6, roughness: 0.4 });
      M.tuyen.forEach(function (pts) {
        var c = new T.CatmullRomCurve3(pts.map(function (p) { return new T.Vector3().fromArray(p); }), false, 'catmullrom', 0.1), L = c.getLength(), n = Math.max(3, Math.round(L / 0.28));
        for (var i = 0; i < n; i++) { var m = new T.Mesh(mg, mm); m.userData = { c: c, o: i / n }; scene.add(m); muiTen.push(m); }
      });
    }
    function veMuiTen(t) { muiTen.forEach(function (m) { var u = (m.userData.o + (reduce ? 0 : t * 0.12)) % 1, c = m.userData.c; m.position.copy(c.getPointAt(u)); m.lookAt(m.position.clone().add(c.getTangentAt(u))); m.visible = tachE < 0.06; }); }

    // ---------- hậu kỳ: SSAO (Cao) + bloom + ACES/sRGB ----------
    var composer = null, ssao = null, rp = null, bloom = null;
    if (T.EffectComposer && T.UnrealBloomPass) {
      try {
        var rt = new T.WebGLRenderTarget(W * PR, H * PR, { type: T.HalfFloatType });
        composer = new T.EffectComposer(renderer, rt); composer.setPixelRatio(PR); composer.setSize(W, H);
        rp = new T.RenderPass(scene, cam); composer.addPass(rp);
        if (T.SSAOPass) { ssao = new T.SSAOPass(scene, cam, W, H); ssao.kernelRadius = 0.16; ssao.minDistance = 0.0015; ssao.maxDistance = 0.06; composer.addPass(ssao); }
        bloom = new T.UnrealBloomPass(new T.Vector2(W, H), 0.55, 0.32, 1.0); composer.addPass(bloom);
        var outp = new T.ShaderPass(OutputShader); outp.uniforms.exposure.value = 0.85; composer.addPass(outp);
        renderer.toneMapping = T.NoToneMapping; renderer.outputEncoding = T.LinearEncoding;
      } catch (e) { console.warn('hậu kỳ lỗi, vẽ thẳng:', e); composer = null; }
    }
    if (!composer) { renderer.toneMapping = T.ACESFilmicToneMapping; renderer.outputEncoding = T.sRGBEncoding; }
    function apCL(muc, tuDong) {
      chatLuong = muc; var c = CL[muc];
      renderer.setPixelRatio(c.pr); if (composer) composer.setPixelRatio(c.pr);
      if (ssao) { ssao.enabled = c.ssao; rp.enabled = !c.ssao; }
      key.shadow.mapSize.set(c.bong, c.bong); if (key.shadow.map) { key.shadow.map.dispose(); key.shadow.map = null; }
      if (N !== c.hat) taoHat(c.hat);
      q('cl').innerHTML = 'Chất lượng: ' + (muc === 'cao' ? 'Cao' : 'Vừa') + '<kbd>Q</kbd>';
      if (tuDong) bao('Khung hình dưới 30 fps – đã hạ chất lượng xuống Vừa (bấm Q để đổi lại)');
    }
    apCL('cao');

    // ---------- nhãn: số/chữ trên từng bộ phận + đường chỉ ----------
    var lop = $('.may-nhanlop'), svg = $('.may-chi'), mks = {}, chon = null;
    var kyHieu = function (bp) { return P.nhan === 'chu' ? String.fromCharCode(64 + bp.so) : String(bp.so); };
    parts.forEach(function (bp) {
      if (nhanSo.indexOf(bp.so) < 0) return;
      var e = document.createElement('div'); e.className = 'may-mk'; e.innerHTML = '<b>' + kyHieu(bp) + '</b><span></span>'; e.querySelector('span').textContent = bp.ten;
      e.addEventListener('click', function (ev) { ev.stopPropagation(); chonBP(bp); }); lop.appendChild(e); mks[bp.id] = e;
      var li = document.createElement('li'); li.innerHTML = '<b>' + kyHieu(bp) + '</b><span></span>'; li.querySelector('span').textContent = bp.ten; li.addEventListener('click', function () { chonBP(bp); });
      li.dataset.id = bp.id; $('.may-bp').appendChild(li);
    });
    var v3 = new T.Vector3();
    function chieu(p) { v3.copy(p).project(cam); return { x: (v3.x + 1) / 2 * W, y: (1 - v3.y) / 2 * H, z: v3.z }; }
    function neoBP(bp) { return new T.Vector3().fromArray(bp.neo).add(bp.obj.position); }
    function veNhan() {
      var s = '', cx = W / 2, cy = H / 2;
      parts.forEach(function (bp) {
        var e = mks[bp.id]; if (!e) return;
        var a = chieu(neoBP(bp)); if (a.z > 1) { e.style.display = 'none'; return; } e.style.display = '';
        var dx = a.x - cx, dy = a.y - cy, L = Math.hypot(dx, dy) || 1, off = W < 820 ? 34 : 86;
        var mx = a.x + dx / L * off, my = a.y + dy / L * off * 0.6 - (bp.so % 2 ? 10 : -10);
        if (W >= 1100) { mx = Math.max(400, Math.min(W - 400, mx)); my = Math.max(70, Math.min(H - 190, my)); } // không chui dưới khung bước/bộ phận/điều khiển
        e.style.left = mx + 'px'; e.style.top = my + 'px';
        s += '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '"/><circle cx="' + a.x.toFixed(1) + '" cy="' + a.y.toFixed(1) + '" r="2.5" style="fill:var(--ac)"/>';
        if (chon === bp && P.vong) s += '<circle cx="' + a.x.toFixed(1) + '" cy="' + a.y.toFixed(1) + '" r="44"/><circle cx="' + a.x.toFixed(1) + '" cy="' + a.y.toFixed(1) + '" r="52" style="stroke-dasharray:3 6;opacity:.6"/>';
      });
      if (P.doThi) { var g = $('.may-dothi').getBoundingClientRect(), r0 = root.getBoundingClientRect(), a2 = chieu(new T.Vector3(0.975, -0.4, 0).add(parts[0].obj.position)); s += '<line x1="' + a2.x.toFixed(1) + '" y1="' + a2.y.toFixed(1) + '" x2="' + (g.left - r0.left).toFixed(1) + '" y2="' + (g.top - r0.top + 20).toFixed(1) + '"/>'; }
      svg.innerHTML = s;
    }
    var goc = new Map();
    function chonBP(bp) {
      if (chon) chon.obj.traverse(function (o) { if (o.isMesh && goc.has(o.material)) { o.material.emissive.copy(goc.get(o.material)); } });
      chon = bp; goc.clear();
      root.querySelectorAll('.may-mk,.may-bp li').forEach(function (e) { e.classList.remove('chon'); });
      if (!bp) { $('.may-the').textContent = 'Chạm vào một bộ phận để xem chức năng.'; return; }
      bp.obj.traverse(function (o) { if (o.isMesh && o.material.emissive && !goc.has(o.material)) { goc.set(o.material, o.material.emissive.clone()); o.material.emissive.copy(lin(P.accent)).multiplyScalar(0.35); } });
      if (mks[bp.id]) mks[bp.id].classList.add('chon'); var li = root.querySelector('.may-bp li[data-id="' + bp.id + '"]'); if (li) li.classList.add('chon');
      $('.may-the').innerHTML = '<strong></strong><br><span></span>'; $('.may-the strong').textContent = kyHieu(bp) + ' · ' + bp.ten; $('.may-the span').textContent = bp.chucNang;
    }
    var rc = new T.Raycaster(), nd = null;
    renderer.domElement.addEventListener('pointerdown', function (e) { nd = { x: e.clientX, y: e.clientY }; });
    renderer.domElement.addEventListener('pointerup', function (e) {
      if (!nd || Math.hypot(e.clientX - nd.x, e.clientY - nd.y) > 5) return; nd = null;
      var r = renderer.domElement.getBoundingClientRect(); rc.setFromCamera({ x: (e.clientX - r.left) / r.width * 2 - 1, y: -(e.clientY - r.top) / r.height * 2 + 1 }, cam);
      var hit = rc.intersectObjects(pickables, false).filter(function (h) { return !P.catNgang || catPlane.distanceToPoint(h.point) >= 0; })[0];
      chonBP(hit ? hit.object.userData.bp : null);
    });

    // ---------- các bước ----------
    var buoc = M.buoc.map(function (b, i) { return Object.assign({}, b, { ten: (opt.buoc && opt.buoc[i]) || b.ten }); });
    if (opt.buoc) for (var bi = M.buoc.length; bi < opt.buoc.length; bi++) buoc.push({ ten: opt.buoc[bi], pha: [] });
    buoc.forEach(function (b, i) { var li = document.createElement('li'); li.textContent = b.ten; li.setAttribute('data-n', i + 1); li.addEventListener('click', function () { var bp = parts.filter(function (x) { return x.id === b.bp; })[0]; if (bp) chonBP(bp); }); $('.may-buoc').appendChild(li); b.li = li; });
    function veBuoc() {
      var dem = buoc.map(function () { return 0; });
      for (var i = 0; i < N; i += 3) { if (!S.song[i]) continue; var p = S.pha[i]; for (var b = 0; b < buoc.length; b++) { var x = buoc[b]; if (x.pha.indexOf(p) >= 0 && (x.beo === undefined || x.beo === S.beo[i])) { dem[b]++; break; } } }
      var mx = 0, bi = -1; dem.forEach(function (d, i) { if (d > mx) { mx = d; bi = i; } });
      buoc.forEach(function (b, i) { b.li.classList.toggle('on', i === bi); });
    }

    // ---------- đồ thị (gói mat-cat) ----------
    var dt2 = $('.may-dothi canvas'), dctx = dt2.getContext('2d'), mau = [], lastMau = 0, raCu = { nhe: 0, nang: 0 };
    function veDoThi() {
      var w = dt2.width, h = dt2.height; dctx.clearRect(0, 0, w, h);
      dctx.strokeStyle = 'rgba(255,220,180,.25)'; dctx.lineWidth = 1; for (var g = 1; g < 4; g++) { dctx.beginPath(); dctx.moveTo(0, h * g / 4); dctx.lineTo(w, h * g / 4); dctx.stroke(); }
      var mx = 1; mau.forEach(function (m) { mx = Math.max(mx, m[0], m[1]); });
      [['#F2C230', 0], ['#3BA7E6', 1]].forEach(function (c) { dctx.strokeStyle = c[0]; dctx.lineWidth = 3; dctx.beginPath(); mau.forEach(function (m, i) { var x = i / 59 * w, y = h - 6 - m[c[1]] / mx * (h - 14); if (i) dctx.lineTo(x, y); else dctx.moveTo(x, y); }); dctx.stroke(); });
    }

    // ---------- tách / xuyên / điều khiển ----------
    var tachMuc = 0, tachE = 0, xuyen = false;
    function doiCo() { q('chay').setAttribute('aria-pressed', String(chay)); q('chay').innerHTML = (chay ? '❚❚ Dừng' : '▶ Chạy') + '<kbd>Space</kbd>'; q('xuyen').setAttribute('aria-pressed', String(xuyen)); }
    function datXuyen(b) {
      xuyen = b; parts.forEach(function (bp) { bp.obj.traverse(function (o) { if (!o.isMesh || o.userData.xuyen === undefined) return; var m = o.material; m.transparent = b; m.opacity = b ? o.userData.xuyen : 1; m.depthWrite = !b; m.needsUpdate = true; o.castShadow = !b; }); });
      doiCo();
    }
    function datTach(v) { tachMuc = Math.max(0, Math.min(1, v)); q('tach').value = Math.round(tachMuc * 100); if (reduce) tachE = tachMuc; }
    function datToc(v) { toc = Math.max(0.25, Math.min(3, v)); q('tocdo').value = Math.round(toc * 100); q('tdv').textContent = (Math.round(toc * 100) / 100) + '×'; }
    function datChay(b) { chay = b; doiCo(); }
    function mot() { datChay(false); for (var i = 0; i < 15; i++) buocSim(1 / 60 * toc); }
    function tha() { hangCho += Math.round(N * 0.35); bao('Thả ' + Math.round(N * 0.35) + ' hạt sữa vào ống nạp'); }
    function datLai() { cam.position.copy(CP); orbit.target.copy(CT); orbit.update(); }
    q('tach').addEventListener('input', function () { datTach(this.value / 100); });
    q('tocdo').addEventListener('input', function () { datToc(this.value / 100); });
    q('xuyen').addEventListener('click', function () { datXuyen(!xuyen); });
    q('chay').addEventListener('click', function () { datChay(!chay); });
    q('buoc1').addEventListener('click', mot);
    q('tha').addEventListener('click', tha);
    q('cl').addEventListener('click', function () { khoaCL = true; apCL(chatLuong === 'cao' ? 'vua' : 'cao'); });
    q('datlai').addEventListener('click', datLai);
    q('dong').addEventListener('click', dong);
    function phim(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key, xong = true;
      if (k === 'Escape') dong(); else if (k === ' ') datChay(!chay); else if (k === 'n' || k === 'N') mot();
      else if (k === 'x' || k === 'X') datXuyen(!xuyen); else if (k === 't' || k === 'T') datTach(tachMuc > 0.5 ? 0 : 1);
      else if (k === 'd' || k === 'D') tha(); else if (k === '+' || k === '=') datToc(toc + 0.25); else if (k === '-' || k === '_') datToc(toc - 0.25);
      else if (k === 'r' || k === 'R') datLai(); else if (k === 'q' || k === 'Q') { khoaCL = true; apCL(chatLuong === 'cao' ? 'vua' : 'cao'); }
      else if (/^[1-9]$/.test(k)) { var bp = parts.filter(function (x) { return x.so === +k; })[0]; if (bp) chonBP(bp); }
      else xong = false;
      if (xong) { e.preventDefault(); e.stopPropagation(); }
    }
    window.addEventListener('keydown', phim, true);

    // ---------- vòng lặp ----------
    var raf = 0, last = 0, fpsT = 0, fpsN = 0, chamLau = 0, song = true, dongBang = false, ePrev = 0;
    function layMau() { mau.push([ra.nhe - raCu.nhe, ra.nang - raCu.nang]); raCu = { nhe: ra.nhe, nang: ra.nang }; if (mau.length > 60) mau.shift(); if (P.doThi) veDoThi(); veBuoc(); } // mỗi 0,5 s
    function size() { W = cv.clientWidth || innerWidth; H = cv.clientHeight || innerHeight; cam.aspect = W / H; cam.updateProjectionMatrix(); renderer.setSize(W, H); if (composer) { composer.setSize(W, H); } }
    window.addEventListener('resize', size);
    function frame(t) {
      if (!song) return; raf = requestAnimationFrame(frame);
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
      // chất lượng tự hạ: trung bình 2 giây < 30 fps
      fpsT += dt; fpsN++; if (fpsT >= 2) { var fps = fpsN / fpsT; fpsT = 0; fpsN = 0; if (fps < 30 && chatLuong === 'cao' && !khoaCL) { chamLau++; if (chamLau >= 1) apCL('vua', true); } else chamLau = 0; }
      tachE += (tachMuc - tachE) * (reduce ? 1 : Math.min(1, dt * 6));
      var e = tachE * tachE * (3 - 2 * tachE);
      var de = e - ePrev; ePrev = e;
      if (de) { // tách ra: máy cao hơn → camera lùi xa và nhìn cao lên một chút (giữ nguyên hướng người dùng đã xoay)
        var dir = cam.position.clone().sub(orbit.target), L = dir.length(); dir.multiplyScalar((L + de * 3.6) / L);
        orbit.target.y += de * 0.85; cam.position.copy(orbit.target).add(dir);
      }
      parts.forEach(function (bp) { bp.obj.position.set(bp.lap.x + bp.tach[0] * e, bp.lap.y + bp.tach[1] * e, bp.lap.z + bp.tach[2] * e); });
      if (M.tach) M.tach(e);
      var sdt = dt * toc;
      if (!dongBang && (chay || hangCho > 0 || dangCon())) { buocSim(sdt); var om = M.omega * sdt; parts.forEach(function (bp) { if (bp.xoay) bp.obj.rotation.y += om; }); }
      veHat(); veMuiTen(t / 1000); orbit.update();
      if (t - lastMau > 500 && !dongBang) { lastMau = t; layMau(); }
      if (composer) composer.render(dt); else renderer.render(scene, cam);
      veNhan();
    }
    doiCo(); raf = requestAnimationFrame(frame);
    if (!reduce) { datChay(true); hangCho = Math.round(N * 0.3); } // reduced-motion: không tự chạy, bấm Chạy để xem

    function dong() {
      song = false; cancelAnimationFrame(raf); window.removeEventListener('keydown', phim, true); window.removeEventListener('resize', size);
      try { orbit.dispose(); renderer.dispose(); if (composer) composer.renderTarget1.dispose(); pm.dispose(); } catch (e) { }
      root.remove(); if (opt.onClose) opt.onClose();
    }
    var api = {
      tach: datTach, xuyen: datXuyen, chay: datChay, mot: mot, tha: tha, tocDo: datToc, chon: function (id) { chonBP(parts.filter(function (x) { return x.id === id || x.so === id; })[0] || null); },
      chatLuong: function (q, khoa) { khoaCL = khoa !== false; apCL(q); }, datLai: datLai, dong: dong,
      sim: function (giay) { for (var t = 0, n = 0; t < giay; t += 1 / 60, n++) { buocSim(1 / 60); var om = M.omega / 60; parts.forEach(function (bp) { if (bp.xoay) bp.obj.rotation.y += om; }); if (n % 30 === 29) layMau(); } },
      xoa: function () { for (var i = 0; i < N; i++) { S.song[i] = 0; S.s[i] = 0; } hangCho = 0; tichSinh = 0; ra = { nhe: 0, nang: 0 }; raCu = { nhe: 0, nang: 0 }; mau.length = 0; tg = 0; },
      dongBang: function (b) { dongBang = b !== false; },
      thongKe: function () { var d = [0, 0, 0, 0, 0], s = 0; for (var i = 0; i < N; i++) if (S.song[i]) { s++; d[S.pha[i]]++; } return { song: s, pha: d, ra: Object.assign({}, ra), tg: tg, chatLuong: chatLuong, pr: renderer.getPixelRatio(), hat: N, ssao: !!(ssao && ssao.enabled), hauKy: !!composer, phongCach: pc }; },
      renderer: renderer,
    };
    return api;
  };
})();
