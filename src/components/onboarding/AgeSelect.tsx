import { motion } from 'framer-motion';

interface AgeSelectProps {
  value: string | null;
  gender?: 'male' | 'female' | null;
  onChange: (age: '18-25' | '26-35' | '36-45' | '46+') => void;
  onNext: () => void;
}

const maleAgeGroups = [
  {
    range: '18-25',
    icon: '😎',
    image: 'https://images.pexels.com/photos/6679377/pexels-photo-6679377.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '18-25 years',
    alt: 'Man in white crew neck shirt'
  },
  {
    range: '26-35',
    icon: '😉',
    image: 'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '26-35 years',
    alt: 'Man wearing black crew neck shirt and straight cut jeans'
  },
  {
    range: '36-45',
    icon: '😊',
    image: 'https://images.pexels.com/photos/3525908/pexels-photo-3525908.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '36-45 years',
    alt: 'Man wearing blue hooded coat'
  },
  {
    range: '46+',
    icon: '🙂',
    image: 'https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '46+ years',
    alt: 'Man wearing eyeglasses'
  }
] as const;

const femaleAgeGroups = [
  {
    range: '18-25',
    icon: '😊',
    image: 'https://images.pexels.com/photos/1447771/pexels-photo-1447771.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '18-25 years',
    alt: 'Woman in brown halter shirt holding her hair'
  },
  {
    range: '26-35',
    icon: '😉',
    image: 'https://images.pexels.com/photos/325865/pexels-photo-325865.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '26-35 years',
    alt: 'Portrait of young woman'
  },
  {
    range: '36-45',
    icon: '🙂',
    image: 'https://images.pexels.com/photos/7752788/pexels-photo-7752788.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '36-45 years',
    alt: 'Lady sitting at table with crossed arms'
  },
  {
    range: '46+',
    icon: '😌',
    image: 'https://images.pexels.com/photos/8417210/pexels-photo-8417210.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '46+ years',
    alt: 'A woman smiling while touching face'
  }
] as const;

export const AgeSelect: React.FC<AgeSelectProps> = ({ value, gender = null, onChange, onNext }) => {
  const ageGroups = gender === 'male' ? maleAgeGroups : femaleAgeGroups;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6">Which age group do you belong to?</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {ageGroups.map((group) => (
          <button
            key={group.range}
            onClick={() => {
              onChange(group.range);
              onNext();
            }}
            className={`age-option ${value === group.range ? 'age-option-selected' : ''}`}
          >
            <div className="aspect-square w-full relative rounded-lg overflow-hidden mb-2 sm:mb-3">
              <img
                src={group.image}
                alt={group.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <span className="text-sm sm:text-lg text-secondary-700">
              {group.icon} {group.title}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
