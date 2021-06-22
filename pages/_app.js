// import "../styles/globals.css";
//import 'tailwindcss/tailwind.css'
import "bootstrap/dist/css/bootstrap.css";
import "../styles/notyf.min.css";

import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
