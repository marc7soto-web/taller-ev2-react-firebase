import { useEffect, useState } from "react";
import FormularioTarea from "../Componentes/Tareas/FormularioTarea";
import ListaTareas from "../Componentes/Tareas/ListaTareas";
import {
    eliminarTarea,
    observarTareas,
} from "../servicios/servicioTareas";

function PaginaTareas() {
    const [tareas, establecerTareas] = useState([]);
    const [mostrarFormulario, establecerMostrarFormulario] = useState(false);
    const [cargando, establecerCargando] = useState(true);
    const [mensajePagina, establecerMensajePagina] = useState("");
    const [mensajeError, establecerMensajeError] = useState("");
    const [
        identificadorEliminando,
        establecerIdentificadorEliminando,
    ] = useState("");

    useEffect(() => {
        // Se mantiene una escucha activa sobre la colección de tareas.
        const cancelarObservacion = observarTareas(
            (tareasRecibidas) => {
                establecerTareas(tareasRecibidas);
                establecerCargando(false);
                establecerMensajeError("");
            },
            (error) => {
                console.error(
                    "No se pudieron cargar las tareas:",
                    error
                );

                establecerCargando(false);

                establecerMensajeError(
                    "No se pudieron cargar las tareas desde Firestore."
                );
            }
        );

        // Se cancela la escucha cuando el componente deja de utilizarse.
        return () => {
            cancelarObservacion();
        };
    }, []);

    const abrirFormulario = () => {
        // Se muestra el formulario para agregar una nueva tarea.
        establecerMostrarFormulario(true);
        establecerMensajePagina("");
        establecerMensajeError("");
    };

    const cerrarFormulario = () => {
        // Se oculta el formulario cuando se cancela la operación.
        establecerMostrarFormulario(false);
        establecerMensajePagina("");
    };

    const manejarTareaGuardada = () => {
        // Se oculta el formulario y se informa que la tarea fue guardada.
        establecerMostrarFormulario(false);
        establecerMensajePagina(
            "La tarea fue agregada correctamente."
        );
        establecerMensajeError("");
    };

    const manejarEliminacion = async (
        identificadorTarea,
        nombreTarea
    ) => {
        const confirmacion = window.confirm(
            `¿Deseas eliminar la tarea "${nombreTarea}"?`
        );

        if (!confirmacion) {
            return;
        }

        try {
            establecerIdentificadorEliminando(identificadorTarea);
            establecerMensajePagina("");
            establecerMensajeError("");

            // Se invoca Firebase Function para eliminar la tarea.
            await eliminarTarea(identificadorTarea);

            establecerMensajePagina(
                "La tarea fue eliminada correctamente."
            );
        } catch (error) {
            console.error(
                "No se pudo eliminar la tarea:",
                error
            );

            establecerMensajeError(
                "No se pudo eliminar la tarea mediante Firebase Functions."
            );
        } finally {
            establecerIdentificadorEliminando("");
        }
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

                {mensajeError && (
                    <p
                        className="mensaje-error"
                        role="alert"
                    >
                        {mensajeError}
                    </p>
                )}

                {mostrarFormulario && (
                    <FormularioTarea
                        alCancelar={cerrarFormulario}
                        alGuardar={manejarTareaGuardada}
                    />
                )}

                <div className="seccion-listado">
                    {cargando ? (
                        <p
                            className="mensaje-carga"
                            role="status"
                            aria-live="polite"
                        >
                            Cargando tareas...
                        </p>
                    ) : tareas.length === 0 ? (
                        <p className="mensaje-vacio">
                            No hay tareas pendientes.
                        </p>
                    ) : (
                        <ListaTareas
                            tareas={tareas}
                            alEliminar={manejarEliminacion}
                            identificadorEliminando={
                                identificadorEliminando
                            }
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default PaginaTareas;