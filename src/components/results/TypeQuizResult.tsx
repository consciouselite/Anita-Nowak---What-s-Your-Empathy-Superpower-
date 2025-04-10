import React from 'react';
import { UserData } from '../../types';
import { PersonalityType, EmpathyType, TypeCount } from '../../types/quizTypes';
import { Share2, MessageCircle, Award } from 'lucide-react';

interface TypeQuizResultProps {
  result: PersonalityType;
  userData: UserData;
  typeCounts: Record<EmpathyType, number>;
}

export const TypeQuizResult: React.FC<TypeQuizResultProps> = ({
  result,
  userData,
  typeCounts
}) => {
  // Calculate percentages for visualization
  const totalAnswers = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
  const typePercentages: TypeCount[] = Object.entries(typeCounts).map(([type, count]) => ({
    type: type as EmpathyType,
    percentage: Math.round((count / totalAnswers) * 100)
  }));

  // Get emoji based on empathy type
  const getTypeEmoji = (type: EmpathyType): string => {
    if (type.includes('EmpathicNavigator')) return '🎯';
    if (type.includes('CompassionCatalyst')) return '💪';
    if (type.includes('EmotiveExplorer')) return '🎨';
    if (type.includes('EmotiveGuardian')) return '🛡️';
    return '🤗';
  };

  // Format type names for display
  const formatTypeName = (type: string): string => {
    if (type === 'EmpathicNavigator') return 'Empathic Navigator';
    if (type === 'CompassionCatalyst') return 'Compassion Catalyst';
    if (type === 'EmotiveExplorer') return 'Emotive Explorer';
    if (type === 'EmotiveGuardian') return 'Emotive Guardian';
    return type;
  };

  // Create personalized sharing messages
  const emoji: string = getTypeEmoji(result.type);
  const shareMessage = `${emoji} I just took Dr. Anita Nowak's Empathy Superpower quiz and discovered I'm "${result.type}"! Curious about your empathy style? Take this 3-minute quiz: `;
  const shareUrl = window.location.href;
  
  // Share functions
  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + shareUrl)}`, '_blank');
  };
  
  const shareOnMessenger = () => {
    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=181374745748345&redirect_uri=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  // Use name from userData, with fallback to prevent undefined
  const userName = userData?.firstName || 'Friend';

  return (
    <div className="quiz-result">      
      <div className="card-highlight mb-8 rounded-xl">
        <div className="flex items-center justify-center mb-4">
          <Award size={32} className="text-accent-500 mr-2" />
          <h1 className="result-title m-0">
            {userName}, you are a <span className="highlight">{formatTypeName(result.type)}</span>
          </h1>
        </div>
        
        <div className="result-description">
          <p>{result.description}</p>
        </div>
      </div>
      
      <div className="type-distribution my-8">
        <h3 className="text-lg font-semibold mb-4 text-primary-700 font-heading">Your Empathy Style Breakdown:</h3>
        <div className="type-bars">
          {typePercentages.map(({ type, percentage }) => (
            <div key={type} className="type-bar-container mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="type-label font-medium">{formatTypeName(type)}</span>
                <span className="font-medium text-primary-600">{percentage}%</span>
              </div>
              <div className="h-4 w-full bg-secondary-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="type-details grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="card bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-700 mb-4 font-heading">Your Natural Strengths:</h3>
          <ul className="list-disc pl-5 space-y-3 text-primary-800">
            {result.strengths.map((strength, index) => (
              <li key={index} className="font-body">{strength}</li>
            ))}
          </ul>
        </div>

        <div className="card bg-accent-50 border-accent-200">
          <h3 className="text-lg font-semibold text-secondary-800 mb-4 font-heading">Growth Opportunities:</h3>
          <ul className="list-disc pl-5 space-y-3 text-secondary-700">
            {result.challenges.map((challenge, index) => (
              <li key={index} className="font-body">{challenge}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card bg-secondary-50 border-secondary-200 my-8">
        <h3 className="text-lg font-semibold mb-4 font-heading text-primary-700">Personalized Strategies:</h3>
        <ul className="list-disc pl-5 space-y-3">
          {result.tips.map((tip, index) => (
            <li key={index} className="font-body">{tip}</li>
          ))}
        </ul>
      </div>

      <div className="card-highlight mt-10 rounded-xl bg-gradient-card">
        <h3 className="text-xl font-bold mb-3 font-heading text-primary-700">😊 Know someone who'd love to discover their empathy superpower? 😊</h3>
        <p className="mb-6 font-body">
          Who in your life would benefit from understanding their empathy style? Share this quiz with them!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={shareOnWhatsApp}
            className="share-button flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition shadow-md"
          >
            <Share2 size={18} />
            <span>Share on WhatsApp</span>
          </button>
          
          <button 
            onClick={shareOnMessenger}
            className="share-button flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition shadow-md"
          >
            <MessageCircle size={18} />
            <span>Share on Messenger</span>
          </button>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 italic font-body">
          "Sharing empathy is one of the most powerful ways to create positive change in the world." - Dr. Anita Nowak
        </p>
      </div>
    </div>
  );
};
