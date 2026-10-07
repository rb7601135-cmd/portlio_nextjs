export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  sourceUrl?: string;
  liveDemoUrl?: string;
  hasLiveDemo: boolean;
  demoStatusNote?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "campos-coffee-platform",
    number: "01",
    title: "Campos Coffee — Specialty Coffee Platform",
    category: "E-Commerce & Retail",
    description:
      "A high-conversion storefront designed for an artisan coffee roastery. Features multi-device responsive catalogs, capsule subscription bundles, brewing tutorial guides, and clean cart checkout.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Figma", "Cart State"],
    image: "/projects/campos_coffee_platform_mockup.jpg",
    sourceUrl: "https://github.com/rana-bilal-4358213b4/campos-coffee-platform",
    liveDemoUrl: "https://camposcoffee.com/shop",
    hasLiveDemo: true,
    demoStatusNote: "Live E-Commerce & Retail Platform",
    featured: true,
  },
  {
    id: "zeus-ascot-hospitality",
    number: "02",
    title: "Zeus Ascot — Luxury Dining & Lounge",
    category: "Luxury Hospitality & Dining",
    description:
      "A high-impact dark-mode web presence for an upscale Greek dining and cocktail lounge. Built to maximize table reservations with real-time booking flows, interactive seasonal menus, and ambient venue photography.",
    technologies: [
      "JavaScript",
      "CSS Grid",
      "Next.js",
      "Reservation System",
      "UI/UX Architecture",
    ],
    image: "/projects/zeus_ascot_luxury_restaurant_w.jpg",
    sourceUrl: "https://github.com/rana-bilal-4358213b4/zeus-ascot-hospitality",
    liveDemoUrl: "https://zeusascot.co.uk/reservations",
    hasLiveDemo: true,
    demoStatusNote: "Live Restaurant & Lounge Experience",
    featured: true,
  },
  {
    id: "tex-technology-trading",
    number: "03",
    title: "Tex Technology Trading — Robotics Enterprise",
    category: "B2B Robotics & AI Enterprise",
    description:
      "An industrial B2B corporate platform showcasing automated trading machinery and robotic platforms. Combines dark industrial aesthetics, neon green accents, 4-tier process flow cards, and enterprise quotation lead capture.",
    technologies: [
      "Python",
      "Node.js",
      "REST APIs",
      "Full Stack",
      "Enterprise Lead Flow",
    ],
    image: "/projects/tex_technology_trading_website.jpg",
    sourceUrl: "https://github.com/rana-bilal-4358213b4/tex-technology-trading",
    liveDemoUrl: "https://textradetech.com/enterprise",
    hasLiveDemo: true,
    demoStatusNote: "Robotics & Automation Portal",
    featured: true,
  },
  {
    id: "kstar-entertainment",
    number: "04",
    title: "KStar Entertainment — Event Production",
    category: "Entertainment & Live Events",
    description:
      "An experiential event portfolio highlighting luxury weddings, corporate galas, and live DJ performances. Employs dynamic media galleries, verified social proof counters, and direct consultation booking.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Media Galleries",
      "Event Booking",
      "Interactive UI",
    ],
    image: "/projects/kstar_entertainment_website.jpg",
    sourceUrl: "https://github.com/rana-bilal-4358213b4/kstar-entertainment",
    liveDemoUrl: "https://kstarentertainment.com/events",
    hasLiveDemo: true,
    demoStatusNote: "Production Event Showcase",
    featured: true,
  },
];
