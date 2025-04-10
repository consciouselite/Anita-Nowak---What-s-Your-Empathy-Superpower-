# Success Blocker Framework Development Workflow

This document outlines the process of creating fun, shareable quizzes that help people discover their unique growth opportunity - think "What's Your Hidden Success Blocker?" rather than "Hidden Confidence Blocks Assessment."

## The Insight of Success Blocker Quizzes

Success Blocker quizzes are perfect for:

- Helping people have their "Aha!" moment about what's really holding them back
- Creating those "That explains SO much!" revelations people love to share
- Turning self-awareness into a fun discovery rather than a painful realization
- Offering a clear path forward that feels exciting, not overwhelming

## Step 1: Finding Your Quiz's Personality

Define your quiz personality in the `branding.json` file under the `quizTopics` array:

```json
{
  "framework": "Killer",
  "title": "What's Your Hidden Confidence Blocker?",
  "description": "Discover the one thing secretly holding back your authentic self-expression",
  "targetProblem": "Persistent self-doubt despite understanding confidence principles",
  "callToAction": "Uncover your unique confidence blocker!",
  "resultBenefit": "Your personalized confidence breakthrough strategy",
  "killerMistakes": [
    {
      "name": "The Inner Critic Loop",
      "description": "Your internal dialogue is your toughest audience"
    },
    {
      "name": "The Approval Magnet",
      "description": "You're collecting everyone's opinions but your own"
    },
    {
      "name": "The Perfectionism Trap",
      "description": "You've set the bar at 'flawless' (which doesn't exist)"
    },
    {
      "name": "The Secret Impostor",
      "description": "You feel like you're fooling everyone (plot twist: you're not)"
    }
  ]
}
```

## Step 2: Creating Your Quiz Home

For each quiz, set up your folders like this:

```
📂 quizzes/
  📂 confidence-blocker/
    📂 research/
      📄 research-themes.md
    📂 content/
      📄 quiz-content.md
    📂 implementation/
      📄 killerQuizData.ts
```

## Step 3: Research Phase

1. Use the **Killer Framework Research Themes Generator** (docs\prompts\Killer-Framework-Research-Themes.md) prompt to create a research document exploring the patterns you want to address.
2. Your research should focus on:
   - Pattern recognition and relatable examples
   - Protective origins of limiting behaviors
   - Transformation possibilities
   - Pop culture examples and shared experiences

## Step 4: Content Creation

Use the **Killer Framework Quiz Generation Prompt** with Claude to generate your quiz content including:

- Quiz title and subtitle
- 9-12 questions with pattern-specific answers
- 3-5 pattern profiles with descriptions
- Follow-up messaging

Save this content in `quiz-content.md` for implementation.

## Step 5: Implementation

### 5.1 Create killerQuizData.ts

Transform your quiz content into code:

```typescript
// Quiz title and subtitle
export const quizTitle = "What's Your Hidden Confidence Blocker? [QUIZ]";
export const quizSubtitle =
  "Discover what's really holding back your authentic self-expression in just 3 minutes";

// Questions array with pattern indicators
export const killerQuestions: Question[] = [
  {
    id: 1,
    text: "When you're about to share an idea in a group, what typically runs through your mind?",
    options: [
      {
        text: "Is this idea even good enough to mention?",
        mistake: "InnerCritic",
        icon: "🤔",
      },
      {
        text: "Will everyone like what I'm about to say?",
        mistake: "ApprovalMagnet",
        icon: "👍",
      },
      {
        text: "I need to make sure this is absolutely flawless",
        mistake: "Perfectionist",
        icon: "✨",
      },
      {
        text: "They'll probably realize I don't know what I'm talking about",
        mistake: "Impostor",
        icon: "🎭",
      },
    ],
  },
  // Additional 8-11 questions...
];

// Pattern definitions
export const confidenceBlockers: SuccessBlocker[] = [
  {
    type: "The Inner Critic Loop",
    description:
      "You have a VIP ticket to the most exclusive show in town: your inner critic's greatest hits! This isn't just occasional self-doubt - your inner critic is basically a roommate who never pays rent but always has opinions about your life choices...",
    origin:
      "This pattern likely began as a way to protect you from external criticism by criticizing yourself first",
    behaviors: [
      "You rehearse conversations in your head before having them",
      // Additional behaviors...
    ],
    strategies: [
      "Name your inner critic (something silly works best) to create separation",
      // Additional strategies...
    ],
    image: "https://example.com/inner-critic.jpg",
  },
  // Additional 3-4 patterns...
];
```

### 5.2 Success Blocker Calculation Logic

Implement the pattern-matching algorithm:

```typescript
import { confidenceBlockers } from "./data/killerQuizData";

// Pattern-specific calculation logic
const calculateResult = () => {
  // Count frequency of each pattern in answers
  const patternCounts = state.answers.reduce((counts, answer) => {
    const pattern = answer; // In Killer Framework, answers are pattern identifiers
    counts[pattern] = (counts[pattern] || 0) + 1;
    return counts;
  }, {});

  // Find dominant pattern
  let dominantPattern = null;
  let maxCount = 0;

  for (const [pattern, count] of Object.entries(patternCounts)) {
    if (count > maxCount) {
      dominantPattern = pattern;
      maxCount = count;
    }
  }

  // Find matching blocker profile
  return confidenceBlockers.find((blocker) =>
    blocker.type.includes(convertPatternToName(dominantPattern))
  );
};
```
