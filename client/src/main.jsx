import { createRoot } from "react-dom/client";
// styles
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </ToastProvider>
);
