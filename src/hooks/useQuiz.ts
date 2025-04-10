import { useState } from 'react';
import { QuizState, PersonalityType, UserData, OnboardingData } from '../types/quiz';
import { scoreProfiles } from '../data/scoreQuizData';
import { quizService } from '../services/quiz.service';

export const useQuiz = () => {
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

  const [result, setResult] = useState<PersonalityType | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...state.answers, score];
    setState(prev => ({
      ...prev,
      answers: newAnswers,
      currentQuestion: prev.currentQuestion + 1,
      step: prev.currentQuestion === 11 ? 'form' : 'questions'
    }));
  };

  const calculateResult = () => {
    const totalScore = state.answers.reduce((sum, score) => sum + score, 0);
    const profile = scoreProfiles.find(
      p => totalScore >= p.scoreRange.min && totalScore <= p.scoreRange.max
    ) || scoreProfiles[0];
    return { score: totalScore, profile };
  };

  const updateOnboarding = (data: Partial<OnboardingData>) => {
    setState(prev => ({
      ...prev,
      onboardingData: { ...prev.onboardingData, ...data }
    }));
  };

  const nextStep = () => {
    setState(prev => {
      const steps: QuizState['step'][] = ['welcome', 'name', 'gender', 'age', 'questions', 'form', 'result'];
      const currentIndex = steps.indexOf(prev.step);
      const nextStep = steps[currentIndex + 1];
      return { ...prev, step: nextStep };
    });
  };

  const handleFormSubmit = async (formData: Partial<UserData>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const fullUserData: UserData = {
        ...userData,
        ...state.onboardingData,
        ...formData
      };

      const { score, profile } = calculateResult();
      setResult(profile);
      setTotalScore(score);

      await quizService.saveQuizResults(
        fullUserData,
        score,
        profile.type,
        state.answers
      );

      setState(prev => ({ ...prev, step: 'result' }));
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to save quiz results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state,
    userData,
    result,
    totalScore,
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