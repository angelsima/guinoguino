/* ════════════════════════════════════════════════════════════════
   Guiño guiño — QR y cartel A4 (compartido por admin.html y panel.html)
   Necesita qrcodejs cargado antes (window.QRCode).
   ════════════════════════════════════════════════════════════════ */
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const appName = () => (window.GUINO && window.GUINO.appName) || "Guiño guiño";
  const guestUrl = id => new URL(`index.html?e=${encodeURIComponent(id)}`, location.href).href;
  const isNeon = ev => ev.theme === "neon" || ev.theme === "fiesta";

  function drawQR(el, id, size = 240) {
    el.innerHTML = `<div class="qr"><div class="q"></div><div class="row" style="margin-top:10px"><button class="btn ghost" data-dl>Descargar QR (PNG)</button></div></div>`;
    new QRCode(el.querySelector(".q"), { text: guestUrl(id), width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
    el.querySelector("[data-dl]").onclick = () => {
      const c = el.querySelector("canvas"); const a = document.createElement("a");
      a.href = c.toDataURL("image/png"); a.download = `qr-${id}.png`; a.click();
    };
  }

  function posterDeco(theme) {
    if (theme === "neon") {
      const unit = `<span>${esc(appName())}</span><i>●</i><span>¿Estás soltero o soltera?</span><i>●</i>`;
      return `<div class="tk"><div>${unit.repeat(6)}</div></div>`;
    }
    let l = "";
    for (let i = 0; i < 6; i++) {
      const d = 18 + i * 13, up = i % 2 ? -1 : 1;
      l += `<ellipse cx="${200 - d}" cy="${26 + up * 6}" rx="8" ry="3" transform="rotate(${up * -28} ${200 - d} ${26 + up * 6})"/><ellipse cx="${200 + d}" cy="${26 + up * 6}" rx="8" ry="3" transform="rotate(${up * 28} ${200 + d} ${26 + up * 6})"/>`;
    }
    return `<svg viewBox="0 0 400 52" style="width:300px;display:block;margin:0 auto"><path d="M10 26H100M300 26H390" stroke="#B39257" stroke-width="1"/><path d="M100 26H300" stroke="#3E5C48" stroke-width="1.2" opacity=".6"/><g fill="#3E5C48" opacity=".8">${l}</g><circle cx="200" cy="26" r="4" fill="#B39257"/></svg>`;
  }

  // Abre el cartel A4 en una ventana nueva y lanza la impresión (desde ahí se puede guardar como PDF).
  function printPoster(ev) {
    const theme = isNeon(ev) ? "neon" : "boda";
    const app = appName();
    const tmp = document.createElement("div");
    new QRCode(tmp, { text: guestUrl(ev.id), width: 600, height: 600, colorDark: theme === "neon" ? "#0D0A12" : "#26342B", correctLevel: QRCode.CorrectLevel.M });
    const png = tmp.querySelector("canvas").toDataURL("image/png");
    const w = window.open("", "_blank");
    if (!w) return alert("Tu navegador ha bloqueado la ventana del cartel. Permite las ventanas emergentes para esta web y vuelve a pulsar.");
    const fonts = `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Great+Vibes&family=Anton&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">`;
    const side = ev.kind !== "fiesta" && Array.isArray(ev.sides);
    const boda = `
  <style>@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;height:100%}
  body{background:#F6F1E7;color:#26342B;font-family:"Cormorant Garamond",Georgia,serif;text-align:center;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .p{height:100vh;padding:14mm;display:flex}
  .f1{flex:1;border:1.5px solid #B39257;padding:5mm;display:flex}
  .f2{flex:1;border:.6px solid #B39257;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10mm 14mm}
  .b{font-family:"Great Vibes",cursive;font-size:64px;color:#B39257;line-height:1;margin:8px 0 2px}
  .e{font-style:italic;font-size:24px;letter-spacing:.02em;color:#3E5C48}
  h1{font-weight:500;font-size:50px;line-height:1.08;margin:22px 0 6px}
  p{font-size:22px;color:#4E5A52;max-width:460px;margin:6px auto;line-height:1.35}
  .q{margin:24px 0 18px;padding:14px;background:#fff;border:1px solid #B39257;outline:1px solid #E2D7C2;outline-offset:6px}
  .q img{width:280px;height:280px;display:block}
  .s{font-size:17px;color:#6E786F}</style></head><body><div class="p"><div class="f1"><div class="f2">
  ${posterDeco("boda")}
  <div class="b">${esc(app)}</div><div class="e">${esc(ev.name)}</div>
  <h1>¿Estás soltero<br>o soltera?</h1>
  <p>Escanea y descubre si alguien de aquí quiere conocerte.</p>
  <div class="q"><img src="${png}" alt="QR"></div>
  <p class="s">Nadie sabrá que le has guiñado… salvo que te guiñe también.<br>Todo se borra al terminar la fiesta.</p>
  ${posterDeco("boda")}
  </div></div></div>`;
    const neon = `
  <style>@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;height:100%}
  body{background:#0D0A12;color:#F7F3FF;font-family:Inter,Helvetica,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .p{height:100vh;display:flex;flex-direction:column;overflow:hidden}
  .tk{background:#C8FF2E;color:#0D0A12;white-space:nowrap;overflow:hidden;font:400 22px/1 Anton,Impact,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:12px 0;transform:rotate(-2deg) scale(1.06);border-block:3px solid #0D0A12}
  .tk.b2{transform:rotate(2deg) scale(1.06);background:#FF2D95}
  .tk span{padding:0 12px}.tk i{font-style:normal;color:#FF2D95}.tk.b2 i{color:#C8FF2E}
  .m{flex:1;display:flex;flex-direction:column;justify-content:center;padding:6mm 14mm}
  .k{font-weight:700;font-size:16px;letter-spacing:.2em;text-transform:uppercase;color:#C8FF2E}
  .e{font-weight:600;font-size:20px;color:#A99FBC;margin-top:6px}
  h1{font:400 108px/.92 Anton,Impact,sans-serif;text-transform:uppercase;margin:18px 0 10px;letter-spacing:.005em}
  h1 .o{display:block;color:transparent;-webkit-text-stroke:2.5px #F7F3FF}
  .row{display:flex;gap:28px;align-items:center;margin-top:18px}
  .q{flex:none;padding:14px;background:#fff;border-radius:18px;box-shadow:0 0 0 6px #FF2D95,0 0 50px rgba(255,45,149,.55)}
  .q img{width:300px;height:300px;display:block}
  .t{font-size:22px;line-height:1.4}
  .t b{color:#C8FF2E}
  .s{font-size:15px;color:#A99FBC;margin-top:14px}</style></head><body><div class="p">
  ${posterDeco("neon")}
  <div class="m">
    <div class="k">${esc(app)} 😉</div><div class="e">${esc(ev.name)}</div>
    <h1>¿Estás soltero<span class="o">o soltera?</span></h1>
    <div class="row"><div class="q"><img src="${png}" alt="QR"></div>
      <div class="t">Escanea y descubre si alguien de aquí <b>quiere conocerte</b>.<div class="s">Nadie sabrá que le has guiñado… salvo que te guiñe también.${side ? " Di de parte de quién vienes y sabréis a quién preguntar." : ""}<br>Todo se borra al terminar la fiesta.</div></div></div>
  </div>
  <div class="tk b2"><div>${`<span>Guiña</span><i>●</i><span>Haz match</span><i>●</i><span>Búscale por la fiesta</span><i>●</i>`.repeat(5)}</div></div>
  </div>`;
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Cartel ${esc(ev.name)}</title>${fonts}${theme === "neon" ? neon : boda}
  <script>window.onload=()=>{(document.fonts&&document.fonts.ready||Promise.resolve()).then(()=>setTimeout(()=>print(),300))}<\/script></body></html>`);
    w.document.close();
  }

  window.GuinoCartel = { guestUrl, drawQR, printPoster, isNeon };
})();
