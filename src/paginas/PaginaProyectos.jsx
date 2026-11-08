import { useState } from "react";
import FormularioProyecto from "../Componentes/Proyectos/FormularioProyecto";

function PaginaProyectos() {
    const [mostrarFormulario, establecerMostrarFormulario] = useState(false);
    const [mensajePagina, establecerMensajePagina] = useState("");

    const abrirFormulario = () => {
        // Se muestra el formulario cuando se solicita agregar un proyecto.
        establecerMostrarFormulario(true);
        establecerMensajePagina("");
    };

    const cerrarFormulario = () => {
        // Se oculta el formulario cuando se cancela la operación.
        establecerMostrarFormulario(false);
        establecerMensajePagina("");
    };

    const manejarProyectoGuardado = () => {
        // Se oculta el formulario y se informa que el proyecto fue guardado.
        establecerMostrarFormulario(false);
        establecerMensajePagina("El proyecto fue agregado correctamente.");
    };

    return (
        <section className="pagina">
            <header className="pagina__encabezado">
                <p className="pagina__etiqueta">Caso N.º 1</p>

                <h2>Gestión de proyectos</h2>

                <p>
                    Agrega, visualiza y elimina proyectos almacenados en
                    Firebase Firestore.
                </p>
            </header>

            <div className="pagina__contenido">
                <div className="seccion-acciones">
                    <div>
                        <h3>Proyectos registrados</h3>

                        <p>
                            Administra los proyectos guardados en la base de
                            datos.
                        </p>
                    </div>

                    {!mostrarFormulario && (
                        <button
                            className="boton boton--primario"
                            type="button"
                            onClick={abrirFormulario}
                        >
                            Agregar proyecto
                        </button>
                    )}
                </div>

                {mensajePagina && (
                    <p
                        className="mensaje-exito"
                        role="status"
                        aria-live="polite"
                    >
                        {mensajePagina}
                    </p>
                )}

                {mostrarFormulario && (
                    <FormularioProyecto
                        alCancelar={cerrarFormulario}
                        alGuardar={manejarProyectoGuardado}
                    />
                )}

                <div className="seccion-listado">
                    <p className="mensaje-vacio">No hay proyectos.</p>
                </div>
            </div>
        </section>
    );
}

export default PaginaProyectos;