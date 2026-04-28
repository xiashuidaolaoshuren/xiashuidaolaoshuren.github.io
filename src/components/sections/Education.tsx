import { ExperienceCard, type ExperienceItem } from "./ExperienceCard";

const educationData: ExperienceItem[] = [
  {
    title: "B.Eng. in Artificial Intelligence",
    organization: "The Chinese University of Hong Kong",
    time: "2022 - Present",
    description: "One of the top universities in Hong Kong, and highly ranked in the field of Computer Science. My study focusing on Computer Vision and Large Language Models (LLMs) and exploring the technological frontier and applying AI to solve real-world problems. (Note: Although the university are named with 'Chinese', all major courses are taught in English.)",
    emblem: "images/Emblem_of_CU.png",
    url: "https://www.cuhk.edu.hk/english/index.html"
  },
  {
    title: "Secondary Education",
    organization: "S.K.H. Chan Young Secondary School",
    time: "2016 - 2022",
    description: "A reputable English secondary school in North District, Hong Kong where I completed my secondary education with a focus on science and technology. I chose Physics, Chemistry and ICT as my elective subjects to build a strong foundation for my future studies in engineering.",
    emblem: "images/Emblem_of_SKHCYSS.png",
    url: "https://www.skhcyss.edu.hk/"
  },
  {
    title: "Primary Education",
    organization: "Tsang Mui Millennium School",
    time: "2010 - 2016",
    description: "A reputable primary school in North District, Hong Kong where I completed my primary education with a focus on foundational knowledge and skills. I developed a strong interest in science and technology during my time here.",
    emblem: "images/Emblem_of_TMMS.png",
    url: "https://www.tmms.edu.hk/"
  },
];

export function Education() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        {educationData.map((item, index) => (
          <ExperienceCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
