import React from "react";

function ElementoProyecto({
    proyecto,
    alEditar,
    alEliminar,
    eliminando,
}) {
    const tituloSugerido =
        proyecto.datoAdicional?.tituloSugerido ??
        "No se obtuvo información adicional.";

    const identificadorExterno =
        proyecto.datoAdicional?.identificadorExterno ?? "No disponible";

    const solicitarEdicion = () => {
        // Se solicita editar el proyecto seleccionado.
        alEditar(proyecto);
    };

    const solicitarEliminacion = () => {
        // Se solicita a la página principal eliminar el proyecto seleccionado.
        alEliminar(proyecto.id, proyecto.nombre);
    };

    return (
        <React.Fragment>
            {/* Se utiliza React.Fragment para evitar nodos innecesarios. */}
            <article className="tarjeta-proyecto">
                <div className="tarjeta-proyecto__encabezado">
                    <div>
                        <p className="tarjeta-proyecto__etiqueta">
                            Proyecto registrado
                        </p>

                        <h4>{proyecto.nombre}</h4>
                    </div>
                </div>

                <div className="tarjeta-proyecto__contenido">
                    <div className="tarjeta-proyecto__seccion">
                        <h5>Descripción</h5>
                        <p>{proyecto.descripcion}</p>
                    </div>

                    <div className="tarjeta-proyecto__seccion">
                        <h5>Información obtenida mediante Axios</h5>

                        <dl className="datos-externos">
                            <div>
                                <dt>Identificador externo</dt>
                                <dd>{identificadorExterno}</dd>
                            </div>

                            <div>
                                <dt>Título sugerido</dt>
                                <dd>{tituloSugerido}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="tarjeta-proyecto__acciones">
                        <button
                            className="boton boton--editar"
                            type="button"
                            disabled={eliminando}
                            onClick={solicitarEdicion}
                        >
                            Editar proyecto
                        </button>

                        <button
                            className="boton boton--peligro"
                            type="button"
                            disabled={eliminando}
                            onClick={solicitarEliminacion}
                        >
                            {eliminando
                                ? "Eliminando..."
                                : "Eliminar proyecto"}
                        </button>
                    </div>
                </div>
            </article>
        </React.Fragment>
    );
}

export default ElementoProyecto;