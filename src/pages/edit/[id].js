

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserForm from "../../components/UserForm";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(stored);

    const user = stored.find((u) => String(u.id) === String(id));

    setSelected(user);
  }, [id]);

  const updateUser = (data) => {
    const newList = users.map((u) =>
      String(u.id) === String(id) ? { ...u, ...data } : u
    );
    

    localStorage.setItem("users", JSON.stringify(newList));

    router.push("/");
  };

  if (!selected) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-10">
      <UserForm initialData={selected} onSubmit={updateUser} />
    </div>
  );
}
