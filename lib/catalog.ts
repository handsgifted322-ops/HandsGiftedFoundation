export type Status = "active" | "in_development" | "planned" | "in_progress";

export type Program = {
  name: string;
  description: string;
  status: Status;
  category: string;
};

export const missionPath = [
  ["Seek", "Begin with faith, Scripture, prayer, wisdom, and a willingness to change direction when needed."],
  ["Examine", "Look honestly at our household, current needs, strengths, habits, available resources, skills, and income opportunities."],
  ["Connect", "Create intentional time for our family to learn, work, create, organize, and grow together."],
  ["Learn", "Develop practical knowledge through cooking, gardening, self-care, sewing, creativity, technology, financial literacy, and family learning."],
  ["Practice", "Use skills in real household life before presenting them as expertise, services, products, or finished programs."],
  ["Document", "Gather photos, videos, recipes, projects, systems, reflections, and other evidence of what is actually being learned and built."],
  ["Develop", "Identify useful, repeatable skills and methods that are strong enough to become resources, content, products, services, or earning lanes."],
  ["Build", "Test opportunities carefully, learn business fundamentals, track costs and results, and avoid expanding faster than our household or business can sustain."],
  ["Serve", "Future phase · Share selected proven knowledge, resources, and opportunities with other households only after Hands Gifted has the capacity to do so responsibly."],
] as const;

export const programs: Program[] = [
  { name: "Hands Gifted Family Development", description: "The internal family-first development model behind Hands Gifted: faith, household systems, practical learning, individual gifts, ownership, opportunity, and responsible growth. Our household is the first place the model is practiced and improved.", status: "active", category: "Family Development" },
  { name: "Family Stability & Resource Navigation", description: "Internal / future-facing · Organizing useful resources, referrals, household next steps, and stability information for our own family first. Any broader public resource-navigation offer remains a later phase.", status: "in_development", category: "Family Development" },
  { name: "Rebuilding Through Practical Life", description: "In development · A family learning concept built from our own experience of rebuilding ordinary life through routines, organization, practical skills, self-development, and opportunity. Public adaptation may come later.", status: "in_development", category: "Family Development" },
  { name: "Daughters of Sarah", description: "Private family learning lane · A girls-and-women pathway centered on biblical values, character, modesty, household wisdom, practical skills, self-control, creativity, and growth. Public resources may be developed only from approved material later.", status: "in_development", category: "Faith & Learning" },
  { name: "Kings of God", description: "Private family learning lane · A boys-and-young-men pathway centered on Scripture, character, service, household competence, technology, creativity, financial literacy, and practical development.", status: "in_development", category: "Faith & Learning" },
  { name: "Children & Family Learning", description: "Private family learning lane · Parent-guided academics, responsibility, creativity, practical skills, projects, and individual gift development for our household.", status: "in_development", category: "Children & Family" },
  { name: "Biblical Family Learning", description: "Private family learning lane · Faith-centered family study, reflection, practical application, and educational resources developed for household use first.", status: "in_development", category: "Faith & Learning" },
  { name: "Hands Gifted Food & Garden", description: "In development · Family cooking, recipes, meal planning, kitchen skills, container gardening, garden science, food-growing skills, and harvest-to-kitchen learning documented through real household practice.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Cooking", description: "In development · A cooking and content lane built from real family meals, recipe documentation, kitchen learning, stewardship, meal planning, food-safety research, and repeatable proof before any public food offer expands.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Gardening", description: "In development · A household-gardening lane focused on container growing, plant learning, family science, food production, documentation, and practical stewardship.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Creative Skills", description: "In development · Practical skills including sewing, modest apparel, natural hair and self-care learning, art, crafts, design, photography, video, music, and digital creativity that can grow into family capability and future earning opportunities.", status: "in_development", category: "Creative Skills" },
  { name: "Hands Gifted Sewing & Modest Apparel", description: "In development · Sewing and apparel centered on construction skills, modest design standards, headwraps, fringes, practical garments, samples, quality review, and documented proof of work before sales scale.", status: "in_development", category: "Creative Skills" },
  { name: "Natural Hair & Self-Care Journey", description: "In development · Family learning and documentation around natural hair care, healthy routines, and self-care. Braiding availability is handled separately as a current skill by inquiry.", status: "in_development", category: "Self-Care" },
  { name: "Natural & Household Product Exploration", description: "Planned · Explore practical household or natural product ideas only after skills, safety requirements, costs, legal boundaries, and real demand are understood.", status: "planned", category: "Product Development" },
  { name: "Family Wellness & Care Navigation", description: "Internal learning lane · Healthy routines, hygiene, rest, movement, health literacy, appointment organization, and knowing when professional care is needed. This is not a public clinical service.", status: "in_development", category: "Wellness" },
  { name: "Entrepreneurship & Opportunity", description: "In development · Family learning around business fundamentals, financial literacy, customer discovery, pricing, cost tracking, content, ethical selling, and recognizing when a demonstrated skill may become lawful earned income.", status: "in_development", category: "Economic Development" },
  { name: "Hands Gifted Business Development", description: "Active development · The business-building lane for legal formation planning, offer validation, startup costs, pricing, bookkeeping, marketing, revenue, funding readiness, compliance, and sustainable family-owned growth.", status: "active", category: "Economic Development" },
  { name: "Share & Serve", description: "Future phase · A later community-support lane for sharing selected resources, referrals, practical knowledge, and assistance from demonstrated capacity after the family business and household are stable enough to support it.", status: "planned", category: "Future Community" },
  { name: "Hands Gifted Voice & Media", description: "In development · Content development for music, storytelling, spoken word, educational video, family-safe media, photography, editing, and documenting the Hands Gifted journey.", status: "in_development", category: "Media" },
  { name: "Content & Educational Resources", description: "Planned · Public products and resources developed from proven family learning, including guides, workbooks, recipes, printables, videos, project kits, and other useful content.", status: "planned", category: "Media" },
];

export const projects = [
  ["Private Family Command Center", "in_progress", "Protect and improve the private household operating system without exposing family records on the public website."],
  ["Public Hands Gifted Website", "in_progress", "Present Hands Gifted accurately as a faith-led, family-owned business in development: our household first, proof before claims, and future service from demonstrated capacity."],
  ["Founder Business Basics", "in_progress", "Build the family business model through customer discovery, validation, pricing, startup budgeting, bookkeeping, marketing, legal structure, compliance, and funding readiness."],
  ["Hands Gifted Portfolio", "in_progress", "Organize approved photos, videos, recipes, projects, notes, and examples into private evidence first, then portfolio proof, then founder-approved public content."],
  ["First Testable Offer", "planned", "Review what has actually been practiced and documented, then select one low-risk offer to validate before spending heavily or expanding."],
  ["Daughters of Sarah Development", "planned", "Continue developing the private girls-and-women learning lane and only adapt founder-approved material into public resources later."],
  ["Cooking & Recipe Documentation", "planned", "Continue turning real family meals into documented recipes and evaluate later whether any recipe, guide, content series, or food concept is ready for public testing."],
  ["Garden Documentation", "planned", "Track planting, care, growth, harvest, science observations, and family participation as evidence of real practice."],
  ["Content Creation System", "planned", "Develop a sustainable public-content workflow that protects private family material and only publishes founder-approved content."],
] as const;

export const products = [
  "Coming soon · Modest Apparel Concepts", "Coming soon · Headwrap Concepts", "Coming soon · Blue-Border Fringe Garment Concepts",
  "Coming soon · Family Routine Printable", "Coming soon · Household Reset Checklist", "Coming soon · Beginner Garden Resource",
  "Coming soon · Hands Gifted Garden Journal", "Coming soon · Hands Gifted Family Cookbook", "Coming soon · Family Learning Resources",
  "Coming soon · Natural Hair & Self-Care Content", "Coming soon · Hands Gifted Voice & Media Content"
] as const;

export const surfaces = [
  { title: "Hands Gifted", audience: "Public", description: "The public family-business story, demonstrated development lanes, current availability, approved resources, approved content, products, and future ways to connect." },
  { title: "Mother / Parent Command Center", audience: "Private", description: "Household planning, approvals, child oversight, school administration, routines, needs, family stability work, private records, and Hands Gifted administration." },
  { title: "Children Dashboard", audience: "Private · parent-controlled", description: "Age-appropriate responsibilities, school support, Academy learning, projects, progress, and requests for help without exposing sibling records or parent administration." },
] as const;

export const academy = [
  "Daughters of Sarah · Private family development",
  "Kings of God · Private family development",
  "Children & Family Learning · In development",
  "Family Study · In development",
  "Practical Skills · In development",
  "Cooking & Food Skills · In development",
  "Gardening & Nature · In development",
  "Sewing & Modest Design · In development",
  "Art, Music & Media · In development",
  "Technology & Digital Creativity · In development",
  "Financial Literacy & Entrepreneurship · In development",
  "Learning path: Explore → Learn → Practice → Create → Document → Parent-approved opportunity"
] as const;
