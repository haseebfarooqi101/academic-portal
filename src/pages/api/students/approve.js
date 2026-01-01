import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    // Read the current students data
    const studentsFilePath = path.join(process.cwd(), 'src/data/students.json');
    const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));

    // Find and update the student
    const studentIndex = studentsData.findIndex(student => student.id === studentId);
    
    if (studentIndex === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student status to approved
    studentsData[studentIndex].status = 'approved';

    // Write back to file
    fs.writeFileSync(studentsFilePath, JSON.stringify(studentsData, null, 2));

    // Return the updated student
    res.status(200).json({
      message: 'Student approved successfully',
      student: studentsData[studentIndex]
    });

  } catch (error) {
    console.error('Error approving student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}