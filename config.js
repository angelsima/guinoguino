// ─────────────────────────────────────────────────────────────
//  CONFIGURACIÓN — el único archivo que tienes que tocar
// ─────────────────────────────────────────────────────────────
//  1. En Firebase: Configuración del proyecto → Tus apps → app web (</>)
//  2. Copia los valores de "firebaseConfig" y pégalos aquí abajo.
//  Mientras apiKey esté vacío, la web funciona en MODO DEMO
//  (gente de mentira, nada se guarda).
//
//  La apiKey de Firebase NO es secreta: va en el navegador de
//  todos los invitados. La seguridad está en firestore.rules.
// ─────────────────────────────────────────────────────────────

window.GUINO = {
 firebaseConfig = {
  apiKey: "AIzaSyC8vkx9nFmbK3zBSsxCZ_KvdzrLDo_-p9A",
  authDomain: "matchu-903ab.firebaseapp.com",
  projectId: "matchu-903ab",
  storageBucket: "matchu-903ab.firebasestorage.app",
  messagingSenderId: "762080231403",
  appId: "1:762080231403:web:61fdd75f5d11eb951e23ae",
  measurementId: "G-0L1FFDND7B"
},

  // Nombre que se ve en la web
  appName: "Guiño guiño",

  // Guiños que puede mandar cada persona por evento
  maxSignals: 3
};
