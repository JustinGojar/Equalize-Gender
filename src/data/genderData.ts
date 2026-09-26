/**
 * All content below is sourced from official Philippine government bodies and
 * UN agencies. Nothing here is invented; every figure keeps the original
 * definition, population, scope and reference year of its source.
 */

export type Source = {
  id: string;
  organization: string;
  title: string;
  year: string;
  description: string;
  url: string;
};

export const sources: Source[] = [
  {
    id: "psa-sdg-ipv",
    organization: "Philippine Statistics Authority (PSA)",
    title: "SDG Indicator 5.2.1 — Intimate partner violence, Philippines",
    year: "2022",
    description:
      "Official Philippine SDG indicator reporting on the proportion of ever-partnered women and girls aged 15 and older subjected to violence by a current or former intimate partner in the previous 12 months.",
    url: "https://psa.gov.ph/statistics/sdg",
  },
  {
    id: "psa-ndhs-2022",
    organization: "Philippine Statistics Authority (PSA)",
    title: "National Demographic and Health Survey (NDHS) 2022 — Key Findings",
    year: "2023",
    description:
      "Nationally representative survey covering women's health, education, employment and experience of violence. The source of the 2022 violence estimates used on this site.",
    url: "https://psa.gov.ph/content/national-demographic-and-health-survey-ndhs",
  },
  {
    id: "psa-ndhs-2017",
    organization: "Philippine Statistics Authority (PSA)",
    title: "National Demographic and Health Survey (NDHS) 2017",
    year: "2018",
    description:
      "Earlier round of the NDHS, used here only for the 2017 reference-year comparison of intimate partner violence.",
    url: "https://psa.gov.ph/content/national-demographic-and-health-survey-ndhs",
  },
  {
    id: "psa-women-men",
    organization: "Philippine Statistics Authority (PSA)",
    title: "Women and Men in the Philippines: Statistical Handbook",
    year: "2023",
    description:
      "Compilation of gender statistics on education, labour force participation, employment and decision-making in the Philippines.",
    url: "https://psa.gov.ph/gender-stat",
  },
  {
    id: "pcw",
    organization: "Philippine Commission on Women (PCW)",
    title: "Republic Act 9710 — Magna Carta of Women: primer and resources",
    year: "2009",
    description:
      "The national machinery for women explains the Magna Carta of Women, its implementing rules, and the rights it recognises.",
    url: "https://pcw.gov.ph/magna-carta-of-women/",
  },
  {
    id: "og-9262",
    organization: "Official Gazette of the Republic of the Philippines",
    title: "Republic Act No. 9262 — Anti-Violence Against Women and Their Children Act of 2004",
    year: "2004",
    description: "Full official text of the law, including definitions, remedies and penalties.",
    url: "https://www.officialgazette.gov.ph/2004/03/08/republic-act-no-9262-s-2004/",
  },
  {
    id: "og-9710",
    organization: "Official Gazette of the Republic of the Philippines",
    title: "Republic Act No. 9710 — Magna Carta of Women",
    year: "2009",
    description:
      "Full official text of the comprehensive women's human rights law of the Philippines.",
    url: "https://www.officialgazette.gov.ph/2009/08/14/republic-act-no-9710/",
  },
  {
    id: "og-11313",
    organization: "Official Gazette of the Republic of the Philippines",
    title: "Republic Act No. 11313 — Safe Spaces Act",
    year: "2019",
    description:
      "Full official text of the law penalising gender-based sexual harassment in streets, public spaces, online, workplaces and educational institutions.",
    url: "https://www.officialgazette.gov.ph/2019/04/17/republic-act-no-11313/",
  },
  {
    id: "og-11596",
    organization: "Official Gazette of the Republic of the Philippines",
    title: "Republic Act No. 11596 — Prohibiting Child Marriage",
    year: "2021",
    description:
      "Official text of the law declaring child marriage unlawful and prescribing penalties.",
    url: "https://www.officialgazette.gov.ph/2021/12/10/republic-act-no-11596/",
  },
  {
    id: "unwomen-vaw",
    organization: "UN Women",
    title: "Facts and figures: Ending violence against women",
    year: "2024",
    description:
      "Global reference on the scale, forms and prevention of violence against women and girls.",
    url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/facts-and-figures",
  },
  {
    id: "un-sdg5",
    organization: "United Nations",
    title: "Sustainable Development Goal 5: Gender equality",
    year: "2024",
    description:
      "The global goal and indicator framework for achieving gender equality and empowering all women and girls.",
    url: "https://sdgs.un.org/goals/goal5",
  },
  {
    id: "dswd-vawc",
    organization: "Department of Social Welfare and Development (DSWD)",
    title: "Services for women in especially difficult circumstances",
    year: "2024",
    description:
      "Government programmes and referral services for women and children in crisis situations.",
    url: "https://www.dswd.gov.ph/",
  },
  {
    id: "pnp-wcpc",
    organization: "Philippine National Police — Women and Children Protection Center",
    title: "Women and Children Protection Desks",
    year: "2024",
    description:
      "The PNP unit mandated to handle cases involving women and children, with desks in police stations nationwide.",
    url: "https://wcpc.pnp.gov.ph/",
  },
  {
    id: "ched-sog",
    organization: "Commission on Higher Education (CHED)",
    title: "Guidelines on gender and development in higher education",
    year: "2015",
    description:
      "Policy requiring higher education institutions to mainstream gender equality and address gender-based harassment.",
    url: "https://ched.gov.ph/",
  },
];

export const sourceById = (id: string) => sources.find((s) => s.id === id);

export type Stat = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  definition: string;
  meaning: string;
  referenceYear: string;
  sourceId: string;
  sourceLabel: string;
};

export const headlineStats: Stat[] = [
  {
    id: "ipv-12m",
    value: 11.9,
    suffix: "%",
    decimals: 1,
    label: "Intimate partner violence, past 12 months",
    definition:
      "Proportion of ever-partnered women and girls aged 15 years and older subjected to physical, sexual, or psychological violence by a current or former intimate partner in the previous 12 months, Philippines, 2022.",
    meaning:
      "Roughly 1 in 8 ever-partnered women and girls aged 15+ reported experiencing this kind of violence in the year before the survey. The figure describes reported experience within one 12-month window — it does not, on its own, explain causes.",
    referenceYear: "2022",
    sourceId: "psa-sdg-ipv",
    sourceLabel: "PSA / NDHS, 2022",
  },
  {
    id: "ipv-2017",
    value: 14.7,
    suffix: "%",
    decimals: 1,
    label: "Same indicator, earlier reference year",
    definition:
      "Proportion of ever-partnered women and girls aged 15 years and older subjected to physical, sexual, or psychological violence by a current or former intimate partner in the previous 12 months, Philippines, 2017.",
    meaning:
      "The earlier reading for the same indicator. Comparing 2017 and 2022 shows a decrease in reported past-year violence, but a change in a survey estimate does not by itself prove which policies or programmes caused it.",
    referenceYear: "2017",
    sourceId: "psa-ndhs-2017",
    sourceLabel: "PSA / NDHS, 2017",
  },
  {
    id: "sdg5",
    value: 5,
    label: "Sustainable Development Goal on gender equality",
    definition:
      "SDG 5 commits all UN member states, including the Philippines, to achieve gender equality and empower all women and girls by 2030.",
    meaning:
      "Gender equality is not only a national concern. It is one of the 17 global goals the Philippines reports on, which is why agencies such as the PSA publish official gender indicators.",
    referenceYear: "2015–2030",
    sourceId: "un-sdg5",
    sourceLabel: "United Nations, SDG 5",
  },
];

export const ipvTrend = {
  labels: ["2017", "2022"],
  values: [14.7, 11.9],
  note: "Proportion of ever-partnered women and girls aged 15+ subjected to physical, sexual, or psychological violence by a current or former intimate partner in the previous 12 months, Philippines.",
  sourceId: "psa-sdg-ipv",
  sourceLabel: "PSA / NDHS, 2017 and 2022",
};

export type Indicator = {
  id: string;
  area: string;
  indicator: string;
  value: string;
  year: string;
  note: string;
  sourceId: string;
  sourceLabel: string;
};

export const indicators: Indicator[] = [
  {
    id: "education",
    area: "Education",
    indicator: "Functional literacy and school participation are monitored by sex",
    value: "Reported by sex",
    year: "2023",
    note: "PSA publishes education participation and literacy statistics disaggregated by sex in its gender statistics handbook.",
    sourceId: "psa-women-men",
    sourceLabel: "PSA, Women and Men in the Philippines, 2023",
  },
  {
    id: "employment",
    area: "Employment",
    indicator: "Labour force participation rate is consistently lower for women than for men",
    value: "Gap reported by sex",
    year: "2023",
    note: "PSA labour statistics are published by sex, showing a persistent difference in labour force participation between women and men.",
    sourceId: "psa-women-men",
    sourceLabel: "PSA, Women and Men in the Philippines, 2023",
  },
  {
    id: "economic",
    area: "Economic participation",
    indicator: "Ownership, entrepreneurship and household decision-making by sex",
    value: "Reported by sex",
    year: "2023",
    note: "Economic participation indicators are compiled in the PSA gender statistics programme.",
    sourceId: "psa-women-men",
    sourceLabel: "PSA, Women and Men in the Philippines, 2023",
  },
  {
    id: "leadership",
    area: "Leadership",
    indicator: "Women in elective posts and in government decision-making positions",
    value: "Reported by sex",
    year: "2023",
    note: "The Magna Carta of Women requires the State to work towards women's equal participation in decision-making and policy-making.",
    sourceId: "pcw",
    sourceLabel: "PCW / PSA",
  },
  {
    id: "violence",
    area: "Violence",
    indicator:
      "Ever-partnered women and girls aged 15+ subjected to intimate partner violence in the previous 12 months",
    value: "11.9%",
    year: "2022",
    note: "This is the official SDG 5.2.1 figure for the Philippines for reference year 2022.",
    sourceId: "psa-sdg-ipv",
    sourceLabel: "PSA / NDHS, 2022",
  },
  {
    id: "protection",
    area: "Social protection",
    indicator: "Protection orders and support services for survivors are mandated by law",
    value: "RA 9262",
    year: "2004",
    note: "RA 9262 provides barangay, temporary and permanent protection orders, plus support services through LGUs and national agencies.",
    sourceId: "og-9262",
    sourceLabel: "Official Gazette, RA 9262",
  },
  {
    id: "empowerment",
    area: "Women empowerment",
    indicator: "Comprehensive women's human rights framework in force",
    value: "RA 9710",
    year: "2009",
    note: "The Magna Carta of Women is the Philippine law that recognises and protects women's human rights across sectors.",
    sourceId: "og-9710",
    sourceLabel: "Official Gazette, RA 9710",
  },
];

export const indicatorNotice =
  "Statistics are presented according to the latest available official data. Different indicators may use different reference years.";

export type Form = {
  id: string;
  title: string;
  icon: string;
  definition: string;
  example: string;
  more: string;
};

export const formsOfGbv: Form[] = [
  {
    id: "physical",
    title: "Physical violence",
    icon: "shield",
    definition: "Acts that cause bodily harm or physical pain to a person.",
    example: "Hitting or physically restraining a partner during an argument.",
    more: "Under RA 9262, physical violence against a woman or her child by a partner or former partner is a criminal act, and survivors may apply for protection orders.",
  },
  {
    id: "sexual",
    title: "Sexual violence",
    icon: "alert",
    definition: "Any sexual act or attempt carried out without a person's free and full consent.",
    example:
      "Pressuring someone into an unwanted sexual act by threatening to end a relationship.",
    more: "Consent must be freely given. Philippine law treats sexual violence as a serious offence, and RA 9262 includes acts of a sexual nature within its definition of violence.",
  },
  {
    id: "psychological",
    title: "Psychological or emotional abuse",
    icon: "brain",
    definition:
      "Repeated behaviour that causes mental or emotional suffering, fear, or loss of self-worth.",
    example: "Constantly insulting, isolating, or intimidating a partner or family member.",
    more: "RA 9262 explicitly names psychological violence, including intimidation, harassment, repeated verbal abuse and public humiliation.",
  },
  {
    id: "economic",
    title: "Economic abuse",
    icon: "wallet",
    definition:
      "Controlling or withholding money, work, or resources so a person becomes financially dependent.",
    example: "Preventing a partner from working or taking their earnings without consent.",
    more: "RA 9262 defines economic abuse as acts that make a woman financially dependent, including withdrawal of financial support and controlling conjugal money.",
  },
  {
    id: "harassment",
    title: "Gender-based harassment",
    icon: "users",
    definition:
      "Unwanted comments, gestures, or conduct directed at a person because of their sex, gender, or gender expression.",
    example: "Catcalling a stranger on the street or making sexist remarks about a classmate.",
    more: "The Safe Spaces Act (RA 11313) covers gender-based sexual harassment in streets, public spaces, workplaces and schools.",
  },
  {
    id: "online",
    title: "Online gender-based harassment",
    icon: "globe",
    definition:
      "Harassment carried out through digital platforms, messages, or social media because of a person's sex or gender.",
    example:
      "Sending unsolicited sexual messages, or repeatedly posting demeaning comments about someone's gender.",
    more: "RA 11313 includes a specific section on gender-based online sexual harassment, covering acts such as unwanted sexual remarks and uploading or sharing content without consent.",
  },
  {
    id: "discrimination",
    title: "Discrimination",
    icon: "scale",
    definition:
      "Treating a person unfairly or denying them opportunities because of their sex or gender.",
    example: "Rejecting a qualified applicant only because of assumptions about their gender.",
    more: "The Magna Carta of Women (RA 9710) obliges the State to eliminate discrimination against women in education, employment, health and public life.",
  },
];

export type Quiz = {
  statement: string;
  isMyth: boolean;
  explanation: string;
  sourceLabel: string;
};

export const quizItems: Quiz[] = [
  {
    statement: "Gender equality means giving one gender more rights than another.",
    isMyth: true,
    explanation:
      "Gender equality means that people should have equal rights, opportunities, and protection regardless of sex or gender.",
    sourceLabel: "UN, SDG 5",
  },
  {
    statement: "Gender-based violence can be physical, sexual, psychological, or economic.",
    isMyth: false,
    explanation:
      "RA 9262 recognises physical, sexual, psychological and economic abuse as forms of violence against women and their children.",
    sourceLabel: "Official Gazette, RA 9262",
  },
  {
    statement: "Harassment only counts if it happens face to face.",
    isMyth: true,
    explanation:
      "The Safe Spaces Act covers gender-based sexual harassment in streets and public spaces, in workplaces, in schools, and online.",
    sourceLabel: "Official Gazette, RA 11313",
  },
  {
    statement: "The Philippines has a law specifically protecting women's human rights.",
    isMyth: false,
    explanation:
      "Republic Act 9710, the Magna Carta of Women, is a comprehensive women's human rights law enacted in 2009.",
    sourceLabel: "PCW / Official Gazette, RA 9710",
  },
  {
    statement: "Only women and girls can experience gender-based harassment.",
    isMyth: true,
    explanation:
      "The Safe Spaces Act protects all persons from gender-based sexual harassment regardless of sex, gender identity or expression, even though women and girls are disproportionately affected.",
    sourceLabel: "Official Gazette, RA 11313",
  },
  {
    statement:
      "Official Philippine statistics on intimate partner violence come from national surveys.",
    isMyth: false,
    explanation:
      "The Philippine Statistics Authority reports the SDG indicator on intimate partner violence using the National Demographic and Health Survey.",
    sourceLabel: "PSA / NDHS, 2022",
  },
  {
    statement: "Reporting a lower survey figure means the problem has been solved.",
    isMyth: true,
    explanation:
      "A lower estimate in a later survey round is meaningful, but a single indicator does not prove the problem is solved or identify what caused the change.",
    sourceLabel: "PSA / NDHS, 2017 and 2022",
  },
];

export type Law = {
  id: string;
  ra: string;
  title: string;
  year: string;
  summary: string;
  why: string;
  sourceId: string;
};

export const laws: Law[] = [
  {
    id: "ra9710",
    ra: "Republic Act No. 9710",
    title: "Magna Carta of Women",
    year: "2009",
    summary:
      "A comprehensive women's human rights law that seeks to eliminate discrimination against women by recognising, protecting, fulfilling and promoting their rights, especially those in marginalised sectors.",
    why: "It frames gender equality as a matter of human rights and obliges government agencies and local governments to act on education, health, employment, representation and protection from violence.",
    sourceId: "og-9710",
  },
  {
    id: "ra9262",
    ra: "Republic Act No. 9262",
    title: "Anti-Violence Against Women and Their Children Act of 2004",
    year: "2004",
    summary:
      "Defines and penalises violence against women and their children committed by a spouse, former spouse, dating partner or person with whom the woman has a common child, covering physical, sexual, psychological and economic abuse.",
    why: "It gives survivors concrete remedies, including barangay, temporary and permanent protection orders, and requires support services from government agencies.",
    sourceId: "og-9262",
  },
  {
    id: "ra11313",
    ra: "Republic Act No. 11313",
    title: "Safe Spaces Act (Bawal Bastos Law)",
    year: "2019",
    summary:
      "Penalises gender-based sexual harassment in streets and public spaces, in online spaces, in workplaces, and in educational and training institutions, regardless of the victim's sex, gender identity or expression.",
    why: "It recognises that harassment happens in everyday places — sidewalks, jeepneys, group chats, classrooms and offices — and places clear duties on employers, schools and local governments.",
    sourceId: "og-11313",
  },
  {
    id: "ra11596",
    ra: "Republic Act No. 11596",
    title: "Act Prohibiting the Practice of Child Marriage",
    year: "2021",
    summary:
      "Declares child marriage unlawful and penalises facilitating, solemnising or cohabiting in such a marriage, recognising it as a practice that harms children, especially girls.",
    why: "It closes a gap that exposed children to early marriage and its lifelong effects on education, health and autonomy.",
    sourceId: "og-11596",
  },
];

export const lawDisclaimer =
  "This page is educational and general. It is not legal advice. For any specific situation, consult the official text of the law or a qualified professional.";

export type LanguageSwap = {
  avoid: string;
  use: string;
  why: string;
};

export const languageSwaps: LanguageSwap[] = [
  {
    avoid: "“Women are naturally better at caring.”",
    use: "“People have different strengths and interests regardless of gender.”",
    why: "Tying a skill to a gender turns a personal strength into an expectation, and quietly excludes everyone else.",
  },
  {
    avoid: "“That's a man's job.”",
    use: "“That job needs these specific skills.”",
    why: "Describing the work instead of the worker keeps opportunities open to whoever is qualified.",
  },
  {
    avoid: "“Don't be so emotional.”",
    use: "“Let's talk about what happened.”",
    why: "Dismissing feelings as a gender trait shuts down the conversation instead of addressing the issue.",
  },
  {
    avoid: "“Chairman” / “stewardess” / “manpower”",
    use: "“Chairperson” / “flight attendant” / “workforce”",
    why: "Gender-neutral job titles describe the role accurately and include everyone doing it.",
  },
  {
    avoid: "“Boys will be boys.”",
    use: "“That behaviour is not acceptable, whoever does it.”",
    why: "Excusing harmful behaviour as natural removes accountability and normalises harassment.",
  },
  {
    avoid: "“She was asking for it, look at how she dressed.”",
    use: "“Harassment is the responsibility of the person who commits it.”",
    why: "Shifting blame to the person harmed discourages reporting and misplaces responsibility.",
  },
];

export const inclusionPillars = [
  {
    title: "Respect",
    body: "Treat every person as an equal, whatever their gender, and speak to them the way you would want to be spoken to.",
    icon: "heart",
  },
  {
    title: "Equal opportunity",
    body: "Selection for roles, teams and scholarships should rest on skills and effort, not assumptions about gender.",
    icon: "scale",
  },
  {
    title: "Inclusive education",
    body: "Schools are required to prevent and address gender-based harassment and to teach gender-fair content.",
    icon: "book",
  },
  {
    title: "Inclusive workplaces",
    body: "The Safe Spaces Act places duties on employers to prevent harassment and to act on reports.",
    icon: "briefcase",
  },
  {
    title: "Challenging stereotypes",
    body: "Notice generalisations about what a gender “should” be, and ask whether they are actually true.",
    icon: "sparkles",
  },
  {
    title: "Respectful communication",
    body: "Use language that describes people accurately instead of assigning traits by gender.",
    icon: "message",
  },
  {
    title: "Accessibility",
    body: "Inclusion also means spaces, materials and websites that people with disabilities can actually use.",
    icon: "accessibility",
  },
  {
    title: "Social responsibility",
    body: "Inclusion is a shared task: bystanders, classmates, colleagues and communities all shape what is normal.",
    icon: "users",
  },
];

export const actions = [
  {
    title: "Speak respectfully",
    body: "Avoid sexist jokes, stereotypes, and discriminatory language — including in group chats.",
    icon: "message",
  },
  {
    title: "Challenge stereotypes",
    body: "Question assumptions about what people “should” do based on gender.",
    icon: "sparkles",
  },
  {
    title: "Support others",
    body: "Listen respectfully and encourage people who experience discrimination or harassment to seek appropriate support.",
    icon: "heart",
  },
  {
    title: "Learn the law",
    body: "Understand the basic rights and protections that already exist under Philippine law.",
    icon: "scale",
  },
  {
    title: "Share reliable information",
    body: "Use credible sources instead of spreading unverified claims.",
    icon: "globe",
  },
];

export const commitments = [
  "I will treat people with respect.",
  "I will challenge harmful stereotypes.",
  "I will avoid discriminatory language.",
  "I will verify information before sharing it.",
  "I will promote inclusion in my community.",
];

export type Resource = {
  id: string;
  category: "Learn" | "Know Your Rights" | "Get Help" | "Promote Inclusion";
  title: string;
  description: string;
  organization: string;
  sourceId: string;
};

export const resources: Resource[] = [
  {
    id: "r1",
    category: "Learn",
    title: "Official Philippine gender statistics",
    description:
      "Browse the PSA gender statistics programme for data on education, employment, leadership and violence.",
    organization: "Philippine Statistics Authority",
    sourceId: "psa-women-men",
  },
  {
    id: "r2",
    category: "Learn",
    title: "Facts and figures on violence against women",
    description:
      "A global overview of the forms, scale and prevention of violence against women and girls.",
    organization: "UN Women",
    sourceId: "unwomen-vaw",
  },
  {
    id: "r3",
    category: "Know Your Rights",
    title: "Magna Carta of Women primer",
    description:
      "The Philippine Commission on Women explains the rights recognised under RA 9710 and how they apply.",
    organization: "Philippine Commission on Women",
    sourceId: "pcw",
  },
  {
    id: "r4",
    category: "Know Your Rights",
    title: "Full text of the Safe Spaces Act",
    description:
      "Read RA 11313 directly, including the sections on public spaces, online spaces, workplaces and schools.",
    organization: "Official Gazette of the Philippines",
    sourceId: "og-11313",
  },
  {
    id: "r5",
    category: "Know Your Rights",
    title: "Full text of RA 9262",
    description:
      "The Anti-VAWC Act, including definitions of abuse and the protection orders available to survivors.",
    organization: "Official Gazette of the Philippines",
    sourceId: "og-9262",
  },
  {
    id: "r6",
    category: "Get Help",
    title: "PNP Women and Children Protection Center",
    description:
      "The police unit handling cases involving women and children, with protection desks in stations nationwide.",
    organization: "Philippine National Police",
    sourceId: "pnp-wcpc",
  },
  {
    id: "r7",
    category: "Get Help",
    title: "DSWD services and referrals",
    description:
      "Government programmes and referral pathways for women and children in crisis situations.",
    organization: "Department of Social Welfare and Development",
    sourceId: "dswd-vawc",
  },
  {
    id: "r8",
    category: "Promote Inclusion",
    title: "Gender and development in higher education",
    description:
      "CHED policy guidance requiring colleges and universities to mainstream gender equality.",
    organization: "Commission on Higher Education",
    sourceId: "ched-sog",
  },
  {
    id: "r9",
    category: "Promote Inclusion",
    title: "Sustainable Development Goal 5",
    description:
      "The global framework and targets for gender equality that the Philippines reports against.",
    organization: "United Nations",
    sourceId: "un-sdg5",
  },
];
