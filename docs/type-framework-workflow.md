# Type Framework Development Workflow

This document outlines the process of creating fun, shareable personality quizzes that help people discover their unique type - think "What's Your Communication Superpower?" rather than "Communication Style Assessment."

## The Magic of Type Quizzes

Type quizzes are perfect for:

- Helping people discover something fascinating about themselves
- Creating those "OMG, that's SO me!" moments that people love to share
- Celebrating different styles without making any seem "better" or "worse"
- Creating instant connections through shared types ("You're a Visionary too?!")

## Step 1: Finding Your Quiz's Personality

Define your quiz personality in the `branding.json` file under the `quizTopics` array:

```json
{
  "framework": "Type",
  "title": "What's Your Communication Superpower?",
  "description": "Discover your unique communication style and how it creates magic (or chaos) in your relationships",
  "targetProblem": "Misunderstandings and communication breakdowns in relationships",
  "callToAction": "Find your communication superpower!",
  "resultBenefit": "Custom strategies to leverage your natural communication gifts",
  "types": [
    {
      "name": "The Clarity Champion",
      "description": "You have the rare gift of making the complex simple"
    },
    {
      "name": "The Vision Weaver",
      "description": "You see possibilities where others see only what is"
    },
    {
      "name": "The Emotion Navigator",
      "description": "You read the emotional undercurrents others miss completely"
    },
    {
      "name": "The Action Catalyst",
      "description": "You turn conversations into momentum when others just keep talking"
    }
  ]
}
```

## Step 2: Creating Your Quiz Home

For each quiz, set up your folders like this:

```
📂 quizzes/
  📂 communication-superpower/
    📂 research/
      📄 research-themes.md
    📂 content/
      📄 quiz-content.md
    📂 implementation/
      📄 typeQuizData.ts
```

## Step 3: Research Phase

1. Use the **Type Framework Research Themes Generator** prompt (docs\prompts\Type-Framework-Research-Themes.md) to create a research document exploring the personality types you want to identify.
2. Your research should focus on:
   - Clear distinctions between types
   - How each type manifests in everyday situations
   - The unique strengths and challenges of each type
   - How different types interact with each other
   - Relatable examples and cultural references for each type

## Step 4: Content Creation

Use the **Type Framework Quiz Generation Prompt** with Claude to generate your quiz content including:

- Quiz title and subtitle
- 9-12 questions with type-specific answer options
- 4-5 personality type profiles with descriptions
- Follow-up messaging for each type

Save this content in `quiz-content.md` for implementation.

## Step 5: Implementation

### 5.1 Create typeQuizData.ts

Transform your quiz content into code:

```typescript
// Quiz title and subtitle
export const quizTitle = "What's Your Communication Superpower? [QUIZ]";
export const quizSubtitle =
  "Discover your unique communication magic in just 3 minutes";

// Questions array with type-specific options
export const typeQuestions: Question[] = [
  {
    id: 1,
    text: "When you're in a meeting that's going nowhere, what's your instinct?",
    options: [
      {
        text: "Break it down into clear, logical steps",
        type: "Clarity",
        icon: "🔍",
      },
      {
        text: "Zoom out to see the bigger picture everyone's missing",
        type: "Vision",
        icon: "🔭",
      },
      {
        text: "Check in on how everyone's feeling about the discussion",
        type: "Emotion",
        icon: "❤️",
      },
      {
        text: "Suggest a specific action to move things forward",
        type: "Action",
        icon: "🚀",
      },
    ],
  },
  // Additional 8-11 questions...
];

// Type definitions
export const communicationTypes: PersonalityType[] = [
  {
    type: "The Clarity Champion",
    description:
      "You have the magical ability to take the complex and make it simple. While others get lost in the fog, your mind naturally organizes information into clear, logical structures...",
    strengths: [
      "You can explain complicated ideas so anyone can understand",
      // Additional 3 strengths...
    ],
    challenges: [
      "You might sometimes focus so much on precision that you miss the emotional context",
      // Additional 3 challenges...
    ],
    tips: [
      "Start conversations with the big picture before diving into details",
      // Additional 3 tips...
    ],
    image: "https://example.com/clarity-champion.jpg",
  },
  // Additional 3-4 types...
];
```

### 5.2 Type-Specific Calculation Logic

Implement the type-matching algorithm:

```typescript
import { communicationTypes } from "./data/typeQuizData";

// Type-specific calculation logic
const calculateResult = () => {
  // Count frequency of each type in answers
  const typeCounts = state.answers.reduce((counts, answer) => {
    const type = answer; // In Type Framework, answers are type identifiers
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  // Find dominant type
  let dominantType = null;
  let maxCount = 0;

  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxCount) {
      dominantType = type;
      maxCount = count;
    }
  }

  // Find matching personality profile
  return communicationTypes.find((profile) =>
    profile.type.includes(dominantType)
  );
};
```

## Step 6: Application Integration

### 6.1 Update Imports

Update the imports in `src/App.tsx`:

```typescript
import { typeQuestions, quizTitle, quizSubtitle } from "./data/typeQuizData";
```

### 6.2 Update Question Component

Modify the `QuizQuestion` component to handle type-based questions:

```typescript
// For Type Framework, answer options contain type identifiers instead of scores
const handleSelectType = (type: string) => {
  onSelectAnswer(type);
};

// In render:
{
  question.options.map((option, index) => (
    <button
      key={index}
      className={`option-button ${
        selectedAnswer === option.type ? "option-button-selected" : ""
      }`}
      onClick={() => handleSelectType(option.type)}
    >
      <span className="text-xl sm:text-2xl">{option.icon}</span>
      <span className="text-sm sm:text-base">{option.text}</span>
    </button>
  ));
}
```
