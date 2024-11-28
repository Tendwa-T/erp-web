"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const userService = `${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_USER_PORT}`
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    skills: [],
    salary: "",
    status: "",
    certifications: [],
    projects: [],
    token: null,
    resetRequired: null,
  });

  async function userLogin(email, pass) {
    try {
      const res = await fetch(`${userService}/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, pass }),
        headers: { "Content-Type": "application/json" },
      });
      const resBod = await res.json();
      if (resBod.success == true) {
        setUser({
          userID: resBod.data.userID,
          name: resBod.data.name,
          email: resBod.data.email,
          department: resBod.data.department,
          role: resBod.data.role,
          skills: resBod.data.skills,
          salary: resBod.data.salary,
          status: resBod.data.status,
          certifications: resBod.data.certifications,
          projects: resBod.data.projects,
          token: resBod.data.token,
          resetRequired: resBod.data.resetPassword
        });
      }


      return {
        status: resBod.status,
        message: `${resBod.message}`,
        success: resBod.success,
      };
    } catch (err) {
      console.log(err);
      return
    }
  }

  async function userRegister(name, email, password) {
    try {
      const res = await fetch(`${userService}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const resBod = await res.json();

      if (resBod.success == true) {
        const login = await userLogin(email, password);
        return {
          status: login.status,
          message: login.message,
          success: login.success,
        };
      }
      return {
        status: resBod.status,
        message: resBod.message,
        success: resBod.success,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
      };
    }
  }

  async function userResetPassword(password) {
    try {
      const res = await fetch(`${userService}/users/reset-pass`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: user.userID, newPassword: password })
      })
      const resBod = await res.json();


      return {
        status: resBod.status,
        message: resBod.message,
        success: resBod.success,
      }

    } catch (error) {
      console.error(error.message)
      return {
        status: resBod.status,
        message: resBod.message,
        success: resBod.success,
      }

    }
  }

  const value = {
    userLogin,
    userRegister,
    user,
    userResetPassword,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
