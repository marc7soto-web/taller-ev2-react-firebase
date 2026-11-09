import { useState } from "react";
import FormularioTarea from "../Componentes/Tareas/FormularioTarea";

function PaginaTareas() {
    const [mostrarFormulario, establecerMostrarFormulario] = useState(false);
    const [mensajePagina, establecerMensajePagina] = useState("");

    const abrirFormulario = () => {
        // Se muestra el formulario cuando se solicita agregar una tarea.
        establecerMostrarFormulario(true);
        establecerMensajePagina("");
    };

    const cerrarFormulario = () => {
        // Se oculta el formulario cuando se cancela la operación.
        establecerMostrarFormulario(false);
        establecerMensajePagina("");
    };

    const manejarTareaGuardada = () => {
        // Se oculta el formulario y se informa que la tarea fue guardada.
        establecerMostrarFormulario(false);
        establecerMensajePagina("La tarea fue agregada correctamente.");
    };

    return (
        <section className="pagina">
            <header className="pagina__encabezado">
                <p className="pagina__etiqueta">Caso N.º 2</p>

                <h2>Gestión de tareas</h2>

                <p>
                    Agrega, visualiza y elimina tareas almacenadas en
                    Firebase Firestore.
                </p>
            </header>

            <div className="pagina__contenido">
                <div className="seccion-acciones">
                    <div>
                        <h3>Tareas registradas</h3>

                        <p>
                            Administra las tareas pendientes guardadas en la
                            base de datos.
                        </p>
                    </div>

                    {!mostrarFormulario && (
                        <button
                            className="boton boton--primario"
                            type="button"
                            onClick={abrirFormulario}
                        >
                            Agregar tarea
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
                    <FormularioTarea
                        alCancelar={cerrarFormulario}
                        alGuardar={manejarTareaGuardada}
                    />
                )}

                <div className="seccion-listado">
                    <p className="mensaje-vacio">
                        No hay tareas pendientes.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PaginaTareas;