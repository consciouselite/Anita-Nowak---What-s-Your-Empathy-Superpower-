import { motion } from 'framer-motion';
import { Share2, Facebook, Linkedin, MessageCircle, X } from 'lucide-react';
import { PersonalityType, UserData } from '../../types/quiz';
import { ConfidenceTips } from './ConfidenceTips';
import { useState, useEffect } from 'react';

interface QuizResultProps {
  result: PersonalityType;
  userData: UserData;
  score: number;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, userData, score }) => {
  const maxScore = 60; // Based on 12 questions with max score of 5 each
  const confidencePercentage = (score / maxScore) * 100;
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [shareImageUrl, setShareImageUrl] = useState<string>('');
  
  // Get emoji based on score
  const getScoreEmoji = () => {
    if (confidencePercentage >= 80) return '🤩'; // Star-struck for high scores
    if (confidencePercentage >= 60) return '😊'; // Smiling for good scores
    if (confidencePercentage >= 40) return '🙂'; // Slightly smiling for medium scores
    if (confidencePercentage >= 20) return '😐'; // Neutral for low scores
    return '🤔'; // Thinking for very low scores
  };
  
  // Create a default share image if there's no result image
  useEffect(() => {
    // Use result image if available, otherwise use a default image
    const imageUrl = result.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80';
    setShareImageUrl(imageUrl);
    
    // Add Open Graph meta tags dynamically for better social sharing
    updateMetaTags();
    
    return () => {
      // Clean up meta tags when component unmounts
      removeMetaTags();
    };
  }, [result, userData, confidencePercentage]);
  
  // Update meta tags for better social media sharing
  const updateMetaTags = () => {
    // Remove any existing OG tags first
    removeMetaTags();
    
    // Create and add meta tags
    const metaTags = [
      { property: 'og:title', content: `${userData.firstName}'s Mind-Body Connection Score: ${confidencePercentage.toFixed(0)}%` },
      { property: 'og:description', content: `${userData.firstName} is a ${result.type}. Take the quiz to discover your mind-body connection profile!` },
      { property: 'og:image', content: shareImageUrl },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ];
    
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => {
        meta.setAttribute(key, value);
      });
      document.head.appendChild(meta);
    });
  };
  
  // Remove meta tags
  const removeMetaTags = () => {
    const ogTags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    ogTags.forEach(tag => tag.remove());
  };
  
  // Share URL with UTM parameters for tracking
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}?utm_source=share&utm_medium=social&utm_campaign=mindbody_quiz&utm_content=${userData.firstName}`;
  };
  
  // Create share text with the user's name and result
  const getShareText = () => {
    return `${getScoreEmoji()} I just discovered my Mind-Body Connection Score is ${confidencePercentage.toFixed(0)}%! My profile: ${result.type}. Wonder what yours is? Take this quick assessment! #MindBodyConnection`;
  };
  
  // Generate a shareable card image URL (in a real app, this would be a server endpoint)
  const getCardImageUrl = () => {
    // This simulates a shareable card URL - in a real app this would be a server endpoint
    // that generates a proper social card image with the user's results
    return `${shareImageUrl}?name=${encodeURIComponent(userData.firstName)}&score=${confidencePercentage.toFixed(0)}&type=${encodeURIComponent(result.type)}`;
  };
  
  // Sharing functions
  const shareToFacebook = () => {
    // Facebook prefers to use their own scraper to get the image from OG tags
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
    showShareMessage();
  };
  
  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
    showShareMessage();
  };
  
  const shareToLinkedin = () => {
    // LinkedIn prefers just the URL and will scrape the OG tags
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
    showShareMessage();
  };
  
  const shareToWhatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${getShareText()} ${getShareUrl()}`)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showShareMessage();
  };
  
  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userData.firstName}'s Mind-Body Connection Results`,
          text: getShareText(),
          url: getShareUrl(),
        });
        showShareMessage();
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${getShareText()} ${getShareUrl()}`);
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(null), 3000);
    }
  };
  
  const showShareMessage = () => {
    setShareMessage('Thanks for sharing! 🎉');
    setTimeout(() => setShareMessage(null), 3000);
  };
  
  return (
    <motion.div
      className="result-card w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <img
        src={result.image}
        alt={result.type}
        className="result-image"
      />
      <h2 className="text-xl sm:text-2xl font-bold text-primary-600 mb-3 sm:mb-4">
        {userData.firstName}, your Mind-Body Connection Score: {confidencePercentage.toFixed(0)}% {getScoreEmoji()}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold text-primary-500 mb-2 sm:mb-3">
        Profile: {result.type}
      </h3>
      <p className="text-sm sm:text-base text-secondary-700 mb-4 sm:mb-6">{result.description}</p>
      
      <ConfidenceTips tips={result.tips} />
      
      <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-card rounded-lg shadow-sm">
        <h3 className="font-bold text-lg sm:text-xl text-primary-600">Proud of your results? 😎</h3>
        <p className="text-sm sm:text-base text-secondary-700 mb-3 sm:mb-4">
          Let your friends discover if they have the same mind-body connection as you.
        </p>
        
        {shareMessage && (
          <motion.div 
            className="bg-success-light text-success-dark p-2 sm:p-3 rounded-lg text-center mb-3 sm:mb-4 text-sm sm:text-base"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {shareMessage}
          </motion.div>
        )}
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button 
            onClick={shareToFacebook}
            aria-label="Share to Facebook"
            className="share-button text-[#1877F2] hover:bg-[#E7F3FF] transform hover:scale-110 transition-all"
          >
            <Facebook size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={shareToX}
            aria-label="Share to X"
            className="share-button text-black hover:bg-gray-100 transform hover:scale-110 transition-all"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={shareToLinkedin}
            aria-label="Share to LinkedIn"
            className="share-button text-[#0A66C2] hover:bg-[#E8F3FC] transform hover:scale-110 transition-all"
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={shareToWhatsapp}
            aria-label="Share via WhatsApp"
            className="share-button text-[#25D366] hover:bg-[#E6FFEC] transform hover:scale-110 transition-all"
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={shareGeneral}
            aria-label="Share via other methods"
            className="share-button text-secondary-600 hover:bg-secondary-200 transform hover:scale-110 transition-all"
          >
            <Share2 size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};