const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const messageRoutes = require('./routes/message.routes');
const languageMiddleware = require('./middleware/language.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(languageMiddleware);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', applicationRoutes);
app.use('/api', messageRoutes);

module.exports = app;


