export default function AssignmentsModule({ 
  studentsData, 
  departments, 
  subjectPerformanceData
}) {
  // Generate dummy assignments based on students and subjects - FIXED: Made deterministic
  const generateAssignments = () => {
    const assignments = [];
    const assignmentTypes = ['Quiz', 'Test', 'Project', 'Homework', 'Lab Report'];
    
    subjectPerformanceData.forEach((subject, subjectIndex) => {
      const deptStudents = studentsData.filter(s => s.department === subject.department);
      
      // Generate 2-3 assignments per subject (deterministic based on subject index)
      const numAssignments = (subjectIndex % 2) + 2; // Will be 2 or 3
      for (let i = 0; i < numAssignments; i++) {
        const typeIndex = (subjectIndex + i) % assignmentTypes.length;
        const type = assignmentTypes[typeIndex];
        
        // Create deterministic due date (spread over next 30 days)
        const daysFromNow = ((subjectIndex + i) % 30) + 1;
        const dueDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
        
        // Create deterministic submission count
        const submissionRate = 0.3 + ((subjectIndex + i) % 7) * 0.1; // 30% to 90%
        const submissions = Math.floor(deptStudents.length * submissionRate);
        
        assignments.push({
          id: `${subject.name}-${type}-${i}`,
          title: `${subject.name} ${type} ${i + 1}`,
          subject: subject.name,
          department: subject.department,
          dueDate: dueDate.toISOString().split('T')[0],
          totalStudents: deptStudents.length,
          submissions: submissions,
          status: submissions === deptStudents.length ? 'completed' : 
                  submissions > deptStudents.length * 0.7 ? 'grading' : 'pending'
        });
      }
    });
    
    return assignments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  };

  const assignments = generateAssignments();

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Assignments Management</h1>
        <p className="text-gray-600">Track and manage assignments across all departments</p>
      </div>
      
      {/* Assignment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-blue-600">{assignments.length}</p>
              <p className="text-xs text-gray-500">This semester</p>
            </div>
            <div className="text-2xl">📝</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grading</p>
              <p className="text-2xl font-bold text-yellow-600">
                {assignments.filter(a => a.status === 'grading').length}
              </p>
              <p className="text-xs text-gray-500">Need attention</p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === 'completed').length}
              </p>
              <p className="text-xs text-gray-500">Graded assignments</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Submission</p>
              <p className="text-2xl font-bold text-red-600">
                {assignments.filter(a => a.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-500">Awaiting students</p>
            </div>
            <div className="text-2xl">📋</div>
          </div>
        </div>
      </div>

      {/* Department Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptAssignments = assignments.filter(a => a.department === dept);
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{deptAssignments.length}</p>
                <p className="text-xs text-gray-500">
                  {deptAssignments.filter(a => a.status === 'pending').length} pending
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Assignments */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h3>
        <div className="space-y-4">
          {assignments.slice(0, 5).map((assignment) => (
            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{assignment.title}</h5>
                  <p className="text-sm text-gray-600">{assignment.subject} - {assignment.department}</p>
                  <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                  <p className="text-sm text-gray-600">
                    Submissions: {assignment.submissions}/{assignment.totalStudents}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    assignment.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : assignment.status === 'grading'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {assignment.status === 'completed' ? 'Completed' : 
                     assignment.status === 'grading' ? 'Grading' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments by Department */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments by Department</h3>
        <div className="space-y-6">
          {departments.map(dept => {
            const deptAssignments = assignments.filter(a => a.department === dept);
            return (
              <div key={dept} className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{dept} ({deptAssignments.length} assignments)</h4>
                </div>
                <div className="space-y-3">
                  {deptAssignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{assignment.title}</h5>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                          <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                          <p className="text-sm text-gray-600">
                            Submissions: {assignment.submissions}/{assignment.totalStudents}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assignment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : assignment.status === 'grading'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {assignment.status === 'completed' ? 'Completed' : 
                             assignment.status === 'grading' ? 'Grading' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}