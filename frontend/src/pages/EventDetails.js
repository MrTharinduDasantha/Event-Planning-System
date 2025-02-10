import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
        if (res.data.images.length > 0) {
          setMainImage(res.data.images[0]);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching event");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleImageClick = (selectedImage) => {
    setEvent((prevEvent) => {
      const updatedImages = prevEvent.images.map((img) =>
        img === selectedImage ? mainImage : img
      );

      return { ...prevEvent, images: updatedImages };
    });

    setMainImage(selectedImage);
  };

  const handleBooking = async () => {
    try {
      await API.post(`/bookings`, { eventId: id });
      toast.success("Event booked successfully");
    } catch (error) {
      toast.error("Error booking event");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!event)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold">Event not found</p>
      </div>
    );
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">{event.title}</h2>

      {/* Images section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <img
            src={`http://localhost:5000/${mainImage}`}
            alt="Event"
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex gap-3 mt-4 w-full md:w-2/3 lg:w-1/2 justify-center">
          {event.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt="Event Thumbnail"
              className="w-1/3 h-24 object-cover rounded-md cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>

      {/* Event details section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-lg text-gray-700">{event.description}</p>
        <div className="flex justify-between mt-4 text-gray-700">
          <p className="font-medium">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="font-medium">
            <strong>Time:</strong>{" "}
            {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        <div className="flex justify-between mt-2 text-gray-700">
          <p className="font-medium">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="font-medium">
            <strong>Capacity:</strong> {event.capacity}
          </p>
        </div>

        <p className="mt-2 font-medium text-gray-700">
          <strong>Booked Seats:</strong> {event.bookedSeats}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleBooking}
            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 ease-in-out"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
