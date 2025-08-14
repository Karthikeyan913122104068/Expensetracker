import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(`Welcome back, ${res.data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e3c72, #2a5298)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(12px)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          color: "#fff",
          animation: "fadeIn 0.7s ease-in-out",
        }}
      >
        <h2 style={{ marginBottom: "25px", fontSize: "28px", fontWeight: "600" }}>
          👋 Welcome Back
        </h2>
        <p style={{ marginBottom: "25px", color: "#ddd", fontSize: "14px" }}>
          Please login to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "18px",
              padding: "12px",
              width: "100%",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ffdd57")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.3)")}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "25px",
              padding: "12px",
              width: "100%",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ffdd57")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.3)")}
          />
          <button
            type="submit"
            style={{
              padding: "14px",
              width: "100%",
              background: "linear-gradient(90deg, #ffdd57, #f9a825)",
              color: "#333",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#ddd", fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#ffdd57",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
