import { sectionEnterClass } from "@/lib/section-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge";

interface SkillCategory {
  title: string;
  skills: string[];
}

interface LanguageSkill {
  name: string;
  code: string; // ISO 3166-1 alpha-2 country code
  level: number; // 1-5
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "TypeScript/JavaScript", "C/C++", "SQL", "HTML/CSS", "Android Kotlin"],
  },
  {
    title: "Tools & Frameworks",
    skills: ["React", "Node.js", "Tailwind CSS", "Figma", "Tableau", "Microsoft Office", "Git", "Docker", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Cursor"],
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Team Collaboration", "Responsibility", "Adaptability", "Time Management", "Eager to Learn", "Fast Learner", "Critical Thinking"], 
  },
];
    
const languages: LanguageSkill[] = [
  { name: "English", code: "gb", level: 4 },  
  { name: "Mandarin", code: "cn", level: 5 },
  { name: "Cantonese", code: "hk", level: 5 }
];

const InterestedFields: string[] = [
  "Computer Vision",
  "Large Language Models",
  "Generative AI",
  "Deep Learning",
  "Natural Language Processing",
  "Machine Learning",
]

function LanguageRating({ level }: { readonly level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`h-3 w-3 rounded-full ${
            dot <= level ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section className={cn("py-12", sectionEnterClass("delay-300"))}>
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Technical & Soft Skills */}
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="border-primary/20 bg-primary/10 py-1 px-3 text-sm font-medium text-primary hover:bg-primary/15"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Language proficiency & Interested Fields */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Language Proficiency</h3>
            <div className="bg-card rounded-lg border p-6">
              <div className="grid gap-6">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://flagcdn.com/${lang.code}.svg`}
                        alt={`${lang.name} flag`}
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                      />
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    <LanguageRating level={lang.level} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Interested Fields</h3>
            <div className="flex flex-wrap gap-2">
              {InterestedFields.map((field) => (
                <Badge
                  key={field}
                  variant="secondary"
                  className="border-primary/20 bg-primary/10 py-1 px-3 text-sm font-medium text-primary hover:bg-primary/15"
                >
                  {field}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
