/**
 * Experience entries for Job Experience and Education sections.
 * Cards link to /experience/:id; detail pages use optional details, location, and url.
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
  /** Full narrative; cards show a line-clamped teaser. */
  description: string;
  /** Accomplishment bullets on the detail page only. */
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
    description:
      "Conducted research and developed an AI-powered software testing platform, contributing approximately 300 commits to the codebase. Collaborated with a team of senior software engineers and assisted in the development of the platform's frontend and backend components.",
    details: [
      "Built and iterated on an AI-powered software testing platform alongside senior engineers.",
      "Contributed roughly 300 commits across frontend and backend work on the codebase.",
      "Supported research and implementation for test automation and platform reliability.",
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
    description:
      "One of the top universities in Hong Kong, and highly ranked in the field of Computer Science. My study focusing on Computer Vision and Large Language Models (LLMs) and exploring the technological frontier and applying AI to solve real-world problems. (Note: Although the university are named with 'Chinese', all major courses are taught in English.)",
    details: [
      "Focused on Computer Vision and Large Language Models (LLMs).",
      "Coursework and projects emphasize applying AI to real-world problems.",
      "Instruction is in English across major courses.",
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
    description:
      "A reputable English secondary school in North District, Hong Kong where I completed my secondary education with a focus on science and technology. I chose Physics, Chemistry and ICT as my elective subjects to build a strong foundation for my future studies in engineering.",
    details: [
      "Electives: Physics, Chemistry, and ICT.",
      "English-medium secondary school in North District, Hong Kong.",
      "Prepared a foundation for further engineering study.",
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
    description:
      "A reputable primary school in North District, Hong Kong where I completed my primary education with a focus on foundational knowledge and skills. I developed a strong interest in science and technology during my time here.",
    details: [
      "Completed primary education in North District, Hong Kong.",
      "Developed early interest in science and technology.",
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
