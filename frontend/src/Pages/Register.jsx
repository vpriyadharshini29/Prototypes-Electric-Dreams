import React, { useState } from "react";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register/", {
        username,
        email,
        password,
      });
      setMessage("Registration successful! You can login now.");
    } catch (err) {
      setMessage(
        err.response?.data?.username?.[0] ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-orange-600 text-white py-2 rounded-lg"
        >
          Register
        </button>
        {message && <p className="text-red-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
