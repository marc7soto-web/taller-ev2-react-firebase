import React from "react";

function ElementoTarea({
    tarea,
    alEliminar,
    eliminando,
}) {
    const prioridadSugerida =
        tarea.prioridadSugerida ?? "No disponible";

    const identificadorExterno =
        tarea.datoAdicional?.identificadorExterno ??
        "No disponible";

    const tituloExterno =
        tarea.datoAdicional?.tituloExterno ??
        "No se obtuvo información adicional.";

    const formatearFecha = (fecha) => {
        // Se divide la fecha para evitar cambios causados por la zona horaria.
        const partesFecha = fecha.split("-");

        if (partesFecha.length !== 3) {
            return fecha;
        }

        return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;
    };

    const solicitarEliminacion = () => {
        // Se solicita eliminar la tarea seleccionada.
        alEliminar(tarea.id, tarea.nombre);
    };

    return (
        <React.Fragment>
            {/* Se utiliza React.Fragment para no agregar nodos innecesarios. */}
            <article className="tarjeta-tarea">
                <div className="tarjeta-tarea__encabezado">
                    <div>
                        <p className="tarjeta-tarea__etiqueta">
                            Tarea registrada
                        </p>

                        <h4>{tarea.nombre}</h4>
                    </div>

                    <span
                        className={`prioridad prioridad--${prioridadSugerida.toLowerCase()}`}
                    >
                        Prioridad {prioridadSugerida}
                    </span>
                </div>

                <div className="tarjeta-tarea__contenido">
                    <div className="tarjeta-tarea__seccion">
                        <h5>Fecha límite</h5>

                        <p>
                            {formatearFecha(tarea.fechaLimite)}
                        </p>
                    </div>

                    <div className="tarjeta-tarea__seccion">
                        <h5>Información obtenida mediante Axios</h5>

                        <dl className="datos-externos">
                            <div>
                                <dt>Identificador externo</dt>
                                <dd>{identificadorExterno}</dd>
                            </div>

                            <div>
                                <dt>Título externo</dt>
                                <dd>{tituloExterno}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="tarjeta-tarea__acciones">
                        <button
                            className="boton boton--peligro"
                            type="button"
                            disabled={eliminando}
                            onClick={solicitarEliminacion}
                        >
                            {eliminando
                                ? "Eliminando..."
                                : "Eliminar tarea"}
                        </button>
                    </div>
                </div>
            </article>
        </React.Fragment>
    );
}

export default ElementoTarea;