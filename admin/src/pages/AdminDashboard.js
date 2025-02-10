import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
  });
  const [mostBookedEvent, setMostBookedEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const eventsRes = await API.get("/events");
        const bookingsRes = await API.get("/bookings");
        const usersRes = await API.get("/auth/users");

        setMetrics({
          totalEvents: eventsRes.data.length,
          totalBookings: bookingsRes.data.length,
          totalUsers: usersRes.data.length,
        });

        const sortedEvents = eventsRes.data
          .sort((a, b) => b.bookedSeats - a.bookedSeats)
          .slice(0, 6);

        setMostBookedEvent(sortedEvents);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);
  return (
    <div className="bg-gray-100 100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-3xl text-center uppercase font-semibold">
            Total Events {metrics.totalEvents}
          </h2>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-3xl text-center uppercase font-semibold">
            Total Bookings {metrics.totalBookings}
          </h2>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-3xl text-center uppercase font-semibold">
            Total Users {metrics.totalUsers}
          </h2>
        </div>
      </div>

      {/* Most booked events section */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] mt-20">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {mostBookedEvent.length > 0 ? (
            <>
              <h2 className="text-3xl text-center font-bold mt-10 mb-6">
                Most Booked Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mostBookedEvent.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-700 text-xl font-semibold mt-10">
              No most booked events found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
