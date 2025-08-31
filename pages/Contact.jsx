import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { motion } from "framer-motion";


const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost/blood-organ-donation/backend-php/api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        setMsg({ type: "success", text: "✅ Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setMsg({ type: "danger", text: data.error || "Failed to send message" });
      }
    } catch {
      setMsg({ type: "danger", text: "⚠️ Server error" });
    }
  };

  return (
    <div>
 

      {/* Hero Section */}
      <motion.div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #28a745, #20c997)",
          height: "40vh",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <motion.h1
            className="fw-bold display-4"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="lead mt-3"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            We’d love to hear from you 💌
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Form + Info */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Contact Form */}
          <Col md={6}>
            <Card className="p-4 shadow-lg border-0 rounded-4">
              <h3 className="mb-3 text-center text-success">📩 Send us a Message</h3>
              {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="success" className="rounded-pill">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col md={6}>
            <Row className="g-4">
              <Col sm={12}>
                <Card className="p-3 shadow-sm border-0 rounded-4 text-center">
                  <h5>📍 Address</h5>
                  <p>Bhubaneswar, Odisha, India</p>
                </Card>
              </Col>
              <Col sm={12}>
                <Card className="p-3 shadow-sm border-0 rounded-4 text-center">
                  <h5>📞 Phone</h5>
                  <p>+91 9876543210</p>
                </Card>
              </Col>
              <Col sm={12}>
                <Card className="p-3 shadow-sm border-0 rounded-4 text-center">
                  <h5>📧 Email</h5>
                  <p>support@donation.org</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
