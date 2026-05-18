/**
 * Experience entries for Job Experience and Education sections.
 * Cards link to /experience/:id; detail pages use institutionOverview, contributions, location, and url.
 */

export type ExperienceKind = "job" | "education";

export interface ExperienceLocation {
  address: string;
  lat: number;
  lng: number;
  /** Map zoom level for Google Embed API (default 15 on the detail page). */
  zoom?: number;
}

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  title: string;
  organization: string;
  time: string;
  /**
   * Neutral, third-person context about the organization (sector, reputation, programmes).
   * Shown under “About …” on the detail page and on listing cards unless `cardSummary` is set.
   * Use a blank line between paragraphs; each block is rendered as its own `<p>`.
   */
  institutionOverview: string;
  /**
   * Optional short teaser on listing cards (role- or outcome-focused).
   * Falls back to `institutionOverview` with line clamp when omitted.
   */
  cardSummary?: string;
  /** Optional paragraph above contribution bullets on the detail page. */
  contributionsIntro?: string;
  /** Bullet list of your contributions, studies, electives, or outcomes. */
  details?: string[];
  emblem?: string;
  /** Institute or organization website (used on detail page). */
  url?: string;
  location?: ExperienceLocation;
}

export const JOB_EXPERIENCES: ExperienceItem[] = [
  {
    id: "iaspec-2025",
    kind: "job",
    title: "Software Engineer Intern (Summer 2025)",
    organization: "iASPEC Service Limited",
    time: "June 2025 - August 2025",
    institutionOverview:
      "The iASPEC Group traces its roots to Hong Kong in 1988 and positions itself as a software and technology house serving enterprises across several domains.\n\nPublic-facing materials highlight four pillars: financial technology (including secure interbank and cross-border payment channels aligned with clearing, RTGS, and SWIFT-class infrastructure), health technology (teleconsultation and remote monitoring oriented offerings), education technology (interactive e-learning, virtual classrooms, and adaptive-style curricula messaging), and identity-oriented cybersecurity (digital signatures, strong authentication, and compliance-aware enterprise protections). Consulting, cloud delivery, and R&D outsourcing appear alongside product-style offerings.\n\niASPEC Service Limited operates as part of this broader footprint in Hong Kong, contributing enterprise-grade engineering where automation, reliability, and intelligent tooling intersect.",
    cardSummary:
      "Summer internship building an AI-assisted software testing platform with the engineering team—frontend and backend work across ~300 commits.",
    contributionsIntro:
      "Over three months I worked alongside senior engineers on an AI-powered software testing platform, shipping features across the stack and contributing steadily to the shared codebase.",
    details: [
      "Collaborated with senior engineers on frontend and backend components for the platform.",
      "Contributed roughly 300 commits while iterating on reliability and product-facing workflows.",
      "Supported research and implementation tied to automated testing and intelligent tooling.",
    ],
    emblem: "/images/Emblem_of_iASPEC.png",
    url: "https://www.iaspec.com/",
    location: {
      address: "Hong Kong",
      lat: 22.3115,
      lng: 114.2246,
      zoom: 14,
    },
  },
];

export const EDUCATION_ITEMS: ExperienceItem[] = [
  {
    id: "cuhk",
    kind: "education",
    title: "B.Eng. in Artificial Intelligence",
    organization: "The Chinese University of Hong Kong",
    time: "2022 - Present",
    institutionOverview:
      "The Chinese University of Hong Kong (CUHK) is a comprehensive, research-intensive university in Hong Kong’s New Territories (Sha Tin). It is organised around academic faculties and the collegiate system—undergraduate students typically affiliate with a constituent college while pursuing disciplinary majors.\n\nAcross engineering and broader STEM fields, CUHK maintains substantial teaching and research capacity and participates actively in Hong Kong’s innovation ecosystem (including partnerships and mainland-facing centres referenced on the university website).\n\nThe undergraduate Artificial Intelligence programme fits within this engineering-facing environment: students receive rigorous technical training alongside electives and projects aimed at connecting theory to applications. Despite “Chinese” in the institution name, major undergraduate engineering and science courses are commonly delivered in English.",
    cardSummary:
      "Undergraduate AI studies centred on computer vision and large language models, with projects oriented toward real-world applications.",
    details: [
      "Focused academically on Computer Vision and Large Language Models (LLMs).",
      "Coursework and projects emphasize applying AI models to practical problems.",
      "Experience studying in English across core engineering and AI subjects.",
    ],
    emblem: "/images/Emblem_of_CU.png",
    url: "https://www.cuhk.edu.hk/english/index.html",
    location: {
      address: "Shatin, New Territories, Hong Kong",
      lat: 22.4166,
      lng: 114.2103,
      zoom: 15,
    },
  },
  {
    id: "skhcyss",
    kind: "education",
    title: "Secondary Education",
    organization: "S.K.H. Chan Young Secondary School",
    time: "2016 - 2022",
    institutionOverview:
      "S.K.H. Chan Young Secondary School is a secondary school under the Anglican (Sheng Kung Hui) family of schools in Hong Kong. Its campus address on record is 6 Chi Cheong Road, Sheung Shui, New Territories.\n\nThe school presents itself as English-medium oriented and participates in broader EMI-school activities—for example student showcases tied to the Association of English Medium Secondary Schools appear among recent news items on the official website.\n\nBeyond languages, public communications emphasize STEM-linked engagement (including ICT-oriented experiences and STEAM-team competitions), careers and life-planning structures, student organisations, and overseas-style learning journeys alongside core HKDSE-facing curriculum.",
    cardSummary:
      "Six years of secondary study with Physics, Chemistry, and ICT electives as preparation for engineering.",
    details: [
      "Selected Physics, Chemistry, and ICT electives to strengthen STEM foundations.",
      "Completed secondary education in an English-medium environment in North District, Hong Kong.",
      "Built transferable habits for analytical problem-solving ahead of university engineering study.",
    ],
    emblem: "/images/Emblem_of_SKHCYSS.png",
    url: "https://www.skhcyss.edu.hk/",
    location: {
      address: "North District, Hong Kong",
      lat: 22.4945,
      lng: 114.1388,
      zoom: 15,
    },
  },
  {
    id: "tmms",
    kind: "education",
    title: "Primary Education",
    organization: "Tsang Mui Millennium School",
    time: "2010 - 2016",
    institutionOverview:
      "Tsang Mui Millennium School is an aided, whole-day, co-educational primary school in North District (Primary One Admission School Net 80). It opened in 2003, is sponsored by the Lee Chi Tat Memorial Fund Ltd., and sits at 1 Tsing Shing Road, Sheung Shui, New Territories. The medium of instruction reported in the official school profile is Chinese.\n\nThe campus occupies on the order of 6,500 m² with a full six-year class structure (30 classes across P1–P6 in recent years). Facilities named in the school’s public profile include multimedia language provision, arts and music spaces, libraries, and rooms that support diversified learning beyond standard classrooms.\n\nThe school’s stated mission centres on holistic “Sun education,” balancing academic learning with language development, values formation, liberal-arts breadth, creativity, pastoral care, and appreciative classroom culture.\n\nPublic communications also highlight multiple-intelligence style programmes, experiential outdoor learning across primary levels, and overseas learning opportunities for senior pupils. The school motto recorded in its official profile is “Constantly strive for self-perfection.” (Figures above follow the Primary School Profile as published via the Hong Kong Committee for Home-School Cooperation.)",
    cardSummary:
      "Primary years in North District where interest in science and technology first took shape.",
    details: [
      "Completed primary education in North District, Hong Kong.",
      "Developed early curiosity in science and technology through classroom and extracurricular exposure.",
    ],
    emblem: "/images/Emblem_of_TMMS.png",
    url: "https://www.tmms.edu.hk/",
    location: {
      address: "North District, Hong Kong",
      lat: 22.5065,
      lng: 114.1282,
      zoom: 15,
    },
  },
];

const ALL_EXPERIENCE: ExperienceItem[] = [
  ...JOB_EXPERIENCES,
  ...EDUCATION_ITEMS,
];

export function getExperienceById(id: string): ExperienceItem | undefined {
  return ALL_EXPERIENCE.find((item) => item.id === id);
}
