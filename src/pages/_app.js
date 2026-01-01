import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Readex_Pro, Inter } from "next/font/google";
import { store } from "../redux/store";
import { loadUsersFromFiles, hydrate } from "../redux/slices/authSlice";
import "../styles/globals.css";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

function AppContent({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate auth state from cookies after client-side mount
    dispatch(hydrate());
    
    // Load all users (students and teachers) from JSON files on app startup
    dispatch(loadUsersFromFiles())
      .then((result) => {
        if (result.type === 'auth/loadUsersFromFiles/fulfilled') {
          console.log("Successfully loaded users from files:", result.payload);
        }
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <Provider store={store}>
      <div className={`${readexPro.variable} ${inter.variable} font-sans`}>
        <AppContent {...props} />
      </div>
    </Provider>
  );
}
