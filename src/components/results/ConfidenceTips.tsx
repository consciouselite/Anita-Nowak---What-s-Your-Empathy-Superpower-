import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface ConfidenceTipsProps {
  tips: string[];
}

export const ConfidenceTips: React.FC<ConfidenceTipsProps> = ({ tips }) => {
  return (
    <motion.div
      className="mt-8 bg-primary-100 p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Mind-Body Practice Recommendations
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2 text-secondary-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-primary-500 font-bold">•</span>
            {tip}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};