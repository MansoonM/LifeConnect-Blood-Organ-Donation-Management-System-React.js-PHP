
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost/blood-organ-donation/backend-php/api/donors.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setDonors(data.donors);
        else setMsg("⚠️ Could not fetch donors");
      })
      .catch(() => setMsg("⚠️ Server error"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filtering logic
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.actor_name?.toLowerCase().includes(search.toLowerCase()) ||
      donor.organ?.toLowerCase().includes(search.toLowerCase());

    const matchesBlood = bloodFilter ? donor.blood_group === bloodFilter : true;

    return matchesSearch && matchesBlood;
  });

  // ✅ Reset filters
  const resetFilters = () => {
    setSearch("");
    setBloodFilter("");
  };

  return (
    <Container className="mt-4">
      <motion.h2
        className="text-center mb-4 fw-bold text-danger"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🩸 Donor Directory
      </motion.h2>

      {msg && <Alert variant="danger">{msg}</Alert>}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && (
        <>
          {/* 🔍 Search + Filter Controls */}
          <Card className="p-3 shadow-sm mb-3">
            <Row className="align-items-center">
              <Col md={4} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search by name or organ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={4} className="mb-2">
                <Form.Select
                  value={bloodFilter}
                  onChange={(e) => setBloodFilter(e.target.value)}
                >
                  <option value="">Filter by Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
              </Col>
              <Col md={4} className="mb-2 text-center">
                <Button variant="secondary" onClick={resetFilters} className="w-100">
                  Reset Filters
                </Button>
              </Col>
            </Row>
          </Card>

          {/* 🩸 Donor Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Table striped bordered hover responsive className="shadow">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                  <th>Organ</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <tr key={donor.id}>
                      <td>{donor.donor_name || "Unknown"}</td>
                      <td>{donor.donor_email || "Unknown"}</td>
                      <td>{donor.blood_group}</td>
                      <td>{donor.organ || "-"}</td>
                      <td>
                        <span
                          className={`badge ${
                            donor.availability === "yes"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {donor.availability === "yes"
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No donors found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </motion.div>
        </>
      )}
    </Container>
  );
};

export default DonorList;
