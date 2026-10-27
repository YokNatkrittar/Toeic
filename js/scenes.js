// Hand-drawn illustrations standing in for the Part 1 photographs.
(function () {
  const skin = "#e9b896";
  const head = (x, y, hair) =>
    `<circle cx="${x}" cy="${y}" r="15" fill="${skin}"/><path d="M${x - 15} ${y - 2} q0 -17 15 -17 q15 0 15 17 q-6 -9 -15 -9 q-9 0 -15 9z" fill="${hair}"/>`;
  const sky = (c) => `<rect width="400" height="260" fill="${c}"/>`;

  const scenes = {
    laptop: `${sky("#e7ecf2")}
      <rect x="250" y="40" width="120" height="8" fill="#9aa7b8"/><rect x="250" y="90" width="120" height="8" fill="#9aa7b8"/>
      <rect x="258" y="14" width="14" height="26" fill="#d9534f"/><rect x="274" y="18" width="12" height="22" fill="#3b7dd8"/><rect x="288" y="12" width="14" height="28" fill="#5cb85c"/>
      <rect x="0" y="200" width="400" height="60" fill="#c9cfd8"/>
      <rect x="40" y="160" width="300" height="12" rx="3" fill="#8a6a4a"/><rect x="60" y="172" width="10" height="70" fill="#6e5238"/><rect x="310" y="172" width="10" height="70" fill="#6e5238"/>
      <path d="M150 108 h92 l-6 50 h-80z" fill="#3c4555"/><rect x="156" y="114" width="80" height="38" fill="#9fd0ff"/><rect x="140" y="156" width="112" height="6" rx="2" fill="#5b6576"/>
      <rect x="276" y="140" width="16" height="20" rx="3" fill="#ffffff" stroke="#7a8392"/>
      <rect x="92" y="150" width="34" height="80" rx="6" fill="#2f6f73"/>
      ${head(108, 88, "#3a2618")}<rect x="86" y="104" width="44" height="58" rx="14" fill="#f07a5a"/>
      <path d="M126 122 q22 10 30 30" stroke="#f07a5a" stroke-width="11" fill="none" stroke-linecap="round"/><circle cx="158" cy="154" r="6" fill="${skin}"/>`,
    box: `${sky("#dfe7d8")}<rect x="0" y="200" width="400" height="60" fill="#b9b2a2"/>
      <rect x="300" y="60" width="80" height="140" fill="#8e98a6"/><rect x="316" y="76" width="48" height="30" fill="#f1e7a0"/><text x="340" y="96" font-size="11" text-anchor="middle" fill="#333" font-family="sans-serif">EXIT</text>
      ${head(90, 70, "#222")}<rect x="70" y="86" width="40" height="66" rx="12" fill="#3f6fb5"/><rect x="74" y="150" width="12" height="52" fill="#2b3442"/><rect x="94" y="150" width="12" height="52" fill="#2b3442"/>
      ${head(250, 74, "#7a4a22")}<rect x="230" y="90" width="40" height="62" rx="12" fill="#e2a23a"/><rect x="234" y="150" width="12" height="52" fill="#2b3442"/><rect x="254" y="150" width="12" height="52" fill="#2b3442"/>
      <rect x="118" y="100" width="104" height="70" fill="#c89a5b" stroke="#8b6532"/><path d="M118 116 h104" stroke="#a37a40"/><rect x="160" y="100" width="20" height="70" fill="#d8b47c"/>
      <path d="M108 110 l14 10" stroke="#3f6fb5" stroke-width="10" stroke-linecap="round"/><path d="M232 112 l-14 10" stroke="#e2a23a" stroke-width="10" stroke-linecap="round"/>`,
    meetingroom: `${sky("#eef0f3")}<rect x="0" y="180" width="400" height="80" fill="#c7c1b6"/>
      <rect x="40" y="30" width="140" height="90" fill="#bfe0f5" stroke="#8796a8" stroke-width="4"/><path d="M110 30 v90" stroke="#8796a8" stroke-width="4"/>
      <rect x="240" y="40" width="120" height="70" fill="#fff" stroke="#8796a8" stroke-width="3"/>
      <ellipse cx="200" cy="190" rx="130" ry="34" fill="#7b5a3e"/><ellipse cx="200" cy="186" rx="130" ry="32" fill="#9a7351"/>
      ${[80, 140, 200, 260, 320].map((x) => `<rect x="${x - 16}" y="132" width="32" height="34" rx="6" fill="#2f3b4f"/>`).join("")}
      ${[110, 200, 290].map((x) => `<rect x="${x - 18}" y="214" width="36" height="34" rx="6" fill="#2f3b4f"/>`).join("")}`,
    watering: `${sky("#d9ecf7")}<rect x="0" y="190" width="400" height="70" fill="#7fb069"/>
      ${[230, 290, 350].map((x) => `<path d="M${x - 18} 196 h36 l-6 30 h-24z" fill="#b5653a"/><circle cx="${x}" cy="178" r="20" fill="#3f8f3a"/><circle cx="${x - 10}" cy="170" r="7" fill="#f2c94c"/>`).join("")}
      ${head(110, 64, "#3b2a1a")}<rect x="88" y="80" width="44" height="74" rx="13" fill="#5f7fbf"/><rect x="92" y="150" width="14" height="60" fill="#3a3a3a"/><rect x="114" y="150" width="14" height="60" fill="#3a3a3a"/>
      <path d="M128 100 q26 4 36 20" stroke="#5f7fbf" stroke-width="11" fill="none" stroke-linecap="round"/>
      <rect x="160" y="112" width="36" height="28" rx="5" fill="#2e9e8f"/><path d="M196 118 l34 22" stroke="#2e9e8f" stroke-width="6" stroke-linecap="round"/>
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${234 + i * 3}" cy="${148 + i * 7}" r="2.4" fill="#3a8fd6"/>`).join("")}`,
    bicycles: `${sky("#e9e4da")}<rect x="0" y="0" width="400" height="170" fill="#c8a98a"/>
      ${[30, 130, 230, 330].map((x) => `<rect x="${x}" y="30" width="50" height="60" fill="#5c7a99" stroke="#f4efe6" stroke-width="5"/>`).join("")}
      <rect x="0" y="170" width="400" height="90" fill="#9c9c9c"/>
      ${[60, 150, 240, 330].map((x) => `<g fill="none" stroke="#1f2a36" stroke-width="4"><circle cx="${x - 24}" cy="214" r="20"/><circle cx="${x + 24}" cy="214" r="20"/><path d="M${x - 24} 214 l18 -30 h26 l4 30 M${x - 6} 184 l14 30 M${x + 20} 184 l-2 -12 h10"/></g><circle cx="${x - 6}" cy="182" r="5" fill="#d64545"/>`).join("")}`,
    chart: `${sky("#eef1f5")}<rect x="0" y="210" width="400" height="50" fill="#c6c9cf"/>
      <rect x="150" y="30" width="220" height="140" fill="#ffffff" stroke="#6c7686" stroke-width="5"/>
      <path d="M175 150 h170 M175 150 v-100" stroke="#6c7686" stroke-width="2"/>
      <rect x="190" y="110" width="26" height="40" fill="#5b8def"/><rect x="230" y="90" width="26" height="60" fill="#5b8def"/><rect x="270" y="70" width="26" height="80" fill="#5b8def"/><rect x="310" y="55" width="26" height="95" fill="#f2994a"/>
      ${head(90, 70, "#151515")}<rect x="68" y="86" width="44" height="74" rx="13" fill="#9b51e0"/><path d="M76 160 h28 l6 52 h-40z" fill="#2c2c3a"/>
      <path d="M108 100 q30 -12 58 -20" stroke="#9b51e0" stroke-width="11" fill="none" stroke-linecap="round"/><circle cx="170" cy="79" r="6" fill="${skin}"/>`
  };
  window.SCENES = {
    svg(name, label) {
      return `<svg class="scene" viewBox="0 0 400 260" role="img" aria-label="${label}">${scenes[name] || ""}</svg>`;
    }
  };
})();
