const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const { sendMessage, getMessagesByApplication } = require('../controllers/message.controller');

router.post('/applications/:id/messages', authMiddleware, sendMessage);
router.get('/applications/:id/messages', authMiddleware, getMessagesByApplication);

module.exports = router;
