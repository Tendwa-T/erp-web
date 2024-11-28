import { ProjectContext } from "./ProjectContext";
import { useContext } from "react";

export function useProject() {
  return useContext(ProjectContext);
}
