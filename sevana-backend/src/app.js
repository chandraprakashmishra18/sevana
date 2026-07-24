const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const animalRoutes = require('./routes/report.routes');
const vetRoutes = require('./routes/vetRoutes');
const lostFoundRoutes = require('./routes/lost-found.routes');
const raiseHandRoutes = require('./routes/raise-hand.routes');
const uploadRoutes = require('./routes/upload.routes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', module: 'animal-rescue' }));

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/raise-hand', raiseHandRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/users', userRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Central error handler - every controller above uses async/await without
// individual try/catch for unexpected errors, so this is the safety net.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
