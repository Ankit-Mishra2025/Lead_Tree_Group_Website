import { ArrowLeft, Check } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const SubmitNotificationPage = () => {

  return (
    <div className="w-full  flex items-center justify-center p-3 mt-8">

      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-2xl py-10 px-6 md:px-10 w-full max-w-lg">
 
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
        <Check className="h-12 w-12 md:h-14 md:w-14 bg-green-500 text-white rounded-full p-2 shadow-md" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Thank you!
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-center text-[15px] md:text-[17px] font-semibold">
            We’ve received your application
          </p>

          {/* Message */}
          <p className="text-gray-600 text-center text-[14px] md:text-[16px] leading-relaxed">
            Our team is reviewing your information with the best offers for you🎉.
            <br />
            
            We’ll get back to you soon!
          </p>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gray-200 my-2"></div>

          {/* CTA Button */}
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md shadow-sm font-medium hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default SubmitNotificationPage;
