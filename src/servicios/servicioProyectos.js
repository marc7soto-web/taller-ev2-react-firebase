import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { baseDatos } from "./firebase";

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
    // Se ordenan los proyectos desde el registro más reciente al más antiguo.
    const consultaProyectos = query(
        referenciaProyectos,
        orderBy("creadoEn", "desc")
    );

    // Se mantiene una escucha activa para reflejar automáticamente los cambios.
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

export { agregarProyecto, observarProyectos };