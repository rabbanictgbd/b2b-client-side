import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full"
            >
                <motion.div
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-7xl mb-4"
                >
                    😕
                </motion.div>

                <h1 className="text-5xl font-bold text-red-600 mb-3">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Oops! The page you're looking for doesn’t exist or has been moved.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-xl transition duration-200"
                    >
                        ⬅️ Back to Home
                    </Link>
                </motion.div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-sm text-gray-400"
            >
                If you believe this is a mistake, please{' '}
                <Link to="/contact" className="underline text-blue-500 hover:text-blue-700">contact support</Link>.
            </motion.p>
        </div>
    );
};

export default Error404;
