export default function ScheduleModule({ 
  subjectPerformanceData
}) {
  // Generate schedule data - FIXED: Made deterministic to prevent changing numbers
  const generateScheduleData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM'];
    const scheduleData = {};

    days.forEach((day, dayIndex) => {
      scheduleData[day] = [];
      timeSlots.forEach((time, timeIndex) => {
        const subject = subjectPerformanceData[timeIndex % subjectPerformanceData.length];
        // Use deterministic logic instead of Math.random() to prevent changing numbers
        const shouldHaveClass = (dayIndex + timeIndex) % 3 !== 0; // ~67% chance, but consistent
        
        if (subject && shouldHaveClass) {
          scheduleData[day].push({
            time,
            subject: subject.name,
            department: subject.department,
            room: `Room ${200 + timeIndex}`,
            students: subject.students,
            duration: '1.5 hours'
          });
        }
      });
    });

    return scheduleData;
  };

  const scheduleData = generateScheduleData();
  const allClasses = Object.values(scheduleData).flat();
  const departments = [...new Set(subjectPerformanceData.map(s => s.department))];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Schedule Management</h1>
        <p className="text-gray-600">Manage class schedules across all departments</p>
      </div>
      
      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-blue-600">{allClasses.length}</p>
              <p className="text-xs text-gray-500">This week</p>
            </div>
            <div className="text-2xl">📚</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-green-600">{departments.length}</p>
              <p className="text-xs text-gray-500">Active departments</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Average</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(allClasses.length / 5)}</p>
              <p className="text-xs text-gray-500">Classes per day</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-yellow-600">
                {allClasses.reduce((sum, c) => sum + c.students, 0)}
              </p>
              <p className="text-xs text-gray-500">Across all classes</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
      </div>

      {/* Department Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptClasses = allClasses.filter(c => c.department === dept);
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{deptClasses.length}</p>
                <p className="text-xs text-gray-500">{Math.round(deptClasses.length / 5)} per day</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Schedule Overview */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule Overview</h3>
        <div className="w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mon</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tue</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wed</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thu</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fri</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM'].map((time) => (
                <tr key={time}>
                  <td className="px-2 py-3 text-sm font-medium text-gray-900">{time}</td>
                  {Object.keys(scheduleData).map(day => {
                    const dayClass = scheduleData[day].find(c => c.time === time);
                    return (
                      <td key={day} className="px-2 py-3 text-sm text-gray-500">
                        {dayClass ? (
                          <div className="text-left p-1 rounded transition-colors w-full">
                            <div className="font-medium text-gray-900 text-xs truncate">{dayClass.subject}</div>
                            <div className="text-xs text-gray-500">{dayClass.room}</div>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
        <div className="space-y-4">
          {scheduleData.Monday?.slice(0, 3).map((classItem, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{classItem.subject}</h4>
                  <p className="text-sm text-gray-600">{classItem.department}</p>
                  <p className="text-sm text-gray-600">{classItem.time} - {classItem.room}</p>
                  <p className="text-sm text-gray-600">{classItem.students} students</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}