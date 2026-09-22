/* Sav tekstualni sadržaj i fotografije preuzeti sa sajta vrticborici.rs */

export const SITE = {
  name: "Vrtić Borići",
  tagline: "Vrtić u šumi",
  logo: "https://vrticborici.rs/wp-content/uploads/2020/07/web.png",
  hero: ["Vrtić u šumi", "Boravak u prirodi", "Domaća hrana"],
  heroKicker: "Želite da Vaše dete odrasta u prirodi?",
  heroBadge: "+ SUBVENCIJA GRADA",
  video: "https://www.youtube.com/embed/2w3muctz5YM",
};

const CDN = "https://vrticborici.rs/wp-content/uploads/2020/07";
export const photo = (name: string, size?: 300 | 768 | 1024) =>
  `${CDN}/${name}${size ? `-${size}x${size}` : ""}.jpg`;

export const CONTACT = {
  phone: "+381 63 8050 377",
  phoneHref: "tel:+381638050377",
  email: "office@vrticborici.rs",
  address: "Miladina Petrovića 25/1, Petlovo Brdo, Beograd 11090",
  addressShort: "Miladina Petrovića 25/1, Petlovo Brdo, Beograd",
  hours: "07-18h (ponedeljak-petak)",
  hoursShort: "07 – 18h",
  map: "https://maps.app.goo.gl/LKE13Q8EwwKFdRfR9",
  mapEmbed:
    "https://www.google.com/maps?q=Miladina%20Petrovi%C4%87a%2025%2C%20Beograd%2C%20Vrti%C4%87%20Bori%C4%87i&z=17&output=embed",
  directions:
    "Prilaz vrtiću kolima je jednostavan, dolazi se jednosmernom ulicom iz pravca OŠ „Vladimir Rolović“.",
  parking: "U ulici uvek ima mesta za parkiranje.",
  transport: "Udaljeni smo oko 150 m od najbliže autobuske stanice (56/59/E2).",
  instagram: "https://www.instagram.com/vrtic_borici/",
};

export type NavItem = {
  key: string;
  label: string;
  emoji: string;
  children?: { key: string; label: string; emoji: string }[];
};

/* navigacija: "O nama" ima padajuci meni sa podstranicama */
export const NAV: NavItem[] = [
  { key: "pocetna", label: "Početna", emoji: "🏡" },
  {
    key: "o-nama",
    label: "O nama",
    emoji: "🌿",
    children: [
      { key: "nasa-prica", label: "Naša priča", emoji: "📖" },
      { key: "zasto-mi", label: "Zašto mi", emoji: "🌟" },
      { key: "utisci-roditelja", label: "Utisci roditelja", emoji: "💛" },
    ],
  },
  { key: "upis-i-cene", label: "Upis i cene", emoji: "🎒" },
  { key: "galerija", label: "Galerija", emoji: "📸" },
  { key: "zaposlenje", label: "Zaposlenje", emoji: "🧑‍🏫" },
  { key: "kontakt", label: "Kontakt", emoji: "📞" },
];

export const FOOTER_NAV = [
  { key: "pocetna", label: "Početna" },
  { key: "o-nama", label: "O nama" },
  { key: "upis-i-cene", label: "Upis i cene" },
  { key: "zaposlenje", label: "Zaposlenje" },
];

export const QUICK_COLUMNS = [
  { key: "zasto-mi", label: "Zašto Vrtić Borići" },
  { key: "galerija", label: "Galerija i video" },
  { key: "utisci-roditelja", label: "Utisci roditelja" },
  { key: "kontakt", label: "Kontakt i poseta" },
  { key: "nasa-prica", label: "Naša priča" },
];

export const STATS = [
  { value: 205, suffix: " m", label: "nadmorske visine – ruža vetrova" },
  { value: 250, suffix: " m²", label: "prostora uređenog po evropskim standardima" },
  { value: 10, suffix: "+", label: "godina iskustva u edukaciji dece i odraslih" },
  { value: 100, suffix: "%", label: "domaća hrana, pripremljena neposredno pre obroka" },
];

export const WHY_HOME = [
  {
    emoji: "🌲",
    title: "Priroda i tradicija",
    accent: "leaf",
    lead: ["Ko se boji blata još?", "Vraćamo prirodu gradskoj deci!"],
    body: "Učimo da volimo i brinemo o svim živim bićima, rastući u zelenom okruženju kao nekada. Sadimo, zalivamo, mazimo, hranimo!",
    outro: "Verujemo da je najbolja učionica natkrivena samo nebom.",
  },
  {
    emoji: "💚",
    title: "Razvoj empatije",
    accent: "berry",
    lead: ["Empatija. Samostalnost. Samopouzdanje."],
    body: "Naša definicija budućih uspešnih ljudi. Zalažemo se da mališani iz Borića postanu saosećajni i preduzimljivi pojedinci spremni da svojim primerom menjaju svet na bolje!",
    outro: "",
  },
];

export const ABOUT = {
  title: "O nama",
  intro:
    "Akreditovana predškolska ustanova „Borići” je jedno od retkih mesta u Beogradu gde se detinjstvo i učenje stapaju sa prirodom. Na obroncima Petlovog brda, na 205 metara nadmorske visine, u samom srcu borove šume i prostranog dvorišta, deca rastu i uče u okruženju koje im svakodnevno nudi slobodu, inspiraciju i radost otkrivanja.",
  blocks: [
    "Kroz pažljivo osmišljen, savremeni program i prostor uređen po evropskim standardima, pružamo alternativu klasičnim vrtićima svim roditeljima koji veruju da je temelj srećne i perspektivne budućnosti deteta u razvijanju radoznalosti, samostalnosti i empatije – u direktnom kontaktu sa prirodom i svetom oko sebe.",
    "Nadahnuti mudrošću naših baka i deka, učimo decu da vole prirodu, životinje i zajedništvo, dok ih istovremeno pripremamo za izazove savremenog doba. „Borići” spajaju prirodu i tradiciju sa modernim načinom života – nudeći mališanima najbolje iz oba sveta.",
  ],
  why: {
    title: "— Zbog čega radimo to što radimo?",
    paragraphs: [
      "Edukacijom se bavimo već više od deset godina kroz Centar za obrazovanje na Petlovom Brdu, gde su stotine dece i odraslih uz nas otkrili radost učenja i kreativnog razvoja.",
      "Vrtić „Borići” nastao je iz želje da stvorimo „Budućnost sa više mogućnosti” za generacije koje dolaze – spajajući odrastanje u prirodi, onako kako je to nekada bilo, sa savremenim obrazovnim programom koji odgovara zahtevima današnjeg vremena, uz poseban akcenat na boravku na svežem vazduhu i razvoju empatije.",
      "Naše metode pokazale su se izuzetno uspešnim: deca rastu u okruženju koje toplinom i energijom podseća na porodičnu atmosferu, dok svet oko sebe upoznaju kroz igru, istraživanje i praktičnu primenu znanja – slobodno, sigurno i radosno.",
      "Naša glavna učionica natkrivena je nebom i krošnjama borova. Najlepši dani su oni koje provedemo gotovo u potpunosti napolju, na svežem vazduhu, kada gradskoj deci vraćamo prirodu – a prirodu ponovo vraćamo deci.",
      "Od najmlađih dana učimo ih svesti i odgovornosti, razvijamo timski duh, dogovor i empatiju prema svim živim bićima, kroz razumevanje svojih i tuđih emocija. Verujemo da se prave vrednosti usađuju od malena i da vreme provedeno u vrtiću, uz ljubav i podršku, ima ključnu ulogu u socijalnom i emocionalnom razvoju.",
      "U vrtiću „Borići” stojimo rame uz rame sa roditeljima – kao saveznici u vaspitavanju budućih samostalnih, sigurnih i srećnih mladih ljudi. Zajedno gradimo bolji svet za generacije koje dolaze.",
    ],
  },
  mission: {
    title: "— Naša misija",
    paragraphs: [
      "Jednostavno rečeno – sve što radimo, radimo sa željom da naši mališani iz „Borića” izrastu u samosvesne, radosne i uspešne ljude. Za nas to znači da od malih nogu uče da vole i poštuju ljude, životinje i prirodu koja ih okružuje.",
      "Istovremeno verujemo da obrazovanje budućnosti nema granica. Zato poseban naglasak stavljamo na celovit razvoj ličnosti, samostalnost i empatiju – kako bismo našoj deci otvorili vrata sveta i pružili im slobodu da jednog dana sami biraju svoj put.",
    ],
  },
  vision: {
    title: "— Naša vizija",
    paragraphs: [
      "Kroz svoj rad u vrtiću „Borići” trudimo se da damo novi smisao klasičnom obrazovnom sistemu. Inspirisani prirodom, gradimo svet u kojem su ljubav, ljudskost, međusobno poštovanje i lični doprinos osnovne vrednosti svakog obrazovanog čoveka.",
      "Verujemo da edukacijom možemo menjati svet – polazeći upravo od najmlađih.",
    ],
  },
};

export const STORY = {
  title: "Naša priča",
  lead: "Kao i sve najlepše ideje, i naša je došla nenadano – baš onako kako to obično biva kada srce i priroda progovore zajedno.",
  intro:
    "Zamišljajte: sunčan letnji dan, tišina šumice koju povremeno prekida pesma ptica i šum vetra kroz krošnje. Sedeli smo u hladu borova na Petlovom brdu, u našem dvorištu koje se stapa sa šumicom, i maštali… Nekada su tu jurili i smejali se naši klinci, ali kako su odrasli i krenuli svojim putem, dvorište je utihnulo. Ostala je šumica – lepa, ali pomalo pusta.",
  chapters: [
    {
      emoji: "🌳",
      title: "Zašto da krošnje borova ne čuvaju nove uspomene?",
      body: "U tom trenutku rodila se ideja: zašto da ova čarolija prirode ne postane mesto gde će ponovo odjekivati dečiji smeh? Zašto da krošnje borova ne čuvaju uspomene novih generacija? Tako je nastao naš vrtić „Borići” – mesto gde se priroda i detinjstvo rukuju, gde svako dete može da raste u skladu sa sobom i okruženjem, uz igru, maštu i toplinu koja svemu daje dušu.",
    },
    {
      emoji: "💡",
      title: "Možete li već sada da naslutite kako se priča dalje razvija?",
      body: "Gotovo u šali, neko je predložio: „A što ne bismo otvorili vrtić?” Eto dece, eto radosti, eto ponovo punog dvorišta! Isprva je to zvučalo kao šala koju niko ne uzima ozbiljno. Ali, kao što to obično biva u životu – kockice su se same posložile. Već nakon nekoliko meseci započeli smo potpuno renoviranje i opremanje više od 250 m² prostora i ogromnog dvorišta koje se prirodno nastavlja na šumu. Sve smo oblikovali baš po meri naših budućih mališana.",
    },
    {
      emoji: "📚",
      title: "Najlepše učionice nisu one između četiri zida",
      body: "Na prvi pogled, činilo bi se da je odluka o otvaranju vrtića nastala u jednom naletu inspiracije. Ali u stvari, u korenu te ideje stoji dugogodišnje iskustvo i duboka povezanost sa obrazovanjem i prirodom. Naš centar za obrazovanje već više od decenije okuplja decu i porodice, gradi zajednicu i podstiče ljubav prema učenju. Kroz godine rada, shvatili smo jedno – najlepše učionice nisu one između četiri zida, već one pod vedrim nebom, u hladu drveća, uz miris zemlje i pesmu ptica.",
    },
    {
      emoji: "🌲",
      title: "Iz srca, iz šumice",
      body: "Tako je nastao vrtić „Borići” – iz srca, iz šumice, iz želje da deca odrastaju slobodna, radosna i u prirodnom okruženju. Verujemo da upravo priroda daje temelj zdravom i srećnom detinjstvu, a naša misija je da tu radost svakodnevno gradimo zajedno sa decom i roditeljima.",
    },
  ],
  outro: "- Čekamo vas u šumici na Pevcu! Dobrodošli!",
};

export const REASONS = [
  {
    n: "01.",
    emoji: "🌲",
    title: "Šuma i svež vazduh",
    accent: "leaf",
    paragraphs: [
      "Kada kažemo da deca u vrtiću „Borići” odrastaju u prirodi – mi to zaista mislimo!",
      "Naše ogromno dvorište i hlad borove šume omiljeno su mesto za učenje, igru i maštanje. Ponosimo se našom „zelenom učionicom“ pod krošnjama borića, opremljenom drvenim mobilijarom koji deci pruža osećaj slobode i povezanosti sa prirodom.",
      "Najveći deo dana mališani provode napolju – istražujući, otkrivajući i stvarajući, dok se kroz igru i boravak u prirodi razvija njihov puni psihofizički potencijal.",
    ],
  },
  {
    n: "02.",
    emoji: "🍲",
    title: "Domaća hrana",
    accent: "coral",
    paragraphs: [
      "Ko još ne voli maminu i bakinu kuhinju? U vrtiću „Borići” ne pristajemo na ništa manje od najboljeg!",
      "Verujemo da zdravlje ulazi na usta i da je pravilna ishrana temelj snažnog i srećnog detinjstva. Zato je naša hrana uvek sveža, pripremana neposredno pre obroka i nikada podgrevana.",
      "Za razliku od standardnih ketering opcija, mi imamo sopstvenu kuhinju u kojoj obroke pripremamo po receptima i preporukama sertifikovanog nutricioniste, uz poštovanje svih HACCP standarda. Tako smo sigurni da svaki zalogaj ispunjava najviše nutritivne i higijenske kriterijume.",
      "A ono što nas najviše raduje jeste to što naši mališani obožavaju vreme ručka – kada ne uživaju samo stomaci, već i sva čula!",
    ],
  },
  {
    n: "03.",
    emoji: "🧭",
    title: "Nesvakidašnji plan i program",
    accent: "sky",
    paragraphs: [
      "Naš program nastao je iz želje da povežemo gradsko dete sa prirodom.",
      "U „Borićima” se igramo, učimo i obedujemo napolju – osim kada vremenski uslovi to baš nikako ne dozvoljavaju. A i tada, naši mališani uz podršku vaspitača ne zaziru ni od blata ni od snega! Verujemo da je najveća vrednost koju možemo da im damo ljubav i poštovanje prema ljudima, životinjama i prirodi koja ih okružuje.",
      "Ubeđeni smo da edukacijom možemo menjati svet, pa od najranijeg uzrasta gradimo buduće građane sveta koji vole i čuvaju prirodu. Kod nas se znanje ne usvaja pasivno – ono se svakodnevno proživljava i postaje deo igre i života u šumi, zbog čega deca iz „Borića” u školu odlaze sa velikim samopouzdanjem, radoznalošću i empatijom.",
      "Sve to postižemo zahvaljujući malim grupama, jer verujemo da svako dete zaslužuje individualnu pažnju i priliku da raste u skladu sa sopstvenim ritmom.",
    ],
  },
  {
    n: "04.",
    emoji: "👨‍👩‍👧‍👦",
    title: "Mešovite grupe i porodična atmosfera",
    accent: "sun",
    paragraphs: [
      "Verujemo da deca najbolje uče u okruženju koje podseća na realan život. Zato su u našoj vrtićkoj i predškolskoj grupi deca različitog uzrasta – baš kao u jednoj porodici. Na taj način stariji uče da budu pažljivi i da pomažu mlađima, dok mlađi prirodno uče od starijih, kao od brata ili sestre.",
      "Vrtić „Borići” je jedna velika porodica u kojoj deca, roditelji i vaspitači zajedno rastu, uče i sarađuju. U toplom i veselom okruženju, zajedno gradimo prostor gde svako dete ima priliku da razvija svoje talente i raste u srećnog i samopouzdanog mališana.",
    ],
  },
  {
    n: "05.",
    emoji: "🎹",
    title: "Muzika, umetnost, kreativnost",
    accent: "berry",
    paragraphs: [
      "Veliku pažnju u vrtiću „Borići” posvećujemo umetničkom i kreativnom izrazu dece. Zato su naše muzičke radionice uvek radosne, raspevane i prate ih zvuci klavira pod rukama našeg nastavnika muzike. Za one roditelje koji razmišljaju da dete jednog dana upišu u muzičku školu, ovo predstavlja dragocenu i jedinstvenu pripremu u okviru redovnog programa.",
      "Muzika podstiče mentalni razvoj, pažnju, pamćenje, ali i vežba strpljenje i sposobnost izražavanja misli i emocija. Brojne svetske studije potvrđuju da deca koja od malih nogu imaju kontakt sa muzikom kasnije beleže viša akademska dostignuća. Muzika stimuliše delove mozga zadužene za čitanje, matematiku i emocionalni razvoj, poboljšava pamćenje i učenje, a pritom jača neuronske veze i pozitivne obrasce ponašanja.",
      "U „Borićima” verujemo da muzika oplemenjuje detinjstvo i otvara vrata ka celovitom razvoju. Dođite da pevamo, učimo i rastemo zajedno! 🎶🌲",
    ],
  },
  {
    n: "06.",
    emoji: "🧼",
    title: "Higijena i zdravstvena zaštita",
    accent: "sky",
    paragraphs: [
      "Vaše poverenje za nas je najveća nagrada. Zato se u vrtiću „Borići” uvek trudimo da prevaziđemo očekivanja – naročito kada je u pitanju briga o higijeni i zdravlju dece. Kod nas je sve uređeno po najvišim standardima, a posebnu pažnju poklanjamo čistoći prostora, opreme, igračaka i svih površina. Zahvaljujući malim grupama, uvek možemo da obezbedimo da su deca uredna, presvučena i čista.",
      "Pored toga, našim mališanima redovno dolazi u posetu dr Biljana Kostić, pedijatar iz ordinacije Afeja Pediatric, koja pažljivo prati rast, razvoj i zdravlje dece, kao i zdravstvenu dokumentaciju svih polaznika.",
    ],
  },
  {
    n: "07.",
    emoji: "🏡",
    title: "Prelep i siguran prostor",
    accent: "coral",
    paragraphs: [
      "Prostor od preko 250 m², uređen po evropskim standardima, u potpunosti je prilagođen deci – tako da čak i sam boravak u njemu stimuliše psihofizički razvoj mališana. Idilična lokacija u srcu borove šume pruža poseban doživljaj učenja i igre na otvorenom, sa mnogo prostora za istraživanje i slobodno kretanje.",
      "Posebnu pažnju posvećujemo izboru savremenih didaktičkih sredstava, drvenih igračaka Kockica, kvalitetne opreme i materijala, a ono što nas čini posebnima je naš stručan i posvećen tim vaspitača i pedagoga.",
      "Bezbednost je uvek na prvom mestu. Zato roditelji mogu biti potpuno bezbrižni znajući da je njihovo dete u sigurnim rukama – celokupan spoljašnji prostor vrtića je ograđen i pod stalnim video nadzorom.",
    ],
  },
];

export const REASONS_OUTRO =
  "Radujemo se da se i Vi pridružite našoj velikoj porodici „Borići” – pozovite nas i upoznajte svet detinjstva ispunjenog igrom, učenjem i prirodom!";

/* --- DNEVNI RITAM (varijanta A – kraći i bolji prikaz dana) --- */
export const DAY = [
  { time: "07:00", emoji: "🌅", title: "Dolazak i jutarnje raspevavanje", text: "Prijem dece, jutarnji krug, pesmica dobrodošlice i osmeh za početak dana." },
  { time: "08:30", emoji: "🥐", title: "Doručak", text: "Doručak pripremljen u našoj kuhinji, po receptima sertifikovanog nutricioniste." },
  { time: "09:30", emoji: "📚", title: "Učenje u zelenoj učionici", text: "Pod krošnjama borića – istraživanje prirode, priče, brojanje lišća i razvoj radoznalosti." },
  { time: "11:00", emoji: "🌳", title: "Vreme napolju", text: "Dvorište, šuma, sadnja, zalivanje, mazanje, hranjenje životinjica… i blato, ako treba!" },
  { time: "12:30", emoji: "🍲", title: "Ručak iz naše kuhinje", text: "Sveže, nikada podgrevano – vreme kada uživaju baš sva čula." },
  { time: "13:30", emoji: "😴", title: "Odmor i priče", text: "Pidžamice, tišina, čitanje bajke i san koji miriše na bor." },
  { time: "15:30", emoji: "🎨", title: "Kreativne i muzičke radionice", text: "Klavir, umetnost, dramatizacija – sve ono što budi maštu." },
  { time: "16:30", emoji: "🤸", title: "Sportić i slobodna igra", text: "Razgibavanje, plesanje i najzabavnije koreografije!" },
  { time: "18:00", emoji: "🌙", title: "Polazak kući", text: "Radno vreme 07-18h (ponedeljak-petak) – delimo utiske sa roditeljima i nosimo pesmice za poneti." },
];

/* --- GRUPE --- */
export const GROUPS = [
  { emoji: "🧸", title: "Jaslice", age: "uzrast od 6-36 meseci", accent: "coral" },
  { emoji: "🎨", title: "Mešovita grupa", age: "3-5 godina", accent: "leaf" },
  { emoji: "🎓", title: "Predškolci", age: "5,5 - 6 godina", accent: "sky" },
];

export const PACKAGES = [
  {
    key: "jaslice",
    emoji: "🧸",
    name: "Jaslice",
    accent: "coral",
    ageLabel: "6-36 meseci",
    items: [
      "Deca uzrasta 6-36 meseci",
      "Program nege i vaspitno-obrazovnog rada za jaslence",
      "Male grupe",
      "Celodnevni boravak (7-18h)",
      "2 obroka + 2 užine (sveže pripremljena hrana u vrtiću)",
    ],
    extra: "+ POPUST u odnosu na vrtićku grupu kao podrška mladim roditeljima",
  },
  {
    key: "mesovita",
    emoji: "🎨",
    name: "Mešovita grupa",
    accent: "leaf",
    ageLabel: "3-5 godina",
    items: [
      "Deca uzrasta 3-5 godina",
      "Program predškolskog obrazovanja",
      "Male grupe",
      "Celodnevni boravak (7-18h)",
      "2 obroka + 2 užine (sveže pripremljena hrana u vrtiću)",
    ],
    extra: "+ DODATNE AKTIVNOSTI (opširnije ispod)",
  },
  {
    key: "predskolci",
    emoji: "🎓",
    name: "Predškolci",
    accent: "sky",
    ageLabel: "5,5 - 6 godina",
    items: [
      "Deca uzrasta 5,5 - 6 godina",
      "Pripremni predškolski program",
      "Engleski za predškolce – kroz igru i pesmu",
      "Redovan rad sa logopedom (uračunat u cenu)",
    ],
    extra: "* GRUPA JE U FAZI FORMIRANJA * Molimo kontaktirajte nas za dodatne informacije",
  },
];

/* --- DODATNE AKTIVNOSTI --- */
export const ACTIVITIES = [
  {
    emoji: "🎹",
    title: "Muzičko uz pratnju klavira",
    text: "2x nedeljno raspevavamo se sa profesorkom klavira – zvuci klavira prate naše muzičke radionice.",
  },
  {
    emoji: "🤸",
    title: "Sportić",
    text: "2x nedeljno razgibavanje, vežbanje, plesanje i najzabavnije koreografije!",
  },
  {
    emoji: "🗣️",
    title: "Logoped",
    text: "Logoped Mirjana Zdravković redovno prati razvoj govora i verbalne komunikacije – radi u grupi, a logoped je uračunat u cenu vrtića.",
  },
];

/* --- SPOLJNI SARADNICI --- */
export const EXTERNAL = [
  {
    emoji: "🤸",
    title: "Sportić i animator za rođendane – školica sporta Junior",
    text: "Razgibavanje, vežbanje, plesanje i najzabavnije koreografije – kao i animator za proslave rođendana.",
  },
  {
    emoji: "🩰",
    title: "Balet – vaspitačica Mina",
    text: "Baletne radionice koje razvijaju držanje, gracioznost i slušanje muzike kod naših mališana.",
  },
  {
    emoji: "🇬🇧",
    title: "Engleski za predškolce",
    text: "Učenje engleskog jezika kroz igru, pesmu i svakodnevnu komunikaciju – samo za predškolsku grupu.",
  },
  {
    emoji: "🗣️",
    title: "Logoped – Mirjana Zdravković",
    text: "Razvoj govora i verbalne komunikacije redovno prati naš logoped – radi u grupi, a logoped je uračunat u cenu vrtića.",
  },
];

/* --- OBAVEŠTENJE O CENI (jasna cena bez subvencije + doplata uz subvenciju) --- */
export const PRICE_NOTICE = {
  date: "Od 1. oktobra 2026.",
  intro:
    "Ovim putem želimo da Vas blagovremeno obavestimo da će od 1. oktobra 2026. god. doći do izmene cene boravka dece u našoj ustanovi.",
  title: "Nova cena boravka iznosiće:",
  rows: [
    {
      label: "Prvo dete",
      fullPrice: "45.000 rsd",
      fullPriceNote: "cena vrtića bez subvencije",
      surcharge: "12.000 rsd",
      surchargeNote: "doplata uz subvenciju",
      accent: "coral",
    },
    {
      label: "Drugo dete",
      fullPrice: "42.000 dinara",
      fullPriceNote: "cena vrtića bez subvencije",
      surcharge: "9.000 rsd",
      surchargeNote: "doplata uz subvenciju",
      accent: "leaf",
    },
  ],
  third:
    "Treće dete ostvaruje pravo na besplatan boravak, koji je u potpunosti pokriven subvencijom (u slučaju kada su sva tri deteta iz iste porodice istovremeno korisnici usluga vrtića).",
  subsidy: "Subvencija 33.000 din.",
};

export const ENROLL = {
  intro:
    "Radujemo se što razmatrate naš vrtić kao opciju! Ovde su paketi koje nudimo kao i dodatne pogodnosti koje stičete upisom. Za sva dodatna pitanja smo Vam uvek na raspolaganju.",
  subsidyTitle: "Kod nas imate pravo na subvenciju",
  subsidyNote: "Vrtić u sistemu subvencija. Cene kao u državnom vrtiću.",
  subsidyCondition:
    "Prvi uslov za podnošenje zahteva, odnosno korišćenje finansijske pomoći, mora da ispuni roditelj – lice koje neposredno brine o detetu, da je državlјanin Republike Srbije sa prebivalištem na teritoriji grada Beograda.",
  documents: [
    "Odbijenica iz državnog vrtića",
    "Očitana lična karta RODITELJA/STARATELJA",
    "Fotkopija kartice sa brojem tekućeg računa",
    "Uverenje o državljanstvu i prebivalištu RODITELJA/STARATELJA",
    "Izvod iz matične knjige rođenih za DETE",
    "Potvrda od pedijatra da dete može u kolektiv",
  ],
  procedure: [
    {
      title: "Odbijenica iz državnog vrtića",
      text: "Roditelj odlazi u državnu Predškolsku ustanovu na teritoriji svoje opštine i uzima potvrdu da dete nije upisano zbog nedovoljnih kapaciteta ustanove (Odbijenicu).",
    },
    {
      title: "Ugovor i dokumentacija",
      text: "Po uzimanju odbijenice roditelj potpisuje ugovor sa privatnom Predškolskom ustanovom i dostavlja ostala potrebna dokumenta.",
    },
    {
      title: "Rešenje i subvencija",
      text: "Vrtić podnosi zahtev Sekretarijatu za obrazovanje i dečju zaštitu i roditelj dobija na kućnu adresu rešenje na osnovu koga mu se isplaćuje subvencija za svaki mesec.",
    },
  ],
  bring: [
    "patofne/patikice",
    "rezervnu odeću",
    "pidžamicu",
    "cuclu i flašicu (ukoliko je detetu još uvek potrebno)",
    "pelene (ukoliko su detetu još uvek potrebne)",
  ],
  bringNote:
    "Prilikom upisa deteta u predškolsku ustanovu, roditelj se sa zaposlenima dogovara u vezi sa adaptacijom deteta na kolektiv i dobija nedeljni plan dnevnih aktivnosti.",
  outro: "Radujemo se da postanete deo naše Borići priče. Dobrodošli!",
};

export const TESTIMONIALS_HIGHLIGHT =
  "Prelep vrtić, izuzetne vaspitačice, deca uživaju u prelepom dvorištu!";

export const TESTIMONIALS_OUTRO =
  "Zakažite posetu i sami procenite da li je vrtić Borići pravi izbor za Vaše dete. Čekamo vas!";

export const TESTIMONIALS = [
  {
    quote:
      "Prekrasan vrtić sa najlepšim dvorištem za igru, divne vaspitačice sa morem kreativnih ideja, šetnjice, piknici, časovi muzičkog, odlična kuhinja… sve to čini vrtić Borići najboljim za naše/vaše dete. A kako je dečji utisak još važniji, podeliću i utisak mog deteta koje kaže: „Ja najviše volim moj vrtić i moje drugare i mnogo mi nedostaju kada ne idem.“ 🙂",
    name: "Renata Hornung",
    role: "- Davidova mama",
    emoji: "🧡",
  },
  {
    quote:
      "Moja preporuka za svakoga ko želi da upiše dete u vrtić je Borići. Lepo uređene i prostrane prostorije za odmor i igru dece, kao i dvorište koje je okruženo borovom šumom. Sa fenomenalnim vaspitačima smo brzo prebrodili period privikavanja i sada ujutru trči da obuje patikice i da ide u vrtić da se igra sa drugarima. Svaki dan nas iznenadi sa novom pesmicom. – Saša",
    name: "Saša i Milica Dražić",
    role: "- Isidorini roditelji",
    emoji: "🐿️",
  },
  {
    quote:
      "Prelep vrtić, izuzetne vaspitačice, deca uživaju u prelepom dvorištu… Što je najbitnije, dete je veselo i zadovoljno kada dođem po nju. Svaka preporuka za Boriće. – Milica",
    name: "Saša i Milica Dražić",
    role: "- Isidorini roditelji",
    emoji: "🌷",
  },
  {
    quote:
      "Po meni najlepši vrtić u Beogradu! Da deca borave u sred borove šume, mislim da nema nigde. Sjajni ste <3",
    name: "Dragana Stamenković",
    role: "- Kostina i Lenina mama",
    emoji: "🌲",
  },
  {
    quote:
      "Kao neko čije dete već ide u Borići jaslice, mogu samo da potvrdim prelepo dvorište i prostor, divne vaspitačice, odlična saradnja! Za svaku preporuku <3",
    name: "Jelena Sokolović",
    role: "- Vojina mama",
    emoji: "🧸",
  },
  {
    quote:
      "Prelep i adekvatan prostor, sve primereno potrebama mališana, ne sumnjam da su dobili 10 od inspekcije, jer je dovoljno pogledati kuhinju, toalete i igraonice. Prelepo i prostrano dvorište sa travnjakom i visokim drvećem. Poznajem vlasnicu i toplo preporučujem!",
    name: "Slađana Pavlović",
    role: "roditelj",
    emoji: "⭐",
  },
  {
    quote: "Prelep vrtić. Sve preporuke. <3",
    name: "Biljana Lučić",
    role: "- Emilijina mama",
    emoji: "💛",
  },
];

export const CAREERS = {
  lead: "Tražiš vrtić u kome ćeš moći da ostvariš sve svoje kreativne zamisli kroz edukaciju dece i učestvuješ u kreiranju novog pristupa obrazovanju?",
  intro:
    "Mi smo u potrazi za najstrastvenijim i najkreativnijim vaspitačima! Ukoliko si ti neko ko preuzima inicijativu, samostalna si, rad sa decom te ispunjava više od svega a tvoj entuzijazam i energija su nepresušni – pošalji nam svoju prijavu i postani deo Borići tima!",
  honest:
    "Ovo nije pozicija za svakoga jer mi ne zapošljavamo samo na osnovu profesionalne pozadine već na osnovu ličnosti, karaktera i ambicija. Zašto? Zato što je naš vrtić drugačiji od drugih, rad u našem timu nekonvencionalan, a naši planovi za budućnost odvažni.",
  vision: {
    title: "Šta je naša vizija?",
    text: "Mi doprinosimo redefinisanju vrednosti klasičnog obrazovnog sistema – inspirisani prirodom gradimo svet gde se ljubav, ljudskost, međusobno poštovanje i lični doprinos smatraju osnovnim vrednostima obrazovanog čoveka. Edukacijom menjamo svet.",
  },
  mission: {
    title: "Šta je naša misija?",
    text: "Jednostavno govoreći, sve što radimo radimo u želji da Borići klinci izrastu u samosvesne i uspešne ljude – a za nas to znači da vole i poštuju sve ljude, životinje i prirodu oko sebe. Osim toga, verujemo da budućnost obrazovanja ne poznaje granice, pa naglasak stavljamo na celovit razvoj ličnosti, samostalnost i empatiju, sa željom da naša deca jednoga dana postanu ostvareni i srećni ljudi koji biraju svoj put.",
  },
};

export const GALLERY = [
  "DSC00213",
  "DSC00530",
  "DSC00643-1",
  "DSC00447",
  "DSC00011",
  "DSC00081-1",
  "DSC00388",
  "DSC00094",
  "DSC00973",
  "DSC00653-1",
  "DSC00647",
  "DSC00042",
  "DSC00691-1",
  "DSC00482-e1594822087114",
  "DSC00564",
  "DSC00779-1",
  "DSC00492",
  "DSC00679",
  "DSC00585",
  "DSC00480",
  "DSC00535",
  "DSC00330",
  "DSC00589",
  "DSC00925",
  "DSC00486",
  "DSC00727",
  "DSC00521",
  "DSC00854",
  "DSC00807",
  "DSC00509",
  "DSC00157",
  "DSC00598",
];

export const HERO_PHOTOS = [
  { src: photo("DSC00653-1024x1024"), alt: "Deca u dvorištu vrtića Borići" },
  { src: photo("DSC00213"), alt: "Igra u borovoj šumi" },
  { src: photo("DSC00973"), alt: "Radionica u vrtiću Borići" },
  { src: photo("DSC00727"), alt: "Dvorište vrtića Borići" },
  { src: photo("DSC00042"), alt: "Domaća hrana u vrtiću" },
];

export const MARQUEE_ITEMS = [
  "🌲 Vrtić u šumi",
  "☀️ 205 m nadmorske visine",
  "🍲 Domaća hrana",
  "🎒 Male grupe",
  "🎨 Muzika i umetnost",
  "💚 Subvencija grada",
  "🌳 Zelena učionica",
  "🐿️ Priroda svaki dan",
  "✨ Zakažite posetu",
];

export const MEMORY_PAIRS = [
  { emoji: "🌲", label: "bor" },
  { emoji: "🐿️", label: "veverica" },
  { emoji: "🍎", label: "jabuka" },
  { emoji: "🎨", label: "boje" },
  { emoji: "🎹", label: "klavir" },
  { emoji: "🐝", label: "pčela" },
];
