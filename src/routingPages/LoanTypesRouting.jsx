"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import {formRegistry} from '../FormsRegistery/formRegistry.js'
import { Loader2 } from "lucide-react";
import CreditCardNavbar from "../Components/CreditCardNavbar.jsx";
import CreditCardFooter from "../Components/CreditCardFooter.jsx";

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 size={"50px"} className="text-green-500 animate-spin"/>
  </div>
);

const NotFound = ({ loanType }) => (
  <div className="text-center p-10 text-red-600">
    <h3 className="text-xl font-bold">Form not available for: {loanType}</h3>
    <p>Please check the loan type.</p>
  </div>
);

const LoanTypesRouting = () => {
  const [FormComponent, setFormComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const loanType = searchParams.get("loanType");

  useEffect(() => {
    const loadForm = async () => {
      if (!loanType) {
        setFormComponent(null);
        setLoading(false);
        return;
      }

      const loader = formRegistry[loanType];

      if (!loader) {
        setFormComponent(null);
        setLoading(false);
        return;
      }

      try {
        const mod = await loader();
        setFormComponent(() => mod.default);
      } catch (err) {
        console.error("❌ Failed loading form:", err);
        setFormComponent(null);
      }

      setLoading(false);
    };

    setLoading(true);
    loadForm();
  }, [loanType]);

  return (
    <div className="min-h-screen bg-white p-8">

 {loanType === "creditCard" && <CreditCardNavbar />}


      {loading ? (
        <Loader />
      ) : FormComponent ? (
        <Suspense fallback={<Loader />}>
          <FormComponent />
        </Suspense>
      ) : (
        <NotFound loanType={loanType} />
      )}
       {loanType === "creditCard" && <CreditCardFooter/>}
    </div>
  );
};

export default LoanTypesRouting;
