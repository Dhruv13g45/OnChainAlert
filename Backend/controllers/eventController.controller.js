import EventModel from '../models/EventSchema.model.js';

export const getAllEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    
    const events = await EventModel
      .find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip);
    
    const total = await EventModel.countDocuments();
    
    res.json({ 
      success: true, 
      count: events.length,
      total,
      events 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

export const getEventsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    
    const events = await EventModel.find({
      $or: [
        { from: new RegExp(address, 'i') }, 
        { to: new RegExp(address, 'i') }
      ]
    }).sort({ timestamp: -1 });
    
    res.json({ 
      success: true, 
      count: events.length,
      address,
      events 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

export const getEventStats = async (req, res) => {
  try {
    const total = await EventModel.countDocuments();
    const last24h = await EventModel.countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    const byType = await EventModel.aggregate([
      { $group: { _id: '$alertType', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        total,
        last24h,
        byType
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

export const getRecentEvents = async (req, res) => {
  try {
    const events = await EventModel
      .find()
      .sort({ timestamp: -1 })
      .limit(10);
    
    res.json({ 
      success: true, 
      events 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};