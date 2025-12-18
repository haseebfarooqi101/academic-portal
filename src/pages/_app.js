import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Readex_Pro } from "next/font/google";
import { store } from "../redux/store";
import "../styles/globals.css";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
});

function AppContent({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load students from students.json on app startup
    fetch("/api/students")
      .then((res) => res.json())
      .then((students) => {
        console.log("Loaded students from file:", students);
        
        // Dispatch action to populate students in Redux
        dispatch({
          type: "auth/setStudents",
          payload: students,
        });
      })
      .catch((error) => {
        console.error("Error loading students:", error);
      });
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <Provider store={store}>
      <div className={`${readexPro.variable} font-sans`}>
        <AppContent {...props} />
      </div>
    </Provider>
  );
}
