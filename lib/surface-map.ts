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
 * This file is the routing/ownership boundary for features. New features should
 * be assigned here before UI work begins so public storytelling, parent/admin
 * operations, and family self-service do not get mixed together.
 */
export const applicationSurfaces: readonly ApplicationSurface[] = [
  {
    key: "foundation",
    label: "Hands Gifted Foundation",
    access: "public",
    audienceLabel: "Public",
    description: "The public-facing mission, story, programs, learning pathways, approved resources, products/services, outreach, media, and ways to connect.",
    routes: ["/", "/programs", "/academy"],
    includes: [
      "Mission and story",
      "Public program registry",
      "Public Family Academy overview",
      "Learning pathways and educational resources",
      "Approved products and services",
      "Outreach and partnership information",
      "Public media and storytelling",
      "Contact, support, and participation pathways",
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
    description: "The protected operating workspace for household administration, approvals, stability work, Hands Gifted operations, and system verification.",
    routes: ["/command-center"],
    includes: [
      "Today, priorities, tasks, and approvals",
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
    description: "The family-facing dashboard where each signed-in person receives only the information and actions appropriate to that role.",
    routes: ["/family", "/family/[child]"],
    includes: [
      "My Day / Today",
      "Responsibilities and chores",
      "School Support",
      "Family Academy",
      "Progress and demonstrated growth",
      "Projects and practical skills",
      "Ask for Help",
      "Age-appropriate reminders and rewards",
    ],
    excludes: [
      "Sibling private records",
      "Parent-only administration",
      "System-wide approvals",
      "Unrestricted household data",
    ],
  },
] as const;

export const sharedModules = [
  {
    name: "Family Academy",
    publicSurface: "Public overview and learning-path explanation",
    commandCenterSurface: "Parent assignment, verification, progress oversight, and role management",
    dashboardSurface: "Role-appropriate lessons, practice, progress, projects, and help requests",
  },
] as const;

export function getSurface(key: SurfaceKey) {
  return applicationSurfaces.find((surface) => surface.key === key)!;
}
