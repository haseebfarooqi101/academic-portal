import { Provider } from "react-redux";
import { store } from "../store/store";
import "antd/dist/reset.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
