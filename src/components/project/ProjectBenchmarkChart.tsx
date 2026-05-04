import type { ProjectBenchmark } from "@/data/projects";
import { cn } from "@/lib/utils";

const MAX_SCALE = 1;

const seriesBarClass = (index: number) =>
  index === 0
    ? "bg-primary/85"
    : "bg-primary/40 ring-1 ring-inset ring-primary/30";

export function ProjectBenchmarkChart({
  benchmark,
}: {
  benchmark: ProjectBenchmark;
}) {
  const { categories, series } = benchmark;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Values are from the AIST3110 coursework report; axis labels abbreviate the
        source albums.
      </p>

      <div
        className="flex flex-wrap gap-4 text-sm"
        role="list"
        aria-label="Model legend"
      >
        {series.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2" role="listitem">
            <span
              className={cn("h-2.5 w-2.5 shrink-0 rounded-sm", seriesBarClass(i))}
              aria-hidden
            />
            <span className="text-foreground">{s.name}</span>
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        role="group"
        aria-label="CSR by album, grouped bars"
      >
        {categories.map((cat, i) => (
          <div
            key={cat}
            className="flex min-w-0 flex-col items-center"
          >
            <div
              className="flex h-40 w-full max-w-[8rem] items-end justify-center gap-1.5 sm:h-44"
              role="list"
              aria-label={`${cat}: CSR for each model`}
            >
              {series.map((s, si) => {
                const v = s.values[i] ?? 0;
                const heightPct = (v / MAX_SCALE) * 100;
                return (
                  <div
                    key={s.name}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                    role="listitem"
                  >
                    <div
                      className={cn(
                        "w-full min-w-0 max-w-10 rounded-t sm:max-w-12",
                        seriesBarClass(si)
                      )}
                      style={{ height: `${heightPct}%` }}
                      title={`${s.name}: ${v.toFixed(2)}`}
                    />
                    <span className="sr-only">
                      {s.name} {v.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 w-full text-center text-xs text-muted-foreground">
              {cat}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-md border border-border/60">
        <table className="w-full min-w-[20rem] border-collapse text-sm">
          <caption className="border-b border-border/60 px-3 py-2 text-left text-xs text-muted-foreground">
            CSR values (two decimal places)
          </caption>
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th
                scope="col"
                className="px-3 py-2 text-left font-medium text-foreground"
              >
                Album
              </th>
              {series.map((s) => (
                <th
                  key={s.name}
                  scope="col"
                  className="px-3 py-2 text-right font-medium text-foreground tabular-nums"
                >
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, rowIdx) => (
              <tr
                key={cat}
                className="border-b border-border/40 last:border-b-0 odd:bg-muted/10"
              >
                <th
                  scope="row"
                  className="px-3 py-2 text-left font-normal text-muted-foreground"
                >
                  {cat}
                </th>
                {series.map((s) => (
                  <td
                    key={s.name}
                    className="px-3 py-2 text-right font-mono text-sm tabular-nums text-foreground"
                  >
                    {(s.values[rowIdx] ?? 0).toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
