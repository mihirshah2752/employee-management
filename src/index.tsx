import ReactDOM from "react-dom/client";
import { makeServer } from "./mirage/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  makeServer({ environment });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
