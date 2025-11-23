import { useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";

const BoardColumn = ({
  title = "Column",
  counter = 0,
  button = false,
  tasks = [],
  status = "todo",
  onCreate,
  onView,
  onEdit,
  onDelete,
  onMove,
  onDragStart,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    const taskId = isNaN(Number(id)) ? id : Number(id);
    if (onMove) onMove(taskId, status);
  };

  return (
    <div className="h-full w-[33%] bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="px-2 w-[30px] py-1 text-xs text-center font-medium bg-blue-400 text-gray-700 rounded-3xl">
          {counter}
        </span>
      </div>
      <hr className="text-gray-400" />

      {button && (
        <div className="mt-3">
          <button
            type="button"
            className="w-full h-[45px] bg-green-500 text-white px-3 py-2 rounded-xl shadow-sm cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            + Adicionar
          </button>

          <TaskModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={(task) => {
              if (onCreate) onCreate(task, status);
            }}
          />
        </div>
      )}

      <div
        className="flex-1 bg-gray-200 mt-3 rounded-xl p-3 overflow-y-auto"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {((tasks || []).filter((t) => (t.status || "todo") === status) || [])
          .length === 0 ? (
          <div className="text-sm text-gray-500">Nenhuma tarefa</div>
        ) : (
          (tasks || [])
            .filter((t) => (t.status || "todo") === status)
            .map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onDragStart={onDragStart}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
