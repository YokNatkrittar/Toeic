(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const LET = ["A", "B", "C", "D"];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("toeic17:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) {
      try { localStorage.setItem("toeic17:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
      if (Cloud.KEYS.includes(k)) Cloud.schedule();
    }
  };

  /* ---------------- cloud sync: progress follows the signed-in viewer across devices ---------------- */
  const Cloud = {
    KEYS: ["tasks", "known", "history", "exam"],
    ref: null, timer: null, writing: Promise.resolve(), lastJson: null, ready: false,
    snapshot() { const o = {}; this.KEYS.forEach((k) => { const v = store.get(k, null); if (v != null) o[k] = v; }); return o; },
    status(state) {
      const el = $("#sync");
      if (!el) return;
      const t = { off: ["บันทึกในเครื่องนี้", "ความคืบหน้าเก็บไว้ในเบราว์เซอร์นี้เท่านั้น (ต้องลงชื่อเข้า claude.ai เพื่อซิงก์ข้ามเครื่อง)"],
        sync: ["กำลังซิงก์…", "กำลังบันทึกความคืบหน้าขึ้นบัญชีของคุณ"], ok: ["ซิงก์แล้ว", "ความคืบหน้าบันทึกในบัญชีของคุณ เปิดเครื่องไหนก็ต่อจากเดิมได้"],
        err: ["ซิงก์ไม่สำเร็จ", "บันทึกในเครื่องนี้ไว้แล้ว จะลองซิงก์ใหม่เมื่อมีการเปลี่ยนแปลงครั้งถัดไป"] }[state];
      el.textContent = t[0]; el.title = t[1]; el.dataset.state = state;
    },
    async init() {
      this.status("off");
      try {
        if (!window.claude || !window.claude.use) return;
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        if (!db || !user) return;
        const id = await user.id();
        if (!id) return;
        this.ref = db.doc("data/users/" + id + "/progress");
        this.status("sync");
        this.ref.onSnapshot((snap) => this.onRemote(snap), () => this.status("err"));
      } catch (e) { this.ref = null; this.status("off"); }
    },
    onRemote(snap) {
      if (snap.metadata && snap.metadata.hasPendingWrites) return;
      let remote = {};
      if (snap.exists) { try { remote = JSON.parse(snap.data().json || "{}"); } catch (e) { remote = {}; } }
      const json = snap.exists ? snap.data().json : null;
      if (this.ready && json === this.lastJson) return;
      const local = this.snapshot();
      // first contact merges both sides so nothing done offline is lost; later updates from other devices win
      const merged = this.ready ? { ...local, ...remote } : {
        tasks: { ...(local.tasks || {}), ...(remote.tasks || {}) },
        known: { ...(local.known || {}), ...(remote.known || {}) },
        history: [...(remote.history || []), ...(local.history || [])].filter((h, i, a) => a.findIndex((x) => x.t === h.t) === i).sort((a, b) => a.t - b.t).slice(-30),
        exam: remote.exam || local.exam
      };
      Object.keys(merged).forEach((k) => { if (merged[k] != null) { try { localStorage.setItem("toeic17:" + k, JSON.stringify(merged[k])); } catch (e) { /* storage unavailable */ } } });
      const first = !this.ready;
      this.ready = true;
      this.lastJson = json;
      if (first && JSON.stringify(merged) !== JSON.stringify(remote)) this.schedule(0); else this.status("ok");
      updateDday();
      refreshView();
    },
    schedule(delay = 1200) {
      if (!this.ref || !this.ready) return;
      clearTimeout(this.timer);
      this.status("sync");
      this.timer = setTimeout(() => {
        this.writing = this.writing.then(async () => {
          const json = JSON.stringify(this.snapshot());
          if (json === this.lastJson) { this.status("ok"); return; }
          try { await this.ref.set({ json, updatedAt: Date.now() }); this.lastJson = json; this.status("ok"); }
          catch (e) { this.status("err"); }
        });
      }, delay);
    }
  };
  const view = $("#view");

  /* ---------------- dates ---------------- */
  const DAY = 86400000;
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const examDate = () => parseDate(store.get("exam", "2026-11-13"));
  const startDate = () => new Date(examDate().getTime() - 17 * DAY);
  const daysLeft = () => Math.round((examDate() - today0()) / DAY);
  const planDayToday = () => Math.round((today0() - startDate()) / DAY) + 1;
  const thDate = (d) => d.toLocaleDateString("th-TH", { day: "numeric", month: "short" });

  function updateDday() {
    const n = daysLeft();
    $("#dday").textContent = n > 0 ? `D-${n} · สอบ ${thDate(examDate())}` : n === 0 ? "วันนี้วันสอบ สู้ ๆ" : "สอบเสร็จแล้ว";
  }

  /* ---------------- speech ---------------- */
  const Speech = {
    synth: window.speechSynthesis || null,
    voices: [], cast: {}, rate: store.get("rate", 0.95),
    init() {
      if (!this.synth) return;
      const load = () => { this.voices = this.synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang)); this.pickCast(); };
      load();
      this.synth.addEventListener && this.synth.addEventListener("voiceschanged", load);
    },
    gender(v) {
      const n = v.name;
      if (/female|samantha|victoria|karen|moira|tessa|fiona|zira|susan|serena|allison|ava|kate|libby|sonia|aria|jenny|natasha|hazel|catherine|nicky|joanna|salli|kimberly|emma|amy|google us english$/i.test(n)) return "f";
      if (/\bmale|daniel|alex|fred|david|mark|george|ryan|guy|arthur|aaron|oliver|thomas|rishi|james|matthew|brian|eric|christopher|william|liam/i.test(n)) return "m";
      return "?";
    },
    pickCast() {
      const vs = this.voices;
      const local = (a) => a.sort((x, y) => (y.localService ? 1 : 0) - (x.localService ? 1 : 0));
      const f = local(vs.filter((v) => this.gender(v) === "f"));
      const m = local(vs.filter((v) => this.gender(v) === "m"));
      const any = vs[0] || null;
      const W = f[0] || any, M = m[0] || any;
      const M2 = m.find((v) => v !== M) || M;
      const N = vs.find((v) => v !== W && v !== M && /GB|AU|CA/i.test(v.lang)) || m.find((v) => v !== M) || f.find((v) => v !== W) || any;
      this.cast = { W, M, M2, N };
      this.fakeGender = !f.length || !m.length;
    },
    pitch(role) {
      if (!this.fakeGender) return role === "M2" ? 0.9 : 1;
      return { W: 1.25, M: 0.8, M2: 0.65, N: 1 }[role] || 1;
    },
    available() { return !!this.synth; },
    gen: 0,
    cancel() { this.gen++; if (this.synth) this.synth.cancel(); },
    say(text, role) {
      const g = this.gen;
      const parts = String(text).split(/(?<=[.?!])\s+/).filter(Boolean);
      return parts.reduce((p, t) => p.then(() => (g === this.gen ? this.one(t, role) : null)), Promise.resolve());
    },
    one(text, role) {
      return new Promise((res) => {
        const est = 1500 + text.length * 75 / this.rate;
        if (!this.synth) { setTimeout(res, est); return; }
        const u = new SpeechSynthesisUtterance(text);
        const v = this.cast[role] || this.cast.N;
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
        u.rate = this.rate; u.pitch = this.pitch(role);
        let done = false;
        const fin = () => { if (done) return; done = true; clearTimeout(t); res(); };
        const t = setTimeout(fin, est + 4000);
        u.onend = fin; u.onerror = fin;
        this.synth.speak(u);
      });
    }
  };
  Speech.init();

  /* ---------------- router ---------------- */
  const ROUTES = { plan: renderPlan, cards: renderCards, sim: renderSim, tips: renderTips };
  let cleanup = null;
  function route() {
    const name = (location.hash || "#plan").slice(1);
    const fn = ROUTES[name] || renderPlan;
    if (cleanup) { cleanup(); cleanup = null; }
    $$(".tabs a").forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + (ROUTES[name] ? name : "plan") ? "page" : "false"));
    fn();
    setHdr();
    window.scrollTo(0, 0);
  }
  const setHdr = () => document.documentElement.style.setProperty("--hdr", $(".top").offsetHeight + "px");
  window.addEventListener("resize", setHdr);
  window.addEventListener("hashchange", route);
  const onSim = () => (location.hash || "#plan") === "#sim";

  /* ================= PLAN ================= */
  function renderPlan() {
    const done = store.get("tasks", {});
    const td = planDayToday();
    const total = PLAN.reduce((s, d) => s + d.tasks.length, 0);
    const checked = Object.values(done).filter(Boolean).length;
    view.innerHTML = `<div class="wrap stack">
      <div class="plan-head">
        <div class="stack" style="gap:6px">
          <span class="eyebrow">แผนติว 17 วัน · วันละ 60-120 นาที</span>
          <h2>${td >= 1 && td <= 17 ? `วันนี้คือวันที่ ${td}: ${esc(PLAN[td - 1].title)}` : td < 1 ? `เริ่มวันที่ 1 ในอีก ${1 - td} วัน` : "ครบแผนแล้ว"}</h2>
          <p class="muted">ติ๊กงานที่ทำเสร็จ ระบบจะจำไว้ในเบราว์เซอร์นี้ · ทำครบแล้ว ${checked}/${total} งาน</p>
          <div class="bar" style="max-width:420px"><i style="width:${(checked / total * 100).toFixed(1)}%"></i></div>
        </div>
        <label class="row small">วันสอบ <input type="date" id="examDate" value="${store.get("exam", "2026-11-13")}"></label>
      </div>
      <div class="days">${PLAN.map((d) => dayCard(d, done, td)).join("")}</div></div>`;
    $("#examDate").addEventListener("change", (e) => { if (e.target.value) { store.set("exam", e.target.value); updateDday(); renderPlan(); } });
    view.addEventListener("change", onTask);
    cleanup = () => view.removeEventListener("change", onTask);
    function onTask(e) {
      const t = e.target.closest("[data-task]");
      if (!t) return;
      const m = store.get("tasks", {});
      m[t.dataset.task] = t.checked;
      store.set("tasks", m);
      renderPlan();
      const det = $(`details[data-day="${t.dataset.task.split("-")[0]}"]`);
      if (det) det.open = true;
    }
  }
  function dayCard(d, done, td) {
    const date = new Date(startDate().getTime() + (d.day - 1) * DAY);
    const n = d.tasks.filter((_, i) => done[d.day + "-" + i]).length;
    const cls = ["day", d.day === td ? "today" : "", n === d.tasks.length ? "done" : ""].join(" ");
    const vocab = d.vocab ? `<a class="btn" href="#cards" data-goset="${d.vocab}">เปิด Flashcard ชุด ${d.vocab}</a>` : "";
    return `<details class="${cls}" data-day="${d.day}" ${d.day === td ? "open" : ""}>
      <summary><span class="num">${d.day}<small>${thDate(date)}</small></span>
        <span class="sum-title"><b>${esc(d.title)}</b><span class="muted small">${esc(d.focus)}</span></span>
        <span class="prog">${n}/${d.tasks.length}</span></summary>
      <div class="body">
        ${d.tasks.map((t, i) => `<label class="task ${done[d.day + "-" + i] ? "checked" : ""}"><input type="checkbox" id="t${d.day}-${i}" data-task="${d.day}-${i}" ${done[d.day + "-" + i] ? "checked" : ""}><span>${esc(t[1])}</span><span class="min">${t[0] ? t[0] + " น." : ""}</span></label>`).join("")}
        <p class="tip">${esc(d.tip)}</p>
        <div class="row">${vocab}<a class="btn" href="#sim">ไป Simulator</a></div>
      </div></details>`;
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goset]");
    if (a) store.set("deck", a.dataset.goset);
  });

  /* ================= FLASHCARDS ================= */
  const ALLWORDS = [];
  VOCAB.sort((a, b) => a.set - b.set).forEach((s) => s.words.forEach((w) => ALLWORDS.push({ w: w[0], pos: w[1], th: w[2], ex: w[3], set: s.set })));
  const fc = { idx: 0, flipped: false, mode: "card", shuffle: false, q: "", order: null };

  function deckWords() {
    const deck = store.get("deck", "1");
    const known = store.get("known", {});
    let list = deck === "all" ? ALLWORDS.slice() : deck === "review" ? ALLWORDS.filter((x) => known[x.w] === 0) : ALLWORDS.filter((x) => String(x.set) === String(deck));
    if (fc.shuffle) {
      if (!fc.order || fc.order.deck !== deck || fc.order.n !== list.length) {
        const ord = list.map((_, i) => i);
        for (let i = ord.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ord[i], ord[j]] = [ord[j], ord[i]]; }
        fc.order = { deck, n: list.length, ord };
      }
      list = fc.order.ord.map((i) => list[i]);
    }
    return list;
  }
  function highlight(ex, w) {
    const stem = w.split(" ")[0].replace(/[éè]/g, "e").slice(0, Math.max(3, w.length - 2));
    const re = new RegExp("(" + stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[a-z]*)", "i");
    return esc(ex).replace(re, "<mark>$1</mark>");
  }
  function renderCards() {
    const deck = store.get("deck", "1");
    const known = store.get("known", {});
    const list = deckWords();
    if (fc.idx >= list.length) fc.idx = 0;
    const reviewN = ALLWORDS.filter((x) => known[x.w] === 0).length;
    const knownN = ALLWORDS.filter((x) => known[x.w] === 1).length;
    const chips = VOCAB.map((s) => {
      const k = s.words.filter((w) => known[w[0]] === 1).length;
      return `<button class="chip" aria-pressed="${String(deck) === String(s.set)}" data-deck="${s.set}" title="${esc(s.topic)}">${s.set} · ${k}/${s.words.length}</button>`;
    }).join("");
    const cur = VOCAB.find((s) => String(s.set) === String(deck));
    view.innerHTML = `<div class="wrap stack">
      <div class="stack" style="gap:6px"><span class="eyebrow">คำศัพท์ ${ALLWORDS.length} คำ · 15 ชุด</span>
        <h2>${cur ? `ชุด ${cur.set}: ${esc(cur.topic)} <span class="muted">(${esc(cur.th)})</span>` : deck === "review" ? "คำที่ยังจำไม่ได้" : "ทุกคำ"}</h2>
        <p class="muted small">จำได้แล้ว ${knownN} คำ · ยังไม่จำ ${reviewN} คำ</p></div>
      <div class="sets">${chips}<button class="chip" data-deck="review" aria-pressed="${deck === "review"}">ยังไม่จำ (${reviewN})</button><button class="chip" data-deck="all" aria-pressed="${deck === "all"}">ทั้งหมด</button></div>
      <div class="row"><button class="chip" id="mCard" aria-pressed="${fc.mode === "card"}">การ์ด</button><button class="chip" id="mList" aria-pressed="${fc.mode === "list"}">รายการ</button>
        <button class="chip" id="mShuf" aria-pressed="${fc.shuffle}">สุ่มลำดับ</button></div>
      <div id="fcBody"></div></div>`;
    $$("[data-deck]").forEach((b) => b.addEventListener("click", () => { store.set("deck", b.dataset.deck); fc.idx = 0; fc.flipped = false; renderCards(); }));
    $("#mCard").onclick = () => { fc.mode = "card"; renderCards(); };
    $("#mList").onclick = () => { fc.mode = "list"; renderCards(); };
    $("#mShuf").onclick = () => { fc.shuffle = !fc.shuffle; fc.order = null; fc.idx = 0; renderCards(); };
    if (fc.mode === "card") cardBody(list); else listBody(list);
  }
  function cardBody(list) {
    const body = $("#fcBody");
    if (!list.length) { body.innerHTML = `<div class="panel muted">ยังไม่มีคำในชุดนี้ ลองกด "ยังไม่จำ" ระหว่างท่องการ์ด แล้วคำจะมาอยู่ที่นี่</div>`; return; }
    const it = list[fc.idx];
    const known = store.get("known", {});
    body.innerHTML = `<div class="card-stage">
      <button class="flash ${fc.flipped ? "flipped" : ""}" id="flash" aria-label="พลิกการ์ด"><div class="inner">
        <div class="face"><span class="pos">${esc(it.pos)}</span><span class="word">${esc(it.w)}</span><span class="muted small">แตะเพื่อดูคำแปล</span></div>
        <div class="face back"><span class="word" style="font-size:1.4rem">${esc(it.w)}</span><span class="thai">${esc(it.th)}</span><span class="ex">${highlight(it.ex, it.w)}</span></div>
      </div></button>
      <div class="card-meta">${fc.idx + 1} / ${list.length} · ชุด ${it.set} ${known[it.w] === 1 ? "· ✓ จำได้" : known[it.w] === 0 ? "· ยังไม่จำ" : ""}</div>
      <div class="row" style="justify-content:center">
        <button class="btn" id="prev">← ก่อนหน้า</button>
        <button class="speak" id="say" aria-label="ฟังเสียง">🔊</button>
        <button class="btn bad" id="no">ยังไม่จำ</button>
        <button class="btn good" id="yes">จำได้</button>
        <button class="btn" id="next">ถัดไป →</button>
      </div>
      <p class="muted small">คีย์ลัด: Space พลิก · ← → เปลี่ยนการ์ด · 1 ยังไม่จำ · 2 จำได้</p></div>`;
    const go = (d) => { fc.idx = (fc.idx + d + list.length) % list.length; fc.flipped = false; renderCards(); };
    const mark = (v) => {
      const k = store.get("known", {}); k[it.w] = v; store.set("known", k);
      if (store.get("deck", "1") === "review" && v === 1) { fc.flipped = false; renderCards(); } else go(1);
    };
    $("#flash").onclick = () => { fc.flipped = !fc.flipped; $("#flash").classList.toggle("flipped", fc.flipped); };
    $("#prev").onclick = () => go(-1);
    $("#next").onclick = () => go(1);
    $("#yes").onclick = () => mark(1);
    $("#no").onclick = () => mark(0);
    $("#say").onclick = () => { Speech.cancel(); Speech.say(it.w + ". " + it.ex, "W"); };
    const key = (e) => {
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === " ") { e.preventDefault(); $("#flash").click(); }
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "1") mark(0);
      else if (e.key === "2") mark(1);
    };
    document.addEventListener("keydown", key);
    const prev = cleanup;
    cleanup = () => { document.removeEventListener("keydown", key); if (prev) prev(); };
  }
  function listBody(list) {
    const known = store.get("known", {});
    const body = $("#fcBody");
    body.innerHTML = `<div class="stack"><input type="search" id="vq" placeholder="ค้นหาคำศัพท์หรือคำแปล" value="${esc(fc.q)}" style="max-width:360px">
      <div class="panel tbl-wrap" style="padding:0"><table class="vlist"><thead><tr><th>คำ</th><th>ชนิด</th><th>ความหมาย</th><th>ตัวอย่าง</th><th></th></tr></thead><tbody id="vrows"></tbody></table></div></div>`;
    const fill = () => {
      const q = fc.q.trim().toLowerCase();
      const rows = (q ? ALLWORDS.filter((x) => x.w.toLowerCase().includes(q) || x.th.includes(q)) : list);
      $("#vrows").innerHTML = rows.map((x) => `<tr><td>${esc(x.w)}</td><td class="muted">${esc(x.pos)}</td><td>${esc(x.th)}</td><td class="muted">${esc(x.ex)}</td><td class="knownmark">${known[x.w] === 1 ? "✓" : known[x.w] === 0 ? "•" : ""}</td></tr>`).join("");
    };
    fill();
    $("#vq").addEventListener("input", (e) => { fc.q = e.target.value; fill(); });
  }

  /* ================= TEST DATA ================= */
  const L = TEST.listening, R = TEST.reading;
  const Q = {};          // q number -> {q, part, ans(idx), opts, text, ex, item}
  [...L, ...R].forEach((item) => {
    if (item.qs) item.questions.forEach((x) => { Q[x.q] = { ...x, part: item.part, ansI: LET.indexOf(x.ans), item }; });
    else Q[item.q] = { ...item, ansI: LET.indexOf(item.ans), item };
  });
  // pages: listening = one item per page; reading = Part 5 in tens, Part 6/7 one set per page
  const PAGES = [];
  L.forEach((it) => PAGES.push({ part: it.part, qs: it.qs || [it.q], items: [it], sec: "L" }));
  const p5 = R.filter((x) => x.part === 5);
  for (let i = 0; i < p5.length; i += 10) PAGES.push({ part: 5, qs: p5.slice(i, i + 10).map((x) => x.q), items: p5.slice(i, i + 10), sec: "R" });
  R.filter((x) => x.part !== 5).forEach((it) => PAGES.push({ part: it.part, qs: it.qs, items: [it], sec: "R" }));
  const PART_RANGE = { 1: [1, 6], 2: [7, 31], 3: [32, 70], 4: [71, 100], 5: [101, 130], 6: [131, 146], 7: [147, 200] };
  const partOf = (q) => +Object.keys(PART_RANGE).find((p) => q >= PART_RANGE[p][0] && q <= PART_RANGE[p][1]);

  function interp(pts, x) {
    if (x <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); }
    return pts[pts.length - 1][1];
  }
  const scaleL = (raw) => Math.min(495, Math.max(5, Math.round(interp([[0, 5], [20, 85], [40, 200], [60, 310], [75, 385], [90, 460], [96, 495]], raw) / 5) * 5));
  const scaleR = (raw) => Math.min(495, Math.max(5, Math.round(interp([[0, 5], [20, 60], [40, 170], [60, 280], [75, 365], [90, 445], [97, 495]], raw) / 5) * 5));

  /* ================= SIMULATOR ================= */
  let ex = null; // current exam session
  function renderSim() {
    if (ex && ex.phase !== "done") return renderExam();
    if (ex && ex.phase === "done") return renderResult();
    const hist = store.get("history", []);
    const voiceNote = !Speech.available()
      ? `<div class="notice">เบราว์เซอร์นี้ไม่รองรับเสียงอ่าน (Text-to-Speech) ส่วน Listening จะแสดงบทพูดเป็นข้อความแทน แนะนำให้ใช้ Chrome, Edge หรือ Safari</div>`
      : `<div class="notice">เสียง Listening ใช้เสียงสังเคราะห์ของเครื่อง (สำเนียง US/UK/AU ตามที่เครื่องมี) ใส่หูฟังแล้วกด "ทดสอบเสียง" ก่อนเริ่ม</div>`;
    view.innerHTML = `<div class="wrap stack">
      <div class="stack" style="gap:6px"><span class="eyebrow">TOEIC Listening & Reading Simulator</span><h2>ข้อสอบเสมือนจริง 200 ข้อ ครบ 7 พาร์ต</h2>
      <p class="muted">ข้อสอบชุดนี้เขียนขึ้นใหม่ตามรูปแบบและระดับความยากของ TOEIC ปัจจุบัน (ไม่ใช่ข้อสอบจริงของ ETS ซึ่งเป็นลิขสิทธิ์และไม่มีการเผยแพร่)</p></div>
      <div class="modes">
        <button class="mode" data-start="full"><b>สอบเต็มชุด</b><span class="muted small">Listening ต่อด้วย Reading เหมือนวันสอบจริง หยุดเสียงไม่ได้ ย้อนกลับ Listening ไม่ได้</span><span class="meta">200 ข้อ · ~2 ชั่วโมง</span></button>
        <button class="mode" data-start="listening"><b>เฉพาะ Listening</b><span class="muted small">Part 1-4 เล่นเสียงต่อเนื่อง มีช่วงเว้นให้ตอบเหมือนจริง</span><span class="meta">100 ข้อ · ~45 นาที</span></button>
        <button class="mode" data-start="reading"><b>เฉพาะ Reading</b><span class="muted small">Part 5-7 จับเวลา 75 นาที ข้ามไปมาได้</span><span class="meta">100 ข้อ · 75 นาที</span></button>
      </div>
      <div class="panel stack"><h3>ฝึกรายพาร์ต (เฉลยทันที)</h3>
        <div class="parts">${[1, 2, 3, 4, 5, 6, 7].map((p) => `<button class="btn" data-practice="${p}">Part ${p}</button>`).join("")}</div>
        <p class="muted small">กดฟังซ้ำได้ ดูบทพูดและคำอธิบายหลังตอบ</p></div>
      <div class="panel stack"><h3>ตั้งค่า</h3>
        <label class="row small" for="shuf"><input type="checkbox" id="shuf" ${store.get("shuffle", false) ? "checked" : ""}> สลับลำดับตัวเลือก (ใช้ตอนทำรอบสอง)</label>
        <label class="row small" for="showScript"><input type="checkbox" id="showScript" ${store.get("showScript", !Speech.available()) ? "checked" : ""}> แสดงบทพูดขณะฟัง (สำหรับฝึก ไม่เหมือนจริง)</label>
        <label class="row small" for="rate">ความเร็วเสียง <input type="range" id="rate" min="0.75" max="1.15" step="0.05" value="${Speech.rate}"> <span id="rateV" class="muted">${Speech.rate.toFixed(2)}×</span></label>
        <div class="row"><button class="btn" id="testVoice">ทดสอบเสียง</button></div>
        ${voiceNote}</div>
      ${hist.length ? `<div class="panel tbl-wrap"><h3>ประวัติการสอบ</h3><table class="hist"><thead><tr><th>วันที่</th><th>โหมด</th><th class="n">L</th><th class="n">R</th><th class="n">รวม</th></tr></thead><tbody>
        ${hist.slice().reverse().map((h) => `<tr><td>${new Date(h.t).toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" })}</td><td>${esc(h.mode)}</td><td class="n">${h.L ?? "-"}</td><td class="n">${h.R ?? "-"}</td><td class="n">${h.L != null && h.R != null ? h.L + h.R : "-"}</td></tr>`).join("")}</tbody></table></div>` : ""}
    </div>`;
    $$("[data-start]").forEach((b) => b.onclick = () => startExam(b.dataset.start));
    $$("[data-practice]").forEach((b) => b.onclick = () => startExam("practice", +b.dataset.practice));
    $("#shuf").onchange = (e) => store.set("shuffle", e.target.checked);
    $("#showScript").onchange = (e) => store.set("showScript", e.target.checked);
    $("#rate").oninput = (e) => { Speech.rate = +e.target.value; store.set("rate", Speech.rate); $("#rateV").textContent = Speech.rate.toFixed(2) + "×"; };
    $("#testVoice").onclick = async () => { Speech.cancel(); await Speech.say("Hello. This is the woman's voice.", "W"); await Speech.say("And this is the man's voice.", "M"); await Speech.say("Questions one through three refer to the following conversation.", "N"); };
  }

  function makePerm(q) {
    const n = Q[q].opts.length;
    const p = [...Array(n).keys()];
    if (!store.get("shuffle", false) || /^\[\d\]$/.test(Q[q].opts[0])) return p;
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    return p;
  }

  function startExam(mode, part) {
    const pages = PAGES.map((p, i) => ({ ...p, i })).filter((p) => mode === "full" ? true : mode === "listening" ? p.sec === "L" : mode === "reading" ? p.sec === "R" : p.part === part);
    const perm = {};
    pages.forEach((p) => p.qs.forEach((q) => { perm[q] = makePerm(q); }));
    ex = { mode, part, pages, perm, answers: {}, page: 0, phase: pages[0].sec === "L" && mode !== "practice" ? "listening" : "reading", t0: Date.now(), revealed: {} };
    if (ex.phase === "reading" && mode !== "practice") ex.ends = Date.now() + 75 * 60000;
    renderExam();
    if (ex.phase === "listening") runListening();
  }

  /* ---- listening runner ---- */
  const Runner = {
    steps: [], i: 0, paused: false, stopped: true, _wake: null, _resume: null,
    sleep(ms) { return new Promise((r) => { const t = setTimeout(() => { this._wake = null; r(); }, ms); this._wake = () => { clearTimeout(t); this._wake = null; r(); }; }); },
    async exec(st) { if (st.say) await Speech.say(st.say, st.role || "N"); else await this.sleep(st.wait); },
    async run(onStep, onDone) {
      this.stopped = false; this.paused = false;
      while (this.i < this.steps.length) {
        if (this.stopped) return;
        if (this.paused) { await new Promise((r) => { this._resume = r; }); continue; }
        const st = this.steps[this.i];
        onStep(st);
        await this.exec(st);
        if (this.stopped) return;
        if (this.paused) continue;
        this.i++;
      }
      this.stopped = true;
      onDone();
    },
    pause() { this.paused = true; Speech.cancel(); if (this._wake) this._wake(); },
    resume() { this.paused = false; if (this._resume) { const r = this._resume; this._resume = null; r(); } },
    stop() { this.stopped = true; this.paused = false; Speech.cancel(); if (this._wake) this._wake(); if (this._resume) { const r = this._resume; this._resume = null; r(); } }
  };

  const DIRECTIONS = {
    1: "Part 1. Directions: For each question in this part, you will hear four statements about a picture in your test book. Select the one statement that best describes what you see in the picture.",
    2: "Part 2. Directions: You will hear a question or statement and three responses. They will not be printed in your test book. Select the best response to the question or statement.",
    3: "Part 3. Directions: You will hear some conversations between two or more people. You will be asked to answer three questions about what the speakers say in each conversation.",
    4: "Part 4. Directions: You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk."
  };
  const numWord = (n) => String(n);
  function stepsForPage(p, pi) {
    const it = p.items[0], s = [];
    const say = (text, role) => s.push({ say: text, role, page: pi });
    const wait = (ms) => s.push({ wait: ms, page: pi });
    const perm = ex.perm;
    if (it.part === 1) {
      say(`Number ${numWord(it.q)}. Look at the picture marked number ${numWord(it.q)} in your test book.`, "N");
      perm[it.q].forEach((o, k) => { say(`${LET[k]}. ${it.opts[o]}`, "N"); wait(400); });
      wait(5000);
    } else if (it.part === 2) {
      say(`Number ${numWord(it.q)}.`, "N"); wait(300);
      say(it.prompt, it.spk[0]); wait(500);
      perm[it.q].forEach((o, k) => { say(`${LET[k]}. ${it.opts[o]}`, it.spk[1]); wait(400); });
      wait(5000);
    } else {
      const three = it.part === 3 && it.script.some((l) => l[0] === "M2");
      const what = it.part === 3 ? (three ? "conversation with three speakers" : "conversation") : it.kind;
      const g = it.graphic ? (it.graphic.type === "bars" ? " and chart" : " and table") : "";
      say(`Questions ${it.qs[0]} through ${it.qs[2]} refer to the following ${what}${g}.`, "N"); wait(700);
      if (it.part === 3) it.script.forEach((l) => { say(l[1], l[0]); wait(250); });
      else it.script.forEach((l) => { say(l, it.spk); wait(250); });
      wait(600);
      it.questions.forEach((x) => { say(`Number ${x.q}. ${x.text}`, "N"); wait(/graphic/i.test(x.text) ? 12000 : 8000); });
    }
    return s;
  }
  function runListening() {
    const steps = [];
    let lastPart = 0;
    ex.pages.forEach((p, pi) => {
      if (p.sec !== "L") return;
      if (p.part !== lastPart) { steps.push({ say: DIRECTIONS[p.part], role: "N", page: pi, dir: p.part }); steps.push({ wait: 1200, page: pi }); lastPart = p.part; }
      steps.push(...stepsForPage(p, pi));
    });
    Runner.steps = steps; Runner.i = 0;
    Runner.run((st) => {
      if (!ex) return;
      ex.nowText = st.say ? st.say : ex.nowText;
      const pageChanged = ex.page !== st.page;
      if (pageChanged || st.dir) {
        ex.page = st.page; ex.dir = st.dir || 0;
        if (onSim()) { renderExam(); if (pageChanged) window.scrollTo(0, 0); }
      } else updateNow();
    }, () => {
      if (!ex) return;
      if (ex.mode === "full") {
        ex.phase = "reading"; ex.page = ex.pages.findIndex((p) => p.sec === "R"); ex.ends = Date.now() + 75 * 60000;
        if (onSim()) { renderExam(); window.scrollTo(0, 0); }
      } else finishExam();
    });
  }
  function updateNow() {
    const n = $("#nowText");
    if (n && store.get("showScript", !Speech.available())) n.textContent = ex.nowText || "";
  }

  /* ---- exam render ---- */
  let timerId = null;
  function renderExam() {
    clearInterval(timerId);
    const p = ex.pages[ex.page];
    const practice = ex.mode === "practice";
    const listeningLive = ex.phase === "listening" && !practice;
    const answered = Object.keys(ex.answers).length;
    const totalQ = ex.pages.reduce((s, x) => s + x.qs.length, 0);
    const split = p.part >= 6;
    view.innerHTML = `<div class="wrap">
      <div class="exam-bar">
        <b>${practice ? `ฝึก Part ${ex.part}` : ex.phase === "listening" ? "Listening" : "Reading"}</b>
        <span class="muted small">Part ${p.part} · ข้อ ${p.qs[0]}${p.qs.length > 1 ? "-" + p.qs[p.qs.length - 1] : ""}</span>
        ${listeningLive ? `<span class="now"><i></i> กำลังเล่นเสียง</span>` : ""}
        ${ex.ends ? `<span class="timer" id="timer"></span>` : ""}
        <span class="muted small" style="margin-left:auto">ตอบแล้ว ${answered}/${totalQ}</span>
        ${listeningLive ? `<button class="btn" id="pauseBtn">${Runner.paused ? "เล่นต่อ" : "พักเสียง"}</button>` : ""}
        ${practice ? `<button class="btn" id="quitBtn">ออก</button>` : `<button class="btn" id="sheetBtn">กระดาษคำตอบ</button><button class="btn primary" id="finishBtn">ส่งข้อสอบ</button>`}
      </div>
      <div id="confirm"></div>
      <div class="drawer" id="drawer" hidden></div>
      ${listeningLive && ex.dir ? `<div class="notice" style="margin-top:14px">${esc(DIRECTIONS[ex.dir])}</div>` : ""}
      ${listeningLive && store.get("showScript", !Speech.available()) ? `<p class="notice" style="margin-top:14px" id="nowText">${esc(ex.nowText || "")}</p>` : ""}
      <div class="page ${split ? "split" : ""}">${pageHTML(p, { practice, live: listeningLive })}</div>
      ${listeningLive ? previewHTML() : ""}
      ${listeningLive ? "" : `<div class="pager"><button class="btn" id="prevPg" ${pageMin() >= ex.page ? "disabled" : ""}>← หน้าก่อน</button>
        <span class="muted small">หน้า ${ex.page + 1 - pageMin()} / ${pageMax() + 1 - pageMin()}</span>
        <button class="btn ${ex.page >= pageMax() ? "primary" : ""}" id="nextPg">${ex.page >= pageMax() ? (practice ? "ดูสรุปผล" : ex.mode === "full" && ex.phase === "listening" ? "ไป Reading" : "ส่งข้อสอบ") : "หน้าถัดไป →"}</button></div>`}
    </div>`;
    bindExam(p, practice, listeningLive);
    if (ex.ends) { tick(); timerId = setInterval(tick, 1000); }
  }
  function pageMin() { return ex.phase === "reading" && ex.mode === "full" ? ex.pages.findIndex((p) => p.sec === "R") : 0; }
  function pageMax() { return ex.pages.length - 1; }
  function tick() {
    const left = Math.max(0, ex.ends - Date.now());
    const el = $("#timer");
    if (el) { const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60; el.textContent = `${m}:${String(s).padStart(2, "0")}`; el.classList.toggle("low", left < 5 * 60000); }
    if (left <= 0) { clearInterval(timerId); if (ex && ex.phase !== "done") finishExam(); }
  }
  function previewHTML() {
    const nxt = ex.pages[ex.page + 1];
    if (!nxt || nxt.sec !== "L" || nxt.part < 3) return "";
    return `<div class="panel preview" style="margin-top:18px"><span class="eyebrow">อ่านล่วงหน้า: ข้อ ${nxt.qs[0]}-${nxt.qs[2]}</span>${nxt.items[0].questions.map((x) => `<p class="small"><b>${x.q}.</b> ${esc(x.text)}</p>`).join("")}</div>`;
  }

  function optsHTML(q, { showText, practice }) {
    const item = Q[q];
    const perm = ex.perm[q];
    const chosen = ex.answers[q];
    const reveal = practice && chosen != null;
    return `<div class="opts ${showText ? "" : "inline"}">${perm.map((o, k) => {
      const cls = reveal ? (o === item.ansI ? "right" : o === chosen ? "wrong" : "") : "";
      return `<button class="opt ${cls}" data-q="${q}" data-o="${o}" aria-pressed="${chosen === o}" aria-label="ข้อ ${q} ตัวเลือก ${LET[k]}"><span class="bub">${LET[k]}</span>${showText ? `<span>${esc(item.opts[o])}</span>` : ""}</button>`;
    }).join("")}</div>${reveal && item.ex ? `<p class="ex">${esc(item.ex)}</p>` : ""}`;
  }
  function graphicHTML(g) {
    if (!g) return "";
    if (g.type === "table") return `<div class="graphic"><div class="gt">${esc(g.title)}</div><table><tr>${g.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>${g.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
    const max = Math.max(...g.items.map((x) => x[1]));
    return `<div class="graphic"><div class="gt">${esc(g.title)}</div><div class="gbars">${g.items.map((x) => `<div class="gbar"><b>${esc(x[0])}</b><span style="width:${x[1] / max * 100}%"></span><em>${x[1]}</em></div>`).join("")}</div></div>`;
  }
  function scriptHTML(it) {
    if (it.part === 1) return `<div class="script">${it.opts.map((o, i) => `<span>(${LET[ex.perm[it.q].indexOf(i)]}) ${esc(o)}</span>`).join("")}</div>`;
    if (it.part === 2) return `<div class="script"><span><b>${it.spk[0]}:</b> ${esc(it.prompt)}</span>${it.opts.map((o, i) => `<span>(${LET[ex.perm[it.q].indexOf(i)]}) ${esc(o)}</span>`).join("")}</div>`;
    if (it.part === 3) return `<div class="script">${it.script.map((l) => `<span><b>${l[0] === "M2" ? "M2" : l[0]}:</b> ${esc(l[1])}</span>`).join("")}</div>`;
    return `<div class="script">${it.script.map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
  }
  function pageHTML(p, { practice, live }) {
    const it = p.items[0];
    const allAnswered = p.qs.every((q) => ex.answers[q] != null);
    const play = practice && p.sec === "L" ? `<div class="row"><button class="btn primary" id="playBtn">▶ ฟังเสียง</button><button class="btn" id="stopBtn">หยุด</button></div>` : "";
    const transcript = practice && p.sec === "L" ? (allAnswered || ex.revealed[p.i] ? `<details class="panel" open><summary><b>บทพูด (Transcript)</b></summary>${scriptHTML(it)}</details>` : `<button class="btn ghost small" id="showTr">แสดงบทพูด</button>`) : "";
    if (p.part === 1) return `<div class="stack">${play}${SCENES.svg(it.scene, "ภาพข้อ " + it.q)}<div class="qblock"><div class="qtext"><span class="qnum">${it.q}.</span><span class="muted">${live ? "ฟังประโยค A-D แล้วเลือกข้อที่บรรยายภาพได้ถูกต้อง" : "เลือกประโยคที่บรรยายภาพได้ถูกต้อง"}</span></div>${optsHTML(it.q, { showText: false, practice })}</div>${transcript}</div>`;
    if (p.part === 2) return `<div class="stack">${play}<div class="qblock"><div class="qtext"><span class="qnum">${it.q}.</span><span class="muted">Mark your answer on your answer sheet.</span></div>${optsHTML(it.q, { showText: false, practice })}</div>${transcript}</div>`;
    if (p.part === 3 || p.part === 4) return `<div class="stack">${play}${graphicHTML(it.graphic)}<div class="panel">${it.questions.map((x) => `<div class="qblock"><div class="qtext"><span class="qnum">${x.q}.</span><span>${esc(x.text)}</span></div>${optsHTML(x.q, { showText: true, practice })}</div>`).join("")}</div>${transcript}</div>`;
    if (p.part === 5) return `<div class="panel">${p.items.map((x) => `<div class="qblock"><div class="qtext"><span class="qnum">${x.q}.</span><span>${esc(x.text)}</span></div>${optsHTML(x.q, { showText: true, practice })}</div>`).join("")}</div>`;
    if (p.part === 6) {
      const html = it.passage.replace(/\[(\d{3})\]/g, (_, n) => `<span class="blank">${n}</span>`);
      return `<div><div class="passage"><span class="ptitle">${esc(it.title)} · Questions ${it.qs[0]}-${it.qs[3]}</span>${html}</div></div>
        <div class="panel">${it.questions.map((x) => `<div class="qblock"><div class="qtext"><span class="qnum">${x.q}.</span></div>${optsHTML(x.q, { showText: true, practice })}</div>`).join("")}</div>`;
    }
    return `<div>${it.passages.map((ps) => `<div class="passage"><span class="ptitle">${esc(ps.title)}</span>${ps.html}</div>`).join("")}</div>
      <div class="panel"><span class="eyebrow">Questions ${it.qs[0]}-${it.qs[it.qs.length - 1]}</span>${it.questions.map((x) => `<div class="qblock"><div class="qtext"><span class="qnum">${x.q}.</span><span>${esc(x.text)}</span></div>${optsHTML(x.q, { showText: true, practice })}</div>`).join("")}</div>`;
  }

  function bindExam(p, practice, live) {
    $$(".opt").forEach((b) => b.onclick = () => {
      const q = +b.dataset.q, o = +b.dataset.o;
      if (practice && ex.answers[q] != null) return;
      ex.answers[q] = o;
      if (practice) { renderExamKeepScroll(); return; }
      $$(`.opt[data-q="${q}"]`).forEach((x) => x.setAttribute("aria-pressed", String(+x.dataset.o === o)));
      const c = $(".exam-bar .muted.small[style]"); if (c) c.textContent = `ตอบแล้ว ${Object.keys(ex.answers).length}/${ex.pages.reduce((s, x) => s + x.qs.length, 0)}`;
      const sb = $(`#drawer [data-jq="${q}"]`); if (sb) sb.classList.add("ans");
    });
    const pb = $("#pauseBtn");
    if (pb) pb.onclick = () => { if (Runner.paused) { Runner.resume(); pb.textContent = "พักเสียง"; } else { Runner.pause(); pb.textContent = "เล่นต่อ"; } };
    const qb = $("#quitBtn"); if (qb) qb.onclick = () => { Speech.cancel(); ex = null; renderSim(); };
    const fb = $("#finishBtn"); if (fb) fb.onclick = () => askConfirm();
    const sh = $("#sheetBtn"); if (sh) sh.onclick = () => toggleSheet(live);
    const pv = $("#prevPg"); if (pv) pv.onclick = () => { Speech.cancel(); ex.page--; renderExam(); window.scrollTo(0, 0); };
    const nx = $("#nextPg"); if (nx) nx.onclick = () => {
      Speech.cancel();
      if (ex.page < pageMax()) { ex.page++; renderExam(); window.scrollTo(0, 0); }
      else if (practice) finishExam(); else askConfirm();
    };
    const play = $("#playBtn");
    if (play) play.onclick = async () => {
      Speech.cancel();
      const steps = stepsForPage(p, ex.page).filter((s) => s.say);
      for (const s of steps) { if (!$("#playBtn")) return; await Speech.say(s.say, s.role); }
    };
    const st = $("#stopBtn"); if (st) st.onclick = () => Speech.cancel();
    const tr = $("#showTr"); if (tr) tr.onclick = () => { ex.revealed[p.i] = true; renderExamKeepScroll(); };
  }
  function renderExamKeepScroll() { const y = window.scrollY; renderExam(); window.scrollTo(0, y); }
  function askConfirm() {
    const box = $("#confirm");
    const totalQ = ex.pages.reduce((s, x) => s + x.qs.length, 0);
    const left = totalQ - Object.keys(ex.answers).length;
    box.innerHTML = `<div class="notice row" style="margin-top:12px"><span>${left ? `ยังไม่ได้ตอบ ${left} ข้อ (ข้อสอบจริงไม่มีหักคะแนน ควรเดาให้ครบ) ` : ""}ส่งข้อสอบเลยไหม?</span><button class="btn primary" id="yesFinish">ส่งข้อสอบ</button><button class="btn" id="noFinish">ทำต่อ</button></div>`;
    $("#yesFinish").onclick = () => finishExam();
    $("#noFinish").onclick = () => { box.innerHTML = ""; };
  }
  function toggleSheet(live) {
    const d = $("#drawer");
    d.hidden = !d.hidden;
    if (d.hidden) return;
    const qs = ex.pages.flatMap((p) => p.qs);
    const cur = new Set(ex.pages[ex.page].qs);
    d.innerHTML = `<div class="panel"><p class="muted small" style="margin-bottom:8px">${live ? "ระหว่าง Listening ข้ามข้อไม่ได้ ดูได้อย่างเดียว" : "กดหมายเลขเพื่อไปยังข้อนั้น"}</p><div class="sheet">${qs.map((q) => `<button data-jq="${q}" class="${ex.answers[q] != null ? "ans" : ""} ${cur.has(q) ? "cur" : ""}" ${live ? "disabled" : ""}>${q}</button>`).join("")}</div></div>`;
    if (!live) $$("[data-jq]", d).forEach((b) => b.onclick = () => {
      const q = +b.dataset.jq;
      const pi = ex.pages.findIndex((p) => p.qs.includes(q));
      if (pi < pageMin()) return;
      ex.page = pi; renderExam(); window.scrollTo(0, 0);
    });
  }

  function finishExam() {
    Runner.stop(); clearInterval(timerId);
    const qs = ex.pages.flatMap((p) => p.qs);
    const per = {};
    qs.forEach((q) => { const p = partOf(q); per[p] = per[p] || { c: 0, n: 0 }; per[p].n++; if (ex.answers[q] === Q[q].ansI) per[p].c++; });
    const rawL = [1, 2, 3, 4].reduce((s, p) => s + (per[p] ? per[p].c : 0), 0);
    const rawR = [5, 6, 7].reduce((s, p) => s + (per[p] ? per[p].c : 0), 0);
    const hasL = [1, 2, 3, 4].every((p) => per[p]), hasR = [5, 6, 7].every((p) => per[p]);
    ex.result = { per, rawL, rawR, L: hasL ? scaleL(rawL) : null, R: hasR ? scaleR(rawR) : null };
    ex.phase = "done";
    if (ex.mode !== "practice") {
      const h = store.get("history", []);
      h.push({ t: Date.now(), mode: { full: "เต็มชุด", listening: "Listening", reading: "Reading" }[ex.mode], L: ex.result.L, R: ex.result.R });
      store.set("history", h.slice(-30));
    }
    ex.filter = "wrong";
    if (onSim()) { renderResult(); window.scrollTo(0, 0); }
  }
  function renderResult() {
    const r = ex.result;
    const qs = ex.pages.flatMap((p) => p.qs);
    const wrong = qs.filter((q) => ex.answers[q] !== Q[q].ansI);
    const shown = ex.filter === "wrong" ? wrong : qs;
    const PN = { 1: "รูปภาพ", 2: "ถาม-ตอบ", 3: "บทสนทนา", 4: "พูดคนเดียว", 5: "เติมประโยค", 6: "เติมข้อความ", 7: "อ่านจับใจความ" };
    view.innerHTML = `<div class="wrap stack">
      <div class="stack" style="gap:6px"><span class="eyebrow">ผลสอบ</span><h2>${ex.mode === "practice" ? `ฝึก Part ${ex.part}: ถูก ${qs.length - wrong.length}/${qs.length} ข้อ` : "คะแนนโดยประมาณ"}</h2></div>
      ${ex.mode !== "practice" ? `<div class="score">
        ${r.L != null ? `<div class="panel"><span class="eyebrow">Listening</span><b>${r.L}</b><span class="muted small">ถูก ${r.rawL}/100</span></div>` : ""}
        ${r.R != null ? `<div class="panel"><span class="eyebrow">Reading</span><b>${r.R}</b><span class="muted small">ถูก ${r.rawR}/100</span></div>` : ""}
        ${r.L != null && r.R != null ? `<div class="panel"><span class="eyebrow">รวม</span><b>${r.L + r.R}</b><span class="muted small">เต็ม 990</span></div>` : ""}
      </div><p class="muted small">คะแนนแปลงจากจำนวนข้อที่ถูกด้วยตารางประมาณการ คะแนนจริงของ ETS ปรับตามความยากของแต่ละชุด อาจต่างได้ ±30-50 คะแนน</p>` : ""}
      <div class="panel stack" style="gap:8px"><h3>แยกตามพาร์ต</h3>${Object.keys(r.per).map((p) => { const x = r.per[p]; const pc = x.c / x.n * 100; return `<div class="partrow"><span>Part ${p}</span><div class="bar ${pc >= 70 ? "g" : ""}" title="${PN[p]}"><i style="width:${pc}%"></i></div><em>${x.c}/${x.n}</em></div>`; }).join("")}</div>
      <div class="row"><button class="chip" id="fWrong" aria-pressed="${ex.filter === "wrong"}">เฉพาะข้อผิด (${wrong.length})</button><button class="chip" id="fAll" aria-pressed="${ex.filter === "all"}">ทุกข้อ</button>
        <span style="margin-left:auto" class="row"><button class="btn" id="again">ทำใหม่</button><button class="btn primary" id="home">กลับหน้า Simulator</button></span></div>
      <div class="stack">${reviewHTML(shown)}</div></div>`;
    $("#fWrong").onclick = () => { ex.filter = "wrong"; renderResult(); };
    $("#fAll").onclick = () => { ex.filter = "all"; renderResult(); };
    $("#home").onclick = () => { ex = null; renderSim(); };
    $("#again").onclick = () => { const m = ex.mode, p = ex.part; ex = null; startExam(m, p); };
  }
  function reviewHTML(qs) {
    if (!qs.length) return `<div class="panel">ไม่มีข้อผิดเลย เยี่ยมมาก</div>`;
    const seen = new Set();
    return qs.map((q) => {
      const x = Q[q], it = x.item;
      const mine = ex.answers[q];
      const letter = (o) => o == null ? "—" : LET[ex.perm[q].indexOf(o)];
      let ctx = "";
      if (!seen.has(it)) {
        seen.add(it);
        if (it.part === 1) ctx = SCENES.svg(it.scene, "ภาพข้อ " + it.q);
        if (it.part <= 4) ctx += `<details><summary class="small">บทพูด</summary>${scriptHTML(it)}</details>${graphicHTML(it.graphic)}`;
        if (it.part === 6) ctx = `<details><summary class="small">ดูบทความ</summary><div class="passage">${it.passage.replace(/\[(\d{3})\]/g, (_, n) => `<span class="blank">${n}</span>`)}</div></details>`;
        if (it.part === 7) ctx = `<details><summary class="small">ดูบทความ</summary>${it.passages.map((ps) => `<div class="passage"><span class="ptitle">${esc(ps.title)}</span>${ps.html}</div>`).join("")}</details>`;
      }
      const text = x.text || (it.part === 2 ? it.prompt : it.part === 1 ? "Picture" : "");
      return `<div class="panel stack" style="gap:8px">${ctx}
        <div class="qtext"><span class="qnum">${q}.</span><span>${esc(text)}</span></div>
        <div class="opts">${ex.perm[q].map((o, k) => `<div class="opt ${o === x.ansI ? "right" : o === mine ? "wrong" : ""}"><span class="bub">${LET[k]}</span><span>${esc(x.opts[o])}</span></div>`).join("")}</div>
        <p class="small">คุณตอบ <b>${letter(mine)}</b> · เฉลย <b>${letter(x.ansI)}</b></p>${x.ex ? `<p class="ex">${esc(x.ex)}</p>` : ""}</div>`;
    }).join("");
  }

  /* ================= TIPS ================= */
  function renderTips() {
    view.innerHTML = `<div class="wrap stack">
      <div class="stack" style="gap:6px"><span class="eyebrow">เทคนิคในห้องสอบ</span><h2>ทุกพาร์ต ทุกกับดัก</h2></div>
      <div class="tips">${TECHNIQUES.map((t) => `<div class="panel" id="tip-${t.id}"><h3>${esc(t.title)}</h3><ul>${t.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="panel stack" style="gap:6px"><h3>แหล่งข้อสอบอย่างเป็นทางการ</h3>
        <p class="small">ข้อสอบ TOEIC จริงเป็นลิขสิทธิ์ของ ETS และไม่มีการเผยแพร่ชุดที่ใช้สอบจริง แหล่งที่ใกล้เคียงของจริงที่สุดคือข้อสอบตัวอย่างจาก ETS เอง:</p>
        <ul class="small"><li><a href="https://www.ets.org/toeic/test-takers/about/listening-reading.html" target="_blank" rel="noopener">ETS: TOEIC Listening & Reading (ข้อมูลและตัวอย่างข้อสอบ)</a></li>
        <li>หนังสือ ETS TOEIC Official Test-Preparation Guide / ETS TOEIC 정기시험 기출문제집 (เกาหลี) ซึ่งเป็นข้อสอบชุดที่ ETS เคยใช้จริง หาซื้อได้ตามร้านหนังสือ</li></ul></div></div>`;
  }

  /* ---------------- boot ---------------- */
  function refreshView() {
    const name = (location.hash || "#plan").slice(1);
    if (name === "sim" && ex) return; // never disturb an exam in progress
    if (name === "tips") return;
    const y = window.scrollY;
    const open = $$("details.day[open]").map((d) => d.dataset.day);
    (ROUTES[name] || renderPlan)();
    open.forEach((d) => { const el = $(`details.day[data-day="${d}"]`); if (el) el.open = true; });
    window.scrollTo(0, y);
  }

  updateDday();
  route();
  Cloud.init();
})();
