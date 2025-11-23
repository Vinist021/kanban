const TaskCard = ({ task, onView, onEdit, onDelete, onDragStart }) => {
  const priority = (task.priority || "").toLowerCase();
  let priorityClass = "bg-green-100 text-green-700";
  let priorityLabel = "Baixa";
  if (priority === "média" || priority === "medium") {
    priorityClass = "bg-yellow-100 text-yellow-800";
    priorityLabel = "Média";
  } else if (priority === "alta") {
    priorityClass = "bg-red-100 text-red-700";
    priorityLabel = "Alta";
  }

  const parseDisplayDate = (display) => {
    if (!display) return null;
    // accept dd/mm/yyyy or yyyy-mm-dd
    if (display.includes("/")) {
      const parts = display.split("/");
      if (parts.length !== 3) return null;
      const d = Number(parts[0]);
      const m = Number(parts[1]);
      const y = Number(parts[2]);
      const dt = new Date(y, m - 1, d);
      if (
        dt &&
        dt.getFullYear() === y &&
        dt.getMonth() === m - 1 &&
        dt.getDate() === d
      )
        return dt;
      return null;
    }

    // try ISO
    const isoMatch = display.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const y = Number(isoMatch[1]);
      const m = Number(isoMatch[2]);
      const d = Number(isoMatch[3]);
      const dt = new Date(y, m - 1, d);
      if (
        dt &&
        dt.getFullYear() === y &&
        dt.getMonth() === m - 1 &&
        dt.getDate() === d
      )
        return dt;
    }

    return null;
  };

  const dueBadge = (() => {
    const display = task.dueDate;
    const dt = parseDisplayDate(display);
    if (!dt) {
      if (!display) return null;
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}
        >
          {display}
        </span>
      );
    }

    const today = new Date();
    const todayMid = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const dueMid = new Date(
      Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())
    );

    const diffMs = dueMid.getTime() - todayMid.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700`}
        >
          {display}
        </span>
      );
    }

    if (diffDays === 0) {
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}
        >
          {display}
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700`}
      >
        {display}
      </span>
    );
  })();

  return (
    <div
      draggable={true}
      onDragStart={(e) => onDragStart && onDragStart(e, task)}
      className="bg-white rounded-md p-3 mb-3 shadow flex flex-col"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{task.title}</h3>
          <p className="text-xs text-gray-500">{task.description}</p>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2 py-0.5 ms-2 rounded-full text-xs font-medium ${priorityClass}`}
          >
            {priorityLabel}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <div>{dueBadge}</div>
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
