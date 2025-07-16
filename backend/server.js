// Load environment variables
require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const router = require("./routers/apiRouter.js");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "*", // You can restrict to specific domain later
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// MongoDB connection
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    app.locals.mongodb = client.db("COP4331Cards");
    console.log("Connected to MongoDB");

    // Set up routes
    app.use("/api", router);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
