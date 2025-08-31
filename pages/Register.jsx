import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/blood-organ-donation/backend-php/api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
});
      const result = await res.json();
      if (result.success) {
        setMessage("✅ Registration successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage("❌ " + result.error);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Card className="shadow-lg p-4" style={{ width: "350px" }}>
          <h3 className="text-center mb-4">📝 Register</h3>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">Register</Button>
          </Form>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Register;
