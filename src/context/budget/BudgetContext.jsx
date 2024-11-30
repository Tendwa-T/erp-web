"use client"

import { createContext, useState } from "react"
import { useUser } from "../user/useUser";

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {
    const budgetService = `${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_FINANCE_PORT}`
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState({})

    const { user } = useUser();
    let budgetAdmin;
    if (user.role === 'admin') {
        budgetAdmin = {
            name: user.name,
            department: user.department,
            role: user.role,
            token: user.token,
        }
    }
    // ** Create Functions **
    async function createBudget(data) {
        const budgetData = {
            name: data.name,
            description: data.description,
            department: data.department,
            category: data.category,
            allocatedAmount: data.allocatedAmount,
            spentAmount: data.spentAmount,
            startDate: data.startDate,
            endDate: data.endDate,

        }
        const res = await fetch(`${budgetService}/budgets/`, {
            method: 'POST',
            body: JSON.stringify(budgetData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const resBod = await res.json()
        if (resBod.success === false) {
            console.log(resBod)
            setError(resBod)
        }
        await fetchBudgets()
        return {
            success: resBod.success,
            message: resBod.message,
        }
    }

    async function createExpense(data) {
        const expenseData = {
            name: data.name,
            description: data.description,
            department: data.department,
            category: data.category,
            amount: data.amount,
            date: data.date,
            status: data.status,
            projectID: data.projectID,
            createdBy: data.createdBy
        }
        const res = await fetch(`${budgetService}/expenses/`, {
            method: 'POST',
            body: JSON.stringify(expenseData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const resBod = await res.json()
        if (resBod.success === false) {
            console.log(resBod)
            setError(resBod)
        }
        await fetchBudgets()
        return {
            success: resBod.success,
            message: resBod.message
        }

    }

    // ** Fetch Functions ** 
    async function fetchBudgets() {
        const apiRes = await fetch(`${budgetService}/budgets`)
        const budgetData = await apiRes.json()
        if (budgetData.success === false) {
            setError(budgetData)
        }
        setBudgets(budgetData.data)
    }

    async function fetchExpenses() {
        const apiRes = await fetch(`${budgetService}/expenses`)
        const expenseData = await apiRes.json()
        if (expenseData.success === false) {
            setError(expenseData)
        }
        setExpenses(expenseData.data)
    }


    // ** Update Functions **
    async function updateBudget(data) {
        const projectData = {
            amount: data.amount
        }
        const res = await fetch(`${budgetService}/budgets/:${data._id}/spend`, {
            method: 'PUT',
            body: JSON.stringify(projectData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const resBod = await res.json()
        setBudgets(resBod.data)
        return resBod;
    }

    async function updateExpense(data) {
        const expenseData = {
            amount: data.amount
        }
        const res = await fetch(`${budgetService}/expenses/:${data._id}/spend`, {
            method: 'PUT',
            body: JSON.stringify(expenseData),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const resBod = await res.json()
        setExpenses(resBod.data)
        return resBod;
    }


    // ** Delete Functions **
    async function deleteBudget(id) {
        const res = await fetch(`${budgetService}/budgets/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const resBod = await res.json()
        await fetchBudgets()
        return resBod;
    }

    async function deleteExpenses(data) {
        const res = await fetch(`${budgetService}/expenses/${data._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const resBod = await res.json()
        await fetchExpenses()
        return resBod;
    }

    const value = {
        budgets,
        expenses,
        createBudget,
        createExpense,
        fetchBudgets,
        fetchExpenses,
        updateBudget,
        updateExpense,
        deleteBudget,
        deleteExpenses,
    }

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}