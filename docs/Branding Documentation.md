I'll create a documentation that describes each major section of the branding.json file. This will help understand the structure and purpose of each section in the JSON template.

# Branding Template Documentation

## 1. Coach Section

The root object containing all coach-specific information and branding elements.

### 1.1 Basic Information

- `name`: Coach's full name
- `profilePicture`: URL to the coach's professional profile image
- `mission`: Coach's personal mission statement or core purpose

### 1.2 Habits

A section defining the coach's approach to habit formation and suggestions:

- `categories`: Array of habit categories with:

  - `id`: Unique identifier for the category
  - `name`: Category name
  - `emoji`: Visual representation using emoji

- `suggestions`: Array of specific habit recommendations with:
  - `id`: Unique identifier for the habit
  - `name`: Habit name
  - `category`: Reference to parent category
  - `description`: Detailed explanation of the habit

### 1.3 Quiz Topics

Array of assessment frameworks used for client evaluation:

- `framework`: Type of quiz (Killer/Type/Score)
- `title`: Quiz headline
- `description`: Detailed quiz purpose
- `targetProblem`: Specific issue addressed
- `callToAction`: Engagement prompt
- `resultBenefit`: Value proposition
- `types/scoreRanges`: Assessment results and recommendations

### 1.4 Social Links

Contact and social media presence:

- `instagram`: Instagram profile URL
- `youtube`: YouTube channel URL
- `whatsapp`: WhatsApp contact link
- `email`: Professional email address
- `tiktok`: TikTok profile URL
- `website`: Website URL

### 1.5 Target Audience

Detailed ideal client profile:

- `wants`: Client desires and goals
- `frustrations`: Pain points and challenges
- `objections`: Common resistance points categorized as:
  - `timeBasedObjections`
  - `skepticismBasedObjections`
  - `capabilityBasedObjections`
  - `valueBasedObjections`
- `dreams`: Aspirational outcomes
- `fears`: Client concerns
- `enemies`: Obstacles and opposition
- `copingMechanism`: Current solution attempts
- `limitingBeliefs`: Mental barriers

### 1.6 Backstory

Coach's personal journey:

- `heroJourney`:
  - `startingPoint`: Initial situation
  - `challengesFaced`: Obstacles overcome
  - `transformationProcess`: Growth journey
  - `currentSuccessState`: Present achievements
  - `lessonsLearned`: Key insights
  - `whyHelpingOthers`: Motivation for coaching

### 1.7 Proof

Credibility elements:

- `testimonials`: Client success stories
- `coachResults`: Professional achievements
- `celebrityEndorsements`: Notable recommendations
- `currentLifestyleProof`: Lifestyle demonstrations

## 2. Brand Section

Visual and design system specifications:

### 2.1 Color System

- `base`: Foundation color (white)
- `primary`: Main brand color palette (100-900 scale)
- `secondary`: Supporting slate color palette
- `accent`: Highlight color palette with hover states

### 2.2 Supporting Colors

Functional color schemes:

- `success`: Positive feedback colors
- `warning`: Cautionary colors
- `error`: Error state colors
- `info`: Informational colors

### 2.3 Gradients

Brand gradient specifications:

- `primary`: Main gradient styles
- `secondary`: Supporting gradient styles

### 2.4 Typography

Text styling system:

- `display`: Large headline text styles
- `heading`: Section header styles
- `body`: Main content text styles
- Scale definitions for consistent sizing
- Line height specifications

### 2.5 Spacing

Standardized spacing units from 0 to 24rem

### 2.6 Border Radius

Border rounding specifications from none to full

### 2.7 Shadows

Shadow depth variations for elevation

### 2.8 Component Tokens

Reusable UI element styles:

- `button`: Button variant styles
- `card`: Container styling
- `input`: Form input styling

This template provides a comprehensive structure for maintaining consistent branding and messaging across all coach-related materials while allowing for personalization of content within each section.
