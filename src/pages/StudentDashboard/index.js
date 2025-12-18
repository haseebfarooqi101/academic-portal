import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    router.push("/Login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white w-full max-w-lg shadow-2xl rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Student Dashboard!
        </h1>
        
        <p className="text-gray-600 mb-6">
          You have successfully logged in to your student portal.
        </p>

        {currentUser && (
          <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-gray-700">
              <span className="font-semibold">Logged in as:</span> {currentUser.name || currentUser.email}
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold text-base transition shadow-md hover:shadow-lg mb-4"
        >
          Logout
        </button>

        <Link href="/Login">
          <span className="text-purple-600 cursor-pointer hover:text-purple-700 text-sm">
            Back to Login
          </span>
        </Link>
      </div>
    </div>
  );
}
