import { useState } from 'react';
import { QuizState, UserData, OnboardingData, QuizStep } from '../types';
import { empathyTypes } from '../data/empathy-superpower/typeQuizData';
import { quizService } from '../services/quiz.service';

export const useTypeQuiz = () => {
  const [state, setState] = useState<QuizState>({
    step: 'welcome',
    currentQuestion: 0,
    answers: [],
    onboardingData: {
      firstName: '',
      gender: null,
      ageGroup: null
    }
  });

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: null,
    ageGroup: null
  });

  const [result, setResult] = useState<any>(null);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newAnswers = [...state.answers, type];
    setState((prev: QuizState) => ({
      ...prev,
      answers: newAnswers,
      currentQuestion: prev.currentQuestion + 1,
      step: prev.currentQuestion === 8 ? 'form' : 'questions' // We have 9 questions (0-8)
    }));
  };

  const calculateResult = () => {
    // Count frequency of each type in answers
    const counts: Record<string, number> = state.answers.reduce((acc: Record<string, number>, type: string) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Find the most frequent type (or handle ties by choosing the first one with the highest count)
    let maxCount = 0;
    let dominantType = "";

    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantType = type;
      }
    });

    // Get all types that have the same max count (ties)
    const topTypes = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([type]) => type);
    
    // If there's a tie, use a secondary factor to break the tie: 
    // For example, check which type appeared first in the user's answers
    if (topTypes.length > 1) {
      // Find the first occurrence of each tied type in the user's answers
      const firstOccurrences: Record<string, number> = {};
      topTypes.forEach(type => {
        firstOccurrences[type] = state.answers.findIndex(t => t === type);
      });
      
      // Sort by first occurrence (earliest wins)
      const sortedTypes = topTypes.sort((a, b) => firstOccurrences[a] - firstOccurrences[b]);
      dominantType = sortedTypes[0];
    }

    // Map the quiz answer type to the corresponding empathy type
    // The quiz options use "EmpathicNavigator" but the types use "The Empathic Navigator"
    const typeMapping: Record<string, string> = {
      'EmpathicNavigator': 'The Empathic Navigator',
      'CompassionCatalyst': 'The Compassion Catalyst',
      'EmotiveExplorer': 'The Emotive Explorer',
      'EmotiveGuardian': 'The Emotive Guardian'
    };
    
    // Get the properly formatted type name
    const formattedType = typeMapping[dominantType];
    
    // Find the matching profile
    const profile = empathyTypes.find(p => p.type === formattedType);
    
    if (!profile) {
      console.error(`Could not find profile for type: ${dominantType} -> ${formattedType}`);
      return { 
        profile: empathyTypes[0], 
        dominantType, 
        typeCounts: counts 
      };
    }

    return { 
      profile, 
      dominantType, 
      typeCounts: counts 
    };
  };

  const updateOnboarding = (data: Partial<OnboardingData>) => {
    setState((prev: QuizState) => ({
      ...prev,
      onboardingData: { ...prev.onboardingData, ...data }
    }));
  };

  const nextStep = () => {
    setState((prev: QuizState) => {
      const steps: QuizStep[] = ['welcome', 'name', 'gender', 'age', 'questions', 'form', 'result'];
      const currentIndex = steps.indexOf(prev.step);
      const nextStep = steps[currentIndex + 1];
      return { ...prev, step: nextStep };
    });
  };

  const handleFormSubmit = async (formData: Partial<UserData>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure firstName is used from onboarding data if not provided in the form
      const mergedData = {
        ...formData,
        firstName: formData.firstName || state.onboardingData.firstName || '',
      };

      const fullUserData = {
        ...userData,
        ...state.onboardingData,
        ...mergedData,
        ageGroup: formData.ageGroup || userData.ageGroup || state.onboardingData.ageGroup || null
      };

      // Update userData state with the correct firstName
      setUserData(fullUserData);

      const { profile, typeCounts: counts, dominantType } = calculateResult();
      setResult(profile);
      setTypeCounts(counts);

      try {
        // Try to save to server but don't block moving to results if it fails
        await quizService.saveQuizResults(
          fullUserData,
          0, // No score in type framework
          dominantType,
          state.answers.map(_ => 0) // Convert type answers to scores (all 0)
        );
      } catch (serverError) {
        console.error('Error saving quiz results to server:', serverError);
        setError('Failed to save quiz results, but your results are still available.');
        // Continue to results page despite the error
      }

      // Always move to results page, even if saving to server fails
      setState((prev: QuizState) => ({ ...prev, step: 'result' }));
    } catch (err) {
      console.error('Error calculating quiz results:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state,
    userData,
    result,
    typeCounts,
    isSubmitting,
    error,
    handleAnswer,
    handleFormSubmit,
    calculateResult,
    setUserData,
    updateOnboarding,
    nextStep
  };
}; 