const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.eliminarProyecto = onCall(
    {region: "southamerica-east1"},
    async (solicitud) => {
      const identificadorProyecto = solicitud.data &&
        solicitud.data.identificadorProyecto;

      // Se comprueba que se haya enviado un identificador válido.
      if (
        !identificadorProyecto ||
        typeof identificadorProyecto !== "string"
      ) {
        throw new HttpsError(
            "invalid-argument",
            "Se debe proporcionar un identificador de proyecto válido.",
        );
      }

      try {
        const referenciaProyecto = getFirestore()
            .collection("proyectos")
            .doc(identificadorProyecto);

        const documentoProyecto =
          await referenciaProyecto.get();

        // Se comprueba que el proyecto exista antes de eliminarlo.
        if (!documentoProyecto.exists) {
          throw new HttpsError(
              "not-found",
              "El proyecto solicitado no existe.",
          );
        }

        // Se elimina el proyecto desde Firestore.
        await referenciaProyecto.delete();

        return {
          eliminado: true,
          identificadorProyecto,
          mensaje: "El proyecto fue eliminado correctamente.",
        };
      } catch (error) {
        if (error instanceof HttpsError) {
          throw error;
        }

        console.error(
            "No se pudo eliminar el proyecto:",
            error,
        );

        throw new HttpsError(
            "internal",
            "No se pudo eliminar el proyecto.",
        );
      }
    },
);

exports.eliminarTarea = onCall(
    {region: "southamerica-east1"},
    async (solicitud) => {
      const identificadorTarea = solicitud.data &&
        solicitud.data.identificadorTarea;

      // Se comprueba que se haya enviado un identificador válido.
      if (
        !identificadorTarea ||
        typeof identificadorTarea !== "string"
      ) {
        throw new HttpsError(
            "invalid-argument",
            "Se debe proporcionar un identificador de tarea válido.",
        );
      }

      try {
        const referenciaTarea = getFirestore()
            .collection("tareas")
            .doc(identificadorTarea);

        const documentoTarea =
          await referenciaTarea.get();

        // Se comprueba que la tarea exista antes de eliminarla.
        if (!documentoTarea.exists) {
          throw new HttpsError(
              "not-found",
              "La tarea solicitada no existe.",
          );
        }

        // Se elimina la tarea desde Firestore.
        await referenciaTarea.delete();

        return {
          eliminada: true,
          identificadorTarea,
          mensaje: "La tarea fue eliminada correctamente.",
        };
      } catch (error) {
        if (error instanceof HttpsError) {
          throw error;
        }

        console.error(
            "No se pudo eliminar la tarea:",
            error,
        );

        throw new HttpsError(
            "internal",
            "No se pudo eliminar la tarea.",
        );
      }
    },
);
