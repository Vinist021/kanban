const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-md p-3 mb-3 shadow flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{task.title}</h3>
          <p className="text-xs text-gray-500">{task.description}</p>
        </div>
        <div className="text-xs text-gray-600">{task.priority}</div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <div>{task.dueDate}</div>
        <div>{(task.assignees || []).join(", ")}</div>
      </div>

      <div className="mt-3 flex gap-2 justify-end">
        <button
          className="px-2 py-1 text-xs bg-gray-100 rounded-md cursor-pointer"
          onClick={() => onView && onView(task)}
        >
          Ver
        </button>
        <button
          className="px-2 py-1 text-xs bg-yellow-100 rounded-md cursor-pointer"
          onClick={() => onEdit && onEdit(task)}
        >
          Editar
        </button>
        <button
          className="px-2 py-1 text-xs bg-red-100 rounded-md cursor-pointer"
          onClick={() => onDelete && onDelete(task)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
