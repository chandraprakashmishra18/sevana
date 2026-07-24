const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const animalRoutes = require('./routes/report.routes');
const vetRoutes = require('./routes/vet.routes');
const lostFoundRoutes = require('./routes/lost-found.routes');
const raiseHandRoutes = require('./routes/raise-hand.routes');
const uploadRoutes = require('./routes/upload.routes');
const userRoutes = require('./routes/user.routes');
const app = express();
const errorHandler = require("./middleware/error.middleware");

// all routes above

app.use(errorHandler);
app.use("/api/v1/auth", authRoutes);
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

// Must be the last middleware so route errors are forwarded here.
app.use(errorHandler);

module.exports = app;
