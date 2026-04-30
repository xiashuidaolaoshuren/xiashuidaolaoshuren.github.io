import { cn } from "@/lib/utils"

/**
 * Section entrance: `slide-in-from-bottom-3` is only ~3 spacing (~12px) and reads as “no animation”.
 * Use a larger offset so motion matches the plan.
 */
const enterBase =
  "animate-in fade-in-0 slide-in-from-bottom-[2.5rem] duration-700 ease-out fill-mode-both will-change-transform motion-reduce:animate-none"

/**
 * @param delayClass Tailwind delay utility, e.g. "delay-75", "delay-150"
 */
export function sectionEnterClass(delayClass?: string) {
  return cn(enterBase, delayClass)
}
