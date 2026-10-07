export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  type: "Education" | "Development" | "Milestone";
  description: string;
  highlights: string[];
}

export const journeyData: JourneyItem[] = [
  {
    id: "degree-bs-se",
    period: "Current / Ongoing",
    title: "Bachelor of Science in Software Engineering (BS SE)",
    institution: "Minhaj University Lahore",
    type: "Education",
    description:
      "Deepening computer science principles, core software engineering methodologies, database design, algorithms, and collaborative system design.",
    highlights: [
      "Advanced coursework in data structures & algorithms",
      "Database management systems & relational architecture",
      "Software requirements engineering and architectural patterns",
    ],
  },
  {
    id: "degree-adp-se",
    period: "Completed",
    title: "Associate Degree in Software Engineering (ADP SE)",
    institution: "Minhaj University Lahore",
    type: "Education",
    description:
      "Built a solid academic and practical programming foundation in object-oriented programming, web technologies, and software development lifecycles.",
    highlights: [
      "Core programming fundamentals in C++ and Python",
      "Front-end web development with standard HTML, CSS, JavaScript",
      "Software testing, debugging, and project documentation",
    ],
  },
  {
    id: "creative-3d-journey",
    period: "Exploration & Mastery",
    title: "Interactive 3D Web & Creative Motion Development",
    institution: "Self-Directed Learning & Research",
    type: "Development",
    description:
      "Pioneered hands-on experiments merging WebGL, Three.js, React Three Fiber, and GSAP ScrollTrigger to build modern editorial and immersive digital experiences.",
    highlights: [
      "Physically-based rendering (PBR) metallic materials and lighting",
      "Choreographing line-by-line typography and kinetic scroll reveals",
      "Optimizing 60fps canvas performance across viewports",
    ],
  },
  {
    id: "fullstack-projects",
    period: "Practical Building",
    title: "Full-Stack Web Systems & Emerging Technology",
    institution: "Personal Engineering Labs",
    type: "Milestone",
    description:
      "Engineered real-world project experiments spanning modern Next.js App Router applications, RESTful backends, Python automation, and computer vision gesture tracking.",
    highlights: [
      "Database persistence, form validation, and server-side logic",
      "Human-computer interaction experiments with OpenCV and MediaPipe",
      "Production-focused UI/UX design with dark-mode obsidian aesthetics",
    ],
  },
];
