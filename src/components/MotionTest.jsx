import { motion } from 'framer-motion';

const MotionTest = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -550 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3.0 }}
      className="bg-green-200 text-center p-4 rounded-xl shadow-md "
    >
      <h1 className="text-xl font-bold">B2B Wholesale Platform</h1>
    </motion.div>
  );
};

export default MotionTest;
