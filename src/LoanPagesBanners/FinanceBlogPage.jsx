// import React, { useEffect, useState } from "react";

// const FinanceBlogPage = () => {
//   const [financeData, setFinanceData] = useState([]);

//   const fetchFinanceData = async () => {
//     try {
//       const data = await fetch("/FinanceBlogData/FinanceBlogInfoData.json");
//       const res = await data.json();
//       setFinanceData(res);
//     } catch (error) {
//       console.log("Error in fetching", error);
//     }
//   };

//   useEffect(() => {
//     fetchFinanceData();
//   }, []);

//   return (
//     <div className="flex w-full items-center flex-col p-5 min-h-screen">
//       <h1 className="text-4xl ">
//         Explore Finance{" "}
//         <span className="text-4xl text-green-600 font-semibold">Blogs</span>
//       </h1>

//      <div className="flex w-full items-center gap-10 bg-amber-400 flex-wrap flex-row ">
//       {
//         financeData.map((blog)=>{
// return(
//   <div key={blog.id} className="flex flex-col w-full">

// <img src={blog.image} className="h-[300px] w-[300px]"/>
// <p>{blog.title}</p>

//   </div>
// )
//         })
//       }
//      </div>
//     </div>
//   );
// };

// export default FinanceBlogPage;
