const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const sessionRoutes = require('./src/routes/sessionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use('/', sessionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
