// Make variables in .env accessible globally (use process.env.VARIABLE)
require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./apiRouter.js");

app.use(express.json());

app.use(cors({
  origin: [ "http://localhost:5173", "http://hopethiswork.com" ], // your allowed frontend URLs
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
}));

// start Node + Express server on port 5000
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

// Connect to MongoDB
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();
app.locals.mongodb = client.db("COP4331Cards");

// Set up API routes
app.use("/api", apiRouter);
