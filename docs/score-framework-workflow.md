# Score Framework Development Workflow

This document outlines the process of creating fun, shareable quizzes that give people an "aha!" score they'll want to improve - think "What's Your Emotional Intelligence Score?" rather than "Emotional Intelligence Assessment."

## The Appeal of Score Quizzes

Score quizzes are perfect for:

- Giving people a fun way to measure something they care about
- Creating that "I got 78%!" shareable moment
- Sparking friendly competition ("I beat your mindfulness score!")
- Providing that satisfying "level up" feeling as people improve

## Step 1: Finding Your Quiz's Personality

Define your quiz personality in the `branding.json` file under the `quizTopics` array:

```json
{
  "framework": "Score",
  "title": "The Mind-Body Connection Quiz",
  "description": "How well do you listen to your body's secret signals?",
  "targetProblem": "Disconnection from body sensations and physical responses",
  "callToAction": "Discover your body-mind connection score!",
  "resultBenefit": "Custom practices to strengthen your mind-body connection",
  "scoreRanges": [
    {
      "name": "Body-Mind Beginner",
      "range": "12-24",
      "description": "Your mind and body are practically strangers"
    },
    {
      "name": "Awareness Apprentice",
      "range": "25-36",
      "description": "You're starting to tune in to your body's whispers"
    },
    {
      "name": "Connection Craftsman",
      "range": "37-48",
      "description": "You've built a solid relationship with your body"
    },
    {
      "name": "Somatic Superstar",
      "range": "49-60",
      "description": "Your mind and body are best friends forever"
    }
  ]
}
```

## Step 2: Creating Your Quiz Home

For each quiz, set up your folders like this:

```
📂 quizzes/
  📂 mind-body-quiz/
    📂 research/
      📄 research-themes.md
    📂 content/
      📄 quiz-content.md
    📂 implementation/
      📄 scoreQuizData.ts
```

## Step 3: Research Phase

1. Use the **Score Framework Research Themes Generator** prompt (docs\prompts\Score-Framework-Research-Themes.md) to create a research document exploring the dimensions you want to measure.
2. Your research should focus on:
   - What makes this topic engaging to measure
   - Meaningful progression stages
   - Relatable indicators at each level
   - Improvement strategies for each score range

## Step 4: Content Creation

Use the **Score Framework Quiz Generation Prompt** with to generate your quiz content including:

- Quiz title and subtitle
- 9-12 questions with scoring options
- Score range profiles with descriptions
- Follow-up messaging for each score range

Save this content in `quiz-content.md` for implementation.

## Step 5: Implementation

### 5.1 Create scoreQuizData.ts

Transform your quiz content into code:

```typescript
// Quiz title and subtitle
export const quizTitle = "The Mind-Body Connection Quiz [QUIZ]";
export const quizSubtitle =
  "Discover your body-mind connection score in just 3 minutes";

// Questions array with options
export const scoreQuestions: Question[] = [
  {
    id: 1,
    text: "When you're stressed, how quickly do you notice changes in your body?",
    options: [
      {
        text: "What changes? I'm in my head, not my body",
        score: 1,
        icon: "🤔",
      },
      {
        text: "Usually only after someone points it out",
        score: 2,
        icon: "👀",
      },
      { text: "I notice eventually, but not right away", score: 3, icon: "⏱️" },
      { text: "I catch on pretty quickly", score: 4, icon: "💫" },
      {
        text: "Almost instantly - my body and I are besties",
        score: 5,
        icon: "✨",
      },
    ],
  },
  // Additional 11 questions...
];

// Score profile definitions
export const scoreProfiles: PersonalityType[] = [
  {
    type: "Body-Mind Beginner",
    description:
      "Your mind and body are like awkward strangers at a party - aware of each other but not really talking yet. Don't worry though, we all start somewhere, and you've just taken the first step toward a beautiful friendship!",
    scoreRange: { min: 12, max: 24 },
    image: "https://example.com/beginner.jpg",
    tips: [
      "Try a 10-second body scan every morning (just notice, no judging!)",
      // Additional 3 tips...
    ],
  },
  // Additional 3 profiles...
];
```

### 5.2 Score-Specific Calculation Logic

Implement the scoring math:

```typescript
// Score-specific calculation logic
const calculateResult = () => {
  // Sum all numeric scores from answers
  const totalScore = state.answers.reduce((sum, score) => sum + score, 0);

  // Find the matching profile based on score range
  const profile =
    scoreProfiles.find(
      (p) => totalScore >= p.scoreRange.min && totalScore <= p.scoreRange.max
    ) || scoreProfiles[0];

  // Return both the raw score and matching profile
  return { score: totalScore, profile };
};
```
