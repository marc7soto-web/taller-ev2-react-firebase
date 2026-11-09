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
            "Se debe proporcionar un identificador válido.",
        );
      }

      try {
        const referenciaProyecto = getFirestore()
            .collection("proyectos")
            .doc(identificadorProyecto);

        const documentoProyecto =
          await referenciaProyecto.get();

        // Se comprueba que el documento exista antes de eliminarlo.
        if (!documentoProyecto.exists) {
          throw new HttpsError(
              "not-found",
              "El proyecto solicitado no existe.",
          );
        }

        // Se elimina el documento desde Firestore.
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
