import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import NotificationProvider from "../components/NotificationProvider/NotificationProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </UserProvider>
  );
}

export default MyApp;
