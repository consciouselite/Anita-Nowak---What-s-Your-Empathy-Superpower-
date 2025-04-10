import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NameInputProps {
  value: string;
  onChange: (name: string) => void;
  onNext: () => void;
}

export const NameInput: React.FC<NameInputProps> = ({ value, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="mb-10">
        <motion.h2 
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-hero mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let's Start Your Journey
        </motion.h2>
        <motion.p 
          className="text-secondary-700 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          What should we call you?
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="relative mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-gradient-card absolute -bottom-2 left-0 rounded-full"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Your first name"
            className="form-input text-center text-xl w-full bg-transparent border-none border-b-2 border-secondary-200 focus:ring-0 focus:border-primary-500 transition-all"
            autoFocus
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="submit"
            disabled={!value.trim()}
            className="primary-button flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-hero transition-all duration-300 py-3 text-lg"
          >
            <span>Continue</span>
            <ArrowRight size={18} className="inline-block transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </form>
      
      <motion.div 
        className="mt-8 text-sm text-secondary-500 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
      >
        Discover your mind-body connection in just a few minutes
      </motion.div>
    </motion.div>
  );
};