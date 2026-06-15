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
    redirectUrl2: "https://raw.githubusercontent.com/appolosx6-gif/AppoloSX8-Bypass/main/kepala.txt?t=",
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

  const ICONS = {
    check: `<svg class="appolosx9-step-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    spinner: `<svg class="appolosx9-step-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:appolosx9-spin 0.9s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
    circle: `<svg class="appolosx9-step-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`
  };

  function getCloseButtonHTML() {
    return `<button class="appolosx9-nav-btn appolosx9-close-btn" title="Close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  }

  function getBackButtonHTML(onClickAction) {
    return `<button class="appolosx9-nav-btn" onclick="${onClickAction}" title="Back">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>`;
  }

  function getHeaderHTML(title, showBack = false, backAction = "") {
    return `
      <div class="appolosx9-header">
        <div class="appolosx9-header-left">
          <div class="appolosx9-icon">
            <img src="${CONFIG.logoUrl}" alt="logo">
          </div>
          <div>
            <div class="appolosx9-title">appolosx9Mods</div>
            <div class="appolosx9-sub">${title}</div>
          </div>
        </div>
        <div class="appolosx9-nav-buttons">
          ${showBack ? getBackButtonHTML(backAction) : ""}
          ${getCloseButtonHTML()}
        </div>
      </div>`;
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
      .appolosx9-overlay { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:2147483647; width:280px; background:#0d1117; border:1.5px solid rgba(255,255,255,0.9); border-radius:14px; overflow:hidden; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      @media (max-width:600px) { .appolosx9-overlay { width:90%; max-width:280px; } }
      .appolosx9-header { display:flex; align-items:center; justify-content:space-between; padding:16px 16px 12px; border-bottom:0.5px solid rgba(255,255,255,0.08); }
      .appolosx9-header-left { display:flex; align-items:center; gap:10px; }
      .appolosx9-nav-buttons { display:flex; align-items:center; gap:4px; }
      .appolosx9-nav-btn { background:transparent; border:none; cursor:pointer; padding:4px; border-radius:6px; display:flex; align-items:center; justify-content:center; transition:background 0.15s; color:#7d8590; }
      .appolosx9-nav-btn:hover { background:rgba(255,255,255,0.08); color:#e6edf3; }
      .appolosx9-icon { width:34px; height:34px; border-radius:8px; background:#0d2137; border:0.5px solid rgba(56,139,253,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden; }
      .appolosx9-icon img { width:100%; height:100%; object-fit:cover; }
      .appolosx9-title { font-size:13px; font-weight:600; color:#e6edf3; }
      .appolosx9-sub { font-size:11px; color:#7d8590; margin-top:1px; }
      .appolosx9-body { padding:14px 16px 16px; }
      .appolosx9-input-wrap { position:relative; margin-bottom:10px; }
      .appolosx9-input-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#7d8590; pointer-events:none; font-size:13px; }
      #appolosx9-key-input, .dest-url-input { width:100%; padding:9px 10px 9px 30px; background:#161b22; border:0.5px solid rgba(255,255,255,0.12); border-radius:8px; color:#e6edf3; font-size:12px; font-family:"SF Mono","Consolas",monospace; letter-spacing:0.5px; outline:none; transition:border-color 0.15s; }
      #appolosx9-key-input:focus { border-color:rgba(56,139,253,0.6); }
      .dest-url-input { border-color:rgba(163,113,247,0.35); letter-spacing:0.3px; }
      .dest-url-input:focus { border-color:rgba(163,113,247,0.65); }
      .appolosx9-btn, .dest-confirm-btn { width:100%; padding:9px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; border:none; display:flex; align-items:center; justify-content:center; gap:6px; transition:background 0.15s,color 0.15s; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      #appolosx9-login-btn, .dest-confirm-btn { background:#1f6feb; color:#fff; margin-bottom:8px; }
      #appolosx9-login-btn:hover:not(:disabled), .dest-confirm-btn:hover:not(:disabled) { background:#388bfd; }
      #appolosx9-telegram-btn { background:#161b22; color:#7d8590; border:0.5px solid rgba(255,255,255,0.1); }
      #appolosx9-telegram-btn:hover:not(:disabled) { background:#1c2128; color:#e6edf3; }
      .appolosx9-btn:disabled, .dest-confirm-btn:disabled { opacity:0.5; cursor:not-allowed; }
      #appolosx9-status, #appolosx9-dest-status { margin-top:10px; font-size:11px; color:#7d8590; text-align:center; min-height:16px; line-height:1.4; }
      .dest-desc, .mode-desc { font-size:11px; color:#7d8590; text-align:center; margin-bottom:12px; line-height:1.5; }
      .dest-option, .mode-btn { width:100%; padding:10px 12px; background:#161b22; border:0.5px solid rgba(255,255,255,0.1); border-radius:8px; display:flex; align-items:center; cursor:pointer; margin-bottom:8px; transition:background 0.15s,border-color 0.15s; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; text-align:left; }
      .mode-btn { justify-content:space-between; }
      .dest-option:hover, .mode-btn:hover { background:#1c2128; border-color:rgba(255,255,255,0.18); }
      .dest-option.selected { background:rgba(31,111,235,0.08); border-color:rgba(56,139,253,0.45); }
      .dest-option-icon, .mode-icon { width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .dest-option-icon.aincrad { background:rgba(56,139,253,0.12); border:0.5px solid rgba(56,139,253,0.25); }
      .dest-option-icon.custom { background:rgba(163,113,247,0.12); border:0.5px solid rgba(163,113,247,0.25); }
      .dest-option-title, .mode-name { font-size:12px; font-weight:600; color:#e6edf3; }
      .dest-option-sub, .mode-timer { font-size:10px; color:#7d8590; margin-top:1px; }
      .dest-radio { width:14px; height:14px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.18); margin-left:auto; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:border-color 0.15s; }
      .dest-option.selected .dest-radio { border-color:#388bfd; }
      .dest-radio-dot { width:6px; height:6px; border-radius:50%; background:#388bfd; opacity:0; transition:opacity 0.15s; }
      .dest-option.selected .dest-radio-dot { opacity:1; }
      .dest-custom-input-wrap { margin-top:-2px; margin-bottom:8px; }
      .mode-btn-left { display:flex; align-items:center; gap:8px; }
      .mode-icon.fast { background:rgba(63,185,80,0.12); border:0.5px solid rgba(63,185,80,0.25); }
      .mode-icon.secure { background:rgba(56,139,253,0.12); border:0.5px solid rgba(56,139,253,0.25); }
      .mode-icon.safe { background:rgba(210,153,34,0.12); border:0.5px solid rgba(210,153,34,0.3); }
      .mode-badge { font-size:10px; font-weight:600; padding:2px 7px; border-radius:20px; }
      .mode-badge.fast { background:rgba(63,185,80,0.12); color:#3fb950; }
      .mode-badge.secure { background:rgba(56,139,253,0.12); color:#388bfd; }
      .mode-badge.safe { background:rgba(210,153,34,0.12); color:#d29522; }
      .appolosx9-progress-bar { height:3px; background:#161b22; border-radius:99px; overflow:hidden; margin-bottom:14px; }
      .appolosx9-progress-fill { height:100%; width:0%; background:#1f6feb; border-radius:99px; animation:appolosx9-prog 1.4s ease-in-out infinite; }
      .appolosx9-step-item { display:flex; align-items:center; gap:8px; font-size:12px; margin-bottom:8px; }
      .appolosx9-step-icon { width:13px; height:13px; flex-shrink:0; }
      .appolosx9-countdown-container { padding:20px 16px 16px; text-align:center; }
      .appolosx9-circle-wrapper { position:relative; width:80px; height:80px; margin:0 auto 12px; }
      .appolosx9-svg-circle { transform:rotate(-90deg); }
      .appolosx9-countdown-number { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:22px; font-weight:600; color:#e6edf3; }
      .appolosx9-redirect-title { font-size:13px; font-weight:600; color:#e6edf3; margin-bottom:4px; }
      .appolosx9-redirect-desc { font-size:11px; color:#7d8590; margin-bottom:12px; }
      @keyframes appolosx9-spin { to { transform:rotate(360deg); } }
      @keyframes appolosx9-prog { 0% { width:0%; margin-left:0; } 50% { width:65%; margin-left:15%; } 100% { width:0%; margin-left:100%; } }
    `
  }, document.head);

  // Hapus overlay yang mungkin sudah ada
  OVERLAYS.forEach(id => document.getElementById(id)?.remove());

  // Buat HTML Overlay 1: Auth Box
  createElement("div", {
    id: "appolosx9-auth-box",
    className: "appolosx9-overlay",
    innerHTML: getHeaderHTML("License verification") + `
      <div class="appolosx9-body">
        <div class="appolosx9-input-wrap">
          <span class="appolosx9-input-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/>
            </svg>
          </span>
          <input type="text" id="appolosx9-key-input" placeholder="Masukkan kunci lisensi" autocomplete="off" spellcheck="false">
        </div>
        <button id="appolosx9-login-btn" class="appolosx9-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Verify key
        </button>
        <button id="appolosx9-telegram-btn" class="appolosx9-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          Get Key
        </button>
        <div id="appolosx9-status">Masukkan kunci Anda untuk melanjutkan</div>
      </div>`
  });

  // Buat HTML Overlay 2: Pilihan Destinasi
createElement("div", {
    id: "appolosx9-dest-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("Choose destination") + `
      <div class="appolosx9-body">
        <div class="dest-desc">Pilih target bypass yang Anda inginkan:</div>
        
        <button class="dest-option selected" id="dest-opt-root">
          <div class="dest-option-icon aincrad"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg></div>
          <div>
            <div class="dest-option-title">Aincrad Root Bypass</div>
            <div class="dest-option-sub">Modifikasi sistem langsung</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-proxy">
          <div class="dest-option-icon aincrad"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/></svg></div>
          <div>
            <div class="dest-option-title">Aincrad Proxy Bypass</div>
            <div class="dest-option-sub">Pengalihan jaringan yang aman</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-custom">
          <div class="dest-option-icon custom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a371f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg></div>
          <div>
            <div class="dest-option-title">Custom Link</div>
            <div class="dest-option-sub">Masukkan target URL manual</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <div id="dest-custom-wrap" style="display:none; margin-bottom:8px;">
          <input type="text" id="dest-url-input" class="dest-url-input" placeholder="https://..." autocomplete="off">
        </div>

        <button class="dest-confirm-btn" id="dest-confirm-btn">Konfirmasi Pilihan</button>
        <div id="appolosx9-dest-status"></div>
      </div>`
});


  // Buat HTML Overlay 3: Pilih Mode
  createElement("div", {
    id: "appolosx9-select-mode-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("Select bypass mode", true, "window.__appolosx9GoBack()") + `
      <div class="appolosx9-body">
        <div class="mode-desc">Choose how you want to proceed</div>
        <button class="mode-btn" id="mode-fast" data-duration="30">
          <div class="mode-btn-left">
            <div class="mode-icon fast">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div><div class="mode-name">Fast mode</div><div class="mode-timer">30 seconds</div></div>
          </div>
          <span class="mode-badge fast">30s</span>
        </button>
        <button class="mode-btn" id="mode-secure" data-duration="45">
          <div class="mode-btn-left">
            <div class="mode-icon secure">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div><div class="mode-name">Secure mode</div><div class="mode-timer">45 seconds</div></div>
          </div>
          <span class="mode-badge secure">45s</span>
        </button>
        <button class="mode-btn" id="mode-safe" data-duration="60">
          <div class="mode-btn-left">
            <div class="mode-icon safe">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d29522" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div><div class="mode-name">Safe mode</div><div class="mode-timer">60 seconds</div></div>
          </div>
          <span class="mode-badge safe">60s</span>
        </button>
      </div>`
  });

  // Buat HTML Overlay 4: Loading
  createElement("div", {
    id: "appolosx9-loading-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML(`<span id="appolosx9-check-text">Checking for updates...</span>`) + `
      <div class="appolosx9-body">
        <div class="appolosx9-progress-bar"><div class="appolosx9-progress-fill"></div></div>
        <div id="appolosx9-step-1" class="appolosx9-step-item" style="color:#3fb950">
          ${ICONS.check} Key validated
        </div>
        <div id="appolosx9-step-2" class="appolosx9-step-item" style="color:#e6edf3">
          ${ICONS.spinner} Checking for updates...
        </div>
        <div id="appolosx9-step-3" class="appolosx9-step-item" style="color:#7d8590">
          ${ICONS.circle} Redirect
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
        <div class="appolosx9-circle-wrapper">
          <svg class="appolosx9-svg-circle" width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#161b22" stroke-width="5"/>
            <circle id="appolosx9-progress-circle" cx="40" cy="40" r="32" fill="none" stroke="#1f6feb"
              stroke-width="5" stroke-dasharray="201.06" stroke-dashoffset="0" stroke-linecap="round"/>
          </svg>
          <div id="appolosx9-countdown-number" class="appolosx9-countdown-number">5</div>
        </div>
        <div class="appolosx9-redirect-title">Redirecting</div>
        <div class="appolosx9-redirect-desc">You'll be redirected shortly</div>
        <div style="margin-top:12px;padding:8px 12px;background:rgba(187,128,9,0.08);border:0.5px solid rgba(187,128,9,0.3);border-radius:8px;display:flex;align-items:flex-start;gap:8px;">
          <svg style="flex-shrink:0;margin-top:1px" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d29922" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style="font-size:11px;color:#d29922;line-height:1.5;">Do not close app or switch tabs to avoid anomaly detection</span>
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
        domElements.destStatus.innerHTML = "<span style='color:#f85149;'>Masukkan URL valid</span>";
        return;
      }
      targetUrl = customUrl;
      proceedToModeSelection();
    } else {
      // Pilih URL berdasarkan pilihan Root atau Proxy
      const targetSource = isProxy ? CONFIG.redirectUrl2 : CONFIG.redirectUrl;
      domElements.confirmDestBtn.disabled = true;
      domElements.destStatus.innerHTML = "<span style='color:#388bfd;'>Fetching target...</span>";
      
      try {
        const fetchedUrl = await fetchText(targetSource);
        if (!fetchedUrl.startsWith("http")) throw new Error("Invalid URL");
        targetUrl = fetchedUrl;
        proceedToModeSelection();
      } catch (err) {
        domElements.destStatus.innerHTML = "<span style='color:#f85149;'>Gagal mengambil target</span>";
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
      sub: "<span style='color:#3fb950;'>Tautan telah diperbarui. ✓</span>",
      step: "Tautan berhasil diperbarui."
    } : {
      sub: "<span style='color:#3fb950;'>Tidak ada pembaruan baru. ✓</span>",
      step: "Tidak ada pembaruan baru."
    };

    if (checkText) checkText.innerHTML = updateStatus.sub;
    if (step2) {
      step2.style.color = "#3fb950";
      step2.innerHTML = ICONS.check + updateStatus.step;
    }
    if (step3) step3.style.color = "#e6edf3";
    
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

  // Event Listener Login
  domElements.loginBtn.addEventListener("click", async () => {
    const inputKey = domElements.keyInput.value.trim();
    
    if (!inputKey) {
      domElements.status.innerHTML = "<span style='color:#f85149;'>Silakan masukkan kunci</span>";
      return;
    }
    
    domElements.status.innerHTML = "<span style='color:#388bfd;'>Menghubungkan ke server...</span>";
    domElements.loginBtn.disabled = true;
    domElements.telegramBtn.disabled = true;
    
    try {
      const validationResult = await validateKey(inputKey);
      
      if (!validationResult.valid) {
        domElements.status.innerHTML = "<span style='color:#f85149;'>Kunci lisensi tidak valid</span>";
        domElements.loginBtn.disabled = false;
        domElements.telegramBtn.disabled = false;
        return;
      }
      
      domElements.status.innerHTML = "<span style='color:#3fb950;'>Kunci divalidasi</span>";
      
      if (validationResult.hasCustomDuration) {
        const fetchedUrl = await fetchText(CONFIG.redirectUrl);
        if (!fetchedUrl.startsWith("http")) throw new Error("URL pengalihan tidak valid");
        
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
      domElements.status.innerHTML = "<span style='color:#f85149;'>Server error — try again</span>";
      domElements.loginBtn.disabled = false;
      domElements.telegramBtn.disabled = false;
    }
  });
})();
