import express from "express";
import {
  bookEvent,
  getAllBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, bookEvent);
router.get("/", authMiddleware, getAllBookings);
router.get("/:userId", authMiddleware, getUserBookings);

export default router;
