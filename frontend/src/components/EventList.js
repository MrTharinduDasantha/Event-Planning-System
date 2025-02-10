import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/api";
import EventCard from "./EventCard";
import toast from "react-hot-toast";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");

        // Get current date (withou time)
        const today = new Date().setHours(0, 0, 0, 0);

        // Filter only upcoming events
        const upcomingEvents = res.data.filter(
          (event) => new Date(event.date).setHours(0, 0, 0, 0) >= today
        );

        // Sort upcoming events by event date
        const sortedEvents = upcomingEvents.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40 mt-20">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-7">
          {filteredEvents.map((event) => (
            <div key={event._id} className="relative">
              <EventCard event={event} />
              <div className="absolute bottom-7 right-6">
                <Link
                  to={`/events/${event._id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl font-semibold mt-48">
          No events found
        </div>
      )}
    </div>
  );
};

export default EventList;
