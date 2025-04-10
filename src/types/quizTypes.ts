export type EmpathyType = 
  | 'EmpathicNavigator'
  | 'CompassionCatalyst'
  | 'EmotiveExplorer'
  | 'EmotiveGuardian';

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    type: EmpathyType;
    icon: string;
  }[];
}

export interface TypeCount {
  type: EmpathyType;
  percentage: number;
}

export interface PersonalityType {
  type: EmpathyType;
  description: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
  image: string;
}
