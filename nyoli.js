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

  const ICONS = {
    check: `<svg class="appolosx9-step-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    spinner: `<svg class="appolosx9-step-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:appolosx9-spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
    circle: `<svg class="appolosx9-step-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`
  };

  function getCloseButtonHTML() {
    return `<button class="appolosx9-nav-btn appolosx9-close-btn" title="Tutup" style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: all 0.3s ease;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  }

  function getBackButtonHTML(onClickAction) {
    return `<button class="appolosx9-nav-btn" onclick="${onClickAction}" title="Kembali" style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: all 0.3s ease; margin-right: 8px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
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
            <div class="appolosx9-title">AppoloSX9</div>
            <div class="appolosx9-sub">${title}</div>
          </div>
        </div>
        <div class="appolosx9-nav-buttons" style="display:flex;">
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
        if (id === targetId) {
          el.style.display = "block";
          el.style.animation = "appolosx9-popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
        } else {
          el.style.display = "none";
        }
      }
    }
  }

  function closeAllOverlays() {
    for (const id of OVERLAYS) {
      const el = document.getElementById(id);
      if (el) {
        el.style.animation = "appolosx9-popOut 0.3s ease forwards";
        setTimeout(() => el.remove(), 300);
      }
    }
    setTimeout(() => document.getElementById("appolosx9-modz-styles")?.remove(), 300);
  }

  // Injeksi CSS
  document.getElementById("appolosx9-modz-styles")?.remove();
  createElement("style", {
    id: "appolosx9-modz-styles",
    textContent: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      * { margin:0; padding:0; box-sizing:border-box; font-family: 'Inter', sans-serif; }
      
      .appolosx9-overlay { 
        position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); 
        z-index:2147483647; width:340px; 
        background: rgba(15, 23, 42, 0.75); 
        backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.1); 
        border-radius: 20px; overflow:hidden;
        box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
      }
      
      @media (max-width:400px) { .appolosx9-overlay { width:92%; } }
      
          /* FIX: Mencegah kotak lompat ke atas saat keyboard HP muncul */
    @media (max-height: 500px) { 
      .appolosx9-overlay { 
        top: 20px !important; 
        transform: translateX(-50%) !important; 
      } 
    }
      
      .appolosx9-header { display:flex; align-items:center; justify-content:space-between; padding:20px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
      .appolosx9-header-left { display:flex; align-items:center; gap:14px; }
      .appolosx9-icon { width:42px; height:42px; border-radius:12px; background:#1e293b; border:1px solid rgba(59,130,246,0.4); display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow: 0 0 15px rgba(59,130,246,0.2); }
      .appolosx9-icon img { width:100%; height:100%; object-fit:cover; }
      
      .appolosx9-title { font-size:15px; font-weight:700; color:#f8fafc; letter-spacing: 0.2px; }
      .appolosx9-sub { font-size:11px; color:#3b82f6; text-transform:uppercase; letter-spacing:0.8px; font-weight:600; margin-top:2px; }
      .appolosx9-body { padding:20px; }
      
      .appolosx9-nav-btn:hover { background: rgba(255,255,255,0.1) !important; transform: scale(1.05); }
      
      .appolosx9-input-wrap { position: relative; margin-bottom: 16px; }
      .appolosx9-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #64748b; display:flex; }
      #appolosx9-key-input { 
        width: 100%; height: 48px; padding-left: 44px; padding-right: 16px; 
        background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.08); 
        border-radius: 12px; color: #f8fafc; font-size: 13px; font-weight: 500;
        transition: all 0.3s ease; outline: none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
      }
      #appolosx9-key-input:focus { border-color: #3b82f6; background: rgba(30, 41, 59, 0.8); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), inset 0 2px 4px rgba(0,0,0,0.1); }
      #appolosx9-key-input::placeholder { color: #64748b; }
      
      .appolosx9-btn { 
        width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; 
        border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; 
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #appolosx9-login-btn { background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25); }
      #appolosx9-login-btn:hover { background: linear-gradient(135deg, #60a5fa, #3b82f6); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); }
      #appolosx9-telegram-btn:hover { background: rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
      
      .dest-option { 
        width:100%; padding:14px; background:rgba(30, 41, 59, 0.4); 
        border:1px solid rgba(255,255,255,0.05); border-radius:14px; 
        display:flex; align-items:center; cursor:pointer; margin-bottom:10px; 
        transition:all 0.3s ease; text-align:left; position: relative; overflow: hidden;
      }
      .dest-option:hover { background:rgba(30, 41, 59, 0.8); border-color:rgba(255,255,255,0.15); transform: translateY(-1px); }
      .dest-option.selected { background:rgba(59, 130, 246, 0.08); border-color:rgba(59, 130, 246, 0.5); box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1); }
      
      .dest-option-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-right:14px; }
      .dest-option-title { font-size:14px; font-weight:600; color:#f8fafc; margin-bottom:2px; }
      .dest-option-sub { font-size:11px; color:#94a3b8; }
      
      .dest-radio { width:20px; height:20px; border-radius:50%; border:2px solid #475569; margin-left:auto; display:flex; align-items:center; justify-content:center; transition:0.3s; }
      .dest-option.selected .dest-radio { border-color:#3b82f6; }
      .dest-radio-dot { width:10px; height:10px; border-radius:50%; background:#3b82f6; opacity:0; transition:0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform:scale(0); }
      .dest-option.selected .dest-radio-dot { opacity:1; transform:scale(1); }
      
      .dest-confirm-btn { 
        width:100%; padding:14px; border-radius:12px; font-size:14px; font-weight:600; 
        cursor:pointer; border:none; background:linear-gradient(135deg, #3b82f6, #2563eb); color:#fff; 
        transition:all 0.3s ease; margin-top:16px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
      }
      .dest-confirm-btn:hover { background:linear-gradient(135deg, #60a5fa, #3b82f6); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); }
      
      .dest-url-input { 
        width:100%; padding:12px 14px; background:rgba(15, 23, 42, 0.6); border:1px solid rgba(168, 85, 247, 0.3); 
        border-radius:10px; color:#f8fafc; font-size:13px; margin-top:10px; outline:none; transition:0.3s;
      }
      .dest-url-input:focus { border-color:#a855f7; box-shadow:0 0 0 3px rgba(168, 85, 247, 0.15); }

      .mode-btn {
        width:100%; padding:14px; background:rgba(30, 41, 59, 0.4); border-radius:14px; border:1px solid transparent;
        display:flex; align-items:center; justify-content:space-between; cursor:pointer; margin-bottom:10px; transition:all 0.3s; text-align:left;
      }
      .mode-btn:hover { transform:translateY(-2px); background:rgba(30, 41, 59, 0.8); }
      .mode-btn-left { display:flex; align-items:center; gap:14px; }
      .mode-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; }
      .mode-name { font-size:14px; font-weight:600; color:#f8fafc; }
      .mode-timer { font-size:11px; color:#94a3b8; margin-top:2px; }
      .mode-badge { padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; }

      .appolosx9-step-item { display:flex; align-items:center; gap:12px; margin-bottom:14px; font-size:13px; transition: 0.3s ease; }
      
      /* Utilities & Animations */
      .text-center { text-align: center; justify-content: center; align-items: center; }
      
      @keyframes appolosx9-spin { to { transform:rotate(360deg); } }
      @keyframes appolosx9-popIn { 0% { opacity: 0; transform: translate(-50%, -45%) scale(0.95); } 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      @keyframes appolosx9-popOut { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -55%) scale(0.95); } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    `
  }, document.head);

  OVERLAYS.forEach(id => document.getElementById(id)?.remove());

  // HTML Overlay 1: Auth Box
  createElement("div", {
    id: "appolosx9-auth-box",
    className: "appolosx9-overlay",
    innerHTML: getHeaderHTML("VERIFIKASI LISENSI") + `
      <div class="appolosx9-body">
        <div class="appolosx9-input-wrap">
          <span class="appolosx9-input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          <input type="text" id="appolosx9-key-input" placeholder="Masukkan kunci lisensi" autocomplete="off" spellcheck="false">
        </div>
        
        <button id="appolosx9-login-btn" class="appolosx9-btn" style="height: 48px; margin-bottom: 12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          Verifikasi Kunci
        </button>
        
        <button id="appolosx9-telegram-btn" class="appolosx9-btn" style="background: rgba(255,255,255,0.05); color: #94a3b8; height: 48px; border: 1px solid rgba(255,255,255,0.05);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          Dapatkan Kunci
        </button>
        
        <div id="appolosx9-status" class="text-center" style="margin-top: 16px; font-size: 12px; color: #94a3b8; display: flex; min-height: 20px;">Masukkan kunci Anda untuk melanjutkan</div>
      </div>`
  });

  // HTML Overlay 2: Destinasi
  createElement("div", {
    id: "appolosx9-dest-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("PILIH METODE BYPASS") + `
      <div class="appolosx9-body">
        <div class="dest-desc" style="margin-bottom: 16px; font-size: 13px; color: #94a3b8; font-weight: 500;">Pilih jalur injeksi Anda:</div>
        
        <button class="dest-option selected" id="dest-opt-root">
          <div class="dest-option-icon" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Aincrad Root Bypass</div>
            <div class="dest-option-sub">Modifikasi sistem langsung</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-proxy">
          <div class="dest-option-icon" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Aincrad Proxy Bypass</div>
            <div class="dest-option-sub">Pengalihan jaringan aman</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <button class="dest-option" id="dest-opt-custom">
          <div class="dest-option-icon" style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg></div>
          <div style="flex: 1;">
            <div class="dest-option-title">Custom Link</div>
            <div class="dest-option-sub">Masukkan target URL manual</div>
          </div>
          <div class="dest-radio"><div class="dest-radio-dot"></div></div>
        </button>

        <div id="dest-custom-wrap" style="display:none; margin-top:0px; margin-bottom:12px; animation: fadeIn 0.3s ease;">
          <input type="text" id="dest-url-input" class="dest-url-input" placeholder="https://..." autocomplete="off">
        </div>

        <button class="dest-confirm-btn" id="dest-confirm-btn">
          Konfirmasi Pilihan
        </button>
        <div id="appolosx9-dest-status" style="display: flex; flex-direction: column; align-items: center; width: 100%;"></div>
      </div>`
  });

  // HTML Overlay 3: Pilih Mode
  createElement("div", {
    id: "appolosx9-select-mode-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("PILIH KECEPATAN", true, "window.__appolosx9GoBack()") + `
      <div class="appolosx9-body">
        <div class="mode-desc" style="margin-bottom: 16px; font-size: 13px; color: #94a3b8; font-weight: 500; text-align: center;">Tentukan rasio kecepatan & keamanan:</div>
        
        <button class="mode-btn" id="mode-fast" data-duration="30" style="border-color: rgba(16, 185, 129, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div><div class="mode-name">Mode Cepat</div><div class="mode-timer">Eksekusi agresif</div></div>
          </div>
          <span class="mode-badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">30s</span>
        </button>

        <button class="mode-btn" id="mode-secure" data-duration="45" style="border-color: rgba(59, 130, 246, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div><div class="mode-name">Mode Terlindungi</div><div class="mode-timer">Kecepatan stabil</div></div>
          </div>
          <span class="mode-badge" style="background: rgba(59, 130, 246, 0.2); color: #3b82f6;">45s</span>
        </button>

        <button class="mode-btn" id="mode-safe" data-duration="60" style="border-color: rgba(245, 158, 11, 0.2);">
          <div class="mode-btn-left">
            <div class="mode-icon" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div><div class="mode-name">Mode Sangat Aman</div><div class="mode-timer">Penyamaran penuh</div></div>
          </div>
          <span class="mode-badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">60s</span>
        </button>
      </div>`
  });

  // HTML Overlay 4: Loading
  createElement("div", {
    id: "appolosx9-loading-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML(`<span id="appolosx9-check-text">SINKRONISASI SERVER...</span>`) + `
      <div class="appolosx9-body">
        <div class="appolosx9-progress-bar" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 6px; margin-bottom: 24px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);">
          <div class="appolosx9-progress-fill" style="background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6); background-size: 200% 100%; height: 100%; width: 60%; animation: gradientMove 2s linear infinite;"></div>
        </div>

        <div id="appolosx9-step-1" class="appolosx9-step-item" style="color:#10b981; font-weight: 600;">
          ${ICONS.check} Autentikasi berhasil
        </div>
        <div id="appolosx9-step-2" class="appolosx9-step-item" style="color:#f8fafc; font-weight: 500;">
          ${ICONS.spinner} Memeriksa integritas sistem...
        </div>
        <div id="appolosx9-step-3" class="appolosx9-step-item" style="color:#64748b; font-weight: 500;">
          ${ICONS.circle} Mengamankan rute...
        </div>
      </div>
      <style>@keyframes gradientMove { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }</style>`
  });

  // HTML Overlay 5: Countdown
  createElement("div", {
    id: "appolosx9-countdown-overlay",
    className: "appolosx9-overlay",
    style: "display:none",
    innerHTML: getHeaderHTML("INJEKSI DIMULAI") + `
      <div class="appolosx9-countdown-container" style="text-align: center;">
        <div class="appolosx9-circle-wrapper" style="position: relative; width: 90px; height: 90px; margin: 0 auto 20px;">
          <svg class="appolosx9-svg-circle" width="90" height="90" viewBox="0 0 90 90" style="transform: rotate(-90deg);">
            <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="7"/>
            <circle id="appolosx9-progress-circle" cx="45" cy="45" r="38" fill="none" stroke="#3b82f6"
              stroke-width="7" stroke-dasharray="238.76" stroke-dashoffset="0" stroke-linecap="round" 
              style="filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)); transition: stroke-dashoffset 1s linear;"/>
          </svg>
          <div id="appolosx9-countdown-number" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 28px; font-weight: 800; color: #f8fafc; text-shadow: 0 0 10px rgba(255,255,255,0.3);">5</div>
        </div>
        
        <div class="appolosx9-redirect-title" style="font-size: 16px; font-weight: 700; color: #f8fafc; margin-bottom: 6px;">Menyelesaikan Bypass...</div>
        <div class="appolosx9-redirect-desc" style="font-size: 12px; color: #94a3b8; margin-bottom: 20px;">Memuat protokol keamanan berlapis</div>
        
        <div style="padding: 12px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px; display: flex; align-items: flex-start; gap: 10px;">
          <svg style="flex-shrink:0; margin-top:2px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style="font-size: 12px; color: #fcd34d; line-height: 1.5; text-align: left; font-weight: 500;">Peringatan: Jangan tutup tab ini atau berpindah aplikasi untuk mencegah deteksi.</span>
        </div>
      </div>`
  });

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

  document.addEventListener("click", function (e) {
    if (e.target.closest(".appolosx9-close-btn")) {
      closeAllOverlays();
    }
  });

  let targetUrl = null;
  let fetchCounter = 0;

  window.__appolosx9GoBack = function () {
    fetchCounter++;
    domElements.confirmDestBtn.disabled = false;
    domElements.destStatus.innerHTML = "";
    showOverlay("appolosx9-dest-overlay");
  };

  function resetDestinationSelection() {
    document.querySelectorAll('.dest-option').forEach(el => {
      el.classList.remove('selected');
      el.querySelector('.dest-radio-dot').style.opacity = '0';
      el.querySelector('.dest-radio-dot').style.transform = 'scale(0)';
    });
    domElements.optRoot.classList.add('selected');
    domElements.customWrap.style.display = "none";
    domElements.urlInput.value = "";
    domElements.destStatus.innerHTML = "";
    domElements.confirmDestBtn.disabled = false;
  }

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
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; margin-top: 16px; width: 100%; animation: fadeIn 0.3s ease;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style="color: #fca5a5; font-size: 13px; font-weight: 600;">Format URL tidak valid!</span>
          </div>`;
        return;
      }
      targetUrl = customUrl;
      proceedToModeSelection();
    } else {
      const targetSource = isProxy ? CONFIG.redirectUrl2 : CONFIG.redirectUrl;
      domElements.confirmDestBtn.disabled = true;
      domElements.destStatus.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; margin-top: 16px; width: 100%; animation: fadeIn 0.3s ease;">
          <div style="width: 14px; height: 14px; border: 2.5px solid rgba(59, 130, 246, 0.3); border-top-color: #3b82f6; border-radius: 50%; animation: appolosx9-spin 0.8s linear infinite;"></div>
          <span style="color: #93c5fd; font-size: 13px; font-weight: 600;">Menarik data target...</span>
        </div>`;

      try {
        const fetchedUrl = await fetchText(targetSource);
        if (!fetchedUrl.startsWith("http")) throw new Error("Invalid URL");
        targetUrl = fetchedUrl;
        proceedToModeSelection();
      } catch (err) {
        domElements.destStatus.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; margin-top: 16px; width: 100%; animation: fadeIn 0.3s ease;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style="color: #fca5a5; font-size: 13px; font-weight: 600;">Gagal mendapatkan target server</span>
          </div>`;
        domElements.confirmDestBtn.disabled = false;
      }
    }
  });

  function proceedToModeSelection() {
    showOverlay("appolosx9-select-mode-overlay");
  }

  [domElements.modeFast, domElements.modeSecure, domElements.modeSafe].forEach(btn => {
    btn.addEventListener("click", function () {
      if (!targetUrl) return;
      const duration = parseInt(this.dataset.duration, 10);
      startRedirect(targetUrl, duration);
    });
  });

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
      sub: `<span style="color:#10b981; display:flex; align-items:center; gap:6px;">${ICONS.check} Sinkronisasi Selesai.</span>`,
      step: "Protokol diperbarui"
    } : {
      sub: `<span style="color:#94a3b8; display:flex; align-items:center; gap:6px;">${ICONS.check} Rute lokal digunakan.</span>`,
      step: "Menggunakan cache aman."
    };

    if (checkText) {
      checkText.style.opacity = "0";
      setTimeout(() => {
        checkText.innerHTML = updateStatus.sub;
        checkText.style.opacity = "1";
        checkText.style.transition = "opacity 0.4s ease";
      }, 200);
    }

    if (step2) {
      step2.style.color = "#10b981";
      step2.innerHTML = `${ICONS.check} <span style="color:#f8fafc;">${updateStatus.step}</span>`;
    }

    if (step3) {
      step3.style.color = "#3b82f6";
      step3.innerHTML = `${ICONS.spinner} <span style="color:#f8fafc;">Mengeksekusi bypass...</span>`;
    }
    
    await delay(1200);
    showOverlay("appolosx9-countdown-overlay");
    
    const progressCircle = document.getElementById("appolosx9-progress-circle");
    const countdownNumber = document.getElementById("appolosx9-countdown-number");
    const circumference = Math.PI * 2 * 38; 
    
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

  domElements.telegramBtn.addEventListener("click", async () => {
    try {
      const tgUrl = await fetchText(CONFIG.telegramUrl);
      if (tgUrl.startsWith("http")) window.open(tgUrl, "_blank");
    } catch (err) {}
  });

  // PENYELESAIAN BUG: Mengubah fungsi SetStatus agar selalu rata tengah (center)
  function setStatus(msg, type = 'default') {
    const colors = {
      default: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#94a3b8' },
      error: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#fca5a5' },
      success: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#6ee7b7' },
      info: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#93c5fd' }
    };
    const c = colors[type] || colors.default;
    domElements.status.innerHTML = `
      <div style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: ${c.bg}; border: 1px solid ${c.border}; border-radius: 12px; color: ${c.text}; font-size: 13px; font-weight: 600; animation: fadeIn 0.3s ease;">
        ${msg}
      </div>`;
  }

  domElements.loginBtn.addEventListener("click", async () => {
    const inputKey = domElements.keyInput.value.trim();
    
    if (!inputKey) {
      setStatus("Harap masukkan kunci aktivasi", "error");
      return;
    }
    
    setStatus(`
      <div style="width:14px; height:14px; border:2.5px solid #3b82f6; border-top-color:transparent; border-radius:50%; animation:appolosx9-spin 0.8s linear infinite;"></div>
      Memvalidasi keamanan...`, "info");
      
    domElements.loginBtn.disabled = true;
    domElements.telegramBtn.disabled = true;
    
    try {
      const validationResult = await validateKey(inputKey);
      
      if (!validationResult.valid) {
        setStatus("Lisensi tidak valid atau kadaluarsa", "error");
        domElements.loginBtn.disabled = false;
        domElements.telegramBtn.disabled = false;
        return;
      }
      
      setStatus("Lisensi terverifikasi!", "success");
      
      if (validationResult.hasCustomDuration) {
        const fetchedUrl = await fetchText(CONFIG.redirectUrl);
        if (!fetchedUrl.startsWith("http")) throw new Error("URL tidak valid");
        
        targetUrl = fetchedUrl;
        setTimeout(() => startRedirect(fetchedUrl, validationResult.duration), 800);
      } else {
        resetDestinationSelection();
        setTimeout(() => {
          showOverlay("appolosx9-dest-overlay");
          domElements.loginBtn.disabled = false;
          domElements.telegramBtn.disabled = false;
        }, 500);
      }
    } catch (err) {
      console.error(err);
      setStatus("Kesalahan server — Coba beberapa saat lagi", "error");
      domElements.loginBtn.disabled = false;
      domElements.telegramBtn.disabled = false;
    }
  });

})();
