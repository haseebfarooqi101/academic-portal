

import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState("form"); // default page
  const [editingUser, setEditingUserId] = useState(null); 
//craete
 //on edit pass on edit pass on user table seit edit 

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
    const existingUserIndex = users.findIndex(user => 
      (userData.id && user.id === userData.id) || // 1. Match by ID (explicit update via Edit button)
      (user.email === userData.email)              // 2. Match by Email (prevent duplicate when adding new)
  );

  if (existingUserIndex !== -1) {
      // CASE: USER EXISTS (UPDATE/REPLACE)
      const updatedUsers = users.map((user, index) => {
          if (index === existingUserIndex) {
              // Merges old data with new data to replace the entry
              return { ...user, ...userData }; 
          }
          return user; // Return all other users unchanged
      });
      
      setUsers(updatedUsers);
      setEditingUserId(null);   // Clear editing state
      setActivePage("table"); // Switch to table view
      return; 
  }
    const newUser = { id: Date.now().toString(), ...userData }; // make ID string
    setUsers([...users, newUser]);
    
  };

  // ✅ Delete user
  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
  };
  // const updateUser = (updated) => {
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === updated.id ? updated : u))
  //   );
  //   setEditingUser(null);     // clear edit
  //   setActivePage("table");   // go back to table
  // };
   const handleEdit = (user) => {
    setEditingUserId(user);
    setActivePage("form");
  };
  
  return (
    <div className="pt-0">
    <div className="h-screen overflow-hidden bg-gray-900 text-white">
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="p-6">
        {activePage === "form" && (
          <div> className="animate-fade"
          <UserForm onSubmit={addUser} initialData={users.find(item => item.id === editingUser)} />
          </div>)}

        {activePage === "table" && (
          <div> className="animate-fade"
          <UserTable users={users} onDelete={deleteUser} onEdit={handleEdit}/>
        </div>)}
      </div>
    </div>
    </div>
  );
}
