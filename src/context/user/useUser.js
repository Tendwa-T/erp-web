import { UserContext } from "./UserContext";
import { useContext } from "react";

export function useUser() {
  return useContext(UserContext);
}
