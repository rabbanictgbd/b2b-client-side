import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Happy Customers", value: "1,200+" },
  { label: "Products Sold", value: "8,500+" },
  { label: "Expert Staff", value: "25" },
  { label: "Years of Service", value: "5+" },
];

const CompanyOverview = () => {
  return (
    <div className=" p-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-primary mb-6"
        >
          👥 Our Company at a Glance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-10"
        >
          We are proud of our achievements and the people behind them.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
