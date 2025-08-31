import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../components/Auth";

export default function RequestsList() {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/requests/list.php").then(res => setItems(res.data));
  }, [reload]);

  const updateStatus = async (id, status) => {
    await api.post("/requests/update_status.php", { id, status });
    setReload(reload + 1);
  };

  return (
    <div>
      <h2>{user?.role === "admin" ? "All Requests" : "My Requests"}</h2>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            {user?.role === "admin" && <th style={{borderBottom:"1px solid #ddd"}}>Recipient</th>}
            <th style={{borderBottom:"1px solid #ddd"}}>Blood Group</th>
            <th style={{borderBottom:"1px solid #ddd"}}>Organ</th>
            <th style={{borderBottom:"1px solid #ddd"}}>Urgency</th>
            <th style={{borderBottom:"1px solid #ddd"}}>Status</th>
            <th style={{borderBottom:"1px solid #ddd"}}>Details</th>
            {user?.role === "admin" && <th style={{borderBottom:"1px solid #ddd"}}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              {user?.role === "admin" && <td style={{padding:"6px 0"}}>{it.recipient_name}</td>}
              <td>{it.blood_group || "-"}</td>
              <td>{it.organ || "-"}</td>
              <td>{it.urgency}</td>
              <td>{it.status}</td>
              <td>{it.details || "-"}</td>
              {user?.role === "admin" && (
                <td>
                  <button onClick={() => updateStatus(it.id, "matched")}>Matched</button>{" "}
                  <button onClick={() => updateStatus(it.id, "fulfilled")}>Fulfilled</button>{" "}
                  <button onClick={() => updateStatus(it.id, "cancelled")}>Cancelled</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
