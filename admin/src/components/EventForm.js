import { useEffect, useRef, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { IoImages } from "react-icons/io5";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const EventForm = () => {
  const fileInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state?.eventData;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    images: [],
  });

  useEffect(() => {
    if (eventData) {
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        date: eventData.date
          ? new Date(eventData.date).toISOString().substring(0, 10)
          : "",
        time: eventData.time || "",
        location: eventData.location || "",
        capacity: eventData.capacity || "",
        images: eventData.images || [],
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 4) {
      toast.error("You upload only four images");
      return;
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...files.slice(0, 4)],
    });
  };

  const handleImageDelete = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("date", formData.date ? formData.date : "");
      payload.append("time", formData.time ? formData.time : "");
      payload.append("location", formData.location);
      payload.append("capacity", formData.capacity);

      formData.images.forEach((image) => {
        if (typeof image === "string") {
          payload.append("existingImages", image);
        } else {
          payload.append("images", image);
        }
      });

      if (eventData && eventData._id) {
        await API.put(`/events/${eventData._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event updated successfully");
      } else {
        await API.post("/events", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event created successfully");
      }

      navigate("/events");
    } catch (error) {
      toast.error("Error while saving event");
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white max-w-4xl mx-auto p-6 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {eventData ? "Edit Event" : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none focus:border-blue-500"
              placeholder="Enter event capacity"
              required
            />
          </div>

          {/* Custom image upload */}
          <div className="mb-6">
            <label className="text-lg font-medium block text-gray-900 mb-2">
              Images
            </label>
            <div
              className="flex items-center cursor-pointer border p-3 rounded"
              onClick={() => fileInputRef.current.click()}
            >
              <IoImages className="text-xl mr-2 text-gray-700" />
              <span className="text-gray-700">
                You can upload up to 4 images
              </span>
            </div>
            <input
              type="file"
              name="images"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>

          {/* Display uploaded images */}
          {formData.images.length > 0 && (
            <div className="flex space-x-4 mb-6">
              {formData.images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={
                      typeof image === "string"
                        ? `http://localhost:5000/${image}`
                        : URL.createObjectURL(image)
                    }
                    alt="Event Photos"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 text-white"
                  >
                    <RiDeleteBack2Fill className="text-2xl" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-300 ease-in-out text-white p-2 rounded"
          >
            {eventData ? "Edit Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
