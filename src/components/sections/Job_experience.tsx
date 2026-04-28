import { ExperienceCard, type ExperienceItem } from "./ExperienceCard";

const jobData: ExperienceItem[] = [
  {
    title: "Software Engineer Intern (Summer 2025)",
    organization: "iASPEC Service Limited",
    time: "June 2025 - August 2025",
    description: "Conducted research and developed an AI-powered software testing platform, contributing approximately 300 commits to the codebase. Collaborated with a team of senior software engineers and assisted in the development of the platform's frontend and backend components.",
    emblem: "images/Emblem_of_iASPEC.png",
    url: "https://www.iaspec.com/"
  }
];

export function Job_experience() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Job Experience</h2>
      <div className="space-y-6">
        {jobData.map((item, index) => (
          <ExperienceCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}