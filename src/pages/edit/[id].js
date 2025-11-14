

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserForm from "../../components/UserForm";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  
  const [selected, setSelected] = useState(null); 

  useEffect(() => {
    // 1. Load data from storage 
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    // 2. Find the user to edit
    const user = stored.find((u) => String(u.id) === String(id));
    setSelected(user);
  }, [id]);

  const updateUser = (data) => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
  const updatedList = stored.map((u) => (u.id === id ? { ...u, ...data } : u));
  localStorage.setItem("users", JSON.stringify(updatedList));
  router.push("/");
  };

  if (!selected) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-10">
      <UserForm initialData={selected} onSubmit={updateUser} />
    </div>
  );
}