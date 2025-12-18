import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state) => state.auth);

  const handleSignIn = (activeTab) => (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({});
    
    // Client-side validation
    const next = {};
    if (!email.trim()) next.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@school\.edu$/i;
      if (!emailRegex.test(email)) next.email = "Use your school.edu email";
    }
    if (!password) next.password = "Password is required";
    
    if (Object.keys(next).length > 0) {
      setFormErrors(next);
      setError("Please fix the errors before signing in");
      return;
    }

    setLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      if (activeTab === "student") {
        // Check student credentials
        const student = users.students.find(
          (s) => s.email === email && s.password === password
        );

        if (student) {
          dispatch({
            type: "auth/login",
            payload: {
              id: student.id,
              name: student.name,
              email: student.email,
              role: "student",
              registrationNumber: student.registrationNumber,
              department: student.department,
            },
          });
          setLoading(false);
          router.push("/StudentDashboard");
        } else {
          setError("Invalid email or password");
          setLoading(false);
        }
      } else if (activeTab === "teacher") {
        // Check teacher credentials
        const teacher = users.teachers.find(
          (t) => t.email === email && t.password === password
        );

        if (teacher) {
          dispatch({
            type: "auth/login",
            payload: {
              id: teacher.id,
              email: teacher.email,
              role: "teacher",
            },
          });
          setLoading(false);
          router.push("/StudentDashboard"); // Can be changed to /TeacherDashboard later
        } else {
          setError("Invalid email or password");
          setLoading(false);
        }
      }
    }, 500);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    formErrors,
    loading,
    handleSignIn,
  };
}