

import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState("form"); // default page
  // ✅ Load users from localStorage on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(saved);
  }, []);

  // ✅ Save users to localStorage whenever "users" changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ✅ Add new user
  const addUser = (userData) => {
    const newUser = { id: Date.now().toString(), ...userData }; // make ID string
    setUsers([...users, newUser]);
  };

  // ✅ Delete user
  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="p-6">
        {activePage === "form" && <UserForm onSubmit={addUser} />}

        {activePage === "table" && (
          <UserTable users={users} onDelete={deleteUser} />
        )}
      </div>
    </div>
  );
}
