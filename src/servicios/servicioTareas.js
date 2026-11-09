import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { baseDatos, funciones } from "./firebase";

const nombreColeccion = "tareas";
const referenciaTareas = collection(baseDatos, nombreColeccion);

const agregarTarea = async (tarea) => {
    // Se agrega la tarea y Firestore genera automáticamente su identificador.
    const referenciaDocumento = await addDoc(referenciaTareas, {
        nombre: tarea.nombre.trim(),
        fechaLimite: tarea.fechaLimite,
        prioridadSugerida: tarea.prioridadSugerida,
        datoAdicional: tarea.datoAdicional,
        creadoEn: serverTimestamp(),
    });

    return referenciaDocumento.id;
};

const observarTareas = (alRecibirTareas, alOcurrirError) => {
    // Se ordenan las tareas desde el registro más reciente.
    const consultaTareas = query(
        referenciaTareas,
        orderBy("creadoEn", "desc")
    );

    // Se mantiene una escucha activa para actualizar automáticamente la lista.
    const cancelarObservacion = onSnapshot(
        consultaTareas,
        (resultadoConsulta) => {
            const tareas = resultadoConsulta.docs.map((documento) => ({
                id: documento.id,
                ...documento.data(),
            }));

            alRecibirTareas(tareas);
        },
        (error) => {
            alOcurrirError(error);
        }
    );

    return cancelarObservacion;
};

const eliminarTarea = async (identificadorTarea) => {
    // Se obtiene una referencia a la función que eliminará la tarea.
    const funcionEliminarTarea = httpsCallable(
        funciones,
        "eliminarTarea"
    );

    // Se invoca la función enviando el identificador de la tarea.
    const respuesta = await funcionEliminarTarea({
        identificadorTarea,
    });

    return respuesta.data;
};

export {
    agregarTarea,
    observarTareas,
    eliminarTarea,
};