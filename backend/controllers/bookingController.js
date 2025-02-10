import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const bookEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.bookedSeats >= event.capacity) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    const newBooking = new Booking({
      userId: req.user.id,
      eventId,
    });

    await newBooking.save();
    event.bookedSeats += 1;
    await event.save();

    return res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId")
      .populate("userId", "name email");
    return res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "eventId"
    );
    return res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { bookEvent, getAllBookings, getUserBookings };
