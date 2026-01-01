// Enhanced student data with additional fields for comprehensive tracking
export const enhanceStudentData = (students) => {
  return students.map(student => ({
    ...student,
    // Generate realistic academic data based on student info
    grade: Math.floor(Math.random() * 40) + 60, // 60-100%
    attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
    subjects: getSubjectsForDepartment(student.department),
    leaves: generateLeaveData(),
    class: getClassForStudent(student.department, student.registrationNumber)
  }));
};

export const getSubjectsForDepartment = (department) => {
  const subjectMap = {
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Database Systems'],
    'Electrical': ['Circuit Analysis', 'Electronics', 'Power Systems', 'Control Systems'],
    'Mechanical': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing'],
    'Mathematics': ['Calculus', 'Linear Algebra', 'Statistics', 'Discrete Math'],
    'Physics': ['Mechanics', 'Electromagnetism', 'Quantum Physics', 'Thermodynamics']
  };
  return subjectMap[department] || ['General Studies'];
};

export const getClassForStudent = (department, regNumber) => {
  const year = regNumber.split('-')[1];
  const deptCode = department === 'Computer Science' ? 'CS' : 
                  department === 'Electrical' ? 'EE' : 
                  department === 'Mechanical' ? 'ME' : 'GEN';
  return `${deptCode}-${year}`;
};

export const generateLeaveData = () => {
  const leaveTypes = ['Sick', 'Personal', 'Emergency', 'Medical'];
  const hasLeave = Math.random() > 0.7; // 30% chance of having a leave
  if (!hasLeave) return [];
  
  return [{
    type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: Math.random() > 0.5 ? 'pending' : 'approved',
    reason: 'Medical appointment'
  }];
};

// Grade boundaries
export const gradeBoundaries = {
  'A+': { min: 95, max: 100 },
  'A': { min: 90, max: 94 },
  'A-': { min: 85, max: 89 },
  'B+': { min: 80, max: 84 },
  'B': { min: 75, max: 79 },
  'B-': { min: 70, max: 74 },
  'C+': { min: 65, max: 69 },
  'C': { min: 60, max: 64 },
  'C-': { min: 55, max: 59 },
  'D': { min: 50, max: 54 },
  'F': { min: 0, max: 49 }
};

// Function to get grade letter from score
export const getGradeLetter = (score) => {
  for (const [grade, boundary] of Object.entries(gradeBoundaries)) {
    if (score >= boundary.min && score <= boundary.max) {
      return grade;
    }
  }
  return 'F';
};

// Department-wise statistics
export const getDepartmentStats = (studentsData, departments) => {
  const stats = {};
  departments.forEach(dept => {
    const deptStudents = studentsData.filter(s => s.department === dept);
    stats[dept] = {
      totalStudents: deptStudents.length,
      averageGrade: deptStudents.reduce((sum, s) => sum + (s.grade || 0), 0) / deptStudents.length || 0,
      averageAttendance: deptStudents.reduce((sum, s) => sum + (s.attendance || 0), 0) / deptStudents.length || 0,
      pendingLeaves: deptStudents.reduce((sum, s) => sum + (s.leaves ? s.leaves.filter(l => l.status === 'pending').length : 0), 0)
    };
  });
  return stats;
};

// Subject-wise performance data
export const getSubjectPerformanceData = (studentsData, departments) => {
  const subjectData = [];
  departments.forEach(dept => {
    const subjects = getSubjectsForDepartment(dept);
    subjects.forEach(subject => {
      const deptStudents = studentsData.filter(s => s.department === dept);
      const avgGrade = deptStudents.reduce((sum, s) => sum + (s.grade || 0), 0) / deptStudents.length || 0;
      subjectData.push({
        name: subject,
        department: dept,
        average: Math.floor(avgGrade + (Math.random() * 10 - 5)), // Add some variation
        students: deptStudents.length
      });
    });
  });
  return subjectData;
};