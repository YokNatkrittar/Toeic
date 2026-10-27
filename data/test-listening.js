// Original TOEIC-style practice test (written for this site, not copied from ETS).
// Listening: Part 1 (1-6), Part 2 (7-31), Part 3 (32-70), Part 4 (71-100)
window.TEST = window.TEST || {};
window.TEST.listening = [
// ---------- PART 1 ----------
{ part: 1, q: 1, scene: "laptop", ans: "B", opts: [
  "She's drinking from a cup.", "She's using a laptop computer.", "She's arranging some files on a shelf.", "She's putting on her glasses."] },
{ part: 1, q: 2, scene: "box", ans: "D", opts: [
  "They're opening a box.", "They're loading a truck.", "One of the men is pointing at a sign.", "They're carrying a box together."] },
{ part: 1, q: 3, scene: "meetingroom", ans: "A", opts: [
  "Chairs have been arranged around a table.", "Some people are sitting at a table.", "A projector is being installed.", "Some windows are being cleaned."] },
{ part: 1, q: 4, scene: "watering", ans: "C", opts: [
  "He's planting a tree.", "He's mowing the lawn.", "He's watering some plants.", "He's picking some flowers."] },
{ part: 1, q: 5, scene: "bicycles", ans: "B", opts: [
  "Some people are riding bicycles.", "Bicycles are parked in a row.", "A bicycle is being repaired.", "The street is crowded with cars."] },
{ part: 1, q: 6, scene: "chart", ans: "A", opts: [
  "A woman is pointing at a chart.", "A woman is erasing a whiteboard.", "A woman is hanging a picture on a wall.", "A woman is writing a letter."] },

// ---------- PART 2 ----------
{ part: 2, q: 7, spk: ["W","M"], prompt: "Where is the staff meeting being held?", ans: "B", opts: ["At three o'clock.", "In Conference Room B.", "Yes, I met them yesterday."] },
{ part: 2, q: 8, spk: ["M","W"], prompt: "Who's responsible for ordering office supplies?", ans: "A", opts: ["Jenna in the admin office handles that.", "Some paper and pens.", "It was delivered yesterday."] },
{ part: 2, q: 9, spk: ["W","M"], prompt: "When will the new printer be installed?", ans: "C", opts: ["In the copy room.", "I printed it already.", "Sometime tomorrow morning."] },
{ part: 2, q: 10, spk: ["M","W"], prompt: "Why was the flight to Chicago delayed?", ans: "A", opts: ["Because of a storm.", "Gate twelve.", "It's a two-hour flight."] },
{ part: 2, q: 11, spk: ["W","M"], prompt: "Would you like me to send you the report?", ans: "B", opts: ["He reported it to the manager.", "Yes, that would be helpful.", "By the end of the week."] },
{ part: 2, q: 12, spk: ["M","W"], prompt: "Haven't you finished the budget proposal yet?", ans: "C", opts: ["The budget is limited.", "It's on the second floor.", "I'm almost done with it."] },
{ part: 2, q: 13, spk: ["W","M"], prompt: "How often does the airport shuttle run?", ans: "A", opts: ["Every fifteen minutes.", "About five dollars.", "To Terminal 2."] },
{ part: 2, q: 14, spk: ["M","W"], prompt: "Should we hire a caterer or prepare the food ourselves?", ans: "B", opts: ["The kitchen is on the left.", "Let's hire someone. We're too busy.", "Over a hundred guests."] },
{ part: 2, q: 15, spk: ["W","M"], prompt: "The marketing director is visiting next week, isn't she?", ans: "C", opts: ["The market opens at nine.", "I visited it last year.", "Yes, on Wednesday."] },
{ part: 2, q: 16, spk: ["M","W"], prompt: "Can you help me move these boxes?", ans: "A", opts: ["Sure, where do they go?", "A moving company.", "No, the box is empty."] },
{ part: 2, q: 17, spk: ["W","M"], prompt: "What time does the bank close today?", ans: "B", opts: ["At the corner of Main Street.", "I think it's four thirty.", "A savings account."] },
{ part: 2, q: 18, spk: ["M","W"], prompt: "Why don't we take a short break?", ans: "C", opts: ["It broke last week.", "Because it's too short.", "Good idea. I need some coffee."] },
{ part: 2, q: 19, spk: ["W","M"], prompt: "Who's going to lead the training session?", ans: "A", opts: ["Actually, it's been canceled.", "Next Monday at ten.", "In the training room."] },
{ part: 2, q: 20, spk: ["M","W"], prompt: "Is this seat taken?", ans: "B", opts: ["It takes about an hour.", "No, go ahead.", "I'll take two, please."] },
{ part: 2, q: 21, spk: ["W","M"], prompt: "Where can I find the user manual for this scanner?", ans: "C", opts: ["It's a manual process.", "He found it on the desk.", "It's available on our Web site."] },
{ part: 2, q: 22, spk: ["M","W"], prompt: "I'd like to return this jacket.", ans: "A", opts: ["Do you have your receipt?", "He returned on Monday.", "It's a little cold today."] },
{ part: 2, q: 23, spk: ["W","M"], prompt: "When is the deadline for the grant application?", ans: "B", opts: ["The application form.", "It was extended to Friday.", "Mr. Grant applied last year."] },
{ part: 2, q: 24, spk: ["M","W"], prompt: "Do you know if the café accepts credit cards?", ans: "A", opts: ["Only cash, I'm afraid.", "A cup of coffee, please.", "Yes, I accept the offer."] },
{ part: 2, q: 25, spk: ["W","M"], prompt: "Which supplier offered the lowest price?", ans: "C", opts: ["The price tags are on the shelf.", "Lower it a little more.", "We're still comparing the quotes."] },
{ part: 2, q: 26, spk: ["M","W"], prompt: "Why is the parking lot closed?", ans: "B", opts: ["Close to the entrance.", "It's being repaved.", "I parked on the street."] },
{ part: 2, q: 27, spk: ["W","M"], prompt: "Let's review the contract before the meeting.", ans: "A", opts: ["I've already printed copies.", "A two-year contract.", "The view is wonderful."] },
{ part: 2, q: 28, spk: ["M","W"], prompt: "How many people signed up for the workshop?", ans: "C", opts: ["In the main hall.", "Sign here, please.", "Over forty so far."] },
{ part: 2, q: 29, spk: ["W","M"], prompt: "Weren't the new uniforms supposed to arrive today?", ans: "B", opts: ["A form for new employees.", "The shipment was delayed.", "Yes, they're very uniform."] },
{ part: 2, q: 30, spk: ["M","W"], prompt: "Could you tell me how to get to the city museum?", ans: "A", opts: ["Take the number five bus.", "It's free on Sundays.", "I'll get it for you."] },
{ part: 2, q: 31, spk: ["W","M"], prompt: "I can't open the shared folder on the server.", ans: "C", opts: ["It opens at nine.", "A folder for the invoices.", "Did you ask IT to give you access?"] },

// ---------- PART 3 ----------
{ part: 3, qs: [32,33,34], script: [
  ["W","Hi, I'm calling about the apartment on Elm Street that was advertised on your Web site. Is it still available?"],
  ["M","Yes, it is. It's a two-bedroom unit on the third floor, and it was just renovated last month."],
  ["W","That sounds great. Does the rent include utilities?"],
  ["M","Water and heating are included, but electricity is separate. Would you like to come see it? I can show it to you on Saturday morning."],
  ["W","Saturday works. I'll bring my lease application with me."]],
  questions: [
  { q: 32, text: "Why is the woman calling?", ans: "B", opts: ["To report a repair problem", "To ask about an apartment", "To pay her rent", "To cancel an appointment"] },
  { q: 33, text: "What does the man say about the unit?", ans: "D", opts: ["It is on the first floor.", "It has three bedrooms.", "It comes with furniture.", "It was recently renovated."] },
  { q: 34, text: "What will the woman bring on Saturday?", ans: "A", opts: ["An application", "A deposit check", "A reference letter", "A moving schedule"] } ] },

{ part: 3, qs: [35,36,37], script: [
  ["M","Linda, the client from Harper Foods just called. They want to move our presentation from Thursday to tomorrow afternoon."],
  ["W","Tomorrow? But the sales figures for the last quarter aren't ready yet. The finance team said they'd send them on Wednesday."],
  ["M","I know. Maybe we can use the figures from the previous quarter and explain that the new numbers are coming."],
  ["W","That could work. I'll call finance anyway and ask if they can send a preliminary version today."]],
  questions: [
  { q: 35, text: "What has the client requested?", ans: "C", opts: ["A lower price", "A different product", "An earlier presentation", "A longer contract"] },
  { q: 36, text: "What problem does the woman mention?", ans: "A", opts: ["Some data is not available yet.", "A meeting room is booked.", "A colleague is on vacation.", "A projector is broken."] },
  { q: 37, text: "What will the woman probably do next?", ans: "D", opts: ["Visit the client", "Update a Web site", "Book a conference room", "Contact another department"] } ] },

{ part: 3, qs: [38,39,40], script: [
  ["W","Welcome to Greenway Fitness. How can I help you?"],
  ["M","I'm interested in joining. I saw your advertisement about a special rate for new members."],
  ["W","Yes, this month new members pay no registration fee, and the first month is half price. You'll also get a free session with a personal trainer."],
  ["M","That's great. Do you have classes in the early morning? I work downtown and need to be at the office by eight."],
  ["W","We do. Our yoga and cycling classes start at six. Here's a schedule. You can fill out the membership form while I make a copy of your ID."]],
  questions: [
  { q: 38, text: "Where does the conversation take place?", ans: "B", opts: ["At a clinic", "At a fitness center", "At a sporting goods store", "At a community college"] },
  { q: 39, text: "What is offered to new members?", ans: "C", opts: ["A free T-shirt", "A parking pass", "A training session", "A locker rental"] },
  { q: 40, text: "Why does the man ask about early classes?", ans: "A", opts: ["He has to start work early.", "He prefers smaller groups.", "He wants to avoid traffic.", "He lives near the gym."] } ] },

{ part: 3, qs: [41,42,43], script: [
  ["M","Excuse me, I ordered a set of office chairs from your store two weeks ago, but they haven't arrived yet. My order number is 4-5-7-2."],
  ["W","Let me check. Oh, I see. The chairs were sent to your old address on Pine Avenue."],
  ["M","Really? I updated my address when I placed the order."],
  ["W","I'm very sorry about that. I'll arrange for the delivery company to pick them up and bring them to your new office. And to make up for the trouble, we'll refund your shipping charge."]],
  questions: [
  { q: 41, text: "What is the man calling about?", ans: "D", opts: ["A billing error", "A damaged product", "A store's hours", "A missing delivery"] },
  { q: 42, text: "What caused the problem?", ans: "B", opts: ["An item was out of stock.", "An order was sent to the wrong address.", "A truck broke down.", "A payment was declined."] },
  { q: 43, text: "What does the woman offer to do?", ans: "C", opts: ["Send a catalog", "Upgrade the chairs", "Return a fee", "Give a discount on a future order"] } ] },

{ part: 3, qs: [44,45,46], script: [
  ["W","Hi, Raj, Tom. Have you two seen the e-mail about the company's move to the new building?"],
  ["M","Yes. It says we're moving at the end of next month. I'm glad, because this office is getting too crowded."],
  ["M2","I saw it too. The new building is a lot farther from the train station, though. I'm a little worried about my commute."],
  ["W","Actually, the e-mail also mentioned that the company will run a free shuttle bus from the station every twenty minutes."],
  ["M2","Oh, I missed that part. That makes things much easier."]],
  questions: [
  { q: 44, text: "What are the speakers mainly discussing?", ans: "A", opts: ["An office relocation", "A new hiring policy", "A train schedule change", "A building renovation"] },
  { q: 45, text: "Why is one of the men concerned?", ans: "C", opts: ["His office will be smaller.", "The move will happen too soon.", "His trip to work will be longer.", "He has not received an e-mail."] },
  { q: 46, text: "What will the company provide?", ans: "B", opts: ["Parking permits", "Transportation", "Moving boxes", "New furniture"] } ] },

{ part: 3, qs: [47,48,49], script: [
  ["M","Sandra, do you have a minute? The printer in our department keeps jamming, and I need to print fifty copies of the training handbook for this afternoon."],
  ["W","The technician is coming tomorrow. Why don't you use the one in the marketing department?"],
  ["M","I tried. They're using it for a big project all day."],
  ["W","Well, there's a print shop across the street. They're fast, and the company has an account there."],
  ["M","Great. I'll send them the file now."]],
  questions: [
  { q: 47, text: "What does the man need to do this afternoon?", ans: "D", opts: ["Repair a machine", "Meet a technician", "Attend a marketing meeting", "Distribute some handbooks"] },
  { q: 48, text: "Why can't the man use the marketing department's printer?", ans: "A", opts: ["It is being used.", "It is out of paper.", "It is broken.", "It requires a password."] },
  { q: 49, text: "What does the woman suggest?", ans: "B", opts: ["Printing fewer copies", "Using an outside business", "Calling the technician again", "Sending the file by e-mail to staff"] } ] },

{ part: 3, qs: [50,51,52], script: [
  ["W","Good morning. I have a reservation for tonight under the name Kimura. I know check-in isn't until three, but I just arrived on an early flight."],
  ["M","Let me see, Ms. Kimura. I'm afraid your room isn't ready yet. Housekeeping is still cleaning it."],
  ["W","Oh, I have a business meeting at one o'clock, and I was hoping to change clothes."],
  ["M","I understand. You're welcome to use the changing room at our fitness center on the second floor. And we can keep your luggage at the front desk until your room is ready."]],
  questions: [
  { q: 50, text: "Who most likely is the man?", ans: "C", opts: ["A flight attendant", "A taxi driver", "A hotel clerk", "A fitness instructor"] },
  { q: 51, text: "What does the woman want to do before her meeting?", ans: "A", opts: ["Change her clothes", "Eat lunch", "Print some documents", "Call a client"] },
  { q: 52, text: "What does the man offer to do?", ans: "D", opts: ["Upgrade her room", "Call a taxi", "Give her a meal voucher", "Store her bags"] } ] },

{ part: 3, qs: [53,54,55], script: [
  ["M","Hi, Alicia. How did the job fair at the university go yesterday?"],
  ["W","It went really well. We talked to more than sixty students, and about twenty of them seemed like strong candidates for our internship program."],
  ["M","That's more than last year. Did you bring enough brochures?"],
  ["W","Well, we ran out before noon."],
  ["M","Hmm, next time we should print more. Anyway, can you send me the list of candidates? I'd like to start scheduling interviews."]],
  questions: [
  { q: 53, text: "What event did the woman attend?", ans: "B", opts: ["A trade show", "A job fair", "A graduation ceremony", "A training workshop"] },
  { q: 54, text: "What does the woman imply when she says, \"we ran out before noon\"?", ans: "C", opts: ["The event ended early.", "The booth was hard to find.", "More materials were needed.", "Lunch was not provided."] },
  { q: 55, text: "What does the man ask the woman to send him?", ans: "A", opts: ["A list of candidates", "A budget report", "Some brochures", "An interview schedule"] } ] },

{ part: 3, qs: [56,57,58], script: [
  ["W","Thanks for coming in, Mr. Okafor. We've reviewed your design for our new café logo, and everyone on the team loves it."],
  ["M","I'm glad to hear that. Are there any changes you'd like me to make?"],
  ["W","Just one. We'd like the coffee cup in the logo to be green instead of brown. Green is the main color in our stores."],
  ["M","No problem. That's a quick change. I'll send you the final files by Friday, along with versions for your menus and Web site."]],
  questions: [
  { q: 56, text: "Who most likely is the man?", ans: "D", opts: ["A café owner", "A chef", "A sales representative", "A graphic designer"] },
  { q: 57, text: "What change does the woman request?", ans: "B", opts: ["A larger font", "A different color", "A new slogan", "A smaller image"] },
  { q: 58, text: "What will the man send by Friday?", ans: "A", opts: ["Final design files", "A price estimate", "A signed contract", "Printed menus"] } ] },

{ part: 3, qs: [59,60,61], script: [
  ["M","Excuse me. I'm looking for a gift for my sister. She just started running and needs a good pair of shoes."],
  ["W","These are our best-selling running shoes. They're light and very comfortable. They're also on sale this week for twenty percent off."],
  ["M","They look great, but I'm not sure about her size."],
  ["W","That's not a problem. If they don't fit, she can exchange them within thirty days. Just make sure she keeps the receipt."]],
  questions: [
  { q: 59, text: "Who is the man shopping for?", ans: "C", opts: ["Himself", "A coworker", "A family member", "A client"] },
  { q: 60, text: "What does the woman say about the shoes?", ans: "D", opts: ["They are handmade.", "They come in many colors.", "They are new this season.", "They are discounted."] },
  { q: 61, text: "What is the man concerned about?", ans: "A", opts: ["The size", "The price", "The color", "The delivery time"] } ] },

{ part: 3, qs: [62,63,64], graphic: { type: "table", title: "Conference Rooms — 4th Floor", head: ["Room", "Seats", "Video Equipment"], rows: [["Oak","8","No"],["Maple","12","Yes"],["Cedar","20","No"],["Birch","30","Yes"]] },
  script: [
  ["W","Daniel, I need to book a room for the video call with our partners in Singapore next Tuesday."],
  ["M","How many people will be joining from our side?"],
  ["W","Ten, including the department heads. And of course we'll need video equipment."],
  ["M","Then this one is the best choice. The bigger room with video is already booked that day. I'll reserve it now and send everyone the invitation."],
  ["W","Thanks. Could you also order some coffee and snacks for the meeting?"]],
  questions: [
  { q: 62, text: "What kind of meeting is the woman planning?", ans: "B", opts: ["A job interview", "A video call", "A training session", "A product demonstration"] },
  { q: 63, text: "Look at the graphic. Which room will the man reserve?", ans: "B", opts: ["Oak", "Maple", "Cedar", "Birch"] },
  { q: 64, text: "What does the woman ask the man to do?", ans: "D", opts: ["Contact the partners", "Prepare a presentation", "Set up the equipment", "Order refreshments"] } ] },

{ part: 3, qs: [65,66,67], graphic: { type: "table", title: "Riverside Train Line — Departures", head: ["Train", "Departs", "Arrives Hillton"], rows: [["101","8:10","9:25"],["103","8:40","9:50"],["105","9:15","10:20"],["107","9:45","10:55"]] },
  script: [
  ["M","Hi, Grace. Are you taking the train to the Hillton branch tomorrow for the safety inspection?"],
  ["W","Yes. The inspection starts at ten, and I'd like to arrive with a little extra time."],
  ["M","Then don't take the first train. It stops at every station, so it's actually not much faster. The next one is the express."],
  ["W","Good to know. I'll take that one. By the way, have you printed the inspection checklist?"],
  ["M","Not yet. I'll do it this afternoon and put it on your desk."]],
  questions: [
  { q: 65, text: "Why is the woman going to the Hillton branch?", ans: "A", opts: ["To conduct an inspection", "To meet a new client", "To give a presentation", "To interview job candidates"] },
  { q: 66, text: "Look at the graphic. Which train will the woman most likely take?", ans: "B", opts: ["Train 101", "Train 103", "Train 105", "Train 107"] },
  { q: 67, text: "What does the man say he will do this afternoon?", ans: "C", opts: ["Buy a ticket", "Call the branch", "Print a document", "Reschedule a meeting"] } ] },

{ part: 3, qs: [68,69,70], graphic: { type: "bars", title: "Customer Survey: Most Requested Menu Items", items: [["Salads",42],["Soups",30],["Pasta",55],["Desserts",25]] },
  script: [
  ["W","I've got the results of our customer survey. People really want us to add more choices to the lunch menu."],
  ["M","Interesting. What was the most requested item?"],
  ["W","Well, the top request is something we can't do right now, because our kitchen doesn't have the right equipment. So I think we should focus on the second most popular one."],
  ["M","That makes sense. Let's ask the chef to create three new recipes and offer them as a special next month."]],
  questions: [
  { q: 68, text: "What is the topic of the conversation?", ans: "C", opts: ["Hiring a new chef", "Remodeling a kitchen", "Expanding a menu", "Lowering prices"] },
  { q: 69, text: "Look at the graphic. Which item will the speakers focus on?", ans: "A", opts: ["Salads", "Soups", "Pasta", "Desserts"] },
  { q: 70, text: "What does the man suggest?", ans: "D", opts: ["Conducting another survey", "Buying new equipment", "Reducing portion sizes", "Asking the chef for recipes"] } ] },

// ---------- PART 4 ----------
{ part: 4, kind: "telephone message", qs: [71,72,73], spk: "W", script: [
  "Hello, Mr. Alvarez. This is Karen from Brightsmile Dental Clinic calling to remind you about your appointment for a checkup tomorrow, Tuesday, at ten thirty.",
  "Please note that we've moved to a new location at 85 Harbor Road, next to the public library.",
  "There is free parking behind the building. If you need to change your appointment, please call us at least twenty-four hours in advance.",
  "Also, remember to bring your updated insurance card. Thank you, and we'll see you tomorrow."],
  questions: [
  { q: 71, text: "What is the purpose of the call?", ans: "A", opts: ["To confirm an appointment", "To offer a discount", "To request a payment", "To announce a new dentist"] },
  { q: 72, text: "What has changed recently?", ans: "C", opts: ["The office hours", "The phone number", "The clinic's location", "The parking fee"] },
  { q: 73, text: "What is the listener asked to bring?", ans: "B", opts: ["A medical form", "An insurance card", "A photo ID", "A list of medicines"] } ] },

{ part: 4, kind: "announcement", qs: [74,75,76], spk: "M", script: [
  "Attention passengers on Flight 208 to Vancouver.",
  "Due to heavy snow at our destination, this flight has been delayed by approximately two hours. The new departure time is four fifteen P.M.",
  "We apologize for the inconvenience. All passengers on this flight will receive a meal voucher, which can be used at any restaurant in the terminal.",
  "Please pick up your voucher at the service counter near Gate 12. We will make another announcement when boarding begins."],
  questions: [
  { q: 74, text: "Why has the flight been delayed?", ans: "D", opts: ["A mechanical problem", "A crew shortage", "A security check", "Bad weather"] },
  { q: 75, text: "What will passengers receive?", ans: "A", opts: ["Meal vouchers", "Hotel rooms", "Seat upgrades", "Travel credits"] },
  { q: 76, text: "Where should passengers go?", ans: "C", opts: ["To the check-in desk", "To the baggage claim area", "To a service counter", "To a different terminal"] } ] },

{ part: 4, kind: "tour", qs: [77,78,79], spk: "W", script: [
  "Good morning, everyone, and welcome to the Morrison Chocolate Factory. My name is Elena, and I'll be your guide today.",
  "Our tour will last about an hour. First, we'll see how cocoa beans are roasted and ground. Then we'll visit the packaging area, where our famous gift boxes are made.",
  "For safety reasons, please do not touch any of the machines, and stay with the group at all times.",
  "At the end of the tour, you'll be able to taste some of our newest products in the visitor center. And all visitors will receive a coupon for ten percent off at our gift shop."],
  questions: [
  { q: 77, text: "Where is the talk taking place?", ans: "B", opts: ["At a bakery", "At a factory", "At a farm", "At a museum"] },
  { q: 78, text: "What are listeners asked to do?", ans: "D", opts: ["Wear protective glasses", "Turn off their phones", "Avoid taking photos", "Stay with the group"] },
  { q: 79, text: "What will listeners receive?", ans: "A", opts: ["A coupon", "A free gift box", "A recipe book", "A souvenir photo"] } ] },

{ part: 4, kind: "advertisement", qs: [80,81,82], spk: "M", script: [
  "Are you tired of spending your weekends cleaning? Let SparkleHome do it for you!",
  "For over fifteen years, SparkleHome has provided reliable and affordable cleaning services to homes and offices across the city.",
  "All our staff are fully trained, and we use only environmentally friendly products.",
  "This month only, new customers can get their first cleaning for half price. Visit our Web site to book online and see what our customers are saying about us."],
  questions: [
  { q: 80, text: "What type of business is being advertised?", ans: "C", opts: ["A furniture store", "A real estate agency", "A cleaning service", "A home repair company"] },
  { q: 81, text: "What does the speaker say about the products the business uses?", ans: "B", opts: ["They are imported.", "They are environmentally friendly.", "They are sold in stores.", "They are made by hand."] },
  { q: 82, text: "What is offered to new customers?", ans: "A", opts: ["A reduced price", "A free consultation", "A gift card", "Extended hours"] } ] },

{ part: 4, kind: "radio broadcast", qs: [83,84,85], spk: "W", script: [
  "This is Lisa Chen with your morning traffic report.",
  "Drivers heading downtown should avoid Route 9 this morning. One lane is closed between Exit 4 and Exit 7 because of road repairs, and traffic is moving very slowly.",
  "The work is expected to continue until Friday. City officials recommend taking Lakeshore Drive instead, or using the subway, which is running on schedule.",
  "Stay tuned. After a short commercial break, we'll have the weather forecast for the weekend."],
  questions: [
  { q: 83, text: "What is causing a delay?", ans: "D", opts: ["An accident", "A parade", "Heavy rain", "Road work"] },
  { q: 84, text: "What do city officials recommend?", ans: "B", opts: ["Leaving home early", "Using a different route", "Driving more slowly", "Parking downtown"] },
  { q: 85, text: "What will listeners hear next?", ans: "C", opts: ["A weather report", "A news interview", "An advertisement", "A music program"] } ] },

{ part: 4, kind: "excerpt from a meeting", qs: [86,87,88], spk: "M", script: [
  "Before we finish today's meeting, I have some good news. Our online store had its best month ever in October. Sales were up thirty percent compared to last year.",
  "Much of this success is because of the new mobile app that our IT team launched in September. Customers find it very easy to use.",
  "However, we've also received more complaints about slow delivery. So, starting next week, we'll be working with a second delivery company.",
  "I know that's a big change. I'll send everyone the details this afternoon. Please read them before Monday."],
  questions: [
  { q: 86, text: "What does the speaker say happened in October?", ans: "A", opts: ["Sales reached a record high.", "A new store opened.", "Some staff were hired.", "Prices were lowered."] },
  { q: 87, text: "According to the speaker, what caused the success?", ans: "C", opts: ["A television advertisement", "A holiday sale", "A mobile application", "Free shipping"] },
  { q: 88, text: "What does the speaker imply when he says, \"I know that's a big change\"?", ans: "B", opts: ["He disagrees with a decision.", "He understands the staff may need time to adjust.", "He wants to postpone the plan.", "He thinks the change will be expensive."] } ] },

{ part: 4, kind: "introduction", qs: [89,90,91], spk: "W", script: [
  "Welcome to today's workshop on writing effective business e-mails. I'm pleased to introduce our speaker, Dr. Marcus Webb.",
  "Dr. Webb has taught business communication at Lakeside University for over twenty years, and his book, Write Clearly, Work Smarter, has been translated into eight languages.",
  "Today he'll share practical tips for writing messages that are short, clear, and polite.",
  "Before we start, please take a moment to complete the short survey on your table. It will help Dr. Webb focus on the topics you're most interested in."],
  questions: [
  { q: 89, text: "What is the topic of the workshop?", ans: "D", opts: ["Public speaking", "Learning languages", "Time management", "Business writing"] },
  { q: 90, text: "What is mentioned about Dr. Webb's book?", ans: "A", opts: ["It has been translated into several languages.", "It will be published next month.", "It is available at the event.", "It won an award."] },
  { q: 91, text: "What are listeners asked to do?", ans: "C", opts: ["Introduce themselves", "Buy a book", "Fill out a survey", "Turn off their phones"] } ] },

{ part: 4, kind: "telephone message", qs: [92,93,94], spk: "M", script: [
  "Hi, Ms. Patel. This is Kevin Ross from Ross Construction. I'm calling about the renovation of your restaurant kitchen.",
  "We've finished removing the old equipment, and we're ready to install the new ovens. Unfortunately, the supplier told me this morning that the ovens won't arrive until next Thursday.",
  "So, we won't be finished by Monday as planned. I'm really sorry about this. In the meantime, my team can start painting the dining area, which was the next step anyway.",
  "Please call me back to let me know if that's OK. My number is 555-0147."],
  questions: [
  { q: 92, text: "Who most likely is the speaker?", ans: "B", opts: ["A chef", "A contractor", "A supplier", "An interior designer"] },
  { q: 93, text: "What problem does the speaker mention?", ans: "A", opts: ["Some equipment will arrive late.", "A cost has increased.", "A worker is sick.", "A permit was not approved."] },
  { q: 94, text: "What does the speaker propose?", ans: "D", opts: ["Canceling the order", "Hiring more workers", "Using different ovens", "Working on another area"] } ] },

{ part: 4, kind: "talk", qs: [95,96,97], graphic: { type: "table", title: "Volunteer Schedule — Saturday", head: ["Time", "Activity"], rows: [["9:00","Registration"],["10:00","Tree planting"],["12:00","Lunch"],["1:00","Litter pick-up"]] },
  spk: "W", script: [
  "Thank you all for volunteering for today's Green City Park clean-up. We have more than eighty volunteers, which is a new record.",
  "I have one change to the schedule. The city's gardening team will be late, so we'll have to switch the two activities around lunch. The activity that was planned for the morning will now happen after lunch.",
  "Gloves and trash bags are available at the tent next to the fountain. Also, please make sure to drink plenty of water. It's going to be hot today."],
  questions: [
  { q: 95, text: "What is the event?", ans: "C", opts: ["A sports competition", "A garden show", "A park clean-up", "A charity concert"] },
  { q: 96, text: "Look at the graphic. What activity will take place at ten o'clock?", ans: "D", opts: ["Registration", "Tree planting", "Lunch", "Litter pick-up"] },
  { q: 97, text: "Where can listeners get supplies?", ans: "A", opts: ["At a tent", "At the parking lot", "At the main gate", "At a fountain café"] } ] },

{ part: 4, kind: "excerpt from a meeting", qs: [98,99,100], graphic: { type: "bars", title: "Hotel Guest Ratings (out of 100)", items: [["Rooms",88],["Restaurant",72],["Front Desk",91],["Fitness Center",64]] },
  spk: "M", script: [
  "Let's look at the results of last month's guest survey. Overall, guests are very happy with our hotel, especially our front desk staff. Great job, everyone.",
  "But one area received a much lower score than the others. Many guests said the equipment there is old, and it's often too crowded in the evening.",
  "So, the management team has decided to buy new machines and extend the hours. The new equipment will arrive in two weeks.",
  "I'd like a volunteer to help me prepare a notice for the guests. Please let me know after the meeting."],
  questions: [
  { q: 98, text: "Where does the speaker most likely work?", ans: "B", opts: ["At a gym", "At a hotel", "At a restaurant", "At a travel agency"] },
  { q: 99, text: "Look at the graphic. Which area will be improved?", ans: "D", opts: ["Rooms", "Restaurant", "Front Desk", "Fitness Center"] },
  { q: 100, text: "What does the speaker ask for?", ans: "C", opts: ["Survey results", "Equipment suggestions", "A volunteer", "A budget estimate"] } ] }
];
