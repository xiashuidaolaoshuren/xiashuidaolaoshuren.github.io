import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectBenchmarkChart } from "@/components/project/ProjectBenchmarkChart";
import { getProjectById, type ProjectEvidence } from "@/data/projects";
import { sectionEnterClass } from "@/lib/section-motion";
import { cn } from "@/lib/utils";

/** YouTube iframe `allow` — required for playback and fullscreen in embedded players */
const YOUTUBE_EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

function evidenceMediaKey(item: ProjectEvidence, index: number): string {
  if (item.kind === "youtube") {
    return `youtube-${item.youtubeId || "empty"}-${index}`;
  }
  if (item.kind === "video") {
    return `video-${item.src}-${index}`;
  }
  return `image-${item.src}-${index}`;
}

function youtubeNocookieEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId.trim())}?rel=0`;
}

function DetailSection({
  title,
  children,
  delayClass,
}: {
  title: string;
  children: ReactNode;
  delayClass?: string;
}) {
  return (
    <section className={cn("mt-10", sectionEnterClass(delayClass))}>
      <h2 className="mb-3 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div
          className={cn(
            "section-projects-frame px-6 py-12 text-center sm:px-10",
            sectionEnterClass()
          )}
        >
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h1 className="text-2xl font-bold tracking-tight">Project not found</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            That project does not exist or the link may be outdated.
          </p>
          <Button variant="outline" className="mt-8" asChild>
            <Link to="/projects">Back to projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const gallery: ProjectEvidence[] =
    project.evidence && project.evidence.length > 0
      ? project.evidence
      : project.image
        ? [{ src: project.image, alt: project.title }]
        : [];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
      <article className={cn("py-12", sectionEnterClass())}>
        <div className="section-projects-frame px-4 py-8 sm:px-6 sm:py-10">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back to projects
          </Link>

          <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1">
              <p className="section-eyebrow mb-2 text-left sm:pl-0.5">Project</p>
              <div className="section-divider-gradient section-divider-gradient--start mb-6" aria-hidden />
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    project.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
                {project.techStack?.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-primary/25 bg-primary/10 text-xs text-primary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 lg:items-end">
              <Button className="w-full sm:w-auto" asChild>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  View on GitHub
                </a>
              </Button>
            </div>
          </header>

          <DetailSection title="Problem" delayClass="delay-75">
            <p>{project.problem}</p>
          </DetailSection>

          <DetailSection title="Approach" delayClass="delay-100">
            <p>{project.approach}</p>
          </DetailSection>

          <DetailSection title="Key features" delayClass="delay-150">
            <ul className="list-inside list-disc space-y-2 marker:text-primary/70">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </DetailSection>

          {gallery.length > 0 ? (
            <section className={cn("mt-10", sectionEnterClass("delay-200"))}>
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Evidence & visuals
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {gallery.map((item, i) => (
                  <figure
                    key={evidenceMediaKey(item, i)}
                    className="overflow-hidden rounded-xl border border-primary/15 bg-muted/25 shadow-sm"
                  >
                    <div className="relative aspect-video w-full bg-muted/40">
                      {item.kind === "youtube" ? (
                        item.youtubeId.trim() ? (
                          <iframe
                            src={youtubeNocookieEmbedUrl(item.youtubeId)}
                            title={item.alt}
                            loading="lazy"
                            allow={YOUTUBE_EMBED_ALLOW}
                            allowFullScreen
                            className="absolute inset-0 h-full w-full border-0"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted-foreground">
                            Paste your YouTube video id into project data (Unlisted
                            visibility recommended for embeds).
                          </div>
                        )
                      ) : item.kind === "video" ? (
                        <video
                          src={item.src}
                          controls
                          playsInline
                          preload="metadata"
                          poster={item.poster}
                          aria-label={item.alt}
                          className="h-full w-full object-contain object-center"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-full w-full object-contain object-center"
                        />
                      )}
                    </div>
                    {item.caption ? (
                      <figcaption className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {project.benchmarks && project.benchmarks.length > 0
            ? project.benchmarks.map((bm, idx) => (
                <section
                  key={`${bm.metricLabel}-${idx}`}
                  className={cn("mt-10", sectionEnterClass("delay-300"))}
                >
                  <h2 className="mb-4 text-lg font-semibold tracking-tight">
                    {bm.metricLabel}
                  </h2>
                  <ProjectBenchmarkChart benchmark={bm} />
                </section>
              ))
            : null}

          <DetailSection title="Results & learnings" delayClass="delay-300">
            <p>{project.results}</p>
          </DetailSection>

          <div
            className={cn(
              "mt-12 flex flex-wrap gap-3 border-t border-border/70 pt-8",
              sectionEnterClass("delay-300")
            )}
          >
            <Button variant="outline" asChild>
              <Link to="/projects">All projects</Link>
            </Button>
            <Button asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub repository
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
