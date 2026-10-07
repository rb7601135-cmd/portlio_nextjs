export interface SkillCategory {
  title: string;
  categoryKey: string;
  description: string;
  skills: {
    name: string;
    description?: string;
    level?: string;
    tag?: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    categoryKey: "frontend",
    description:
      "Crafting performant, accessible, and responsive user interfaces with modern web standards.",
    skills: [
      { name: "HTML", tag: "Markup & Semantics" },
      { name: "CSS", tag: "Modern Styling & Grid" },
      { name: "JavaScript", tag: "ES6+ Core Logic" },
      { name: "React", tag: "Component Architecture" },
      { name: "Next.js", tag: "App Router & SSR" },
      { name: "TypeScript", tag: "Type Safety & DX" },
      { name: "Tailwind CSS", tag: "Utility-First Design" },
    ],
  },
  {
    title: "Motion & 3D Interactive",
    categoryKey: "motion-3d",
    description:
      "Bringing digital products to life with spatial WebGL interactions and choreography.",
    skills: [
      { name: "GSAP", tag: "Timeline Choreography" },
      { name: "ScrollTrigger", tag: "Scroll-Linked Dynamics" },
      { name: "Three.js", tag: "WebGL & 3D Graphics" },
      { name: "React Three Fiber", tag: "Declarative Three.js" },
      { name: "@react-three/drei", tag: "3D Helpers & Shaders" },
    ],
  },
  {
    title: "Backend & Systems",
    categoryKey: "backend",
    description:
      "Engineering robust application programming interfaces, servers, and business logic.",
    skills: [
      { name: "Python", tag: "Scripting & Core Systems" },
      { name: "Django", tag: "Batteries-Included MVC" },
      { name: "REST APIs", tag: "Contract-First Architecture" },
      { name: "Node.js", tag: "Server Runtime" },
    ],
  },
  {
    title: "Data & Developer Tooling",
    categoryKey: "tools",
    description:
      "Managing persistent data storage, version control workflows, and daily development environments.",
    skills: [
      { name: "SQL", tag: "Relational Queries" },
      { name: "Git", tag: "Distributed Version Control" },
      { name: "GitHub", tag: "Collaboration & CI/CD" },
      { name: "VS Code", tag: "Primary Development IDE" },
    ],
  },
];
