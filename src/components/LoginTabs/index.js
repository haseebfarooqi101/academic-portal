export default function LoginTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-between bg-gray-100 p-1 rounded-lg shadow-sm">
      <button
        onClick={() => setActiveTab("student")}
        className={`w-1/2 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
          activeTab === "student"
            ? "bg-white text-gray-900 shadow-md"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Student
      </button>

      <button
        onClick={() => setActiveTab("teacher")}
        className={`w-1/2 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
          activeTab === "teacher"
            ? "bg-white text-gray-900 shadow-md"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Teacher / Admin
      </button>
    </div>
  );
}
