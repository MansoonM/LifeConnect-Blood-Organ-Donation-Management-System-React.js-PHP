import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [role, setRole] = useState("user"); // default user
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    // ✅ Correct backend URLs
    const url =
      mode === "login"
        ? "http://localhost/blood-organ-donation/backend-php/api/login.php"
        : "http://localhost/blood-organ-donation/backend-php/api/register.php";

    // ✅ Build payload
    const payload =
      mode === "login"
        ? { email: form.email, password: form.password, role }
        : { name: form.name, email: form.email, password: form.password, role };

    // Debug log
    console.log("Calling API:", url);
    console.log("Payload:", payload);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        if (mode === "register") {
          setMsg({ type: "success", text: "✅ Registered! Please login." });
          setMode("login");
        } else {
          setMsg({ type: "success", text: "✅ Login successful!" });
          localStorage.setItem("user", JSON.stringify(data.user));
          if (onLogin) onLogin(data.user);
          navigate("/home");
        }
      } else {
        setMsg({ type: "danger", text: data.error || "Failed" });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMsg({ type: "danger", text: "⚠️ Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-100"
      >
        <Card
          className="shadow-lg p-4 rounded-4 border-0 mx-auto"
          style={{ maxWidth: "420px" }}
        >
          <h2 className="text-center text-primary mb-3">
            {mode === "login" ? "🔐 Login" : "📝 Register"}
          </h2>

          {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

          {/* ✅ Role toggle */}
          <div className="text-center mb-3">
            <ToggleButtonGroup
              type="radio"
              name="role"
              value={role}
              onChange={(val) => setRole(val)}
            >
              <ToggleButton id="role-user" value="user" variant="outline-primary">
                User
              </ToggleButton>
              <ToggleButton id="role-admin" value="admin" variant="outline-dark">
                Admin
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <Form onSubmit={handleSubmit}>
            {mode === "register" && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                className="rounded-pill"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : mode === "login" ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            {mode === "login" ? (
              <span>
                Don’t have an account?{" "}
                <Button variant="link" onClick={() => setMode("register")}>
                  Register
                </Button>
              </span>
            ) : (
              <span>
                Already registered?{" "}
                <Button variant="link" onClick={() => setMode("login")}>
                  Login
                </Button>
              </span>
            )}
          </div>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Auth;
