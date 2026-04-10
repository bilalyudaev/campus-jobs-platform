const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const messageRoutes = require('./routes/message.routes');
const referenceRoutes = require('./routes/reference.routes');
const requirementRoutes = require('./routes/requirement.routes');
const notificationRoutes = require('./routes/notification.routes');
const languageMiddleware = require('./middleware/language.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(languageMiddleware);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', applicationRoutes);
app.use('/api', messageRoutes);
app.use('/api', referenceRoutes);
app.use('/api', requirementRoutes);
app.use('/api', notificationRoutes);

module.exports = app;
