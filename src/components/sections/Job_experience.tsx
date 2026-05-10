import { JOB_EXPERIENCES } from "@/data/experience"
import { sectionEnterClass } from "@/lib/section-motion"
import { cn } from "@/lib/utils"
import { ExperienceCard } from "./ExperienceCard"

export function Job_experience() {
  return (
    <section className={cn("py-12", sectionEnterClass("delay-200"))}>
      <h2 className="text-3xl font-bold mb-6">Job Experience</h2>
      <div className="space-y-6">
        {JOB_EXPERIENCES.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
