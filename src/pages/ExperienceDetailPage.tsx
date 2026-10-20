import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ContentBlocks } from "@/components/ContentBlocks";
import { MediaGalleryGrid } from "@/components/MediaGalleryGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExperienceById, resolveMapEmbedQuery } from "@/data/experience";
import { sectionEnterClass } from "@/lib/section-motion";
import { cn, pageContentShellClassName } from "@/lib/utils";

const backNavLinkClassName =
  "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary";

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

/** Split `institutionOverview` on blank lines into paragraphs for rendering. */
function institutionOverviewParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function googleMapsEmbedPlaceUrl(
  address: string,
  zoom: number,
  apiKey: string
): string {
  const base = "https://www.google.com/maps/embed/v1/place";
  const params = new URLSearchParams({
    key: apiKey,
    q: address,
    zoom: String(zoom),
  });
  return `${base}?${params.toString()}`;
}

/**
 * Public Google Maps link used when no Embed API key is available.
 * A `place_id:` query is resolved through `query_place_id`; anything else is
 * passed as free-text `query`.
 */
function googleMapsSearchUrl(query: string, address: string): string {
  const placeIdPrefix = "place_id:";
  if (query.startsWith(placeIdPrefix)) {
    const params = new URLSearchParams({
      api: "1",
      query: address,
      query_place_id: query.slice(placeIdPrefix.length),
    });
    return `https://www.google.com/maps/search/?${params.toString()}`;
  }
  const params = new URLSearchParams({ api: "1", query });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const experience = id ? getExperienceById(id) : undefined;
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
    | string
    | undefined;

  if (!experience) {
    return (
      <div className={cn(pageContentShellClassName, "py-16")}>
        <div
          className={cn(
            "section-projects-frame px-6 py-12 text-center sm:px-10",
            sectionEnterClass()
          )}
        >
          <p className="section-eyebrow mb-3">Experience</p>
          <h1 className="text-2xl font-bold tracking-tight">Entry not found</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            That experience does not exist or the link may be outdated.
          </p>
          <Link to="/" className={cn(backNavLinkClassName, "mt-8")}>
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const backTo =
    experience.kind === "job" ? "/#job_experience" : "/#education";

  const hasMapsKey = Boolean(mapsApiKey && mapsApiKey.trim() !== "");

  if (experience.location && !hasMapsKey) {
    console.warn(
      "[ExperienceDetailPage] VITE_GOOGLE_MAPS_API_KEY is not set; showing the address link instead of the embedded map."
    );
  }

  const mapZoom = experience.location?.zoom ?? 15;
  const mapsSearchUrl = experience.location
    ? googleMapsSearchUrl(
        resolveMapEmbedQuery(experience.location),
        experience.location.address
      )
    : undefined;

  const aboutTitle = `About ${experience.organization}`;
  const contributionsTitle = `What I did at ${experience.organization}`;
  const showContributionsSection = Boolean(
    experience.contributionsContent?.length
  );

  return (
    <div className={pageContentShellClassName}>
      <article className={cn("py-12", sectionEnterClass())}>
        <div className="section-projects-frame px-4 py-8 sm:px-6 sm:py-10">
          <Link to={backTo} className={cn(backNavLinkClassName, "mb-8")}>
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back
          </Link>

          <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1">
              <p className="section-eyebrow mb-2 text-left sm:pl-0.5">
                {experience.organization}
              </p>
              <div
                className="section-divider-gradient section-divider-gradient--start mb-6"
                aria-hidden
              />
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {experience.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    experience.engagement === "Full-time"
                      ? "default"
                      : "secondary"
                  }
                >
                  {experience.engagement}
                </Badge>
                <Badge variant="secondary">{experience.time}</Badge>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted p-4 text-center text-xs text-muted-foreground">
                {experience.emblem &&
                !experience.emblem.includes("placeholder") ? (
                  <img
                    src={experience.emblem}
                    alt={`${experience.organization} emblem`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span>Emblem</span>
                )}
              </div>
              {experience.url ? (
                <Button className="w-full sm:w-auto" asChild>
                  <a
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Visit website
                  </a>
                </Button>
              ) : null}
            </div>
          </header>

          <DetailSection title={aboutTitle} delayClass="delay-75">
            {institutionOverviewParagraphs(experience.institutionOverview).map(
              (paragraph, idx) => (
                <p key={idx} className={cn(idx > 0 && "mt-4")}>
                  {paragraph}
                </p>
              )
            )}
          </DetailSection>

          {showContributionsSection ? (
            <DetailSection title={contributionsTitle} delayClass="delay-100">
              <ContentBlocks blocks={experience.contributionsContent ?? []} />
            </DetailSection>
          ) : null}

          {experience.location ? (
            <section className={cn("mt-10", sectionEnterClass("delay-150"))}>
              <h2 className="mb-3 text-lg font-semibold tracking-tight">
                Location
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {experience.location.address}
              </p>
              {hasMapsKey && mapsApiKey ? (
                <div className="overflow-hidden rounded-xl border border-primary/15 bg-muted/25 shadow-sm">
                  <div className="relative aspect-[16/10] w-full bg-muted/40">
                    <iframe
                      title={`Map: ${experience.organization}`}
                      src={googleMapsEmbedPlaceUrl(
                        resolveMapEmbedQuery(experience.location),
                        mapZoom,
                        mapsApiKey
                      )}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={backNavLinkClassName}
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  Open in Google Maps
                </a>
              )}
            </section>
          ) : null}

          {experience.gallery && experience.gallery.length > 0 ? (
            <MediaGalleryGrid
              title="Gallery"
              items={experience.gallery}
              delayClass="delay-200"
            />
          ) : null}

          <div
            className={cn(
              "mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-8",
              sectionEnterClass("delay-200")
            )}
          >
            <Link to={backTo} className={backNavLinkClassName}>
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              Back
            </Link>
            {experience.url ? (
              <Button className="w-full sm:w-auto" asChild>
                <a
                  href={experience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Visit website
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
