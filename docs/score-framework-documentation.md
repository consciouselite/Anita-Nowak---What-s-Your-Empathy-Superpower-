# Score Framework: Mind-Body Connection Assessment

## Overview

The Score Framework is a comprehensive assessment methodology designed to measure a participant's level of mind-body connection and somatic awareness. It provides a quantifiable score that places individuals into one of four distinct awareness levels, each with tailored recommendations and growth pathways.

The Mind-Body Connection Assessment created using this framework helps users understand their current level of bodily awareness and provides targeted practices to deepen their connection between mind and body.

## Framework Structure

### 1. Assessment Design

The Score Framework assessment consists of:

- **12 questions**: Each question targets a specific aspect of mind-body connection
- **5-point scoring scale**: From lowest awareness (1) to highest awareness (5)
- **Maximum score of 60**: Representing complete embodied wisdom
- **4 distinct result profiles**: Each with personalized recommendations

### 2. Key Components

#### 2.1 Title and Framing

The assessment uses a clear, direct title with [QUIZ] indicator:

- **The Mind-Body Connection Assessment [QUIZ]**
- Subtitle emphasizes quick completion time (3 minutes) and discovery

#### 2.2 Question Categories

The 12 questions measure distinct dimensions of somatic awareness:

1. **Physical sensation awareness**: Recognition of bodily sensations during stress
2. **Body check-in frequency**: Regular attention to physical state
3. **Tension location awareness**: Ability to identify where tension manifests
4. **Emotion-body connection**: Linking emotional states to physical sensations
5. **Breath utilization**: Using breath to influence physical and emotional states
6. **Sensation discrimination**: Differentiating between types of physical sensations
7. **Tension release capability**: Ability to release tension through mindful practices
8. **Thought-sensation awareness**: Recognizing connections between thoughts and physical responses
9. **Movement awareness**: Conscious connection during physical activity
10. **Body signal relationship**: How one responds to the body's needs and signals
11. **Mindful body connection**: Ability to maintain awareness during mindfulness practice
12. **Movement as connection**: Using movement for mind-body integration

#### 2.3 Scoring Profiles

The assessment places participants into four distinct profiles based on their total score:

1. **Disconnection Zone (12-24)**

   - Significant separation between mind and body
   - May experience physical tension and emotional stress
   - Recommended simple daily body check-ins

2. **Awareness Building (25-36)**

   - Foundational awareness but misses signals during stress
   - At a threshold where consistent practices can create substantial growth
   - Recommended breath-body connection practices

3. **Integrated Presence (37-48)**

   - Good mind-body connection in most situations
   - Established foundation allows exploration of subtler dimensions
   - Recommended more advanced mindful movement practices

4. **Embodied Wisdom (49-60)**
   - Exceptional mind-body integration
   - Deep somatic awareness serves as a resource for navigating life
   - Recommended teaching others and developing personalized practices

#### 2.4 Targeted Recommendations

Each profile comes with four specific practice recommendations:

- Simple, actionable mindfulness exercises
- Appropriate to the participant's current level
- Progressive in complexity across the profiles
- Focused on building a deeper mind-body connection

## Implementation Details

### Technical Structure

The assessment is implemented in the following files:

- `src/data/scoreQuizData.ts`: Contains questions, scoring options, and result profiles
- `src/App.tsx`: Renders the assessment UI and manages the quiz flow
- `src/hooks/useQuiz.ts`: Manages quiz state, answers, and result calculation
- `src/components/results/QuizResult.tsx`: Displays personalized results

### Score Calculation

1. Each question is answered on a 1-5 scale
2. All 12 question scores are summed for a total score (12-60)
3. The total score determines which of the four profiles the participant matches
4. Results include the score, profile description, and targeted recommendations

## User Experience Flow

1. **Welcome Screen**: Introduction to the quiz purpose and completion time
2. **Onboarding**: Collection of name, gender, and age information
3. **Assessment**: 12 questions with 5 response options each
4. **Form Submission**: Collection of contact information
5. **Results**: Display of personalized score, profile description, and recommendations

## Benefits of the Score Framework

1. **Measurable Progress**: Provides a clear metric for tracking improvement
2. **Personalized Guidance**: Tailors recommendations to current awareness level
3. **Simple Yet Comprehensive**: Balances depth of assessment with user-friendly experience
4. **Educational Component**: Increases awareness through the assessment process itself
5. **Actionable Results**: Offers specific practices rather than just information

## Integration with Coach Pamela's Brand

The Mind-Body Connection Assessment aligns directly with Coach Pamela's mission by:

1. Making mindfulness accessible through assessment and targeted practices
2. Addressing common challenges like physical tension and trauma responses
3. Providing an entry point to deeper work through the Mindful Motion methodology
4. Offering a personalized approach to mind-body connection

## Adapting the Framework

This Score Framework can be adapted to assess other dimensions by:

1. Identifying key measurement areas for the new domain
2. Creating 10-12 questions covering the essential aspects
3. Developing 4-5 distinct result profiles with targeted recommendations
4. Maintaining the scoring structure (1-5 scale per question)

The framework's strength lies in its balance of depth, personalization, and ease of completion, making it ideal for initial assessments that lead to deeper engagement.
