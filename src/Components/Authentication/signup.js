import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.08)",
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
        <h2 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "600" }}>
          ✨ Create Account
        </h2>
        <p style={{ marginBottom: "25px", color: "#ddd", fontSize: "14px" }}>
          Fill in your details to get started
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
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
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.3)")
            }
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
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
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.3)")
            }
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
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.3)")
            }
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              width: "100%",
              background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
              color: "#fff",
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
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#ddd", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#ffdd57",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
