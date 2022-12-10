import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppBar from "../components/appBar/AppBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppBar />
      <Component {...pageProps} />
    </>
  );
}
