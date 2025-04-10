export interface OnboardingData {
  firstName: string;
  gender: 'male' | 'female' | null;
  ageGroup: '18-25' | '26-35' | '36-45' | '46+' | null;
}

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
}

export interface UserData extends OnboardingData {
  lastName: string;
  email: string;
  phone: string;
}

export interface QuizState {
  step: 'welcome' | 'name' | 'gender' | 'age' | 'questions' | 'form' | 'result';
  currentQuestion: number;
  answers: number[];
  onboardingData: OnboardingData;
}