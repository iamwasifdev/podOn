import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/query-client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.21 0.015 285)",
            color: "oklch(0.985 0 0)",
            border: "1px solid oklch(1 0 0 / 8%)",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
