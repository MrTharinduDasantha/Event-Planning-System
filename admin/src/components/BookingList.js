import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");
        setBookings(res.data);

        const initialIndexes = {};
        res.data.forEach((booking) => {
          initialIndexes[booking._id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        bookings.forEach((booking) => {
          if (booking.eventId.images.length > 0) {
            newIndexes[booking._id] =
              (prevIndexes[booking._id] + 1) % booking.eventId.images.length;
          }
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bookings]);
  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : bookings.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Booking List</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 p-2">Event</th>
                <th className="border border-gray-300 p-2">User</th>
                <th className="border border-gray-300 p-2">User Email</th>
                <th className="border border-gray-300 p-2">Booking Date</th>
                <th className="border border-gray-300 p-2">Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td className="border p-2">
                    {booking.eventId.images.length > 0 ? (
                      <div className="relative w-40 h-40 mx-auto">
                        <img
                          src={`http://localhost:5000/${
                            booking.eventId.images[
                              currentImageIndex[booking._id]
                            ]
                          }`}
                          alt={booking.eventId.title}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <p className="absolute bottom-0 w-full bg-white text-black font-semibold text-center py-1">
                          {booking.eventId.title}
                        </p>
                      </div>
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </td>
                  <td className="border p-2">{booking.userId.name}</td>
                  <td className="border p-2">{booking.userId.email}</td>
                  <td className="border p-2">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {booking.eventId.capacity - booking.eventId.bookedSeats}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-center text-gray-700 text-xl font-semibold">
          No booking found
        </div>
      )}
    </div>
  );
};

export default BookingList;
