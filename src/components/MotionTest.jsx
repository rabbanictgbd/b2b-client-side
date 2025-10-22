import { motion } from 'framer-motion';

const MotionTest = () => {
  return (
    <div className='mx-20 my-5 '>
    <motion.div
      initial={{ opacity: 0, y: -550 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3.0 }}
      className="bg-base-100 text-center p-4 rounded-xl shadow-md "
    >
      <h1 className="text-xl font-bold">B2B Wholesale Platform</h1>
    </motion.div>
    </div>
  );
};

export default MotionTest;
