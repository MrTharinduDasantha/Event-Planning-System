import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [titleText, setTitleText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        if (res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Cycle through the images every 5 seconds for the current event
  useEffect(() => {
    if (events.length === 0) return;
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === events[currentEventIndex].images.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(imageInterval);
  }, [currentEventIndex, events]);

  // Typing animation for the title
  useEffect(() => {
    if (events.length === 0) return;
    const eventTitle = events[currentEventIndex]?.title || "";
    if (titleIndex < eventTitle.length) {
      const typingTimeout = setTimeout(() => {
        setTitleText((prev) => prev + eventTitle[titleIndex]);
        setTitleIndex(titleIndex + 1);
      }, 200);

      return () => clearTimeout(typingTimeout);
    }
  }, [titleIndex, currentEventIndex, events]);

  // Move to the next event when the current one ends
  useEffect(() => {
    if (events.length === 0) return;
    const eventDuration = 12000;
    const eventInterval = setTimeout(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
      setCurrentImageIndex(0);
      setTitleText("");
      setTitleIndex(0);
    }, eventDuration);

    return () => clearTimeout(eventInterval);
  }, [currentEventIndex, events]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (events.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold">No events available</p>
      </div>
    );

  const currentEvent = events[currentEventIndex];
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl p-6">
        {/* Image carousel */}
        <div className="w-full md:w-2/3">
          <img
            src={`http://localhost:5000/${currentEvent.images[currentImageIndex]}`}
            alt="Event"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Event details */}
        <div className="w-full  md:w-1/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{titleText}</h2>
          <p className="text-gray-700">{currentEvent.description}</p>
          <Link
            to={`/events/${currentEvent._id}`}
            className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Visit Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
