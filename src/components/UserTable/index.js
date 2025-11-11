

import Link from "next/link";

export default function UserTable({ users, deleteUser }) {
  const handleDelete = (id) => {
    deleteUser(String(id));   // Always send ID  
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-3">User Records</h2>

      {users.length === 0 ? (
        <p className="text-shadow-gray-500">No data available.</p>
      ) : (
        <table className="w-full border rounded shadow">
          <thead className="bg-white-100">
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.age}</td>

                <td className="p-2 border flex gap-3 justify-center">
                  <Link
                    href={`/edit/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
