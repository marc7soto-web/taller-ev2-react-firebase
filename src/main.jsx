import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Se habilita el sistema de rutas para toda la aplicación. */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);