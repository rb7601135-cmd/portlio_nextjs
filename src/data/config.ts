export interface SiteConfig {
  name: string;
  shortName: string;
  logo: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  aboutHeadline: string;
  aboutBio: string;
  workHeadline: string;
  skillsHeadline: string;
  journeyHeadline: string;
  contactHeadline: string;
  contactCopy: string;
  footerText: string;
  availability: {
    status: string;
    isAvailable: boolean;
    label: string;
  };
  socialLinks: {
    email: string;
    github: string;
    linkedin: string;
    whatsapp?: string;
    resumeDoc?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Rana Muhammad Bilal Afzal",
  shortName: "Bilal",
  logo: "BILAL.DEV",
  eyebrow: "SOFTWARE ENGINEERING · CREATIVE DEVELOPMENT",
  headline: "I BUILD DIGITAL EXPERIENCES THAT FEEL DIFFERENT.",
  supportingText:
    "I'm a developer exploring the intersection of full-stack engineering, AI, and interactive 3D experiences. I turn ideas into fast, functional, and memorable digital products.",
  aboutHeadline: "CURIOUS BY NATURE. BUILT TO CREATE.",
  aboutBio:
    "I'm a software engineering student and aspiring full-stack developer who enjoys building useful products, experimenting with emerging technologies, and turning complex ideas into simple user experiences. I'm continuously learning, building, and improving with every project.",
  workHeadline: "SELECTED WORK. REAL EXPERIMENTS.",
  skillsHeadline: "TOOLS I USE TO MAKE THINGS WORK.",
  journeyHeadline: "ALWAYS LEARNING. ALWAYS BUILDING.",
  contactHeadline: "HAVE AN IDEA? LET'S BUILD IT.",
  contactCopy:
    "I'm open to exciting projects, collaboration, internships, and opportunities to grow. Have something interesting in mind? Let's talk.",
  footerText: "DESIGNED WITH CURIOSITY. BUILT WITH CODE.",
  availability: {
    status: "Active",
    isAvailable: true,
    label: "Available for internships & collaborations",
  },
  socialLinks: {
    email: "rb7601135@gmail.com",
    github: "https://github.com/rb7601135-cmd",
    linkedin: "https://www.linkedin.com/in/rana-bilal-4358213b4",
    whatsapp: "https://wa.me/923344481586",
    resumeDoc:
      "https://docs.google.com/document/d/1h-REdz2ogEGwqJQWQFyWznf4BrAn6ECegrztTy6RGjs/edit",
  },
};
