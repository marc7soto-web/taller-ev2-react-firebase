import ElementoProyecto from "./ElementoProyecto";

function ListaProyectos({ proyectos }) {
    return (
        <div className="lista-proyectos">
            {/* Se utiliza map para transformar cada proyecto en un componente. */}
            {proyectos.map((proyecto) => (
                <ElementoProyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                />
            ))}
        </div>
    );
}

export default ListaProyectos;