import React from "react";
import AppNavbar from "./NavBar";

const Layout = ({ children, onLogout, user }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar always visible */}
      <AppNavbar onLogout={onLogout} user={user} />

      {/* Page content */}
      <main className="flex-grow-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
