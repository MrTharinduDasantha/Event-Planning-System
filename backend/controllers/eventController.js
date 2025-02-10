import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Event from "../models/Event.js";

const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      images,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      date,
      time,
      location,
      capacity,
      existingImages,
    } = req.body;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;

    const uploadedImages = req.files ? req.files.map((file) => file.path) : [];

    const deletedImages = event.images.filter(
      (img) => !existingImages.includes(img)
    );
    deletedImages.forEach((imagePath) => {
      const filePath = path.join(__dirname, "..", imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    event.images = [...existingImages, ...uploadedImages].slice(0, 4);

    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.images && event.images.length > 0) {
      event.images.forEach((imagePath) => {
        const filePath = path.join(__dirname, "..", imagePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Event.deleteOne({ _id: id });

    res.status(200).json({ message: "Event and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
