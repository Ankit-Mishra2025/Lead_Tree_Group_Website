export const formRegistry = {
  personalLoan: () =>
    import("../LoanForms/forms/components/PersonalLoanForm/LoanForm.tsx"),

  homeLoan: () =>
    import("../LoanForms/forms/components/HomeLoanForm/LoanForm.tsx"),

  homePurchaseLoan: () =>
    import("../LoanForms/forms/components/HomePurchaseLoanForm/LoanForm.tsx"),

  debtReliefLoan: () =>
    import("../LoanForms/forms/components/DebtReliefLoanForm/LoanForm.tsx"),

  vehicleSelection: () =>
    import(
      "../LoanForms/forms/components/VehicleSelectionForm/VehicleSelection.jsx"
    ),

  autoLoan: () =>
    import("../LoanForms/forms/components/AutoLoanForm/LoanForm.tsx"),

  businessLoan: () =>
    import("../LoanForms/forms/components/BusinessLoanForm/LoanForm.tsx"),

  creditCard: () =>
    import(
      "../LoanForms/forms/components/CreditCardForm/CreditCardFormPage.jsx"
    ),
     autoInsurance: () =>
    import(
      "../LoanForms/forms/components/AutoInsuranceForm/AutoInsurance.jsx"
    ),
   


};
