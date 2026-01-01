export default function CoursesModule() {
  const courses = [
    { id: 1, name: 'Advanced Mathematics', code: 'MATH301', credits: 3, instructor: 'Dr. Smith', schedule: 'Mon, Wed, Fri 9:00 AM' },
    { id: 2, name: 'Physics II', code: 'PHYS201', credits: 4, instructor: 'Prof. Johnson', schedule: 'Tue, Thu 10:30 AM' },
    { id: 3, name: 'Organic Chemistry', code: 'CHEM301', credits: 3, instructor: 'Dr. Brown', schedule: 'Mon, Wed 2:00 PM' },
    { id: 4, name: 'English Literature', code: 'ENG201', credits: 3, instructor: 'Prof. Davis', schedule: 'Tue, Thu 1:00 PM' },
    { id: 5, name: 'World History', code: 'HIST101', credits: 3, instructor: 'Dr. Wilson', schedule: 'Mon, Wed, Fri 11:00 AM' }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
            >
              <h4 className="font-semibold text-gray-900">{course.name}</h4>
              <p className="text-sm text-gray-600">{course.code} • {course.credits} Credits</p>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-600">Schedule: {course.schedule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}