import React from 'react';
import { Question, EmpathyType } from '../../types/quizTypes';
import { PieChart, ChevronRight, ChevronLeft, HelpCircle, ThumbsUp } from 'lucide-react';

// Extended question interface to match what's used in the component
interface QuizQuestion extends Question {
  selectedOptionId?: number;
}

// Extended option interface to add id property
interface QuizOption {
  id: number;
  text: string;
  type: EmpathyType;
  icon: string;
}

interface QuizContentProps {
  quizProps: {
    currentQuestion: QuizQuestion | null;
    quizQuestions: QuizQuestion[];
    currentStep: number;
    handleOptionClick: (option: any) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    quizProgress: number;
    userData: {
      firstName: string;
      email?: string;
      gender?: string;
      age?: string;
    };
    setUserData: (data: any) => void;
    validateUserData: () => boolean;
    userDataErrors: Record<string, string>;
    handleSubmitUserData: () => void;
    isSubmittingUserData: boolean;
  };
}

export const TypeQuizContent: React.FC<QuizContentProps> = ({ quizProps }) => {
  const { 
    currentQuestion, 
    quizQuestions, 
    currentStep, 
    handleOptionClick, 
    nextQuestion, 
    prevQuestion,
    quizProgress,
    userData,
    setUserData,
    validateUserData,
    userDataErrors,
    handleSubmitUserData,
    isSubmittingUserData
  } = quizProps;

  const renderQuizProgress = () => {
    return (
      <div className="quiz-progress mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-secondary-700">
            Question {currentStep} of {quizQuestions.length}
          </p>
          <p className="text-sm font-medium text-primary-600">
            {Math.round(quizProgress * 100)}% Complete
          </p>
        </div>
        <div className="h-2 w-full bg-secondary-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${quizProgress * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderQuizIntro = () => {
    return (
      <div className="quiz-intro text-center">
        <div className="flex justify-center mb-4">
          <PieChart size={48} className="text-primary-500" />
        </div>
        <h2 className="quiz-title mb-4">Discover Your Empathy Superpower</h2>
        <p className="mb-6 text-lg text-secondary-700 font-body">
          Take this 3-minute quiz to discover your unique empathy style and unlock personalized 
          strategies to enhance your relationships, leadership, and wellbeing.
        </p>
        
        <div className="card bg-primary-50 border-primary-100 mb-8">
          <div className="flex items-start">
            <HelpCircle size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary-800 mb-2 font-heading">How It Works:</h3>
              <ul className="list-disc pl-5 space-y-2 text-secondary-700">
                <li>Answer 15 quick questions about how you approach situations</li>
                <li>See your personalized empathy profile and breakdown</li>
                <li>Get tailored strategies to leverage your natural style</li>
              </ul>
            </div>
          </div>
        </div>
       
        <div className="mb-8">
          <p className="mb-4 text-center font-body">To begin, we'd love to know a bit about you:</p>
         
          <div className="user-form w-full max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-input w-full ${userDataErrors.firstName ? 'border-red-500' : ''}`}
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                placeholder="Your first name"
              />
              {userDataErrors.firstName && (
                <p className="mt-1 text-sm text-red-500">{userDataErrors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input w-full ${userDataErrors.email ? 'border-red-500' : ''}`}
                value={userData.email || ''}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Your email address"
              />
              {userDataErrors.email && (
                <p className="mt-1 text-sm text-red-500">{userDataErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Age Group
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`age-select-option ${userData.age === 'under30' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, age: 'under30' })}
                  >
                    Under 30
                  </button>
                  <button
                    type="button"
                    className={`age-select-option ${userData.age === '30to45' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, age: '30to45' })}
                  >
                    30-45
                  </button>
                  <button
                    type="button"
                    className={`age-select-option ${userData.age === '46to60' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, age: '46to60' })}
                  >
                    46-60
                  </button>
                  <button
                    type="button"
                    className={`age-select-option ${userData.age === 'over60' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, age: 'over60' })}
                  >
                    Over 60
                  </button>
                </div>
                {userDataErrors.age && (
                  <p className="mt-1 text-sm text-red-500">{userDataErrors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`gender-select-option ${userData.gender === 'female' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, gender: 'female' })}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={`gender-select-option ${userData.gender === 'male' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, gender: 'male' })}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    className={`gender-select-option ${userData.gender === 'nonbinary' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, gender: 'nonbinary' })}
                  >
                    Non-binary
                  </button>
                  <button
                    type="button"
                    className={`gender-select-option ${userData.gender === 'other' ? 'selected' : ''}`}
                    onClick={() => setUserData({ ...userData, gender: 'other' })}
                  >
                    Other
                  </button>
                </div>
                {userDataErrors.gender && (
                  <p className="mt-1 text-sm text-red-500">{userDataErrors.gender}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (validateUserData()) {
              handleSubmitUserData();
            }
          }}
          disabled={isSubmittingUserData}
          className="primary-button flex items-center justify-center w-full md:w-auto mx-auto px-8"
        >
          {isSubmittingUserData ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>Start the Quiz</span>
              <ChevronRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </div>
    );
  };

  const renderQuestion = (question: QuizQuestion) => {
    return (
      <div className="quiz-question">
        {renderQuizProgress()}
        
        <h2 className="quiz-question-title mb-6">{question.text}</h2>
        
        <div className="options-grid grid gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick({...option, id: index})}
              className={`option-button ${
                question.selectedOptionId === index ? 'selected' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="option-indicator mr-3">
                  <div className="option-check">
                    <ThumbsUp size={16} className="check-icon" />
                  </div>
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            className="secondary-button flex items-center justify-center"
            disabled={currentStep === 1}
          >
            <ChevronLeft size={18} className="mr-2" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={nextQuestion}
            className="primary-button flex items-center justify-center"
            disabled={!currentQuestion?.selectedOptionId}
          >
            <span>Next</span>
            <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // For intro screen
  if (currentStep === 0) {
    return renderQuizIntro();
  }

  // For questions
  return currentQuestion ? renderQuestion(currentQuestion) : null;
}; 