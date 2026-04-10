const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const {
  getMyNotifications,
  markNotificationAsRead
} = require('../controllers/notification.controller');

router.get('/notifications/my', authMiddleware, getMyNotifications);
router.patch('/notifications/:id/read', authMiddleware, markNotificationAsRead);

module.exports = router;

