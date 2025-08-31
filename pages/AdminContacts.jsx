import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    fetch("http://localhost/blood-organ-donation/backend-php/api/contact_messages.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages);
        else setMsg("⚠️ Could not fetch messages");
      })
      .catch(() => setMsg("⚠️ Server error"))
      .finally(() => setLoading(false));
  };

  // ✅ Delete a contact message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(
        "http://localhost/blood-organ-donation/backend-php/api/delete_contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("⚠️ Server error");
    }
  };

  return (
    <Container className="mt-4">
      <motion.h2
        className="text-center mb-4 fw-bold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📬 Contact Messages
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.message}</td>
                    <td>{new Date(m.created_at).toLocaleString()}</td>
                    <td className="d-flex gap-2">
                      {/* ✅ Reply via email */}
                      <Button
  variant="success"
  size="sm"
  target="_blank"
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${m.email}&su=Reply to your message&body=Hi ${m.name},%0D%0A%0D%0A`}
>
  Reply via Gmail
</Button>

                      {/* ✅ Delete message */}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(m.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No contact messages yet
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

export default AdminContacts;
