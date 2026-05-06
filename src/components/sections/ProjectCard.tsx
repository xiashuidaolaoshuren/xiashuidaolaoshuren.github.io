import { useId } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = useId();
  const detailHref = `/projects/${project.id}`;

  const cardBody = (
    <Card
      className={cn(
        "overflow-hidden border border-transparent transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:border-primary/50",
        "group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary/50 cursor-pointer"
      )}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted md:w-1/3">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-contain object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col md:w-2/3">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle
                id={titleId}
                className="min-w-0 flex-1 text-xl font-bold leading-snug"
              >
                {project.title}
              </CardTitle>
              <div className="flex shrink-0 items-center gap-2">
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden
                />
                <span className="sr-only">View project details</span>
                <Badge
                  variant={
                    project.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </div>
            {project.techStack && (
              <div className="mt-1 flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-primary/25 bg-primary/10 text-xs text-primary hover:bg-primary/15"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <p className="leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <Link
      to={detailHref}
      aria-labelledby={titleId}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {cardBody}
    </Link>
  );
}
