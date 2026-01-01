import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Read the current students data
    const studentsFilePath = path.join(process.cwd(), 'src/data/students.json');
    const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));

    // Find the student by email
    const student = studentsData.find(student => student.email === email);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the student data (without password for security)
    const { password, ...studentWithoutPassword } = student;
    
    res.status(200).json({
      message: 'Student status retrieved successfully',
      student: {
        ...studentWithoutPassword,
        role: 'student'
      }
    });

  } catch (error) {
    console.error('Error getting student status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}