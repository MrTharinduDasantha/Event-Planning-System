import { useEffect, useState } from "react";
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from "react-icons/io";

const EventCard = ({ event }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % event.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + event.images.length) % event.images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image slider */}
      <div className="relative w-full h-52">
        {event.images.length > 0 ? (
          <>
            <img
              src={`http://localhost:5000/${event.images[currentImage]}`}
              alt={`Event ${event.title}`}
              className="w-full h-full object-cover"
            />
            {/* Left arrow */}
            <IoMdArrowDropleftCircle
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
            />
            {/* Right arrow */}
            <IoMdArrowDroprightCircle
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-700">No Image Available</p>
          </div>
        )}
      </div>

      {/* Event details */}
      <div className="p-6">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-700">
          {event.description.split(" ").slice(0, 30).join(" ")}...
        </p>
        <p className="text-gray-600">
          📅 {new Date(event.date).toLocaleDateString()} | ⏰{" "}
          {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p className="text-gray-600">📍 {event.location}</p>
        <p className="text-gray-600 font-semibold">
          🔥 {event.bookedSeats} Booking
        </p>
      </div>
    </div>
  );
};

export default EventCard;
