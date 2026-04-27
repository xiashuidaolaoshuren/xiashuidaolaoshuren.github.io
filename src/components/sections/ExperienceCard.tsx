import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ExperienceItem {
  title: string;
  organization: string;
  time: string;
  description: string;
  emblem?: string;
  url?: string;
}

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const isLink = Boolean(item.url);

  const cardBody = (
    <Card
      className={cn(
        "border border-transparent transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:border-primary/50",
        isLink &&
          "group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary/50 cursor-pointer"
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <div className="flex justify-between text-muted-foreground font-medium">
          <span>{item.organization}</span>
          <span>{item.time}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/3 flex items-center justify-center p-4">
          <div className="relative w-32 h-32 flex items-center justify-center bg-muted rounded-full text-muted-foreground text-xs text-center p-2">
            {item.emblem && !item.emblem.includes("placeholder") ? (
              <img
                src={item.emblem}
                alt={`${item.organization} emblem`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span>Emblem</span>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <p className="leading-relaxed">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (!isLink) {
    return cardBody;
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {cardBody}
    </a>
  );
}
