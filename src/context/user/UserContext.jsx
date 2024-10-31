"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    token: null,
  });

  async function userLogin(email, pass) {
    try {
      const res = await fetch("http://localhost:8001/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, pass }),
        headers: { "Content-Type": "application/json" },
      });
      const resBod = await res.json();
      if (resBod.success == true) {
        setUser({
          name: resBod.data.name,
          email: resBod.data.email,
          role: resBod.data.role,
          token: resBod.data.token,
        });
      }
      console.log(user);

      return {
        status: resBod.status,
        message: `${resBod.message}: ${resBod.data.name}`,
        success: resBod.success,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async function userRegister(name, email, password) {
    try {
      const res = await fetch("http://localhost:8001/api/users/register", {
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

  const value = {
    userLogin,
    userRegister,
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
