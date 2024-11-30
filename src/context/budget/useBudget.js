import { BudgetContext } from "./BudgetContext";
import { useContext } from "react";

export function useBudget() {
  return useContext(BudgetContext);
}
