import React from "react";

function ElementoProyecto({ proyecto }) {
    const tituloSugerido =
        proyecto.datoAdicional?.tituloSugerido ??
        "No se obtuvo información adicional.";

    const identificadorExterno =
        proyecto.datoAdicional?.identificadorExterno ?? "No disponible";

    return (
        <React.Fragment>
            {/* Se utiliza React.Fragment para evitar contenedores innecesarios. */}
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
                </div>
            </article>
        </React.Fragment>
    );
}

export default ElementoProyecto;