import  { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag,  Code, Rocket, Palette, Megaphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categories = [
  { name: 'Design', icon: <Palette className="w-4 h-4" /> },
  { name: 'Development', icon: <Code className="w-4 h-4" /> },
  { name: 'Marketing', icon: <Megaphone className="w-4 h-4" /> },
  { name: 'Research', icon: <Rocket className="w-4 h-4" /> },
];

const trendingTags = ['AI/ML', 'Web3', 'Mobile', 'Cloud', 'DevOps'];

const HeroSection = () => {
  const [count, setCount] = useState(0);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % trendingTags.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count < 2500) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + 50, 2500));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <section className="border-b  mt-24 bg-white">
      <div className="container mx-auto  px-4 py-20 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Collaborative Opportunities
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find projects that match your skills and interests.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <Button key={category.name} variant="outline" className="gap-2 px-4 py-2">
              {category.icon}
              {category.name}
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-3">
            <Tag className="w-4 h-4" />
            Trending Tag
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTagIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary" className="text-base  px-4 py-1.5">
                  {trendingTags[currentTagIndex]}
                </Badge>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      
      </div>
    </section>
  );
};

export default HeroSection;
