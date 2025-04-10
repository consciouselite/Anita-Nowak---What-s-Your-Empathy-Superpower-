# Quiz Development Workflow

This document outlines the process of transforming quiz topic definitions in `branding.json` into functional quiz content in `quizData.ts`. The workflow ensures that quizzes are psychologically sound, engaging, and aligned with the coach's branding and target audience.

## Step 1: Quiz Topic Definition in branding.json

The quiz topic is initially defined in the `branding.json` file under the `quizTopics` array. Each quiz topic contains:

- **framework**: The type of quiz framework (Type, Killer, or Score)
- **title**: The main quiz title
- **description**: Brief overview of what the quiz measures
- **targetProblem**: The key issue the quiz addresses
- **callToAction**: The button text for quiz engagement
- **resultBenefit**: What participants gain from taking the quiz

Additional fields vary by framework type:

- **Score Framework**: Includes `scoreRanges` array with different scoring levels
- **Type Framework**: Includes `types` array with different personality types
- **Killer Framework**: Focuses on identifying specific patterns or mistakes

## Step 2: Research Phase Using Quiz Research Themes Generator

Before developing the actual quiz questions, we conduct thorough research using the **Quiz Research Themes Generator Prompt**. This research:

1. Analyzes the quiz topic and target audience
2. Identifies key psychological and theoretical foundations
3. Determines relevant academic and practical research areas
4. Structures themes in a logical progression
5. Ensures themes address both content development and audience needs

The research output provides core themes that will inform the quiz content development.

## Step 3: Quiz Content Development Using Framework-Specific Prompts

Based on the research, we develop the actual quiz content using framework-specific prompts:

- **Score Framework Prompt**: For assessments that measure participants on a numerical scale
- **Type Framework Prompt**: For quizzes that categorize participants into distinct personality types
- **Killer Framework Prompt**: For quizzes that identify specific patterns or mistakes

These prompts guide the creation of:

- Quiz titles and subtitles (with hypnotic patterns)
- Question sets (9-12 questions for optimal engagement)
- Answer options (clear and concise)
- Result descriptions (personalized and action-oriented)
- Follow-up messaging (strategic and conversion-focused)

## Step 4: Implementation in quizData.ts

The final quiz content is implemented in `quizData.ts` with the following structure:

```typescript
// Quiz title and subtitle
export const quizTitle = "The Mind-Body Connection Assessment [QUIZ]";
export const quizSubtitle =
  "Discover your somatic awareness score in just 3 minutes";

// Questions array with options
export const questions: Question[] = [
  // 9-12 questions with scoring options
];

// Personality types or score ranges
export const personalityTypes: PersonalityType[] = [
  // Different result categories based on scores
];
```

## Benefits of This Workflow

1. **Consistency**: Ensures all quizzes align with the coach's brand and messaging
2. **Psychological Depth**: Research-backed questions provide meaningful insights
3. **Engagement**: Strategic design keeps completion rates high
4. **Conversion**: Results and follow-up maximize conversion opportunities
5. **Scalability**: Structured process allows for efficient quiz development

## Best Practices

1. Always include "[QUIZ]" after the quiz title for clear identification
2. Keep questions concise (answerable in 10-15 seconds)
3. Ensure scoring scales are intuitive and easy to understand
4. Use personalization elements (participant's name) strategically
5. Balance measurement precision with user experience
6. Ensure results provide clear next steps and value
