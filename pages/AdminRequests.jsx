import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // ✅ Fetch all requests
  useEffect(() => {
    fetch("http://localhost/blood-organ-donation/backend-php/api/manage_requests.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRequests(data.requests);
        else setMsg("⚠️ Could not fetch requests");
      })
      .catch(() => setMsg("⚠️ Server error"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Approve/Reject request
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        "http://localhost/blood-organ-donation/backend-php/api/update_request.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req.id === id ? { ...req, status } : req
          )
        );
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📋 Manage Requests</h2>

      {msg && <Alert variant="danger">{msg}</Alert>}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Table striped bordered hover responsive className="shadow">
            <thead className="table-dark">
              <tr>
                <th>Requester</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Organ</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.requester_name || "Unknown"}</td>
                    <td>{req.requester_email || "N/A"}</td>
                    <td>{req.blood_group}</td>
                    <td>{req.organ}</td>
                    <td>
                      <span
                        className={`badge ${
                          req.status === "approved"
                            ? "bg-success"
                            : req.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => updateStatus(req.id, "approved")}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => updateStatus(req.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </motion.div>
      )}
    </Container>
  );
};

export default AdminRequests;
