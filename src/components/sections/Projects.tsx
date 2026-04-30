import { sectionEnterClass } from "@/lib/section-motion"
import { cn } from "@/lib/utils"
import type { ProjectItem } from "./ProjectCard";
import { ProjectCard } from "./ProjectCard";

const projects: ProjectItem[] = [
  {
    title: "LLM Hallucination Mitigation (Final Year Project)",
    status: "Completed",
    description: "My Final Year Project (FYP) focused on researching and implementing trainless verifier methods for detecting and mitigating hallucinations in Large Language Models (LLMs) within RAG systems.",
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST-FYP",
    techStack: ["Python", "PyTorch", "Transformers", "RAG", "NLI"],
    image: "../../../images/fyp.jpg",
  },
  {
    title: "AllergyGuard",
    status: "Completed",
    description: "An Android application designed for travelers to scan food labels and menus. It uses on-device OCR and fuzzy string matching to identify allergens in real-time.",
    repoUrl: "https://github.com/xiashuidaolaoshuren/allergy_guard",
    techStack: ["Kotlin", "Android", "ML Kit", "OCR", "Room"],
    image: "../../../images/allergy_guard.png",
  },
  {
    title: "GTA V ALPR",
    status: "Completed",
    description: "A complete two-stage Automatic License Plate Recognition pipeline for GTA V gameplay. Features YOLOv8 detection, PaddleOCR recognition, ByteTrack tracking, and a Streamlit GUI.",
    repoUrl: "https://github.com/xiashuidaolaoshuren/ALPR_GTAV",
    techStack: ["Python", "YOLOv8", "PaddleOCR", "Streamlit", "PyTorch"],
    image: "../../../images/gta_v_alpr.jpg",
  },
  {
    title: "Automatic Chord Recognition",
    status: "Completed",
    description: "Machine learning system for identifying musical chords from audio. Implements Random Forest and LSTM (RNN) models with custom preprocessing features using Librosa.",
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST3110_Proj",
    techStack: ["Python", "PyTorch", "Scikit-learn", "Librosa", "RNN"],
    image: "../../../images/chord_recognition.png",
  },
  {
    title: "Hand Gesture Music Controller",
    status: "Completed",
    description: "Real-time hand gesture recognition system for music synthesis control. Uses MediaPipe for tracking and sends OSC signals to SuperCollider for audio generation.",
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST_2010_Proj",
    techStack: ["Python", "MediaPipe", "SuperCollider", "OpenCV", "OSC"],
    image: "../../../images/hand_gesture.jpg",
  },
];

export function Projects() {
  return (
    <section className={cn("py-12", sectionEnterClass("delay-100"))}>
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
