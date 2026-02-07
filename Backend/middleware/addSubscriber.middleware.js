// Middleware to add subscribers to alerts
export const addSubscriber = (req, res, next) => {
  // Validate subscriber data
  if (!req.body.chatId) {
    return res.status(400).json({ error: 'Chat ID required' });
  }
  next();
};