import express from 'express';
import { 
  getAllEvents, 
  getEventsByAddress, 
  getEventStats,
  getRecentEvents 
} from '../controllers/eventController.controller.js';

const router = express.Router();

// Get all events with pagination
router.get('/events', getAllEvents);

// Get recent events
router.get('/events/recent', getRecentEvents);

// Get stats
router.get('/events/stats', getEventStats);

// Get events by address
router.get('/events/address/:address', getEventsByAddress);

export default router;