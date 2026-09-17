export type HandsGiftedSkill = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  image: string;
  serviceStatus: string;
  serviceNote: string;
  learn: readonly string[];
  serviceDirection: readonly string[];
  productDirection: readonly string[];
  childFamilyConnection: string;
  scriptures: readonly (readonly [string, string])[];
  resourceHref: string;
};

export const handsGiftedSkills: readonly HandsGiftedSkill[] = [
  {
    slug: "cooking",
    title: "Hands Gifted Cooking",
    shortTitle: "Cooking",
    tagline: "Cook • Nourish • Teach • Create",
    summary: "A family-centered cooking world connecting practical kitchen skills, meal knowledge, stewardship, recipes, children learning to cook, service development, and future Hands Gifted food products.",
    image: "/catalog/cooking.jpg",
    serviceStatus: "Service world • exact offers being defined responsibly",
    serviceNote: "Cooking is a Hands Gifted service area. Prepared-food sales or other food services should only be presented as available after the exact offer, food-safety requirements, pricing, and applicable legal requirements are confirmed.",
    learn: [
      "Kitchen basics, preparation, cleanup, food safety, and age-appropriate participation",
      "Family meals, meal planning, grocery stewardship, and reducing food waste",
      "Recipe development, documenting what works, and learning how ingredients behave",
      "How cooking can grow from a household skill into useful content, products, or lawful service",
    ],
    serviceDirection: [
      "Cooking experiences, demonstrations, or family learning sessions when the format is ready",
      "Meal or food-service concepts only when the applicable safety and legal requirements are confirmed",
      "Custom cooking-related inquiries that can be evaluated before anything is promised",
    ],
    productDirection: [
      "Hands Gifted recipe books and family cookbooks",
      "Meal-planning and grocery tools",
      "Children's cooking activities and kitchen-learning packs",
      "Future cooking courses, challenges, and family kitchen resources",
    ],
    childFamilyConnection: "Children can learn measuring, planning, cleanliness, responsibility, food knowledge, teamwork, creativity, budgeting, and service through real kitchen participation.",
    scriptures: [
      ["Proverbs 31:14-15", "Preparation and provision for the household"],
      ["John 6:12", "Stewardship and avoiding waste"],
      ["Luke 16:10", "Faithfulness with what is already in your hands"],
    ],
    resourceHref: "/resources/food-wellness",
  },
  {
    slug: "gardening",
    title: "Hands Gifted Gardening",
    shortTitle: "Gardening",
    tagline: "Plant • Learn • Grow • Steward",
    summary: "A hands-on gardening world connecting food-growing skills, nature, science, stewardship, family learning, garden-service development, and future garden resources.",
    image: "/catalog/gardening.jpg",
    serviceStatus: "Service world • inquiry and service development",
    serviceNote: "Gardening is a Hands Gifted service area, but the exact public service menu should grow from demonstrated practice. Interest can be collected without representing advanced horticultural or landscaping expertise that has not been established.",
    learn: [
      "Seeds, soil, watering, sunlight, containers, basic plant care, and observation",
      "Garden science, plant growth, food systems, seasons, and harvest-to-kitchen connections",
      "Family garden routines, recordkeeping, stewardship, and learning through mistakes",
      "How a practical garden skill can become education, resources, kits, or future service",
    ],
    serviceDirection: [
      "Beginner family-garden learning and planning concepts as capability is demonstrated",
      "Planting or garden-learning experiences when a clear service format is ready",
      "Garden-related inquiries that can be evaluated honestly before commitment",
    ],
    productDirection: [
      "Hands Gifted garden journals",
      "Beginner family-garden guides",
      "Children's plant-science and observation activities",
      "Future starter kits and garden-learning resources",
    ],
    childFamilyConnection: "Gardening gives children a practical way to learn patience, science, responsibility, observation, food systems, consistency, and stewardship while creating something they can watch grow.",
    scriptures: [
      ["Genesis 2:15", "Work, care, and stewardship"],
      ["1 Corinthians 3:6-7", "Planting, growth, and understanding what is in our control"],
      ["Proverbs 12:11", "Diligence and tending productive work"],
    ],
    resourceHref: "/resources/practical-life-skills",
  },
  {
    slug: "braiding",
    title: "Hands Gifted Braiding",
    shortTitle: "Braiding",
    tagline: "Care • Style • Protect • Create",
    summary: "A natural-hair and braiding world connecting practical hair care, protective styling, creativity, children and family hair routines, direct appointments, and future Hands Gifted hair resources.",
    image: "/catalog/braiding.jpg",
    serviceStatus: "Appointment requests open by inquiry",
    serviceNote: "Braiding is the clearest current direct-service lane. Visitors can request an appointment or ask about a style. Exact pricing, timing, preparation instructions, deposits, and availability should be confirmed before an appointment is finalized.",
    learn: [
      "Natural-hair care basics, detangling, preparation, maintenance, and protective styling concepts",
      "Parting, neatness, consistency, patience, sanitation, and care of tools",
      "Children's hair routines and age-appropriate maintenance",
      "How creative hair skills can become service, portfolio work, education, and future products",
    ],
    serviceDirection: [
      "Natural-hair and braiding appointment requests",
      "Protective-style inquiries based on demonstrated skill and available time",
      "Children's and family hair-service inquiries with preparation expectations confirmed in advance",
    ],
    productDirection: [
      "Natural-hair care guides and routine trackers",
      "Children's hair-maintenance resources",
      "Future Hands Gifted hair products or accessories only after safe product development",
      "Braiding education or beginner resources as demonstrated expertise grows",
    ],
    childFamilyConnection: "Hair care can teach children hygiene, patience, consistency, self-care, creativity, confidence, and respect for the time and skill involved in maintaining hair.",
    scriptures: [
      ["1 Corinthians 14:40", "Order and care in how work is carried out"],
      ["Proverbs 22:29", "Skill and diligence"],
      ["Colossians 3:23", "Doing work wholeheartedly"],
    ],
    resourceHref: "/resources/practical-life-skills",
  },
  {
    slug: "sewing",
    title: "Hands Gifted Sewing",
    shortTitle: "Sewing",
    tagline: "Mend • Make • Design • Develop",
    summary: "A sewing and making world connecting clothing care, beginner construction, modest design, practical customization, children learning to create, selected service inquiries, and future Hands Gifted products.",
    image: "/catalog/sewing.jpg",
    serviceStatus: "Selected basic work by inquiry • skill still developing",
    serviceNote: "Sewing belongs in the Hands Gifted service system, but the public offer must match demonstrated capability. Selected basic customization or repair can be considered by inquiry; full garment construction should not be represented as currently available until that skill is established.",
    learn: [
      "Basic sewing, mending, measurements, seams, tools, fabric awareness, and clothing care",
      "Simple alterations and customization while building accuracy and repeatability",
      "Modest-design concepts, blue borders, fringes, sketches, samples, and quality review",
      "How sewing develops from practice into proof, products, and carefully scoped service",
    ],
    serviceDirection: [
      "Selected basic sewing, repair, or customization inquiries within demonstrated capability",
      "Blue-border or fringe-related customization where the exact request is appropriate",
      "No claim of full garment-construction service until skill and quality standards support it",
    ],
    productDirection: [
      "Hands Gifted Sewing Book and learning workbook",
      "Future modest apparel and accessory concepts",
      "Beginner sewing project guides and children's making activities",
      "Patterns, kits, or classes only after the underlying skills are mature enough to teach responsibly",
    ],
    childFamilyConnection: "Sewing helps children practice measurement, patience, planning, fine-motor skills, problem-solving, creativity, repair instead of waste, and the satisfaction of making something useful.",
    scriptures: [
      ["Exodus 35:35", "Skill, craftsmanship, and making"],
      ["Proverbs 31:19", "Working skillfully with the hands"],
      ["Proverbs 22:29", "Diligence and developed skill"],
    ],
    resourceHref: "/resources/practical-life-skills",
  },
] as const;

export function getHandsGiftedSkill(slug: string) {
  return handsGiftedSkills.find((skill) => skill.slug === slug);
}
