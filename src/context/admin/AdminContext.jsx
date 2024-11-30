"use client"

import { createContext, useState } from "react"
import { useUser } from "../user/useUser";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
    const hrService = `${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_HR_PORT}`
    const [employees, setEmployees] = useState([])

    const { user } = useUser();
    let admin;
    if (user.role === 'admin') {
        admin = {
            name: user.name,
            department: user.department,
            role: user.role,
            token: user.token,
        }
    }

    async function createEmployee(data) {
        const empData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            department: data.department,
            role: data.role,
            skills: data.skills,
            salary: data.salary
        }
        const res = await fetch(`${hrService}/employees/`, {
            method: 'POST',
            body: JSON.stringify(empData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const resBod = await res.json()
        await fetchEmployees()
        return resBod;

    }
    async function fetchEmployees() {
        const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_HR_PORT}/employees`)
        const empData = await apiRes.json()
        setEmployees(empData.data)
    }

    async function deleteEmployee(id) {
        const res = await fetch(`${hrService}/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const resBod = await res.json()
        return resBod;
    }

    const value = {
        admin,
        createEmployee,
        fetchEmployees,
        deleteEmployee,
        employees
    }

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}