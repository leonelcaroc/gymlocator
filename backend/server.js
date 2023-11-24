import path from "path";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const PORT = 5000;
import userRoutes from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

connectDB();

const app = express();

app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// POST /api/users** - Register a user
// POST /api/users/auth** - Authenticate a user and get token
// POST /api/users/logout** - Logout user and clear cookie
// GET /api/users/profile** - Get user profile
// PUT /api/users/profile** - Update profile
// GET /api/search/ratings** - Search Player Profile
