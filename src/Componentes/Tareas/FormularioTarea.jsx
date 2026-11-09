import { useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { agregarTarea } from "../../servicios/servicioTareas";

function FormularioTarea({ alCancelar, alGuardar }) {
    const [nombre, establecerNombre] = useState("");
    const [fechaLimite, establecerFechaLimite] = useState("");
    const [guardando, establecerGuardando] = useState(false);
    const [mensajeEstado, establecerMensajeEstado] = useState("");
    const [, forzarActualizacion] = useState(0);

    const [validador] = useState(
        () =>
            new SimpleReactValidator({
                className: "mensaje-validacion",
                messages: {
                    required: "El campo :attribute es obligatorio.",
                },
                validators: {
                    fechaValida: {
                        message:
                            "El campo :attribute debe contener una fecha válida.",
                        rule: (valor) => {
                            if (!valor) {
                                return false;
                            }

                            const patronFecha = /^\d{4}-\d{2}-\d{2}$/;

                            if (!patronFecha.test(valor)) {
                                return false;
                            }

                            const partesFecha = valor
                                .split("-")
                                .map(Number);

                            const anio = partesFecha[0];
                            const mes = partesFecha[1];
                            const dia = partesFecha[2];

                            const fecha = new Date(
                                Date.UTC(anio, mes - 1, dia)
                            );

                            return (
                                fecha.getUTCFullYear() === anio &&
                                fecha.getUTCMonth() === mes - 1 &&
                                fecha.getUTCDate() === dia
                            );
                        },
                    },
                },
            })
    );

    const limpiarFormulario = () => {
        // Se restablecen los campos después de guardar correctamente.
        establecerNombre("");
        establecerFechaLimite("");
        validador.hideMessages();
        forzarActualizacion((valorActual) => valorActual + 1);
    };

    const obtenerPrioridadSugerida = async () => {
        // Se consulta una API simulada antes de guardar la tarea.
        const respuesta = await axios.get(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        // Se determina una prioridad simulada según el estado externo.
        const prioridadSugerida = respuesta.data.completed
            ? "Baja"
            : "Alta";

        return {
            prioridadSugerida,
            datoAdicional: {
                identificadorExterno: respuesta.data.id,
                tituloExterno: respuesta.data.title,
                completadaExternamente: respuesta.data.completed,
            },
        };
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        establecerMensajeEstado("");

        if (!validador.allValid()) {
            // Se muestran los mensajes cuando el formulario no es válido.
            validador.showMessages();
            forzarActualizacion((valorActual) => valorActual + 1);
            return;
        }

        try {
            establecerGuardando(true);

            // Se obtiene una prioridad sugerida mediante Axios.
            const informacionExterna =
                await obtenerPrioridadSugerida();

            // Se guarda la tarea junto con la información externa.
            const identificadorTarea = await agregarTarea({
                nombre,
                fechaLimite,
                prioridadSugerida:
                    informacionExterna.prioridadSugerida,
                datoAdicional:
                    informacionExterna.datoAdicional,
            });

            establecerMensajeEstado(
                "La tarea se guardó correctamente."
            );

            limpiarFormulario();

            if (alGuardar) {
                alGuardar(identificadorTarea);
            }
        } catch (error) {
            console.error(
                "No se pudo guardar la tarea:",
                error
            );

            establecerMensajeEstado(
                "No se pudo guardar la tarea. Inténtalo nuevamente."
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
                <h3>Agregar tarea</h3>

                <p>
                    Completa los datos requeridos para registrar una nueva
                    tarea.
                </p>
            </div>

            <div className="formulario__grupo">
                <label htmlFor="nombreTarea">
                    Nombre de la tarea
                    <span aria-hidden="true"> *</span>
                </label>

                <input
                    id="nombreTarea"
                    name="nombreTarea"
                    type="text"
                    value={nombre}
                    placeholder="Ejemplo: Preparar informe mensual"
                    disabled={guardando}
                    onChange={(evento) =>
                        establecerNombre(evento.target.value)
                    }
                    onBlur={() => {
                        validador.showMessageFor(
                            "nombre de la tarea"
                        );

                        forzarActualizacion(
                            (valorActual) => valorActual + 1
                        );
                    }}
                />

                {validador.message(
                    "nombre de la tarea",
                    nombre,
                    "required"
                )}
            </div>

            <div className="formulario__grupo">
                <label htmlFor="fechaLimiteTarea">
                    Fecha límite
                    <span aria-hidden="true"> *</span>
                </label>

                <input
                    id="fechaLimiteTarea"
                    name="fechaLimiteTarea"
                    type="date"
                    value={fechaLimite}
                    disabled={guardando}
                    onChange={(evento) =>
                        establecerFechaLimite(evento.target.value)
                    }
                    onBlur={() => {
                        validador.showMessageFor("fecha límite");

                        forzarActualizacion(
                            (valorActual) => valorActual + 1
                        );
                    }}
                />

                {validador.message(
                    "fecha límite",
                    fechaLimite,
                    "required|fechaValida"
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
                        ? "Guardando..."
                        : "Guardar tarea"}
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

export default FormularioTarea;