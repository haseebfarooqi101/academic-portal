import fs from "fs";
import path from "path";

const teachersFilePath = path.join(process.cwd(), "src/data/teachers.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const fileContents = fs.readFileSync(teachersFilePath, "utf8");
      const teachers = JSON.parse(fileContents);
      res.status(200).json(teachers);
    } catch (error) {
      console.error("Error reading teachers file:", error);
      res.status(200).json([]);
    }
  } else if (req.method === "POST") {
    try {
      const newTeacher = req.body;
      
      // Read existing teachers
      let teachers = [];
      try {
        const fileContents = fs.readFileSync(teachersFilePath, "utf8");
        teachers = JSON.parse(fileContents);
      } catch (error) {
        // File doesn't exist or is empty, start with empty array
        teachers = [];
      }
      
      // Add new teacher
      teachers.push(newTeacher);
      
      // Write back to file
      fs.writeFileSync(teachersFilePath, JSON.stringify(teachers, null, 2));
      
      res.status(201).json({ message: "Teacher created successfully", teacher: newTeacher });
    } catch (error) {
      console.error("Error saving teacher:", error);
      res.status(500).json({ error: "Failed to save teacher" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}