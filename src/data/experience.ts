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
      "iASPEC Service Limited is a Hong Kong–based technology company that delivers software and IT services for enterprises, including platforms that combine automation with intelligent tooling.",
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
      "The Chinese University of Hong Kong is one of Hong Kong’s leading research universities and ranks strongly in engineering and computer science. Its Artificial Intelligence programme sits within that ecosystem of rigorous technical training and research-led teaching. Although “Chinese” appears in the university name, major undergraduate courses are taught in English.",
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
      "S.K.H. Chan Young Secondary School is an English-medium secondary school in Hong Kong’s North District with a sustained emphasis on science and technology pathways alongside the broader curriculum.",
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
      "Tsang Mui Millennium School is a primary school in Hong Kong’s North District offering foundational literacy, numeracy, and general studies across standard Hong Kong curriculum expectations.",
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
