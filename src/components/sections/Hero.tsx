import { Button } from "@/components/ui/button"
import { sectionEnterClass } from "@/lib/section-motion"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

export function Hero() {
  return (
    <section className={cn("py-12 text-center sm:py-14", sectionEnterClass())}>
      <div className="section-hero-frame mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-12">
        <p className="section-eyebrow mb-3">Introduction</p>
        <div className="section-divider-gradient mb-8" aria-hidden />
        <h1 className="text-4xl font-bold mb-4">
          <span className="inline-block bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            Hi, Nice to meet you!
          </span>{" "}
          <span className="text-foreground" aria-hidden>
            😊
          </span>
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          AI Student @{" "}
          <span className="font-medium text-primary">CUHK</span>
          {" "}| Computer Vision & LLM Enthusiast
        </p>
        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            className={cn(
              "justify-center gap-2 border-primary/25 bg-primary/10 text-primary shadow-sm",
              "hover:border-primary/40 hover:bg-primary/20 hover:text-primary",
              "focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download>
              <Download className="size-5 shrink-0" aria-hidden />
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
