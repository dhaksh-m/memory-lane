import { motion } from "framer-motion";

export default function PageIntro({ title, subtitle }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center pt-32 mb-12 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
        {title}
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}