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

const nombreColeccion = "proyectos";
const referenciaProyectos = collection(baseDatos, nombreColeccion);

const agregarProyecto = async (proyecto) => {
    // Se agrega el proyecto y Firestore genera automáticamente su identificador.
    const referenciaDocumento = await addDoc(referenciaProyectos, {
        nombre: proyecto.nombre.trim(),
        descripcion: proyecto.descripcion.trim(),
        datoAdicional: proyecto.datoAdicional,
        creadoEn: serverTimestamp(),
    });

    return referenciaDocumento.id;
};

const observarProyectos = (alRecibirProyectos, alOcurrirError) => {
    // Se ordenan los proyectos desde el registro más reciente.
    const consultaProyectos = query(
        referenciaProyectos,
        orderBy("creadoEn", "desc")
    );

    // Se mantiene una escucha para actualizar automáticamente la lista.
    const cancelarObservacion = onSnapshot(
        consultaProyectos,
        (resultadoConsulta) => {
            const proyectos = resultadoConsulta.docs.map((documento) => ({
                id: documento.id,
                ...documento.data(),
            }));

            alRecibirProyectos(proyectos);
        },
        (error) => {
            alOcurrirError(error);
        }
    );

    return cancelarObservacion;
};

const eliminarProyecto = async (identificadorProyecto) => {
    // Se obtiene una referencia a la función desplegada en Firebase.
    const funcionEliminarProyecto = httpsCallable(
        funciones,
        "eliminarProyecto"
    );

    // Se invoca la función enviando el identificador del proyecto.
    const respuesta = await funcionEliminarProyecto({
        identificadorProyecto,
    });

    return respuesta.data;
};

export {
    agregarProyecto,
    observarProyectos,
    eliminarProyecto,
};