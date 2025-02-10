import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.array("images", 4), createEvent);
router.get("/", getAllEvents);
router.get("/:id", authMiddleware, getEventById);
router.put("/:id", authMiddleware, upload.array("images", 4), updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
