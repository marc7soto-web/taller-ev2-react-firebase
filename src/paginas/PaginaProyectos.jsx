function PaginaProyectos() {
    return (
        <section className="pagina">
            {/* Se presenta el encabezado principal del Caso N.º 1. */}
            <header className="pagina__encabezado">
                <p className="pagina__etiqueta">Caso N.º 1</p>
                <h2>Gestión de proyectos</h2>
                <p>
                    Aqui se agregaran, visualizar y eliminar
                    proyectos almacenados en Firebase Firestore.
                </p>
            </header>

            {/* Se incorporarán posteriormente el formulario y la lista de proyectos. */}
            <div className="pagina__contenido">
                <p>El módulo de proyectos está preparado para su desarrollo.</p>
            </div>
        </section>
    );
}

export default PaginaProyectos;