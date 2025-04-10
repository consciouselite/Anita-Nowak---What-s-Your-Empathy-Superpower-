import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizProgress } from './components/QuizProgress';
import { TypeQuizQuestion } from './components/TypeQuizQuestion';
import { LeadForm } from './components/LeadForm';
import { TypeQuizResult } from './components/results/TypeQuizResult';
import { NameInput } from './components/onboarding/NameInput';
import { GenderSelect } from './components/onboarding/GenderSelect';
import { AgeSelect } from './components/onboarding/AgeSelect';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { typeQuestions, quizTitle, quizSubtitle } from './data/empathy-superpower/typeQuizData'; // Corrected path
import { useTypeQuiz } from './hooks/useTypeQuiz';
import { UserData } from './types'; // Keep UserData from here
import { Question } from './types/quizTypes'; // Import Question from the correct file
import './styles/index.css';

function TypeQuizApp() {
  const {
    state,
    userData,
    result,
    typeCounts,
    isSubmitting,
    error,
    handleAnswer,
    handleFormSubmit,
    setUserData,
    updateOnboarding,
    nextStep
  } = useTypeQuiz();
  
  const [showRetakeMessage, setShowRetakeMessage] = useState(false);

  // Monitor error state and show error notifications
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  // Custom form submit handler with error handling
  const handleFormSubmitWithFeedback = async (formData: Partial<UserData>) => {
    try {
      await handleFormSubmit(formData);
      // Show success notification when we don't get an error
      if (!error) {
        toast.success("Your results are ready!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      // This is a fallback in case error handling in the hook fails
      toast.error("There was a problem submitting your information. Your results are still available.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Even if saving to server fails, show the results
      if (state.step === 'form') {
        nextStep();
      }
    }
  };

  const handleFormChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };
  
  // Function to handle quiz retake attempt
  const handleRetakeAttempt = () => {
    // Show message to user
    toast.info("You've already completed the quiz. Your results are shown below. Sharing is available at the bottom of the page.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setShowRetakeMessage(true);
    
    // Scroll to results section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-100 py-12 px-4">
      <ToastContainer />
      <div className="quiz-container">
        {state.step !== 'welcome' && (
          <div className="text-center mb-8">
            <img
              src="https://nrojbwxcqochzwhmmkql.supabase.co/storage/v1/object/sign/coaches-profile-images/Anita%20Nowak%20PP.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2FjaGVzLXByb2ZpbGUtaW1hZ2VzL0FuaXRhIE5vd2FrIFBQLnBuZyIsImlhdCI6MTc0MzUxNjA4NiwiZXhwIjoxNzc1MDUyMDg2fQ.3U7L3RGiwgF2FW1-dCukQI6pZbWmJO_6jbcMJSQWvA8"
              alt="Dr. Anita Nowak"
              className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg border-2 border-primary-300 object-cover"
            />
            <h3 className="text-sm font-semibold text-primary-700 font-heading">Dr. Anita Nowak</h3>
          </div>
        )}

        <AnimatePresence mode="wait">
          {state.step === 'welcome' && (
            <WelcomeScreen 
              key="welcome" 
              onStart={nextStep} 
            />
          )}
          
          {state.step === 'form' && (
            <h2 key="form-title" className="text-2xl font-bold text-primary-600 mb-4">Where should we send you your results?</h2>
          )}
          
          {state.step !== 'result' && state.step !== 'questions' && state.step !== 'gender' && state.step !== 'age' && state.step !== 'welcome' && state.step !== 'name' && state.step !== 'form' && (
            <h1 key="quiz-title" className="quiz-title">{quizTitle}</h1>
          )}
          
          {state.step !== 'result' && state.step !== 'questions' && state.step !== 'form' && state.step !== 'gender' && state.step !== 'age' && state.step !== 'welcome' && state.step !== 'name' && (
            <p key="quiz-subtitle" className="quiz-subtitle">
              {quizSubtitle}
            </p>
          )}

          {state.step === 'name' && (
            <NameInput
              key="name-input"
              value={state.onboardingData.firstName}
              onChange={(name) => updateOnboarding({ firstName: name })}
              onNext={nextStep}
            />
          )}

          {state.step === 'gender' && (
            <GenderSelect
              key="gender-select"
              value={state.onboardingData.gender}
              onChange={(gender) => updateOnboarding({ gender })}
              onNext={nextStep}
            />
          )}

          {state.step === 'age' && (
            <AgeSelect
              key="age-select"
              value={state.onboardingData.ageGroup}
              gender={state.onboardingData.gender}
              onChange={(ageGroup) => updateOnboarding({ ageGroup })}
              onNext={nextStep}
            />
          )}

          {state.step === 'questions' && (
            <div key="questions-container">
              <QuizProgress
                currentQuestion={state.currentQuestion + 1}
                totalQuestions={typeQuestions.length}
              />
              <TypeQuizQuestion
                key={`question-${state.currentQuestion}`}
                question={{
                  ...typeQuestions[state.currentQuestion],
                  text: typeQuestions[state.currentQuestion].text.replace(
                    '[Name]', // Correct placeholder
                    state.onboardingData.firstName || 'Friend' // Add fallback
                  )
                } as Question } // Add type assertion
                selectedAnswer={null} // Assuming we don't need to track selected state visually here
                onSelectAnswer={handleAnswer}
                userName={state.onboardingData.firstName} // Pass userName
              />
            </div>
          )}

          {state.step === 'form' && (
            <LeadForm
              key="lead-form"
              userData={userData}
              onSubmit={handleFormSubmitWithFeedback}
              onChange={handleFormChange}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}

          {state.step === 'result' && result && (
            <>
              <TypeQuizResult
                key="quiz-result"
                result={result}
                userData={userData}
                typeCounts={typeCounts}
              />
              <div className="mt-8 text-center">
                <button
                  onClick={handleRetakeAttempt}
                  className="text-primary-600 underline hover:text-primary-800 transition"
                >
                  Retake Quiz
                </button>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      <footer className="mt-12 text-center text-xs text-secondary-500">
        <p>© {new Date().getFullYear()} Dr. Anita Nowak. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TypeQuizApp;
