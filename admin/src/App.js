import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EventList from "./components/EventList";
import BookingList from "./components/BookingList";
import UserList from "./components/UserList";
import EventForm from "./components/EventForm";
import Layout from "./components/Layout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/edit-event" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
