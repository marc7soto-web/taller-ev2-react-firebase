import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import PaginaProyectos from "./paginas/PaginaProyectos";
import PaginaTareas from "./paginas/PaginaTareas";

function App() {
    return (
        <div className="aplicacion">
            {/* Se presenta el encabezado general de la aplicación. */}
            <header className="encabezado-principal">
                <div className="encabezado-principal__contenido">
                    <p className="encabezado-principal__etiqueta">
                        Evaluación Unidad N.º 2
                    </p>

                    <h1>Gestor de proyectos y tareas</h1>

                    <p>
                        Aplicación desarrollada con React, Firebase Firestore,
                        Firebase Functions, Axios y Simple React Validator.
                    </p>
                </div>
            </header>

            {/* Se permite la navegación entre los dos casos del taller. */}
            <nav
                className="navegacion-principal"
                aria-label="Navegación principal"
            >
                <NavLink
                    to="/proyectos"
                    className={({ isActive }) =>
                        isActive
                            ? "navegacion-principal__enlace navegacion-principal__enlace--activo"
                            : "navegacion-principal__enlace"
                    }
                >
                    Proyectos
                </NavLink>

                <NavLink
                    to="/tareas"
                    className={({ isActive }) =>
                        isActive
                            ? "navegacion-principal__enlace navegacion-principal__enlace--activo"
                            : "navegacion-principal__enlace"
                    }
                >
                    Tareas
                </NavLink>
            </nav>

            {/* Se renderiza la página correspondiente a la dirección seleccionada. */}
            <main className="contenido-principal">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/proyectos" replace />}
                    />
                    <Route
                        path="/proyectos"
                        element={<PaginaProyectos />}
                    />
                    <Route
                        path="/tareas"
                        element={<PaginaTareas />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/proyectos" replace />}
                    />
                </Routes>
            </main>

            {/* Se presenta información general al final de la aplicación. */}
            <footer className="pie-pagina">
                <p>Taller de Programación de Componentes con React</p>
            </footer>
        </div>
    );
}

export default App;