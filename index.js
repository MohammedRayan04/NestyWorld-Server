const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001; // Default to 3001 if PORT is not defined in .env

// Connect to MongoDB using environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\x1b[35mConnected to MongoDB\x1b[0m");
    // Start your server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`\x1b[32mServer is running on port ${PORT}\x1b[0m`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
