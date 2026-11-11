import { useEffect, useState } from "react";
import FormularioProyecto from "../Componentes/Proyectos/FormularioProyecto";
import ListaProyectos from "../Componentes/Proyectos/ListaProyectos";
import {
    eliminarProyecto,
    observarProyectos,
} from "../servicios/servicioProyectos";

function PaginaProyectos() {
    const [proyectos, establecerProyectos] = useState([]);
    const [mostrarFormulario, establecerMostrarFormulario] = useState(false);
    const [proyectoEditando, establecerProyectoEditando] = useState(null);
    const [cargando, establecerCargando] = useState(true);
    const [mensajePagina, establecerMensajePagina] = useState("");
    const [mensajeError, establecerMensajeError] = useState("");
    const [
        identificadorEliminando,
        establecerIdentificadorEliminando,
    ] = useState("");

    useEffect(() => {
        // Se mantiene una escucha activa sobre la colección de proyectos.
        const cancelarObservacion = observarProyectos(
            (proyectosRecibidos) => {
                establecerProyectos(proyectosRecibidos);
                establecerCargando(false);
                establecerMensajeError("");
            },
            (error) => {
                console.error(
                    "No se pudieron cargar los proyectos:",
                    error
                );

                establecerCargando(false);

                establecerMensajeError(
                    "No se pudieron cargar los proyectos desde Firestore."
                );
            }
        );

        // Se cancela la escucha cuando el componente deja de utilizarse.
        return () => {
            cancelarObservacion();
        };
    }, []);

    const abrirFormulario = () => {
        // Se abre un formulario vacío para agregar un proyecto.
        establecerProyectoEditando(null);
        establecerMostrarFormulario(true);
        establecerMensajePagina("");
        establecerMensajeError("");
    };

    const cerrarFormulario = () => {
        // Se cierra el formulario y se cancela cualquier edición.
        establecerMostrarFormulario(false);
        establecerProyectoEditando(null);
        establecerMensajePagina("");
    };

    const abrirEdicion = (proyecto) => {
        // Se abre el formulario con los datos del proyecto seleccionado.
        establecerProyectoEditando(proyecto);
        establecerMostrarFormulario(true);
        establecerMensajePagina("");
        establecerMensajeError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const manejarProyectoGuardado = (operacion) => {
        // Se cierra el formulario después de agregar o actualizar.
        establecerMostrarFormulario(false);
        establecerProyectoEditando(null);
        establecerMensajeError("");

        if (operacion === "actualizado") {
            establecerMensajePagina(
                "El proyecto fue actualizado correctamente."
            );
            return;
        }

        establecerMensajePagina(
            "El proyecto fue agregado correctamente."
        );
    };

    const manejarEliminacion = async (
        identificadorProyecto,
        nombreProyecto
    ) => {
        const confirmacion = window.confirm(
            `¿Deseas eliminar el proyecto "${nombreProyecto}"?`
        );

        if (!confirmacion) {
            return;
        }

        try {
            establecerIdentificadorEliminando(
                identificadorProyecto
            );

            establecerMensajePagina("");
            establecerMensajeError("");

            // Se invoca Firebase Function para eliminar el proyecto.
            await eliminarProyecto(identificadorProyecto);

            establecerMensajePagina(
                "El proyecto fue eliminado correctamente."
            );
        } catch (error) {
            console.error(
                "No se pudo eliminar el proyecto:",
                error
            );

            establecerMensajeError(
                "No se pudo eliminar el proyecto mediante Firebase Functions."
            );
        } finally {
            establecerIdentificadorEliminando("");
        }
    };

    return (
        <section className="pagina">
            <header className="pagina__encabezado">
                <p className="pagina__etiqueta">
                    Caso N.º 1
                </p>

                <h2>Gestión de proyectos</h2>

                <p>
                    Agrega, visualiza, modifica y elimina proyectos
                    almacenados en Firebase Firestore.
                </p>
            </header>

            <div className="pagina__contenido">
                <div className="seccion-acciones">
                    <div>
                        <h3>Proyectos registrados</h3>

                        <p>
                            Administra los proyectos guardados en la base
                            de datos.
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

                {mensajeError && (
                    <p
                        className="mensaje-error"
                        role="alert"
                    >
                        {mensajeError}
                    </p>
                )}

                {mostrarFormulario && (
                    <FormularioProyecto
                        key={proyectoEditando?.id ?? "nuevo"}
                        proyectoEditando={proyectoEditando}
                        alCancelar={cerrarFormulario}
                        alGuardar={manejarProyectoGuardado}
                    />
                )}

                <div className="seccion-listado">
                    {cargando ? (
                        <p
                            className="mensaje-carga"
                            role="status"
                            aria-live="polite"
                        >
                            Cargando proyectos...
                        </p>
                    ) : proyectos.length === 0 ? (
                        <p className="mensaje-vacio">
                            No hay proyectos.
                        </p>
                    ) : (
                        <ListaProyectos
                            proyectos={proyectos}
                            alEditar={abrirEdicion}
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

export default PaginaProyectos;