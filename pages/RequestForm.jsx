import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const RequestForm = () => {
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user/admin
  const [form, setForm] = useState({ blood_group: "", organ: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    try {
      const res = await fetch("http://localhost/blood-organ-donation/backend-php/api/request_register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, actor_id: user.id, actor_type: user.role }),
      });

      const data = await res.json();
      if (data.success) {
        setMsg({ type: "success", text: "✅ Request submitted successfully!" });
        setForm({ blood_group: "", organ: "" });
      } else {
        setMsg({ type: "danger", text: data.error || "Failed to submit request" });
      }
    } catch (err) {
      setMsg({ type: "danger", text: "⚠️ Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-3">📌 Request Blood / Organ</h3>

          {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Organ</Form.Label>
              <Form.Select
                name="organ"
                value={form.organ}
                onChange={handleChange}
                required
              >
                <option value="">Select Organ</option>
                <option>Kidney</option>
                <option>Liver</option>
                <option>Heart</option>
                <option>Eye</option>
                <option>Lungs</option>
                <option>Pancreas</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Submit Request"}
            </Button>
          </Form>
        </Card>
      </motion.div>
    </Container>
  );
};

export default RequestForm;
