import React from "react";
import { Container, Card } from "react-bootstrap";

const AdminDashboard = ({ user }) => {
  if (!user || user.role !== "admin") {
    return <h3 className="text-center mt-5">🚫 Access Denied</h3>;
  }

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h2>👨‍💼 Admin Dashboard</h2>
        <p>Welcome, {user.name}! You have full access.</p>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
