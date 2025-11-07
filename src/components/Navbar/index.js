
export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: "form", label: "User Form" },
    { id: "table", label: "User Table" },
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex gap-8 px-6 py-4 relative">

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className="relative group"
          >
            <span
              className={`
                px-3 py-2 transition-all 
                ${activePage === item.id ? "text-blue-400" : "text-gray-300 group-hover:text-white"}
              `}
            >
              {item.label}
            </span>

            {/* Sliding underline */}
            <span
              className={`
                absolute left-0 bottom-0 h-[3px] bg-blue-500 rounded transition-all duration-300
                ${activePage === item.id ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </button>
        ))}

      </div>
    </nav>
  );
}
