export type Status = "active" | "in_development" | "planned" | "in_progress";

export type Program = {
  name: string;
  description: string;
  status: Status;
  category: string;
};

export const missionPath = [
  ["Seek", "Begin with faith, Scripture, prayer, wisdom, and a willingness to change direction when needed."],
  ["Examine", "Look honestly at the household, current needs, strengths, habits, available resources, and opportunities."],
  ["Connect", "Create intentional time for women, children, and families to learn, work, create, and grow together."],
  ["Learn", "Develop practical knowledge through cooking, gardening, self-care, sewing, creativity, technology, financial literacy, and family learning."],
  ["Practice", "Use skills in real household life before presenting them as expertise, services, or finished programs."],
  ["Document", "Gather photos, videos, recipes, projects, reflections, and other evidence of what is actually being learned and built."],
  ["Develop", "Identify gifts and repeatable methods that are useful, responsible, and strong enough to become resources, content, products, services, or programs."],
  ["Build", "Test opportunities carefully, learn business fundamentals, improve what works, and avoid expanding faster than the household or venture can sustain."],
  ["Serve", "Share knowledge, resources, opportunities, and practical support from increasing capacity while protecting private family information."],
] as const;

export const programs: Program[] = [
  { name: "Hands Gifted Family Development", description: "The central Hands Gifted model: faith, family connection, practical learning, household development, individual gifts, opportunity, and service. The household is the first place the model is practiced and improved.", status: "active", category: "Family Development" },
  { name: "Family Stability & Resource Navigation", description: "A developing resource-navigation lane focused on helping families identify useful community resources, practical assistance, donated goods, referrals, and next steps without presenting Hands Gifted as a licensed social-service provider.", status: "in_development", category: "Family Development" },
  { name: "Rebuilding Through Practical Life", description: "A future-facing family-development concept for women and families navigating difficult seasons and rebuilding ordinary life through connection, routines, learning, self-care, skills, and opportunity.", status: "planned", category: "Family Development" },
  { name: "Daughters of Sarah", description: "A developing women-and-girls learning pathway centered on biblical values, character, modesty, household wisdom, practical skills, self-control, creativity, and growth.", status: "in_development", category: "Faith & Learning" },
  { name: "Kings of God", description: "A developing boys-and-young-men pathway centered on Scripture, character, service, household competence, technology, creativity, financial literacy, and practical development.", status: "in_development", category: "Faith & Learning" },
  { name: "Children & Family Learning", description: "Parent-guided learning and family activities that connect academics, responsibility, creativity, practical skills, projects, and individual gift development.", status: "in_development", category: "Children & Family" },
  { name: "Biblical Family Learning", description: "Faith-centered family study, reflection, practical application, and educational resources for women, children, and households.", status: "in_development", category: "Faith & Learning" },
  { name: "Hands Gifted Food & Garden", description: "Family cooking, recipes, meal planning, kitchen skills, container gardening, garden science, food-growing skills, and harvest-to-kitchen learning documented through real household practice.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Cooking", description: "A developing cooking and content lane built from real family meals, recipe documentation, kitchen learning, stewardship, meal planning, and family participation.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Gardening", description: "A developing household-gardening lane focused on container growing, plant learning, family science, food production, documentation, and practical stewardship.", status: "in_development", category: "Food & Garden" },
  { name: "Hands Gifted Creative Skills", description: "A developing practical-skills lane covering sewing, modest apparel, natural hair and self-care learning, art, crafts, design, photography, video, music, and digital creativity.", status: "in_development", category: "Creative Skills" },
  { name: "Hands Gifted Sewing & Modest Apparel", description: "A developing sewing and apparel lane centered on learning construction skills, modest design standards, headwraps, fringes, practical garments, and documented proof of work before scale.", status: "in_development", category: "Creative Skills" },
  { name: "Natural Hair & Self-Care Journey", description: "A learning-and-documentation lane focused on natural hair care, healthy routines, self-care, and sharing appropriate lessons from the journey without presenting Hands Gifted as a professional salon or licensed care provider.", status: "in_development", category: "Self-Care" },
  { name: "Natural & Household Product Exploration", description: "Future exploration of practical household or natural products only after skills, safety requirements, costs, and real demand are understood.", status: "planned", category: "Product Development" },
  { name: "Family Wellness & Care Navigation", description: "A developing educational and referral lane around healthy routines, hygiene, rest, movement, health literacy, appointment organization, and knowing when professional care is needed.", status: "in_development", category: "Wellness" },
  { name: "Entrepreneurship & Opportunity", description: "Founder and family learning around business fundamentals, financial literacy, customer discovery, pricing, cost tracking, content, ethical selling, and recognizing when a developed skill may become an economic opportunity.", status: "in_development", category: "Economic Development" },
  { name: "Hands Gifted Business Development", description: "The internal development lane for learning business structure, validating one realistic offer, understanding startup costs, marketing, revenue, funding readiness, and sustainable growth.", status: "in_development", category: "Economic Development" },
  { name: "Share & Serve", description: "A future community-service lane for resource sharing, hand-me-downs, donated materials, referrals, practical assistance, and helping other families from demonstrated capacity.", status: "planned", category: "Community" },
  { name: "Hands Gifted Voice & Media", description: "A developing content lane for music, storytelling, spoken word, educational video, family-safe media, photography, editing, and documenting the Hands Gifted journey.", status: "in_development", category: "Media" },
  { name: "Content & Educational Resources", description: "Future public-facing resources developed from proven family learning: guides, workbooks, recipes, printables, videos, project kits, and other useful content.", status: "planned", category: "Media" },
];

export const projects = [
  ["Private Family Command Center", "in_progress", "Protect and improve the private household operating system without exposing family records on the public website."],
  ["Public Hands Gifted Website", "in_progress", "Refine the public website so it accurately presents Hands Gifted as a faith-centered family-development venture in the development stage."],
  ["Founder Business Basics", "in_progress", "Learn business model, customer discovery, validation, pricing, startup budgeting, bookkeeping, marketing, structure, compliance, and funding readiness."],
  ["Hands Gifted Portfolio", "in_progress", "Organize approved photos, videos, recipes, projects, notes, and examples into private evidence first, then portfolio proof, then founder-approved public content."],
  ["First Testable Offer", "planned", "Review what has actually been practiced and documented, then select one low-risk offer to validate before spending heavily or expanding."],
  ["Daughters of Sarah Development", "planned", "Continue developing women-and-girls learning materials without representing the pathway as a fully launched public program."],
  ["Cooking & Recipe Documentation", "planned", "Continue turning real family meals into documented recipes and evaluate later whether any resource is ready for public testing."],
  ["Garden Documentation", "planned", "Track planting, care, growth, harvest, science observations, and family participation as evidence of real practice."],
  ["Content Creation System", "planned", "Develop a sustainable public-content workflow that protects private family material and only publishes founder-approved content."],
] as const;

export const products = [
  "Modest Apparel Concepts", "Headwrap Concepts", "Blue-Border Fringe Garment Concepts",
  "Family Routine Printable", "Household Reset Checklist", "Beginner Garden Resource",
  "Hands Gifted Garden Journal", "Hands Gifted Family Cookbook", "Family Learning Resources",
  "Natural Hair & Self-Care Content", "Hands Gifted Voice & Media Content"
] as const;

export const surfaces = [
  { title: "Hands Gifted", audience: "Public", description: "The public story, family-development model, development lanes, approved resources, approved content, and future ways to connect." },
  { title: "Mother / Parent Command Center", audience: "Private", description: "Household planning, approvals, child oversight, school administration, routines, needs, family stability work, private records, and Hands Gifted administration." },
  { title: "Children Dashboard", audience: "Private · parent-controlled", description: "Age-appropriate responsibilities, school support, Academy learning, projects, progress, and requests for help without exposing sibling records or parent administration." },
] as const;

export const academy = [
  "Daughters of Sarah",
  "Kings of God",
  "Children & Family Learning",
  "Family Study",
  "Practical Skills",
  "Cooking & Food Skills",
  "Gardening & Nature",
  "Sewing & Modest Design",
  "Art, Music & Media",
  "Technology & Digital Creativity",
  "Financial Literacy & Entrepreneurship",
  "Learning path: Explore → Learn → Practice → Create → Document → Parent-approved opportunity"
] as const;
