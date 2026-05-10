import { EDUCATION_ITEMS } from "@/data/experience"
import { sectionEnterClass } from "@/lib/section-motion"
import { cn } from "@/lib/utils"
import { ExperienceCard } from "./ExperienceCard"

export function Education() {
  return (
    <section className={cn("py-12", sectionEnterClass("delay-150"))}>
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        {EDUCATION_ITEMS.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
