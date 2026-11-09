import ElementoTarea from "./ElementoTarea";

function ListaTareas({
    tareas,
    alEliminar,
    identificadorEliminando,
}) {
    return (
        <div className="lista-tareas">
            {/* Se utiliza map para transformar cada tarea en un componente. */}
            {tareas.map((tarea) => (
                <ElementoTarea
                    key={tarea.id}
                    tarea={tarea}
                    alEliminar={alEliminar}
                    eliminando={
                        identificadorEliminando === tarea.id
                    }
                />
            ))}
        </div>
    );
}

export default ListaTareas;