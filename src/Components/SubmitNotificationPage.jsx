import { ArrowLeft, Check } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SubmitNotificationPage = () => {
const navigate=useNavigate()



  return (
    <div className="w-full flex items-center justify-center flex-col min-h-screen p-5">

 <motion.div
        initial={{ opacity: 0, y: -80 }}     // page upar se aayega
        animate={{ opacity: 1, y: 0 }}       // center me settle
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
<div className="flex flex-col bg-white shadow-md border border-gray-300 gap-3 py-8 px-3 md:p-5 items-center justify-center rounded-md  cursor-pointer">
        <span className="flex w-full items-center justify-center gap-2 font-semibold md:text-[22px] text-[17px] ">
          <Check
            className="text-white font-extrabold md:h-10 md:w-10 h-6 w-6 rounded-full bg-green-400 "
            size={25}
          />{" "}
          Thank you!
        </span>
        <h2 className="flex w-full items-center justify-center flex-col font-semibold text-[15px] md:text-[17px]">
          {" "}
          We’ve received your application
        </h2>
        <span className="text-gray-800 text-[14px] md:text-[16px]">
          Our team is reviewing your information with the best offers for you 🎉
        </span>
        <span>We’ll be in touch soon.😊</span>
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="text-blue-600 flex items-center justify-center cursor-pointer  ">
            <ArrowLeft /> Back to Home
          </Link>
        </div>
      </div>

</motion.div>



      
    </div>
  );
};

export default SubmitNotificationPage;
