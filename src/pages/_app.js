import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Readex_Pro, Inter } from "next/font/google";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadUsersFromFiles, hydrate } from "../redux/slices/authSlice";
import { setLeavesFromStorage } from "../redux/slices/leavesSlice";
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
    dispatch(hydrate());
    dispatch(loadUsersFromFiles());

    // Cross-tab sync: when another tab updates localStorage (leaves),
    // reload the persisted state into this tab's Redux store
    const handleStorageChange = (e) => {
      if (e.key === 'persist:leaves' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const leavesState = JSON.parse(parsed.leaveRequests);
          dispatch(setLeavesFromStorage(leavesState));
        } catch (_) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`${readexPro.variable} ${inter.variable} font-sans`}>
          <AppContent {...props} />
        </div>
      </PersistGate>
    </Provider>
  );
}
