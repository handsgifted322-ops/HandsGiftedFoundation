export type SurfaceKey = "foundation" | "command_center" | "family_dashboard";

export type ApplicationSurface = {
  key: SurfaceKey;
  label: string;
  access: "public" | "private_parent_operator" | "private_role_aware";
  audienceLabel: string;
  description: string;
  routes: readonly string[];
  includes: readonly string[];
  excludes: readonly string[];
};

/**
 * Canonical Hands Gifted application surfaces.
 *
 * The Command Center is the control plane. The Foundation is the public
 * learning/participation experience. The Family Dashboard is the private
 * family implementation layer.
 */
export const applicationSurfaces: readonly ApplicationSurface[] = [
  {
    key: "foundation",
    label: "Hands Gifted Foundation",
    access: "public",
    audienceLabel: "Public",
    description: "The public learning and participation experience where people can explore, learn, study, pray, apply, create, and serve through approved Hands Gifted content.",
    routes: ["/", "/programs", "/academy"],
    includes: [
      "Mission and story",
      "Public program registry",
      "Public Academy and learning pathways",
      "Study, prayer, reflection, and application resources",
      "Practical skill learning and public projects",
      "Approved products and services",
      "Outreach and partnership information",
      "Public media and storytelling",
      "Contact, support, participation, and service pathways",
    ],
    excludes: [
      "Child records",
      "School administration records",
      "Household routines and behavior records",
      "Private journals",
      "Health or financial records",
      "Parent approvals and internal operations",
    ],
  },
  {
    key: "command_center",
    label: "Parent / Operator Command Center",
    access: "private_parent_operator",
    audienceLabel: "Private · parent/operator",
    description: "The protected control plane for the Foundation website and Family Dashboard: create, organize, assign, approve, publish, verify, and administer the Hands Gifted ecosystem.",
    routes: ["/command-center"],
    includes: [
      "Today, priorities, tasks, and approvals",
      "Website content management and publishing controls",
      "Program, resource, media, and product administration",
      "Academy curriculum management, assignments, verification, and progress oversight",
      "Household planning, routines, zones, and verification",
      "Family oversight and school administration",
      "Needs, resource navigation, and stability work",
      "Women’s Ministry",
      "Family Programs",
      "Bible Study & Journals",
      "Events",
      "Products & Resources",
      "Outreach & Partnerships",
      "Contacts",
      "Documents & Media",
      "Signals & Opportunities",
      "Hands Gifted projects and administration",
      "System Health and Reality C.H.E.X. verification",
    ],
    excludes: [
      "Public marketing presentation",
      "Anonymous access to household records",
      "Placeholder-only operational data presented as real",
    ],
  },
  {
    key: "family_dashboard",
    label: "Family Dashboard",
    access: "private_role_aware",
    audienceLabel: "Private · role-aware",
    description: "The private family vision and implementation layer where each signed-in person receives role-appropriate learning, responsibilities, goals, progress, and support.",
    routes: ["/family", "/family/[child]"],
    includes: [
      "My Day / Today",
      "Responsibilities and chores",
      "School Support",
      "Family Academy",
      "Bible study and family learning",
      "Progress and demonstrated growth",
      "Projects and practical skills",
      "Goals, reminders, and rewards",
      "Ask for Help",
    ],
    excludes: [
      "Sibling private records",
      "Parent-only administration",
      "System-wide approvals",
      "Unrestricted household data",
    ],
  },
] as const;

export const publicLearningJourney = [
  ["Explore", "Discover Hands Gifted programs, stories, resources, and learning pathways."],
  ["Learn", "Gain biblical understanding, practical knowledge, and useful household or creative skills."],
  ["Study", "Open Scripture, guided lessons, questions, notes, and supporting resources."],
  ["Pray", "Respond with prayer, reflection, gratitude, repentance, wisdom-seeking, or intercession."],
  ["Apply", "Choose a practical action that puts the lesson into daily life."],
  ["Create", "Produce something useful from the learning: a meal, garment, garden step, journal entry, project, resource, or other demonstrated work."],
  ["Serve", "Use growing knowledge and skill to strengthen the household or help others appropriately."],
] as const;

export const sharedModules = [
  {
    name: "Family Academy",
    publicSurface: "Public learning experience using Explore → Learn → Study → Pray → Apply → Create → Serve",
    commandCenterSurface: "Curriculum creation, publishing, parent assignment, verification, progress oversight, and role management",
    dashboardSurface: "Role-appropriate private lessons, practice, assignments, progress, projects, and help requests",
  },
] as const;

export function getSurface(key: SurfaceKey) {
  return applicationSurfaces.find((surface) => surface.key === key)!;
}
