import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const DonorForm = () => {
  const [form, setForm] = useState({
    blood_group: "",
    organ: "",
    availability: "yes",
  });
  const [msg, setMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost/blood-organ-donation/backend-php/api/donor_register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actor_id: user.id,
            actor_type: user.role,
            blood_group: form.blood_group,
            organ: form.organ,
            availability: form.availability,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMsg("✅ You are now a registered donor!");
        setForm({ blood_group: "", organ: "", availability: "yes" });
      } else {
        setMsg("⚠️ " + (data.error || "Failed to register donor"));
      }
    } catch {
      setMsg("⚠️ Server error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/donation-bg.jpg')", // ✅ Place image in /public/images/
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* 🔲 Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
      ></div>

      <Container className="position-relative">
        {/* 🌟 Motivational Quotes */}
        <motion.div
          className="text-center mb-4 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold">
            “Donate Blood, Save Lives 🩸”
          </h1>
          <p className="fst-italic">
            “A single pint can save three lives — be the reason someone smiles again.”
          </p>
        </motion.div>

        {/* 🎭 Animated Donor Form */}
        <motion.div
          initial={{ opacity: 0, rotateX: -180, y: -200 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
        >
          <Card className="shadow-lg p-4 rounded-4 border-0 bg-light bg-opacity-95">
            <motion.h2
              className="text-center mb-3 text-danger fw-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🩸 Become a Donor Today
            </motion.h2>

            {msg && <Alert variant="info">{msg}</Alert>}
            <Form onSubmit={handleSubmit}>
              {/* Blood Group Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Blood Group</Form.Label>
                <Form.Select
                  name="blood_group"
                  value={form.blood_group}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
              </Form.Group>

              {/* Organ Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Organ (Optional)</Form.Label>
                <Form.Select
                  name="organ"
                  value={form.organ}
                  onChange={handleChange}
                >
                  <option value="">Select Organ</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Liver">Liver</option>
                  <option value="Heart">Heart</option>
                  <option value="Lung">Lung</option>
                  <option value="Pancreas">Pancreas</option>
                  <option value="Intestine">Intestine</option>
                  <option value="Bone Marrow">Bone Marrow</option>
                  <option value="Cornea">Cornea</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              {/* Availability Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Availability</Form.Label>
                <Form.Select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" variant="danger" className="rounded-pill">
                    ❤️ Register as Donor
                  </Button>
                </motion.div>
              </div>
            </Form>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default DonorForm;
