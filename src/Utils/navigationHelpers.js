// src/utils/navigationHelpers.js
export const navigateToLoanForm = (navigate, loanKey) => {
  // loanKey e.g. "personalLoan", "homeLoan", "businessLoan"
  if (!loanKey) {
    console.error("❌ Missing loanKey for navigation");
    return;
  }

  navigate(`/forms/loanType?loanType=${loanKey}`);
};
