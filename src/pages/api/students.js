import fs from "fs";
import path from "path";

const studentsFilePath = path.join(process.cwd(), "src/data/students.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(studentsFilePath, "utf-8");
      const students = JSON.parse(data);
      res.status(200).json(students);
    } catch (error) {
      console.error("Error reading students.json:", error);
      res.status(500).json({ error: "Failed to load students" });
    }
  } else if (req.method === "POST") {
    try {
      const newStudent = req.body;

      // Read existing students
      let students = [];
      if (fs.existsSync(studentsFilePath)) {
        const data = fs.readFileSync(studentsFilePath, "utf-8");
        students = JSON.parse(data);
      }

      // Add new student
      students.push(newStudent);

      // Write back to file
      fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));

      res.status(201).json({ message: "Student saved successfully", student: newStudent });
    } catch (error) {
      console.error("Error saving student:", error);
      res.status(500).json({ error: "Failed to save student" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
