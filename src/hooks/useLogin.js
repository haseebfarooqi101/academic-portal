import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../redux/slices/authSlice";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state) => state.auth);

  const handleSignIn = (activeTab, showError) => {
    // Client-side validation
    if (!email.trim()) {
      showError("Please enter your email");
      return;
    }
    
    const emailRegex = /^[^\s@]+@school\.edu$/i;
    if (!emailRegex.test(email)) {
      showError("Use your school.edu email");
      return;
    }
    
    if (!password) {
      showError("Please enter your password");
      return;
    }

    setLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      if (activeTab === "student") {
        // Check student credentials
        const student = users.find(
          (user) => user.role === "student" && user.email === email && user.password === password
        );

        if (student) {
          dispatch(login(student));
          setLoading(false);
          router.push("/StudentDashboard");
        } else {
          showError("Invalid email or password");
          setLoading(false);
        }
      } else if (activeTab === "teacher") {
        // Check teacher/admin credentials
        const user = users.find(
          (u) => (u.role === "teacher" || u.role === "admin") && u.email === email && u.password === password
        );

        if (user) {
          dispatch(login(user));
          setLoading(false);
          
          // Route based on role
          if (user.role === "admin") {
            router.push("/AdminDashboard");
          } else {
            router.push("/TeacherDashboard");
          }
        } else {
          showError("Invalid email or password");
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
    loading,
    handleSignIn,
  };
}