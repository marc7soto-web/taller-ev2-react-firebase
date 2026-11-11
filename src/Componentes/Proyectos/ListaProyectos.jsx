import ElementoProyecto from "./ElementoProyecto";

function ListaProyectos({
    proyectos,
    alEditar,
    alEliminar,
    identificadorEliminando,
}) {
    return (
        <div className="lista-proyectos">
            {/* Se utiliza map para transformar cada proyecto en un componente. */}
            {proyectos.map((proyecto) => (
                <ElementoProyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                    alEditar={alEditar}
                    alEliminar={alEliminar}
                    eliminando={
                        identificadorEliminando === proyecto.id
                    }
                />
            ))}
        </div>
    );
}

export default ListaProyectos;