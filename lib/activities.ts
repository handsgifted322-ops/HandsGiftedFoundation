export type Activity = {
  slug: string;
  title: string;
  topic: "Cooking" | "Gardening" | "Sewing" | "Creative gifts" | "Family faith";
  ages: string;
  minAge: number;
  maxAge: number;
  minutes: number;
  summary: string;
  supplies: string[];
  safety: string;
  steps: string[];
  conversation: string[];
  faith: { reference: string; connection: string; question: string };
  next: string;
};

export const activities: Activity[] = [
  {
    slug: "measure-a-family-recipe", title: "Measure a family recipe", topic: "Cooking", ages: "6–13", minAge: 6, maxAge: 13, minutes: 25,
    summary: "Practice reading, fractions, teamwork, and kitchen care while preparing a simple family recipe.",
    supplies: ["A familiar recipe", "Measuring cups or spoons", "Ingredients", "Paper and pencil"],
    safety: "An adult handles heat, sharp tools, and food safety. Give younger children measuring and mixing tasks.",
    steps: ["Read the recipe together and count how many people it serves.", "Ask the child to find and measure two ingredients; name the fractions on the cups or spoons.", "Prepare the recipe together, with an adult handling heat and knives.", "Write down one change you would make next time, then clean the workspace together."],
    conversation: ["Which measurement was hardest, and how did you solve it?", "How could we adjust this recipe for more or fewer people?"],
    faith: { reference: "John 6:12", connection: "Read the verse in its chapter and discuss caring for food after a meal.", question: "What can our family do with leftovers instead of wasting them?" },
    next: "Try writing a shopping list for the same recipe and estimating how much it will cost.",
  },
  {
    slug: "grow-a-seed", title: "Grow a seed and keep a journal", topic: "Gardening", ages: "5–13", minAge: 5, maxAge: 13, minutes: 20,
    summary: "Observe plant growth, practice patience, and record changes over a week.",
    supplies: ["A bean or other easy-to-grow seed", "A small container and soil", "Water", "Paper and pencil"],
    safety: "Use clean soil and wash hands afterward. An adult checks whether seeds or plants are safe around young children and pets.",
    steps: ["Put soil in a container with drainage and plant the seed at the depth on its packet.", "Water lightly and place it where it can get suitable light.", "Draw the container and write today's date.", "Check moisture and record what changes every day for a week."],
    conversation: ["What does the seed need to grow?", "What changed today, and what might happen next?"],
    faith: { reference: "1 Corinthians 3:6–7", connection: "Read the surrounding passage and talk about the difference between caring for a plant and controlling its growth.", question: "What can we faithfully do even when results take time?" },
    next: "Measure the plant once a week and make a simple growth chart.",
  },
  {
    slug: "practice-a-safe-stitch", title: "Practice a first hand stitch", topic: "Sewing", ages: "8–13", minAge: 8, maxAge: 13, minutes: 25,
    summary: "Build hand control and patience with a small practice piece before repairing clothing.",
    supplies: ["Scrap fabric", "Needle and thread", "Blunt-tip practice needle for beginners", "Pencil or washable fabric marker"],
    safety: "An adult supervises needles and scissors, counts needles before and after, and stores them securely.",
    steps: ["Draw a short straight line on scrap fabric.", "Thread the needle with adult help and make a knot.", "Make slow, even stitches along the line, leaving space between stitches.", "Compare the stitches and practice again; keep the fabric as a record of progress."],
    conversation: ["Which stitch became easier with practice?", "What could our family mend instead of throwing away?"],
    faith: { reference: "Exodus 35:35", connection: "Read about the workers and the skills used to make things well.", question: "What skill would you like to improve through practice?" },
    next: "With an adult, practice sewing a button onto scrap fabric.",
  },
  {
    slug: "make-a-gift-map", title: "Make a gift and interest map", topic: "Creative gifts", ages: "6–17", minAge: 6, maxAge: 17, minutes: 20,
    summary: "Help a child notice interests, strengths, and skills they want to develop.",
    supplies: ["Paper", "Colored pencils or markers", "A family member who can listen"],
    safety: "Let the child choose what to share. Avoid ranking siblings or turning interests into pressure to perform.",
    steps: ["Draw three circles labeled 'I enjoy,' 'I am learning,' and 'I want to try.'", "Add activities, subjects, and questions to each circle.", "Ask the child to choose one interest for a small project this week.", "Write a first step and the supplies or support needed."],
    conversation: ["When do you feel most curious?", "Who could teach or practice this with you?"],
    faith: { reference: "Proverbs 22:29", connection: "Read the proverb and talk about developing skill through steady work.", question: "What would practice look like for the gift you want to grow?" },
    next: "Return to the map next week and add what the child discovered.",
  },
  {
    slug: "scripture-into-action", title: "Take a scripture into family life", topic: "Family faith", ages: "6–17", minAge: 6, maxAge: 17, minutes: 15,
    summary: "Read a passage in context, discuss its meaning, and choose one practical action together.",
    supplies: ["A Bible", "Paper or a family notebook"],
    safety: "Invite questions without shaming. Adults guide the discussion and choose an age-appropriate action.",
    steps: ["Read Luke 16:10 and several verses around it together.", "Ask who is speaking, what is happening, and what the passage teaches.", "Choose one small responsibility the child wants to practice this week.", "At the end of the week, discuss what worked and what support would help."],
    conversation: ["What does being faithful with something small look like at home?", "What should we do when we forget or make a mistake?"],
    faith: { reference: "Luke 16:10", connection: "Discuss faithfulness with responsibilities already in our care.", question: "What one small responsibility can we practice this week?" },
    next: "Choose another passage and repeat: context, principle, action, reflection.",
  },
];

export const getActivity = (slug: string) => activities.find((activity) => activity.slug === slug);
