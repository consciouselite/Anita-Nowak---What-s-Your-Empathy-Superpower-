export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    icon: string;
  }[];
  reverseScoring?: boolean;
}

export interface PersonalityType {
  type: string;
  description: string;
  scoreRange: {
    min: number;
    max: number;
  };
  image: string;
  tips: string[];
  strengths?: string[];
  challenges?: string[];
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | null;
  ageGroup?: '18-25' | '26-35' | '36-45' | '46+' | null;
}

export interface OnboardingData {
  firstName: string;
  gender: 'male' | 'female' | null;
  ageGroup: '18-25' | '26-35' | '36-45' | '46+' | null;
}

export type QuizStep = 'welcome' | 'name' | 'gender' | 'age' | 'questions' | 'form' | 'result';

export interface QuizState {
  step: QuizStep;
  currentQuestion: number;
  answers: any[];
  onboardingData: OnboardingData;
}