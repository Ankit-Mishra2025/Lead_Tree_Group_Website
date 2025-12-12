// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";

// import PersonalLoanBanner from "./LoanPagesBanners/PersonalLoanBanner";
import Footer from "./Components/Footer";

// import AutoSellValuation from "./LoanForms/forms/components/AutoSellForm/AutoSellValuation";
// import BikeValuationLoan from "./LoanForms/forms/components/BikeSellLoanForm/BikeValuationLoan";
import HomePageWorkBanner from "./LoanPagesBanners/HomePageWorkBanner";
import HomePageChhoseReason from "./LoanPagesBanners/HomePageChhoseReason";
import HomePageTrust from "./LoanPagesBanners/HomePageTrust";
import FinanceSlider from "./SliderData/FinanceSlider";
import LoanTypesRouting from "./routingPages/LoanTypesRouting";
import AutoSellValuation from "./LoanForms/forms/components/AutoSellForm/AutoSellValuation";
import BikeValuationLoan from "./LoanForms/forms/components/BikeSellLoanForm/BikeValuationLoan";
import CreditCardNavbar from "./Components/CreditCardNavbar";
import AutoBuyForm from "./LoanForms/forms/components/AutoBuyForm/AutoBuyForm";
import FilterBuyedCar from "./LoanForms/forms/components/AutoBuyForm/FilterBuyedCar";
import SubmitNotificationPage from "./Components/SubmitNotificationPage";
// import FinanceBlogPage from "./LoanPagesBanners/FinanceBlogPage";

const MainLayout = () => (
  <div className="w-full min-h-screen bg-gray-100">
    <Nav />
    <Home />
    <HomePageTrust />
    <HomePageChhoseReason />

    <HomePageWorkBanner />
    <FinanceSlider />
    {/* <FinanceBlogPage/> */}
    <Footer />
    <SubmitNotificationPage/>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },

  {
    path: "/forms/loanType",
    element: <LoanTypesRouting />,
  },

  {
    path: "/Car-Valuation",
    element: <AutoSellValuation />,
  },

  {
    path: "/Bike-Valuation",
    element: <BikeValuationLoan />,
  },

  {
    path:"/Buycar-browse/FilteredCard",
    element:<FilterBuyedCar/>
  },

   {
    path:"/successPage",
    element:<SubmitNotificationPage/>
  }


]);

// 🧩 Common layout for pages that should show Nav + Home

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>

    // <Routes>
    //   {/* 👇 Normal routes (Nav + Home visible) */}

    //   {/* 👇 Only the form page (NO Nav, NO Home, only form) */}
    //   <Route path="/forms/loanType" element={<LoanTypesRouting />} />

    //   <Route path="/Car-Valuation" element={<AutoSellValuation/>}/>
    //     <Route path="/Bike-Valuation" element={<BikeValuationLoan/>}/>
    //   {/* 👇 Home route (with Nav + Home) */}
    //   <Route path="/" element={<MainLayout />} />
    // </Routes>
  );
};

export default App;
