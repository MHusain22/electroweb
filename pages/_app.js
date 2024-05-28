import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
// import Authprovider from "@/components/Authprovider";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
