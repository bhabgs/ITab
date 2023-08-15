import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import zhCn from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCn}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
