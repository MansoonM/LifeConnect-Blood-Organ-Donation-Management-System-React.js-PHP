import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Medical Director",
      img: "https://via.placeholder.com/150x150.png?text=Sarah",
    },
    {
      name: "Mansoon Mohanty",
      role: "Technical Lead",
      img: "https://via.placeholder.com/150x150.png?text=Rajesh",
    },
    {
      name: "Emily Carter",
      role: "Community Manager",
      img: "https://via.placeholder.com/150x150.png?text=Emily",
    },
    {
      name: "Michael Smith",
      role: "Volunteer Coordinator",
      img: "https://via.placeholder.com/150x150.png?text=Michael",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #007bff, #6610f2)",
          height: "50vh",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <motion.h1
            className="fw-bold display-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Our Mission
          </motion.h1>
          <motion.p
            className="lead mt-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Connecting lives through blood and organ donation ❤️
          </motion.p>
        </div>
      </motion.div>

      {/* Mission / Vision / Values */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="h-100 shadow-lg border-0 rounded-4">
                <Card.Body className="text-center">
                  <h3 className="text-primary">🌍 Mission</h3>
                  <p>
                    To save lives by building a transparent platform that
                    connects donors with those in urgent need of blood or
                    organs.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="h-100 shadow-lg border-0 rounded-4">
                <Card.Body className="text-center">
                  <h3 className="text-success">👁️ Vision</h3>
                  <p>
                    A future where no life is lost due to lack of blood or
                    organs, with communities working together for humanity.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="h-100 shadow-lg border-0 rounded-4">
                <Card.Body className="text-center">
                  <h3 className="text-danger">💡 Values</h3>
                  <p>
                    Compassion, transparency, innovation, and dedication to
                    serve communities with dignity and respect.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* How it Works */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">✨ How It Works</h2>
        <Row className="g-4">
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 text-center bg-light rounded-4 shadow-sm">
              <h4>1️⃣ Register</h4>
              <p>Create your account as a donor or a requester.</p>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 text-center bg-light rounded-4 shadow-sm">
              <h4>2️⃣ Connect</h4>
              <p>Admins verify and connect donors with those in need.</p>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 text-center bg-light rounded-4 shadow-sm">
              <h4>3️⃣ Save Lives</h4>
              <p>Together, we make sure no request goes unanswered.</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Team Section */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">👨‍👩‍👧 Meet Our Team</h2>
        <Row className="g-4">
          {team.map((member, idx) => (
            <Col md={3} sm={6} key={idx}>
              <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }}>
                <Card className="h-100 shadow border-0 rounded-4 text-center p-3">
                  <Image
                    src={member.img}
                    roundedCircle
                    className="mx-auto mb-3"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <h5 className="fw-bold">{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <motion.footer
        className="text-center text-white py-3"
        style={{ background: "#343a40" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="mb-0">
          © {new Date().getFullYear()} Blood & Organ Donation Platform. Made
          with ❤️ to save lives.
        </p>
      </motion.footer>
    </div>
  );
};

export default About;
