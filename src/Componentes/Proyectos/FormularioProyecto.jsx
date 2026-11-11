import { useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import {
    actualizarProyecto,
    agregarProyecto,
} from "../../servicios/servicioProyectos";

function FormularioProyecto({
    proyectoEditando,
    alCancelar,
    alGuardar,
}) {
    const [nombre, establecerNombre] = useState(
        () => proyectoEditando?.nombre ?? ""
    );

    const [descripcion, establecerDescripcion] = useState(
        () => proyectoEditando?.descripcion ?? ""
    );
    const [guardando, establecerGuardando] = useState(false);
    const [mensajeEstado, establecerMensajeEstado] = useState("");
    const [, forzarActualizacion] = useState(0);

    const [validador] = useState(
        () =>
            new SimpleReactValidator({
                className: "mensaje-validacion",
                messages: {
                    required: "El campo :attribute es obligatorio.",
                    min: "El campo :attribute debe tener al menos :min caracteres.",
                },
            })
    );

    const esEdicion = Boolean(proyectoEditando);

    const limpiarFormulario = () => {
        // Se restablecen los campos después de guardar correctamente.
        establecerNombre("");
        establecerDescripcion("");
        validador.hideMessages();
        forzarActualizacion((valorActual) => valorActual + 1);
    };

    const obtenerDatoAdicional = async () => {
        // Se consulta una API simulada antes de guardar un proyecto nuevo.
        const respuesta = await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        // Se seleccionan datos específicos para complementar el proyecto.
        return {
            identificadorExterno: respuesta.data.id,
            tituloSugerido: respuesta.data.title,
        };
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        establecerMensajeEstado("");

        if (!validador.allValid()) {
            // Se muestran los mensajes cuando el formulario no es válido.
            validador.showMessages();
            forzarActualizacion(
                (valorActual) => valorActual + 1
            );
            return;
        }

        try {
            establecerGuardando(true);

            if (esEdicion) {
                // Se actualiza el proyecto existente en Firestore.
                await actualizarProyecto(
                    proyectoEditando.id,
                    {
                        nombre,
                        descripcion,
                    }
                );

                establecerMensajeEstado(
                    "El proyecto se actualizó correctamente."
                );

                if (alGuardar) {
                    alGuardar("actualizado");
                }

                return;
            }

            // Se obtiene información externa antes de crear el proyecto.
            const datoAdicional = await obtenerDatoAdicional();

            // Se guarda un proyecto nuevo en Firestore.
            const identificadorProyecto = await agregarProyecto({
                nombre,
                descripcion,
                datoAdicional,
            });

            establecerMensajeEstado(
                "El proyecto se guardó correctamente."
            );

            limpiarFormulario();

            if (alGuardar) {
                alGuardar(
                    "agregado",
                    identificadorProyecto
                );
            }
        } catch (error) {
            console.error(
                "No se pudo guardar el proyecto:",
                error
            );

            establecerMensajeEstado(
                esEdicion
                    ? "No se pudo actualizar el proyecto."
                    : "No se pudo guardar el proyecto."
            );
        } finally {
            establecerGuardando(false);
        }
    };

    return (
        <form
            className="formulario"
            onSubmit={manejarEnvio}
            noValidate
        >
            <div className="formulario__encabezado">
                <h3>
                    {esEdicion
                        ? "Editar proyecto"
                        : "Agregar proyecto"}
                </h3>

                <p>
                    {esEdicion
                        ? "Modifica los datos del proyecto seleccionado."
                        : "Completa los datos requeridos para registrar un nuevo proyecto."}
                </p>
            </div>

            <div className="formulario__grupo">
                <label htmlFor="nombreProyecto">
                    Nombre del proyecto
                    <span aria-hidden="true"> *</span>
                </label>

                <input
                    id="nombreProyecto"
                    name="nombreProyecto"
                    type="text"
                    value={nombre}
                    placeholder="Ejemplo: Sistema de inventario"
                    disabled={guardando}
                    onChange={(evento) =>
                        establecerNombre(evento.target.value)
                    }
                    onBlur={() => {
                        validador.showMessageFor(
                            "nombre del proyecto"
                        );

                        forzarActualizacion(
                            (valorActual) => valorActual + 1
                        );
                    }}
                />

                {validador.message(
                    "nombre del proyecto",
                    nombre,
                    "required"
                )}
            </div>

            <div className="formulario__grupo">
                <label htmlFor="descripcionProyecto">
                    Descripción
                    <span aria-hidden="true"> *</span>
                </label>

                <textarea
                    id="descripcionProyecto"
                    name="descripcionProyecto"
                    value={descripcion}
                    placeholder="Describe el propósito principal del proyecto"
                    rows="5"
                    disabled={guardando}
                    onChange={(evento) =>
                        establecerDescripcion(evento.target.value)
                    }
                    onBlur={() => {
                        validador.showMessageFor("descripción");

                        forzarActualizacion(
                            (valorActual) => valorActual + 1
                        );
                    }}
                />

                {validador.message(
                    "descripción",
                    descripcion,
                    "required|min:10"
                )}
            </div>

            {mensajeEstado && (
                <p
                    className="formulario__estado"
                    role="status"
                    aria-live="polite"
                >
                    {mensajeEstado}
                </p>
            )}

            <div className="formulario__acciones">
                <button
                    className="boton boton--primario"
                    type="submit"
                    disabled={guardando}
                >
                    {guardando
                        ? esEdicion
                            ? "Actualizando..."
                            : "Guardando..."
                        : esEdicion
                            ? "Actualizar proyecto"
                            : "Guardar proyecto"}
                </button>

                <button
                    className="boton boton--secundario"
                    type="button"
                    disabled={guardando}
                    onClick={alCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioProyecto;