export type Status = "active" | "in_development" | "planned" | "in_progress";

export type Program = {
  name: string;
  description: string;
  status: Status;
  category: string;
};

export const missionPath = [
  ["Seek", "Begin with Scripture, prayer, wisdom, obedience, and the question: what does the Word require here?"],
  ["Examine", "Assess strengths, gaps, needs, habits, risks, and priorities using evidence instead of assumptions."],
  ["Build", "Strengthen habits, accountability, healthy routines, learning, responsibility, and readiness."],
  ["Establish", "Create stable household systems for family order, food, home, education, budgeting, transportation, appointments, routines, and Sabbath preparation."],
  ["Develop", "Identify and practice useful gifts and skills in children and adults through age-appropriate pathways."],
  ["Produce", "Turn learning into demonstrated fruit: meals, garments, gardens, portfolios, media, products, services, and teachable projects."],
  ["Stabilize", "Measure whether disciplined systems and developed skills strengthen the household through consistency, provision, savings, reduced costs, and readiness."],
  ["Serve", "Use increasing household capacity to help neighbors and families through practical service without creating dependency."],
  ["Teach", "Pass demonstrated knowledge forward: learner → practitioner → helper → mentor → teacher."],
] as const;

export const programs: Program[] = [
  { name: "Hands Gifted Family Development", description: "Whole-family growth through biblical learning, unity, communication, household order, parenting, school support, routines, Sabbath preparation, practical life skills, and Family Academy.", status: "active", category: "Family" },
  { name: "Gift-to-Stability", description: "Family stabilization and resource navigation for housing, utilities, transportation, vehicles, food, school, medical access, and household crises.", status: "active", category: "Stability" },
  { name: "Family Recovery and Rebuilding", description: "Structured rebuilding support for families recovering from homelessness, addiction, trauma, separation, or serious instability.", status: "in_development", category: "Stability" },
  { name: "Daughters of Sarah", description: "Biblical womanhood, modesty, marriage, motherhood, homemaking, household management, repentance, self-control, mentorship, and Titus 2 development.", status: "active", category: "Faith & Learning" },
  { name: "Kings of God", description: "Biblical growth and practical development for boys and young men through Scripture, character, service, household competence, technology, creativity, financial literacy, and entrepreneurship.", status: "in_development", category: "Faith & Learning" },
  { name: "Hands Gifted Children and Youth Development", description: "Character, education, reading, science, creativity, responsibility, service leadership, technology, financial literacy, school advocacy, and gift development for children and teens.", status: "active", category: "Youth" },
  { name: "Biblical Teaching & Family Skills", description: "Bible studies, Proverbs 31 and Titus 2 resources, women and children programs, workshops, mentorship, and daily-living resources.", status: "active", category: "Faith & Learning" },
  { name: "Hands Gifted Food, Garden and Family Nutrition", description: "Meal planning, budget cooking, food safety, family recipes, container gardening, planting calendars, garden science, and harvest-to-kitchen learning.", status: "active", category: "Food & Garden" },
  { name: "Hands Gifted Cooking", description: "Faith-centered cooking and education combining recipes, homemaking, stewardship, meal planning, child discipleship, gardening and preservation, and Sabbath preparation.", status: "active", category: "Food & Garden" },
  { name: "Hands Gifted Gardening", description: "Container and household gardening education focused on growing food, feeding families, and practical natural living.", status: "active", category: "Food & Garden" },
  { name: "Hands Gifted Creative Skills and Trades", description: "Sewing, apparel, home goods, braiding, natural hair, art, crafts, design, photography, video, music, and digital creativity.", status: "active", category: "Skills & Trades" },
  { name: "Hands Gifted Sewing & Apparel", description: "Sewing, modest apparel, skirts, dresses, headwraps, fringes, home goods, and practical production skills.", status: "active", category: "Skills & Trades" },
  { name: "Hands Gifted Braiding", description: "Protective and natural hair services, healthy-hair education, braiding classes, and skill development.", status: "active", category: "Skills & Trades" },
  { name: "Natural Products", description: "Development of practical household and natural products alongside related production skills.", status: "active", category: "Skills & Trades" },
  { name: "Hands Gifted Health and Wellness", description: "Family wellness education and referral support covering healthy routines, hygiene, movement, rest, health literacy, appointment organization, and care navigation.", status: "in_development", category: "Wellness" },
  { name: "Hands Gifted Entrepreneurship and Economic Empowerment", description: "Business readiness, product and service development, cost tracking, pricing, marketing, bookkeeping, saving, reinvestment, employment preparation, and referrals.", status: "in_development", category: "Economic" },
  { name: "Grants & Business Development", description: "Grant readiness, funding, business development, evidence, budgets, and sustainable microenterprise planning.", status: "active", category: "Economic" },
  { name: "Love Thy Neighbor Outreach", description: "Community outreach, donations, sponsorships, volunteers, referrals, and practical support for women and families.", status: "active", category: "Community" },
  { name: "Hands Gifted Voice and Media", description: "Music, storytelling, beats, spoken word, Scripture narration, educational video, family music, and social content.", status: "in_development", category: "Media" },
  { name: "Creative Workshops & Media", description: "Creative workshops, Hands Gifted Voice, educational media, social content, and digital resources.", status: "active", category: "Media" },
];

export const projects = [
  ["Private Command Center", "in_progress", "Authenticated parent/owner operating system with Supabase RLS, mobile-first workflows, approvals, household planning, school administration, needs, and Hands Gifted operations."],
  ["Public Website & Domain", "in_progress", "Replace the static Foundation page with a Git-backed application and finish domain/source synchronization."],
  ["TWU 2026 StartUP Grant Readiness", "in_progress", "Prepare the $5,000 Sewing & Home Goods Microenterprise Launch package while preserving the correct legal/organizational structure."],
  ["Daughters of Sarah Content Series", "planned", "Build staged women-and-girls lessons that progress after demonstrated readiness and mastery."],
  ["Love Thy Neighbor Pilot", "planned", "Formalize a Killeen-area practical support, donation, volunteer, and referral model."],
  ["First Sewing Product", "planned", "Design → Materials → Make → Photograph → Price → List → Sell."],
  ["Hands Gifted Garden Tracking", "planned", "Document planting, watering, growth, harvest, and family science learning."],
  ["Social Media Content System", "planned", "Build a sustainable cross-platform publishing workflow that does not overload family priorities."],
  ["2026–2027 Holy Days Integration", "planned", "Integrate Sabbath and Holy Day planning into appropriate family and Hands Gifted schedules and content."],
] as const;

export const products = [
  "Purple Praise Dress", "Earth & Elegance Dress", "Soft Grace Dress", "Bold & Beautiful Dress",
  "Denim & Dignity Skirt/Dress", "Sabbath Collection Dress", "Neutral Nobility Dress", "Floral Favorite Dress",
  "Urban Modesty Dress", "Black Excellence Dress", "Mother & Daughter Matching Dress Set",
  "Blue Border Fringe Garment Add-On", "Hands Gifted Head Wrap", "Family Routine Printable",
  "Household Reset Checklist", "Beginner Garden Seed Starter Kit", "Hands Gifted Garden Journal",
  "Hands Gifted Family Cookbook"
] as const;

export const surfaces = [
  { title: "Hands Gifted Foundation", audience: "Public", description: "Mission, story, programs, learning pathways, public resources, approved products/services, outreach, public media, and ways to participate." },
  { title: "Mother / Parent Command Center", audience: "Private", description: "Household planning, approvals, child oversight, school administration, routines, needs, stability work, private records, and Hands Gifted administration." },
  { title: "Children Dashboard", audience: "Private · self-only", description: "Each child’s Today view, responsibilities, School Support, Academy, progress, projects, and Ask for Help—without sibling records or parent administration." },
] as const;

export const academy = [
  "Mother — Daughters of Sarah",
  "Father — Kings of God",
  "Daughters developmental pathway",
  "Sons developmental pathway",
  "Family Study",
  "Study Desk — KJV / KJV 1611 / Apocrypha study tools",
  "Today Board and parent verification",
  "Responsive help: What happened? / I’m struggling / I want to learn / I need an adult",
  "Parent–Child Connection Time",
  "52-week Family Study cycle",
  "Mastery: Learn → Practice → Ready to Show → Demonstrated → Helper → Mentor/Teacher",
  "Optional 3D Academy world with mobile-first fallback"
] as const;
