export type AcademyLifeLens = "world-life" | "israelite-life" | "both";
export type AcademyLearningStatus = "discover" | "learning" | "practice" | "mastered";

export type AcademyDashboardCard = {
  id: string;
  title: string;
  reason: string;
  category: string;
  subcategory: string;
  topicSlug: string;
  lens: AcademyLifeLens;
  status: AcademyLearningStatus;
  kind: "today" | "seasonal" | "continue" | "parent-assigned" | "recommended";
};

export type AcademyTopic = {
  slug: string;
  title: string;
  lens: AcademyLifeLens;
  timing?: { months?: readonly number[]; dates?: readonly string[]; seasonLabel?: string };
  childPrompt: string;
  overview: string;
  learning: readonly string[];
  activities: readonly string[];
  familyStudy?: readonly string[];
};

export type AcademySubcategory = {
  slug: string;
  title: string;
  description: string;
  topics: readonly AcademyTopic[];
};

export type AcademyCategory = {
  slug: string;
  title: string;
  description: string;
  subcategories: readonly AcademySubcategory[];
};

/**
 * Academy Knowledge Library
 *
 * Categories -> subcategories -> topics.
 * Topics can be surfaced contextually on a learner dashboard by month/date/season.
 * The two lenses are intentionally distinct:
 * - world-life: what children encounter in school, community, history, and culture
 * - israelite-life: the household's Scripture-centered teaching, observances, and practice
 * - both: topics designed to teach the distinction/relationship explicitly
 */
export const academyKnowledgeLibrary: readonly AcademyCategory[] = [
  {
    slug: "world-life",
    title: "Understanding the World Around Us",
    description:
      "Learn the history, cultures, observances, institutions, ideas, and events children and adults encounter in everyday life without assuming that learning about an observance means participating in it.",
    subcategories: [
      {
        slug: "calendar-culture-observances",
        title: "Calendar, Culture & Observances",
        description: "Understand what is happening around us, where it came from, and why people observe it.",
        topics: [
          {
            slug: "christmas",
            title: "Christmas in the World Around Us",
            lens: "world-life",
            timing: { months: [12], seasonLabel: "December" },
            childPrompt: "Why is Christmas everywhere in December, and what is it?",
            overview:
              "Study the history and development of Christmas traditions, how the observance appears in school and community life, and the difference between understanding a cultural observance and participating in it.",
            learning: ["Historical background", "Common traditions", "School and community context", "Respectful cultural understanding"],
            activities: ["Build a history timeline", "Compare traditions across places and time", "Record questions for family study"],
          },
          {
            slug: "hispanic-heritage",
            title: "Hispanic Heritage",
            lens: "world-life",
            timing: { months: [9, 10], seasonLabel: "Hispanic Heritage season" },
            childPrompt: "What histories and cultures are being highlighted during Hispanic Heritage learning?",
            overview:
              "Explore Hispanic and Latino histories and cultures through geography, people, contributions, food, art, music, language, and research.",
            learning: ["Countries and geography", "Historical people and contributions", "Food and traditions", "Art, music, and language"],
            activities: ["Map countries and regions", "Research a historical figure", "Study a traditional food", "Create an art, music, language, or history project"],
          },
        ],
      },
      {
        slug: "history-people-community",
        title: "History, People & Community",
        description: "Historical events, people, communities, movements, inventions, and contributions that help learners understand the present.",
        topics: [],
      },
      {
        slug: "everyday-society",
        title: "Everyday Society",
        description: "Age-appropriate learning about school, community, media, civic life, work, money, technology, and the systems learners encounter.",
        topics: [],
      },
    ],
  },
  {
    slug: "israelite-life",
    title: "Israelite Life & Biblical Understanding",
    description:
      "Learn the household's Scripture-centered identity, biblical calendar, observances, values, history, family practices, and practical application.",
    subcategories: [
      {
        slug: "biblical-calendar",
        title: "Biblical Calendar & Observances",
        description: "Learn what the family observes, the Scriptures connected to it, how the household prepares, and what children should understand.",
        topics: [
          {
            slug: "day-of-atonement",
            title: "Day of Atonement",
            lens: "israelite-life",
            childPrompt: "What is the Day of Atonement, and why does our family observe it?",
            overview: "An age-appropriate study of the observance, biblical foundation, preparation, reflection, and family practice.",
            learning: ["Scripture", "Biblical context", "Family practice", "Reflection"],
            familyStudy: ["Parent-approved Scriptures", "Age-appropriate explanation", "Questions and reflection"],
            activities: ["Scripture notebook", "Family discussion", "Reflection activity"],
          },
          {
            slug: "feast-of-tabernacles",
            title: "Feast of Tabernacles",
            lens: "israelite-life",
            childPrompt: "What is the Feast of Tabernacles, and why does our family observe it?",
            overview: "An age-appropriate study of the feast, biblical context, household preparation, and meaningful family activities.",
            learning: ["Scripture", "Biblical history", "Family preparation", "Hands-on learning"],
            familyStudy: ["Parent-approved Scriptures", "Historical context", "Family teaching and practice"],
            activities: ["Scripture notebook", "Family feast planning", "Age-appropriate hands-on project"],
          },
        ],
      },
      {
        slug: "scripture-identity-history",
        title: "Scripture, Identity & History",
        description: "Study Scripture, Israelite history, identity, family teaching, and the distinction between documented history and household doctrine.",
        topics: [],
      },
      {
        slug: "biblical-family-life",
        title: "Biblical Family Life",
        description: "Apply biblical principles to character, family roles, relationships, stewardship, work, learning, and daily conduct.",
        topics: [],
      },
    ],
  },
  {
    slug: "world-and-israelite-life",
    title: "World Life & Israelite Life",
    description:
      "Side-by-side learning for questions that arise when what children encounter at school or in society differs from the household's biblical practice.",
    subcategories: [
      {
        slug: "why-our-family",
        title: "Why Does Our Family...?",
        description: "Child-friendly explanations that teach what the world is doing, what the family teaches, and how to respond respectfully.",
        topics: [
          {
            slug: "christmas-world-and-family",
            title: "Christmas: What the World Observes & Why Our Family Does Not",
            lens: "both",
            timing: { months: [12], seasonLabel: "December" },
            childPrompt: "Everybody at school is doing this. Why doesn't our family celebrate Christmas?",
            overview:
              "Learn the historical and cultural background first, then examine Scripture and the family's teaching so learners understand both contexts without confusing them.",
            learning: ["World/history view", "Scripture study", "Family teaching", "Respectful response", "School-life application"],
            familyStudy: [
              "Keep historical claims identified as history and Scripture claims identified as Scripture.",
              "Use the family's approved Bible and study resources.",
              "Attach outside ministry or study resources only after parent review.",
              "Make room for questions and help children navigate feeling different without isolating them.",
            ],
            activities: ["History timeline", "Scripture notebook", "Practice a respectful answer", "Choose a family-approved alternative activity"],
          },
        ],
      },
      {
        slug: "compare-understand-apply",
        title: "Compare, Understand & Apply",
        description: "Learn to distinguish cultural practice, historical evidence, Scripture, household teaching, and personal conduct.",
        topics: [],
      },
    ],
  },
];

export function getSeasonalAcademyTopics(month: number, dateKey?: string) {
  return academyKnowledgeLibrary.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.topics
        .filter((topic) => {
          const monthMatch = topic.timing?.months?.includes(month) ?? false;
          const dateMatch = dateKey ? topic.timing?.dates?.includes(dateKey) ?? false : false;
          return monthMatch || dateMatch;
        })
        .map((topic) => ({
          category: category.title,
          subcategory: subcategory.title,
          ...topic,
        })),
    ),
  );
}


/**
 * Dashboard model inspired by established personalized-learning patterns:
 * timely recommendations, clear next steps, parent-assigned work, and mastery/progress.
 * It remains Hands Gifted's own Academy taxonomy and content.
 */
export function buildAcademyDashboard(input: {
  month: number;
  dateKey?: string;
  continuingTopicSlugs?: readonly string[];
  parentAssignedTopicSlugs?: readonly string[];
  statusByTopic?: Readonly<Record<string, AcademyLearningStatus>>;
}): AcademyDashboardCard[] {
  const allTopics = academyKnowledgeLibrary.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.topics.map((topic) => ({ category, subcategory, topic })),
    ),
  );
  const statusFor = (slug: string): AcademyLearningStatus => input.statusByTopic?.[slug] ?? "discover";
  const cards: AcademyDashboardCard[] = [];
  const add = (kind: AcademyDashboardCard["kind"], item: (typeof allTopics)[number], reason: string) => {
    if (cards.some((card) => card.topicSlug === item.topic.slug && card.kind === kind)) return;
    cards.push({
      id: `${kind}:${item.topic.slug}`,
      title: item.topic.title,
      reason,
      category: item.category.title,
      subcategory: item.subcategory.title,
      topicSlug: item.topic.slug,
      lens: item.topic.lens,
      status: statusFor(item.topic.slug),
      kind,
    });
  };

  for (const item of allTopics) {
    const isToday = input.dateKey ? item.topic.timing?.dates?.includes(input.dateKey) ?? false : false;
    const isSeasonal = item.topic.timing?.months?.includes(input.month) ?? false;
    if (isToday) add("today", item, "Today in your Academy calendar");
    else if (isSeasonal) add("seasonal", item, item.topic.timing?.seasonLabel ?? "Relevant this month");
  }

  for (const slug of input.continuingTopicSlugs ?? []) {
    const item = allTopics.find((entry) => entry.topic.slug === slug);
    if (item) add("continue", item, "Continue where you left off");
  }
  for (const slug of input.parentAssignedTopicSlugs ?? []) {
    const item = allTopics.find((entry) => entry.topic.slug === slug);
    if (item) add("parent-assigned", item, "Assigned by parent");
  }

  return cards;
}
