// Grammar lessons referenced by the study plan. Blocks: {h, list} or {h, head, rows}. Quiz answers are option indexes.
window.GRAMMAR = [
{ id: "wordform", title: "ชนิดของคำและคำลงท้าย", days: [1, 14],
  intro: "Part 5 ถามชนิดของคำบ่อยที่สุด ถ้าตัวเลือกทั้ง 4 ตัวเป็นรากศัพท์เดียวกัน (decide / decision / decisive / decisively) ไม่ต้องแปลประโยค ให้ดูแค่ว่าช่องว่างต้องการคำชนิดไหน",
  blocks: [
  { h: "ดูตำแหน่งช่องว่าง แล้วรู้ชนิดของคำ", head: ["ตำแหน่ง", "ต้องการ", "ตัวอย่าง"], rows: [
    ["หลัง a / an / the / my / your / this", "นาม (noun)", "the ___ of the plan → decision"],
    ["หลังคำบุพบท (in, of, for, by...)", "นาม หรือ V-ing", "for the ___ → approval"],
    ["หน้าคำนาม", "คุณศัพท์ (adjective)", "a ___ report → detailed"],
    ["หลัง be / become / seem / remain", "คุณศัพท์", "The room is ___ → available"],
    ["ขยายกริยา คุณศัพท์ หรือทั้งประโยค", "กริยาวิเศษณ์ (adverb)", "work ___ → efficiently"],
    ["ระหว่าง be กับ V3 / V-ing", "กริยาวิเศษณ์", "was ___ approved → quickly"],
    ["หลังประธาน ยังไม่มีกริยา", "กริยา (verb)", "The manager ___ the plan → approved"]] },
  { h: "คำลงท้ายบอกชนิดของคำ", head: ["ชนิด", "คำลงท้าย", "ตัวอย่าง"], rows: [
    ["นาม (สิ่ง/การกระทำ)", "-tion, -sion, -ment, -ness, -ity, -ance, -ence, -al", "information, payment, approval"],
    ["นาม (คน)", "-er, -or, -ee, -ant, -ist", "employer, supervisor, trainee, applicant"],
    ["คุณศัพท์", "-ive, -able, -ible, -ful, -ous, -al, -ic, -ent, -ant", "effective, reliable, careful, financial"],
    ["กริยา", "-ize, -ify, -ate, -en", "finalize, notify, evaluate, shorten"],
    ["กริยาวิเศษณ์", "-ly (ส่วนใหญ่)", "quickly, carefully, recently"]] },
  { h: "กับดักที่ออกบ่อย", list: [
    "คำลงท้าย -ly บางคำเป็นคุณศัพท์: friendly, costly, timely, likely, orderly → \"a friendly staff\"",
    "-al เป็นได้ทั้งนาม (approval, arrival, proposal) และคุณศัพท์ (financial, additional)",
    "-ive เป็นคุณศัพท์เกือบทุกคำ แต่ representative, objective, alternative เป็นนามได้",
    "คนกับสิ่ง: \"an ___ for the job\" ต้องเป็นคน (applicant) ไม่ใช่ application"] },
  { h: "ตาราง word family ที่ออกบ่อย", head: ["กริยา", "นาม", "คุณศัพท์", "กริยาวิเศษณ์"], rows: [
    ["decide", "decision", "decisive", "decisively"], ["succeed", "success", "successful", "successfully"],
    ["compete", "competition / competitor", "competitive", "competitively"], ["produce", "product / production", "productive", "productively"],
    ["rely", "reliability", "reliable", "reliably"], ["-", "efficiency", "efficient", "efficiently"],
    ["expand", "expansion", "expansive", "-"], ["consider", "consideration", "considerable / considerate", "considerably"],
    ["respond", "response", "responsive", "responsively"], ["apply", "application / applicant", "applicable", "-"]] }],
  quiz: [
  { text: "The new manager made a quick ------- about the budget.", opts: ["decide", "decision", "decisive", "decisively"], ans: 1, ex: "หลัง a quick (คุณศัพท์) ต้องเป็นนาม" },
  { text: "Please read the instructions ------- before using the machine.", opts: ["careful", "care", "carefully", "caring"], ans: 2, ex: "ขยายกริยา read → กริยาวิเศษณ์" },
  { text: "Ms. Ito is a highly ------- employee.", opts: ["rely", "reliable", "reliably", "reliability"], ans: 1, ex: "หน้านาม employee ต้องเป็นคุณศัพท์ (highly ขยาย reliable อีกที)" },
  { text: "The staff at the hotel were very -------.", opts: ["friend", "friendly", "friendship", "friendliness"], ans: 1, ex: "หลัง be + very ต้องเป็นคุณศัพท์ friendly (ลงท้าย -ly แต่เป็นคุณศัพท์)" }] },

{ id: "tense", title: "Tense ที่ออกสอบ", days: [2],
  intro: "TOEIC ไม่ได้ถามทั้ง 12 tense เท่ากัน ส่วนใหญ่ตัดสินจากคำบอกเวลาในประโยค หาคำบอกเวลาให้เจอก่อน แล้วเลือก tense ที่เข้าคู่กัน",
  blocks: [
  { h: "คำบอกเวลา → tense", head: ["คำบอกเวลา", "Tense", "ตัวอย่าง"], rows: [
    ["every day, usually, always, often", "Present Simple (V1 / V-s)", "The store opens at 9 every day."],
    ["now, currently, at the moment, this week", "Present Continuous (is/are + V-ing)", "We are currently reviewing applications."],
    ["yesterday, last month, ago, in 2023", "Past Simple (V2)", "The order arrived two days ago."],
    ["since, for + ระยะเวลา, already, yet, recently, so far", "Present Perfect (has/have + V3)", "She has worked here since 2020."],
    ["tomorrow, next week, soon, upcoming", "Future (will + V1 / be going to)", "The results will be announced next week."],
    ["by the time + อดีต, before + อดีต", "Past Perfect (had + V3)", "The meeting had started when I arrived."],
    ["by + เวลาในอนาคต, by the end of next year", "Future Perfect (will have + V3)", "By June, we will have hired 50 people."]] },
  { h: "กฎสำคัญ", list: [
    "ประโยค when / if / before / after / as soon as ที่พูดถึงอนาคต ใช้ Present Simple ไม่ใช้ will: \"When the shipment arrives, we will call you.\"",
    "ประธานเอกพจน์ + Present Simple ต้องเติม -s: \"The manager approves...\"",
    "ประธานคือคำแรกก่อนวลีขยาย: \"The list of names IS ready\" (ประธานคือ list ไม่ใช่ names)",
    "each / every / everyone / the number of → เอกพจน์ ส่วน a number of → พหูพจน์"] }],
  quiz: [
  { text: "Mr. Lee ------- for the company since 2018.", opts: ["works", "worked", "has worked", "will work"], ans: 2, ex: "since + จุดเวลา → Present Perfect" },
  { text: "The new branch ------- next spring.", opts: ["opened", "will open", "has opened", "opening"], ans: 1, ex: "next spring = อนาคต" },
  { text: "When the report -------, please send it to me.", opts: ["will finish", "is finished", "finished", "has finish"], ans: 1, ex: "ประโยค when ที่พูดถึงอนาคตใช้ Present Simple (ในที่นี้เป็น passive: is finished)" },
  { text: "The number of applicants ------- increased this year.", opts: ["have", "has", "are", "were"], ans: 1, ex: "the number of → ประธานเอกพจน์ → has" }] },

{ id: "prepconj", title: "Preposition vs Conjunction", days: [4],
  intro: "ตัวเลือกที่ความหมายเหมือนกันแต่ใช้ต่างกัน (despite / although) ตัดสินจากสิ่งที่ตามหลังช่องว่าง: คำนามหรือวลีคำนาม → preposition, ประโยคที่มีประธานและกริยา → conjunction",
  blocks: [
  { h: "คู่ความหมายเดียวกัน", head: ["ความหมาย", "+ คำนาม (preposition)", "+ ประโยค (conjunction)"], rows: [
    ["แม้ว่า", "despite, in spite of, notwithstanding", "although, even though, though"],
    ["เพราะ", "because of, due to, owing to", "because, since, as"],
    ["ระหว่าง / ขณะที่", "during", "while"],
    ["ก่อน / หลัง", "prior to, before, after (+ นาม/V-ing)", "before, after (+ ประโยค)"],
    ["ถ้า / เว้นแต่", "in case of, without", "if, unless, provided that, as long as"],
    ["เพื่อ", "for, in order to (+ V1)", "so that, in order that"]] },
  { h: "กับดัก", list: [
    "V-ing นับเป็นคำนาม: \"Despite working late, he...\" ใช้ despite ได้",
    "however / therefore ไม่ใช่ conjunction เชื่อมสองประโยคด้วยคอมมาเดียวไม่ได้ ต้องใช้ ; หรือขึ้นประโยคใหม่",
    "คู่คำเชื่อม: both A and B, either A or B, neither A nor B, not only A but also B, whether A or B"] }],
  quiz: [
  { text: "------- the bad weather, the flight left on time.", opts: ["Although", "Despite", "Because", "While"], ans: 1, ex: "the bad weather เป็นวลีคำนาม → Despite" },
  { text: "------- sales increased, profits fell.", opts: ["Despite", "Due to", "Although", "During"], ans: 2, ex: "sales increased เป็นประโยค และความหมายขัดแย้ง → Although" },
  { text: "No calls are allowed ------- the presentation.", opts: ["while", "during", "when", "as"], ans: 1, ex: "the presentation เป็นคำนาม → during" },
  { text: "The event was canceled ------- a lack of interest.", opts: ["because", "since", "due to", "so that"], ans: 2, ex: "a lack of interest เป็นคำนาม → due to" }] },

{ id: "relative", title: "Relative pronoun", days: [5],
  intro: "ใช้เชื่อมคำนามกับประโยคที่ขยายมัน ดูว่าคำนามข้างหน้าเป็นคนหรือสิ่งของ และช่องว่างทำหน้าที่ประธาน กรรม หรือแสดงความเป็นเจ้าของ",
  blocks: [
  { h: "เลือกให้ถูก", head: ["คำ", "ใช้กับ", "ตัวอย่าง"], rows: [
    ["who", "คน (ทำหน้าที่ประธาน)", "Employees who finish early may leave."],
    ["whom", "คน (ทำหน้าที่กรรม) มักตามหลังบุพบท", "The person to whom I spoke was helpful."],
    ["which", "สิ่งของ / ใช้หลังคอมมาได้", "The report, which was due Monday, is late."],
    ["that", "คนหรือสิ่งของ แต่ห้ามใช้หลังคอมมาและหลังบุพบท", "The car that I rented was new."],
    ["whose", "ของใคร (ตามด้วยคำนามเสมอ)", "The client whose order was late called."],
    ["where / when", "สถานที่ / เวลา (ตามด้วยประโยคสมบูรณ์)", "the office where I work"]] },
  { h: "จุดสังเกต", list: [
    "ถ้าหลังช่องว่างมีคำนามทันที (___ order, ___ name) → whose",
    "ถ้าหลังช่องว่างเป็นกริยาเลย (___ works) → who / which / that (ทำหน้าที่ประธาน)",
    "what = the thing that ไม่มีคำนามนำหน้า: \"This is what we need.\"",
    "กริยาหลัง who/which/that ผันตามคำนามข้างหน้า: \"customers who ARE...\""] }],
  quiz: [
  { text: "Applicants ------- résumés are incomplete will not be considered.", opts: ["who", "whose", "which", "whom"], ans: 1, ex: "ตามด้วยคำนาม résumés → whose" },
  { text: "The new printer, ------- was installed yesterday, is very fast.", opts: ["that", "what", "which", "who"], ans: 2, ex: "สิ่งของ หลังคอมมา → which" },
  { text: "Ms. Diaz is the consultant ------- we hired last year.", opts: ["whom", "whose", "which", "what"], ans: 0, ex: "คน ทำหน้าที่กรรมของ hired → whom (หรือ that)" }] },

{ id: "compger", title: "ขั้นกว่า ขั้นสุด และ Gerund / Infinitive", days: [6],
  intro: "สองหัวข้อนี้ดูจากคำรอบข้างช่องว่างได้ทันที: than → ขั้นกว่า, the + ...of/in → ขั้นสุด, กริยาข้างหน้าบอกว่าต้องตามด้วย -ing หรือ to + V1",
  blocks: [
  { h: "การเปรียบเทียบ", list: [
    "ขั้นกว่า: -er / more + adj. + than → \"faster than\", \"more efficient than\"",
    "ขั้นสุด: the + -est / the most → \"the most reliable supplier\"",
    "ขยายขั้นกว่าด้วย much, far, even, a lot, significantly (ห้ามใช้ very)",
    "as + adj./adv. (ขั้นปกติ) + as → \"as soon as possible\"",
    "ขั้นกว่า 2 ส่วน: The more you practice, the better you get."] },
  { h: "กริยาที่ตามด้วย V-ing", list: [
    "enjoy, finish, avoid, consider, suggest, recommend, mind, postpone, keep, deny, include",
    "หลังบุพบททุกตัว: interested in -ing, before -ing, look forward to -ing, be committed to -ing, be used to -ing"] },
  { h: "กริยาที่ตามด้วย to + V1", list: [
    "want, plan, decide, agree, hope, expect, refuse, offer, promise, need, aim, intend, fail",
    "รูป passive: be asked to, be required to, be expected to, be encouraged to, be allowed to",
    "คุณศัพท์ + to: be able to, be eager to, be likely to, be pleased to"] }],
  quiz: [
  { text: "This model is ------- cheaper than the previous one.", opts: ["very", "much", "most", "more"], ans: 1, ex: "ขยายขั้นกว่า cheaper ใช้ much" },
  { text: "We look forward to ------- you at the conference.", opts: ["see", "seeing", "saw", "be seen"], ans: 1, ex: "look forward to + V-ing (to ตรงนี้เป็นบุพบท)" },
  { text: "The company plans ------- a new branch in Osaka.", opts: ["opening", "opened", "to open", "opens"], ans: 2, ex: "plan + to V1" },
  { text: "This is ------- product we have ever made.", opts: ["the most popular", "more popular", "most popular than", "popular"], ans: 0, ex: "ever made → ขั้นสุด the most" }] },

{ id: "ifpart", title: "If-clause และ Participle", days: [8],
  intro: "If-clause ดูจากกริยาอีกครึ่งประโยค ส่วน -ing / -ed ดูว่าคำนามเป็นผู้ทำหรือผู้ถูกกระทำ",
  blocks: [
  { h: "If-clause 3 แบบ", head: ["แบบ", "ประโยค if", "ประโยคหลัก"], rows: [
    ["1 (เป็นไปได้จริง)", "If + V1 / V-s", "will / can / may + V1"],
    ["2 (สมมติปัจจุบัน)", "If + V2 (be → were)", "would / could + V1"],
    ["3 (สมมติอดีต)", "If + had + V3", "would / could + have + V3"],
    ["ประโยคคำสั่ง", "If + V1 / V-s", "Please + V1 / V1 (คำสั่ง)"]] },
  { h: "Inversion (ละ if) ที่ออกใน TOEIC", list: [
    "Should you have any questions, ... = If you should have any questions, ...",
    "Had we known, ... = If we had known, ...",
    "Were it not for ... = If it were not for ..."] },
  { h: "-ing vs -ed", list: [
    "-ing = ผู้ทำ / ทำให้รู้สึก: an exciting offer, the remaining items, a leading company",
    "-ed = ผู้ถูกกระทำ / รู้สึก: an excited customer, the attached file, a revised schedule",
    "คำออกบ่อย: attached, enclosed, revised, updated, detailed, experienced, qualified, limited, preferred, existing, upcoming, outstanding",
    "วลีขยาย: \"Employees wishing to attend...\" (= who wish), \"Products made in Japan...\" (= which are made)"] }],
  quiz: [
  { text: "If the client ------- the contract today, we will start next week.", opts: ["signs", "will sign", "signed", "had signed"], ans: 0, ex: "ประโยคหลัก will start → แบบ 1 → If + V-s" },
  { text: "------- you have any questions, please contact us.", opts: ["If only", "Should", "Unless", "Had"], ans: 1, ex: "Inversion: Should you have = If you have" },
  { text: "Please review the ------- document before the meeting.", opts: ["attach", "attaching", "attached", "attachment"], ans: 2, ex: "เอกสารถูกแนบ → attached" },
  { text: "Only ------- candidates will be invited to an interview.", opts: ["qualify", "qualified", "qualifying", "qualification"], ans: 1, ex: "ผู้สมัครที่มีคุณสมบัติ → qualified" }] },

{ id: "connector", title: "คำเชื่อมระหว่างประโยค (Part 6)", days: [9],
  intro: "Part 6 มักถามคำเชื่อมที่ขึ้นต้นประโยคแล้วตามด้วยคอมมา ต้องอ่านประโยคก่อนหน้าเพื่อดูความสัมพันธ์ ไวยากรณ์อย่างเดียวช่วยไม่ได้",
  blocks: [
  { h: "จัดกลุ่มตามความหมาย", head: ["ความสัมพันธ์", "คำเชื่อม"], rows: [
    ["เพิ่มเติม", "In addition, Moreover, Furthermore, Also, Besides"],
    ["ขัดแย้ง", "However, Nevertheless, Nonetheless, On the other hand, Even so"],
    ["ผลลัพธ์", "Therefore, As a result, Consequently, Thus, Accordingly"],
    ["ยกตัวอย่าง", "For example, For instance, In particular"],
    ["ลำดับเวลา", "First, Then, Afterward, Meanwhile, Finally, In the meantime"],
    ["แทนที่ / ทางเลือก", "Instead, Otherwise, Alternatively"],
    ["สรุป / เน้น", "In short, In fact, Indeed, In other words"]] },
  { h: "วิธีทำ", list: [
    "อ่านประโยคก่อนช่องว่าง แล้วถามว่าประโยคถัดไป เพิ่ม ขัด หรือเป็นผล",
    "Otherwise = ไม่อย่างนั้น ใช้หลังคำแนะนำ: \"Book early. Otherwise, seats may sell out.\"",
    "In the meantime / Meanwhile = ระหว่างรอ ใช้เมื่อมีเหตุการณ์ที่ยังไม่เกิด"] }],
  quiz: [
  { text: "The printer is broken. -------, we will use the one in the lobby.", opts: ["However", "In the meantime", "For example", "Moreover"], ans: 1, ex: "ระหว่างรอซ่อม → In the meantime" },
  { text: "Sales rose sharply this year. -------, the company will hire more staff.", opts: ["As a result", "However", "Instead", "Otherwise"], ans: 0, ex: "ผลลัพธ์ → As a result" },
  { text: "The hotel is close to the airport. -------, it offers a free shuttle.", opts: ["Nevertheless", "In addition", "Instead", "Otherwise"], ans: 1, ex: "ข้อดีเพิ่มเติม → In addition" }] },

{ id: "voice", title: "Active / Passive และ Subject-Verb Agreement", days: [3, 4],
  intro: "ถ้าตัวเลือกเป็นกริยาหลายรูป ให้เช็ก 3 อย่าง: tense, ประธานเอกพจน์หรือพหูพจน์, และประธานเป็นผู้ทำหรือผู้ถูกกระทำ",
  blocks: [
  { h: "หลักการ", list: [
    "Passive = be + V3 ใช้เมื่อประธานถูกกระทำ: \"The report was submitted.\"",
    "สังเกต: มีกรรมตามหลังช่องว่าง → active, ไม่มีกรรม หรือมี by → passive",
    "กริยาที่ไม่มีกรรม (arrive, occur, happen, rise, remain) ใช้ passive ไม่ได้",
    "Passive ของ tense ต่าง ๆ: is done / was done / has been done / will be done / is being done"] }],
  quiz: [
  { text: "All invoices must ------- by Friday.", opts: ["pay", "paying", "be paid", "have paid"], ans: 2, ex: "ใบแจ้งหนี้ถูกจ่าย และไม่มีกรรม → be paid" },
  { text: "The manager ------- the new policy at yesterday's meeting.", opts: ["was announced", "announced", "announcing", "is announced"], ans: 1, ex: "มีกรรม the new policy และ yesterday → announced" },
  { text: "Sales ------- by 20 percent last quarter.", opts: ["rose", "were risen", "raised", "were rising by"], ans: 0, ex: "rise ไม่มีกรรม ใช้ passive ไม่ได้ → rose" }] }
];
