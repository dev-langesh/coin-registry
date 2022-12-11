import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppBar from "../components/appBar/AppBar";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppBar />
      <Component {...pageProps} />
    </Provider>
  );
}
