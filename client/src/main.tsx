import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        visibleToasts={1}
        richColors={false}
        position="top-center"
        toastOptions={{
          classNames: {
            default: "!rounded-3xl !backdrop-blur !bg-muted/50 !mx-auto ",
            toast: "!w-fit !left-0 !right-0",
          },
        }}
        icons={{
          error: <div className="size-2.5 rounded-full bg-red-400" />,
          success: <div className="size-2.5 rounded-full bg-green-400" />,
          info: <div className="size-2.5 rounded-full bg-blue-400" />,
          warning: <div className="size-2.5 rounded-full bg-yellow-400" />,
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
