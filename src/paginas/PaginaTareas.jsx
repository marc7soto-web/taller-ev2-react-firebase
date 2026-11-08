function PaginaTareas() {
    return (
        <section className="pagina">
            {/* Se presenta el encabezado principal del Caso N.º 2. */}
            <header className="pagina__encabezado">
                <p className="pagina__etiqueta">Caso N.º 2</p>
                <h2>Gestión de tareas</h2>
                <p>
                    En esta sección se agregaran tareas que podrán ser visualizadas y eliminadas
                    tareas almacenadas en Firebase Firestore.
                </p>
            </header>

            {/* Se incorporarán posteriormente el formulario y la lista de tareas. */}
            <div className="pagina__contenido">
                <p>El módulo de tareas está preparado para su desarrollo.</p>
            </div>
        </section>
    );
}

export default PaginaTareas;