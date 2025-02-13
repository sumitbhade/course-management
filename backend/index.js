import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/firebase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Course Management API is running");
});

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const coursesSnapshot = await db.collection("courses").get();
    const courses = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Get course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const courseDoc = await db.collection("courses").doc(req.params.id).get();
    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({
      id: courseDoc.id,
      ...courseDoc.data(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
