import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export interface ProjectItem {
  title: string;
  status: "Completed" | "In Progress" | "Maintainance"; // Example statuses
  image?: string;
  description: string;
  repoUrl: string;
  techStack?: string[];
}

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted md:w-1/3">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-contain object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
               <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
              <Badge
                variant={project.status === "Completed" ? "default" : "secondary"}
              >
                {project.status}
              </Badge>
            </div>
            {project.techStack && (
              <div className="flex flex-wrap gap-1 mt-1">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" className="w-full md:w-auto">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4 text-white" />
                <span className="text-white">View on GitHub</span>
              </a>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
