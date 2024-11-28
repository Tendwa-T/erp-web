import { AdminContext } from "./AdminContext";
import { useContext } from "react";

export function useAdmin() {
  return useContext(AdminContext);
}
