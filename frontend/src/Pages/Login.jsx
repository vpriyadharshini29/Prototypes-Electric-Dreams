import React, { useState } from "react";
import api from "../api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // ✅ Login states
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Register states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login/", { identifier, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setMessage("Login successful!");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.[0] ||
          "Invalid credentials"
      );
    }
  };

  // ✅ Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await api.post("/register/", {
        username,
        email,
        password: regPassword,
      });
      setMessage("Registration successful! Please log in.");
      setIsLogin(true);
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-6">
        {isLogin ? "Login" : "Register"}
      </h1>

      {/* ✅ Login Form */}
      {isLogin ? (
        <form
          onSubmit={handleLogin}
          className="w-[400px] border rounded-xl shadow-md p-6 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Username or Email"
            className="border rounded-lg p-2"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded-lg"
          >
            Login
          </button>
          <p className="text-sm mt-2">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Register here
            </span>
          </p>
        </form>
      ) : (
        /* ✅ Register Form */
        <form
          onSubmit={handleRegister}
          className="w-[400px] border rounded-xl shadow-md p-6 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-2"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-lg p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-lg"
          >
            Register
          </button>
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Login here
            </span>
          </p>
        </form>
      )}

      {/* ✅ Common error/success messages */}
     
    </div>
  );
}
