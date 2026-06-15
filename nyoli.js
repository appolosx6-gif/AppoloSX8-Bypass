(function () {
  "use strict";

if (typeof window.AppoloSX === "undefined") {
    console.log("%c[APOLLOSX] Akses Ditolak • Gunakan Bookmarklet Resmi untuk Menjalankan Script", "color:#00d4ff;font-size:15px;font-weight:bold;");
    return;
}

  const BASE_URL = "https://raw.githubusercontent.com/appolosx6-gif/AppoloSX8-Bypass/main/";
  const CONFIG = {
    keyUrl: BASE_URL + "isikanjut.txt",
    redirectUrl: "https://raw.githubusercontent.com/appolosx6-gif/AppoloSX8-Bypass/main/kepala.txt?t=",
    redirectUrl2: "https://raw.githubusercontent.com/appolosx6-gif/AppoloSX8-Bypass/refs/heads/main/ainproxy.txt",
    telegramUrl: BASE_URL + "button.txt",
    logoUrl: BASE_URL + "logo.jpg"
  };

  // Fungsi utilitas
async function fetchText(url) {
const response = await fetch(url + "?t=" + Date.now());
return (await response.text()).trim();
}

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function createElement(tag, attributes = {}, parent = document.body) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
      el[key] = value;
    }
    parent.appendChild(el);
    return el;
  }

    function getHeaderHTML(title, showBack = false, backAction = "") {
  return `
  <div class="appolosx9-header">
    
    <div class="appolosx9-header-bg"></div>

    <div class="appolosx9-header-left">
      <div class="appolosx9-logo-wrap">
        <img src="${CONFIG.logoUrl}" class="appolosx9-logo">
      </div>

      <div class="appolosx9-title-wrap">
        <div class="appolosx9-title">
          AppoloSX9
        </div>
        <div class="appolosx9-subtitle">
          ${title}
        </div>
      </div>
    </div>

    <div class="appolosx9-nav-buttons">
      ${showBack ? getBackButtonHTML(backAction) : ""}
      ${getCloseButtonHTML()}
    </div>

  </div>

  <style>
  .appolosx9-header{
      position:relative;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:14px 16px;
      overflow:hidden;

      background:
      linear-gradient(
      135deg,
      rgba(17,24,39,.92),
      rgba(30,41,59,.92)
      );

      border-bottom:1px solid rgba(255,255,255,.08);

      backdrop-filter:blur(18px);
      -webkit-backdrop-filter:blur(18px);
  }

  .appolosx9-header-bg{
      position:absolute;
      inset:0;
      background:
      radial-gradient(
      circle at top right,
      rgba(88,166,255,.25),
      transparent 45%
      ),
      radial-gradient(
      circle at bottom left,
      rgba(147,51,234,.18),
      transparent 50%
      );
      pointer-events:none;
  }

  .appolosx9-header-left{
      display:flex;
      align-items:center;
      gap:12px;
      z-index:1;
  }

  .appolosx9-logo-wrap{
      width:42px;
      height:42px;
      border-radius:14px;

      background:
      linear-gradient(
      135deg,
      rgba(88,166,255,.25),
      rgba(168,85,247,.25)
      );

      border:1px solid rgba(255,255,255,.12);

      display:flex;
      align-items:center;
      justify-content:center;

      box-shadow:
      0 8px 24px rgba(0,0,0,.35),
      inset 0 1px 0 rgba(255,255,255,.08);
  }

  .appolosx9-logo{
      width:28px;
      height:28px;
      object-fit:contain;
  }

  .appolosx9-title-wrap{
      display:flex;
      flex-direction:column;
  }

  .appolosx9-title{
      color:#fff;
      font-size:15px;
      font-weight:800;
      letter-spacing:.4px;
  }

  .appolosx9-subtitle{
      color:#58a6ff;
      font-size:11px;
      font-weight:600;
      text-transform:uppercase;
      letter-spacing:1px;
  }

  .appolosx9-nav-buttons{
      display:flex;
      gap:8px;
      z-index:1;
  }

  .appolosx9-nav-btn{
      width:36px;
      height:36px;
      border:none;
      border-radius:12px;

      background:rgba(255,255,255,.06);

      backdrop-filter:blur(10px);

      display:flex;
      align-items:center;
      justify-content:center;

      cursor:pointer;

      transition:.25s;
  }

  .appolosx9-nav-btn:hover{
      transform:translateY(-2px);
      background:rgba(255,255,255,.12);
      box-shadow:0 8px 20px rgba(0,0,0,.25);
  }

  .appolosx9-nav-btn:active{
      transform:scale(.95);
  }
  </style>
  `;
}
  // Manajemen Overlay
  const OVERLAYS = ["appolosx9-auth-box", "appolosx9-dest-overlay", "appolosx9-select-mode-overlay", "appolosx9-loading-overlay", "appolosx9-countdown-overlay"];

  function showOverlay(targetId) {
    for (const id of OVERLAYS) {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = id === targetId ? "block" : "none";
      }
    }
  }

  function closeAllOverlays() {
    for (const id of OVERLAYS) {
      document.getElementById(id)?.remove();
    }
    document.getElementById("appolosx9-modz-styles")?.remove();
  }

  // Injeksi CSS
document.getElementById("appolosx9-modz-styles")?.remove();
createElement("style", {
  id: "appolosx9-modz-styles",
  textContent: `
    * { margin:0; padding:0; box-sizing:border-box; }
    .appolosx9-overlay { 
      position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); 
      z-index:2147483647; width:300px; background:rgba(13, 17, 23, 0.95); 
      backdrop-filter: blur(15px); border:1px solid rgba(255,255,255,0.1); 
      border-radius:16px; overflow:hidden; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    @media (max-width:600px) { .appolosx9-overlay { width:90%; max-width:300px; } }
    .appolosx9-header { display:flex; align-items:center; justify-content:space-between; padding:18px 20px 14px; border-bottom:1px solid rgba(255,255,255,0.05); }
    .appolosx9-header-left { display:flex; align-items:center; gap:12px; }
    .appolosx9-icon { width:36px; height:36px; border-radius:10px; background:#161b22; border:1px solid rgba(56,139,253,0.3); display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .appolosx9-icon img { width:100%; height:100%; object-fit:cover; }
    .appolosx9-title { font-size:14px; font-weight:700; color:#fff; }
    .appolosx9-sub { font-size:10px; color:#58a6ff; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; }
    .appolosx9-body { padding:18px 20px; }
    
    /* Destinasi Option */
    .dest-option { 
      width:100%; padding:12px; background:rgba(22, 27, 34, 0.6); 
      border:1px solid rgba(255,255,255,0.08); border-radius:10px; 
      display:flex; align-items:center; cursor:pointer; margin-bottom:8px; 
      transition:all 0.2s ease; text-align:left;
    }
    .dest-option:hover { background:rgba(30, 35, 45, 0.8); border-color:rgba(56,139,253,0.3); }
    .dest-option.selected { background:rgba(56,139,253,0.1); border-color:rgba(56,139,253,0.5); }
    
    .dest-option-icon { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-right:12px; }
    .dest-option-title { font-size:12px; font-weight:600; color:#e6edf3; }
    .dest-option-sub { font-size:10px; color:#8b949e; }
    
    /* Button & Input */
    .dest-confirm-btn { 
      width:100%; padding:12px; border-radius:8px; font-size:13px; font-weight:600; 
      cursor:pointer; border:none; background:#1f6feb; color:#fff; transition:0.2s;
      margin-top:10px;
    }
    .dest-confirm-btn:hover { background:#388bfd; }
    .dest-url-input { 
      width:100%; padding:10px; background:#0d1117; border:1px solid #30363d; 
      border-radius:8px; color:#fff; font-size:12px; margin-top:8px;
    }
    
    /* Animasi */
    @keyframes appolosx9-spin { to { transform:rotate(360deg); } }
  `
}, document.head);

  // Hapus overlay yang mungkin sudah ada
  OVERLAYS.forEach(id => document.getElementById(id)?.remove());

  // Buat HTML Overlay 1: Auth Box
createElement("div", {
  id: "appolosx9-auth-box",
  className: "appolosx9-overlay",
  innerHTML: getHeaderHTML("Verifikasi Lisensi") + `
    <div class="appolosx9-body">

      <div style="text-align:center;margin-bottom:15px;">
        <div style="font-size:40px;">🔐</div>

        <div style="
          color:#f0f6fc;
          font-size:16px;
          font-weight:700;
          margin-top:8px;
        ">
          Verifikasi Lisensi
        </div>

        <div style="
          color:#8b949e;
          font-size:11px;
          margin-top:4px;
        ">
          Masukkan kunci lisensi untuk melanjutkan
        </div>
      </div>

      <div class="appolosx9-input-wrap">
        <span class="appolosx9-input-icon">🔑</span>

        <input
          type="text"
          id="appolosx9-key-input"
          placeholder="Masukkan kunci lisensi..."
          autocomplete="off"
          spellcheck="false"
          style="padding-left:40px;"
        >
      </div>

      <button
        id="appolosx9-login-btn"
        class="appolosx9-btn"
        style="height:42px;margin-top:10px;"
      >
        Verifikasi Kunci
      </button>

      <button
        id="appolosx9-telegram-btn"
        class="appolosx9-btn"
        style="
          height:42px;
          background:rgba(255,255,255,.05);
          color:#8b949e;
          margin-top:8px;
        "
      >
        Dapatkan Kunci
      </button>

      <div
        id="appolosx9-status"
        style="
          margin-top:15px;
          text-align:center;
          font-size:11px;
          color:#8b949e;
        "
      >
        Menunggu verifikasi lisensi...
      </div>

    </div>
  `
});

createElement("div", {
    id: "appolosx9-dest-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("Pilih Bypass Yang Ingin Anda Gunakan") + `
      <div class="appolosx9-body">
        <div class="dest-desc" style="margin-bottom: 16px; font-size: 12px; color: #8b949e;">Pilih metode bypass Anda:</div>
        
        <button class="dest-option selected" id="dest-opt-root" style="border: 1px solid rgba(56, 139, 253, 0.4); background: rgba(56, 139, 253, 0.05);">
          <div class="dest-option-icon aincrad" style="background: rgba(56, 139, 253, 0.1);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Aincrad Root Bypass</div>
            <div class="dest-option-sub">Modifikasi sistem langsung</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot" style="opacity: 1;"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-proxy">
          <div class="dest-option-icon aincrad" style="background: rgba(56, 139, 253, 0.05);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Aincrad Proxy Bypass</div>
            <div class="dest-option-sub">Pengalihan jaringan yang aman</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-custom">
          <div class="dest-option-icon custom" style="background: rgba(163, 113, 247, 0.05);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a371f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Custom Link</div>
            <div class="dest-option-sub">Masukkan target URL manual</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <div id="dest-custom-wrap" style="display:none; margin-top:-4px; margin-bottom:8px;">
          <input type="text" id="dest-url-input" class="dest-url-input" placeholder="https://..." autocomplete="off" style="border: 1px solid rgba(163, 113, 247, 0.3);">
        </div>

        <button class="dest-confirm-btn" id="dest-confirm-btn" style="height: 42px; font-size: 13px;">
          Konfirmasi Pilihan
        </button>
        <div id="appolosx9-dest-status"></div>
      </div>`
});



  // Buat HTML Overlay 3: Pilih Mode
createElement("div", {
    id: "appolosx9-select-mode-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("Pilih Kecepatan Bypass", true, "window.__appolosx9GoBack()") + `
      <div class="appolosx9-body">
        <div class="mode-desc" style="margin-bottom: 16px; font-size: 12px; color: #8b949e; text-align: center;">Pilih kecepatan eksekusi Anda:</div>
        
        <button class="mode-btn" id="mode-fast" data-duration="30" style="border: 1px solid rgba(63, 185, 80, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon fast" style="background: rgba(63, 185, 80, 0.1);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div><div class="mode-name">Mode Cepar</div><div class="mode-timer">30 detik</div></div>
          </div>
          <span class="mode-badge fast" style="background: rgba(63, 185, 80, 0.15);">30s</span>
        </button>

        <button class="mode-btn" id="mode-secure" data-duration="45" style="border: 1px solid rgba(56, 139, 253, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon secure" style="background: rgba(56, 139, 253, 0.1);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div><div class="mode-name">Mode Aman</div><div class="mode-timer">45 detik</div></div>
          </div>
          <span class="mode-badge secure" style="background: rgba(56, 139, 253, 0.15);">45s</span>
        </button>

        <button class="mode-btn" id="mode-safe" data-duration="60" style="border: 1px solid rgba(210, 153, 34, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon safe" style="background: rgba(210, 153, 34, 0.1);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d29522" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div><div class="mode-name">Mode Aman</div><div class="mode-timer">60 detik</div></div>
          </div>
          <span class="mode-badge safe" style="background: rgba(210, 153, 34, 0.15);">60s</span>
        </button>
      </div>`
});


createElement("div", {
    id: "appolosx9-loading-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML(`<span id="appolosx9-check-text">Memvalidasi...</span>`) + `
      <div class="appolosx9-body">
        <div class="appolosx9-progress-bar" style="background: rgba(255,255,255,0.05); height: 4px; margin-bottom: 20px;">
          <div class="appolosx9-progress-fill" style="background: linear-gradient(90deg, #388bfd, #58a6ff);"></div>
        </div>

        <div id="appolosx9-step-1" class="appolosx9-step-item" style="color:#3fb950; font-weight: 500;">
          ${ICONS.check} Kunci divalidasi
        </div>
        <div id="appolosx9-step-2" class="appolosx9-step-item" style="color:#c9d1d9; font-weight: 500;">
          ${ICONS.spinner} Memeriksa pembaruan...
        </div>
        <div id="appolosx9-step-3" class="appolosx9-step-item" style="color:#7d8590; font-weight: 500;">
          ${ICONS.circle} Pengalihan...
        </div>
      </div>`
});


  // Buat HTML Overlay 5: Countdown
  createElement("div", {
    id: "appolosx9-countdown-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("Redirecting") + `
      <div class="appolosx9-countdown-container">
        <div class="appolosx9-circle-wrapper" style="position: relative; width: 80px; height: 80px; margin: 0 auto 15px;">
          <svg class="appolosx9-svg-circle" width="80" height="80" viewBox="0 0 80 80" style="transform: rotate(-90deg);">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/>
            <circle id="appolosx9-progress-circle" cx="40" cy="40" r="32" fill="none" stroke="#388bfd"
              stroke-width="6" stroke-dasharray="201.06" stroke-dashoffset="0" stroke-linecap="round" 
              style="filter: drop-shadow(0 0 5px rgba(56, 139, 253, 0.5));"/>
          </svg>
          <div id="appolosx9-countdown-number" class="appolosx9-countdown-number" 
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; font-weight: 700; color: #fff;">5</div>
        </div>
        
        <div class="appolosx9-redirect-title" style="font-weight: 600; color: #fff; margin-bottom: 4px;">Redirecting...</div>
        <div class="appolosx9-redirect-desc" style="font-size: 11px; color: #8b949e; margin-bottom: 15px;">Jangan tutup aplikasi atau berpindah tab.</div>
        
        <div style="padding: 10px; background: rgba(238, 167, 44, 0.05); border: 1px solid rgba(238, 167, 44, 0.2); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <svg style="flex-shrink:0; margin-top:2px;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#eea72c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style="font-size: 10px; color: #eea72c; line-height: 1.4; text-align: left;">Jangan tutup aplikasi atau beralih antar tab untuk mencegah deteksi.</span>
        </div>
      </div>`
});


  // Pemetaan Elemen DOM
    const domElements = {
    keyInput: document.getElementById("appolosx9-key-input"),
    loginBtn: document.getElementById("appolosx9-login-btn"),
    telegramBtn: document.getElementById("appolosx9-telegram-btn"),
    status: document.getElementById("appolosx9-status"),
    optRoot: document.getElementById("dest-opt-root"),
    optProxy: document.getElementById("dest-opt-proxy"),
    optCustom: document.getElementById("dest-opt-custom"),
    customWrap: document.getElementById("dest-custom-wrap"),
    urlInput: document.getElementById("dest-url-input"),
    confirmDestBtn: document.getElementById("dest-confirm-btn"),
    destStatus: document.getElementById("appolosx9-dest-status"),
    modeFast: document.getElementById("mode-fast"),
    modeSecure: document.getElementById("mode-secure"),
    modeSafe: document.getElementById("mode-safe")
  };


  // Tutup Overlay ketika tombol close diklik
  document.addEventListener("click", function (e) {
    if (e.target.closest(".appolosx9-close-btn")) {
      closeAllOverlays();
    }
  });

  let targetUrl = null;
  let fetchCounter = 0;

  // Global function untuk tombol kembali (Back Button)
  window.__appolosx9GoBack = function () {
    fetchCounter++;
    domElements.confirmDestBtn.disabled = false;
    domElements.destStatus.innerHTML = "";
    showOverlay("appolosx9-dest-overlay");
  };

    function resetDestinationSelection() {
    // Reset visual
    document.querySelectorAll('.dest-option').forEach(el => el.classList.remove('selected'));
    domElements.optRoot.classList.add('selected');
    domElements.customWrap.style.display = "none";
    domElements.urlInput.value = "";
    domElements.destStatus.innerHTML = "";
    domElements.confirmDestBtn.disabled = false;
  }

  // Event Listeners untuk 3 opsi
  [domElements.optRoot, domElements.optProxy, domElements.optCustom].forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll('.dest-option').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
      domElements.customWrap.style.display = (btn === domElements.optCustom) ? "block" : "none";
      if(btn === domElements.optCustom) domElements.urlInput.focus();
    });
  });


    domElements.confirmDestBtn.addEventListener("click", async () => {
    const isCustom = domElements.optCustom.classList.contains("selected");
    const isProxy = domElements.optProxy.classList.contains("selected");

    if (isCustom) {
      const customUrl = domElements.urlInput.value.trim();
      if (!customUrl.startsWith("http")) {
        domElements.destStatus.innerHTML = `
  <div style="display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.2); border-radius: 6px; margin-top: 10px;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f85149" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span style="color: #f85149; font-size: 11px; font-weight: 500;">Masukkan URL valid</span>
  </div>`;
        return;
      }
      targetUrl = customUrl;
      proceedToModeSelection();
    } else {
      // Pilih URL berdasarkan pilihan Root atau Proxy
      const targetSource = isProxy ? CONFIG.redirectUrl2 : CONFIG.redirectUrl;
      domElements.confirmDestBtn.disabled = true;
      domElements.destStatus.innerHTML = `
  <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px; background: rgba(56, 139, 253, 0.05); border: 1px solid rgba(56, 139, 253, 0.2); border-radius: 6px; margin-top: 10px;">
    <div style="width: 10px; height: 10px; border: 2px solid rgba(56, 139, 253, 0.3); border-top-color: #388bfd; border-radius: 50%; animation: appolosx9-spin 0.8s linear infinite;"></div>
    <span style="color: #388bfd; font-size: 11px; font-weight: 500;">Fetching target...</span>
  </div>`;

      
      try {
        const fetchedUrl = await fetchText(targetSource);
        if (!fetchedUrl.startsWith("http")) throw new Error("Invalid URL");
        targetUrl = fetchedUrl;
        proceedToModeSelection();
      } catch (err) {
        domElements.destStatus.innerHTML = `
  <div style="display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.2); border-radius: 6px; margin-top: 10px;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f85149" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span style="color: #f85149; font-size: 11px; font-weight: 500;">Gagal mengambil target</span>
  </div>`;
        domElements.confirmDestBtn.disabled = false;
      }
    }
  });


  function proceedToModeSelection() {
    showOverlay("appolosx9-select-mode-overlay");
  }

  // Pemilihan Mode
  [domElements.modeFast, domElements.modeSecure, domElements.modeSafe].forEach(btn => {
    btn.addEventListener("click", function () {
      if (!targetUrl) return;
      const duration = parseInt(this.dataset.duration, 10);
      startRedirect(targetUrl, duration);
    });
  });

  // Validasi Key
  async function validateKey(inputKey) {
    const keyData = await fetchText(CONFIG.keyUrl);
    for (const line of keyData.split("\n")) {
      const parsedLine = line.trim();
      if (!parsedLine) continue;

      if (parsedLine.includes(",")) {
        const [key, duration] = parsedLine.split(",");
        if (key.trim() === inputKey) {
          return { valid: true, duration: parseInt(duration.trim(), 10), hasCustomDuration: true };
        }
      } else if (parsedLine === inputKey) {
        return { valid: true, duration: null, hasCustomDuration: false };
      }
    }
    return { valid: false, duration: 0, hasCustomDuration: false };
  }

  // Proses Eksekusi Redirect
  async function startRedirect(url, duration) {
    showOverlay("appolosx9-loading-overlay");
    const checkText = document.getElementById("appolosx9-check-text");
    const step2 = document.getElementById("appolosx9-step-2");
    const step3 = document.getElementById("appolosx9-step-3");
    
    let isUpdated = false;
    try {
      const workerResp = await fetchText("https://bian-modz.workers.dev/");
      isUpdated = workerResp.includes("GitHub Updated");
    } catch (err) {}
    
    await delay(2000);
    
    const updateStatus = isUpdated ? {
      sub: `<span style="color:#3fb950; display:flex; align-items:center; gap:6px;">${ICONS.check} Tautan telah diperbarui.</span>`,
      step: "Tautan telah diperbarui."
    } : {
      sub: `<span style="color:#8b949e; display:flex; align-items:center; gap:6px;">${ICONS.check} Tidak ada pembaruan baru.</span>`,
      step: "Tidak ada pembaruan baru."
    };

    // Update elemen dengan transisi CSS
    if (checkText) {
      checkText.style.opacity = "0";
      setTimeout(() => {
        checkText.innerHTML = updateStatus.sub;
        checkText.style.opacity = "1";
        checkText.style.transition = "opacity 0.3s ease";
      }, 100);
    }

    if (step2) {
      step2.style.color = "#3fb950";
      step2.innerHTML = `${ICONS.check} <span style="color:#e6edf3;">${updateStatus.step}</span>`;
    }

    if (step3) {
      step3.style.color = "#388bfd";
      step3.style.fontWeight = "600";
    }

    
    await delay(1000);
    showOverlay("appolosx9-countdown-overlay");
    
    const progressCircle = document.getElementById("appolosx9-progress-circle");
    const countdownNumber = document.getElementById("appolosx9-countdown-number");
    const circumference = Math.PI * 2 * 32;
    
    progressCircle.style.strokeDasharray = circumference.toFixed(2);
    
    let timeLeft = duration;
    countdownNumber.textContent = timeLeft;
    
    const timer = setInterval(() => {
      timeLeft--;
      countdownNumber.textContent = timeLeft;
      progressCircle.style.strokeDashoffset = (circumference * (1 - timeLeft / duration)).toFixed(2);
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.replace(url);
      }
    }, 1000);
  }

  // Event Listener Telegram
  domElements.telegramBtn.addEventListener("click", async () => {
    try {
      const tgUrl = await fetchText(CONFIG.telegramUrl);
      if (tgUrl.startsWith("http")) window.open(tgUrl, "_blank");
    } catch (err) {}
  });

  // Helper untuk menampilkan status yang estetik
  function setStatus(msg, type = 'default') {
    const colors = {
      default: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#7d8590' },
      error: { bg: 'rgba(248, 81, 73, 0.1)', border: 'rgba(248, 81, 73, 0.2)', text: '#f85149' },
      success: { bg: 'rgba(63, 185, 80, 0.1)', border: 'rgba(63, 185, 80, 0.2)', text: '#3fb950' },
      info: { bg: 'rgba(56, 139, 253, 0.1)', border: 'rgba(56, 139, 253, 0.2)', text: '#388bfd' }
    };
    const c = colors[type] || colors.default;
    domElements.status.innerHTML = `
      <div style="padding: 8px; background: ${c.bg}; border: 1px solid ${c.border}; border-radius: 6px; color: ${c.text}; font-size: 11px; font-weight: 500; margin-top: 10px;">
        ${msg}
      </div>`;
  }

  // Event Listener Login yang sudah diperbarui
  domElements.loginBtn.addEventListener("click", async () => {
    const inputKey = domElements.keyInput.value.trim();
    
    if (!inputKey) {
      setStatus("Silakan masukkan kunci", "error");
      return;
    }
    
    setStatus("Menghubungkan ke server...", "info");
    domElements.loginBtn.disabled = true;
    domElements.telegramBtn.disabled = true;
    
    try {
      const validationResult = await validateKey(inputKey);
      
      if (!validationResult.valid) {
        setStatus("Kunci lisensi tidak valid", "error");
        domElements.loginBtn.disabled = false;
        domElements.telegramBtn.disabled = false;
        return;
      }
      
      setStatus("Kunci divalidasi", "success");
      
      if (validationResult.hasCustomDuration) {
        const fetchedUrl = await fetchText(CONFIG.redirectUrl);
        if (!fetchedUrl.startsWith("http")) throw new Error("URL tidak valid");
        
        targetUrl = fetchedUrl;
        setTimeout(() => startRedirect(fetchedUrl, validationResult.duration), 800);
      } else {
        resetDestinationSelection();
        showOverlay("appolosx9-dest-overlay");
        domElements.loginBtn.disabled = false;
        domElements.telegramBtn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error — coba lagi", "error");
      domElements.loginBtn.disabled = false;
      domElements.telegramBtn.disabled = false;
    }
  });
})();