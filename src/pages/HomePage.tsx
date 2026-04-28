import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Education } from "@/components/sections/Education";
import {Job_experience} from "@/components/sections/Job_experience";
import { Skills } from "@/components/sections/Skills";

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
      <Hero />
      <div id="bio"><Bio /></div>
      <div id="education"><Education /></div>
      <div id="job_experience"><Job_experience /></div>
      <div id="skills"><Skills /></div>
    </div>
  );
}
