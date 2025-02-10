import { useEffect, useState } from "react";
import API from "../api/api";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        const eventsWithIndex = res.data.map((event) => ({
          ...event,
          currentImageIndex: 0,
        }));
        setEvents(eventsWithIndex);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event");
    }
  };

  const handleUpdate = (event) => {
    navigate("/edit-event", { state: { eventData: event } });
  };

  const handleImageNavigation = (eventId, direction) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId
          ? {
              ...event,
              currentImageIndex:
                direction === "next"
                  ? (event.currentImageIndex + 1) % event.images.length
                  : (event.currentImageIndex - 1 + event.images.length) %
                    event.images.length,
            }
          : event
      )
    );
  };
  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Event List</h2>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200 text-gray-800">
                    <th className="border border-gray-300 p-2">Title</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                    <th className="border border-gray-300 p-2">Images</th>
                    <th className="border border-gray-300 p-2">Location</th>
                    <th className="border border-gray-300 p-2">Capacity</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="text-center">
                      <td className="border p-2">{event.title}</td>
                      <td className="border p-2 text-left">
                        {event.description}
                      </td>
                      <td className="border p-2">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="border p-2">{event.time}</td>
                      <td className="border p-2">
                        {event.images.length > 0 && (
                          <div className="flex items-center justify-between w-32">
                            <FaArrowAltCircleLeft
                              className="text-xl cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out"
                              onClick={() =>
                                handleImageNavigation(event._id, "prev")
                              }
                            />
                            <img
                              src={`http://localhost:5000/${
                                event.images[event.currentImageIndex]
                              }`}
                              alt={`Event ${event.title}`}
                              className="w-20 h-20 object-cover mx-2 rounded"
                            />
                            <FaArrowAltCircleRight
                              className="text-xl cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out"
                              onClick={() =>
                                handleImageNavigation(event._id, "next")
                              }
                            />
                          </div>
                        )}
                      </td>
                      <td className="border p-2">{event.location}</td>
                      <td className="border p-2">{event.capacity}</td>
                      <td className="border p-2">
                        <div className="flex justify-center items-center gap-2">
                          <RxUpdate
                            className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out"
                            onClick={() => handleUpdate(event)}
                          />
                          <TiDeleteOutline
                            className="text-3xl cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out"
                            onClick={() => handleDelete(event._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-center text-gray-700 text-xl font-semibold">
              No events found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventList;
