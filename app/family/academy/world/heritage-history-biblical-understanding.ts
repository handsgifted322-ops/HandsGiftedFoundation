export type AcademyUnderstandingModule = {
  slug: string;
  title: string;
  category: "heritage" | "history" | "biblical-understanding";
  status: "ready" | "planned";
  childQuestion: string;
  purpose: string;
  learningAreas: readonly string[];
  familyStudy: readonly string[];
  activities: readonly string[];
};

export const heritageHistoryBiblicalUnderstanding = {
  title: "Heritage, History & Biblical Understanding",
  description:
    "A Family Academy learning collection for understanding cultural observances, history, heritage, and the family's biblical practices. Lessons separate historical research, Scripture study, and family teaching so children can understand both what others observe and why their household may make a different choice.",
  modules: [
    {
      slug: "hispanic-heritage-month",
      title: "Hispanic Heritage Month",
      category: "heritage",
      status: "ready",
      childQuestion: "What is Hispanic Heritage Month, and what are we learning from it?",
      purpose:
        "Explore Hispanic and Latino histories and cultures through geography, people, contributions, food, art, music, language, and hands-on learning.",
      learningAreas: [
        "Countries and geography",
        "Historical people and contributions",
        "Food and family traditions",
        "Art, music, and language",
        "Research and hands-on projects",
      ],
      familyStudy: [
        "Learn the historical background before drawing conclusions.",
        "Distinguish cultural learning from the family's own religious observance.",
        "Ask respectful questions about similarities and differences among families and cultures.",
      ],
      activities: [
        "Map countries and regions connected to the lesson.",
        "Research one historical figure or contribution.",
        "Prepare or study a traditional food.",
        "Create an art, music, language, or history project.",
      ],
    },
    {
      slug: "christmas-history-family-practice",
      title: "Christmas: History & Why Our Family Does Not Observe It",
      category: "biblical-understanding",
      status: "ready",
      childQuestion: "Everybody at school is doing this. Why doesn't our family celebrate Christmas?",
      purpose:
        "Give children an age-appropriate place to study the history of Christmas, examine Scripture, understand the family's teaching and practice, ask questions, and choose a constructive alternative learning activity.",
      learningAreas: [
        "Historical background and development of Christmas traditions",
        "What Scripture says and does not say",
        "The family's biblical teaching and practice",
        "How to explain the family's choice respectfully",
        "How to respond when school or friends are celebrating",
      ],
      familyStudy: [
        "Keep historical claims identified as history and Scripture claims identified as Scripture.",
        "Use the KJV 1611 and Apocrypha for the family's Scripture study.",
        "Attach parent-approved ministry or study resources only after review.",
        "Give children room to ask questions without making them feel isolated for not participating.",
      ],
      activities: [
        "Build a history timeline from researched sources.",
        "Read and record the Scriptures selected by the parent.",
        "Practice a respectful answer to: Why doesn't your family celebrate?",
        "Choose a family-approved study, service, creative, or practical-life activity instead.",
      ],
    },
    {
      slug: "day-of-atonement",
      title: "Day of Atonement",
      category: "biblical-understanding",
      status: "planned",
      childQuestion: "What is the Day of Atonement, and why does our family observe it?",
      purpose:
        "Build an age-appropriate Scripture lesson explaining the observance, its biblical foundation, family preparation, reflection, and practical application.",
      learningAreas: ["Scripture", "Historical and biblical context", "Family practice", "Reflection"],
      familyStudy: ["Parent-approved Scriptures", "Age-appropriate explanation", "Questions and reflection"],
      activities: ["Scripture notebook", "Family discussion", "Reflection activity"],
    },
    {
      slug: "feast-of-tabernacles",
      title: "Feast of Tabernacles",
      category: "biblical-understanding",
      status: "planned",
      childQuestion: "What is the Feast of Tabernacles, and why does our family observe it?",
      purpose:
        "Build an age-appropriate Scripture and family-learning module covering the feast, its biblical context, family preparation, and meaningful activities.",
      learningAreas: ["Scripture", "Biblical history", "Family preparation", "Hands-on learning"],
      familyStudy: ["Parent-approved Scriptures", "Historical context", "Family teaching and practice"],
      activities: ["Scripture notebook", "Family feast planning", "Age-appropriate hands-on project"],
    },
  ] satisfies readonly AcademyUnderstandingModule[],
} as const;
