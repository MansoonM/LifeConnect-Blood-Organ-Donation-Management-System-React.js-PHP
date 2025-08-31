import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import DonorForm from "./pages/DonorForm";
import RequestForm from "./pages/RequestForm";
import DonorList from "./pages/DonorList";
import MyRequests from "./pages/MyRequests";
import AdminRequests from "./pages/AdminRequests";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/NavBar";
import AdminContacts from "./pages/AdminContacts";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* ✅ Only one global Navbar here */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donor" element={<DonorForm />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/donors" element={<DonorList />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin-requests" element={<AdminRequests />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-contacts" element={<AdminContacts />} />
      </Routes>
    </Router>
  );
};

export default App;
