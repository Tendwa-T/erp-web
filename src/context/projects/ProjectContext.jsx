"use client";

import { createContext, useState } from "react";
import { useUser } from "../user/useUser";

export const ProjectContext = createContext()

export function ProjectProvider({ children }) {
    const projectService = `${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_PROJECT_PORT}`
    const [projects, setProjects] = useState([])
    const { user } = useUser()

    async function createProject(data) {
        const projectData = {
            name: data.name,
            description: data.description,
            budget: data.budget,
            milestones: data.milestones,
            expenses: data.expenses,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status,
            employees: data.employees
        }
        const res = await fetch(`${projectService}/projects/`, {
            method: 'POST',
            body: JSON.stringify(projectData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const resBod = await res.json()
        return resBod
    }
    async function fetchProjects() {
        const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_PROJECT_PORT}/projects`)
        const projData = await apiRes.json()
        setProjects(projData.data)
    }

    async function deleteProject(id) {
        const res = await fetch(`${projectService}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${user.token}`,
            },
        })
        const resBod = await res.json();
        return resBod;
    }
    const value = {
        projects,
        createProject,
        fetchProjects,
        deleteProject
    }

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}