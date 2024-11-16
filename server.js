require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(cors({
  origin: "https://car-management-frontend-113f.vercel.app/",
  // Your frontend domain
  credentials: true,  // Allow credentials (cookies)
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/cars", carRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log("Server running on port", process.env.PORT)))
  .catch((err) => console.error(err));
