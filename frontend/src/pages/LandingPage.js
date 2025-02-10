import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        const eventImages = res.data.flatMap((event) => event.images);
        setImages(eventImages);
      } catch (error) {
        toast.error("Failed to load event images");
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);
  return (
    <div className="relative w-full h-screen flex justify-center items-center text-white">
      {images.length > 0 && (
        <img
          src={`http://localhost:5000/${images[currentImageIndex]}`}
          alt="Event"
          className="absolute w-full h-full object-cover transition-opacity duration-1000"
        />
      )}
      <div className="relative bg-black bg-opacity-50 p-6 text-center rounded-md">
        <h1 className="text-4xl font-bold">Welcome to Event Planner !</h1>
        <p className="text-lg mt-2">
          Discover the latest events and book your events today.
        </p>
        <button
          className="mt-4 px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
          onClick={() => navigate("/register")}
        >
          Visit
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
