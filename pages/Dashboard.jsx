import React from "react";
import { useAuth } from "../components/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <b>{user?.name}</b> ({user?.role})</p>
      <div style={{display:"grid", gap:8, maxWidth:360}}>
        {user?.role !== "recipient" && <Link to="/donor">Create/Update Donor Profile</Link>}
        <Link to="/request">Create a Request</Link>
        <Link to="/requests">View Requests</Link>
        <Link to="/donors">Find Donors</Link>
      </div>
    </div>
  );
}
