import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost/blood-organ-donation/backend-php/api/my_requests.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor_id: user.id, actor_type: user.role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRequests(data.requests);
        else setMsg("⚠️ Could not fetch requests");
      })
      .catch(() => setMsg("⚠️ Server error"))
      .finally(() => setLoading(false));
  }, [user]);

  // ✅ Delete request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(
        "http://localhost/blood-organ-donation/backend-php/api/delete_request.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, actor_id: user.id, actor_type: user.role }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setRequests((prev) => prev.filter((req) => req.id !== id));
      } else {
        alert(data.error || "Failed to delete request");
      }
    } catch {
      alert("⚠️ Server error");
    }
  };

  return (
    <Container className="mt-4">
      <motion.h2
        className="text-center mb-4 fw-bold text-primary"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📌 My Requests
      </motion.h2>

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
                <th>Blood Group</th>
                <th>Organ</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.blood_group || "-"}</td>
                    <td>{req.organ || "-"}</td>
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
                    <td>{new Date(req.created_at).toLocaleString()}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(req.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
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

export default MyRequests;
