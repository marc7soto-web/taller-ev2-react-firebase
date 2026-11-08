import { useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { agregarProyecto } from "../../servicios/servicioProyectos";

function FormularioProyecto({ alCancelar, alGuardar }) {
    const [nombre, establecerNombre] = useState("");
    const [descripcion, establecerDescripcion] = useState("");
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

    const limpiarFormulario = () => {
        // Se restablecen los campos después de guardar correctamente
        establecerNombre("");
        establecerDescripcion("");
        validador.hideMessages();
        forzarActualizacion((valorActual) => valorActual + 1);
    };

    const obtenerDatoAdicional = async () => {
        // Se consulta una API simulada antes de guardar el proyecto
        const respuesta = await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        // Se seleccionan datos específicos de la respuesta para complementar el proyecto
        return {
            identificadorExterno: respuesta.data.id,
            tituloSugerido: respuesta.data.title,
        };
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        establecerMensajeEstado("");

        if (!validador.allValid()) {
            // Se muestran los mensajes cuando el formulario no cumple las reglas de validación.
            validador.showMessages();
            forzarActualizacion((valorActual) => valorActual + 1);
            return;
        }

        try {
            establecerGuardando(true);

            // Se obtiene información externa mediante Axios antes de guardar el proyecto.
            const datoAdicional = await obtenerDatoAdicional();

            // Se guarda el proyecto junto con la información obtenida de la API
            const identificadorProyecto = await agregarProyecto({
                nombre,
                descripcion,
                datoAdicional,
            });

            establecerMensajeEstado("El proyecto se guardó correctamente.");
            limpiarFormulario();

            if (alGuardar) {
                alGuardar(identificadorProyecto);
            }
        } catch (error) {
            console.error("No se pudo guardar el proyecto:", error);
            establecerMensajeEstado(
                "No se pudo guardar el proyecto. Inténtalo nuevamente."
            );
        } finally {
            establecerGuardando(false);
        }
    };

    return (
        <form className="formulario" onSubmit={manejarEnvio} noValidate>
            <div className="formulario__encabezado">
                <h3>Agregar proyecto</h3>
                <p>
                    Completa los datos requeridos para registrar un nuevo
                    proyecto.
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
                        validador.showMessageFor("nombre del proyecto");
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
                    {guardando ? "Guardando..." : "Guardar proyecto"}
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