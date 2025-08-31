import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost/blood-organ-donation/backend-php/api/stats.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
        else setError("Failed to load stats");
      })
      .catch(() => setError("Server error"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Hero Section */}
      <motion.div
        className="text-center py-5 bg-light"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <h1 className="fw-bold text-danger mb-3">
            Welcome {user?.name || "Guest"} ❤️
          </h1>
          <p className="lead mb-4">
            Together we can save lives. Find donors, register yourself, and be
            a hero to someone in need.
          </p>
          <Button size="lg" variant="primary" href="/donor" className="rounded-pill">
            Become a Donor
          </Button>
        </Container>
      </motion.div>

      {/* Statistics Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">📊 Platform Statistics</h2>

        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        {stats && (
          <Row className="g-4 text-center">
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="p-4 shadow-lg border-0 rounded-4 bg-danger text-light">
                  <h3>🩸 {stats.total_donors}</h3>
                  <p>Total Donors</p>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="p-4 shadow-lg border-0 rounded-4 bg-success text-light">
                  <h3>❤️ {stats.total_organs}</h3>
                  <p>Organs Available</p>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="p-4 shadow-lg border-0 rounded-4 bg-warning text-dark">
                  <h3>📌 {stats.total_requests}</h3>
                  <p>Requests Pending</p>
                </Card>
              </motion.div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Features Section */}
      <Container className="flex-grow-1 my-5">
        <Row className="g-4">
          <Col md={6} lg={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-4 text-center shadow-lg border-0 rounded-4 h-100">
                <h3 className="text-primary mb-3">🔎 Search Donors</h3>
                <p>Find blood and organ donors easily through our platform.</p>
                <Button variant="outline-primary" href="/donors">
                  Search
                </Button>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} lg={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-4 text-center shadow-lg border-0 rounded-4 h-100">
                <h3 className="text-success mb-3">🩸 Become Donor</h3>
                <p>Register yourself as a blood/organ donor and save lives.</p>
                <Button variant="outline-success" href="/donor">
                  Register
                </Button>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} lg={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-4 text-center shadow-lg border-0 rounded-4 h-100">
                <h3 className="text-info mb-3">ℹ️ About Us</h3>
                <p>
                  Learn more about our mission and how we connect donors with
                  those in need.
                </p>
                <Button variant="outline-info" href="/about">
                  About
                </Button>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container className="text-center">
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ❤️ Blood & Organ Donation System
          </motion.h5>
          <p className="mb-1">Saving lives, one donation at a time.</p>
          <small>&copy; {new Date().getFullYear()} All Rights Reserved</small>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
