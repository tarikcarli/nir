import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";

const contextClass = {
  success: "bg-gradient-to-b from-green-600 to-green-800 text-green-50",
  error: "bg-gradient-to-b from-red-500 to-red-700 text-red-50",
  info: "bg-gradient-to-b from-gray-600 to-gray-800 text-gray-50",
  warning: "bg-gradient-to-b from-yellow-600 to-yellow-800 text-yellow-50",
  default: "bg-gradient-to-b from-blue-600 to-blue-800 text-blue-50",
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        toastClassName={({ type }) =>
          `${
            contextClass[type || "default"]
          } relative flex p-1 mb-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-md`
        }
        bodyClassName={() => "text-sm block p-3 overflow-hidden"}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
